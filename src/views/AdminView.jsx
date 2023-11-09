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

  // Caso de error
  if (isError) {
    return (
      <>
        <h1>Panel de administración</h1>
        <hr />
        <AdminForm />
        <div className='alert alert-danger mt-3'>
          Ocurrió un error cargando los blogs
        </div>
      </>
    );
  }

  // Return optimista (todo ok)
  return (
    <>
      <h1>Panel de administración</h1>
      <hr />
      <AdminForm />
      {isLoading ? (
        <h3 className='mt-3 text-center'>Cargando...</h3>
      ) : (
        <AdminTable blogs={blogs.data} />
      )}
    </>
  );
};
export default AdminView;
