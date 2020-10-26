import Nav from '../../components/nav'
import withUser from '../withUser'

function User({user, userLinks, token}) {
    return (
        <div>
            <Nav></Nav>
            {JSON.stringify(userLinks)}
        </div>
  )
}

export default withUser(User)