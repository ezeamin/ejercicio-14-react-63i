const API_URL = import.meta.env.VITE_API_URL;

// Funcion que simula el comportamiento de un backend
export const postLoginFn = async (user) => {
  const { username, password } = user;

  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) {
    throw new Error('Ocurrió un error iniciando sesión');
  }

  const users = await response.json();

  const userFound = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!userFound) {
    throw new Error('Usuario o contraseña incorrectos');
  }

  // Devolver los datos del usuario sin la contraseña
  return { ...userFound, password: undefined };
};
