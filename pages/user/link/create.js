import {useState, useEffect} from 'react'
import axios from 'axios'
import {API} from '../../../config'
import {showSuccessMessage, showErrorMessage} from '../../../helpers/alerts'
import Nav from '../../../components/nav'


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
    })

    const {title, url, categories, loadedCategories, success, error, type, medium} = state

    useEffect( () => {
        loadCategories()
    }, [success])

    const loadCategories = async () => {
        const response = await axios.get(`${API}/categories`)
        setState({...state, loadedCategories: response.data})
    }
  
    return (
        <div>
            <Nav></Nav>
            {JSON.stringify(loadedCategories)}
        </div>
    )
}

export default Link
