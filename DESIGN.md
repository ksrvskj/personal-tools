# Personal Tools — Design System

Reference document for all visual and UX decisions.
Keep in repo root. Update when decisions change.

---

## Typography

**Primary:** Manrope (Google Fonts)
- Weights used: 300 (light, descriptions), 400 (body), 500 (labels, names), 600 (titles, emphasis)
- Never use 700 — too heavy for this aesthetic
- Discrete weights: `wght@300;400;500;600`

**Monospace:** JetBrains Mono
- Weights: 400, 500, 600
- Used for: ingredient amounts, KBJU numbers, timers, coffee doses, portion stepper value
- Never for body text

**Sizing scale** — tokenized in `style.css :root`; use the token, not a px literal:
| Token        | Value   | Role                             |
|--------------|---------|----------------------------------|
| `--fs-2xs`   | 10px    | Eyebrows, mono micro-labels      |
| `--fs-xs`    | 11px    | Meta, pills, small labels        |
| `--fs-sm`    | 12px    | Buttons, secondary text          |
| `--fs-md`    | 13px    | Subtitles, small body            |
| `--fs-base`  | 14px    | Card names                       |
| `--fs-lg`    | 15px    | Body text, cook steps            |
| `--fs-title` | clamp(24px, 7vw, 32px) | Page titles (`.page-title`, `.wo-title`, `.wo-view-title`) |

Bare px font sizes are allowed only for one-off micro/display cases (8–9px badges, 16px+ component headings).

**Control sizes:** `--tap: 44px` — minimum touch target (buttons, checks, timer rings); `--pill-h: 25px` — pill/badge height; `--topbar-h: 53px` — sticky topbar height (the workout tabs stick at `top: var(--topbar-h)`).

**Breakpoints:** canonical set is `480px` (compact→regular), `720px` (wide phone/tablet), `980px` (desktop extras). The workout page adds a `359px` tiny-phone case; the standalone paper pages use their own.

---

## Color Palette

### Base
| Token             | Hex       | Usage                        |
|-------------------|-----------|------------------------------|
| `--bg`            | `#0f0f12` | Page background              |
| `--surface`       | `#17171c` | Card/panel backgrounds       |
| `--surface-raised`| `#1d1d23` | Elevated panels              |
| `--surface-soft`  | `#202027` | Inset panels                 |
| `--text`          | `#eee8df` | Primary text (warm white)    |
| `--text-strong`   | `#fffaf3` | Headings, emphasis           |
| `--muted`         | `#aaa29a` | Secondary text               |
| `--dim`           | `#938c85` | Tertiary text, hints         |
| `--line`          | `rgba(255,255,255,.09)` | Default borders |
| `--line-strong`   | `rgba(255,255,255,.16)` | Emphasized borders |

### Accent Families
| Token       | Hex       | Domain                        |
|------------|-----------|-------------------------------|
| `--warm`   | `#d1ad7d` | Food, recipes, default accent |
| `--cool`   | `#83b59b` | Body, health, workout green   |
| `--neutral`| `#9b928a` | Coffee, utilities             |
| `--blue`   | `#82afbc` | Info, teal accents            |
| `--purple` | `#bea5cd` | Lavender accents              |
| `--danger` | `#d89284` | Warnings, stop rules          |
| `--yellow` | `#e3c867` | Timers, focus rings (workout) |

Recipes and coffee set `--accent` in inline `<style>` as `var()` references:
- Recipes: `--accent: var(--warm)`
- Coffee: `--accent: var(--neutral)`

The workout page's `--wo-*` tokens are aliases of these shared tokens (`--wo-green: var(--cool)` etc.) — one palette, two naming layers, no drift possible.

### Recipe Category Colors
All category tokens reference the base accents:
| Category     | Token         | Value           | Character    |
|-------------|--------------|-----------------|--------------|
| Batch       | `--batch`     | `var(--warm)`   | Warm gold    |
| Breakfast   | `--breakfast` | `#c4917e`       | Dusty coral  |
| Grains      | `--grains`    | `var(--neutral)`| Neutral      |
| Fermentation| `--ferment`   | `var(--cool)`   | Sage green   |
| Baking      | `--baking`    | `var(--purple)` | Soft lavender|
| Slow        | `--slow`      | `var(--blue)`   | Muted teal   |

