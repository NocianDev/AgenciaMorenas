export const brand = {
  name: 'Morenas',
  legalName: 'Morenas Agencia Aduanal y Transporte',
  tagline: 'Aduana y transportes',
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
  heroCustoms: '/images/morenas/aduana-hero.jpg',
  heroTrucks: '/images/morenas/transporte-hero.jpg',
  operationsCenter: '/images/morenas/oficinas-hero.jpg',
  customsVehicle: '/images/morenas/aduana-hero.jpg',
  trackingMap: '/images/morenas/rastreo-hero.jpg',
  trailerUnit: '/images/morenas/transporte-hero.jpg',
  containerTruck: '/images/morenas/transporte-hero.jpg',
  contactHero: '/images/morenas/contacto-hero.jpg',
};

export const facebookVideos = {
  home: [
    {
      title: 'Video principal de operación',
      description: 'Pega aquí un enlace de Facebook con recorrido, unidades o atención de Morenas.',
      facebookUrl: 'REEMPLAZA_CON_LINK_DE_VIDEO_FACEBOOK_HOME_1',
      image: '/images/morenas/transporte-1.jpg',
    },
    {
      title: 'Atención y presencia de marca',
      description: 'Video recomendado para mostrar atención, oficinas o cobertura de Morenas.',
      facebookUrl: 'REEMPLAZA_CON_LINK_DE_VIDEO_FACEBOOK_HOME_2',
      image: '/images/morenas/oficina-1.jpg',
    },
  ],
  customs: [
    {
      title: 'Proceso aduanal y regularización',
      description: 'Usa un video de Facebook relacionado con trámites, atención o vehículos.',
      facebookUrl: 'REEMPLAZA_CON_LINK_DE_VIDEO_FACEBOOK_ADUANA_1',
      image: '/images/morenas/aduana-1.jpg',
    },
  ],
  trucks: [
    {
      title: 'Unidad en ruta o patio operativo',
      description: 'Coloca aquí un video de camiones, ruta, patio o coordinación terrestre.',
      facebookUrl: 'REEMPLAZA_CON_LINK_DE_VIDEO_FACEBOOK_TRANSPORTE_1',
      image: '/images/morenas/transporte-2.jpg',
    },
  ],
  tracking: [
    {
      title: 'Seguimiento y monitoreo',
      description: 'Video para explicar cómo se consulta un servicio o cómo se da seguimiento.',
      facebookUrl: 'REEMPLAZA_CON_LINK_DE_VIDEO_FACEBOOK_RASTREO_1',
      image: '/images/morenas/rastreo-2.jpg',
    },
  ],
  offices: [
    {
      title: 'Oficinas y atención al cliente',
      description: 'Video de instalaciones, equipo, atención o puntos de contacto.',
      facebookUrl: 'REEMPLAZA_CON_LINK_DE_VIDEO_FACEBOOK_OFICINAS_1',
      image: '/images/morenas/oficina-2.jpg',
    },
  ],
  contact: [
    {
      title: 'Mensaje de atención Morenas',
      description: 'Video institucional o de contacto para reforzar confianza del cliente.',
      facebookUrl: 'REEMPLAZA_CON_LINK_DE_VIDEO_FACEBOOK_CONTACTO_1',
      image: '/images/morenas/contacto-1.jpg',
    },
  ],
};

