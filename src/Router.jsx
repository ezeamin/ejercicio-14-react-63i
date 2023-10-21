import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { useSession } from './stores/useSession';

import AdminView from './views/AdminView';
import DetailView from './views/DetailView';
import ErrorView from './views/ErrorView';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';

import Footer from './components/Common/Footer';
import Navbar from './components/Common/Navbar';

const Router = () => {
  const { user, isLoggedIn } = useSession();

  return (
    <BrowserRouter>
      <Navbar />
      <main className='container py-5'>
        <Routes>
          <Route path='/' element={<HomeView />} />
          <Route path='/detail/:id' element={<DetailView />} />
          <Route
            path='/login'
            element={isLoggedIn ? <Navigate to='/' /> : <LoginView />}
          />
          <Route
            path='/register'
            element={isLoggedIn ? <Navigate to='/' /> : <RegisterView />}
          />
          <Route
            path='/admin'
            element={user?.isAdmin ? <AdminView /> : <Navigate to='/' />}
          />
          <Route path='*' element={<ErrorView />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