Subcategories (soup, curry, pasta, skillet) inherit `--batch` color.
Legacy tokens `--soup`, `--curry`, `--pasta`, `--skillet` still exist for backwards compat.

### Dietary Tags
| Tag      | Color       | Matches             |
|----------|------------|----------------------|
| Vegan    | `--vegan`  | `var(--cool)`        |
| GF       | `--gf`     | `var(--warm)`        |
| Fast     | `--fast`   | `var(--blue)`        |
| Protein  | `--hprot`  | `#c4917e` (= coral)  |

### Color Usage Rules
- Category colors appear in: card border (14% opacity), card icon bg (8%), filter buttons, inline highlights in cook steps
- Text is always `--text`, `--muted`, or `--dim`, never category-colored (except tiny tags and mono numbers)
- Borders: `color-mix(in srgb, var(--c) 14%, transparent)` — subtle, visible on OLED
- Backgrounds: `color-mix(in srgb, var(--c) 5-8%, transparent)` — tint, not color

---

## Spacing & Layout

### Border Radius
| Element          | Radius         |
|-----------------|----------------|
| Cards, panels   | `18px` (--radius) |
| Small elements  | `12px` (--radius-sm) |
| Buttons, pills  | `6-8px`        |
| Icons (hub)     | `9-13px` proportional to size |
| Step numbers    | `50%` (circle) |

### Spacing Principles
- **Tight between related elements.** Cards in a group, icon next to its label, filters in a row — keep close. They belong together.
- **Generous around groups.** Page margins, header-to-content gap, section separators — air here.
- **Don't add air between things that belong together.** If items are part of the same unit (card group, filter bar), reducing gap makes them feel more cohesive, not cramped.
- **Every spacing decision needs a reason.** "It looks better with more space" is not a reason. "These are a group and should read as one block" is.
- **Spacing stays literal by decision.** Unlike colors and font sizes, gaps/paddings are optically hand-tuned per component (5/6/7px neighbors are deliberate); they are not tokenized, but new values should stay within the existing 2–24px range.

### Specific Values
| Context                    | Value   |
|---------------------------|---------|
| Page padding (sides)      | 16-20px |
| Card padding              | 14-16px |
| Card margin-bottom        | 8px     |
| Hub grid gap              | 8px     |
| Icon-to-text gap (cards)  | 10px    |
| Filter button gap         | 6px     |
| Section spacing (header->content) | 8px (page-header bottom padding) |

---

## Icons

### Hub — SVG Line Icons
4 custom SVGs, one per tool, living in `ICONS.hub` (icons.js) and injected into `.bc-icon[data-icon]` slots at load. Consistent stroke width 1.5, round caps/joins, no fill.

| Tool    | Icon description     | Accent   |
|---------|---------------------|----------|
| Workout | Stick figure        | `--cool` |
| Recipes | Pot with steam      | `--warm` |
| Coffee  | Cup with handle     | `--neutral` |
| Dutch   | Open book           | `--study` (`#8da3bf`, bespoke slate for the study card) |

### Recipe Categories — 6 Top-Level + 4 Subcategories

Hierarchical architecture: 6 top-level categories, "Batch" expands to show 4 subcategories.

**Top-level categories** (`TOP_CATS`, icon-only buttons 44×44px):
| Category     | Icon                         | Color token     | Value     |
|-------------|------------------------------|-----------------|-----------|
| Batch       | Pot + steam (`cat.batch`)     | `--batch`       | `var(--warm)` |
| Breakfast   | Muesli bowl + yoghurt carton (`cat.breakfast`) | `--breakfast` | `#c4917e` |
| Grains      | Saucepan + grain dots (`cat.grains`) | `--grains` | `var(--neutral)` |
| Fermentation| Jar + pickles (`cat.ferment`) | `--ferment`     | `var(--cool)` |
| Baking      | Whisk + rolling pin (`cat.baking`) | `--baking` | `var(--purple)` |
| Slow        | Cloche dome (`cat.slow`)      | `--slow`        | `var(--blue)` |

