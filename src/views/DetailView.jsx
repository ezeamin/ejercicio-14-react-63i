import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

import { fetchBlogByIdFn } from '../api/blogs';

import BlogContent from '../components/Detail/BlogContent';

const DetailView = () => {
  // Este hook nos permite acceder a los parámetros de la URL (en este caso, el id definido en Router.jsx)
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery(['blog-by-id'], () =>
    fetchBlogByIdFn(id)
  );

  if (isLoading) {
    return (
      <>
        <div className='d-flex justify-content-between'>
          <h1 className='mb-0'>Cargando...</h1>
          <Link to='/' className='btn btn-dark d-flex align-items-center'>
            {'← Volver'}
          </Link>
        </div>
        <hr />
      </>
    );
  }

  return (
    <>
      <div className='d-flex justify-content-between'>
        <h1 className='mb-0'>{data.title}</h1>
        <Link to='/' className='btn btn-dark d-flex align-items-center'>
          {'← Volver'}
        </Link>
      </div>
      <hr />
      {isError ? (
        <div className='alert alert-danger mt-3'>
          Ocurrió un error cargando este blog
        </div>
      ) : (
        <BlogContent blog={data} />
      )}
    </>
  );
};
export default DetailView;
