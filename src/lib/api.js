const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Read the auth token at request-time so the token stored during login is used.
// Falls back to the build-time env var if localStorage is not available (e.g. SSR).
function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken") || process.env.NEXT_PUBLIC_API_TOKEN;
  }
  return process.env.NEXT_PUBLIC_API_TOKEN;
}

async function request(endpoint, method = 'GET', body = null, headers = {}, isGuest = false, fetchOptions = {}) {
  const token = isGuest ? process.env.NEXT_PUBLIC_API_TOKEN : getToken();

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
    ...fetchOptions,
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
  get: (endpoint, headers, fetchOptions) =>
    request(endpoint, 'GET', null, headers, false, fetchOptions),

  post: (endpoint, data, headers, fetchOptions) =>
    request(endpoint, 'POST', data, headers, false, fetchOptions),

  postGuest: (endpoint, data, headers, fetchOptions) =>
    request(endpoint, 'POST', data, headers, true, fetchOptions),

  put: (endpoint, data, headers, fetchOptions) =>
    request(endpoint, 'PUT', data, headers, false, fetchOptions),

  delete: (endpoint, headers, fetchOptions) =>
    request(endpoint, 'DELETE', null, headers, false, fetchOptions),
};