**Batch subcategories** (`SUB_CATS`, text-only buttons):
| Subcategory | Icon (cards only)             | Inherits color from |
|-------------|-------------------------------|---------------------|
| Soups       | Pot + steam (`cat.soup`)       | Batch (`--batch`)   |
| Curry       | Bowl + spices (`cat.curry`)    | Batch               |
| Pasta       | Pasta strands (`cat.pasta`)    | Batch               |
| Skillet     | Pan + steam (`cat.skillet`)    | Batch               |

**Dietary tag icons** (5 tags, shown after text label):
| Tag      | Icon                  | Color token  |
|----------|----------------------|-------------|
| Vegan    | Leaf (`tag.vegan`)    | `--vegan`   |
| GF       | Wheat slash (`tag.gf`)| `--gf`      |
| Fast     | Clock (`tag.fast`)    | `--fast`    |
| Protein  | Barbell (`tag.protein`)| `--hprot`  |
| Comfort  | Heart (`tag.comfort`) | `--comfort` |

All: `viewBox="0 0 24 24"`, stroke only, same weight as hub icons.

### Navigation — 3 visual levels
1. **Icon-only category buttons** (`.cat-btn`, 44×44px) — label appears only under active button
2. **Text-only subcategory buttons** (`.sub-btn`) — shown when Batch is active and expanded
3. **Tag filter pills** (`.tbtn`) — text + small icon, toggleable

Batch button toggles expand/collapse on re-click (`.cat-expand` arrow indicator).

Shared interface icons are centralized in `icons.js` — accessed via `ICONS.cat.soup`, `ICONS.coffee.chemex`, `ICONS.tag.vegan`, etc. Workout movement diagrams live separately in `workout-diagrams.js` so exercise anatomy does not become part of the shared icon API.
Use `iconInner(svg)` helper to extract inner SVG content when wrapper `<svg>` already exists.

### Icon Sizing
| Context            | Container | SVG size |
|-------------------|-----------|----------|
| Hub hero card     | 44x44px   | 22x22px  |
| Hub small card    | 34x34px   | 17x17px  |
| Category buttons  | 44x44px   | 22x22px  |
| Recipe card       | 34x34px   | 18x18px  |
| Cook mode hero    | 42x42px   | 22x22px  |

### No Emoji
Emoji are device-dependent and visually inconsistent with line-icon aesthetic. Exception: dietary tags in filter pills — these are functional labels, not decorative.

---

## Texture & Atmosphere

### Noise Overlay
SVG fractalNoise filter, 2.5% opacity, 128px tile. Applied via `body::before`, `position:fixed`, `pointer-events:none`. Adds tactile quality, removes digital flatness.

### Ambient Glow (hub only)
Two blurred circles (280px, blur 100px, opacity 5%):
- Warm (`var(--warm)`) top-right
- Cool (`var(--cool)`) bottom-left

Decorative, not functional. Only on hub page where there's enough empty space.

### Page Header
Eyebrow pattern shared with the workout page: `.page-eyebrow` (mono uppercase, accent) + `.page-title` + `.page-subtitle`, optional `.page-pills` row of `.pill` chips.

---

## Animation

### Entrance (hub only)
`fadeUp`: opacity 0->1, translateY 6px->0, duration 0.4s ease.
Stagger: 50ms between elements (header -> card 1 -> card 2 -> card 3 -> footer).

Never apply `animation: fadeUp ... both` to dynamically rendered content — the `both` fill-mode keeps elements at `opacity:0` if the animation can't replay (e.g. after innerHTML rebuild). Entrance animation is for static hub elements only.

