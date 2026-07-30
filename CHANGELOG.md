# Changelog

Todos los cambios notables de este paquete se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto sigue [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

### Added
- Sección "Cards & Feedback" en la demo (`demo/index.html` + `demo/demo.js`): Card (10 theme colors + variante con acciones), MessageBox (4 theme colors) y Stepper. Slider y Calendar se agregaron dentro de la sección Forms. Eran los 5 widgets del tema sin cobertura visual con más prioridad — Card, MessageBox y Stepper porque son justo donde vivía el bug de A2 (el borde `-emphasis` que desaparecía), invisible hasta ahora porque la demo no los mostraba.
- Escala completa de tamaños de heading (`h1` 2rem … `h6` .75rem, con line-height y el tratamiento de label en mayúsculas de `h6`) en `scss/index.scss`, sobre `h1–h6, .k-h1–.k-h6`. Antes vivía solo en atributos `style=` de `demo/index.html`: un proyecto que instalara el paquete heredaba la familia `Outfit` pero no los tamaños.
- Paleta de series de charts con colores de marca: `--kendo-color-series-{a..f}` y sus 4 variantes (`-subtle`, `-subtler`, `-bold`, `-bolder`) — 30 tokens. Antes las 6 familias quedaban en los colores de Material (púrpura `#9C27B0`, amarillo `#FFEB3B`, verde `#4CAF50`…) y de ahí derivaban las 30 `--kendo-chart-series-*`, así que cualquier Chart sin `color` explícito por serie salía con la paleta de Material. La demo lo ocultaba porque fijaba `color:` a mano en cada serie. El orden de las familias alterna frío/cálido (cyan → ámbar → azul → verde → coral → teal) para que dos series contiguas nunca compartan familia de tono; todos los tonos salen de la paleta del DS.
- Completadas las rampas semánticas de `success`/`warning`/`error`/`info` con `-subtle-hover`, `-subtle-active`, `-emphasis`, `-on-subtle` y `-on-surface` (20 tokens), y las de `dark`/`light`/`inverse` con las variantes que les faltaban (17 tokens). Antes esas 37 variables servían colores de Material, no de Estela: aparecían en hover/active de chips y notifications subtle, bordes de MessageBox y texto sobre fondos subtle. La cobertura de tokens de color pasa de 80/147 a **147/147**.
- `AUDITORIA.md` — registro de la revisión completa del sistema de diseño: los hallazgos corregidos, los pendientes con su acción recomendada, y lo verificado como correcto para no re-auditarlo. Deja constancia de que accesibilidad quedó fuera del alcance.
- Vista "Changelog" en la demo (`demo/index.html` + `demo/demo.js`): hace `fetch` de este mismo archivo y lo renderiza con un parser de Markdown mínimo (headings, listas, `code`, `**bold**`, links) — así la vista nunca queda desincronizada de lo que documenta el changelog real.

### Changed
- Corregida en `CLAUDE.md` la regla de elevation documentada: decía "elevation ≤ 2 → boxShadow: none" pero solo `elevation-1` es `none` (`elevation-2` conserva sombra a propósito, la usan popups y dropdowns). Ahora dice "elevation-1 → boxShadow: none", que es la regla real implementada.
- Relabeleada en la demo la sección de `tertiary` ("Tertiary — Estela Teal" → "Tertiary — Teal (provisional, no confirmado en el DS React)"): ese color es de la paleta de Material, no está definido en el DS React oficial, y no debía presentarse como si fuera un token de marca confirmado.
- Documentada en `scss/_variables.scss` la decisión de no remapear `--kendo-spacing-*` a la escala de 8px de MUI: Kendo usa base 4px nativa, y remapear cambiaría el padding/gap de todos los componentes a la vez — un cambio que necesita su propia revisión aislada, no algo para resolver de paso.
- Sincronizado el valor de `Secondary` en `README.md` y `CLAUDE.md` (`#4255FF` → `#4688EC`): la tabla de tokens había quedado atrás de un cambio anterior ya documentado en este changelog.
- Reemplazados los hex hardcodeados de la demo por `var(--kendo-color-*)`: `#4255FF` (secondary vieja, 6 lugares en `demo/index.html` y 1 en `demo/demo.js`) y el ancla navy `rgba(16, 20, 38, …)` (7 lugares) por su equivalente actual `rgba(14, 19, 22, …)` — así la demo deja de poder desincronizarse de los tokens que dice representar. El fallback del asterisco de campos requeridos pasó de `#ef4444` (rojo de Tailwind, ajeno al DS) a `#F15B50` (el `error` real del tema).
- Corregidas las etiquetas de sección en la demo: "Primary — Estela Blue" (es cyan) → "Primary — Estela Cyan", "Secondary — Estela Amber" (es azul) → "Secondary — Estela Blue".
- Remapeado `-emphasis` de `primary`/`secondary`/`tertiary`: ya no usa `light` de MUI sino un tint 40% del `main` (`#5FEFE8` → `#66D3E0`, `#99C7F7` → `#90B8F4`, `#4DB6AC` → `#66AFA6`). Kendo usa `-emphasis` como color de **borde/acento de tono medio sobre fondos `-subtle`** (MessageBox, Card temático, indicador de Stepper, ticks de Slider, Suggestion), no como acento suave: con `light` de MUI el borde quedaba casi fusionado con el `-subtle` de abajo y desaparecía. El ratio se derivó del propio default de Material (`primary #6750A4` → `emphasis #B6A6D7` sobre `subtle #E9DDFF` ≈ tint 40%), que reproduce el delta de luminancia que el tema pretendía.
- Unificado `--kendo-border-radius-{sm,md,lg,xl,xxl,xxxl}` a `4px` (antes iban de 2px a 20px según el tamaño) — el DS solo define un `borderRadius` (`shape.borderRadius = 4`), sin escala. `-xxl`/`-xxxl` no tenían override en este archivo y heredaban 16px/20px del tema Material base (Calendar, Window, Stepper, chat bubble), quedando inconsistentes con el resto. `-none` (0px) y `-full` (9999px, pills/círculos: chip, avatar, badge, button rounded-full) quedan como excepciones intencionales.
- Sincronizados los tokens de color (`secondary`, `error`, `warning`, `info`, `success`) con los valores actuales de `DESIGN_TOKENS.md` del DS React — los tonos cambiaron de familia (ej. `secondary` pasó de azul-púrpura a azul "havelock-blue"), no solo de shade.
- `on-primary` / `on-secondary` / `on-error` / `on-warning` / `on-info` / `on-success` ahora usan el `contrastText` oscuro del DS en vez de blanco — los tonos main son demasiado claros para pasar WCAG AA con texto blanco.
- `on-subtle` y `on-surface` de `primary`/`secondary` unificados para usar siempre el valor `dark` (MUI), corrigiendo una inconsistencia en `secondary-on-surface`.
- Bloque `dark` (custom, blueGrey) remapeado a `light`/`dark` del DS (`#455A64` / `#0E1316`) en vez de valores blueGrey arbitrarios.
- `on-app-surface` (text.primary) y `subtle` (text.secondary) pasaron de `rgba(...)` con ancla navy custom a los valores literales del DS (`#0E1316`, `#546E7A`).
- `--kendo-color-surface-alt` de `#ECEFF1` a `#ffffff` — ese token no era solo para "zebra rows": Kendo lo usa como superficie elevada en Grid, Table, Window, Editor, Scheduler, etc., y los dejaba grises.

### Fixed
- Código muerto: unificados en `scss/index.scss` los dos bloques que repetían el mismo selector `h1–h6, .k-h1–.k-h6`; eliminadas en `demo/index.html` las reglas `.section-header`/`.section-header::after` (0 usos, reemplazadas hace tiempo por `.section-header-wrap`) y quitado `#scheduler-demo` de un selector CSS — ese id no existe en el HTML.
- Las 108 deprecation warnings de Sass en cada build (`[if-function]`, todas originadas en `@progress/kendo-theme-material`, no en este repo) se silencian con `--quiet-deps` en `build`/`build:dev`/`watch` — mismo CSS de salida, build limpio.
- Fondo gris en Grid, Chart, Dialog y Window. Kendo liga esos componentes directamente a `--kendo-color-surface` (reservado en gris para que los inputs no se pierdan sobre fondo blanco) sin exponer una variable pública independiente, así que se agregaron overrides puntuales en `index.scss` (`.k-var--background`, `.k-dialog`, `.k-window-content`, `.k-window-titlebar`).
- Fondo del Chart en la demo: `kendo.dataviz.autoTheme()` lee el CSS una sola vez al crear el widget y puede ganarle la carrera al parseo del stylesheet — se fija `chartArea.background` explícito en `demo.js` para no depender de ese timing.

## [1.0.0] — release inicial

- Tema Kendo Material v13 + brand tokens de Estela (colores, tipografía, border radius, elevation).
