# Morenas Agencia Aduanal y Transporte

Proyecto web final para **Morenas**, enfocado en:

- Agencia aduanal
- Regularización e importación vehicular
- Transporte terrestre en camión
- Rastreo por correo e ID de transporte
- Solicitud de transporte desde la web

## Desarrollo local

Instala dependencias:

```bash
npm install
```

### Terminal 1: backend

```bash
npm run backend
```

El backend corre en:

```bash
http://localhost:4000
```

### Terminal 2: frontend

```bash
npm run dev
```

El frontend corre en:

```bash
http://localhost:5173
```

## Prueba rápida del rastreo

En la sección **Rastreo**, puedes consultar con:

```txt
cliente@morenas.com
```

También puedes crear una solicitud nueva desde el formulario. La plataforma generará un ID tipo:

```txt
MOR-25003
```

## Endpoints incluidos

Backend local Express:

- `GET /api/health`
- `GET /api/tracking`
- `GET /api/tracking/MOR-401`
- `GET /api/orders`
- `POST /api/orders`
- `GET /api/orders/by-email?email=cliente@morenas.com`
- `GET /api/orders/MOR-25001`

Serverless Vercel:

- `/api/tracking`
- `/api/orders`

## Notas

- El sistema de rastreo funciona como demo funcional.
- El envío real de correo no está conectado todavía. Para producción se puede conectar Resend, SendGrid, Gmail API o SMTP.
- Las solicitudes se guardan en memoria durante la ejecución local. Para producción conviene conectar MongoDB, Supabase, Firebase o PostgreSQL.
- El ZIP no incluye `node_modules`, `dist` ni `package-lock.json` para evitar conflictos de instalación.
