import LoginForm from '../components/Login/LoginForm';

const LoginView = () => {
  return (
    <>
      <h1>Bienvenido</h1>
      <hr />
      <section className='bg-light rounded p-4 '>
        <article className='row'>
          <div className='col-12 col-md-6 mb-2'>
            <LoginForm />
          </div>
          <div className='col-12 col-md-6'>
            <img
              src='https://i.ytimg.com/vi/eQHg4vl6bb8/maxresdefault.jpg'
              alt='Empanadas tucumanas'
              className='w-100 rounded'
            />
          </div>
        </article>
      </section>
    </>
  );
};
export default LoginView;
