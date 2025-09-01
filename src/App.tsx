// import { useAuth0 } from '@auth0/auth0-react';
// import './App.css'
// import NextForm from './component/NextForm'
// import Pratice from './component/Pratice'

// function App() {
//   const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();

//   console.log(user);

//   const handleLogout = () => {
//     logout({
//       logoutParams: {
//         returnTo: window.location.origin,
//       },
//     });
//   };

//   return (
//     <>
//       {isAuthenticated ? (
//         <div>
//           <h1>I am logged in</h1>
//           <h2 className='mt-2 text-3xl '>{user?.name}</h2>
//           <button onClick={handleLogout}>Logout</button>
//           <NextForm />
//           <Pratice />
//         </div>
//       ) : (
//         <button onClick={() => loginWithRedirect()}>
//           Login with Redirect
//         </button>
//       )}
//     </>
//   );
// }

// export default App;


import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './component/Home.tsx/Home'
import NextForm from './component/NextForm'
import Practice from './component/Pratice'
import AppLayout from './component/ui/AppLayout'
import ProtectedRoute from './component/Route/ProtectedRoute'
import SingleMove from './component/SIngleMovie/SingleMove'
import { getProduct } from '../api/api'

const App = () => {



  const router = createBrowserRouter([

    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },

        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/next-form",
              element: <NextForm />
            },
            {
              path: "/pratice",
              element: <Practice />,
              loader: getProduct,
            },
            {
              path: "/pratice/:praticeId",
              element: <SingleMove />
            }
          ]
        }


      ]
    },


  ])

  return <RouterProvider router={router} />


}

export default App



