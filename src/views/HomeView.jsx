import { useQuery } from '@tanstack/react-query';

import { getBlogsFn } from '../api/blogs';

import BlogItem from '../components/Home/BlogItem';

const HomeView = () => {
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogsFn,
  });

  if (isLoading) {
    return <h3 className='mt-3 text-center'>Cargando...</h3>;
  }

  if (isError) {
    return (
      <div className='mt-3 alert alert-danger'>
        Ocurrió un error cargando los blogs
      </div>
    );
  }

  if (blogs) {
    return (
      <section className='row mt-3'>
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </section>
    );
  }

  return <></>;
};
export default HomeView;
