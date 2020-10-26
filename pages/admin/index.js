import Nav from '../../components/nav'
import withAdmin from '../withAdmin'
import Link from 'next/link'

function Admin({user}) {
    return (
        <div>
            <Nav></Nav>
            <div className="dashboard-container">
                <span className="dashboard-typography heading-1">Admin Dashboard</span>
                <div className="dashboard-controls">
                    <Link href="/admin/category/read">All Categories</Link>
                    <a href="/admin/category/create">Create Category</a>
                </div>
            </div>
        </div>
  )
}

export default withAdmin(Admin)