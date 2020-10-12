import {useState, useEffect} from 'react'
import Nav from "../../../components/nav"
import withAdmin from "../../withAdmin"
import axios from "axios"
import {API} from "../../../config"
import {showSuccessMessage, showErrorMessage} from '../../../helpers/alerts'

const Create = ({user, token}) => {
    const [state, setState] = useState({
        name: '',
        content: '',
        error: '',
        success: '',
        formData: process.browser && new FormData(),
        buttonText: 'Create',
        imageUploadText: 'Upload Image',
    })

    const {name, content, error, success, formData, buttonText, imageUploadText} = state
    
    const handleChange = (name) => (e) => {
        const value = name == 'image' ? e.target.files[0] : e.target.value
        const imageName = name == 'image' ? e.target.files[0].name : imageUploadText
        formData.set(name, value)
        setState({
            ...state,
            [name]: value,
            error: '',
            success: '',
            imageUploadText: imageName
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setState({...state, buttonText: 'Creating'})
        // console.log(...formData)
        try {
            const response = await axios.post(`${API}/category`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('Category Create Response', response)
            setState({...state, name: '', content: '', formData: '', buttonText: 'Created', imageUploadText: 'Upload Image', success: response.data ? `${response.data.name} is created` : '', error: response.data.error ? response.data.error : ''})
        } catch(error) {
            console.log('Category Create Error', error)
            setState({...state, name: '', content: '', buttonText: 'Create', error: error.response.data.error})
        }
    }
    
    return (
        <div>
            <Nav></Nav>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-container">
                <div className="form-group">
                    <label className="form-group-label">Category</label>
                    <input type="text" className="form-group-input" onChange={handleChange('name')} value={name} required/>

                </div>
                <div className="form-group">
                    <label className="form-group-label">Content</label>
                    <textarea type="text" className="form-group-textarea" onChange={handleChange('content')} value={content} required/>
                </div>
                <div className="form-group">
                    <label className="form-group-label-file">
                        {imageUploadText}
                        <input type="file" className="form-group-file" onChange={handleChange('image')} accept="image/*" hidden/>
                    </label>
                </div>
                <div className="form-group">
                    <button className="form-group-button">{buttonText}</button>
                </div>
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                </div>
            </form>
        </div>
  )
}

export default withAdmin(Create)