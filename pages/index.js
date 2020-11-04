import {useState, useEffect} from 'react'
import Nav from '../components/nav'
import axios from 'axios'
import {API} from '../config'
import Link from 'next/link'
import moment from 'moment'

const Home = ({categories}) => {
  
  const [trending, setTrending] = useState([])

  useEffect(() => {
    loadTrending()
  }, [])

  const loadTrending = async () => {
    const response = await axios.get(`${API}/links/trending`)
    // console.log(response.data)
    setTrending(response.data)
  }

  const handleClick = async (linkId) => {
    const response = await axios.put(`${API}/click-count`, {linkId})
    loadTrending()
  }

  const listOfLinks = () => (
    trending.map( (t, i) => (
      <div key={i} className="category-container">
          <div className="category-main">
              <div className="category-main-link">
                  <a className="category-main-link-click" href={t.url} target="_blank" onClick={ () => handleClick(t._id)}>
                      <span className="category-main-link-click-title">{t.title}</span>
                      <span className="category-main-link-click-url">{t.url}</span>
                  </a>
                  <div className="category-main-link-side">
                      <span className="category-main-link-side-date">{moment(t.createdAt).fromNow()} by {t.postedBy.name}</span>
                      <span className="category-main-link-side-clicks">clicks {t.clicks}</span>
                  </div>
                  <span className="category-main-link-badge">{t.type} / {t.medium}</span>
              </div>
          </div>
      </div>
    ))
  )

  const listCategories = () => categories.map((c, i) => (
    <Link key={i} href={`/links/${c.slug}`}>
        <div className="home-category">
            <img src={c.image && c.image.url} className="home-category-image"></img>
            <div className="home-category-name">{c.name}</div>
        </div>
    </Link>
  ))

  return (
    <div>
      <Nav></Nav>
      <div className="home-categories">
        {listCategories()}
      </div>
      <div className="home-trending">
  <h2 className="home-trending-heading heading-2">Trending {trending.length}</h2>
        {listOfLinks()}
      </div>
    </div>
  )
}

Home.getInitialProps = async () => {
  const response = await axios.get(`${API}/categories`)
  return { categories: response.data}
}

export default Home
