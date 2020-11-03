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

