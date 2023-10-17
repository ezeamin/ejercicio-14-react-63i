import { useQuery } from '@tanstack/react-query';

import { getBlogsFn } from '../api/blogs';

import AdminForm from '../components/Admin/AdminForm/AdminForm';
import AdminTable from '../components/Admin/AdminTable/AdminTable';

const AdminView = () => {
  const {
    data: blogs,
    isError,
    isLoading,
  } = useQuery({ queryKey: ['blogs'], queryFn: getBlogsFn });
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
