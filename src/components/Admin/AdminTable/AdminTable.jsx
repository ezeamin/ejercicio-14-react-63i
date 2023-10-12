import TableRow from './TableRow';

import "./style.css"

const AdminTable = (props) => {
  const { blogs, setBlogs } = props;

  return (
    <section className='table-responsive mt-3 rounded'>
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog,index) => (
            <TableRow blog={blog} key={blog.id} index={index} />
          ))}
        </tbody>
      </table>
    </section>
  );
};
export default AdminTable;
