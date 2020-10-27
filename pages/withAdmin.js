import {API} from '../config'
import axios from 'axios'
import {getCookie} from '../helpers/auth'

const withAdmin = Page => {
    const WithAdminUser = props => <Page {...props} />
    WithAdminUser.getInitialProps = async context => {
        const token = getCookie('token', context.req)
        let user = null
        let userLinks = []
        if(token){
            try {
                const response = await axios.get(`${API}/admin`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        contentType: `application/json`
                    }
                })
                // console.log(response.data)
                user = response.data.user
                userLinks = response.data.links
            } catch(err){
                // console.log(err)
                if(err.response.status == 401){
                    user = null
                }
            }
        }

        if(user == null){
            context.res.writeHead(301, {
                Location: '/'
            });
            context.res.end();
            // console.log('Redirect')s
        }else{
            return {
                ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
                user,
                token,
                userLinks
            }
        }
    }

    return WithAdminUser
}

export default withAdmin