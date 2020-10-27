import {useEffect, useState} from 'react'
import Nav from '../../components/nav'
import withUser from '../withUser'
import Link from 'next/link'
import moment from 'moment'
import Router from 'next/router'
import axios from 'axios'
import {API} from "../../config"
import {showSuccessMessage, showErrorMessage} from '../../helpers/alerts'

const User = ({user, userLinks, token}) => {
    // console.log(userLinks)
    const [state, setState] = useState({
        modal: false,
        id: null,
    })

    const {modal, id} = state
    
    const confirmDelete = (e, link) => {
        e.preventDefault()
        setState({...state, [e.target.name]: !modal, id: link})
    }
    
    const listOfLinks = () => (
        userLinks.map( (l, i) => (
            <div key={i} className="dashboard-links-list">
                <a className="dashboard-links-list-link" href={l.url} target="_blank">
                    <div className="heading-6">{l.title}</div>
                    <div className="sub-heading-url">{l.url}</div>
                </a>
                <div className="dashboard-links-list-moment">
                    <span>{moment(l.createdAt).fromNow()} by {l.postedBy.name} </span>
                </div>
                <div className="dashboard-links-content">
                    <span>{l.type} / {l.medium}</span>
                    {l.categories.map( (c, i) => (
                        <span key={i} className="dashboard-links-content-categories">{c.name}</span>
                    ))}
                    <span key={i} className="dashboard-links-content-clicks">{l.clicks} clicks</span>
                    <button name="modal" onClick={ (e) => confirmDelete(e, l._id)}className="dashboard-links-content button-delete-link">Delete</button>
                    <Link href={`/user/link/${l._id}`}className="dashboard-links-content button-update-link">Update</Link>
                </div>
            </div>
        ))
    )

    const toggle = (e) => {
        setState({...state, [e.target.name]: !modal})
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        if(e.target.name == 'delete'){
            try {
                const response = await axios.delete(`${API}/link/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(response)
                setState({...state, modal: false, link: null})
                Router.push('/user')
            } catch (error) {
                console.log('ERROR DELETING', error)
            }
        }else{
            setState({...state, modal: false})
        }
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
                    <button className="button-cancel" name='cancel'>Cancel</button>
                </div>
            </div>
        </div>
    )
    
    return (
        <div>
            <Nav></Nav>
            <div className="dashboard-container">
                <div className="heading-2">{user.name}'s Dashboard</div> 
                <div className="dashboard-col-2">
                    <div className="dashboard-container">
                        <div className="dashboard-container-controls">
                            <Link href="/user/link/create">Submit Link</Link>
                            <a href="/user/profile/update">Update Profile</a>
                        </div>
                    </div>
                    <div className="dashboard-links">
                        <div className="heading-4">Your Links</div>
                        {listOfLinks()}
                    </div>
                </div>   
            </div>
            {modal === true && displayModal()}
        </div>
  )
}

export default withUser(User)