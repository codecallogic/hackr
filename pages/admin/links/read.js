import {useState} from 'react'
import Nav from '../../../components/nav'
import axios from 'axios'
import {API} from '../../../config'
import withAdmin from '../../withAdmin'
import renderHTML from 'react-render-html'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroller'
import {getCookie} from '../../../helpers/auth'
import Link from 'next/link'

const Links = ({links, totalLinks, linksLimit, linkSkip, token}) => {
    // console.log(totalLinks)
    const [state, setState] = useState({
        modal: false,
        id: null
    })
    const [allLinks, setAllLinks] = useState(links)
    const [limit, setLimit] = useState(linksLimit)
    const [skip, setSkip] = useState(linkSkip)
    const [size, setSize] = useState(totalLinks)

    const {modal, id} = state
  
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
                        <div className="category-main-link-sub-container">
                            <span className="category-main-link-badge">{l.type} / {l.medium} 
                                {l.categories.map( (c, i) => (<span key={i} className="category-main-link-categories"> {c.slug} </span>))}
                                <button name='modal' onClick={ (e) => confirmDelete(e, l._id)}className="category-main-link-delete">
                                    Delete
                                </button> 
                                <Link href={`/user/link/${l._id}`}>
                                    <button className="category-main-link-update">Update</button>
                                </Link>
                            </span>
                        </div>
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
        const response = await axios.post(`${API}/links`, {skip: toSkip, limit}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        setSize(response.data.length < limit ? 0 : response.data.length)
        setAllLinks([...allLinks, ...response.data])
        setSkip(toSkip)
    }

    const toggle = (e) => {
        setState({...state, [e.target.name]: !modal})
    }

    const confirmDelete = (e, id) => {
        e.preventDefault()
        setState({...state, [e.target.name]: !modal, id: id})
    }

    const displayModal = () => (
        <div className="modal">
            <div className="modal-content">
                <button name='modal' className="modal-content-close" onClick={toggle}>&times;</button>
                <div className="modal-content-title heading-4">
                    Are you sure you want to delete this category?
                </div>
                <div className="modal-content-controls">
                    <button className="button-confirm" name='delete' onClick={handleDelete}>Confirm</button>
                    <button className="button-cancel" name='cancel' onClick={handleDelete}>Cancel</button>
                </div>
            </div>
        </div>
    )
    
    const handleDelete = async (e) => {
        e.preventDefault()
        if(e.target.name == 'delete'){
            try {
                const response = await axios.delete(`${API}/link/admin/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(response)
                setState({...state, modal: false})
                process.browser && window.location.reload()
            } catch (error) {
                console.log('ERROR DELETING', error)
            }
        }else{
            setState({...state, modal: false})
        }
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
        {modal === true && displayModal()}
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