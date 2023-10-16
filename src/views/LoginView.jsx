import LoginForm from '../components/Login/LoginForm';

const LoginView = () => {
  return (
    <>
      <h1>Iniciar sesión</h1>
      <hr />
      <section className='row bg-light p-4 rounded'>
        <article className='col-12 col-md-6'>
          <LoginForm />
        </article>
        <article className='col-12 col-md-6'>
          <img src="https://i.ytimg.com/vi/eQHg4vl6bb8/maxresdefault.jpg" alt="Empanadas" className='w-100 rounded' />
        </article>
      </section>
    </>
  );
};
export default LoginView;
