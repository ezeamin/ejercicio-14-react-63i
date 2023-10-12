import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomeView from './views/HomeView';
import DetailView from './views/DetailView';
import LoginView from './views/LoginView';
import AdminView from './views/AdminView';
import ErrorView from './views/ErrorView';

import Footer from './components/Common/Footer';
import Navbar from './components/Common/Navbar';

import './App.css';

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<HomeView />} />
          <Route path='/detalle' element={<DetailView />} />
          <Route path='/login' element={<LoginView />} />
          <Route path='/admin' element={<AdminView />} />
          <Route path='*' element={<ErrorView />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
