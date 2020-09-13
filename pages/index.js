import Head from 'next/head';
import Nav from '../components/nav'
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

export default function Home() {
  return (
    <div>
      <Head>
        <React.Fragment>
          <title>Hackr</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"/>
        </React.Fragment>
      </Head>
      <Nav></Nav>
    </div>
  )
}
