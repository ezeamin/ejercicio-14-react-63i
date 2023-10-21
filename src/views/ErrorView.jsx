import { Link } from 'react-router-dom';

const ErrorView = () => {
  return (
    <>
      <h3 className='text-center mt-5'>Oh oh. No encontramos este recurso!</h3>
      <p className='text-center'>
        Por favor, revisa la URL o intenta nuevamente
      </p>
      <div className='text-center'>
        <Link to={-1} className='btn btn-dark mt-3'>
          Volver
        </Link>
      </div>
    </>
  );
};
export default ErrorView;
