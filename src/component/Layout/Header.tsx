import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();

    const handleLogout = () => {
        logout({
            logoutParams: { returnTo: window.location.origin },
        })
    }

    return (
        <div>
            <h1>this is header component</h1>
            {isAuthenticated && <h2>{user?.name || user?.family_name}</h2>}

            {isAuthenticated ? (
                <>
                    <nav>
                        <Link to="/next-form" style={{ marginRight: "10px" }}>Next Form</Link>
                        <Link to="/pratice">Practice</Link>
                    </nav>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <button onClick={() => loginWithRedirect()}>
                    Login
                </button>
            )}
        </div>
    )
}

export default Header
