export const brand = {
  name: 'Morenas',
  legalName: 'Morenas Agencia Aduanal y Transporte',
  tagline: 'Aduana y transportes',
  shortDescription:
    'Morenas brinda atención en asesoría aduanal, legalización de vehículos, traslados y coordinación de transporte para clientes en México y Estados Unidos que necesitan un servicio claro, directo y con seguimiento.',
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
  heroCustoms: '/images/Aduana11.jpg',
  heroTrucks: '/images/Aduana2.jpg',
  operationsCenter: '/images/Aduana10.jpg',
  customsVehicle: '/images/Aduana6.jpg',
  trackingMap: '/images/Aduana8.png',
  trailerUnit: '/images/Aduana4.jpg',
  containerTruck: '/images/Aduana1.jpg',
  contactHero: '/images/Aduana7.jpg',
};

export const facebookVideos = {
  home: [
    {
      title: 'Morenas en operación',
      description: 'Video principal para mostrar traslados, legalizaciones o atención al cliente.',
      facebookUrl: 'https://www.facebook.com/reel/924585860574184',
      image: '/images/Aduana2.jpg',
    },
    {
      title: 'Asesoría y atención directa',
      description: 'Video recomendado para presentar al equipo, testimonios o cobertura de servicio.',
      facebookUrl: 'https://www.facebook.com/reel/896216503235455',
      image: '/images/Aduana10.jpg',
    },
  ],
  customs: [
    {
      title: 'Proceso de asesoría aduanal',
      description: 'Video para explicar legalización, revisión de documentos o atención de vehículos.',
      facebookUrl: 'https://www.facebook.com/reel/1452763742991994',
      image: '/images/Aduana11.jpg',
    },
  ],
  trucks: [
    {
      title: 'Traslado de unidades',
      description: 'Video de unidades en plataforma, salida de ruta o coordinación de transporte.',
      facebookUrl: 'https://www.facebook.com/reel/1579946879769918',
      image: '/images/Aduana4.jpg',
    },
  ],
  tracking: [
    {
      title: 'Seguimiento del servicio',
      description: 'Video para explicar cómo el cliente consulta su transporte por correo o ID.',
      facebookUrl: 'https://www.facebook.com/reel/1623486238978442',
      image: '/images/Aduana8.png',
    },
  ],
  offices: [
    {
      title: 'Atención y presencia de Morenas',
      description: 'Video institucional, de oficina, atención o puntos de operación.',
      facebookUrl: 'https://www.facebook.com/reel/2009021290021482',
      image: '/images/Aduana10.jpg',
    },
  ],
  contact: [
    {
      title: 'Mensaje para clientes',
      description: 'Video para invitar a solicitar asesoría o resolver dudas por los canales oficiales.',
      facebookUrl: 'https://www.facebook.com/reel/3933716700253060',
      image: '/images/Aduana7.jpg',
    },
  ],
};

