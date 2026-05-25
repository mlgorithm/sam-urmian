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
  sam-urmian.jpg          Portrait used in the hero card.
  ml-by-design-cover.png  Book cover in the Book section.
README.md         Short publishing note (push to main, set Pages to root).
.nojekyll         Disables Jekyll on GitHub Pages so files aren't preprocessed.
.gitignore        Generic ignores (node_modules, build outputs, etc.) — not
                  used by this repo today, present as boilerplate.
```

The page is structured as sections referenced from the top nav: `#about`
(hero), `#noki`, `#book`, `#projects`, `#software`. The nav and the
section ids must stay in sync.

## Conventions

### HTML
- Single `index.html`. Don't split into multiple pages or introduce a
  templating layer unless the user explicitly asks. The site is meant to
  be readable as plain HTML in 30 seconds.
- 2-space indentation, double-quoted attributes.
- External links: `target="_blank" rel="noreferrer"` (or `noopener
  nofollow` on the email link). Keep this consistent.
- New content sections follow the existing pattern:
  `<section class="section-block" id="...">` with a
  `<div class="section-heading"><h2>…</h2></div>` and `.lede` / `.hero-note`
  paragraphs. Cards inside use `.entry-card` or `.topic-card`.
- The hero is a two-column grid (`.hero-copy` + `.hero-photo-card`); the
  Book section uses `.book-layout` (cover left, copy right). Both
  collapse to one column at ≤960px / ≤720px.
- Update the nav (`.site-nav`) whenever a new top-level section is
  added or renamed — the anchors are hand-maintained.

### CSS
- Single `styles.css`. Custom properties live at `:root`
  (`--bg`, `--surface`, `--ink`, `--muted`, `--line`, `--accent`,
  `--content-width`, `--radius-*`). Prefer reusing them over introducing
  new colors or radii.
- Two breakpoints: `max-width: 960px` (grid → single column) and
  `max-width: 720px` (tighter padding, header stacks). Don't add a third
  breakpoint without a reason.
- Fonts: Manrope for body, Instrument Serif for headings, loaded from
  Google Fonts in `index.html`. Don't add a third family.
- A `@media (prefers-reduced-motion: reduce)` block disables smooth
  scroll. Respect motion preferences in any new animation.

### JavaScript
- `site.js` is a single IIFE that runs after the DOM is parsed (script
  tag is at end of `<body>`). Vanilla JS only — do **not** add a
  framework, bundler, or npm dependency.
- The email address is deliberately not present in source: it's stored
  as two reversed character-code arrays in `site.js` and assembled on
  the first real user interaction (`click`, `mouseenter`, `focus`,
  `touchstart`). The visible `.email-decoy` text
  (`no-reply@example.invalid`) is the placeholder bots see. Preserve
  this scheme — don't paste the address in plain text anywhere in
  `index.html`, `site.js`, commit messages, or comments. The decoded
  address is `sam.urmian@uib.no`.

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
- **No analytics, no trackers, no third-party scripts.** Only the
  Google Fonts stylesheet is loaded from off-domain.

## Things to avoid

- Introducing a build system (Vite, Astro, 11ty, Jekyll, etc.) — the
  whole point is that GitHub Pages serves the raw files.
- Adding `package.json` / `node_modules` / `dist/` to the repo.
- Inlining the email address in plain text — defeats the obfuscation.
- Removing `.nojekyll` — Pages would start processing files and could
  break filenames starting with `_`.
- Restructuring the section anchors without updating both `.site-nav`
  and any inbound links from elsewhere on the site.
