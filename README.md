# Morenas Agencia Aduanal y Transporte

Versión final preparada para:

- Agencia aduanal
- Regularización e importación vehicular
- Transporte terrestre en camión
- Rastreo por correo e ID
- Galerías de imágenes reales en todas las pestañas
- Videos embebidos de Facebook en todas las pestañas

## Instalar

```bash
npm install
```

## Correr local

Terminal 1:

```bash
npm run backend
```

Terminal 2:

```bash
npm run dev
```

## Desplegar en Vercel

Configuración:

```txt
Framework: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install --registry=https://registry.npmjs.org/
```

## Imágenes reales

Coloca tus imágenes reales en:

```txt
public/images/morenas/
```

Puedes reemplazar estos archivos sin tocar código:

```txt
aduana-hero.jpg
transporte-hero.jpg
rastreo-hero.jpg
oficinas-hero.jpg
contacto-hero.jpg
aduana-1.jpg
aduana-2.jpg
transporte-1.jpg
transporte-2.jpg
rastreo-1.jpg
rastreo-2.jpg
oficina-1.jpg
oficina-2.jpg
contacto-1.jpg
```

## Videos de Facebook

Los videos se configuran en:

```txt
src/data/siteData.js
```

Busca:

```txt
facebookVideos
```

Y reemplaza cada valor:

```txt
REEMPLAZA_CON_LINK_DE_VIDEO_FACEBOOK...
```

por el link real del video de Facebook.

Ejemplo:

```js
facebookUrl: 'https://www.facebook.com/tuPagina/videos/123456789/'
```

La web convierte automáticamente ese link a embed de Facebook.

## APIs incluidas

- `/api/health`
- `/api/tracking`
- `/api/tracking/unit?id=MOR-401`
- `/api/orders`
- `/api/orders/by-email?email=cliente@morenas.com`
- `/api/orders/MOR-25001`

## Nota

El sistema de rastreo funciona como demo en memoria. Para producción con datos persistentes se recomienda conectar MongoDB, Supabase, Firebase o PostgreSQL.
