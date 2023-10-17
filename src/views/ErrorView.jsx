import { Link } from 'react-router-dom';

const ErrorView = () => {
  return (
    <section className='d-flex flex-column justify-content-center align-items-center '>
      <h1>Ocurrió un error!</h1>
      <p>Perdon, no encontramos esta página :(</p>
      <Link to={-1} className='btn btn-dark'>
        {'← Volver'}
      </Link>
    </section>
  );
};
export default ErrorView;
