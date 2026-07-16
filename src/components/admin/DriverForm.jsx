import { useState } from 'react';
import { createDriver, updateDriver } from '../../services/api';
const empty = { fullName: '', phone: '', licenseNumber: '', licenseExpiration: '', active: true };
export default function DriverForm({ driver, onSaved, onCancel }) {
  const [form, setForm] = useState(driver ? { ...driver, licenseExpiration: driver.licenseExpiration?.slice(0, 10) || '' } : empty);
  const [state, setState] = useState({ loading: false, error: '' });
  const change = e => setForm(v => ({ ...v, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  async function submit(e) { e.preventDefault(); setState({ loading: true, error: '' }); try { const response = driver ? await updateDriver(driver.id, form) : await createDriver(form); onSaved?.(response.driver); } catch (error) { setState({ loading: false, error: error.message }); } }
  return <form className="admin-form" onSubmit={submit}><h2>{driver ? 'Editar operador' : 'Nuevo operador'}</h2><div className="admin-form-grid">
    <label>Nombre completo *<input name="fullName" value={form.fullName} onChange={change} minLength="3" required /></label>
    <label>Teléfono<input name="phone" value={form.phone} onChange={change} pattern="[+0-9 ()-]{7,20}" /></label>
    <label>Número de licencia *<input name="licenseNumber" value={form.licenseNumber} onChange={change} required /></label>
    <label>Vencimiento de licencia<input type="date" name="licenseExpiration" value={form.licenseExpiration} onChange={change} /></label>
    <label className="admin-check"><input type="checkbox" name="active" checked={form.active} onChange={change} /> Operador activo</label>
  </div>{state.error && <p className="admin-form-error">{state.error}</p>}<div className="admin-form-buttons"><button disabled={state.loading}>{state.loading ? 'Guardando...' : 'Guardar operador'}</button>{onCancel && <button type="button" className="secondary" onClick={onCancel}>Cancelar</button>}</div></form>;
}
