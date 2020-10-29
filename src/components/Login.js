import Axios from 'axios'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'
import ErrorNotice from './errorHandler/ErrorNotice'

const Login = () => {

    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()

    const { setUserData } = useContext(UserContext)

    const login = async (e) => {
        e.preventDefault()
        try {
            const userData = { email, password }

            const userLogin = await Axios.post('http://localhost:8080/api/users/login', userData)

            setUserData({
                id: userLogin.data.token,
                user: userLogin.data.user.username
            })

            localStorage.setItem("x-auth-token", userLogin.data.token)

            history.push('/')
        }
        catch (err) {
            err.response.data.message && setError(err.response.data.message)
        }


    }

    return (
        <div>
            <h2>LOGIN</h2>
            {error && <ErrorNotice message={error} clearError={()=> setError(undefined)} />}
            <form className='register-form'>
                <input className='register-input' placeholder='email' onChange={(e) => setEmail(e.target.value)}></input>
                <input className='register-input' placeholder='password' onChange={(e) => setPassword(e.target.value)}></input>
                <button className='submit-button' onClick={login}>LOGIN</button>
            </form>
        </div>
    )
}

export default Login
