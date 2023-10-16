import { useQuery } from '@tanstack/react-query';

import { fetchBlogsFn } from '../api/blogs';

import AdminForm from '../components/Admin/AdminForm/AdminForm';
import AdminTable from '../components/Admin/AdminTable/AdminTable';

const AdminView = () => {
  // Este nombre ('blogs') va a ser de utilidad más adelante
  const { data, isLoading, isError } = useQuery(['blogs'], fetchBlogsFn);

  return (
    <>
      <h1>Panel de administración</h1>
      <hr />
      <AdminForm />
      {isError && (
        <div className='alert alert-danger mt-3'>
          Ocurrió un error cargando los datos
        </div>
      )}
      {isLoading ? (
        <h3 className='mt-4 text-center'>Cargando...</h3>
      ) : (
        <AdminTable blogs={data} />
      )}
    </>
  );
};
export default AdminView;
