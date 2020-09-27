import React, { Component, useState } from 'react';
import Nav from '../components/nav'
import {showSuccessMessage, showErrorMessage} from '../helpers/alerts'
import axios from 'axios'
import {API} from '../config'

function Register() {
    const [state, setState] = useState({
        name: 'Jose',
        email: 'contact@fabricioguardia.com',
        password: 'aaaaaa',
        error: '',
        success: '', 
        buttonText: 'Register'
    })

    const {name, email, password, error, success, buttonText} = state

    const handleChange = (name) => (e) => {
        setState({...state, [name]: e.target.value, error: '', success: '', buttonText: 'Register'})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState({...state, buttonText: 'Registering'})
        try {
            const response = await axios.post(`${API}/register`, {
                name, 
                email, 
                password
            })
            console.log(response)
            setState({
                ...state,
                name: '',
                email: '',
                password: '',
                error: response.data.error ? response.data.error : '',
                success: response.data.success ? response.data.success : '', 
                buttonText: response.data.error ? 'Register' : 'Submitted',
            },
            )
        } catch (err) {
            setState({...state, buttonText: 'Register', error: err.response.data.error})
        }
    }

    return (
        <div>
            <Nav></Nav>
            <div className="registration">
                <div className="registration-container">
                <h1 className="registration-heading">Register</h1>
                <form action="" className="registration-form" onSubmit={handleSubmit} autoComplete="off">
                    <input onChange={handleChange('name')} type="text" className="registration-form-input" placeholder="name" autoComplete="new-name" value={name}/>
                    <input onChange={handleChange('email')} type="email" className="registration-form-input" placeholder="email" autoComplete="new-email" value={email}/>
                    <input type="password" onChange={handleChange('password')} className="registration-form-input" placeholder="password" autoComplete="new-password" value={password}/>
                    <button className="registration-form-button">{buttonText}</button>
                </form>
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                </div>              
            </div>
        </div>
    )
}

export default Register