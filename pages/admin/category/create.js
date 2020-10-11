import {useState, useEffect} from 'react'
import Nav from "../../../components/nav"
import withAdmin from "../../withAdmin"
import axios from "axios"
import API from "../../../config"
import {showSuccessMessage, showErrorMessage} from '../../../helpers/alerts'

function Create() {
    const [state, setState] = useState({
        name: '',
        content: '',
        error: '',
        suscess: '',
        formData: process.browser && new FormData(),
        buttonText: 'Create',
        imageUploadText: 'Upload Image',
    })

    const {name, content, error, success, formData, buttonText, imageUploadText} = state
    
    const handleChange = (name) => (e) => {
        setState({
            ...state,
            [name]: e.target.value,
            error: '',
            success: '',
        })
    }
    
    return (
        <div>
            <Nav></Nav>
            Hello 
        </div>
  )
}

export default Create