import { useQuery } from '@tanstack/react-query';

import { fetchBlogsFn } from '../../api/blogs';

import BlogCard from './BlogCard';

import './style.css';

const BlogList = () => {
  const { data, isLoading, isError } = useQuery(['blogs'], fetchBlogsFn);

  return (
    <section>
      {isError && (
        <div className='alert alert-danger mt-3'>
          Ocurrió un error cargando los datos
        </div>
      )}
      {isLoading ? (
        <h3 className='mt-4 text-center'>Cargando...</h3>
      ) : (
        <div className='row'>
          {data.map((blog) => (
            <BlogCard blog={blog} key={blog.id} />
          ))}
        </div>
      )}
    </section>
  );
};
export default BlogList;
