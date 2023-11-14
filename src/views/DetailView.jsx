import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

import { getBlogByIdFn } from '../api/blogs';

import BlogDetail from '../components/Detail/BlogDetail';

const DetailView = () => {
  const { id } = useParams();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blog-by-id'],
    queryFn: () => getBlogByIdFn(id),
  });

  if (isLoading) {
    return (
      <>
        <h1>Cargando...</h1>
        <hr />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <h1>Error</h1>
        <hr />
        <div className='alert alert-danger'>
          Ocurrió un error cargando este blog
        </div>
      </>
    );
  }

  // Caso: Blog encontrado
  if (blog) {
    return (
      <>
        <div className='d-flex justify-content-between align-items-center'>
          <h1 className='mb-0'>{blog.data.title}</h1>
          <Link to='/' className='btn btn-dark'>Volver a home</Link>
        </div>
        <hr />
        <BlogDetail blog={blog.data} />
      </>
    );
  }

  return <></>;
};
export default DetailView;
