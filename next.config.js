const withCSS = require('@zeit/next-css')
module.exports = withCSS({
    devIndicators: {
      autoPrerender: false,
    },
    publicRuntimeConfig: {
      APP_NAME: 'LinkNest',
      API: 'http://localhost:3001/api',
      PRODUCTION: false,
      DOMAIN: 'http://localhost:3000',
      FB_APP_ID: 'AMC039VZDCMPQ023',
    }
})

const withCSS = require('@zeit/next-css')
module.exports = withCSS({
    devIndicators: {
      autoPrerender: false,
    },
    publicRuntimeConfig: {
      APP_NAME: 'LinkNest',
      API: '/api',
      PRODUCTION: true,
      DOMAIN: 'ec2-3-101-15-110.us-west-1.compute.amazonaws.com',
      FB_APP_ID: 'AMC039VZDCMPQ023',
    }
})