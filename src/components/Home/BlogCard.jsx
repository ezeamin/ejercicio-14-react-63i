import { Link } from 'react-router-dom';

const BlogCard = (props) => {
  const { blog } = props;

  return (
    <article className='col-12 col-sm-4 col-md-3 mb-2'>
      <div className='card h-100'>
        <img
          src={blog['image-url']}
          className='card-img-top home-cards-img'
          alt={blog.title}
        />
        <div className='card-body d-flex flex-column justify-content-between'>
          <h5 className='card-title'>{blog.title}</h5>
          <Link to={`/detail/${blog.id}`} className='btn btn-dark w-100'>
            Leer
          </Link>
        </div>
      </div>
    </article>
  );
};
export default BlogCard;
