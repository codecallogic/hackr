import Nav from '../../components/nav'
import axios from 'axios'
import {API} from '../../config'
import withUser from '../withUser'
import Link from 'next/link'
import {withRouter} from 'next/router'

const Links = ({query, category, links, totalLinks, linksLimiti}) => {
  
  return (
    <div>
        <Nav></Nav>
        {/* {JSON.stringify(category)} */}
        {JSON.stringify(links)}
    </div>
  )
}

Links.getInitialProps = async ({query, req}) => {
    let skip = 0
    let limit = 2
    const response = await axios.post(`${API}/category/${query.slug}`, {skip, limit})
    return {
        query,
        category: response.data.category,
        links: response.data.links,
        totalLinks: response.data.links.lenght,
        linksLimit: limit
    }
}

export default Links
