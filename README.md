# RA.devWorks Static Website

This is a static multi-page website (`Home`, `About`, `Services`, `Contact`) with shared assets:

- `styles.css`
- `main.js`
- `index.html`, `about.html`, `services.html`, `contact.html`

## Local Preview

Run from the project root:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Deploy to Netlify

This project includes `netlify.toml` and does not require a build step.

1. Push this project to a Git provider (GitHub/GitLab/Bitbucket).
2. Sign in to Netlify and click `Add new site` -> `Import an existing project`.
3. Select your repository.
4. Confirm settings:
   - Build command: `echo 'Static site: no build step required'`
   - Publish directory: `.`
5. Click `Deploy site`.
6. Optional custom domain:
   - Site settings -> Domain management -> Add custom domain.
   - Add the DNS records shown by Netlify at your domain provider.

## Deploy to Vercel

This project includes `vercel.json` and deploys as static files.

1. Push this project to GitHub/GitLab/Bitbucket.
2. Sign in to Vercel and click `Add New...` -> `Project`.
3. Import your repository.
4. Framework preset: `Other`.
5. Leave build command empty and output directory empty (root static deployment).
6. Click `Deploy`.
7. Optional custom domain:
   - Project -> `Settings` -> `Domains` -> add your domain.
   - Configure DNS records shown by Vercel.

## Deploy to GitHub Pages

This project includes `.github/workflows/deploy-pages.yml` for automatic deploys from `main`.

1. Initialize git and push to GitHub (if not already):

```bash
git init
git add .
git commit -m "Initial static site"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. In GitHub repo settings:
   - Go to `Settings` -> `Pages`.
   - Under `Build and deployment`, set `Source` to `GitHub Actions`.
3. Push to `main` to trigger deployment.
4. GitHub will publish to:
   - `https://<your-username>.github.io/<repo-name>/`
5. Optional custom domain:
   - In `Settings` -> `Pages`, set `Custom domain`.
   - Configure DNS records at your registrar.

## Notes

- Contact form is client-side validation only and does not submit to a backend.
- If you want production form submissions, integrate Formspree/Web3Forms or a custom API endpoint.
