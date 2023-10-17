import { useQuery } from '@tanstack/react-query';

import { getBlogsFn } from '../api/blogs';

import AdminForm from '../components/Admin/AdminForm/AdminForm';
import AdminTable from '../components/Admin/AdminTable/AdminTable';

const AdminView = () => {
  const { data, isError, isLoading } = useQuery(['blogs'], getBlogsFn);
  console.log(data,isError,isLoading)

  return (
    <>
      <h1>Panel de administración</h1>
      <hr />
      <AdminForm  />
      <AdminTable  />
    </>
  );
};
export default AdminView;
