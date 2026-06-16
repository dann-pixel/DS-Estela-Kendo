# @estela/kendo-theme

Tema oficial de Estela para **Kendo UI for jQuery**, basado en el tema Material de Kendo v13. Aplica los brand tokens del [Design System de Estela](https://github.com/dann-pixel/DS-Estela-react) — colores, tipografía, border radius y elevation — sobre los componentes Kendo mediante CSS custom properties.

## Stack

| Tecnología | Versión |
|---|---|
| Kendo UI for jQuery | 2026.x |
| @progress/kendo-theme-material | ^13.1.1 |
| Sass (dart-sass) | ^1.87.0 |

---

## Instalación

### Opción A — Desde GitHub (recomendado)

```bash
npm install git+https://github.com/dann-pixel/DS-Estela-Kendo.git
```

O una versión específica:

```bash
npm install git+https://github.com/dann-pixel/DS-Estela-Kendo.git#v1.0.0
```

### Opción B — Manual (sin npm)

Si el proyecto no usa npm, alcanza con copiar el archivo compilado:

1. Descargá `dist/all.css` desde el repositorio
2. Pegalo en tu proyecto, por ejemplo en `assets/css/estela-kendo.css`
3. Cargalo en el `<head>` de tu HTML

---

## Uso

El paquete expone `dist/all.css` — un único archivo que incluye el tema Material base de Kendo **y** los overrides de marca Estela compilados juntos. No es necesario instalar ni cargar `@progress/kendo-theme-material` por separado.

### HTML

```html
<head>
  <!-- Fuentes -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- Tema Estela (incluye el tema Material base + overrides de marca) -->
  <link rel="stylesheet" href="node_modules/@estela/kendo-theme/dist/all.css">
  <!-- o si lo copiaste manualmente: -->
  <!-- <link rel="stylesheet" href="assets/css/estela-kendo.css"> -->
</head>

<body>
  <!-- jQuery y Kendo JS van al final del body -->
  <script src="node_modules/jquery/dist/jquery.min.js"></script>
  <script src="node_modules/@progress/kendo-ui/js/kendo.all.min.js"></script>
</body>
```

### Bundler (Webpack / Vite)

```js
import '@estela/kendo-theme/dist/all.css';
```

---

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

---

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

---

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

---

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

---

## Cómo funciona internamente

Kendo v13 usa CSS custom properties como mecanismo oficial de personalización. El build process:

1. Compila `@progress/kendo-theme-material/scss/all` → genera el CSS base del tema Material con sus valores default.
2. El bloque `:root { --kendo-color-primary: #00B5CC; ... }` de Estela aparece **después** en el CSS → gana por cascada.
3. Un bloque mínimo de *brand patches* cubre las propiedades que Kendo no expone como variable en v13.

El resultado es un único `dist/all.css` autónomo que los proyectos consumidores importan sin necesidad de tener Sass instalado.

---

## FAQ

**¿Necesito instalar `@progress/kendo-theme-material` en mi proyecto?**
No. El tema Material ya está compilado dentro de `dist/all.css`. Cargar ese archivo es suficiente.

**¿Puedo usarlo sin npm?**
Sí. Copiá el archivo `dist/all.css` a tu proyecto y referencíalo con un `<link>` en el HTML. No necesitás instalar nada.

**¿Qué pasa si actualizo el tema manualmente (sin npm)?**
Tenés que volver a copiar `dist/all.css` a mano cada vez que haya una nueva versión. Con npm alcanza con `npm update`.

**¿Necesito cargar las fuentes de Google Fonts?**
Sí. El CSS referencia `Instrument Sans` y `Outfit` pero no las embebe. Si no las cargás, el browser usa la fuente de fallback del sistema.

**¿El tema funciona con cualquier versión de Kendo?**
No. `dist/all.css` está compilado contra Kendo v13 (2026.x). Si tu proyecto usa una versión anterior, revisá la tabla de compatibilidad abajo.

**¿Puedo sobreescribir los colores de Estela en mi proyecto?**
Sí. Agregá un bloque `:root` con las CSS variables de Kendo **después** de cargar `dist/all.css` y tus valores ganarán por cascada.

**¿Puedo usar el tema con Kendo para React o Angular?**
Este paquete está pensado para Kendo UI for jQuery. Para React existe `@progress/kendo-theme-material` con soporte oficial de Telerik; los tokens de Estela habría que portarlos a ese stack.

---

## Compatibilidad

| Kendo UI for jQuery | Este paquete |
|---|---|
| 2026.x | v1.x ✓ |
| 2025.x | Requiere downgrade a theme v12 |
| 2024.x | Requiere downgrade a theme v10–v11 |

---

## Licencia

MIT — Estela
