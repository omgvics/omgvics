# OMGVICS 2026 — Personal Site

A retro desktop-OS portfolio for Victoria Lo. Static, single unified site — no build step.

## Pages
- `index.html` — Home (the OMGVICS desktop). **Root homepage.**
- `about.html` — About / résumé
- `sayhi.html` — Contact form

The sidebar nav (Work / About / Say Hi) and window close buttons link between these
three files, so they work as one site once deployed together.

## Deploy to Vercel via GitHub

1. **Create a GitHub repo** (e.g. `omgvics-2026`).
2. **Upload these files** to the repo root — keep the filenames as-is:
   - drag them into GitHub's "Add file → Upload files", or
   - `git init && git add . && git commit -m "OMGVICS site" && git push`
3. **Import in Vercel:** vercel.com → Add New → Project → import the repo → **Deploy**.
   - Framework preset: **Other** (it's plain static HTML).
   - No build command, no output directory needed.
   - `index.html` is served at `/`, so the deployment URL is your homepage;
     `/about` and `/sayhi` resolve to the other pages automatically.

### No-GitHub alternative
New Project → drag this unzipped folder straight into Vercel. Same result.

## Custom domain
Vercel project → **Settings → Domains** → add your domain, then set the DNS records
Vercel shows at your registrar:
- apex/root (`example.com`) → **A** record → `76.76.21.21`
- `www` → **CNAME** → `cname.vercel-dns.com`

HTTPS is provisioned automatically once DNS verifies.

## Editing
These HTML files are self-contained exports (all images/fonts/styles inlined).
To make design changes, edit the source `*.dc.html` files in the Claude project and
re-export, rather than hand-editing these bundles.
