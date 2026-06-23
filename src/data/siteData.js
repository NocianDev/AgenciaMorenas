export const brand = {
  name: 'Morenas',
  legalName: 'Morenas Agencia Aduanal y Transporte',
  tagline: 'Aduana y transportes',
  shortDescription:
    'Morenas brinda atención en asesoría aduanal, legalización de vehículos, traslados y coordinación de transporte para clientes en México y Estados Unidos que necesitan un servicio claro, directo y con seguimiento.',
  phoneMX: '+52 81 2402 0614',
  phoneUS: '+1 346 855 2516',
  whatsapp: '528124020614',
  whatsappUS: '13468552516',
  email: 'paqueteriamorena@gmail.com',
  secondaryEmail: 'paqueteriamorena@gmail.com',
  address: 'Av. Concordia 324, Apodaca, Nuevo León, C.P. 66636',
  hours: 'Lunes a viernes: 8:00 a.m. a 6:00 p.m. | Sábados: 8:00 a.m. a 2:00 p.m.',
};

export const branches = [
  {
    city: 'Tijuana',
    title: 'Sucursal Tijuana',
    address: 'José María Larroque 8800, Empleados Federales, 22010 Tijuana, B.C.',
  },
  {
    city: 'Nogales',
    title: 'Sucursal Nogales',
    address: 'De Los Búhos 88, Colinas del Yaqui, 84093 Heroica Nogales, Son.',
  },
  {
    city: 'Nuevo Laredo',
    title: 'Sucursal Nuevo Laredo',
    address: 'Av. Ocampo 1600, Ferrocarril, 88040 Nuevo Laredo, Tamps.',
  },
];

export const coverageCities = ['Tijuana', 'Nogales', 'Nuevo Laredo', 'Reynosa'];

export const operatingCoverage = [
  {
    city: 'Tijuana',
    focus: 'Atención aduanal y regularización vehicular',
    text: 'Apoyo para clientes que requieren orientación, revisión documental y coordinación de servicios en frontera.',
  },
  {
    city: 'Nogales',
    focus: 'Trámites y acompañamiento fronterizo',
    text: 'Canal de atención para importación, legalización y seguimiento de unidades con comunicación directa.',
  },
  {
    city: 'Nuevo Laredo',
    focus: 'Cruce, transporte y coordinación terrestre',
    text: 'Cobertura operativa para rutas, unidades y servicios vinculados a movimientos entre México y Estados Unidos.',
  },
  {
    city: 'Reynosa',
    focus: 'Cobertura comercial y logística',
    text: 'Atención para solicitudes de traslado, asesoría y seguimiento de servicios con enfoque fronterizo.',
  },
];

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
  heroTrucks: '/images/Aduana3.jpg',
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
      description: 'Seguimiento visual de traslados, legalizaciones y atención directa para clientes de Morenas.',
      facebookUrl: 'https://www.facebook.com/reel/924585860574184',
      image: '/images/Aduana2.jpg',
    },
    {
      title: 'Asesoría y atención directa',
      description: 'Atención aduanal y logística para clientes que necesitan acompañamiento en México y Estados Unidos.',
      facebookUrl: 'https://www.facebook.com/reel/896216503235455',
      image: '/images/Aduana10.jpg',
    },
  ],
  customs: [
    {
      title: 'Proceso de asesoría aduanal',
      description: 'Material visual sobre legalización, revisión documental y atención de vehículos provenientes de Estados Unidos.',
      facebookUrl: 'https://www.facebook.com/reel/1452763742991994',
      image: '/images/Aduana11.jpg',
    },
  ],
  trucks: [
    {
      title: 'Traslado de unidades',
      description: 'Unidades, rutas y coordinación terrestre para servicios de traslado con seguimiento operativo.',
      facebookUrl: 'https://www.facebook.com/reel/1579946879769918',
      image: '/images/Aduana4.jpg',
    },
  ],
  tracking: [
    {
      title: 'Seguimiento del servicio',
      description: 'Consulta de servicio, unidad asignada y avances principales para clientes con transporte registrado.',
      facebookUrl: 'https://www.facebook.com/reel/1623486238978442',
      image: '/images/Aduana8.png',
    },
  ],
  offices: [
    {
      title: 'Atención y presencia de Morenas',
      description: 'Presencia de Morenas, puntos de atención y cobertura operativa para trámites y transportes.',
      facebookUrl: 'https://www.facebook.com/reel/2009021290021482',
      image: '/images/Aduana10.jpg',
    },
  ],
  contact: [
    {
      title: 'Mensaje para clientes',
      description: 'Canales oficiales para solicitar asesoría, resolver dudas y dar seguimiento a servicios registrados.',
      facebookUrl: 'https://www.facebook.com/reel/3933716700253060',
      image: '/images/Aduana7.jpg',
    },
  ],
};

