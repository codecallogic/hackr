import {useState} from 'react'
import Nav from '../../components/nav'
import axios from 'axios'
import {API} from '../../config'
import withUser from '../withUser'
import renderHTML from 'react-render-html'
import moment from 'moment'

const Links = ({query, category, links, totalLinks, linksLimit, linkSkip}) => {
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
            const response = await axios.post(`${API}/category/${query.slug}`, {skip: toSkip, limit})
            setAllLinks([...allLinks, ...response.data.links])
            console.log(allLinks)
            console.log(response.data.links.length)
            setSize(response.data.links.length)
            setSkip(toSkip)
        }

        const loadmoreButton = () => {
            return (
                size > 0 && size >= limit && (
                    <div className="category-container">
                        <div className="category-main">
                            <button className="category-main-button" onClick={loadMore}>Load more</button>
                        </div>
                    </div>
                )
            )
        }
    
  return (
    <div>
        <Nav></Nav>
        <div className="category-container">
            <div className="category-main">
                <div className="category-main-name">{category.name} - URL/Links</div>
                <div className="category-main-content">
                    {renderHTML(category.content || '')}
                </div>
            </div>
            <div className="category-side">
                <img className="category-side-image" src={category.image.url} alt=""/>
            </div>
        </div>
        {listOfLinks()}
        {loadmoreButton()}
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
        totalLinks: response.data.links.length,
        linksLimit: limit,
        linkSkip: skip
    }
}

export default Links