### Interactions
- Card tap: `transform: scale(0.97)` on `:active` — instant, no transition delay
- Buttons: `transform: scale(0.97)` on `:active`
- Filter buttons: color/border transition 0.15s
- No hover effects (mobile-first, hover doesn't exist on touch)

### Accessibility
`@media (prefers-reduced-motion: reduce)` -> disable all animations.

---

## Nutrition Display (ED-Sensitivity)

### Principle
Nutrition info is available but not prominent. It's reference data for the cook, not a selling point.

### Browse Mode
- Only **protein** shown, as a small pill: `P 12g`
- No calories, fat, carbs on cards
- Protein is athletic context (training recovery), not restriction framing

### Cook Mode
- Full KBJU at the **bottom**, after steps and tips
- Small, grey, mono font, opacity 0.25: `280 kcal . P 10g . F 6g . C 45g / per serving`
- Not before the recipe, not colorful, not prominent

### Nutrition Toggle
- Button fixed bottom-right, 32px circle
- Hides ALL nutrition (protein pills in browse + KBJU in cook)
- State saved in `localStorage('hideNutrition')`
- `?clean=1` URL param -> hides nutrition (for sharing to ED-sensitive friends)

### Language Rules
Never use:
- "low calorie" / "guilt-free" / "clean eating" / "cheat meal"
- Calorie count as a selling point or subtitle

OK to use:
- "Light & filling" (describes texture, not restriction)
- "Protein" (athletic framing)
- "Quick classic" (neutral)

---

## Shared Components

### Page Header
`header.page-header` containing `.page-eyebrow` (10px JetBrains Mono, weight 600, uppercase, accent-colored), `h1.page-title` (clamp 24-32px, `--text-strong`), `p.page-subtitle` (13px, `--muted`), and an optional `.page-pills` row of `.pill` chips.
Back links do not live in the header — they live in the sticky `.topbar` + `.topbar-back` chrome (see the back-to-hub convention in File Structure).

### Language Toggle
`.lang-toggle` with `.lang-btn` buttons. Active state via `.lang-btn.active`.
Lives in the sticky `.topbar` (and, for recipes, also in the cook mode bar).

### Cards
`.card` with `--c` CSS variable for per-item color theming.
Contains: `.card-top` (flex: icon + body), `.card-body` (name + sub + meta row).
Expandable via toggling content after `.card-top`.

### Stepper
`.stepper` — `[-][value][+]` control for portions.
Value input: JetBrains Mono, colored with `--c`.

### Timer Ring
`.timer-wrap` > `.timer-ring` > `.timer-inner` + `.timer-hint`.
Conic-gradient fill shows progress. Shared between recipes (countdown) and coffee (count-up).
Default size: 44x44 ring / 36x36 inner. Coffee brew variant: 64x64 / 52x52.

### Check Button
`.check-btn` / `.check-btn.checked` — 28px circle, turns `--vegan` green when checked.

### View Switching
`#browseView` / `#cookView` toggled via `body.cooking` class.
CSS: `body.cooking #browseView{display:none} body.cooking #cookView{display:block}`.

The workout page uses application state instead of the browse/cook convention:

- Public tabs are **Сегодня / A / B / Пресс / Турник**. Public navigation and descriptions stay in Russian; route values remain English identifiers.
- **A**, **B**, **Пресс**, and **Короткая** are fixed, self-contained plans. They do not depend on a pull-up bar and do not change when one is unavailable.
- **Сегодня** recommends one of those four plans from the available time, energy, running schedule, and recent strength work.
- **Турник** is a separate, opportunistic module. Bar availability belongs to the current date/workout, not to the base routine or to a standing equipment preference. When a secure, purpose-built bar is available, the module can be added before that day's plan or opened on its own.
- A completed Bar block is not offered again on the same local day. Marked hard sets count toward the 48-hour recovery guard even before the block is formally completed; the current same-day block can still be finished without its remaining sets disappearing.
- The page must not present a missing bar as a defect in the mat-based plans. Pull-up prompts belong in the optional module or in the temporary “bar available” state.
- Step-by-step mode presents one exercise at a time; the overview keeps the whole workout scannable.
- Completed sets, previous results, pull-up level, recovery dates, and the active timer persist under `localStorage('personal-tools.workout.v3')`; view and step position live in the URL.
- Exercise copy gives form cues, scaling options, and stop rules; it must not claim that any movement is universally safe or universally “lower-back safe”.

---

## Deep Links & URL Params

### Pattern
Read on load -> set state -> render. One rule site-wide: **a fullscreen state pushes exactly one history entry and consumes it on close** (workout step mode, recipes cook mode, dutch guides — Back closes them and never re-opens or dead-ends); **everything lighter writes via `history.replaceState`** (tabs, accordions, filters, language). Pages that push track the entry in `history.state` (`focusPushed`/`cookPushed`/`guidePushed`) so the close-consumes-entry contract survives reload and Forward, and resolve entries in a `popstate` listener.

### Recipes
| Param   | Values          | Effect                    |
|---------|-----------------|---------------------------|
| `r`     | recipe id       | Opens cook mode           |
| `lang`  | `ru` / `en`     | Sets language             |
| `clean` | `1`             | Hides nutrition           |

Example: `recipes.html?r=rosti-egg&lang=en`

### Coffee
| Param | Values      | Effect              |
|-------|-------------|----------------------|
| `m`   | method id   | Opens that method    |
| `lang`| `ru` / `en` | Sets language        |

Example: `coffee.html?m=chemex&lang=en`

### Dutch
| Param | Values      | Effect                                        |
|-------|-------------|-----------------------------------------------|
| `g`   | guide id    | Opens that guide (pushes one history entry)   |
| `lang`| `ru` / `en` | Sets language                                 |

Example: `dutch.html?g=basics&lang=en`

### Workout
| Param   | Values                              | Effect                              |
|---------|-------------------------------------|-------------------------------------|
| `w`     | `today`/`a`/`b`/`core`/`bar`/`quick` | Opens that workout view           |
| `short` | `1`                                 | Opens the **Короткая** alias       |
| `focus` | `1`                                 | Opens one-exercise step-by-step mode |
| `plan`  | `a`/`b`/`core`/`bar`/`quick`        | Identifies the workout behind a step-by-step link |
| `ex` / `step` | exercise slot / step index   | Restores the exact focus position   |
| `t`     | `min`/`regular`/`full`              | Legacy links: **Короткая / Пресс / A** |

Canonical examples: `workout.html?w=bar`, `workout.html?w=quick`. `?short=1` remains a convenient alias. For old bookmarks, `?t=min` maps to **Короткая**, `?t=regular` maps to **Пресс**, and `?t=full` maps to **A**. New links should use `?w=`.

### Language
URL param `?lang=` overrides `localStorage`. Priority: URL > localStorage > default `'ru'`. Shared across all pages via same localStorage key `'lang'`.

---

## i18n

All user-visible strings are `{ru:"...", en:"..."}` objects, resolved via `t(obj)` helper. This includes: recipe names, subtitles, ingredient names, units, step text, tips, UI labels, filter labels.

Fixed strings (never translated): method names (Chemex, V60), technical terms.

---

## Ingredient Rounding

When scaling portions, amounts are rounded context-aware:

| Type                | Rule                    | Example                  |
|--------------------|-------------------------|--------------------------|
| Countable (onion, egg) | Nearest 0.5          | 1.33 -> 1.5, 1.8 -> 2   |
| Small measures (tsp, tbsp) | Nearest 0.5      | 0.75 tsp -> 1 tsp       |
| Grams/ml >= 50     | Nearest 5              | 137g -> 135g             |
| Grams/ml 10-49     | Nearest integer        | 13.5g -> 14g             |
| Grams/ml < 10      | 1 decimal              | 1.33g -> 1.3g            |

---

## File Structure

```
personal-tools/
  DESIGN.md        <- this file
  style.css        <- shared design-system CSS (incl. .topbar sticky back-to-hub chrome, .sr-only, :focus-visible)
  icons.js         <- shared SVG icons (ICONS.hub/cat/coffee/tag/ui + iconInner helper)
  lang.js          <- shared RU/EN globals: lang, t(), setLang(), applyLang() + [data-back-label] localization
  index.html       <- hub dashboard (links style.css + hub-specific inline)
  workout.html     <- workout page semantic shell
  workout.css      <- workout layout, components, and step-by-step mode
  workout-diagrams.js <- original exercise diagrams
  workout.js       <- program data, state, rendering, timers, and persistence
  recipes.html     <- batch cooking (browse + cook mode)
  coffee.html      <- brew guides (calculators)
  dutch.html       <- Dutch grammar (index + guide views; light theme)
  dutch.css        <- dutch/components stylesheet (own light token set)
  dutch-data.js    <- guide content + BLOCK_ICONS
  components.html  <- dutch design-system catalog (light theme)
  paper_map.html   <- Paper 2 content map (light "paper" theme, standalone)
  intro_outline.html <- Paper 2 introduction outline (light "paper" theme, standalone)
  favicon.svg      <- site favicon
```

Each page links `style.css`; most pages keep only `:root` variable overrides inline (as `var()` references to shared tokens, not hex literals). Bilingual pages load `lang.js` before their main script. The workout page also links `workout.css`, then loads `workout-diagrams.js` before `workout.js`.

Back-to-hub convention: dark pages — workout included — use the sticky `.topbar` + `.topbar-back` from `style.css` («← На главную»), exactly one back affordance per page; dutch/components use the equivalent light `.topbar`/`.back-btn` from `dutch.css`. On the workout page the view tabs stick directly below the topbar (`top: var(--topbar-h)`). Every page keeps its hub link visible without scrolling, and every dark page lives in the same centered 720px column.
Pages that use shared icons load `icons.js` before their main script. The workout page owns a separate diagram vocabulary and does not depend on the shared icon file.

Hub is the exception: it links style.css for shared base (body, noise, fonts) but keeps bento grid / hero card styles inline (hub-specific layout).

---

## Architecture Decisions

| Decision | Choice | Why | Reconsider when |
|----------|--------|-----|-----------------|
| Framework | Vanilla JS | 15 recipes, 1 developer, static hosting, <100ms load | Persistent features (favorites, shopping list, meal plans) |
| Hosting | GitHub Pages | Free, zero config, custom domain possible | Need server-side logic |
| CSS | Shared base + page-specific `workout.css` | Keep common tokens centralized without crowding the base with a full-screen training UI | More pages develop substantial independent UI systems |
| Rendering | `innerHTML` rebuild, data-driven | Simple, no virtual DOM overhead | Lists exceed ~100 items or need partial updates |
| i18n | JS objects in each file | Simple, no build step | 3+ languages or external translators |
| Icons | Inline SVG | No HTTP requests, style with CSS | Need 20+ icons -> consider sprite |
| State | JS variables + localStorage | No serialization overhead | Cross-page state or offline sync |

---

## Coding Conventions

### Page Structure
```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="theme-color" content="#0f0f12">
  <title>...</title>
  <link rel="stylesheet" href="style.css">
  <style>:root{--accent:var(--warm)}</style>  <!-- var() reference, not a hex literal -->
</head>
<body>
  <!-- HTML structure -->
  <script>
    // Most pages keep a single inline script block
    // Data → State → Functions → Init
  </script>
</body>
</html>
```

The workout page is the page-level exception: `workout.html` stays a small semantic shell and loads `workout.css`, `workout-diagrams.js`, and `workout.js` as separate files. This keeps the exercise catalogue, persistence, timers, and step-by-step rendering reviewable without enlarging the HTML.

### JS Patterns
- **Data arrays** (`R`, `M`, exercises) at the top — plain objects, no classes
- **State variables** after data — `let curCat`, `let openMethod`, `let cookId`
- **Workout state** is serialized under `personal-tools.workout.v3`; migrations and legacy URL aliases are resolved before the first render
- **`t(obj)`** resolves `{ru, en}` to current language string
- **`render()`** / **`fullRender()`** rebuilds DOM from state via innerHTML
- **Targeted DOM updates** for timers (`updateTmRing`, `updateBrewRing`) — don't re-render entire page every second
- **`readURL()`** at init — parse URL params, set state
- **`updateURL(mode)`** on state change — `history.replaceState` by default; `updateURL('push')` only when opening a fullscreen state (cook / guide / workout focus), per the Deep Links Pattern
- **`event.stopPropagation()`** on nested clickable elements inside cards

### CSS Patterns
- **`--c` variable** on each card/item for per-item color theming
- **`color-mix(in srgb, var(--c) N%, transparent)`** for dynamic opacity tinting
- **`var(--br, var(--accent))`** fallback pattern for page-specific overrides
- **No `!important`** — specificity is managed via selector order
- **No `animation: ... both` on dynamic content** — `both` fill-mode keeps opacity:0 after innerHTML rebuild

### Gotchas
- `pointer-events: none` on noise overlay and decorative elements
- `event.stopPropagation()` required for buttons inside clickable cards
- Timer intervals survive `render()` calls — they reference state variables, re-query DOM by ID
- `localStorage` keys: `'lang'`, `'hideNutrition'` — shared across pages; `'personal-tools.workout.v3'` — workout progress and UI state
