import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
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
              <li className='nav-item'>
                <NavLink
                  className={`nav-link ${({ isActive }) =>
                    isActive ? 'active' : ''}`}
                  to='/login'
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
