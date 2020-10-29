import Axios from 'axios';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext'
import ErrorNotice from './errorHandler/ErrorNotice';

const Register = () => {

    const history =  useHistory()

    const { setUserData } = useContext(UserContext)

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const[error, setError] =useState('')

    const submit = async (e) => {
        e.preventDefault()
        try {
            const userDetails = { email, username, password, confirmPassword }
            await Axios.post('http://localhost:8080/api/users/register', userDetails)
            const loginDetails = { email, password }
            const loginRes = await Axios.post('http://localhost:8080/api/users/login', loginDetails)
            console.log(loginRes)

            setUserData({
                id: loginRes.data.token,
                user: loginRes.data.user.username
            })
            localStorage.setItem("x-auth-token", loginRes.data.token)
            history.push('/')
        }
        catch (err) {
            err.response.data.message && setError(err.response.data.message);

        }

    }





    return (
        <div className='register'>
            <h2>REGISTER USER</h2>
            {error && <ErrorNotice message={error}  clearError={() => setError(undefined)}/>}
            <form className='register-form'>
                <input className='register-input' type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)}></input>
                <input className='register-input' type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)}></input>
                <input className='register-input' type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}></input>
                <input className='register-input' type='password' placeholder='confirm password' onChange={(e) => setConfirmPassword(e.target.value)}></input>
                <button className='submit-button' onClick={submit}>SUBMIT</button>
            </form>
        </div>
    )
}

export default Register
