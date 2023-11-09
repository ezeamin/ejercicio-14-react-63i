import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL;

// Funcion que simula el comportamiento de un backend
export const postLoginFn = async (formData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data.message;
    throw new Error(message || 'Ocurrió un error al loguearse');
  }

  const token = data.data; // alli está el token

  sessionStorage.setItem('token', token);

  const userData = jwtDecode(token).user;

  return userData;
};
