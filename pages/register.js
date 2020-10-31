import React, {useState, useEffect } from 'react';
import Router from 'next/router'
import Nav from '../components/nav'
import {showSuccessMessage, showErrorMessage} from '../helpers/alerts'
import axios from 'axios'
import {API} from '../config'
import {isAuth} from '../helpers/auth'

function Register() {
    const [state, setState] = useState({
        name: 'Fab',
        email: 'j.fabricio.au@gmail.com',
        password: '123456',
        error: '',
        success: '', 
        buttonText: 'Register',
        loadedCategories: null,
        categories: [],
        select: true,
    })

    useEffect( () => {
        loadCategories()
    }, [])

    const loadCategories = async () => {
        const response = await axios.get(`${API}/categories`)
        setState({...state, loadedCategories: response.data})
        // console.log(response)
    }

    const {name, email, password, error, success, buttonText, loadedCategories, categories, select} = state

    useEffect( () => {
        isAuth() && Router.push('/')
    }, [])

    const handleChange = (name) => (e) => {
        setState({...state, [name]: e.target.value, error: '', success: '', buttonText: 'Register'})
    }

    const handleToggle = (c) => (e) => {
        // console.log(loadedCategories)
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
        {loadedCategories !== null && loadedCategories.map( (c, i) => (
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState({...state, buttonText: 'Registering'})
        try {
            const response = await axios.post(`${API}/register`, {
                name, 
                email, 
                password,
                categories
            })
            console.log(response)
            setState({
                ...state,
                name: '',
                email: '',
                password: '',
                error: response.data.error ? response.data.error : '',
                success: response.data.success ? response.data.success : '', 
                buttonText: response.data.error ? 'Register' : 'Submitted',
            },
            )
        } catch (err) {
            setState({...state, buttonText: 'Register', error: err.response.data.error})
        }
    }

    return (
        <div>
            <Nav></Nav>
            <div className="registration">
                <div className="registration-container">
                <h1 className="registration-heading">Register</h1>
                <form className="registration-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
                    <input onChange={handleChange('name')} type="text" className="registration-form-input" placeholder="name" autoComplete="new-name" value={name}/>
                    <input onChange={handleChange('email')} type="email" className="registration-form-input" placeholder="email" autoComplete="new-email" value={email}/>
                    <input type="password" onChange={handleChange('password')} className="registration-form-input" placeholder="password" autoComplete="new-password" value={password}/>
                    <div className="registration-link-container">
                        <div className="registration-link-container-select-category">
                            Category
                        </div>
                        {loadedCategories !== null ? showCategories() : <p>Loading ...</p>}
                    </div>
                    <button className="registration-form-button">{buttonText}</button>
                </form>
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                </div>              
            </div>
        </div>
    )
}

export default Register