import {useState, useEffect} from 'react'
import Nav from "../../../components/nav"
import withAdmin from "../../withAdmin"
import axios from "axios"
import {API} from "../../../config"
import {showSuccessMessage, showErrorMessage} from '../../../helpers/alerts'
import Resizer from 'react-image-file-resizer'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false, loading: () => <p>Loading ...</p>})
import 'react-quill/dist/quill.bubble.css'
import Router from "next/router"

const Update = ({user, oldCategory, token}) => {
    
    const [state, setState] = useState({
        name: oldCategory.name,
        image: '',
        imagePreview: oldCategory.image.url,
        error: '',
        success: '',
        buttonText: 'Update',
    })

    const [content, setContent] = useState(oldCategory.content)
    
    const {name, image, imagePreview, error, success, buttonText} = state

    const [imageUploadButtonName, setImageUploadButtonName] = useState(oldCategory.image.url)
    
    const handleChange = (name) => (e) => {
        setState({
            ...state,
            [name]: e.target.value,
            error: '',
            success: '',
        })
    }

    const handleContent = (e) => {
        setContent(e)
        setState({...state, success: '', error: '',})
    }

    const handleImage = (event) => {
        let fileInput = false
        if(event.target.files[0]) {
            fileInput = true
        }
        setImageUploadButtonName(event.target.files[0].name)
        if(fileInput) {
            Resizer.imageFileResizer(
                event.target.files[0],
                400,
                350,
                'JPEG',
                100,
                0,
                uri => {
                    // console.log(uri)
                    setState({...state, image: uri, success: '', error: '' })
                },
                'base64'
            );
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setState({...state, buttonText: 'Updating'})
        // console.log(image)
        try {
            const response = await axios.put(`${API}/category/${oldCategory.slug}`, {user, name, content, image}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('Category Update Response', response)
            setState({...state, name: response.data ? response.data.name : '', imagePreview: response.data.image.url, buttonText: 'Update', imageUploadText: 'Upload Image', success: response.data ? `${response.data.name} is updated` : '', error: response.data.error ? 'Cannot save category' : ''})
            setContent(response.data.content)
            setImageUploadButtonName(response.data.image.url)
            // Router.push(`/admin/category/read`)
        }catch(error) {
            console.log('Category Update Error', error)
            setState({...state, name: '', content: '', buttonText: 'Update', error: error.response.data.error ? error.response.data.error : 'Ooops something went wrong please contact support'})
        }
    }
    
    return (
        <div>
            <Nav></Nav>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-container">
                    <div className="form-group">
                        <label className="form-group-label heading-1">Update Category</label>
                        <input type="text" className="form-group-input" onChange={handleChange('name')} value={name} required/>

                    </div>
                    <div className="form-group">
                        <label className="form-group-label">Content</label>
                        {/* <textarea type="text" className="form-group-textarea" onChange={handleChange('content')} value={content} required/> */}
                        <ReactQuill 
                            value={content}
                            onChange={handleContent}
                            placeholder="Write something..."
                            className="form-group-react-quill"
                            theme="bubble"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-group-label-file">
                            {imageUploadButtonName}
                            <input type="file" className="form-group-file" onChange={handleImage} accept="image/*" hidden/>
                        </label>
                        
                    </div>
                    <div className="form-group">
                        <button className="form-group-button">{buttonText}</button>
                    </div>
                    {success && showSuccessMessage(success)}
                    {error && showErrorMessage(error)}
                </div>
                <img className="form-side" src={imagePreview} alt="image"/>
            </form>
        </div>
  )
}

Update.getInitialProps = async ({req, query, token}) => {
    const response = await axios.post(`${API}/category/${query.slug}`)
    return {oldCategory: response.data.category, token}
}

export default withAdmin(Update)