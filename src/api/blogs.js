const API_URL = import.meta.env.VITE_API_URL;

export const getBlogsFn = async () => {
  const res = await fetch(`${API_URL}/blogs`);

  if (!res.ok) {
    throw new Error('Ocurrió un error al traer los blogs');
  }

  const data = await res.json();

  return data;
};

export const getBlogByIdFn = async (id) => {
  const res = await fetch(`${API_URL}/blogs/${id}`);

  if (!res.ok) {
    throw new Error('Ocurrió un error al traer los blogs');
  }

  const data = await res.json();

  return data;
};

export const postBlogFn = async (data) => {
  const token = sessionStorage.getItem('token');

  const res = await fetch(`${API_URL}/blogs`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message || 'Ocurrió un error al guardar el blog');
  }
};

export const putBlogFn = async (data) => {
  const token = sessionStorage.getItem('token');

  const res = await fetch(`${API_URL}/blogs/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify({ ...data, id: undefined }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message || 'Ocurrió un error al guardar el blog');
  }
};

export const deleteBlogFn = async (blogId) => {
  const token = sessionStorage.getItem('token');

  const res = await fetch(`${API_URL}/blogs/${blogId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message || 'Ocurrió un error al eliminar el blog');
  }
};
