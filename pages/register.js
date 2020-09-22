import React, { Component, useState } from 'react';
import Nav from '../components/nav'
import axios from 'axios'

function Register() {
    const [state, setState] = useState({
        name: 'Jose',
        email: 'jfguardiacp@gmail.com',
        password: 'aaaaaa',
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
        setState({...state, buttonText: 'Registering'})
        axios.post('http://localhost:3001/api/register', {
            name, 
            email, 
            password
        })
        .then(response => {
            setState({
                ...state,
                name: '',
                email: '',
                password: '',
                error: '',
                success: response.data.message, 
                buttonText: 'Submitted'
            })
        })
        .catch(error => {
            setState({...state, buttonText: 'Register', error: error.response.data.error})
        })
    }

    return (
        <div>
            <Nav></Nav>
            <div className="registration">
                <h1 className="registration-heading">Register</h1>
                {success && success}
                {error && error}
                <form action="" className="registration-form" onSubmit={handleSubmit} autoComplete="off">
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