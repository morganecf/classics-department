# Classics Department

Website for Classics Department, a theater production company. It replaces the Squarespace site at classics-department.com.

Plain static HTML/CSS with no build step, so it can be hosted anywhere (GitHub Pages, Netlify, Cloudflare Pages).

## Pages

| File | Page |
|---|---|
| `index.html` | Home: hero, current production, mailing list |
| `productions.html` | Current and past productions |
| `about.html` | Mission and company members |
| `contact.html` | Contact form and email |
| `404.html` | Not-found page |

Shared styles are in `assets/style.css`. Change the colour and font tokens at the top of that file to retheme the whole site. Images go in `assets/img/`.

## Placeholders

Anything still to be replaced with real content has `class="placeholder"`, which shows it with a dashed red outline. To find what's left:

```sh
grep -n placeholder *.html
```

Remove the class once the real content is in.

## Preview locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```
