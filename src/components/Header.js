import React from 'react'
import { NavLink } from 'react-router-dom'
import AuthOptions from './AuthOptions'

const Header = () => {
    return (
        <div id='header'>
            <NavLink to='/'>
                <h1>Login and Register</h1>
            </NavLink>
            <AuthOptions/>

        </div>
    )
}

export default Header
