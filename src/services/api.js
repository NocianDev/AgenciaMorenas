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