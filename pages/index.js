import Nav from '../components/nav'

export default function Home() {

  const time = () => {
    var date = new Date();
    date.setTime(date.getTime());
    console.log(date)
  }
  
  return (
    <div>
      <Nav></Nav>
      <span onClick={time}>Hello</span>
    </div>
  )
}
