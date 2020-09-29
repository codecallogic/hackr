import Nav from '../../components/nav'
import axios from 'axios'
import {API} from '../../config'
import {getCookie} from '../../helpers/auth'

function User({user}) {
    return (
        <div>
            <Nav></Nav>
            {JSON.stringify(user)}
        </div>
  )
}

User.getInitialProps = async (context) => {
    const token = getCookie('token', context.req)
    try {
        const response = await axios.get(`${API}/user`, {
            headers: {
                authorization: `Bearer ${token}`,
                contentType: `application/json`
            }
        })
        return {user: response.data}
    } catch(err){
        if(err.response.status == 401){
            return {user: 'No user'}
        }
    }
}

export default User