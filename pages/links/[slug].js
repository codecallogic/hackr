import {useState} from 'react'
import Nav from '../../components/nav'
import axios from 'axios'
import {API} from '../../config'
import withUser from '../withUser'
import renderHTML from 'react-render-html'
import moment from 'moment'

const Links = ({query, category, links, totalLinks, linksLimit}) => {
    console.log(links)
    const [allLinks, setAllLinks] = useState(links)
  
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
                        <span className="category-main-link-badge">{l.type} / {l.medium} {l.categories.map( (c, i) => (<span className="category-main-link-categories"> {c.name} </span>))}</span>
                    </div>
                </div>
                <div className="category-side">
                    <div className="category-side-popular">
                        {moment(l.createdAt).fromNow()}
                    </div>
                </div>
            </div>
        ))
    
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
