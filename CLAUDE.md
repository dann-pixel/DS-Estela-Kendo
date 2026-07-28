# @estela/kendo-theme — CLAUDE.md

Paquete npm de tema custom para Kendo UI for jQuery, basado en el tema Material de Kendo v13.1.1. Aplica los brand tokens de Estela (colores, tipografía, border radius, elevation) sobreescribiendo CSS custom properties de Kendo después de compilar el tema base.

## Estructura de archivos

```
@estela/kendo-theme/
├── package.json          — dependencias y scripts de build
├── CLAUDE.md             — este archivo (instrucciones para IA)
├── README.md             — documentación pública del paquete
├── CHANGELOG.md          — historial de cambios (Keep a Changelog)
├── scss/
│   ├── index.scss        — entry point: @use del tema Kendo + @use variables + brand patches
│   └── _variables.scss   — brand tokens de Estela como CSS custom properties (:root)
├── dist/
│   └── all.css           — CSS compilado (commiteado; los consumidores no compilan SASS)
└── demo/
    ├── index.html        — Design System showcase con todos los componentes Kendo
    └── demo.js           — inicialización de componentes via jQuery + Kendo CDN
```

## Cómo funciona el sistema de variables

El tema Kendo v13 utiliza CSS custom properties (`--kendo-*`) como capa de personalización. El proceso de compilación es:

1. `scss/index.scss` hace `@use '@progress/kendo-theme-material/scss/all'` → genera todo el CSS del tema Material con sus colores default.
2. Luego hace `@use 'variables'` → `_variables.scss` contiene un bloque `:root { --kendo-color-primary: ...; }` que sobreescribe los valores default por cascada.
3. `index.scss` agrega un bloque de **brand patches** mínimo para propiedades sin CSS variable equivalente en Kendo v13.

**Por qué CSS variables y no SCSS variables:** El tema v13 genera sus colores desde paletas (mapas SCSS internos), no desde variables simples `!default`. Intentar sobreescribir `$kendo-color-primary` no funciona porque esa variable no existe en v13; los colores se derivan de `$kendo-palette-*`. Las CSS variables son el mecanismo oficial de customización post-compilación.

## Regla de oro: no CSS personalizado

**Nunca agregar CSS selector-based en `index.scss` si existe una CSS variable equivalente en Kendo.**

- Todo lo que admite variable va en `_variables.scss`.
- Solo van en `index.scss` las reglas que, después de confirmar en `dist/all.css`, no tienen `--kendo-*` equivalente.

Los brand patches actuales (y por qué no pueden ser variables):

| Regla en `index.scss` | Por qué no hay variable |
|---|---|
| `h1–h6 { font-family: Outfit }` | `--kendo-font-family` solo aplica internamente a componentes Kendo, no a tags HTML nativos |
| `.k-grid td { padding-block: 6px }` | No existe `--kendo-grid-cell-padding-y` ni variable pública de grilla en v13 |
| `.k-chip { vertical-align: middle }` | No existe variable Kendo para `vertical-align` en chips |

## Tokens de marca Estela (fuente de verdad)

Alineados con el Design System oficial React (`github.com/dann-pixel/DS-Estela-react`), que usa MUI v7:

| Token | Valor | Origen MUI |
|---|---|---|
| Primary | `#00B5CC` | `palette.primary.main` |
| Primary dark | `#006A92` | `palette.primary.dark` |
| Secondary | `#4255FF` | `palette.secondary.main` |
| Font body | `Instrument Sans` | `typography.fontFamily` |
| Font headings | `Outfit` | `typography.h1.fontFamily` |
| Border radius | `4px` | `shape.borderRadius` |
| Elevation estática | `none` | `elevation ≤ 2 → boxShadow: none` |

## Flujo de trabajo: modificar → build → ver → changelog

```bash
# 1. Editar brand tokens
#    Abrir scss/_variables.scss y cambiar el valor de la CSS var que necesitas

# 2. Compilar
npm run build

# 3. Ver cambios en la demo
npm run serve          # sirve en http://localhost:3000/demo/
# — o —
npm run dev            # watch + serve simultáneo (recompila automáticamente)

# 4. Documentar el cambio en CHANGELOG.md (ver sección "Changelog" abajo)
```

## Changelog

**Regla obligatoria: todo cambio en `scss/`, `demo/` o tokens de marca se agrega a `CHANGELOG.md` en la misma tarea que lo introduce.** No se pospone para después ni se agrupa "para más tarde" — si el cambio ya se hizo, la entrada del changelog se escribe antes de terminar la tarea.

- Formato [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/): las entradas nuevas van bajo `## [Unreleased]`, en la categoría que corresponda (`Added`, `Changed`, `Fixed`, `Removed`).
- Una línea por cambio, en español, describiendo el qué y el por qué (no el diff línea por línea).
- Cuando se publica una versión (bump en `package.json`), la sección `[Unreleased]` se retitula con el número de versión y la fecha, y se abre una `[Unreleased]` nueva y vacía arriba.
- Esto aplica a cambios hechos por IA y por humanos por igual.

