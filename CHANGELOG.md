# Changelog

Todos los cambios notables de este paquete se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto sigue [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

### Changed
- Sincronizados los tokens de color (`secondary`, `error`, `warning`, `info`, `success`) con los valores actuales de `DESIGN_TOKENS.md` del DS React — los tonos cambiaron de familia (ej. `secondary` pasó de azul-púrpura a azul "havelock-blue"), no solo de shade.
- `on-primary` / `on-secondary` / `on-error` / `on-warning` / `on-info` / `on-success` ahora usan el `contrastText` oscuro del DS en vez de blanco — los tonos main son demasiado claros para pasar WCAG AA con texto blanco.
- `on-subtle` y `on-surface` de `primary`/`secondary` unificados para usar siempre el valor `dark` (MUI), corrigiendo una inconsistencia en `secondary-on-surface`.
- Bloque `dark` (custom, blueGrey) remapeado a `light`/`dark` del DS (`#455A64` / `#0E1316`) en vez de valores blueGrey arbitrarios.
- `on-app-surface` (text.primary) y `subtle` (text.secondary) pasaron de `rgba(...)` con ancla navy custom a los valores literales del DS (`#0E1316`, `#546E7A`).
- `--kendo-color-surface-alt` de `#ECEFF1` a `#ffffff` — ese token no era solo para "zebra rows": Kendo lo usa como superficie elevada en Grid, Table, Window, Editor, Scheduler, etc., y los dejaba grises.

### Fixed
- Fondo gris en Grid, Chart, Dialog y Window. Kendo liga esos componentes directamente a `--kendo-color-surface` (reservado en gris para que los inputs no se pierdan sobre fondo blanco) sin exponer una variable pública independiente, así que se agregaron overrides puntuales en `index.scss` (`.k-var--background`, `.k-dialog`, `.k-window-content`, `.k-window-titlebar`).
- Fondo del Chart en la demo: `kendo.dataviz.autoTheme()` lee el CSS una sola vez al crear el widget y puede ganarle la carrera al parseo del stylesheet — se fija `chartArea.background` explícito en `demo.js` para no depender de ese timing.

## [1.0.0] — release inicial

- Tema Kendo Material v13 + brand tokens de Estela (colores, tipografía, border radius, elevation).
