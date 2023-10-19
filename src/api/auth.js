const API_URL = import.meta.env.VITE_API_URL;

// Funcion que simula el comportamiento de un backend
export const postLoginFn = async (formData) => {
  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) {
    throw new Error('Ocurrió un error al loguearse');
  }

  const users = await response.json();

  const foundUser = users.find(
    (item) =>
      item.username === formData.username && item.password === formData.password
  );

  if (!foundUser) {
    throw new Error('Usuario o contraseña no válida');
  }

  // Devolver los datos del usuario sin la contraseña
  return { ...foundUser, password: undefined };
};
