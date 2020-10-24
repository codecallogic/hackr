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
    })

    const {error, success, categories} = state

    useEffect( () => {
        loadCategories()
    }, [])

    const loadCategories = async () => {
        const response = await axios.get(`${API}/categories`)
        setState({...state, categories: response.data})
    }

    const confirmDelete = (slug) => {
        console.log(slug)
    }

    const listCategories = () => (
        categories.map( (c, i) => (
            <Link key={c._id} href={`/links/${c.slug}`}>
                <div className="home-category">
                    <img src={c.image && c.image.url} className="home-category-image" alt={c.name}></img>
                    <div className="home-category-name">{c.name}</div>
                    <div className="home-category-controls">
                        <Link href={`/admin/category/${c.slug}`}>
                            <button className="home-category-controls-update dashboard-button">Update</button>
                        </Link>
            
                        <button onClick={ () => confirmDelete(c.slug)}className="home-category-controls-delete dashboard-button">Delete</button>
                        
                    </div>
                </div>
            </Link>
        ))
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
        </div>
    )
}

export default withAdmin(Read)