export const mediaSections = {
  home: {
    eyebrow: 'Contenido real de Morenas',
    title: 'Galería de aduana, transportes y atención',
    description:
      'Espacio preparado para colocar fotografías reales de unidades, oficinas, patios, clientes, rutas y videos embebidos desde Facebook.',
    items: [
      { type: 'image', title: 'Aduana y atención vehicular', tag: 'Aduana', src: '/images/morenas/aduana-1.jpg' },
      { type: 'image', title: 'Transporte de camiones', tag: 'Transportes', src: '/images/morenas/transporte-1.jpg', featured: true },
      { type: 'facebook', title: facebookVideos.home[0].title, tag: 'Video', facebookUrl: facebookVideos.home[0].facebookUrl, image: facebookVideos.home[0].image },
      { type: 'image', title: 'Oficina y atención', tag: 'Atención', src: '/images/morenas/oficina-1.jpg' },
      { type: 'facebook', title: facebookVideos.home[1].title, tag: 'Facebook', facebookUrl: facebookVideos.home[1].facebookUrl, image: facebookVideos.home[1].image },
    ],
  },
  customs: {
    eyebrow: 'Material de agencia aduanal',
    title: 'Imágenes y videos para explicar el servicio aduanal',
    description:
      'Aquí puedes mostrar vehículos, documentos, instalaciones, atención y publicaciones de Facebook relacionadas con regularización e importación.',
    items: [
      { type: 'image', title: 'Regularización vehicular', tag: 'Servicio', src: '/images/morenas/aduana-hero.jpg', featured: true },
      { type: 'image', title: 'Documentación y atención', tag: 'Trámite', src: '/images/morenas/aduana-2.jpg' },
      { type: 'facebook', title: facebookVideos.customs[0].title, tag: 'Video', facebookUrl: facebookVideos.customs[0].facebookUrl, image: facebookVideos.customs[0].image },
    ],
  },
  trucks: {
    eyebrow: 'Material de transporte',
    title: 'Unidades, patios y recorridos de transporte',
    description:
      'Sección lista para fotografías reales de camiones y videos embebidos de Facebook sobre la operación terrestre.',
    items: [
      { type: 'image', title: 'Unidad de transporte', tag: 'Camión', src: '/images/morenas/transporte-hero.jpg', featured: true },
      { type: 'image', title: 'Patio o salida de ruta', tag: 'Ruta', src: '/images/morenas/transporte-1.jpg' },
      { type: 'facebook', title: facebookVideos.trucks[0].title, tag: 'Video', facebookUrl: facebookVideos.trucks[0].facebookUrl, image: facebookVideos.trucks[0].image },
      { type: 'image', title: 'Carga y coordinación', tag: 'Operación', src: '/images/morenas/transporte-2.jpg' },
    ],
  },
  tracking: {
    eyebrow: 'Material de rastreo',
    title: 'Seguimiento explicado con imágenes y video',
    description:
      'Espacio para demostrar cómo el cliente consulta por correo, obtiene su ID de transporte y revisa la unidad asignada.',
    items: [
      { type: 'image', title: 'Panel de rastreo', tag: 'GPS', src: '/images/morenas/rastreo-hero.jpg', featured: true },
      { type: 'facebook', title: facebookVideos.tracking[0].title, tag: 'Video', facebookUrl: facebookVideos.tracking[0].facebookUrl, image: facebookVideos.tracking[0].image },
      { type: 'image', title: 'Consulta de cliente', tag: 'Cliente', src: '/images/morenas/rastreo-1.jpg' },
    ],
  },
  offices: {
    eyebrow: 'Oficinas y cobertura',
    title: 'Instalaciones, equipo y puntos de atención',
    description:
      'Galería para mostrar oficinas, puntos de atención, personal, vehículos y publicaciones de Facebook relacionadas con la presencia de Morenas.',
    items: [
      { type: 'image', title: 'Oficina de atención', tag: 'Oficina', src: '/images/morenas/oficinas-hero.jpg', featured: true },
      { type: 'image', title: 'Atención al cliente', tag: 'Clientes', src: '/images/morenas/oficina-1.jpg' },
      { type: 'facebook', title: facebookVideos.offices[0].title, tag: 'Video', facebookUrl: facebookVideos.offices[0].facebookUrl, image: facebookVideos.offices[0].image },
      { type: 'image', title: 'Cobertura operativa', tag: 'Cobertura', src: '/images/morenas/oficina-2.jpg' },
    ],
  },
  contact: {
    eyebrow: 'Contenido de contacto',
    title: 'Medios de atención y presencia de marca',
    description:
      'Sección para reforzar confianza con fotografías de atención, oficinas y videos institucionales embebidos desde Facebook.',
    items: [
      { type: 'image', title: 'Atención Morenas', tag: 'Contacto', src: '/images/morenas/contacto-hero.jpg', featured: true },
      { type: 'facebook', title: facebookVideos.contact[0].title, tag: 'Video', facebookUrl: facebookVideos.contact[0].facebookUrl, image: facebookVideos.contact[0].image },
      { type: 'image', title: 'Comunicación directa', tag: 'WhatsApp', src: '/images/morenas/contacto-1.jpg' },
    ],
  },
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
    points: ['Revisión inicial del caso', 'Integración de expediente', 'Acompañamiento durante el trámite', 'Comunicación de estatus'],
    accent: 'gold',
  },
  {
    title: 'Transporte de Camiones',
    path: '/transporte-camiones',
    eyebrow: 'Coordinación terrestre',
    image: assets.heroTrucks,
    summary:
      'Servicio orientado a movimientos terrestres en camión, con registro de origen, destino, unidad asignada y seguimiento operativo hasta el cierre del recorrido.',
    points: ['Asignación de unidad', 'Ruta y trayecto registrado', 'Seguimiento de salida y llegada', 'Comunicación con el cliente'],
    accent: 'red',
  },
  {
    title: 'Rastreo para Clientes',
    path: '/rastreo-gps',
    eyebrow: 'Consulta por correo',
    image: assets.trackingMap,
    summary:
      'El cliente puede registrar una solicitud, recibir un ID de transporte y consultar por correo la unidad asignada, el trayecto y el estatus del servicio.',
    points: ['Solicitud de transporte', 'ID automático de seguimiento', 'Consulta por correo', 'Estatus y eventos de recorrido'],
    accent: 'steel',
  },
];

