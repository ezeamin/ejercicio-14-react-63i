import { Link, NavLink } from 'react-router-dom';

import Swal from 'sweetalert2';
import { toast } from 'sonner';

import { useSession } from '../../stores/useSession';

const Navbar = () => {
  const { user, isLoggedIn, logout } = useSession();

  const isAdmin = isLoggedIn && user?.isAdmin;

  // HANDLERS --------------------------------------------------

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, cerrar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        toast.success('Hasta luego!');
      }
    });
  };

  // RENDER ----------------------------------------------------

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
              {isLoggedIn && isAdmin && (
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
              <button className='btn btn-danger' onClick={handleLogout}>
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
