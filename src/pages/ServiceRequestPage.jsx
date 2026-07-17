import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createServiceRequest } from '../services/api';

const initial = { fullName: '', phone: '', email: '', companyName: '', taxId: '', preferredContactMethod: '', serviceType: '', customServiceType: '', originAddress: '', destinationAddress: '', cargoDescription: '', cargoWeightKg: '', requestedDate: '', vehicleMake: '', vehicleModel: '', vehicleYear: '', vehicleVin: '', comments: '', privacyAccepted: false, website: '' };
const services = ['Traslado de vehículo', 'Transporte de mercancía', 'Importación', 'Legalización', 'Regularización', 'Asesoría aduanal', 'Otro'];

export default function ServiceRequestPage() {
  const [form, setForm] = useState(initial); const [sending, setSending] = useState(false); const [error, setError] = useState(''); const [result, setResult] = useState(null);
  const update = ({ target }) => setForm((value) => ({ ...value, [target.name]: target.type === 'checkbox' ? target.checked : target.value }));
  async function submit(event) {
    event.preventDefault(); if (sending) return; setSending(true); setError('');
    try { const response = await createServiceRequest(form); setResult(response); setForm(initial); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    catch (requestError) { setError(requestError.message); }
    finally { setSending(false); }
  }
  if (result) return <main className="request-page"><section className="request-confirmation" role="status"><span>Solicitud recibida</span><h1>Gracias por confiar en Morenas</h1><strong>{result.requestNumber}</strong><p>{result.message}</p><div className="hero-actions"><button className="btn btn-primary" type="button" onClick={() => setResult(null)}>Enviar otra solicitud</button><Link className="btn btn-secondary" to="/">Volver al inicio</Link></div></section></main>;
  return <main className="request-page"><header className="request-heading"><p className="eyebrow">Solicitud de servicio</p><h1>Cuéntanos qué necesitas trasladar o gestionar</h1><p>Completa tus datos y los detalles del servicio. Recibirás un folio SOL; nuestro equipo revisará la información antes de crear el pedido y su rastreo.</p></header>
    <form className="service-request-form" onSubmit={submit} noValidate>
      <fieldset><legend>1. Datos del cliente</legend><div className="request-form-grid">
        <label>Nombre completo *<input name="fullName" value={form.fullName} onChange={update} required maxLength="120" autoComplete="name" /></label>
        <label>Teléfono *<input name="phone" value={form.phone} onChange={update} required maxLength="30" autoComplete="tel" inputMode="tel" /></label>
        <label>Correo electrónico *<input type="email" name="email" value={form.email} onChange={update} required maxLength="160" autoComplete="email" /></label>
        <label>Empresa<input name="companyName" value={form.companyName} onChange={update} maxLength="160" autoComplete="organization" /></label>
        <label>RFC<input name="taxId" value={form.taxId} onChange={update} maxLength="20" autoCapitalize="characters" /></label>
        <label>Medio de contacto preferido<select name="preferredContactMethod" value={form.preferredContactMethod} onChange={update}><option value="">Sin preferencia</option><option>WhatsApp</option><option>Llamada</option><option>Correo</option></select></label>
      </div></fieldset>
      <fieldset><legend>2. Datos del servicio o pedido</legend><div className="request-form-grid">
        <label>Tipo de servicio *<select name="serviceType" value={form.serviceType} onChange={update} required><option value="">Selecciona una opción</option>{services.map((item) => <option key={item}>{item}</option>)}</select></label>
        {form.serviceType === 'Otro' && <label>Especifica el servicio *<input name="customServiceType" value={form.customServiceType} onChange={update} required maxLength="100" /></label>}
        <label>Origen *<input name="originAddress" value={form.originAddress} onChange={update} required maxLength="300" autoComplete="street-address" /></label>
        <label>Destino *<input name="destinationAddress" value={form.destinationAddress} onChange={update} required maxLength="300" /></label>
        <label className="request-wide">Descripción de la unidad, mercancía o servicio *<textarea name="cargoDescription" value={form.cargoDescription} onChange={update} required maxLength="1200" rows="4" /></label>
        <label>Peso aproximado (kg)<input type="number" name="cargoWeightKg" value={form.cargoWeightKg} onChange={update} min="0.01" max="1000000" step="0.01" /></label>
        <label>Fecha deseada<input type="date" name="requestedDate" value={form.requestedDate} onChange={update} /></label>
        <label>Marca del vehículo<input name="vehicleMake" value={form.vehicleMake} onChange={update} maxLength="80" /></label>
        <label>Modelo del vehículo<input name="vehicleModel" value={form.vehicleModel} onChange={update} maxLength="80" /></label>
        <label>Año del vehículo<input type="number" name="vehicleYear" value={form.vehicleYear} onChange={update} min="1886" max={new Date().getFullYear() + 1} /></label>
        <label>Número de serie o VIN<input name="vehicleVin" value={form.vehicleVin} onChange={update} maxLength="40" autoCapitalize="characters" /></label>
        <label className="request-wide">Comentarios adicionales<textarea name="comments" value={form.comments} onChange={update} maxLength="2000" rows="4" /></label>
      </div></fieldset>
      <label className="request-honeypot" aria-hidden="true">Sitio web<input name="website" value={form.website} onChange={update} tabIndex="-1" autoComplete="off" /></label>
      <label className="privacy-check"><input type="checkbox" name="privacyAccepted" checked={form.privacyAccepted} onChange={update} required /><span>Acepto el <Link to="/aviso-de-privacidad">aviso de privacidad</Link> y autorizo el uso de mis datos para dar seguimiento a esta solicitud. *</span></label>
      {error && <p className="request-error" role="alert">{error}</p>}
      <button className="btn btn-primary request-submit" type="submit" disabled={sending}>{sending ? 'Enviando solicitud…' : 'Enviar solicitud'}</button>
    </form></main>;
}
