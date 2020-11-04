import React, { Component } from 'react';
import Link from 'next/link';
import {isAuth, logout} from '../helpers/auth'

class Nav extends Component {
    render () {
        return (
            <div className="nav">
                <div className="nav-logo"> &gt; Nestliinks</div>
                <ul className='nav-list'>
                    <li className="nav-list-item"><Link href="/">Home</Link></li>
                    {
                        !isAuth() && (
                            <React.Fragment>
                                <li className="nav-list-item"><Link href="/login">Login</Link></li>
                                <li className="nav-list-item"><Link href="/register">Register</Link></li>
                            </React.Fragment>
                        )
                    }
                </ul>
                <ul className="nav-list-right">
                    {
                        isAuth() && isAuth().role == 'admin' && (
                            <li className="nav-list-right-item"><Link href="/admin">
                                {isAuth().name && (<span>
                                {
                                    isAuth().name}, Dashboard</span>)
                                }
                            </Link></li>
                        )
                    }

                    {
                        isAuth() && isAuth().role == 'subscriber' && (
                        <li className="nav-list-right-item"><Link href="/user">
                            {isAuth().name && (<span>
                                {isAuth().name}, Account
                            </span>)}
                        </Link></li>
                        )
                    }

                    {
                        isAuth() && isAuth().role == 'subscriber' && (
                        <li className="nav-list-right-item"><Link href="/user/link/create">
                            Create Link
                        </Link></li>
                        )
                    }

                    {
                        isAuth() && (
                            <li className="nav-list-right-item nav-list-right-item-logout" onClick={logout}>Logout</li>
                        )
                    }
                </ul>
            </div>
        )
    }
}
export default Nav