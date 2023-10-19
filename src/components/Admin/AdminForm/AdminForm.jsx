import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import { toast } from 'sonner';

import { postBlogFn, putBlogFn } from '../../../api/blogs';

import { useBlog } from '../../../stores/useBlog';

import Input from '../../Input/Input';
import Textarea from '../../Textarea/Textarea';

const AdminForm = () => {
  // RHF -----------------------------------------------------

  const {
    register,
    handleSubmit: onSubmitRHF,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  // ZUSTAND -------------------------------------------------

  const { blog, clearBlog } = useBlog();

  const isEditing = !!blog;

  // En el caso que esté editando un blog
  if (isEditing) {
    setValue('title', blog.title);
    setValue('image-url', blog['image-url']);
    setValue('content', blog.content);
  }

  // TQUERY --------------------------------------------------

  const queryClient = useQueryClient();

  // CREATE (POST)
  const { mutate: postBlog } = useMutation({
    mutationFn: postBlogFn,
    onSuccess: () => {
      // Mensaje de exito
      Swal.close();
      toast.success('Blog guardado correctamente');

      // Resetear el formulario
      reset();

      // Indicar que la tabla se tiene que recargar
      queryClient.invalidateQueries('blogs');
    },
    onError: () => {
      Swal.close();
      toast.error('Ocurrió un error al guardar el blog');
    },
  });

  // UPDATE (PUT)
  const { mutate: putBlog } = useMutation({
    mutationFn: putBlogFn,
    onSuccess: () => {
      // Mensaje de exito
      Swal.close();
      toast.success('Blog guardado correctamente');

      // Resetear el formulario
      reset();

      // Limpiar estado global
      clearBlog();

      // Indicar que la tabla se tiene que recargar
      queryClient.invalidateQueries('blogs');
    },
    onError: () => {
      Swal.close();
      toast.error('Ocurrió un error al guardar el blog');
    },
  });

  // HANDLERS ------------------------------------------------

  const handleSubmit = (data) => {
    Swal.showLoading();

    if (isEditing) {
      putBlog({ ...data, id: blog.id });
    } else {
      postBlog(data);
    }
  };

  // RENDER --------------------------------------------------

  return (
    <form className='card p-3' onSubmit={onSubmitRHF(handleSubmit)}>
      <Input
        register={register}
        options={{
          required: true,
          minLength: 4,
          maxLength: 60,
        }}
        label='Titulo'
        name='title'
        placeholder='Mondongo al plato, uma delicia'
        error={!!errors.title}
      />
      <Input
        register={register}
        options={{
          required: true,
          minLength: 4,
          pattern: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webp|jpeg)/i,
        }}
        className='mt-2'
        type='url'
        label='Enlace a imagen'
        name='image-url'
        placeholder='https://google.com'
        error={!!errors['image-url']}
      />
      <Textarea
        register={register}
        options={{
          required: true,
          minLength: 5,
          maxLength: 3000,
        }}
        className='mt-2'
        label='Contenido del blog'
        name='content'
        placeholder='Hola'
        error={!!errors.content}
      />
      <div className='text-end'>
        <button type='submit' className='btn btn-danger mt-3'>
          Guardar
        </button>
      </div>
    </form>
  );
};
export default AdminForm;
