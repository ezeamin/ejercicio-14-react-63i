import { useEffect, useState } from 'react';

import AdminForm from '../components/Admin/AdminForm/AdminForm';
import AdminTable from '../components/Admin/AdminTable/AdminTable';

const blogsLS = JSON.parse(localStorage.getItem('blogs')) || [];

const AdminView = () => {
  const [blogs, setBlogs] = useState(blogsLS);

  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }, [blogs]);

  return (
    <>
      <h1>Panel de administración</h1>
      <hr />
      <AdminForm setBlogs={setBlogs} />
      <AdminTable blogs={blogs} setBlogs={setBlogs} />
    </>
  );
};
export default AdminView;