export const valueProps = [
  { title: 'Servicio explicado con claridad', text: 'El cliente conoce qué información se requiere, qué servicio se está gestionando y cómo dar seguimiento sin depender de mensajes confusos o pasos innecesarios.' },
  { title: 'Operación centrada en camiones', text: 'La comunicación visual y comercial está enfocada en unidades de transporte terrestre, rutas, trazabilidad y coordinación logística.' },
  { title: 'Seguimiento accesible', text: 'El rastreo funciona con datos simples para el cliente: correo, ID de transporte, unidad asignada, origen, destino y línea de eventos.' },
  { title: 'Atención directa de Morenas', text: 'La página mantiene visibles los canales de contacto para solicitar orientación, pedir una cotización o confirmar detalles del servicio.' },
];

export const processSteps = [
  { number: '01', title: 'Solicitud del cliente', text: 'El cliente comparte sus datos, correo, tipo de servicio, origen, destino y detalles de la carga o trámite que necesita coordinar.' },
  { number: '02', title: 'Asignación y registro', text: 'Morenas registra la solicitud, asigna un ID de transporte y vincula una unidad para que el cliente pueda consultar el avance.' },
  { number: '03', title: 'Seguimiento del recorrido', text: 'El sistema muestra estatus, trayecto, unidad asignada y eventos relevantes como salida, avance de ruta, parada o llegada.' },
  { number: '04', title: 'Cierre del servicio', text: 'Al finalizar, el cliente conserva el ID y el historial básico del recorrido para futuras consultas o aclaraciones.' },
];

export const customServices = [
  { title: 'Regularización de vehículos americanos', text: 'Servicio para clientes que necesitan orientación en la regularización de su vehículo, revisión de requisitos y acompañamiento durante el proceso documental.' },
  { title: 'Importación vehicular', text: 'Atención para casos de importación donde se requiere validar información, preparar expediente y mantener comunicación sobre el avance.' },
  { title: 'Revisión documental', text: 'Verificación de datos y documentos antes de iniciar el trámite para reducir errores, retrasos o información incompleta.' },
  { title: 'Seguimiento del trámite', text: 'Canal de atención para comunicar avances, resolver dudas y mantener al cliente informado durante las etapas relevantes.' },
];

