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
        // console.log(response)
    }

    const handleSubmit = async (e) => {
        console.log('POST TO SERVER')
    }

    const handleURLChange = (e) => {
        setState({...state, url: e.target.value, error: '', success: ''})
    }

    const handleTitleChange = (e) => {
        setState({...state, title: e.target.value, error: '', success: ''})
    }

    const handleChange = (e) => {
        console.log(e.target.value)
        setState({...state, [e.target.name]: e.target.value})
    }
  
    return (
        <div>
            <Nav></Nav>
            <div className="link-container">
                <div className="link-container-select">
                    <div className="heading-1">Submit a Link</div>
                    <div className="link-container-select-category">
                        Category
                    </div>
                    <div className="form-container">
                        {state.categories !== null && state.loadedCategories.map( (c, i) => (
                            <div key={i} className="form-group">
                                <input type="radio" id={i} className="form-group-radio-input" name="categories" value={c.name} onChange={handleChange} required/>
                                <label htmlFor={i} className="form-group-radio-label">
                                    <span className="form-group-radio-button"></span>
                                    {c.name}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="link-container-select-category">
                        Type
                    </div>
                    <div className="form-container">
                        <div className="form-group">
                            <input type="radio" id="free" className="form-group-radio-input" name="type" value="Free" onChange={handleChange} required/>
                            <label htmlFor="free" className="form-group-radio-label">
                                <span className="form-group-radio-button"></span>
                                Free
                            </label>
                        </div>
                        <div className="form-group">
                            <input type="radio" id="paid" className="form-group-radio-input" name="type" value="Paid" onChange={handleChange} required/>
                            <label htmlFor="paid" className="form-group-radio-label">
                                <span className="form-group-radio-button"></span>
                                Paid
                            </label>
                        </div>
                    </div>
                    <div className="link-container-select-category">
                        Medium
                    </div>
                    <div className="form-container">
                        <div className="form-group">
                            <input type="radio" id="video" className="form-group-radio-input" name="medium" value="Video" onChange={handleChange} required/>
                            <label htmlFor="video" className="form-group-radio-label">
                                <span className="form-group-radio-button"></span>
                                Video
                            </label>
                        </div>
                        <div className="form-group">
                            <input type="radio" id="book" className="form-group-radio-input" name="medium" value="Book" onChange={handleChange} required/>
                            <label htmlFor="book" className="form-group-radio-label">
                                <span className="form-group-radio-button"></span>
                                Book
                            </label>
                        </div>
                    </div>
                </div>
                <div className="link-container-form">
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
            </div>
        </div>
    )
}

export default Link
