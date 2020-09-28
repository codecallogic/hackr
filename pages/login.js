import {useState} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Nav from '../components/nav';
import {showSuccessMessage, showErrorMessage} from '../helpers/alerts'
import axios from 'axios'
import {API} from '../config'
import {authenticate} from '../helpers/auth'

function Login() {
    const [state, setState] = useState({
        email: 'contact@fabricioguardia.com',
        password: '123456',
        error: '',
        success: '',
        buttonText: 'Login',
    })

    const {email, password, error, success, buttonText} = state

    const handleChange = (name) => (e) => {
        setState({
            ...state,
            [name]: e.target.value,
            error: '',
            success: '',
            buttonText: 'Login',
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState({...state, buttonText: 'Loggin in'})
        try {
            const response = await axios.post(`${API}/login`, {
                email, 
                password
            })
            authenticate(response, () => {
                Router.push('/')
            })
        } catch (err) {
            console.log(err)
            setState({...state, buttonText: 'Login', error: err.response.data.error})
        }
    }
    
    return (
        <div>
            <Nav></Nav>
            <div className="login">
                <div className="login-container">
                <h1 className="login-heading">Login</h1>
                <form action="" className="login-form" autoComplete="off" onSubmit={handleSubmit}>
                    <input onChange={handleChange('email')} type="email" className="login-form-input" placeholder="email" autoComplete="new-email" value={email}/>
                    <input type="password" onChange={handleChange('password')} className="login-form-input" placeholder="password" autoComplete="new-password" value={password}/>
                    <button className="login-form-button">{buttonText}</button>
                </form>
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                </div>              
            </div>
        </div>
        )
}

export default Login