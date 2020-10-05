import {useState, useEffect} from 'react'
import Nav from '../../../components/nav';
import axios from 'axios'
import {showSuccessMessage, showErrorMessage} from '../../../helpers/alerts'
import {API} from '../../../config'
import Router from 'next/router'

const ForgotPassword = () => {
    const [state, setState] = useState({
        email: '',
        buttonText: 'Reset Password',
        success: '',
        error: '',

    })

    const { email, buttonText, success, error} = state

    const handleChange = e => {
        setState({...state, email: e.target.value})
    }

    const handleSubtmit = async (e) => {
        e.preventDefault()
        console.log('Post email to', email)

        try {
            const response = await axios.put(`${API}/forgot-password`, {email})
            setState({...state, email: '', buttonText: response.data.error ? 'Reset password': 'Please check your email..', error: response.data.error ? response.data.error : '', success: response.data.success ? response.data.success : ''})
            console.log(response)
        } catch (error) {
            console.log('Forgot password error', error)
            setState({
                ...state, buttonText: 'Reset Password', error: error.response.data.error
            })
        }
    }

    return (
        <div>
        <Nav></Nav>
        <div className="form">
            <div className="form-container">
                <h1 className="form-heading">Forgot Password</h1>
                <form className="form-elements" onSubmit={handleSubtmit}>
                    <input className="form-elements-input" type="email" value={email} onChange={handleChange} placeholder="Type in your email"/>
                    <button className="form-elements-button">{buttonText}</button>
                </form>
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
            </div>
        </div>
        </div>
    )
}

export default ForgotPassword