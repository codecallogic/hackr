import {useState, useEffect} from 'react'
import Nav from "../../../components/nav"
import withAdmin from "../../withAdmin"
import axios from "axios"
import {API} from "../../../config"
import {showSuccessMessage, showErrorMessage} from '../../../helpers/alerts'
import Link from 'next/link'

const Read = ({user, token}) => {
    const [state, setState] = useState({
        categories: [],
        error: '',
        success: '',
        modal: false,
        slug: null
    })

    const {error, success, categories, modal, slug} = state

    useEffect( () => {
        loadCategories()
    }, [])

    const loadCategories = async () => {
        const response = await axios.get(`${API}/categories`)
        setState({...state, categories: response.data, modal: false})
    }

    const confirmDelete = (e, slug) => {
        e.preventDefault()
        setState({...state, [e.target.name]: !modal, slug: slug})
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        if(e.target.name == 'delete'){
            try {
                const response = await axios.delete(`${API}/category/${slug}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(response)
                setState({...state, modal: false})
                loadCategories()
            } catch (error) {
                console.log('ERROR DELETING', error)
            }
        }else{
            setState({...state, modal: false})
        }
    }

    const listCategories = () => (
        categories.map( (c, i) => (
            <div key={c._id} className="home-category">
                <Link key={c._id} href={`/links/${c.slug}`}>
                <img src={c.image && c.image.url} className="home-category-image" alt={c.name}></img>
                </Link>
                <div className="home-category-name">{c.name}</div>
                <div className="home-category-controls">
                    <Link href={`/admin/category/${c.slug}`}>
                        <button className="home-category-controls-update dashboard-button">Update</button>
                    </Link>
        
                    <button name='modal' onClick={ (e) => confirmDelete(e, c.slug)}className="home-category-controls-delete dashboard-button">Delete</button>   
                </div>
            </div>
        ))
    )

    const toggle = (e) => {
        setState({...state, [e.target.name]: !modal})
    }

    const displayModal = () => (
        <div className="modal">
            <div className="modal-content">
                <button name='modal' className="modal-content-close" onClick={toggle}>&times;</button>
                <div className="modal-content-title heading-4">
                    Are you sure you want to delete this category?
                </div>
                <div className="modal-content-controls">
                    <button className="button-confirm" name='delete' onClick={handleDelete}>Confirm</button>
                    <button className="button-cancel" name='cancel' onClick={handleDelete}>Cancel</button>
                </div>
            </div>
        </div>
    )
    
    return (
        <div>
            <Nav/>
            <div className="dashboard-container">
                <div className="dashboard-typography heading-1">All Categories</div>
            </div>
            <div className="home-categories">
                {listCategories()}
            </div>
            {modal === true && displayModal()}
        </div>
    )
}

export default withAdmin(Read)
