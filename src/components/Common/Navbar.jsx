import { Link, NavLink, useNavigate } from 'react-router-dom';

import { useSession } from '../../stores/useSession';

import Swal from 'sweetalert2';
import { toast } from 'sonner';

const Navbar = () => {
  const { isLoggedIn, logout, user } = useSession();

  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Atención',
      text: 'Estás por cerrar tu sesión',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, salir',
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed) {
        toast.success('Sesión cerrada exitosamente. Hasta luego!');
        logout();
        navigate('/');
      }
    });
  };

  return (
    <header>
      <nav className='navbar navbar-expand-lg bg-body-tertiary fixed-top'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            La cocinita de Eze
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarLaCocinita'
            aria-controls='navbarLaCocinita'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarLaCocinita'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <NavLink
                  className={`nav-link ${({ isActive }) =>
                    isActive ? 'active' : ''}`}
                  aria-current='page'
                  to='/'
                >
                  Inicio
                </NavLink>
              </li>
              {!isLoggedIn && (
                <li className='nav-item'>
                  <NavLink
                    className={`nav-link ${({ isActive }) =>
                      isActive ? 'active' : ''}`}
                    to='/login'
                  >
                    Login
                  </NavLink>
                </li>
              )}
              {user?.isAdmin && (
                <li className='nav-item'>
                  <NavLink
                    className={`nav-link ${({ isActive }) =>
                      isActive ? 'active' : ''}`}
                    to='/admin'
                  >
                    Admin
                  </NavLink>
                </li>
              )}
            </ul>
            {isLoggedIn && (
              <button
                className='btn btn-danger'
                type='button'
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
