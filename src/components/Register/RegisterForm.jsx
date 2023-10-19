import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import { toast } from 'sonner';

import { postUserFn } from '../../api/users';
import { useSession } from '../../stores/useSession';

import Input from '../Input/Input';

const RegisterForm = () => {
  // ZUSTAND --------------------------------------------

  const { login } = useSession();

  // RRD ------------------------------------------------

  const navigate = useNavigate();

  // RHF ------------------------------------------------

  const {
    register,
    formState: { errors },
    handleSubmit: onSubmitRHF,
  } = useForm();

  // TQUERY ----------------------------------------------

  const { mutate: postUser } = useMutation({
    mutationFn: postUserFn,
    onSuccess: (data) => {
      // Mensajes de exito
      Swal.close();
      toast.success('Bienvenido');

      // Loguear al usuario
      login({...data, password: undefined});

      // Navegar a inicio (pero ya estando logueados)
      navigate('/');
    },
    onError: () => {
      Swal.close();
      toast.error('Ocurrió un error al registrar el usuario');
    },
  });

  // HANDLERS --------------------------------------------

  const handleSubmit = (data) => {
    Swal.showLoading();
    postUser({ ...data, isAdmin: false });
  };

  // RENDER -----------------------------------------------

  return (
    <form onSubmit={onSubmitRHF(handleSubmit)} className='row'>
      <div className='col-12 col-md-6'>
        <Input
          label='Nombre'
          name='firstname'
          placeholder='Ingrese su nombre'
          register={register}
          error={!!errors?.firstname}
          className='mb-2'
          options={{
            minLength: 3,
            maxLength: 25,
            required: true,
          }}
        />
      </div>
      <div className='col-12 col-md-6'>
        <Input
          label='Apellido'
          name='lastname'
          placeholder='Ingrese su apellido'
          register={register}
          error={!!errors?.lastname}
          className='mb-2'
          options={{
            minLength: 3,
            maxLength: 25,
            required: true,
          }}
        />
      </div>
      <div className='col-12 col-md-6'>
        <Input
          label='Nombre de usuario'
          name='username'
          placeholder='Ingrese nombre de usuario'
          register={register}
          error={!!errors?.username}
          className='mb-2'
          options={{
            minLength: 3,
            maxLength: 25,
            required: true,
          }}
        />
      </div>
      <div className='col-12 col-md-6'>
        <Input
          label='Contraseña'
          type='password'
          name='password'
          placeholder=''
          register={register}
          error={!!errors?.password}
          className='mb-3'
          options={{
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
            required: true,
          }}
        />
      </div>
      <button className='btn btn-dark col-12' type='submit'>
        Registrarse
      </button>
    </form>
  );
};
export default RegisterForm;
