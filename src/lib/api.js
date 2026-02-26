const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

async function request(endpoint, method = 'GET', body = null, headers = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'API request failed');
  }

  return response.json();
}

/* =====================
   GENERIC CRUD METHODS
   ===================== */

export const apiService = {
  get: (endpoint, headers) =>
    request(endpoint, 'GET', null, headers),

  post: (endpoint, data, headers) =>
    request(endpoint, 'POST', data, headers),

  put: (endpoint, data, headers) =>
    request(endpoint, 'PUT', data, headers),

  delete: (endpoint, headers) =>
    request(endpoint, 'DELETE', null, headers),
};
