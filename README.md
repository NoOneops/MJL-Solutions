# MJL Solutions portfolio

The public portfolio for MJL Solutions, an independent digital studio by John Benedict Martinez. It presents the studio's positioning, focused services, selected case-study placeholders, working process, and an email-based inquiry path without sending form data to an external provider.

The site is published as a GitHub Pages project site at [https://nooneops.github.io/MJL-Solutions/](https://nooneops.github.io/MJL-Solutions/).

## Technology

- Semantic HTML and mobile-first CSS
- JavaScript ES modules
- GSAP for a small progressive-enhancement entrance animation
- Vite for local development and production builds
- Playwright for browser behavior and responsive checks
- ESLint, Prettier, and html-validate for automated quality checks
- Sharp for reproducible favicon and social-preview generation

No UI framework, icon font, analytics package, external form provider, or runtime Three.js dependency is used.

## Local development

Use Node.js 22 or newer.

```powershell
npm ci
npm run dev
```

Vite prints the local development URL. The configured production base is `/MJL-Solutions/`.

## Build and preview

```powershell
npm run build
npm run preview
```

The build command regenerates the favicon and social-preview assets, then writes the production site to `dist/`. The preview is available at `http://127.0.0.1:4173/MJL-Solutions/`.

## Testing

Install Chromium once on a new machine:

```powershell
npx playwright install chromium
```

Run the complete production-readiness suite:

```powershell
npm run check
```

The suite checks formatting, JavaScript linting, HTML validity, the production build, built-output links and Pages paths, mobile navigation, project filters, command-palette keyboard behavior, contact validation, reduced motion, JavaScript-free readability, console output, and horizontal overflow at supported viewports.

Individual commands are also available:

```powershell
npm run format:check
npm run lint
npm run validate:html
npm run test:contrast
npm run test:links
npm run test:browser
```

## Deployment

`.github/workflows/deploy-pages.yml` builds, tests, uploads, and deploys `dist/` through GitHub Pages when changes reach `main`, or when manually dispatched. Configure the repository's Pages source as **GitHub Actions** before the first deployment.

The workflow does not require project secrets. Local work should be reviewed on a feature branch before it is committed or merged.

## Content and assets

Unverified client details, project outcomes, screenshots, links, and offer details intentionally remain clearly marked as placeholders. Replace them only with confirmed facts and optimized real screenshots. If below-the-fold `<img>` elements are added, include intrinsic `width` and `height`, `loading="lazy"`, descriptive alternative text, and a WebP or AVIF source when appropriate.

Editable brand-image sources live in `assets/brand/`. Run `npm run assets` after changing them; generated deployment assets are written to `public/`.
