import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import UserContext from '../context/UserContext'


const AuthOptions = () => {

    const { userData, setUserData } = useContext(UserContext)

    const history = useHistory()

    const register = () => {
        history.push('/register')
    }
    const login = () => {
        history.push('/login')
    }
    const logout = () => {
        setUserData({
            token:undefined,
            user:undefined
        });
        localStorage.setItem("x-auth-token", "")
    }

    return (

        <div>
            {
                userData.user ?
                    (<button onClick={logout}>Logout</button>) :
                    <>
                        <button onClick={register}>Register</button>
                        <button onClick={login}>Login</button>
                    </>

            }

        </div>
    )
}

export default AuthOptions
