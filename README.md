# @estela/kendo-theme

Tema oficial de Estela para **Kendo UI for jQuery**, basado en el tema Material de Kendo v13. Aplica los brand tokens del [Design System de Estela](https://github.com/dann-pixel/DS-Estela-react) — colores, tipografía, border radius y elevation — sobre los componentes Kendo mediante CSS custom properties.

## Stack

| Tecnología | Versión |
|---|---|
| Kendo UI for jQuery | 2026.x |
| @progress/kendo-theme-material | ^13.1.1 |
| Sass (dart-sass) | ^1.87.0 |

## Instalación

### Desde GitHub

```bash
npm install git+https://github.com/dann-pixel/DS-Estela-Kendo.git
```

### Desde ruta local (desarrollo)

```bash
npm install ../DS-Estela-kendo
```

## Uso

El paquete expone `dist/all.css` — incluye el tema Material base de Kendo **y** los overrides de marca de Estela compilados en un solo archivo. No es necesario instalar `@progress/kendo-theme-material` por separado.

### HTML

```html
<!-- 1. jQuery -->
<script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>

<!-- 2. Kendo UI for jQuery JS -->
<script src="https://kendo.cdn.telerik.com/2026.1.415/js/kendo.all.min.js"></script>

<!-- 3. Tema Estela -->
<link rel="stylesheet" href="node_modules/@estela/kendo-theme/dist/all.css">
```

### Bundler (Webpack / Vite)

```js
import '@estela/kendo-theme/dist/all.css';
```

### Fuentes (Google Fonts)

El tema usa `Instrument Sans` para body y `Outfit` para headings. Agrega esto en el `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## Brand tokens principales

| Token | Valor | Descripción |
|---|---|---|
| Primary | `#00B5CC` | Cyan Estela |
| Primary dark | `#006A92` | Cyan oscuro — texto sobre superficies |
| Secondary | `#4255FF` | Blue-Purple Estela |
| Font body | `Instrument Sans` | Texto general |
| Font headings | `Outfit` | h1–h6 |
| Border radius | `4px` | Esquinas de componentes |
| Elevation estática | `none` | Botones y cards sin sombra |
| Surface | `#F4F6F8` | Fondo de inputs y componentes interactivos |

## Personalización adicional

Todos los tokens se pueden sobreescribir en el proyecto consumidor añadiendo un bloque `:root` **después** de cargar `dist/all.css`:

```css
:root {
  --kendo-color-primary:    #MiColorPrimary;
  --kendo-font-family:      'Mi Fuente', sans-serif;
  --kendo-border-radius-md: 8px;
}
```

Ver la lista completa de variables disponibles en la [documentación oficial de Kendo](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes/customization).

## Desarrollo

### Requisitos

- Node.js 18+
- npm 9+

### Setup

```bash
git clone https://github.com/dann-pixel/DS-Estela-Kendo.git
cd DS-Estela-Kendo
npm install
```

### Comandos

| Comando | Descripción |
|---|---|
| `npm run build` | Compila SCSS → `dist/all.css` (minificado) |
| `npm run build:dev` | Compila SCSS → `dist/all.css` (expandido, para depurar) |
| `npm run watch` | Recompila automáticamente en cada cambio |
| `npm run serve` | Sirve la demo en `http://localhost:3000` |
| `npm run dev` | `watch` + `serve` simultáneo |

### Ver la demo

```bash
npm run dev
# Abre http://localhost:3000/demo/
```

La demo muestra todos los componentes Kendo con el tema aplicado: paleta de colores, tipografía, botones, inputs, grid, chips, badges, datepicker, notificaciones y más.

### Modificar tokens

1. Editar `scss/_variables.scss`
2. `npm run build`
3. Verificar en la demo

```scss
// scss/_variables.scss
:root {
  --kendo-color-primary: #00B5CC; /* Cambiar aquí */
}
```

## Estructura del proyecto

```
DS-Estela-Kendo/
├── scss/
│   ├── index.scss        — Entry point: importa el tema Kendo + variables Estela
│   └── _variables.scss   — Brand tokens como CSS custom properties
├── dist/
│   └── all.css           — CSS compilado (artefacto de distribución)
├── demo/
│   ├── index.html        — Showcase de componentes
│   └── demo.js           — Inicialización de widgets jQuery/Kendo
├── package.json
├── README.md
└── CLAUDE.md             — Instrucciones para asistentes IA
```

## Cómo funciona internamente

Kendo v13 usa CSS custom properties como mecanismo oficial de personalización. El build process:

1. Compila `@progress/kendo-theme-material/scss/all` → genera el CSS base del tema Material con sus valores default.
2. El bloque `:root { --kendo-color-primary: #00B5CC; ... }` de Estela aparece **después** en el CSS → gana por cascada.
3. Un bloque mínimo de *brand patches* cubre las propiedades que Kendo no expone como variable en v13.

El resultado es un único `dist/all.css` autónomo que los proyectos consumidores importan sin necesidad de tener Sass instalado.

## Compatibilidad

| Kendo UI for jQuery | Este paquete |
|---|---|
| 2026.x | v1.x ✓ |
| 2025.x | Requiere downgrade a theme v12 |
| 2024.x | Requiere downgrade a theme v10–v11 |

## Licencia

MIT — Estela
