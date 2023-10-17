import './style.css';

const BlogContent = (props) => {
  const { blog } = props;

  return (
    <section>
      <img
        src={blog['image-url']}
        alt={blog.title}
        align='right'
        className='detail-img'
      />
      <p>{blog.content}</p>
    </section>
  );
};
export default BlogContent;
