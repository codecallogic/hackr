import React, { Component, useState } from 'react';
import Nav from '../components/nav'

function Register() {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: '', 
        buttonText: 'Register'
    })

    const {name, email, password, error, success, buttonText} = state

    const handleChange = (name) => (e) => {
        setState({...state, [name]: e.target.value, error: '', success: '', buttonText: 'Register'})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.table({ name, email, password})
    }

    return (
        <div>
            <Nav></Nav>
            <div className="registration">
                <h1 className="registration-heading">Register</h1>
                <form action="" className="registration-form" onSubmit={handleSubmit}>
                    <input onChange={handleChange('name')} type="text" className="registration-form-input" placeholder="name" autoComplete="new-name" value={name}/>
                    <input onChange={handleChange('email')} type="email" className="registration-form-input" placeholder="email" autoComplete="new-email" value={email}/>
                    <input type="password" onChange={handleChange('password')} className="registration-form-input" placeholder="password" autoComplete="new-password" value={password}/>
                    <button className="registration-form-button">{buttonText}</button>
                </form>                
            </div>
        </div>
    )
}

export default Register