# Auditoría del sistema de diseño — hallazgos pendientes

Revisión completa de tokens, SCSS compilado, demo y documentación realizada el
**2026-07-29** sobre `@progress/kendo-theme-material` 13.1.1 / Kendo UI 2026.1.415.

**Alcance:** se excluyó accesibilidad por pedido explícito. Contraste de texto,
navegación por teclado, targets táctiles y comportamiento con lector de pantalla
**no** fueron evaluados y siguen sin auditar.

## Estado

| ID | Hallazgo | Severidad | Estado |
|---|---|---|---|
| A1 | Rampas semánticas cubiertas a medias | Alto | ✅ Corregido |
| A2 | `-emphasis` mal mapeado (MUI `light` ≠ Kendo `emphasis`) | Alto | ✅ Corregido |
| A3 | Paleta de series de charts sin marca | Alto | ✅ Corregido |
| M4 | Documentación desincronizada con los tokens | Medio | ✅ Corregido |
| M5 | Valores stale hardcodeados en la demo | Medio | ✅ Corregido |
| M6 | Regla de elevation implementada a la mitad | Medio | ✅ Corregido |
| M7 | La demo cubre 24 de ~50 familias de widgets | Medio | ✅ Corregido (parcial, ver detalle) |
| M8 | Demo con watermark de trial de Kendo | Medio | 🚫 Bloqueado — necesita license key real |
| M9 | `tertiary` es un color inventado, no del DS | Medio | ⚠️ Mitigado (ver detalle) |
| B1 | Escala de spacing sin mapear | Bajo | 📝 Documentado, no aplicado (ver detalle) |
| B2 | Tipografía tokenizada a medias | Bajo | ✅ Corregido |
| B3 | `--kendo-disabled-*` sin override | Bajo | 🚫 Bloqueado — necesita datos del DS React |
| B4 | Código muerto en `index.scss` y en la demo | Bajo | ✅ Corregido |
| B5 | 108 deprecation warnings de Sass en cada build | Bajo | ✅ Corregido |

---

## Verificado como correcto

No hace falta tocar nada de esto; queda registrado para no re-auditarlo:

- `dist/all.css` está sincronizado con `scss/` (recompilación a temporal → diff idéntico).
- El `:root` de Estela es el último bloque del CSS (offset 973.769 de 977.676), después
  de los 8 bloques `:root` de Kendo → gana por cascada sin necesidad de `!important`.
- Los 4 brand patches de `index.scss` no tienen CSS variable equivalente en v13
  (verificado caso por caso). La regla de oro se respeta.
- El border radius unificado a 4px se aplica, incluidos `-xxl`/`-xxxl`.
- `--kendo-border-radius-xs` **no** necesita override: Kendo la declara pero nunca
  la consume. No "arreglarla".
- Los `themeColor` válidos de Chip son solo `base|info|success|warning|error`
  (Kendo v13 no genera `k-chip-solid-primary`). El comentario en `demo.js` es correcto.
- Cobertura de tokens de color: **147/147** tras A1–A3.
- README.md, CLAUDE.md y la demo ya no citan valores viejos de `secondary`; los tres
  quedan sincronizados con `scss/_variables.scss` tras M4/M5.

---

## Corregidos — M4 y M5

### M4 · Documentación desincronizada con los tokens

