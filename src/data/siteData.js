export const brand = {
  name: 'Morenas',
  legalName: 'Morenas Agencia Aduanal y Transporte',
  tagline: 'Agencia aduanal, regularización vehicular y transporte terrestre',
  shortDescription:
    'Morenas atiende operaciones de regularización e importación vehicular, coordinación de transporte en camión y seguimiento operativo para clientes que necesitan información clara antes, durante y después del servicio.',
  phoneMX: '+52 812-402-0614',
  phoneUS: '+1 346-855-2516',
  whatsapp: '528124020614',
  email: 'contacto@agenciayenviosmorenas.com',
  secondaryEmail: 'paqueteriamorena@gmail.com',
  address: 'Av. Concordia 324, Apodaca, Nuevo León, C.P. 66636',
  hours: 'Lunes a viernes · 9:00 a.m. a 6:00 p.m.',
};

export const navItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Agencia Aduanal', path: '/agencia-aduanal' },
  { label: 'Transporte', path: '/transporte-camiones' },
  { label: 'Rastreo', path: '/rastreo-gps' },
  { label: 'Oficinas', path: '/oficinas' },
  { label: 'Contacto', path: '/contacto' },
];

export const assets = {
  logo: '/images/official-logo-clean.png',
  heroCustoms: '/images/photo-customs-hq.jpg',
  heroTrucks: '/images/photo-trucks-hq.jpg',
  operationsCenter: '/images/photo-control-hq.jpg',
  customsVehicle: '/images/photo-customs-hq.jpg',
  trackingMap: '/images/photo-gps-hq.jpg',
  trailerUnit: '/images/photo-trucks-hq.jpg',
  containerTruck: '/images/photo-trucks-hq.jpg',
};

export const heroHighlights = [
  'Regularización de vehículos americanos',
  'Importación y validación documental',
  'Transporte terrestre en camión',
  'Rastreo por correo e ID de transporte',
];

export const homeServices = [
  {
    title: 'Agencia Aduanal',
    path: '/agencia-aduanal',
    eyebrow: 'Trámite y documentación',
    image: assets.heroCustoms,
    summary:
      'Atención para clientes que necesitan regularizar o importar un vehículo con revisión de documentos, seguimiento de avances y comunicación directa con el equipo de Morenas.',
    points: [
      'Revisión inicial del caso',
      'Integración de expediente',
      'Acompañamiento durante el trámite',
      'Comunicación de estatus',
    ],
    accent: 'gold',
  },
  {
    title: 'Transporte de Camiones',
    path: '/transporte-camiones',
    eyebrow: 'Coordinación terrestre',
    image: assets.heroTrucks,
    summary:
      'Servicio orientado a movimientos terrestres en camión, con registro de origen, destino, unidad asignada y seguimiento operativo hasta el cierre del recorrido.',
    points: [
      'Asignación de unidad',
      'Ruta y trayecto registrado',
      'Seguimiento de salida y llegada',
      'Comunicación con el cliente',
    ],
    accent: 'red',
  },
  {
    title: 'Rastreo para Clientes',
    path: '/rastreo-gps',
    eyebrow: 'Consulta por correo',
    image: assets.trackingMap,
    summary:
      'El cliente puede registrar una solicitud, recibir un ID de transporte y consultar por correo la unidad asignada, el trayecto y el estatus del servicio.',
    points: [
      'Solicitud de transporte',
      'ID automático de seguimiento',
      'Consulta por correo',
      'Estatus y eventos de recorrido',
    ],
    accent: 'steel',
  },
];

export const valueProps = [
  {
    title: 'Servicio explicado con claridad',
    text: 'El cliente conoce qué información se requiere, qué servicio se está gestionando y cómo dar seguimiento sin depender de mensajes confusos o pasos innecesarios.',
  },
  {
    title: 'Operación centrada en camiones',
    text: 'La comunicación visual y comercial está enfocada en unidades de transporte terrestre, rutas, trazabilidad y coordinación logística.',
  },
  {
    title: 'Seguimiento accesible',
    text: 'El rastreo funciona con datos simples para el cliente: correo, ID de transporte, unidad asignada, origen, destino y línea de eventos.',
  },
  {
    title: 'Atención directa de Morenas',
    text: 'La página mantiene visibles los canales de contacto para solicitar orientación, pedir una cotización o confirmar detalles del servicio.',
  },
];

export const processSteps = [
  {
    number: '01',
    title: 'Solicitud del cliente',
    text: 'El cliente comparte sus datos, correo, tipo de servicio, origen, destino y detalles de la carga o trámite que necesita coordinar.',
  },
  {
    number: '02',
    title: 'Asignación y registro',
    text: 'Morenas registra la solicitud, asigna un ID de transporte y vincula una unidad para que el cliente pueda consultar el avance.',
  },
  {
    number: '03',
    title: 'Seguimiento del recorrido',
    text: 'El sistema muestra estatus, trayecto, unidad asignada y eventos relevantes como salida, avance de ruta, parada o llegada.',
  },
  {
    number: '04',
    title: 'Cierre del servicio',
    text: 'Al finalizar, el cliente conserva el ID y el historial básico del recorrido para futuras consultas o aclaraciones.',
  },
];

