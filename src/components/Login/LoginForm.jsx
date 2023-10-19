import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import { toast } from 'sonner';

import { useSession } from '../../stores/useSession';
import { postLoginFn } from '../../api/auth';

import Input from '../Input/Input';

const LoginForm = () => {
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

  const { mutate: postLogin } = useMutation({
    mutationFn: postLoginFn,
    onSuccess: (data) => {
      // Mensajes de exito
      Swal.close();
      toast.success('Bienvenido');

      // Loguear al usuario
      login(data);

      // Navegar a inicio (pero ya estando logueados)
      navigate('/');
    },
    onError: (err) => {
      Swal.close();
      toast.error(err.message);
    },
  });

  // HANDLERS --------------------------------------------

  const handleSubmit = (data) => {
    Swal.showLoading();
    postLogin(data);
  };

  // RENDER ----------------------------------------------

  return (
    <form onSubmit={onSubmitRHF(handleSubmit)}>
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
      <Input
        label='Contraseña'
        type='password'
        name='password'
        placeholder=''
        register={register}
        error={!!errors?.password}
        className='mb-2'
        options={{
          minLength: 3,
          maxLength: 25,
          required: true,
        }}
      />
      <button className='btn btn-dark w-100' type='submit'>
        Ingresar
      </button>
      <p className='mb-0 mt-4'>
        Sos nuevo? <Link to='/register'>Registrate acá</Link>
      </p>
    </form>
  );
};
export default LoginForm;