export const mediaSections = {
  home: {
    eyebrow: 'Operación Morenas',
    title: 'Aduana, legalización y transporte en una sola atención',
    description:
      'La página reúne imágenes reales de traslados, asesoría y vehículos atendidos por Morenas para que el cliente identifique rápidamente el tipo de servicio y los canales disponibles.',
    items: [
      { type: 'image', title: 'Asesoría aduanal Morena’s', tag: 'Aduana', src: '/images/Aduana10.jpg', banner: true },
      { type: 'image', title: 'Traslado de vehículos a México', tag: 'Traslados', src: '/images/Aduana1.jpg', featured: true },
      { type: 'facebook', title: facebookVideos.home[0].title, tag: 'Video', facebookUrl: facebookVideos.home[0].facebookUrl, image: facebookVideos.home[0].image },
      { type: 'image', title: 'Unidades en plataforma', tag: 'Transporte', src: '/images/Aduana5.jpg' },
      { type: 'image', title: 'Cobertura y asesoría', tag: 'Atención', src: '/images/Aduana7.jpg' },
      { type: 'facebook', title: facebookVideos.home[1].title, tag: 'Facebook', facebookUrl: facebookVideos.home[1].facebookUrl, image: facebookVideos.home[1].image },
    ],
  },
  customs: {
    eyebrow: 'Agencia aduanal',
    title: 'Asesoría para legalización, importación y regularización vehicular',
    description:
      'Esta sección muestra servicios relacionados con vehículos de Estados Unidos a México, revisión documental y atención para clientes que buscan un proceso claro y acompañado.',
    items: [
      { type: 'image', title: 'Legalización de unidades', tag: 'Servicio', src: '/images/Aduana6.jpg', featured: true },
      { type: 'image', title: 'Documentación y comprobantes', tag: 'Documentos', src: '/images/Aduana11.jpg' },
      { type: 'facebook', title: facebookVideos.customs[0].title, tag: 'Video', facebookUrl: facebookVideos.customs[0].facebookUrl, image: facebookVideos.customs[0].image },
      { type: 'image', title: 'Vehículos atendidos', tag: 'Vehículos', src: '/images/Aduana2.jpg' },
      { type: 'image', title: 'Asesoría personalizada', tag: 'Asesoría', src: '/images/Aduana7.jpg' },
    ],
  },
  trucks: {
    eyebrow: 'Transportes',
    title: 'Traslados y movimientos con unidades en plataforma',
    description:
      'El apartado de transportes presenta imágenes de camiones, plataformas y vehículos trasladados para reforzar el servicio real de coordinación terrestre.',
    items: [
      { type: 'image', title: 'Camión de traslado', tag: 'Camión', src: '/images/Aduana3.jpg', featured: true },
      { type: 'image', title: 'Vehículos en plataforma', tag: 'Ruta', src: '/images/Aduana4.jpg' },
      { type: 'facebook', title: facebookVideos.trucks[0].title, tag: 'Video', facebookUrl: facebookVideos.trucks[0].facebookUrl, image: facebookVideos.trucks[0].image },
      { type: 'image', title: 'Traslado programado', tag: 'Operación', src: '/images/Aduana5.jpg' },
      { type: 'image', title: 'Desde USA a México', tag: 'Cobertura', src: '/images/Aduana1.jpg' },
    ],
  },
  tracking: {
    eyebrow: 'Rastreo de servicio',
    title: 'Consulta por correo, ID y unidad asignada',
    description:
      'El rastreo permite que el cliente localice un servicio registrado, revise la ruta vinculada y conozca la unidad asignada sin depender de llamadas repetidas.',
    items: [
      { type: 'image', title: 'Seguimiento GPS de unidades', tag: 'GPS', src: '/images/Aduana8.png', featured: true },
      { type: 'facebook', title: facebookVideos.tracking[0].title, tag: 'Video', facebookUrl: facebookVideos.tracking[0].facebookUrl, image: facebookVideos.tracking[0].image },
      { type: 'image', title: 'Servicio consultable por cliente', tag: 'Cliente', src: '/images/Aduana11.jpg' },
      { type: 'image', title: 'Ruta y traslado', tag: 'Ruta', src: '/images/Aduana4.jpg' },
    ],
  },
  offices: {
    eyebrow: 'Atención y cobertura',
    title: 'Puntos de contacto para clientes en México y Estados Unidos',
    description:
      'La sección de oficinas concentra teléfonos, correos y presencia de servicio para quienes buscan iniciar un trámite o confirmar información de transporte.',
    items: [
      { type: 'image', title: 'Presencia de Morenas', tag: 'Marca', src: '/images/Aduana10.jpg', featured: true, banner: true },
      { type: 'image', title: 'Atención a clientes', tag: 'Clientes', src: '/images/Aduana7.jpg' },
      { type: 'facebook', title: facebookVideos.offices[0].title, tag: 'Video', facebookUrl: facebookVideos.offices[0].facebookUrl, image: facebookVideos.offices[0].image },
      { type: 'image', title: 'Cobertura operativa', tag: 'Cobertura', src: '/images/Aduana2.jpg' },
    ],
  },
  contact: {
    eyebrow: 'Contacto Morenas',
    title: 'Canales directos para solicitar asesoría o seguimiento',
    description:
      'El cliente puede comunicarse por teléfono, WhatsApp o correo para iniciar un servicio, preguntar por requisitos o consultar el avance de una solicitud.',
    items: [
      { type: 'image', title: 'Asesoría directa', tag: 'Contacto', src: '/images/Aduana7.jpg', featured: true },
      { type: 'facebook', title: facebookVideos.contact[0].title, tag: 'Video', facebookUrl: facebookVideos.contact[0].facebookUrl, image: facebookVideos.contact[0].image },
      { type: 'image', title: 'Información de servicio', tag: 'Atención', src: '/images/Aduana6.jpg' },
      { type: 'image', title: 'Traslados y legalizaciones', tag: 'Servicio', src: '/images/Aduana10.jpg', banner: true },
    ],
  },
};

export const heroHighlights = [
  'Asesoría aduanal y legalización',
  'Traslados de vehículos a México',
  'Transporte y coordinación terrestre',
  'Rastreo por correo e ID de servicio',
];

