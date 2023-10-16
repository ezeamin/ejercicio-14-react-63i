import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import { toast } from 'sonner';

import { useSession } from '../../stores/useSession';
import { postLoginFn } from '../../api/auth';

import Input from '../Input/Input';

const LoginForm = () => {
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

  const { mutate: postLogin, error: errorLogin } = useMutation({
    mutationFn: postLoginFn,
    onSuccess: (data) => {
      // Mensajes de exito
      Swal.close();
      toast.success(`Bienvenido, ${data.firstname}!`);

      // Actualizar estado global del usuario
      login(data);

      // Navegar a home
      navigate('/');
    },
    onError: (err) => {
      Swal.close();

      // Solo mostrar el toast si el error no es por credenciales incorrectas
      if (!err.message.includes('incorrectos')) {
        toast.error('Ocurrió un error iniciando sesión');
      }
    },
  });

  // HANDLERS --------------------------------------------------

  const handleSubmit = (data) => {
    Swal.showLoading();
    postLogin(data);
  };

  // RENDER ----------------------------------------------------

  return (
    <form onSubmit={onSubmitRHF(handleSubmit)}>
      {errorLogin && (
        <div className='alert alert-warning'>
          <p className='mb-0'>{errorLogin.message}</p>
        </div>
      )}
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
        className='mt-2'
      />
      <button type='submit' className='btn btn-dark mt-2 w-100'>
        Ingresar
      </button>
      <p className='mt-3 mb-0'>
        No tenés usuario? <Link to='/register'>Creá uno acá</Link>
      </p>
    </form>
  );
};
export default LoginForm;
