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
        <title>NestLinks</title>
        <link
          href="//fonts.googleapis.com/css?family=Poppins:300,400,500,600,700%7CRoboto:300,400,500,600,700"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        </React.Fragment>
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
