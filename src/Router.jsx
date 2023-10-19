import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AdminView from './views/AdminView';
import DetailView from './views/DetailView';
import ErrorView from './views/ErrorView';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';

import Footer from './components/Common/Footer';
import Navbar from './components/Common/Navbar';

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className='container py-5'>
        <Routes>
          <Route path='/' element={<HomeView />} />
          <Route path='/detalle' element={<DetailView />} />
          <Route path='/login' element={<LoginView />} />
          <Route path='/register' element={<RegisterView />} />
          <Route path='/admin' element={<AdminView />} />
          <Route path='*' element={<ErrorView />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
