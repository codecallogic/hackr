import {useState, useEffect} from 'react'
import axios from 'axios'
import {API} from '../../../config'
import {showSuccessMessage, showErrorMessage} from '../../../helpers/alerts'
import Nav from '../../../components/nav'
import withUser from '../../withUser'


const Link = ({}) => {
    const [state, setState] = useState({
        title: '',
        url: '',
        categories: [],
        loadedCategories: [],
        success: '',
        error: '',
        type: '',
        medium: '',
        buttonText: 'Create'
    })

    const {title, url, categories, loadedCategories, success, error, type, medium, buttonText} = state

    useEffect( () => {
        loadCategories()
    }, [success])

    const loadCategories = async () => {
        const response = await axios.get(`${API}/categories`)
        setState({...state, loadedCategories: response.data})
    }

    const handleSubmit = async (e) => {
        console.log('POST TO SERVER')
    }

    const handleURLChange = (e) => {
        setState({...state, url: e.target.value, error: '', success: ''})
    }

    const handleTitleChange = (e) => {
        setState({...state, url: e.target.value, error: '', success: ''})
    }
  
    return (
        <div>
            <Nav></Nav>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-container">
                    <div className="form-group">
                        <label className="form-group-label">Title</label>
                        <input type="text" className="form-group-input" onChange={handleTitleChange} value={title} required/>
                    </div>
                    <div className="form-group">
                        <label className="form-group-label">URL</label>
                        <input type="url" className="form-group-input" onChange={handleURLChange} value={url} required/>
                    </div>
                    <div className="form-group">
                        <button className="form-group-button">{buttonText}</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default withUser(Link)