export const customServices = [
  {
    title: 'Regularización de vehículos americanos',
    text: 'Servicio para clientes que necesitan orientación en la regularización de su vehículo, revisión de requisitos y acompañamiento durante el proceso documental.',
  },
  {
    title: 'Importación vehicular',
    text: 'Atención para casos de importación donde se requiere validar información, preparar expediente y mantener comunicación sobre el avance.',
  },
  {
    title: 'Revisión documental',
    text: 'Verificación de datos y documentos antes de iniciar el trámite para reducir errores, retrasos o información incompleta.',
  },
  {
    title: 'Seguimiento del trámite',
    text: 'Canal de atención para comunicar avances, resolver dudas y mantener al cliente informado durante las etapas relevantes.',
  },
];

export const truckServices = [
  {
    title: 'Solicitud de transporte',
    text: 'El cliente puede solicitar un servicio indicando correo, origen, destino, tipo de carga y fecha estimada para crear un registro de seguimiento.',
  },
  {
    title: 'Asignación de unidad',
    text: 'Cada solicitud recibe un ID de transporte y una unidad demo asignada para consultar trayecto, conductor operativo y estatus del recorrido.',
  },
  {
    title: 'Consulta por correo',
    text: 'La plataforma permite buscar servicios asociados a un correo para que el cliente encuentre rápidamente sus movimientos registrados.',
  },
  {
    title: 'Estatus de recorrido',
    text: 'El panel muestra la ruta, etapa actual, eventos del trayecto y datos de la unidad en una interfaz clara y amigable.',
  },
];

export const gallery = [
  {
    image: assets.customsVehicle,
    title: 'Atención aduanal y regularización',
    tag: 'Agencia aduanal',
    description:
      'Servicio para organizar información, revisar documentos y dar seguimiento a procesos de regularización e importación vehicular.',
  },
  {
    image: assets.containerTruck,
    title: 'Transporte terrestre en camión',
    tag: 'Transporte',
    description:
      'Coordinación de unidades, ruta y comunicación de estatus para clientes que requieren mover carga con mayor visibilidad.',
  },
  {
    image: assets.operationsCenter,
    title: 'Control operativo',
    tag: 'Monitoreo',
    description:
      'Vista de trabajo pensada para centralizar solicitudes, unidades, eventos y datos de contacto del cliente.',
  },
  {
    image: assets.trackingMap,
    title: 'Rastreo por correo e ID',
    tag: 'Rastreo',
    description:
      'Consulta amigable para ubicar la unidad asignada, revisar el trayecto registrado y confirmar el avance del servicio.',
  },
];

export const offices = [
  {
    city: 'Apodaca, Nuevo León',
    title: 'Oficina México',
    address: 'Av. Concordia 324, Apodaca, N.L. C.P. 66636',
    phone: '+52 812-402-0614',
    email: 'contacto@agenciayenviosmorenas.com',
    schedule: 'Lunes a viernes · 9:00 a.m. a 6:00 p.m.',
  },
  {
    city: 'Houston, Texas',
    title: 'Atención operativa EE. UU.',
    address: '6540 Rupley Cir, Houston TX 77087',
    phone: '+1 346-855-2516',
    email: 'contacto@agenciayenviosmorenas.com',
    schedule: 'Atención por llamada y canal digital.',
  },
  {
    city: 'Cobertura adicional',
    title: 'Puntos de operación complementaria',
    address: 'Commerce, California · Fresno, California · Tijuana, Baja California',
    phone: '+52 812-402-0614',
    email: 'contacto@agenciayenviosmorenas.com',
    schedule: 'Disponibilidad sujeta a coordinación operativa.',
  },
];

export const faqs = [
  {
    q: '¿Cómo consulto mi transporte?',
    a: 'Puedes buscar con el correo registrado en la solicitud o con el ID de transporte generado por la plataforma.',
  },
  {
    q: '¿Qué información muestra el rastreo?',
    a: 'El panel muestra unidad asignada, ruta, origen, destino, estatus, última actualización y eventos principales del recorrido.',
  },
  {
    q: '¿El sistema envía correos reales?',
    a: 'Esta versión deja el flujo listo para consulta por correo. Para envío real de emails se puede conectar después SendGrid, Resend, Gmail API o el proveedor que prefieran.',
  },
];

export const gpsUnits = [
  { id: 'MOR-401', label: 'Tractocamión 401', route: 'Monterrey → Laredo' },
  { id: 'MOR-722', label: 'Camión 722', route: 'Saltillo → Monterrey' },
  { id: 'MOR-318', label: 'Unidad 318', route: 'Nuevo Laredo → Apodaca' },
];
