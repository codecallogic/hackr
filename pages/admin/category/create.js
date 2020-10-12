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
        console.log(...formData)
    }
    
    return (
        <div>
            <Nav></Nav>
            <form onSubmit={handleSubmit} className="form">
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
            </form>
        </div>
  )
}

export default Create