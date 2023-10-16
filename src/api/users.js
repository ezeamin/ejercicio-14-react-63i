const API_URL = import.meta.env.VITE_API_URL;

export const postUserFn = async (user) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('Ocurrió un error guardando el usuario');
  }

  return user;
};
