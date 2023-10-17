import { useQuery } from '@tanstack/react-query';

import { getBlogsFn } from '../api/blogs';

import AdminForm from '../components/Admin/AdminForm/AdminForm';
import AdminTable from '../components/Admin/AdminTable/AdminTable';

const AdminView = () => {
  const { data: blogs, isError, isLoading } = useQuery(['blogs'], getBlogsFn);
  console.log(blogs);

  return (
    <>
      <h1>Panel de administración</h1>
      <hr />
      <AdminForm />
      <AdminTable blogs={blogs} />
    </>
  );
};
export default AdminView;
