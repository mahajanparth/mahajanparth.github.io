# mahajanparth.com

Personal portfolio — Vite + vanilla JS, animated with GSAP (ScrollTrigger, SplitText, Flip) and Lenis smooth scrolling.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/
```

## Editing content
All text, links, projects and images live in `src/data.js`. Fields left as `''` are hidden.
- Résumé: add `public/assets/resume.pdf`
- Project videos: put an `.mp4` in `public/assets/video/` and add `video: asset('video/name.mp4')` to the project (they lazy-load and autoplay muted)
- Images: `public/assets/img/`

## Deploying (GitHub Pages)
1. Push to a GitHub repo, then **Settings → Pages → Source: GitHub Actions**. Every push to `main` deploys via `.github/workflows/deploy.yml`.
2. Custom domain: in **Settings → Pages → Custom domain** enter `www.mahajanparth.com`, then at your DNS provider add a `CNAME` record `www → <username>.github.io` (and for the apex, `A` records to 185.199.108.153, .109.153, .110.153, .111.153). Disconnect the domain from Wix first.
