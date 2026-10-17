# CLAUDE.md

Guidance for AI assistants (Claude Code in particular) working in this
repository. Read this before making changes.

## What this repo is

A **static personal website** for Sam Urmian, served by **GitHub Pages**
directly from `main` at the repository root. There is no build step, no
package manager, and no framework — just three hand-written files plus
image assets.

The deployment contract is "push to `main`, GitHub Pages serves
`index.html`." That means anything committed to `main` is immediately
public.

## Layout

```
index.html        Single-page site. All content lives here.
styles.css        All styling. CSS custom properties at :root drive the palette.
site.js           Tiny IIFE that progressively reveals the email address.
assets/
  sam-urmian.jpg          Small round avatar in the intro header.
  ml-by-design-cover.png  Book cover (currently unused).
  sam-urmian-thesis.pdf   PhD thesis, linked from the intro.
README.md         Short publishing note (push to main, set Pages to root).
.nojekyll         Disables Jekyll on GitHub Pages so files aren't preprocessed.
.gitignore        Generic ignores (node_modules, build outputs, etc.) — not
                  used by this repo today, present as boilerplate.
```

The page is structured as sections referenced from the top nav: `#about`
(intro), `#software`, `#projects`, `#book`, `#noki`. The nav and the
section ids must stay in sync.

## Conventions

### HTML
- Single `index.html`. Don't split into multiple pages or introduce a
  templating layer unless the user explicitly asks. The site is meant to
  be readable as plain HTML in 30 seconds.
- 2-space indentation, double-quoted attributes.
- External links: `target="_blank" rel="noreferrer"` (or `noopener
  nofollow` on the email link). Keep this consistent.
- The design is a deliberately plain, single-column, monospace page
  aimed at developers. Keep it that way: no cards, grids, or hero blocks.
- New content sections are `<section id="...">` with an `<h2>` (CSS adds
  a `## ` prefix) followed by `<p>` text or a `<dl class="list">` of
  `<dt>` link + `<dd>` one-line description. Optional `<span class="tag">`
  after a link for short labels (language, "past", etc.).
- Update the nav (`.site-nav`) whenever a new top-level section is
  added or renamed — the anchors are hand-maintained.

### CSS
- Single `styles.css`. Custom properties live at `:root`
  (`--bg`, `--ink`, `--muted`, `--line`, `--accent`, `--tag-bg`,
  `--content-width`, `--mono`) and are redefined for dark mode under
  `@media (prefers-color-scheme: dark)`. Reuse them rather than adding
  new colors.
- One breakpoint: `max-width: 720px`. Don't add more without a reason.
- Fonts: the system monospace stack in `--mono`. No web fonts.
- A `@media (prefers-reduced-motion: reduce)` block disables smooth
  scroll. Respect motion preferences in any new animation.

### JavaScript
- `site.js` is a single IIFE that runs after the DOM is parsed (script
  tag is at end of `<body>`). Vanilla JS only — do **not** add a
  framework, bundler, or npm dependency.
- The email addresses are deliberately not present in source: each is
  stored as reversed character-code arrays in `site.js` (a shared local
  part plus one domain per link) and assembled on the first real user
  interaction (`click`, `mouseenter`, `focus`, `touchstart`). Links are
  wired by id via the `addresses` list (`#email-link` for the UiB
  address, `#gmail-link` for Gmail). The hidden `.email-decoy` text
  (`no-reply@example.invalid`) is the placeholder bots see. Preserve
  this scheme — don't paste an address in plain text anywhere in
  `index.html`, `site.js`, commit messages, or comments.

## Local preview

There's no build. To preview, open `index.html` directly in a browser,
or serve the directory:

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

GitHub Pages serves the same files unmodified (Jekyll is disabled by
`.nojekyll`), so what you see locally is what ships.

## Working in this repo

- **Branching.** This sandbox is checked out on
  `claude/claude-md-docs-ELXaW`. Commit work there and push with
  `git push -u origin claude/claude-md-docs-ELXaW`. Do not push to
  `main` — main is the live site. Open a PR only when explicitly asked.
- **Commit style.** Short imperative subjects, sentence case, no body
  unless the change needs one. Recent examples:
  - `Add online IOAI platform link`
  - `Add Sorna App Store and TreeWidzard links`
  - `Update bio, add NOKI and Book sections, move contact under photo`
- **Assets.** Image files in `assets/` are full-resolution JPG/PNG.
  If you add a new image, keep it under ~2MB and prefer the existing
  format (JPG for photos, PNG for graphics with transparency).
- **Scope discipline.** Don't refactor the markup or CSS as a side
  effect of a content edit. If the user asks for a copy change, change
  the copy.
- **No analytics, no trackers, no third-party scripts, no web fonts.**
  Nothing is loaded from off-domain.

## Things to avoid

- Introducing a build system (Vite, Astro, 11ty, Jekyll, etc.) — the
  whole point is that GitHub Pages serves the raw files.
- Adding `package.json` / `node_modules` / `dist/` to the repo.
- Inlining the email address in plain text — defeats the obfuscation.
- Removing `.nojekyll` — Pages would start processing files and could
  break filenames starting with `_`.
- Restructuring the section anchors without updating both `.site-nav`
  and any inbound links from elsewhere on the site.
