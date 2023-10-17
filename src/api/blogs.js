const API_URL = import.meta.env.VITE_API_URL;

export const getBlogsFn = async () => {
  const res = await fetch(`${API_URL}/blogs`);

  if (!res.ok) {
    throw new Error('Ocurrió un error al traer los blogs');
  }

  const data = await res.json();

  return data;
};

export const postBlogFn = async (data) => {
  const res = await fetch(`${API_URL}/blogs`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if(!res.ok){
    throw new Error('Ocurrió un error al traer los blogs');
  }
};
