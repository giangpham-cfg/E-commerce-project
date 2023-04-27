import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import CheckoutPage from './pages/checkout';
import BookPage from './pages/book';
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import RegisterPage from './pages/register';
import { callFetchAccount } from './service/api';
import { useDispatch, useSelector } from 'react-redux';
import { doGetAccountAction } from './redux/account/accountSlice';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import AdminPage from './pages/admin';
import ProtectedRoute from './components/ProtectedRoute';


const Layout = () => {
  return (
    <div className='layout-app'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

const LayoutAdmin = () => {
  const isAminRoute = window.location.pathname.startsWith('/admin');
  const user = useSelector(state => state.account.user);
  const userRole = user.role;

  return (
    <div className='layout-app'>
      {isAminRoute && userRole === 'ADMIN' && <Header />}
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
      {isAminRoute && userRole === 'ADMIN' && <Footer />}
    </div>
  )
}

export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);

  const getAccount = async () => {
    if (window.location.pathname === '/login'
      || window.location.pathname === '/register'
      || window.location.pathname === '/'
    ) return;
    const res = await callFetchAccount();
    console.log("check res", res)
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data))
    }
  }
  useEffect(() => {
    getAccount()
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,

      children: [
        { index: true, element: <Home /> },
        {
          path: "checkout",
          element: <CheckoutPage />,
        },
        {
          path: "book",
          element: <BookPage />,
        },
      ],
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,

      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
        },
        // {
        //   path: "user",
        //   element: <CheckoutPage />,
        // },
        // {
        //   path: "book",
        //   element: <BookPage />,
        // },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);


  return (
    <>
      {isAuthenticated === true
        || window.location.pathname === '/login'
        || window.location.pathname === '/register'
        ?
        <RouterProvider router={router} />
        :
        <Loading />
      }
    </>
  )
}

