import {useState, useEffect} from 'react'
import axios from 'axios'
import {API} from '../../../config'
import {showSuccessMessage, showErrorMessage} from '../../../helpers/alerts'
import Nav from '../../../components/nav'
import withUser from '../../withUser'
import {getCookie, isAuth} from '../../../helpers/auth'
import Router from 'next/router'

const Link = ({user, token}) => {
    const [state, setState] = useState({
        title: '',
        url: '',
        categories: [],
        loadedCategories: null,
        success: '',
        error: '',
        type: 'free',
        medium: 'video',
        buttonText: 'Create',
        select: true,
    })

    const {title, url, categories, loadedCategories, success, error, type, medium, buttonText, select} = state

    useEffect( () => {
        loadCategories()
    }, [success])

    useEffect( () => {
        !isAuth() && Router.push('/login')
    }, [])

    const loadCategories = async () => {
        const response = await axios.get(`${API}/categories`)
        setState({...state, loadedCategories: response.data})
        // console.log(response)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.table({ title, url, categories, type, medium})
        if(categories.length == 0){
            setState({...state, select: false, error: 'Please select at least on category'})
            return
        }
        try {
            const response = await axios.post(`${API}/link`, {user, title, url, categories, type, medium}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setState({...state, title: '', url: '', success: 'Link is created', error: '', loadedCategories: null, categories: [], medium: 'video', type: 'free',})
            Router.push('/user')
            // console.log(response)
        } catch (error) {
            console.log('Error submitting form', error)
            setState({...state, error: error.response.data.error})
        }
    }

    const handleURLChange = (e) => {
        setState({...state, url: e.target.value, error: '', success: ''})
    }

    const handleTitleChange = (e) => {
        setState({...state, title: e.target.value, error: '', success: ''})
    }

    const handleChange = (e) => {
        // console.log(e.target.value)
        setState({...state, [e.target.name]: e.target.value})
    }

    const handleToggle = (c) => (e) => {
        // console.log(c)
        const clickedCategory = categories.indexOf(c)
        const all = [...categories]
        if(clickedCategory == -1){
            all.push(c)
        }else{
            all.splice(clickedCategory, 1)
        }

        setState({...state, categories: all, select: true, success: '', error: ''})
        // console.log('Categories', all)
    }

    const showCategories = () => {
        return <ul className="form-container list">
        {state.loadedCategories !== null && state.loadedCategories.map( (c, i) => (
            <li key={i} className="form-group">
                <input type="checkbox" id={i} className="form-group-radio-input" value={c.name} onChange={handleToggle(c._id)} required/>
                <label htmlFor={i} className="form-group-radio-label">
                    <span className="form-group-radio-button" style={{border: select === false ? '2px solid red' : ''}}></span>
                    {c.name}
                </label>
            </li>
        ))}
        </ul>
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
                    {state.loadedCategories !== null ? showCategories() : <p>Loading ...</p>}
                    <div className="link-container-select-category">
                        Type
                    </div>
                    <div className="form-container">
                        <div className="form-group">
                            <input type="radio" id="free" className="form-group-radio-input" name="type" value="Free" onChange={handleChange} checked={type == 'free'} value="free" required/>
                            <label htmlFor="free" className="form-group-radio-label">
                                <span className="form-group-radio-button"></span>
                                Free
                            </label>
                        </div>
                        <div className="form-group">
                            <input type="radio" id="paid" className="form-group-radio-input" name="type" value="Paid" onChange={handleChange} value="paid" required/>
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
                            <input type="radio" id="video" className="form-group-radio-input" name="medium" value="video" onChange={handleChange} checked={medium == 'video'}required/>
                            <label htmlFor="video" className="form-group-radio-label">
                                <span className="form-group-radio-button"></span>
                                Video
                            </label>
                        </div>
                        <div className="form-group">
                            <input type="radio" id="book" className="form-group-radio-input" name="medium" value="book" onChange={handleChange} required/>
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
                            {success && showSuccessMessage(success)}
                            {error && showErrorMessage(error)}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withUser(Link)
