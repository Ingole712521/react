
import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    console.log(isAuthenticated)

    if (isLoading) {
        return <p>Loading .......</p>

    }

    if (!isAuthenticated) {
        return <Navigate to={"/"} replace />;

    }


    return <Outlet />;


};

export default ProtectedRoute