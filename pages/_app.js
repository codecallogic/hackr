import Head from 'next/head';
import '../styles/globals.css'
import '../styles/app.css'
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
        <React.Fragment>
        <title>Hackr</title>
        </React.Fragment>
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