export const truckServices = [
  { title: 'Solicitud de transporte', text: 'El cliente puede solicitar un servicio indicando correo, origen, destino, tipo de carga y fecha estimada para crear un registro de seguimiento.' },
  { title: 'Asignación de unidad', text: 'Cada solicitud recibe un ID de transporte y una unidad demo asignada para consultar trayecto, conductor operativo y estatus del recorrido.' },
  { title: 'Consulta por correo', text: 'La plataforma permite buscar servicios asociados a un correo para que el cliente encuentre rápidamente sus movimientos registrados.' },
  { title: 'Estatus de recorrido', text: 'El panel muestra la ruta, etapa actual, eventos del trayecto y datos de la unidad en una interfaz clara y amigable.' },
];

export const gallery = [
  { image: assets.customsVehicle, title: 'Atención aduanal y regularización', tag: 'Agencia aduanal', description: 'Servicio para organizar información, revisar documentos y dar seguimiento a procesos de regularización e importación vehicular.' },
  { image: assets.containerTruck, title: 'Transporte terrestre en camión', tag: 'Transporte', description: 'Coordinación de unidades, ruta y comunicación de estatus para clientes que requieren mover carga con mayor visibilidad.' },
  { image: assets.operationsCenter, title: 'Control operativo', tag: 'Monitoreo', description: 'Vista de trabajo pensada para centralizar solicitudes, unidades, eventos y datos de contacto del cliente.' },
  { image: assets.trackingMap, title: 'Rastreo por correo e ID', tag: 'Rastreo', description: 'Consulta amigable para ubicar la unidad asignada, revisar el trayecto registrado y confirmar el avance del servicio.' },
];

export const offices = [
  { city: 'Apodaca, Nuevo León', title: 'Oficina México', address: 'Av. Concordia 324, Apodaca, N.L. C.P. 66636', phone: '+52 812-402-0614', email: 'contacto@agenciayenviosmorenas.com', schedule: 'Lunes a viernes · 9:00 a.m. a 6:00 p.m.' },
  { city: 'Houston, Texas', title: 'Atención operativa EE. UU.', address: '6540 Rupley Cir, Houston TX 77087', phone: '+1 346-855-2516', email: 'contacto@agenciayenviosmorenas.com', schedule: 'Atención por llamada y canal digital.' },
  { city: 'Cobertura adicional', title: 'Puntos de operación complementaria', address: 'Commerce, California · Fresno, California · Tijuana, Baja California', phone: '+52 812-402-0614', email: 'contacto@agenciayenviosmorenas.com', schedule: 'Disponibilidad sujeta a coordinación operativa.' },
];

export const faqs = [
  { q: '¿Cómo consulto mi transporte?', a: 'Puedes buscar con el correo registrado en la solicitud o con el ID de transporte generado por la plataforma.' },
  { q: '¿Qué información muestra el rastreo?', a: 'El panel muestra unidad asignada, ruta, origen, destino, estatus, última actualización y eventos principales del recorrido.' },
  { q: '¿El sistema envía correos reales?', a: 'Esta versión deja el flujo listo para consulta por correo. Para envío real de emails se puede conectar después SendGrid, Resend, Gmail API o el proveedor que prefieran.' },
];

export const gpsUnits = [
  { id: 'MOR-401', label: 'Tractocamión 401', route: 'Monterrey → Laredo' },
  { id: 'MOR-722', label: 'Camión 722', route: 'Saltillo → Monterrey' },
  { id: 'MOR-318', label: 'Unidad 318', route: 'Nuevo Laredo → Apodaca' },
];
