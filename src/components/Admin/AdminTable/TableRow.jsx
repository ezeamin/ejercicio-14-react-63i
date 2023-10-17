import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { deleteBlogFn } from '../../../api/blogs';
import { toast } from 'sonner';

const TableRow = (props) => {
  const { blog, index } = props;

  // TQUERY --------------------------------------------------

  const queryClient = useQueryClient();

  const { mutate: deleteBlog } = useMutation({
    mutationFn: deleteBlogFn,
    onSuccess: () => {
      Swal.close();
      toast.success('Blog eliminado');

      queryClient.invalidateQueries('blogs');
    },
    onError: () => {
      Swal.close();
      toast.error('Ocurrió un error eliminando el blog');
    },
  });

  // HANDLERS -------------------------------------------------

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás por eliminar irreversiblemente el blog "${blog.title}"`,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No',
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.showLoading();
        deleteBlog(blog.id);
      }
    });
  };

  // RENDER ---------------------------------------------------

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{blog.title}</td>
      <td>
        <img
          src={blog['image-url']}
          alt={blog.title}
          className='admin-table-img'
        />
      </td>
      <td>
        <button type='button' className='btn btn-warning'>
          Editar
        </button>
        <button
          type='button'
          className='btn btn-danger ms-2'
          onClick={handleDelete}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};
export default TableRow;
