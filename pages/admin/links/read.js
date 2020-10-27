import {useState} from 'react'
import Nav from '../../../components/nav'
import axios from 'axios'
import {API} from '../../../config'
import withAdmin from '../../withAdmin'
import renderHTML from 'react-render-html'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroller'
import {getCookie} from '../../../helpers/auth'

const Links = ({links, totalLinks, linksLimit, linkSkip, token}) => {
    // console.log(token)

    const [allLinks, setAllLinks] = useState(links)
    const [limit, setLimit] = useState(linksLimit)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(totalLinks)
  
    const listOfLinks = () => 
        allLinks.map( (l, i) => (
            <div key={i} className="category-container">
                <div className="category-main">
                    <div className="category-main-link">
                        <a className="category-main-link-click" href={l.url} target="_blank">
                            <span className="category-main-link-click-title">{l.title}</span>
                            <span className="category-main-link-click-url">{l.url}</span>
                        </a>
                        <div className="category-main-link-side">
                            <span className="category-main-link-side-date">{moment(l.createdAt).fromNow()} by {l.postedBy.name}</span>
                            <span className="category-main-link-side-clicks">clicks {l.clicks}</span>
                        </div>
                        <span className="category-main-link-badge">{l.type} / {l.medium} {l.categories.map( (c, i) => (<span key={i} className="category-main-link-categories"> {c.name} </span>))}</span>
                    </div>
                </div>
                <div className="category-side">
                    <div className="category-side-popular">
                        {moment(l.createdAt).fromNow()}
                    </div>
                </div>
            </div>
        ))

    const loadMore = async () => {
        let toSkip = skip + limit
        const response = await axios.post(`${API}/links`, {skip, limit}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        setAllLinks([...allLinks, ...response.data])
        // console.log(allLinks)
        // console.log(response.data.links.length)
        setSize(response.data.length)
        setSkip(toSkip)
    }
    
    
  return (
    <div>
        <Nav></Nav>
        {listOfLinks()}
        <div className="category-container">
            <div className="category-main">
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={size > 0 && size >= limit}
                loader={
                    <img src="/images/loader.gif" alt="Loading"/>
                }
            >
            </InfiniteScroll>
            </div>
        </div>
    </div>
  )
}

Links.getInitialProps = async ({req}) => {
    let skip = 0
    let limit = 2
    const token = getCookie('token', req)
    const response = await axios.post(`${API}/links`, {skip, limit}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    // console.log(response)
    return {
        links: response.data,
        totalLinks: response.data.length,
        linksLimit: limit,
        linkSkip: skip
    }
}

export default withAdmin(Links)