import Nav from '../components/nav'
import axios from 'axios'
import {API} from '../config'
import Link from 'next/link'

const Home = ({categories}) => {
  const listCategories = () => categories.map((c, i) => (
    <Link key={i} href="/login">
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
    </div>
  )
}

Home.getInitialProps = async () => {
  const response = await axios.get(`${API}/categories`)
  return { categories: response.data}
}

export default Home
