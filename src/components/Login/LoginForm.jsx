import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import Input from '../Input/Input';

const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit: onSubmitRHF,
  } = useForm();

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={onSubmitRHF(handleSubmit)}>
      <Input
        label='Nombre de usuario'
        name='username'
        placeholder='Ingrese nombre de usuario'
        register={register}
        error={!!errors?.username}
        className="mb-2"
      />
      <Input
        label='Contraseña'
        type='password'
        name='password'
        placeholder=''
        register={register}
        error={!!errors?.password}
        className="mb-2"
      /> 
      <button className='btn btn-dark w-100' type="submit">Ingresar</button>
      <p className='mb-0 mt-4'>Sos nuevo? <Link to="/register">Registrate acá</Link></p>
    </form>
  );
};
export default LoginForm;
