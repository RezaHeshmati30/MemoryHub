import { RouterProvider } from 'react-router-dom'
import router from './utils/router'
import { useEffect } from 'react';

function App() {
  // // Check if user is logged in
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const isHomePage = window.location.pathname === '/';

  //   if (!token && !isHomePage) {
  //     window.location.href = '/';
  //   }
  // }, []);

  return (
    <>
       <RouterProvider router={router}/>
    </>
  )
}

export default App