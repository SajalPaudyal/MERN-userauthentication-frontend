import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'


const Home = () => {

    const history = useHistory()

    const {userData} = useContext(UserContext)

    useEffect(() =>{
        if(!userData.user)
        history.push('/login'); 
    }, [userData,history])

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home
