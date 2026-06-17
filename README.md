# RA DevWorks Static Website

This is a static multi-page website hosted on GitHub Pages:

- `index.html`, `about.html`, `services.html`, `contact.html`
- `styles.css`
- `main.js`
- `assets/logo-transparent.png`

## Local Preview

Run from the project root:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Contact Form On GitHub Pages

GitHub Pages only hosts static files. It cannot run Node, PHP, serverless
functions, or Zoho SMTP code. Do not put a Zoho password or app password in
HTML, JavaScript, or a committed `.env` file.

The contact form is configured to submit through Web3Forms:

```html
<form action="https://api.web3forms.com/submit" method="POST">
```

To activate the form:

1. Go to `https://web3forms.com/`.
2. Create an access key for `developer@radevworks.com`.
3. Open `contact.html`.
4. Replace:

```html
REPLACE_WITH_WEB3FORMS_ACCESS_KEY
```

with your Web3Forms access key.

After that, redeploy to GitHub Pages and submit a test inquiry.

## Deploy To GitHub Pages

This project includes `.github/workflows/deploy-pages.yml` for automatic
deploys from `main`.

1. Push changes to GitHub.
2. In the GitHub repository, go to `Settings` -> `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Push to `main` to trigger deployment.

GitHub will publish to:

```text
https://<your-username>.github.io/<repo-name>/
```

## Notes

- You do not need a `.env` file for GitHub Pages.
- Keep private mail credentials out of this repository.
- If you later move to a host that supports backend code, you can send through
  Zoho SMTP from a private server-side endpoint.
