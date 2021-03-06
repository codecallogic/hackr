import Nav from '../../components/nav'
import withAdmin from '../withAdmin'
import Link from 'next/link'

function Admin({user}) {
    return (
        <div>
            <Nav></Nav>
            <div className="dashboard-container">
                <span className="dashboard-typography heading-1">Admin Dashboard</span>
                <div className="dashboard-container-controls">
                    <Link href="/admin/category/read">All Categories</Link>
                    <Link href="/admin/links/read">All Links</Link>
                    <Link href="/admin/category/create">Create Category</Link>
                    <Link href="/user/profile/update">Update Profile</Link>
                </div>
            </div>
        </div>
  )
}

export default withAdmin(Admin)