`README.md` (tabla "Brand tokens principales") y `CLAUDE.md` (tabla "Tokens de marca
Estela") declaraban `Secondary #4255FF` "Blue-Purple Estela". El valor real en
`scss/_variables.scss` es `#4688EC` (havelock-blue) desde un cambio anterior ya
documentado en `CHANGELOG.md`; README y CLAUDE.md habían quedado atrás.

**Hecho:** actualizadas ambas tablas a `#4688EC` / "Havelock-blue Estela".

### M5 · Valores stale hardcodeados en la demo

18 colores hex hardcodeados en la demo contra solo 4 usos de `var(--kendo-*)`. Todos
reemplazados:

- `#4255FF` (secondary vieja) → `var(--kendo-color-secondary, #4688EC)` en las 6
  ocurrencias de `demo/index.html` (`.section-title`, `.section-header-wrap`,
  `.docs-link`, `.docs-link:hover`, `#changelog-content a`) y en el fallback de
  `demo/demo.js:414`. El `rgba(66, 85, 255, …)` derivado del hex viejo pasó a
  `rgba(70, 136, 236, …)`, el RGB del nuevo secondary.
- `#ef4444` (rojo de Tailwind, ajeno al DS) → `#F15B50` (el `error` real del tema) en
  los 4 fallbacks del asterisco de campos requeridos.
- `rgba(16, 20, 38, …)` (ancla navy vieja) → `rgba(14, 19, 22, …)`, el RGB de
  `#0E1316` (`on-app-surface`/`inverse` actual), preservando las 4 opacidades
  (`.87`/`.60`/`.55`/`.45`) que ya diferenciaban roles de texto en la demo.
- Etiquetas de sección corregidas: "Primary — Estela Blue" → **"Primary — Estela
  Cyan"**, "Secondary — Estela Amber" → **"Secondary — Estela Blue"**.

Verificado en el navegador: `--kendo-color-secondary` resuelve a `#4688EC`, el borde de
`.section-header-wrap` y el color de `.docs-link` son `rgb(70, 136, 236)`, sin errores
de consola.

---

## Corregidos — M6, M7 (parcial), B2, B4, B5

### M6 · Regla de elevation implementada a la mitad

README, CLAUDE.md y el comentario de `_variables.scss` decían "elevation ≤ 2 → none"
(regla del DS React), pero solo existe `--kendo-elevation-1: none`; `elevation-2`
conserva su sombra (verificado en vivo) y así debe quedar: la usan popups y dropdowns,
donde la sombra es lo que los separa del fondo.

**Hecho:** corregida la documentación, no el token — en `CLAUDE.md` y en el comentario
de `_variables.scss` ahora dice "elevation-1 → none".

### M7 · La demo cubre 24 de ~50 familias de widgets (parcial)

Se agregaron los 5 widgets priorizados, los que consumían los tokens menos
ejercitados y donde vivía el bug de A2: **Card, MessageBox, Stepper, Slider,
Calendar**. Nueva sección "Cards & Feedback" en la demo (nav + `#cards`), y Slider +
Calendar dentro de Forms. Verificado en navegador sin errores de consola: el borde
`-emphasis` se ve correctamente en MessageBox y en la línea conectora del Stepper —
la misma prueba visual que A2 no tenía antes.

Card y MessageBox son markup + clases CSS puras en Kendo v13 (`.k-card`/
`.k-card-{color}`, `.k-messagebox`/`.k-messagebox-{color}`), sin widget JS.

**Sigue pendiente:** Menu, TreeView, Toolbar, ListView, ComboBox, AutoComplete,
TimePicker, DateTimePicker, Splitter, PanelBar, Breadcrumb, Scheduler, Rating,
ColorPicker, Upload, Editor, ActionSheet, Timeline, TaskBoard, Skeleton, FAB,
FileManager, PivotGrid, Gantt — ninguno tiene bugs conocidos hoy, se agregan cuando
haga falta cobertura, no hay urgencia.

### B2 · Tipografía tokenizada a medias

La escala de tamaños de heading (`h1 2rem` … `h6 .75rem`) vivía solo en atributos
`style=` de `demo/index.html`; un proyecto consumidor heredaba `font-family: Outfit`
pero no los tamaños.

**Hecho:** la escala completa (tamaño + line-height, y para `h6` también
`text-transform`/`letter-spacing`, su tratamiento de label en este DS) se agregó a
`scss/index.scss` sobre `h1–h6, .k-h1–.k-h6`. `--kendo-font-weight-*` y
`--kendo-line-height-*` siguen en los defaults de Kendo — no formaban parte de este
hallazgo.

### B4 · Código muerto

- `scss/index.scss` — los dos bloques que repetían el mismo selector `h1–h6,
  .k-h1–.k-h6` (uno para `font-family`, otro para `font-weight`) se unificaron en uno,
  en el mismo cambio que agregó la escala de B2.
- `demo/index.html` — eliminadas las reglas `.section-header` y `.section-header
  .section-title` y `.section-header::after` (0 usos; el markup solo usa
  `.section-header-wrap`).
- `demo/index.html` — quitado `#scheduler-demo` del selector `#grid-demo,
  #scheduler-demo` (ese id no existe en el HTML).

### B5 · 108 deprecation warnings de Sass en cada build

Todos de tipo `[if-function]`, originados en `@progress/kendo-theme-material` /
`kendo-theme-core`, no en código de este repo.

**Hecho:** agregado `--quiet-deps` a `build`, `build:dev` y `watch` en
`package.json` — ese flag de Sass existe exactamente para silenciar warnings que
vienen de una dependencia, no del código propio. Verificado: mismo CSS de salida,
build sin ninguna línea de warning. Nota aparte: el riesgo de que Sass 2.0 rompa el
build ya estaba acotado por el propio `^1.87.0` (semver caret tope en `<2.0.0`); no
hizo falta pinear la versión.

---

## Mitigado sin poder cerrar del todo — M9

### M9 · `tertiary` es un color inventado

`--kendo-color-tertiary` = teal `#00796B`, de la paleta de Material, no del DS React.
La acción real (definirlo en el DS React, o sacarlo del showcase) no es algo que
pueda resolver desde este repo: el DS React vive en otro repositorio
(`dann-pixel/DS-Estela-react`) al que no tengo acceso, y sacarlo del showcase por
completo eliminaría un color de tema funcional que hoy no está roto, usado en ~10
lugares (botones, avatares, badges, y como `series-f` de A3).

**Hecho, como mitigación parcial:** la etiqueta en la demo ("Tertiary — Estela Teal",
que lo presentaba como si fuera oficial) ahora dice "Tertiary — Teal (provisional, no
confirmado en el DS React)". El resto del showcase queda igual.

