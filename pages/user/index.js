import Nav from '../../components/nav'
import withUser from '../withUser'

function User({user, token}) {
    return (
        <div>
            <Nav></Nav>
            {JSON.stringify(user)}
        </div>
  )
}

export default withUser(User)