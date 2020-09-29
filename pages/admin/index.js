import Nav from '../../components/nav'
import withAdmin from '../withAdmin'

function Admin({user}) {
    return (
        <div>
            <Nav></Nav>
            {JSON.stringify(user)}
        </div>
  )
}

export default withAdmin(Admin)