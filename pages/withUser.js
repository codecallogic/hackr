import {API} from '../config'
import axios from 'axios'
import {getCookie} from '../helpers/auth'
import Router from 'next/router'

const withUser = Page => {
    const WithAuthUser = props => <Page {...props} />
    WithAuthUser.getInitialProps = async (context)  => {
        const token = getCookie('token', context.req)
        let user = null
        let userLinks = []
        if(token){
            // console.log(token)
            try {
                const response = await axios.get(`${API}/user`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        contentType: `application/json`
                    }
                })
                // console.log(response.data)
                user = response.data.user
                userLinks = response.data.links
            } catch(err){
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
            // console.log('Redirect')
        }else{
            return {
                ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
                user,
                token,
                userLinks
            }
        }
    }

    return WithAuthUser
}

export default withUser