import {useState, useEffect} from 'react'
import Nav from '../../components/nav'
import axios from 'axios'
import {API , APP_NAME} from '../../config'
import Head from 'next/head'
import renderHTML from 'react-render-html'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroller'

const Links = ({query, category, links, totalLinks, linksLimit, linkSkip}) => {
    const [allLinks, setAllLinks] = useState(links)
    const [limit, setLimit] = useState(linksLimit)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(totalLinks)
    const [trending, setTrending] = useState([])
    const stripHTML = data => data.replace(/<\/?[^>]+(>|$)/g, '');

    const head = () => (
        <Head>
            <title>{category.name} | {APP_NAME} </title>
            <meta name="description" content={stripHTML(category.content)}/>
            <meta property="og:title" content={category.name} />
            <meta property="og:description" content={stripHTML(category.content.substring(0, 160))} />
            <meta property="og:image" content={category.image.url} />
            <meta property="og:image:secure_url" content={category.image.url} />
        </Head>
    )

    useEffect(() => {
        loadTrending()
      }, [])

    const loadTrending = async () => {
        const response = await axios.get(`${API}/links/trending/${category.slug}`)
        // console.log(response.data)
        setTrending(response.data)
    }

    const handleClick = async (linkId) => {
        const response = await axios.put(`${API}/click-count`, {linkId})
        loadTrending()
    }

    const trendingLinks = () => 
        trending.map( (l, i) => (
            <div key={i} className="category-main-link">
                <a className="category-main-link-click" href={l.url} target="_blank" onClick={ () => handleClick(l._id)}>
                    <span className="category-main-link-click-title">{l.title}</span>
                    <span className="category-main-link-click-url">{l.url}</span>
                </a>
                <div className="category-main-link-side">
                    <span className="category-main-link-side-date">{moment(l.createdAt).fromNow()} by {l.postedBy.name}</span>
                    <span className="category-main-link-side-clicks">clicks {l.clicks}</span>
                </div>
                <span className="category-main-link-badge">{l.type} / {l.medium} {l.categories.map( (c, i) => (<span key={i} className="category-main-link-categories"> {c.name} </span>))}</span>
            </div>
        ))
  
    const listOfLinks = () => 
        allLinks.map( (l, i) => (
            <div key={i} className="category-main-link">
                <a className="category-main-link-click" href={l.url} target="_blank" onClick={ () => handleClick(t._id)}>
                    <span className="category-main-link-click-title">{l.title}</span>
                    <span className="category-main-link-click-url">{l.url}</span>
                </a>
                <div className="category-main-link-side">
                    <span className="category-main-link-side-date">{moment(l.createdAt).fromNow()} by {l.postedBy.name}</span>
                    <span className="category-main-link-side-clicks">clicks {l.clicks}</span>
                </div>
                <span className="category-main-link-badge">{l.type} / {l.medium} {l.categories.map( (c, i) => (<span key={i} className="category-main-link-categories"> {c.name} </span>))}</span>
            </div>
        ))

        const loadMore = async () => {
            // setTimeout( async function() {
            let toSkip = skip + limit
            const response = await axios.post(`${API}/category/${query.slug}`, {skip: toSkip, limit})
            setAllLinks([...allLinks, ...response.data.links])
            // console.log(allLinks)
            // console.log(response.data.links.length)
            setSize(response.data.links.length)
            setSkip(toSkip)
            // }, 200)
        }

        // const loadmoreButton = () => {
        //     return (
        //         size > 0 && size >= limit && (
        //             <div className="category-container">
        //                 <div className="category-main">
        //                     <button className="category-main-button" onClick={loadMore}>Load more</button>
        //                 </div>
        //             </div>
        //         )
        //     )
        // }
    
  return (
    <>
        {head()}
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
        <div className="category-container">
            <div className="category-main">
            {listOfLinks()}
            </div>
            <div className="category-side">
            {trendingLinks()}
            </div>
        </div>
        {/* {loadmoreButton()} */}
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
            <div className="category-side">                
            </div>
        </div>
    </>
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
