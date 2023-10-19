import RegisterForm from '../components/Register/RegisterForm';

const RegisterView = () => {
  return (
    <>
      <h1>Registro</h1>
      <hr />
      <section className='bg-light rounded p-4 '>
        <section className='alert alert-info'>
          La contraseña deberá tener, al menos, 1 minúscula, 1 mayúscula, 1
          número, 1 caracter especial, y al menos 8 caracteres en total
        </section>
        <RegisterForm />
      </section>
    </>
  );
};
export default RegisterView;
