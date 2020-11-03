import React, {useState, useEffect } from 'react';
import Router from 'next/router'
import Nav from '../../../components/nav'
import {showSuccessMessage, showErrorMessage} from '../../../helpers/alerts'
import axios from 'axios'
import {API} from '../../../config'
import {isAuth} from '../../../helpers/auth'
import withUser from '../../withUser'

function Profile({user, token}) {
    console.log(user)
    const [state, setState] = useState({
        name: user.name,
        email: user.email,
        password: '',
        error: '',
        success: '', 
        buttonText: 'Update',
        loadedCategories: null,
        categories: user.categories,
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

    // useEffect( () => {
    //     isAuth() && Router.push('/')
    // }, [])

    const handleChange = (name) => (e) => {
        setState({...state, [name]: e.target.value, error: '', success: '', buttonText: 'Update'})
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
                <input type="checkbox" id={i} className="form-group-radio-input" value={c.name} onChange={handleToggle(c._id)} checked={categories.includes(c._id)} required/>
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
        setState({...state, buttonText: 'Updating...'})
        try {
            const response = await axios.put(`${API}/user`, {
                name,
                password,
                categories
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response)
            setState({
                ...state,
                error: response.data.error ? response.data.error : '',
                success: response.data.success ? response.data.success : '', 
                buttonText: response.data.error ? 'Update' : 'Profile Updated',
            },
            )
        } catch (err) {
            setState({...state, buttonText: 'Update', error: err.response.data.error})
        }
    }

    return (
        <div>
            <Nav></Nav>
            <div className="registration">
                <div className="registration-container">
                <h1 className="registration-heading">Update Profile</h1>
                <form className="registration-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
                    <input onChange={handleChange('name')} type="text" className="registration-form-input" placeholder="name" autoComplete="new-name" value={name}/>
                    <input onChange={handleChange('email')} type="email" className="registration-form-input" placeholder="email" autoComplete="new-email" value={email} disabled/>
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

export default withUser(Profile)