export const mediaSections = {
  home: {
    eyebrow: 'Casos y servicios Morenas',
    title: 'Traslados y legalizaciones que muestran nuestra operación',
    description:
      'Una selección de servicios, unidades y entregas para conocer los tipos de traslado y legalización que atendemos entre Estados Unidos, México y Centroamérica.',
    items: [
      {
        type: 'image',
        title: 'Entrega y legalización de unidades',
        tag: 'Caso real',
        src: '/imagenes-nuevas/Morenas2.jpeg',
        featured: true,
        fit: 'contain',
      },
      {
        type: 'image',
        title: 'Traslado de vehículos y mercancía',
        tag: 'Cobertura',
        src: '/imagenes-nuevas/Morenas3.jpeg',
      },
      {
        type: 'image',
        title: 'Camionetas en traslado terrestre',
        tag: 'Transporte',
        src: '/imagenes-nuevas/Morenas4.jpeg',
      },
      {
        type: 'image',
        title: 'Unidad asegurada en plataforma',
        tag: 'Operación',
        src: '/imagenes-nuevas/Morenas5.jpeg',
      },
      {
        type: 'image',
        title: 'Proceso de importación atendido',
        tag: 'Importación',
        src: '/imagenes-nuevas/Morenas8.jpeg',
      },
      {
        type: 'video',
        title: 'Operación Morenas en movimiento',
        tag: 'Video',
        description: 'Una mirada breve a la operación y coordinación de traslados de Importaciones Morenas.',
        src: '/videos/MorenasVideo2.mp4',
        poster: '/images/Aduana2.jpg',
        orientation: 'landscape',
      },
      {
        type: 'video',
        title: 'Traslado de unidades Morenas',
        tag: 'Video',
        description: 'Conoce el movimiento y la coordinación de unidades durante un traslado.',
        src: '/videos/MorenasVideo1.mp4',
        poster: '/imagenes-nuevas/Morenas6.jpeg',
      },
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
      { type: 'image', title: 'Unidad Morenas en traslado', tag: 'Camión', src: '/imagenes-nuevas/Morenas6.jpeg', featured: true },
      { type: 'image', title: 'Vehículos en plataforma', tag: 'Ruta', src: '/images/Aduana4.jpg' },
      {
        type: 'video',
        title: 'Traslado de unidades Morenas',
        tag: 'Video',
        description: 'Video de apoyo para conocer el movimiento y la atención de unidades durante un traslado.',
        src: '/videos/MorenasVideo1.mp4',
        poster: '/images/Aduana3.jpg',
      },
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
    layout: 'office-contact-gallery',
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
    layout: 'contact-direct-gallery',
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
  { image: assets.operationsCenter, title: 'Atención de Morenas', tag: 'Contacto', description: 'Información de canales oficiales, teléfonos y medios de comunicación para clientes.', fit: 'contain' },
  { image: assets.trackingMap, title: 'Rastreo por correo e ID', tag: 'Rastreo', description: 'Consulta de servicios registrados mediante correo, ID de transporte y unidad asignada.' },
];

export const offices = [
  { city: 'Apodaca, Nuevo León', title: 'Oficina México', address: 'Av. Concordia 324, Apodaca, N.L. C.P. 66636', phone: brand.phoneMX, email: brand.email, schedule: 'Lunes a viernes: 8:00 a.m. a 6:00 p.m. | Sábados: 8:00 a.m. a 2:00 p.m.' },
  
  ...branches.map((branch) => ({
    city: branch.city,
    title: branch.title,
    address: branch.address,
    phone: brand.phoneMX,
    email: brand.email,
    schedule: 'Lunes a viernes: 8:00 a.m. a 6:00 p.m. | Sábados: 8:00 a.m. a 2:00 p.m.',
  })),
  { city: 'Cobertura adicional', title: 'Cobertura operativa', address: coverageCities.join(' · '), phone: brand.phoneMX, email: brand.email, schedule: 'Lunes a viernes: 8:00 a.m. a 6:00 p.m. | Sábados: 8:00 a.m. a 2:00 p.m.' },
];

export const faqs = [
  { q: '¿Cómo consulto mi transporte?', a: 'Puedes buscar con el correo registrado en la solicitud o con el ID de transporte generado por la plataforma.' },
  { q: '¿Qué información muestra el rastreo?', a: 'El panel muestra unidad asignada, ruta, origen, destino, estatus, última actualización y eventos principales del recorrido.' },
  { q: '¿También puedo recibir atención directa?', a: 'Sí. Morenas mantiene canales por teléfono, WhatsApp y correo para orientar solicitudes, confirmar datos del servicio y dar seguimiento comercial.' },
];

export const gpsUnits = [
  { id: 'MOR-401', label: 'Tractocamión 401', route: 'Monterrey → Laredo' },
  { id: 'MOR-722', label: 'Camión 722', route: 'Saltillo → Monterrey' },
  { id: 'MOR-318', label: 'Unidad 318', route: 'Nuevo Laredo → Apodaca' },
];
