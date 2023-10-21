import './style.css';

const BlogDetail = (props) => {
  const { blog } = props;

  return (
    <section>
      <img
        src={blog['image-url']}
        alt={blog.title}
        className='content-image'
        align='right'
      />
      <p className='mb-0'>{blog.content}</p>
    </section>
  );
};
export default BlogDetail;