**Sigue pendiente:** la decisión real, que le corresponde a quien mantiene el DS React.

---

## Documentado, decidido no aplicar — B1

### B1 · Escala de spacing sin mapear

`--kendo-spacing-1` = `0.25rem` (base 4px) contra `spacing(1)` = 8px de MUI. 34
variables sirviendo la escala nativa de Kendo, no la del DS.

**Decisión:** no remapear en esta pasada. Cambiar la base de spacing afecta el
padding/gap de **todos** los componentes Kendo simultáneamente — es exactamente el
tipo de cambio de alto impacto visual que esta misma auditoría señaló como necesitado
de su propia revisión aislada con la demo completa, no algo para resolver de paso
junto a otros nueve hallazgos. Se documentó la decisión en `scss/_variables.scss`
(sección "Spacing", junto a Elevation) para que no se lea como un olvido.

Si se decide mapear en el futuro: es un cambio de una sola sección de tokens, aislado,
con su propia revisión visual completa de la demo antes de mergear.

---

## Bloqueados — necesitan datos que no están en este repo

### M8 · Demo con watermark de trial de Kendo

`demo/index.html` carga `kendo.all.min.js` 2026.1.415 desde el CDN sin license key.
Toda la demo queda cruzada por diagonales "kendo trial" más un banner de warning.

**Bloqueado:** necesita una license key real de Telerik/Kendo UI del equipo, que no
existe en este repo ni puedo generar. Cuando se consiga: agregarla vía
`kendo.licensing.setScriptKey()` o `kendo-ui-license.txt`, sin commitear la key en
texto plano al repo (variable de entorno / secret del pipeline de demo, a decidir).

### B3 · `--kendo-disabled-*` sin override

`--kendo-disabled-opacity: .6`, `--kendo-disabled-filter: grayscale(.1)`,
`--kendo-disabled-bg/border/text` siguen en los defaults de Kendo.

**Bloqueado:** requiere los valores de `action.disabled` del tema MUI del DS React
(`dann-pixel/DS-Estela-react`), que no están en este repo. Inventar un valor sería
exactamente el tipo de dato fabricado que esta auditoría evita en todos los demás
tokens — todos los valores usados en A1–A3 salieron de una fuente verificable
(Material default o DS React), no de una suposición.

---

## Nota, no hallazgo

`npm run serve` sirve la raíz del repo en vez de `demo/`. Es intencional y necesario:
la vista Changelog hace `fetch('../CHANGELOG.md')` y dejaría de funcionar si el root
del server fuera `demo/`. No "arreglar" sin mover también ese fetch.
