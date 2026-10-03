# The Classics Department

Website for The Classics Department, events from beyond the veil. It replaces the Squarespace site at classics-department.com.

Plain static HTML and CSS with no build step. It can be hosted on any static host (Cloudflare Pages, Netlify, GitHub Pages).

## Structure

Each page is a folder with an `index.html`, so the old Squarespace URLs keep working:

| URL | Page |
|---|---|
| `/` | Home |
| `/projects/` | Project index |
| `/upcoming/` | Psychomagic 9 |
| `/p9-program/` | Psychomagic 9 cast and creative team |
| `/406am/`, `/kinski/`, `/bet-on-love/`, `/lovebot-omega/`, `/time-capsule/` | Project pages |
| `/services/` | Event production services |
| `/about/` | Company members |
| `/contact/` | Contact |
| `/sign-up/` | Mailing list |

- `assets/style.css` holds every style. Colours and fonts are variables at the top of the file.
- `assets/site.js` runs the mobile menu and the photo-gallery lightbox.
- `assets/img/` holds the images, converted to WebP and capped at 1600px.
- `s/` holds the PDFs, at the same paths they had on Squarespace.
- `_redirects` sends old URLs (`/about-new`, `/cart`) to their new homes. Netlify and Cloudflare Pages read this file.

## Preview locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploying

On Cloudflare Pages or Netlify, connect this repository with no build command and `/` as the output directory.
