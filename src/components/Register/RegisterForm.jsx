import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import { toast } from 'sonner';

import { useSession } from '../../stores/useSession';
import { postUserFn } from '../../api/users';

import Input from '../Input/Input';

const RegisterForm = () => {
  // ZUSTAND HOOKS -------------------------------------------

  const { login } = useSession();

  // NAVIGATION HOOKS -------------------------------------------

  const navigate = useNavigate();

  // FORM HOOKS ------------------------------------------------

  const {
    register,
    handleSubmit: onSubmitRHF,
    formState: { errors },
  } = useForm();

  // TQUERY HOOKS ----------------------------------------------

  const { mutate: postUser } = useMutation({
    mutationFn: postUserFn,
    onSuccess: (data) => {
      // Mensajes de exito
      Swal.close();
      toast.success('Usuario creado correctamente. Bienvenido!');

      // Actualizar estado global del usuario
      login(data);

      // Navegar a home
      navigate('/');
    },
    onError: () => {
      Swal.close();
      toast.error('Ocurrió un error creando el usuario');
    },
  });

  // HANDLERS --------------------------------------------------

  const handleSubmit = (data) => {
    Swal.showLoading();
    postUser({ ...data, isAdmin: false });
  };

  // RENDER ----------------------------------------------------

  return (
    <form
      className='bg-light p-4 rounded mt-2'
      onSubmit={onSubmitRHF(handleSubmit)}
    >
      <div className='row'>
        <div className='col-12 col-md-6 mb-2'>
          <Input
            register={register}
            options={{
              required: true,
              minLength: 3,
              maxLength: 60,
            }}
            label='Nombre'
            name='firstname'
            placeholder=''
            error={!!errors.firstname}
          />
        </div>
        <div className='col-12 col-md-6 mb-2'>
          <Input
            register={register}
            options={{
              required: true,
              minLength: 3,
              maxLength: 60,
            }}
            label='Apellido'
            name='lastname'
            placeholder=''
            error={!!errors.lastname}
          />
        </div>
        <div className='col-12 col-md-6 mb-2'>
          <Input
            register={register}
            options={{
              required: true,
              minLength: 3,
              maxLength: 60,
            }}
            label='Nombre de usuario'
            name='username'
            placeholder=''
            error={!!errors.username}
          />
        </div>
        <div className='col-12 col-md-6 mb-2'>
          <Input
            register={register}
            options={{
              required: true,
              minLength: 3,
              maxLength: 60,
            }}
            label='Contraseña'
            name='password'
            type='password'
            placeholder=''
            error={!!errors.password}
          />
        </div>
      </div>
      <button type='submit' className='btn btn-dark mt-2 w-100'>
        Registrarse
      </button>
    </form>
  );
};
export default RegisterForm;
