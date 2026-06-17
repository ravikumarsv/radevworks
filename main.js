(function initSite() {
  initMobileNav();
  setActiveNavLink();
  initRevealAnimations();
  initContactFormValidation();
})();

function initMobileNav() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setActiveNavLink() {
  const navLinks = document.querySelectorAll("[data-nav]");
  if (!navLinks.length) {
    return;
  }

  const path = window.location.pathname.split("/").pop() || "index.html";
  const pageIdMap = {
    "index.html": "index",
    "about.html": "about",
    "services.html": "services",
    "contact.html": "contact"
  };
  const activeId = pageIdMap[path] || "index";

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("data-nav") === activeId;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function initRevealAnimations() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((item) => observer.observe(item));
}

function initContactFormValidation() {
  const form = document.getElementById("contact-form");
  if (!form) {
    return;
  }

  const status = document.getElementById("form-status");
  const fields = {
    name: {
      input: document.getElementById("name"),
      error: document.getElementById("name-error"),
      validate: (value) => value.trim().length >= 2,
      message: "Please enter your full name."
    },
    email: {
      input: document.getElementById("email"),
      error: document.getElementById("email-error"),
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      message: "Please enter a valid email address."
    },
    projectType: {
      input: document.getElementById("projectType"),
      error: document.getElementById("projectType-error"),
      validate: (value) => value.trim() !== "",
      message: "Please choose a project type."
    },
    message: {
      input: document.getElementById("message"),
      error: document.getElementById("message-error"),
      validate: (value) => value.trim().length >= 20,
      message: "Please enter at least 20 characters about your project."
    }
  };

  const validateField = (key) => {
    const field = fields[key];
    const isValid = field.validate(field.input.value);

    field.input.classList.toggle("input-error", !isValid);
    field.error.textContent = isValid ? "" : field.message;
    return isValid;
  };

  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    field.input.addEventListener("blur", () => validateField(key));
    field.input.addEventListener("input", () => {
      if (field.input.classList.contains("input-error")) {
        validateField(key);
      }
      if (status) {
        status.textContent = "";
        status.className = "form-status";
      }
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let firstInvalidInput = null;
    let isFormValid = true;

    Object.keys(fields).forEach((key) => {
      const isFieldValid = validateField(key);
      if (!isFieldValid) {
        isFormValid = false;
        if (!firstInvalidInput) {
          firstInvalidInput = fields[key].input;
        }
      }
    });

    if (!isFormValid) {
      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }
      if (status) {
        status.textContent = "Please fix the highlighted fields before submitting.";
        status.className = "form-status";
      }
      return;
    }

    if (status) {
      status.textContent = "Sending your request...";
      status.className = "form-status success";
    }

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      const result = await submitContactForm(form);

      if (!result.ok) {
        throw new Error(result.message || "Unable to send your request right now.");
      }

      if (status) {
        status.textContent = result.message || "Thanks. Your request has been sent.";
        status.className = "form-status success";
      }

      form.reset();
      Object.keys(fields).forEach((key) => {
        fields[key].input.classList.remove("input-error");
        fields[key].error.textContent = "";
      });
    } catch (error) {
      if (status) {
        status.textContent = error.message || "Unable to send your request right now.";
        status.className = "form-status error";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}

async function submitContactForm(form) {
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  if (
    payload.access_key === "REPLACE_WITH_WEB3FORMS_ACCESS_KEY" ||
    !payload.access_key
  ) {
    return {
      ok: false,
      message: "Contact form is not configured yet. Add your Web3Forms access key."
    };
  }

  const response = await fetch(form.action, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(payload)
  });

  let data = {};
  try {
    data = await response.json();
  } catch (error) {
    data = {};
  }

  return {
    ok: response.ok && data.success !== false,
    message: data.message || "Thanks. Your request has been sent."
  };
}
