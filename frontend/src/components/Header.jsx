import React from 'react';
import wind from '../wind.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logUserOut } from '../reducers/TokenReducer';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const atLoginMenu = window.location.href.endsWith('login');
  const atRegisterMenu = window.location.href.endsWith('register');

  const handleMenuClick = (e) => {
    e.preventDefault();

    const aTags = document.querySelectorAll('.menu-item');
    for (const tag of aTags) {
      if (tag.classList.contains('hidden')) {
        tag.classList.remove('hidden');
      } else {
        tag.classList.add('hidden');
      }
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await axios.post('/api/users/logout', token);
    localStorage.removeItem('jwt');
    dispatch(logUserOut());
    navigate('/login');
  };

  const handleLogoClick = () => {
    if (!token.isValid) {
      navigate('/login');
    } else {
      navigate('/tickets');
    }
  };

  return (
    <>
      <nav className='fixed top-0 left-0 right-0 flex items-center justify-between flex-wrap bg-blue-700 p-6 font-mono'>
        <div
          className='logo flex items-center flex-shrink-0 text-white mr-6'
          onClick={handleLogoClick}>
          <img
            src={wind}
            alt=''
            className='inline-block mr-1'
            width='24'
          />
          <span className='font-semibold text-xl tracking-tight hover:text-blue-200 hover:border-b'>
            DevFlowPro
          </span>
        </div>
        <div
          id='menu-toggle'
          className='block sm:hidden'>
          <button
            className='flex items-center px-3 py-2 border rounded text-blue-100 border-blue-400 hover:text-white hover:border-white'
            onClick={handleMenuClick}>
            <svg
              className='fill-current h-5 w-5'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <title>Menu</title>
              <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
            </svg>
          </button>
        </div>
        <div
          id='menu-items'
          className='w-full inline-block flex-grow sm:items-center sm:w-auto sm:flex sm:justify-end'>
          <div className='text-sm sm:flex-grow'>
            <Link
              to='/tickets'
              className='hidden menu-item mt-4 sm:inline-block sm:mt-0 text-white hover:text-blue-200 mr-4 hover:border-b'>
              Tickets
            </Link>
            <Link
              to='/admin'
              className='hidden menu-item mt-4 sm:inline-block sm:mt-0 text-white hover:text-blue-200 mr-4 hover:border-b'>
              Admin
            </Link>
            <Link
              to='/api/help'
              className='hidden menu-item mt-4 sm:inline-block sm:mt-0 text-white hover:text-blue-200 hover:border-b'>
              API
            </Link>
          </div>
          <div>
            {token.isValid && (
              <Link
                to='/login'
                className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 md:mt-0'
                onClick={handleLogout}>
                Logout
              </Link>
            )}
            {!token.isValid && atLoginMenu && (
              <Link
                to='/register'
                className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 md:mt-0'>
                Register
              </Link>
            )}
            {!token.isValid && atRegisterMenu && (
              <Link
                to='/login'
                className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 md:mt-0'>
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
