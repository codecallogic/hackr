import {useState} from 'react'
import Nav from '../../components/nav'
import axios from 'axios'

function User({todos}) {
    const [state, setState] = useState({
      
    })
    return (
        <div>
            <Nav></Nav>
            {JSON.stringify(todos)}
        </div>
  )
}

User.getInitialProps = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
    console.log(response)
    return {
        todos: response.data
    }
}

export default User