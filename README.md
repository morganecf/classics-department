# The Classics Department

Website for The Classics Department, events from beyond the veil. It replaces the Squarespace site at classics-department.com.

Plain static HTML and CSS with no build step. It can be hosted on any static host (Cloudflare Pages, Netlify, GitHub Pages).

## Structure

Each page is a folder with an `index.html`, so the old Squarespace URLs keep working:

| URL | Page |
|---|---|
| `/` | Home |
| `/projects/` | Project index |
| `/upcoming/` | Upcoming shows: Psychomagic 9 (New York) and The Golden Calf (San Francisco) |
| `/psychomagic-9/` | Psychomagic 9 |
| `/golden-calf/` | The Golden Calf |
| `/p9-program/` | Psychomagic 9 cast and creative team |
| `/406am/`, `/kinski/`, `/bet-on-love/`, `/lovebot-omega/`, `/time-capsule/` | Project pages |
| `/services/` | Event production services |
| `/about/` | Company members |
| `/contact/` | Contact |
| `/sign-up/` | Mailing list |

- `assets/style.css` holds every style. Colours and fonts are variables at the top of the file.
- `assets/site.js` runs the mobile menu, the photo carousels and the full-screen lightbox.
- `assets/img/` holds the images as WebP, capped at 1600px. Full-width images also have a `-2x` version at the original resolution.
- `s/` holds the PDFs, at the same paths they had on Squarespace.
- Internal links are relative, so the site works at the domain root and from GitHub Pages' `username.github.io/repo/` preview address.
- `about-new/` forwards the old Squarespace About URL to `/about/`. `_redirects` does the same on Netlify and Cloudflare Pages; GitHub Pages ignores it.
- `.nojekyll` tells GitHub Pages to serve the files as they are.

## Preview locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploying

Hosted on GitHub Pages: Settings → Pages → Deploy from a branch → `main`, folder `/ (root)`. Each push to `main` goes live in about a minute.

It also runs unchanged on Cloudflare Pages or Netlify (no build command, output directory `/`).
