import { useQuery } from '@tanstack/react-query';

import { fetchBlogsFn } from '../../api/blogs';

import BlogCard from './BlogCard';

import './style.css';

const BlogList = () => {
  const { data, isLoading, isError } = useQuery(['blogs'], fetchBlogsFn);

  if (isLoading) {
    return <h3 className='mt-4 text-center'>Cargando...</h3>;
  }

  if (isError) {
    return (
      <div className='alert alert-danger mt-3'>
        Ocurrió un error cargando los datos
      </div>
    );
  }

  // Solo llega acá si no hubo errores ni está cargando
  return (
    <section>
      <div className='row'>
        {data.map((blog) => (
          <BlogCard blog={blog} key={blog.id} />
        ))}
      </div>
    </section>
  );
};
export default BlogList;
