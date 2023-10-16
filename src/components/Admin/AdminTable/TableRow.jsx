import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { toast } from 'sonner';

import { useEditBlog } from '../../../stores/useEditBlog';

import { deleteBlogFn } from '../../../api/blogs';

const TableRow = (props) => {
  const { blog, index } = props;

  // ZUSTAND HOOKS ---------------------------------------------

  const { setBlog } = useEditBlog();

  // TQUERY HOOKS ----------------------------------------------

  // Nos va a servir para invalidar la cache y volver a cargar la tabla
  const queryClient = useQueryClient();

  const { mutate: deleteBlog } = useMutation({
    mutationFn: deleteBlogFn,
    onSuccess: () => {
      Swal.close();
      toast.success('Blog eliminado correctamente');

      // Invalidar la cache y volver a cargar tabla
      queryClient.invalidateQueries('blogs');
    },
    onError: () => {
      Swal.close();
      toast.error('Ocurrió un error eliminando el blog');
    },
  });

  // HANDLERS --------------------------------------------------

  const handleEdit = () => {
    setBlog(blog);
  };

  const handleDelete = () => {
    Swal.fire({
      title: `¿Estás seguro de eliminar el blog "${blog.title}"?`,
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.showLoading();
        deleteBlog(blog.id);
      }
    });
  };

  // RENDER ----------------------------------------------------

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
        <button type='button' className='btn btn-warning' onClick={handleEdit}>
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
