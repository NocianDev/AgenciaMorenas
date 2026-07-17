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

## Persistencia

El backend principal usa PostgreSQL/Supabase mediante Prisma. Los archivos bajo `api/` pertenecen a una integración anterior y no sustituyen las rutas persistentes de `server/` usadas por el panel actual.

## Backend, base de datos y variables

El panel, las solicitudes públicas, los pedidos y el rastreo privado usan PostgreSQL mediante Prisma 7. Copia `.env.example` a `.env` y completa localmente `DATABASE_URL` y un `JWT_SECRET` de al menos 32 caracteres. Nunca guardes `.env` en Git.

```bash
npm install
npx prisma generate
npx prisma migrate deploy
node server/create-owner.cjs
```

Inicia `npm run backend` y `npm run dev` en terminales separadas. `CORS_ORIGIN` debe contener los orígenes del frontend separados por comas y `FRONTEND_URL` debe apuntar al dominio público usado para construir enlaces privados.

## Probar solicitudes y conversión

1. Abre `/solicitar-servicio`, completa los campos obligatorios y conserva el folio `SOL`.
2. Entra en `/admin/login` como OWNER o DISPATCHER.
3. En “Solicitudes de servicio”, marca la solicitud en revisión o como contactada.
4. Usa “Aprobar y convertir”. La transacción reutiliza el cliente por correo o crea uno, genera un único pedido `MOR`, historial y token privado.
5. Edita el pedido resultante para asignar monto, unidad, operador, estado y notas. Las notas internas nunca aparecen en el rastreo público.
6. Una solicitud rechazada conserva su motivo y no crea pedido; una convertida devuelve el pedido existente si se intenta convertir de nuevo.

## Stripe Checkout

Stripe es opcional al arrancar. Para pruebas locales configura `STRIPE_SECRET_KEY=sk_test_...`, ejecuta Stripe CLI y reenvía eventos al endpoint `/api/stripe/webhook`; coloca el `whsec_...` temporal de `stripe listen` únicamente en el `.env` local. Para producción en Render configura manualmente una clave `sk_live_...` y el `STRIPE_WEBHOOK_SECRET` del webhook live que apunta al backend de Render. No reutilices el secreto de Stripe CLI en producción. Al usar Checkout alojado no hace falta una clave publicable en el frontend.

## Despliegue

En Render deben configurarse manualmente `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `FRONTEND_URL`, `STRIPE_SECRET_KEY` y `STRIPE_WEBHOOK_SECRET`; ejecuta `npx prisma migrate deploy` como parte segura del despliegue. En Vercel configura `VITE_API_URL` con la URL del backend. Las claves y secretos nunca deben añadirse al repositorio.
