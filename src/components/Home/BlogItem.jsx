import { Link } from 'react-router-dom';

import './style.css';

const BlogItem = (props) => {
  const { blog } = props;

  return (
    <article className='col-12 col-md-6 col-lg-4 mb-2'>
      <div className='card h-100'>
        <img src={blog['image-url']} className='card-image' alt={blog.title} />
        <div className='card-body d-flex flex-column justify-content-between'>
          <h5 className='card-title'>{blog.title}</h5>
          <Link to={`/detail/${blog.id}`} className='btn btn-dark w-100'>
            Ver blog
          </Link>
        </div>
      </div>
    </article>
  );
};
export default BlogItem;
