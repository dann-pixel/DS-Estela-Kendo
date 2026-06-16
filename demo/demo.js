/* global kendo, $ */
'use strict';

$(function () {

  // ── Sidebar active state on scroll ──────────────────────────────────────
  var sections = document.querySelectorAll('.section');
  var navLinks = document.querySelectorAll('#sidebar-nav a');

  function setActiveLink() {
    var currentId = '';
    sections.forEach(function (s) {
      if (s.getBoundingClientRect().top <= 80) currentId = s.id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
  }
  document.getElementById('main').addEventListener('scroll', setActiveLink);
  setActiveLink();

  // ── Helpers ─────────────────────────────────────────────────────────────
  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function cap(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function makeSwatch(varName, label) {
    var val = cssVar(varName) || '#ccc';
    return '<div class="color-swatch">' +
      '<div class="color-swatch-block" style="background:' + val + '"></div>' +
      '<div class="color-swatch-info">' +
        '<span class="color-swatch-name">' + label + '</span>' +
        '<span class="color-swatch-var">' + varName + '</span>' +
        '<span class="color-swatch-hex">' + val + '</span>' +
      '</div>' +
    '</div>';
  }

  // ════════════════════════════════════════════════════════════════════════
  // COLORS
  // ════════════════════════════════════════════════════════════════════════

  function renderSwatches(id, list) {
    $('#' + id).html(list.map(function (s) { return makeSwatch(s[0], s[1]); }).join(''));
  }

  renderSwatches('primary-swatches', [
    ['--kendo-color-primary-subtle',        'Primary Subtle'],
    ['--kendo-color-primary-subtle-hover',  'Primary Subtle Hover'],
    ['--kendo-color-primary-subtle-active', 'Primary Subtle Active'],
    ['--kendo-color-primary',               'Primary'],
    ['--kendo-color-primary-hover',         'Primary Hover'],
    ['--kendo-color-primary-active',        'Primary Active'],
    ['--kendo-color-primary-emphasis',      'Primary Emphasis'],
    ['--kendo-color-on-primary',            'On Primary'],
  ]);

  renderSwatches('secondary-swatches', [
    ['--kendo-color-secondary-subtle',        'Secondary Subtle'],
    ['--kendo-color-secondary-subtle-hover',  'Secondary Subtle Hover'],
    ['--kendo-color-secondary',               'Secondary'],
    ['--kendo-color-secondary-hover',         'Secondary Hover'],
    ['--kendo-color-secondary-active',        'Secondary Active'],
    ['--kendo-color-secondary-emphasis',      'Secondary Emphasis'],
    ['--kendo-color-on-secondary',            'On Secondary'],
  ]);

  renderSwatches('tertiary-swatches', [
    ['--kendo-color-tertiary-subtle',        'Tertiary Subtle'],
    ['--kendo-color-tertiary-subtle-hover',  'Tertiary Subtle Hover'],
    ['--kendo-color-tertiary-subtle-active', 'Tertiary Subtle Active'],
    ['--kendo-color-tertiary',               'Tertiary'],
    ['--kendo-color-tertiary-hover',         'Tertiary Hover'],
    ['--kendo-color-tertiary-active',        'Tertiary Active'],
    ['--kendo-color-tertiary-emphasis',      'Tertiary Emphasis'],
    ['--kendo-color-on-tertiary',            'On Tertiary'],
  ]);

  renderSwatches('semantic-swatches', [
    ['--kendo-color-success',        'Success'],
    ['--kendo-color-success-subtle', 'Success Subtle'],
    ['--kendo-color-warning',        'Warning'],
    ['--kendo-color-warning-subtle', 'Warning Subtle'],
    ['--kendo-color-error',          'Error'],
    ['--kendo-color-error-subtle',   'Error Subtle'],
    ['--kendo-color-info',           'Info'],
    ['--kendo-color-info-subtle',    'Info Subtle'],
  ]);

  renderSwatches('surface-swatches', [
    ['--kendo-color-app-surface',  'App Surface'],
    ['--kendo-color-surface',      'Surface'],
    ['--kendo-color-surface-alt',  'Surface Alt'],
    ['--kendo-color-base',         'Base'],
    ['--kendo-color-base-hover',   'Base Hover'],
    ['--kendo-color-base-active',  'Base Active'],
    ['--kendo-color-subtle',       'Subtle'],
    ['--kendo-color-border',       'Border'],
  ]);

  // ════════════════════════════════════════════════════════════════════════
  // BUTTONS — toda la configuración está en los atributos data-* del HTML
  // ════════════════════════════════════════════════════════════════════════

  kendo.init($('#buttons')[0]);

  // ════════════════════════════════════════════════════════════════════════
  // FORMS
  // ════════════════════════════════════════════════════════════════════════

  // ── Formulario de ejemplo — Registro de contacto ──────────────────────────

  $('#cf-nombre').kendoTextBox({ placeholder: 'Ingresa el nombre' });
  $('#cf-apellido').kendoTextBox({ placeholder: 'Ingresa el apellido' });
  $('#cf-email').kendoTextBox({ placeholder: 'correo@empresa.com' });
  $('#cf-telefono').kendoTextBox({ placeholder: '+56 9 0000 0000' });

  $('#cf-pais').kendoDropDownList({
    optionLabel: 'Selecciona un país...',
    dataSource: ['Chile', 'Argentina', 'Colombia', 'México', 'Perú', 'España', 'Uruguay'],
  });

  $('#cf-area').kendoDropDownList({
    optionLabel: 'Selecciona un área...',
    dataSource: ['Comercial', 'Tecnología', 'Finanzas', 'Recursos Humanos', 'Operaciones', 'Marketing'],
  });

  $('#cf-fecha').kendoDatePicker({
    value: new Date(),
    format: 'dd/MM/yyyy',
  });

  $('#cf-monto').kendoNumericTextBox({
    min: 0,
    step: 100,
    decimals: 2,
    format: 'n2',
    placeholder: '0.00',
  });

  $('#cf-etiquetas').kendoMultiSelect({
    placeholder: 'Agrega etiquetas...',
    dataSource: ['Cliente VIP', 'Prospecto', 'Partner', 'Proveedor', 'Soporte', 'Demo', 'Lead calificado'],
  });

  $('#cf-activo').kendoSwitch({ checked: true });
  $('#cf-notif').kendoSwitch({ checked: false });

  $('#cf-btn-guardar').kendoButton({ icon: 'save',  themeColor: 'primary',   fillMode: 'solid' });
  $('#cf-btn-cancelar').kendoButton({ icon: 'x',    themeColor: 'base',      fillMode: 'outline' });
  $('#cf-btn-reset').kendoButton({   icon: 'reset', themeColor: 'base',      fillMode: 'flat' });

  // Limpiar formulario
  $('#cf-btn-reset').on('click', function () {
    $('#cf-nombre').data('kendoTextBox').value('');
    $('#cf-apellido').data('kendoTextBox').value('');
    $('#cf-email').data('kendoTextBox').value('');
    $('#cf-telefono').data('kendoTextBox').value('');
    $('#cf-pais').data('kendoDropDownList').value('');
    $('#cf-area').data('kendoDropDownList').value('');
    $('#cf-fecha').data('kendoDatePicker').value(new Date());
    $('#cf-monto').data('kendoNumericTextBox').value(null);
    $('#cf-etiquetas').data('kendoMultiSelect').value([]);
    $('#cf-activo').data('kendoSwitch').check(true);
    $('#cf-notif').data('kendoSwitch').check(false);
  });

  // Guardar (simulado — muestra notificación)
  $('#cf-btn-guardar').on('click', function () {
    var nombre = $('#cf-nombre').data('kendoTextBox').value();
    var email  = $('#cf-email').data('kendoTextBox').value();
    if (!nombre || !email) {
      notification.show('Completa los campos obligatorios (Nombre y Correo).', 'warning');
      if (!nombre) $('#cf-nombre').closest('.k-input').addClass('k-invalid');
      if (!email)  $('#cf-email').closest('.k-input').addClass('k-invalid');
      return;
    }
    $('#cf-nombre, #cf-email').closest('.k-input').removeClass('k-invalid');
    notification.show('Contacto "' + nombre + '" guardado correctamente.', 'success');
  });

  $('#cf-btn-cancelar').on('click', function () {
    notification.show('Operación cancelada.', 'info');
  });

  // ── Componentes de Forms individuales ─────────────────────────────────────

  $('#tb-normal').kendoTextBox({ placeholder: 'Escribe aquí...' });
  $('#tb-disabled').kendoTextBox({ enable: false });
  // readonly via HTML attribute is respected, but we still init the widget for styling
  $('#tb-readonly').kendoTextBox();
  // After init, add k-invalid to the wrapper so Kendo renders the error outline/color
  $('#tb-error').kendoTextBox();
  $('#tb-error').closest('.k-textbox-container, .k-input').addClass('k-invalid');

  $('#ntb-1').kendoNumericTextBox({ value: 42, min: 0, step: 1, decimals: 0 });
  $('#dp-1').kendoDatePicker({ value: new Date() });

  $('#ddl-1').kendoDropDownList({
    optionLabel: 'Seleccionar...',
    dataSource: ['Análisis', 'Segmentación', 'Predicción', 'Reporte', 'Dashboard'],
  });

  $('#ms-1').kendoMultiSelect({
    placeholder: 'Selecciona etiquetas...',
    dataSource: ['Python', 'SQL', 'Power BI', 'Tableau', 'R', 'Spark', 'dbt'],
    value: ['Python', 'SQL'],
  });

  $('#sw-1').kendoSwitch({ checked: true });
  $('#sw-2').kendoSwitch({ checked: false });

  // kendoCheckBox renders its own <label> when the `label` option is set.
  // Do NOT also create a manual <label> — that results in duplicate labels.
  [
    { id: 'cb-a', label: 'Opción A', checked: true  },
    { id: 'cb-b', label: 'Opción B', checked: false },
    { id: 'cb-c', label: 'Opción C', checked: true  },
  ].forEach(function (item) {
    var $input = $('<input>', { type: 'checkbox', id: item.id });
    $('#cb-row').append($('<div>').append($input));
    $input.kendoCheckBox({ label: item.label, checked: item.checked });
  });

  $('#rg-1').kendoRadioGroup({
    items: [
      { label: 'Diario',   value: 'daily'   },
      { label: 'Semanal',  value: 'weekly'  },
      { label: 'Mensual',  value: 'monthly', enabled: false },
    ],
    value: 'weekly',
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRID
  // ════════════════════════════════════════════════════════════════════════

  var gridData = [];
  var productos = ['Préstamo Personal','Tarjeta de Crédito','Cuenta Corriente','Inversión','Seguro de Vida','Hipoteca','Leasing','Fondos Mutuos','Depósito a Plazo','Cuenta Vista'];
  var estados   = ['Activo','Pendiente','Cerrado','En revisión'];
  var zonas     = ['Norte','Sur','Centro','Oriente','Poniente'];

  for (var i = 1; i <= 50; i++) {
    gridData.push({
      id:       i,
      producto: productos[i % productos.length],
      cliente:  'Cliente ' + (1000 + i),
      zona:     zonas[i % zonas.length],
      monto:    Math.round(1000 + Math.random() * 99000),
      estado:   estados[i % estados.length],
      fecha:    new Date(2025, i % 12, (i % 28) + 1),
    });
  }

  $('#grid-demo').kendoGrid({
    dataSource: {
      data:     gridData,
      pageSize: 10,
      schema: {
        model: {
          fields: {
            id:    { type: 'number' },
            monto: { type: 'number' },
            fecha: { type: 'date'   },
          },
        },
      },
    },
    sortable:   true,
    filterable: { mode: 'row' },
    pageable:   { refresh: true, pageSizes: [10, 25, 50] },
    columns: [
      { field: 'id',       title: '#',        width: 60  },
      { field: 'producto', title: 'Producto',  width: 180 },
      { field: 'cliente',  title: 'Cliente',   width: 120 },
      { field: 'zona',     title: 'Zona',      width: 100 },
      { field: 'monto',    title: 'Monto',     width: 110, format: '{0:C0}' },
      { field: 'estado',   title: 'Estado',    width: 110 },
      { field: 'fecha',    title: 'Fecha',     width: 120, format: '{0:dd/MM/yyyy}' },
    ],
    height: 420,
  });

  // ════════════════════════════════════════════════════════════════════════
  // CHARTS
  // ════════════════════════════════════════════════════════════════════════

  $('#chart-bar').kendoChart({
    legend: { visible: false },
    series: [{
      type:  'bar',
      name:  'Ventas',
      data:  [420, 380, 510, 630, 595, 720, 685, 810],
      color: cssVar('--kendo-color-primary') || '#00B5CC',
    }],
    categoryAxis: {
      categories: ['Q1 2023','Q2 2023','Q3 2023','Q4 2023','Q1 2024','Q2 2024','Q3 2024','Q4 2024'],
      majorGridLines: { visible: false },
    },
    valueAxis: { labels: { template: '\\$#= value #M' } },
    tooltip: { visible: true, format: '\\${0}M' },
  });

  $('#chart-line').kendoChart({
    legend: { position: 'bottom' },
    series: [
      {
        type:    'line',
        name:    'Activos',
        data:    [45,52,48,61,55,67,72,68,75,82,79,88],
        color:   cssVar('--kendo-color-primary') || '#00B5CC',
        markers: { visible: true, size: 6 },
      },
      {
        type:     'line',
        name:     'Pasivos',
        data:     [30,28,35,32,38,36,40,38,42,45,43,47],
        color:    cssVar('--kendo-color-secondary') || '#4255FF',
        markers:  { visible: true, size: 6 },
        dashType: 'dash',
      },
    ],
    categoryAxis: {
      categories: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
    },
    valueAxis: { labels: { format: '{0}%' } },
    tooltip: { visible: true, shared: true },
  });

  // ════════════════════════════════════════════════════════════════════════
  // DIALOGS
  // ════════════════════════════════════════════════════════════════════════

  var dialog = $('#dialog-1').kendoDialog({
    title:   'Confirmar acción',
    visible: false,
    width:   '420px',
    actions: [
      { text: 'Cancelar' },
      { text: 'Confirmar', primary: true, action: function () { return true; } },
    ],
  }).data('kendoDialog');

  var kWindow = $('#window-1').kendoWindow({
    title:     'kendoWindow',
    visible:   false,
    width:     '400px',
    height:    '220px',
    resizable: true,
    actions:   ['Pin', 'Minimize', 'Maximize', 'Close'],
  }).data('kendoWindow');

  $('#btn-open-dialog').kendoButton({ themeColor: 'primary', fillMode: 'solid' });
  $('#btn-open-window').kendoButton({ themeColor: 'secondary', fillMode: 'solid' });

  $('#btn-open-dialog').on('click', function () { dialog.open(); });
  $('#btn-open-window').on('click', function () { kWindow.center().open(); });

  // ════════════════════════════════════════════════════════════════════════
  // NOTIFICATIONS
  // ════════════════════════════════════════════════════════════════════════

  var notification = $('#notification-widget').kendoNotification({
    position: {
      pinned: true,
      top:    30,
      right:  30,
    },
    autoHideAfter: 4000,
    stacking: 'down',
    width: 320,
  }).data('kendoNotification');

  var notifMessages = {
    success: 'Operación completada con éxito.',
    warning: 'Atención: revisa los datos antes de continuar.',
    error:   'Ocurrió un error al procesar la solicitud.',
    info:    'Hay una actualización disponible en el sistema.',
  };

  ['success', 'warning', 'error', 'info'].forEach(function (type) {
    $('#btn-notif-' + type).on('click', function () {
      notification.show(notifMessages[type], type);
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // PAGER
  // ════════════════════════════════════════════════════════════════════════

  var pagerDS = new kendo.data.DataSource({ data: gridData, pageSize: 10 });
  pagerDS.read();

  $('#pager-demo').kendoPager({
    dataSource: pagerDS,
    pageSizes:  [5, 10, 25, 50],
    input:      true,
    info:       true,
  });

  // ════════════════════════════════════════════════════════════════════════
  // TABS
  // ════════════════════════════════════════════════════════════════════════

  $('#tabstrip-1').kendoTabStrip({ animation: { open: { effects: 'fadeIn' } } });

  // ════════════════════════════════════════════════════════════════════════
  // PROGRESSBAR & LOADER
  // ════════════════════════════════════════════════════════════════════════

  // Value
  $('#pb-value').kendoProgressBar({
    type: 'value', value: 65, min: 0, max: 100,
    animation: { duration: 600 },
  });

  // Percent
  $('#pb-percent').kendoProgressBar({
    type: 'percent', value: 40,
    animation: { duration: 800 },
  });

  // Chunk
  $('#pb-chunk').kendoProgressBar({
    type: 'chunk', value: 3, chunkCount: 5,
    animation: false,
  });

  // Theme Colors
  var pbColorList = [
    { color: 'primary',   val: 72 },
    { color: 'success',   val: 90 },
    { color: 'warning',   val: 55 },
    { color: 'error',     val: 30 },
    { color: 'info',      val: 60 },
    { color: 'secondary', val: 45 },
  ];
  pbColorList.forEach(function (cfg) {
    var $row = $('<div>').css({ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' });
    var $lbl = $('<span>').text(cfg.color).css({ minWidth: '80px', fontSize: '12px', fontWeight: '600', color: '#666' });
    var $pb  = $('<div>').css({ flex: '1' });
    $('#pb-colors').append($row.append($lbl, $pb));
    $pb.kendoProgressBar({ type: 'percent', value: cfg.val, themeColor: cfg.color, animation: { duration: 800 } });
  });

  // Loaders — tipos
  [
    { type: 'pulsing',             label: 'pulsing'             },
    { type: 'infinite-spinner',    label: 'infinite-spinner'    },
    { type: 'converging-spinner',  label: 'converging-spinner'  },
  ].forEach(function (cfg) {
    var $wrap   = $('<div>').css({ textAlign: 'center' });
    var $loader = $('<div>');
    var $lbl    = $('<div>').addClass('demo-label').text(cfg.label).css({ marginTop: '8px' });
    $('#loader-types-row').append($wrap.append($loader, $lbl));
    $loader.kendoLoader({ type: cfg.type, themeColor: 'primary', size: 'md' });
  });

  // Loaders — tamaños
  ['sm', 'md', 'lg'].forEach(function (size) {
    var $wrap   = $('<div>').css({ textAlign: 'center' });
    var $loader = $('<div>');
    var $lbl    = $('<div>').addClass('demo-label').text(size).css({ marginTop: '8px' });
    $('#loader-sizes-row').append($wrap.append($loader, $lbl));
    $loader.kendoLoader({ type: 'infinite-spinner', size: size, themeColor: 'primary' });
  });

  // Loaders — theme colors
  ['primary', 'secondary', 'info', 'success', 'warning', 'error'].forEach(function (color) {
    var $wrap   = $('<div>').css({ textAlign: 'center' });
    var $loader = $('<div>');
    var $lbl    = $('<div>').addClass('demo-label').text(color).css({ marginTop: '8px' });
    $('#loader-colors-row').append($wrap.append($loader, $lbl));
    $loader.kendoLoader({ type: 'infinite-spinner', themeColor: color, size: 'md' });
  });

  // ════════════════════════════════════════════════════════════════════════
  // BADGE & CHIP
  // ════════════════════════════════════════════════════════════════════════

  // Badge — theme colors
  // The badge element is a sibling of the button inside a .k-badge-container wrapper.
  // position: 'edge' + align: 'top end' overlay the badge at the top-right corner.
  ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error', 'dark', 'light'].forEach(function (color) {
    var $wrap  = $('<span>').addClass('k-badge-container').css({ display: 'inline-flex' });
    var $btn   = $('<button>').addClass('k-button k-button-md k-rounded-md k-button-solid k-button-solid-base').text(cap(color));
    var $badge = $('<span>');
    $('#badge-colors-row').append($wrap.append($btn, $badge));
    $badge.kendoBadge({ themeColor: color, text: '5', position: 'edge', align: 'top end' });
  });

  // Badge — border radius (rounded option: none, sm, md, lg, full)
  // `shape` does NOT exist in Kendo Badge. Border-radius is controlled via `rounded`.
  [
    { rounded: 'none', text: 'None' },
    { rounded: 'sm',   text: 'Sm'   },
    { rounded: 'md',   text: 'Md'   },
    { rounded: 'lg',   text: 'Lg'   },
    { rounded: 'full', text: 'Full' },
  ].forEach(function (cfg) {
    var $wrap  = $('<span>').addClass('k-badge-container').css({ display: 'inline-flex' });
    var $btn   = $('<button>').addClass('k-button k-button-md k-rounded-md k-button-solid k-button-solid-base').text(cfg.text);
    var $badge = $('<span>');
    $('#badge-shapes-row').append($wrap.append($btn, $badge));
    $badge.kendoBadge({ themeColor: 'primary', text: '9+', rounded: cfg.rounded, position: 'edge', align: 'top end' });
  });

  // Badge — sobre distintos elementos
  [
    { label: 'Mensajes',       badgeText: '12',  color: 'error',   icon: 'envelope'     },
    { label: 'Alertas',        badgeText: '3',   color: 'warning', icon: 'bell'         },
    { label: 'Notificaciones', badgeText: '99+', color: 'primary', icon: 'notification' },
    { label: 'Tareas',         badgeText: '',    color: 'success', icon: 'check-circle' },
  ].forEach(function (cfg) {
    var $outer = $('<span>').css({ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '6px' });
    var $wrap  = $('<span>').addClass('k-badge-container');
    var $btn   = $('<button>');
    var $badge = $('<span>');
    var $lbl   = $('<span>').css({ fontSize: '11px', color: '#888' }).text(cfg.label);
    $wrap.append($btn, $badge);
    $outer.append($wrap, $lbl);
    $('#badge-on-elements').append($outer);
    $btn.kendoButton({ icon: cfg.icon, fillMode: 'flat', themeColor: 'base' });
    $badge.kendoBadge({
      themeColor: cfg.color,
      text:       cfg.badgeText,  // empty string renders as a dot (k-badge:empty styling)
      position:   'edge',
      align:      'top end',
      rounded:    'full',
    });
  });

  // Chip — solid (themeColor válidos: base, info, success, warning, error)
  ['base', 'info', 'success', 'warning', 'error'].forEach(function (color) {
    var $chip = $('<span>');
    $('#chip-solid-row').append($chip);
    $chip.kendoChip({ label: cap(color), themeColor: color, fillMode: 'solid' });
  });

  // Chip — outline (themeColor válidos: base, info, success, warning, error)
  ['base', 'info', 'success', 'warning', 'error'].forEach(function (color) {
    var $chip = $('<span>');
    $('#chip-outline-row').append($chip);
    $chip.kendoChip({ label: cap(color), themeColor: color, fillMode: 'outline' });
  });

  // Chip — con ícono y removable
  [
    { label: 'Python',     icon: 'code',      color: 'base',    removable: true  },
    { label: 'SQL',        icon: 'table',     color: 'info',    removable: true  },
    { label: 'Completado', icon: 'check',     color: 'success', removable: false },
    { label: 'Pendiente',  icon: 'clock',     color: 'warning', removable: true  },
    { label: 'Error',      icon: 'x-circle',  color: 'error',   removable: false },
    { label: 'Activo',     icon: 'circle',    color: 'info',    removable: true  },
  ].forEach(function (cfg) {
    var $chip = $('<span>');
    $('#chip-icons-row').append($chip);
    $chip.kendoChip({ label: cfg.label, icon: cfg.icon, themeColor: cfg.color, fillMode: 'solid', removable: cfg.removable });
  });

  // ════════════════════════════════════════════════════════════════════════
  // TOOLTIP
  // ════════════════════════════════════════════════════════════════════════

  // Posiciones — una instancia por posición para mayor compatibilidad
  ['top', 'bottom', 'left', 'right'].forEach(function (pos) {
    var $wrap = $('<span>').css({ position: 'relative', display: 'inline-block' });
    var $btn  = $('<button>')
      .addClass('k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary')
      .attr('title', 'Tooltip en posición <b>' + pos + '</b>')
      .text('Hover ' + pos);
    $wrap.append($btn);
    $('#tooltip-positions').append($wrap);
    $wrap.kendoTooltip({
      filter:    'button',
      position:  pos,
      content:   function (e) { return 'Tooltip posición: <strong>' + pos + '</strong>'; },
      showAfter: 150,
      animation: { open: { effects: 'fade:in', duration: 150 } },
    });
  });

  // Sobre distintos elementos
  var $tooltipElems = $('<div>').css({ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' });
  $('#tooltip-elements').append($tooltipElems);

  [
    { text: 'Guardar',   color: 'primary',   icon: 'save',    tip: 'Guardar los cambios actuales (Ctrl+S)'       },
    { text: 'Editar',    color: 'secondary', icon: 'pencil',  tip: 'Editar el registro seleccionado'             },
    { text: 'Eliminar',  color: 'error',     icon: 'trash',   tip: 'Eliminar permanentemente. No se puede deshacer.' },
    { text: 'Exportar',  color: 'base',      icon: 'download',tip: 'Exportar datos en formato CSV o Excel'       },
    { text: 'Filtrar',   color: 'base',      icon: 'filter',  tip: 'Aplicar filtros a la tabla de datos'         },
    { text: 'Configurar',color: 'base',      icon: 'gear',    tip: 'Abrir el panel de configuración'             },
  ].forEach(function (cfg) {
    var $btn = $('<button>').attr('title', cfg.tip);
    $tooltipElems.append($btn);
    $btn.kendoButton({ icon: cfg.icon, text: cfg.text, themeColor: cfg.color, fillMode: 'solid' });
  });

  $tooltipElems.kendoTooltip({
    filter:    '[title]',
    position:  'top',
    showAfter: 200,
    animation: { open: { effects: 'fade:in', duration: 150 } },
  });

  // ════════════════════════════════════════════════════════════════════════
  // AVATAR
  // ════════════════════════════════════════════════════════════════════════

  // Tipos — text / icon / image
  [
    { type: 'text',  text: 'DM',   themeColor: 'primary',   label: 'text'  },
    { type: 'text',  text: 'AB',   themeColor: 'secondary', label: 'text'  },
    { type: 'icon',  icon: 'user', themeColor: 'info',      label: 'icon'  },
    { type: 'icon',  icon: 'user', themeColor: 'success',   label: 'icon'  },
  ].forEach(function (cfg) {
    var $wrap = $('<div>').css({ textAlign: 'center' });
    var $av   = $('<div>');
    var $lbl  = $('<div>').addClass('demo-label').text(cfg.label).css({ marginTop: '6px' });
    $('#avatar-types-row').append($wrap.append($av, $lbl));
    var opts = { type: cfg.type, themeColor: cfg.themeColor, size: 'md' };
    if (cfg.text) opts.text = cfg.text;
    if (cfg.icon) opts.icon = cfg.icon;
    $av.kendoAvatar(opts);
  });

  // Tamaños
  ['sm', 'md', 'lg'].forEach(function (size) {
    var $wrap = $('<div>').css({ textAlign: 'center' });
    var $av   = $('<div>');
    var $lbl  = $('<div>').addClass('demo-label').text(size).css({ marginTop: '6px' });
    $('#avatar-sizes-row').append($wrap.append($av, $lbl));
    $av.kendoAvatar({ type: 'text', text: size.toUpperCase(), size: size, themeColor: 'primary' });
  });

  // Theme Colors
  [
    { text: 'PR', color: 'primary'   },
    { text: 'SE', color: 'secondary' },
    { text: 'IN', color: 'info'      },
    { text: 'OK', color: 'success'   },
    { text: 'WA', color: 'warning'   },
    { text: 'ER', color: 'error'     },
    { text: 'DK', color: 'dark'      },
    { text: 'LG', color: 'light'     },
    { text: 'IN', color: 'inverse'   },
  ].forEach(function (cfg) {
    var $wrap = $('<div>').css({ textAlign: 'center' });
    var $av   = $('<div>');
    var $lbl  = $('<div>').addClass('demo-label').text(cfg.color).css({ marginTop: '6px', fontSize: '10px' });
    $('#avatar-colors-row').append($wrap.append($av, $lbl));
    $av.kendoAvatar({ type: 'text', text: cfg.text, themeColor: cfg.color, size: 'md' });
  });

  // Shapes
  ['circle', 'square', 'rounded'].forEach(function (shape) {
    var $wrap = $('<div>').css({ textAlign: 'center' });
    var $av   = $('<div>');
    var $lbl  = $('<div>').addClass('demo-label').text(shape).css({ marginTop: '6px' });
    $('#avatar-shapes-row').append($wrap.append($av, $lbl));
    $av.kendoAvatar({ type: 'text', text: 'AB', shape: shape, themeColor: 'primary', size: 'lg' });
  });

});
