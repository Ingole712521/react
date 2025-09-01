import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

const Logout = () => {
    const { user, loginWithRedirect } = useAuth0();
    console.log(user)

    return (
        <>
            <h1 className='text-center text-black align-top text-2xl'>
                Logout screen</h1>
            <button onClick={(e) => loginWithRedirect()}>
                redirect to login
            </button>
        </>




    )
}

export default Logout