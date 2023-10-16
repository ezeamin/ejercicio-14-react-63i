const API_URL = import.meta.env.VITE_API_URL;

export const fetchBlogsFn = async () => {
  const response = await fetch(`${API_URL}/blogs`);
  const data = await response.json();
  return data;
};

export const postBlogFn = async (blog) => {
  const response = await fetch(`${API_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  });

  if (!response.ok) {
    throw new Error('Ocurrió un error guardando el blog');
  }
};

export const putBlogFn = async (blog) => {
  const response = await fetch(`${API_URL}/blogs/${blog.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  });

  if (!response.ok) {
    throw new Error('Ocurrió un error guardando el blog');
  }
};

export const deleteBlogFn = async (blogId) => {
  const response = await fetch(`${API_URL}/blogs/${blogId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Ocurrió un error eliminando el blog');
  }
};