## Cómo agregar un nuevo token de color

1. Abre `dist/all.css` y busca `--kendo-color-` para ver qué variables expone Kendo en esta versión.
2. Abre `scss/_variables.scss` y agrega la variable en la sección correspondiente:

```scss
:root {
  --kendo-color-primary: #00B5CC;          /* ← ya existe */
  --kendo-color-primary-new-shade: #xxx;   /* ← agrega aquí */
}
```

3. Ejecuta `npm run build`.
4. Verifica en la demo: los swatches leen las CSS vars con `getComputedStyle`.

### Cómo encontrar el nombre correcto de la CSS variable

- Busca en `dist/all.css`: `grep '--kendo-color-' dist/all.css | sort -u`
- O abre la demo en el navegador → DevTools → Elements → `:root` para verlas en vivo.
- Referencia oficial: https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes/customization

## Cómo agregar un nuevo token de tipografía

```scss
:root {
  --kendo-font-family:    'Instrument Sans', sans-serif;
  --kendo-font-size:      0.875rem;   /* 14px */
  --kendo-font-size-lg:   1rem;       /* 16px */
}
```

Kendo usa `--kendo-font-family`, `--kendo-font-size`, `--kendo-font-size-sm/md/lg/xl` para todos los componentes.

## Instalación en un proyecto consumidor

### Desde git (recomendado mientras no hay registry privado)

```bash
npm install git+https://github.com/dann-pixel/DS-Estela-Kendo.git
# — o con una versión específica —
npm install git+https://github.com/dann-pixel/DS-Estela-Kendo.git#v1.0.0
```

### Desde ruta local (desarrollo)

```bash
npm install ../ruta/a/DS-Estela-kendo
```

### Uso en el proyecto consumidor

El paquete expone `dist/all.css`. Importarlo **después** del JS de Kendo:

```html
<!-- 1. Kendo JS -->
<script src="kendo.all.min.js"></script>

<!-- 2. Tema Estela (incluye el tema Material base + overrides de marca) -->
<link rel="stylesheet" href="node_modules/@estela/kendo-theme/dist/all.css">
```

O en un bundler (Webpack, Vite):

```js
import '@estela/kendo-theme/dist/all.css';
```

**No** instalar `@progress/kendo-theme-material` por separado en el proyecto consumidor; ya está incluido y compilado en `dist/all.css`.

## Cómo actualizar cuando Kendo saca una nueva versión

1. Actualizar la devDependency:

```bash
npm install @progress/kendo-theme-material@^13.X.X --save-dev
```

2. Recompilar y revisar errores:

```bash
npm run build
```

3. Auditar variables nuevas o renombradas entre versiones:

```bash
grep '--kendo-color-' dist/all.css | sort -u
```

4. Ajustar `scss/_variables.scss` si cambiaron nombres de variables.
5. Abrir la demo y revisar visualmente todos los componentes.
6. Commitear `dist/all.css` junto con `package.json` actualizado.

## Compatibilidad de versiones

| Kendo UI for jQuery | @progress/kendo-theme-material |
|---|---|
| 2026.x | v13.x (actual) |
| 2025.x | v12.x |
| 2024.x | v10–v11.x |

Usar siempre la versión de tema que corresponde a la versión de Kendo UI del proyecto consumidor.

## Convenciones

- Las CSS variables siguen el prefijo `--kendo-` (no crear `--estela-*` salvo para componentes propios no-Kendo).
- Si en el futuro se agregan estilos de componentes propios de Estela, usar `--estela-` como prefijo.
- Los colores en `_variables.scss` van de más claro a más oscuro dentro de cada grupo.
- Comentarios en español para el equipo interno, código en inglés.

## Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm run build` | Compila SCSS → CSS minificado en `dist/all.css` |
| `npm run build:dev` | Compila SCSS → CSS expandido (útil para depurar) |
| `npm run watch` | Modo watch: recompila en cada cambio de SCSS |
| `npm run serve` | Sirve el proyecto en `http://localhost:3000` |
| `npm run dev` | `watch` + `serve` en paralelo (desarrollo) |

## Notas técnicas

- **dart-sass** (`sass`): se usa la implementación oficial. No usar `node-sass` (deprecado).
- **`--load-path=node_modules`**: necesario para que Sass resuelva `@progress/kendo-theme-material`.
- **`dist/all.css` se commitea**: los proyectos consumidores no tienen Sass instalado; el CSS compilado es el artefacto de distribución.
- La demo carga jQuery y Kendo desde CDN (jQuery 4.0.0 + Kendo 2026.1.415) para no depender del build del proyecto.
- Los iconos en Kendo v13 son SVG data-URIs embebidos en el CSS — no se necesita CDN de fuentes de iconos.
- `--kendo-elevation-1: none` elimina sombras de botones y cards estáticas; los overlays (Dialog, Popup, Tooltip) usan `elevation-2/3` y mantienen su sombra.
- `--kendo-color-surface: #F4F6F8` (no `#ffffff`) para que los inputs solid tengan fondo visible sobre fondos blancos.
