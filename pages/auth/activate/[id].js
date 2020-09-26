import {useState, useEffect} from 'react'
import JWT from 'jsonwebtoken'
import axios from 'axios'
import {showSuccessMessage, showErrorMessage} from '../../../helpers/alerts'
import {API} from '../../../config'
import { withRouter } from 'next/router'

const ActivateAccount = ({router}) => {
    const [state, setState] = useState({
        name: '',
        token: '',
        buttonText: 'Activate Account',
        success: '',
        error: '',

    })

    const { name, token, buttonText, success, error} = state

    useEffect(() => {
        let token = router.query.id
        if(token) {
            const {name} =  JWT.decode(token)
            setState({...state, name, token})
        }
    }, [router])

    const clickSubmit = async (e) => {
        e.preventDefault()
        setState({...state, buttonText: 'Activating'})
        try {
            const response = await axios.post(`api/register/activate`, {token})
            console.log(response)
            setState({...state, name: '', token: '', buttonText: 'Activated', success: response.date.success})
        } catch (err) {
            setState({...state, buttonText: 'Activate Account', error: err.response.data.error})
        }
    }
    
    return (
    
    <div className="activation">
        <div className="activation-container">
            <h1 className="activation-heading">Hi {name}! Ready to activate your account</h1>
            {success && showSuccessMessage}
            {error && showErrorMessage}
            <button className="activation-button" onClick={clickSubmit} >{buttonText}</button>
        </div>
    </div>

    )
}

export default withRouter(ActivateAccount)