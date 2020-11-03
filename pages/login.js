import {useState, useEffect} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Nav from '../components/nav';
import {showSuccessMessage, showErrorMessage} from '../helpers/alerts'
import axios from 'axios'
import {API} from '../config'
import {authenticate, isAuth} from '../helpers/auth'

function Login() {
    const [state, setState] = useState({
        email: 'j.fabricio.au@gmail.com',
        password: '123456',
        error: '',
        success: '',
        buttonText: 'Login',
    })

    const {email, password, error, success, buttonText} = state

    useEffect( () => {
        isAuth() && Router.push('/')
    }, [])

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
                isAuth() && isAuth().role == 'admin' ? Router.push('/admin') : Router.push('/user')
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
                <span>{JSON.stringify(isAuth())}</span>
                <form action="" className="login-form" autoComplete="off" onSubmit={handleSubmit}>
                    <input onChange={handleChange('email')} type="email" className="login-form-input" placeholder="email" autoComplete="new-email" value={email}/>
                    <input type="password" onChange={handleChange('password')} className="login-form-input" placeholder="password" autoComplete="new-password" value={password}/>
                    <button className="login-form-button">{buttonText}</button>
                </form>
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                <Link href="/auth/password/forgot"><a className="login-link">Forgot Password</a></Link>            
                </div>            
            </div>
        </div>
        )
}

export default Login