export const homeServices = [
  {
    title: 'Agencia Aduanal',
    path: '/agencia-aduanal',
    eyebrow: 'Asesoría y legalización',
    image: assets.heroCustoms,
    summary:
      'Morenas orienta a clientes que necesitan legalizar, importar o regularizar vehículos, revisando información clave y manteniendo comunicación durante el avance del servicio.',
    points: ['Revisión inicial del caso', 'Orientación documental', 'Legalización vehicular', 'Seguimiento de avances'],
    accent: 'gold',
  },
  {
    title: 'Transporte de Camiones',
    path: '/transporte-camiones',
    eyebrow: 'Traslados y coordinación',
    image: assets.heroTrucks,
    summary:
      'El servicio de transporte se enfoca en coordinar unidades, registrar origen y destino, asignar un ID de seguimiento y mantener visible el estatus del recorrido.',
    points: ['Traslado de vehículos', 'Unidad asignada', 'Ruta registrada', 'Comunicación con el cliente'],
    accent: 'red',
  },
  {
    title: 'Rastreo para Clientes',
    path: '/rastreo-gps',
    eyebrow: 'Consulta por correo',
    image: assets.trackingMap,
    summary:
      'El cliente puede consultar un servicio con su correo o ID de transporte para revisar unidad asignada, trayecto, estado actual y eventos principales.',
    points: ['Búsqueda por correo', 'ID de transporte', 'Unidad y trayecto', 'Eventos del servicio'],
    accent: 'steel',
  },
];

export const valueProps = [
  { title: 'Atención directa', text: 'La página conecta al cliente con llamadas, WhatsApp y correo para resolver dudas de trámites, traslados o seguimiento sin pasos innecesarios.' },
  { title: 'Servicios claros', text: 'Cada apartado explica qué atiende Morenas, qué información necesita el cliente y cómo se da seguimiento al servicio solicitado.' },
  { title: 'Rastreo sencillo', text: 'El sistema usa correo e ID de transporte para consultar servicios registrados sin complicar al cliente con herramientas técnicas.' },
  { title: 'Imagen real de operación', text: 'Las secciones están preparadas para fotografías reales, publicaciones de Facebook y contenido visual de unidades, clientes y asesoría.' },
];

export const processSteps = [
  { number: '01', title: 'Contacto inicial', text: 'El cliente solicita información por WhatsApp, teléfono, correo o formulario indicando el tipo de servicio que necesita.' },
  { number: '02', title: 'Revisión del caso', text: 'Morenas revisa si el servicio corresponde a asesoría aduanal, legalización, transporte o seguimiento de una unidad.' },
  { number: '03', title: 'Registro y seguimiento', text: 'Cuando el servicio requiere transporte, se genera un ID, se asigna una unidad y el cliente puede consultar el avance.' },
  { number: '04', title: 'Cierre y continuidad', text: 'El cliente conserva sus datos de contacto y seguimiento para futuras aclaraciones o nuevas solicitudes.' },
];

export const customServices = [
  { title: 'Asesoría aduanal', text: 'Atención para clientes que buscan orientación sobre requisitos, documentación y pasos relacionados con vehículos provenientes de Estados Unidos.' },
  { title: 'Legalización vehicular', text: 'Servicio enfocado en acompañar el proceso de legalización de vehículos con comunicación clara y revisión de información clave.' },
  { title: 'Traslados e importaciones', text: 'Coordinación para clientes que necesitan mover o gestionar vehículos de Estados Unidos a México con seguimiento del servicio.' },
  { title: 'Atención personalizada', text: 'Contacto directo para resolver dudas, revisar el caso y mantener informado al cliente durante el proceso.' },
];

export const truckServices = [
  { title: 'Solicitud de transporte', text: 'El cliente registra correo, origen, destino y detalles del servicio para generar una solicitud identificable.' },
  { title: 'Asignación de unidad', text: 'Cada solicitud puede vincularse a una unidad o ruta para mostrar estatus y datos de seguimiento.' },
  { title: 'Consulta por correo', text: 'El cliente puede recuperar sus servicios usando el correo registrado, sin depender únicamente de llamadas.' },
  { title: 'Estatus del recorrido', text: 'El panel muestra origen, destino, unidad asignada, evento más reciente y avance del servicio.' },
];

export const gallery = [
  { image: assets.customsVehicle, title: 'Asesoría aduanal y legalización', tag: 'Aduana', description: 'Atención para clientes que necesitan legalizar, importar o revisar requisitos de vehículos provenientes de Estados Unidos.' },
  { image: assets.containerTruck, title: 'Traslado de vehículos', tag: 'Transporte', description: 'Coordinación de unidades, plataformas y rutas para servicios de traslado hacia México.' },
  { image: assets.operationsCenter, title: 'Atención de Morenas', tag: 'Contacto', description: 'Información de canales oficiales, teléfonos y medios de comunicación para clientes.' },
  { image: assets.trackingMap, title: 'Rastreo por correo e ID', tag: 'Rastreo', description: 'Consulta de servicios registrados mediante correo, ID de transporte y unidad asignada.' },
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
