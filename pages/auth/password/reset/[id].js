import {useState, useEffect} from 'react'
import Nav from '../../../../components/nav';
import axios from 'axios'
import {showSuccessMessage, showErrorMessage} from '../../../../helpers/alerts'
import {API} from '../../../../config'
import router, {withRouter} from 'next/router'
import jwt from 'jsonwebtoken'

const resetPassword = ({router}) => {
    const [state, setState] = useState({
        name: '',
        newPassword: '',
        token: '',
        success: '',
        error: '',
        buttonText: 'Reset password'
    })

    const { name, newPassword, token, success, error, buttonText} = state

    const handleChange = e => {
        setState({...state, newPassword: e.target.value, success: '', error: '', buttonText: 'Reset Password'})
    }

    useEffect(() =>  {
        console.log(router.query.id)
        const decoded = jwt.decode(router.query.id)
        if(decoded) setState({...state, name: decoded.name, token: router.query.id})
    }, [router])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setState({...state, buttonText: 'Sending'})
        try {
            const response = await axios.put(`${API}/reset-password`, { resetPasswordLink: token, newPassword})
            setState({...state, newPassword: '', buttonText: response.data.error ? 'Reset password': 'Complete', error: response.data.error ? response.data.error : '', success: response.data.success ? response.data.success : ''})
            console.log(response)
        } catch (error) {
            console.log('Reset Password', error)
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
                <h1 className="form-heading">Hi {name}, please type in your new password</h1>
                <form className="form-elements" onSubmit={handleSubmit}>
                    <input className="form-elements-input" type="password" value={newPassword} onChange={handleChange} placeholder="New Password"/>
                    <button className="form-elements-button">{buttonText}</button>
                </form>
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
            </div>
        </div>
        </div>
    )
}

export default withRouter(resetPassword)