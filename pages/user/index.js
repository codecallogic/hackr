import {useEffect, useState} from 'react'
import Nav from '../../components/nav'
import withUser from '../withUser'
import Link from 'next/link'
import moment from 'moment'

const User = ({user, userLinks, token}) => {
    console.log(userLinks)
    const listOfLinks = () => (
        userLinks.map( (l, i) => (
            <div key={i} className="dashboard-links-list">
                <a className="dashboard-links-list-link" href={l.url}>
                    <div className="heading-6">{l.title}</div>
                    <div className="sub-heading-url">{l.url}</div>
                </a>
                <div className="dashboard-links-list-moment">
                    <span>{moment(l.createdAt).fromNow()} by {l.postedBy.name} </span>
                </div>
            </div>
        ))
    )
    
    return (
        <div>
            <Nav></Nav>
            <div className="dashboard-container">
                <div className="heading-2">{user.name}'s Dashboard</div> 
                <div className="dashboard-col-2">
                    <div className="dashboard-controls">
                        <Link href="/user/link/create">Submit Link</Link>
                        <a href="/user/profile/update">Update Profile</a>
                    </div>
                    <div className="dashboard-links">
                        <div className="heading-4">Your Links</div>
                        {listOfLinks()}
                    </div>
                </div>   
            </div>
        </div>
  )
}

export default withUser(User)