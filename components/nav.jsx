import React, { Component } from 'react';
import Link from 'next/link';

class Nav extends Component {
    render () {
        return (
            <div className="nav">
                <div className="nav-logo"> &gt; hackr.io</div>
                <ul className='nav-list'>
                    <li className="nav-list-item"><Link href="/">Home</Link></li>
                    <li className="nav-list-item"><Link href="/login">Login</Link></li>
                    <li className="nav-list-item"><Link href="/register">Register</Link></li>
                </ul>
            </div>
        )
    }
}
export default Nav