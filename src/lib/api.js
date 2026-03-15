const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Read the auth token at request-time so the token stored during login is used.
// Falls back to the build-time env var if localStorage is not available (e.g. SSR).
function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken") || process.env.NEXT_PUBLIC_API_TOKEN;
  }
  return process.env.NEXT_PUBLIC_API_TOKEN;
}

async function request(endpoint, method = 'GET', body = null, headers = {}, isGuest = false) {
  const token = isGuest ? process.env.NEXT_PUBLIC_API_TOKEN : getToken();

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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

  postGuest: (endpoint, data, headers) =>
    request(endpoint, 'POST', data, headers, true),

  put: (endpoint, data, headers) =>
    request(endpoint, 'PUT', data, headers),

  delete: (endpoint, headers) =>
    request(endpoint, 'DELETE', null, headers),
};
