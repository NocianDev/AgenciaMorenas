const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      data?.message || `Error de servidor: ${response.status}`,
    );

    error.status = response.status;
    throw error;
  }

  return data;
}

export function login(email, password) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export function logout() {
  return request('/api/auth/logout', {
    method: 'POST',
  });
}

export function getCurrentUser() {
  return request('/api/auth/me');
}

export function getOrders() {
  return request('/api/orders');
}

export function getPublicTracking(token) {
  return request(`/api/tracking/token/${encodeURIComponent(token)}`);
}

export function createPublicCheckoutSession(token) {
  return request(`/api/tracking/token/${encodeURIComponent(token)}/create-checkout-session`, { method: 'POST' });
}

export function updateOrderAmount(id, totalAmountCents, confirmPaidUpdate = false) {
  return request(`/api/orders/${id}/amount`, { method: 'PATCH', body: JSON.stringify({ totalAmountCents, confirmPaidUpdate }) });
}

export function createAdminCheckoutSession(id) {
  return request(`/api/orders/${id}/create-checkout-session`, { method: 'POST' });
}

export function getClients() {
  return request('/api/clients');
}

export function getVehicles() {
  return request('/api/vehicles');
}

export function changeOrderStatus(orderId, status, notes = '') {
  return request(`/api/orders/${orderId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({
      status,
      notes,
    }),
  });
}

export function createClient(client) {
  return request('/api/clients', {
    method: 'POST',
    body: JSON.stringify(client),
  });
}

export function createVehicle(vehicle) {
  return request('/api/vehicles', {
    method: 'POST',
    body: JSON.stringify(vehicle),
  });
}

export function createOrder(order) {
  return request('/api/orders', {
    method: 'POST',
    body: JSON.stringify(order),
  });
}

export function deactivateVehicle(vehicleId) {
  return request(`/api/vehicles/${vehicleId}/deactivate`, {
    method: 'PATCH',
  });
}

export function activateVehicle(vehicleId) {
  return request(`/api/vehicles/${vehicleId}/activate`, {
    method: 'PATCH',
  });
}

export const getDrivers = () => request('/api/drivers');
export const createDriver = (driver) => request('/api/drivers', { method: 'POST', body: JSON.stringify(driver) });
export const updateDriver = (id, driver) => request(`/api/drivers/${id}`, { method: 'PATCH', body: JSON.stringify(driver) });
export const deactivateDriver = (id) => request(`/api/drivers/${id}`, { method: 'DELETE' });
export const updateOrder = (id, order) => request(`/api/orders/${id}`, { method: 'PATCH', body: JSON.stringify(order) });
export const addOrderNote = (id, note) => request(`/api/orders/${id}/notes`, { method: 'POST', body: JSON.stringify(note) });
export const createServiceRequest = (data) => request('/api/service-requests', { method: 'POST', body: JSON.stringify(data) });
export const getServiceRequests = (filters = {}) => { const query = new URLSearchParams(Object.entries(filters).filter(([, value]) => value)); return request(`/api/service-requests${query.size ? `?${query}` : ''}`); };
export const updateServiceRequestStatus = (id, status, reason = '') => request(`/api/service-requests/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status, reason }) });
export const convertServiceRequest = (id) => request(`/api/service-requests/${id}/convert`, { method: 'POST' });
