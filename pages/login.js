import {useState} from 'react'
import Nav from '../components/nav';

function Login() {
    const [state, setState] = useState({
        email: 'contact@fabricioguardia.com',
        password: 'aaaaaa',
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
    
    return (
        <div>
            <Nav></Nav>
            <div className="login">
                <div className="login-container">
                <h1 className="login-heading">Login</h1>
                <form action="" className="login-form" autoComplete="off">
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