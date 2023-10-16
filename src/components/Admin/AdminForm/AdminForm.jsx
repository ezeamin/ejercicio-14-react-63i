import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { toast } from 'sonner';

import { useEditBlog } from '../../../stores/useEditBlog';

import { postBlogFn, putBlogFn } from '../../../api/blogs';

import { generateId } from '../../../helpers/helpers';

import Input from '../../Input/Input';
import Textarea from '../../Textarea/Textarea';

const AdminForm = () => {
  // ZUSTAND HOOKS ---------------------------------------------

  const { blog: blogToEdit, clearBlog } = useEditBlog();
  const isEditing = !!blogToEdit;

  // FORM HOOKS ------------------------------------------------

  const {
    register,
    handleSubmit: onSubmitRHF,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  // TQUERY HOOKS ----------------------------------------------

  // Nos va a servir para invalidar la cache y volver a cargar la tabla
  const queryClient = useQueryClient();

  // CREATE (POST)
  const { mutate: postBlog } = useMutation({
    mutationFn: postBlogFn,
    onSuccess: () => {
      // Mensajes de exito
      Swal.close()	
      toast.success('Blog guardado correctamente');

      // Limpiar el formulario
      reset();

      // Invalidar la cache y volver a cargar tabla
      queryClient.invalidateQueries('blogs');
    },
    onError: () => {
      Swal.close()	
      toast.error('Ocurrió un error guardando el blog');
    },
  });

  // EDIT (PUT)
  const { mutate: putBlog } = useMutation({
    mutationFn: putBlogFn,
    onSuccess: () => {
      // Mensajes de exito
      Swal.close()	
      toast.success('Blog guardado correctamente');

      // Limpiar el formulario
      reset();

      // Limpiar el estado global
      clearBlog();

      // Invalidar la cache y volver a cargar tabla
      queryClient.invalidateQueries('blogs');
    },
    onError: () => {
      Swal.close()	
      toast.error('Ocurrió un error guardando el blog');
    },
  });

  // HANDLERS --------------------------------------------------

  const handleSubmit = (data) => {
    Swal.showLoading();

    // Edit
    if (isEditing) {
      const editedBlog = { ...data, id: blogToEdit.id };
      putBlog(editedBlog);
      return;
    }

    // Create
    const newBlog = { ...data, id: generateId() };
    postBlog(newBlog);
  };

  useEffect(() => {
    if (blogToEdit) {
      setValue('title', blogToEdit.title);
      setValue('image-url', blogToEdit['image-url']);
      setValue('content', blogToEdit.content);
    }
  }, [blogToEdit, setValue]);

  // RENDER ----------------------------------------------------

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
