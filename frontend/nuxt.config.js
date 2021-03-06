const pkg = require('./package')
const environment = process.env.NODE_ENV || 'development'
const envSet = require(`./env.${environment}.js`)
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  env: envSet,
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    // title: pkg.name,
    title: 'てもぐ',
    htmlAttrs: {
      class: 'has-navbar-fixed-top'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/earlyaccess/roundedmplus1c.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/earlyaccess/nicomoji.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'bulma',
    '@/assets/css/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vue-lazyload',
    '@/plugins/fontawesome',
    '@/plugins/init',
    '@/plugins/filter'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    ['@nuxtjs/google-analytics', {
      id: envSet.analyticsTrackingId
    }]
  ],
  manifest: {
    name: 'てもぐ',
    short_name: 'てもぐ',
    description: 'てものブログ',
    lang: 'ja',
    theme_color: '#cccccc',
    background_color: '#cccccc'
  },
  workbox: {
    // dev: true, // 開発でも pwa
    runtimeCaching: [
      {
        urlPattern: 'https://fonts.gstatic.com/*',
        handler: 'cacheFirst',
        method: 'GET'
      }
    ]
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (!ctx.isDev) {
        config.plugins.push(
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                drop_console: true
              }
            }
          })
        )
      }
    }
  }
}
