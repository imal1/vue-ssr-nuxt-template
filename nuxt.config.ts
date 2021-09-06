import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Mandala.web.template.ts',
    htmlAttrs: {
      lang: 'zh'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  env: {
    PREFIX: '/api',
  },

  srcDir: 'src/',
  dir: {
    static: '../public/'
  },
  content: {
    dir: '../public/'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/theme/element-ui.scss',
    '@/theme/index.scss'
  ],

  styleResources: {
    scss: [
      '~theme/element-variables.scss'
    ],
    hoistUseStatements: true
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/inject' },
    { src: '@/plugins/element-ui', ssr: false },
    { src: '@/plugins/axios' },
    // { src: '@/plugins/mock', ssr: true }, // http://lavyun.gitee.io/better-mock
    { src: '@/plugins/appInit' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  generate: {
    interval: 2000,
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // 'nuxt-vite', // https://vite.nuxtjs.org
    '@nuxt/typescript-build', // https://go.nuxtjs.dev/typescript
    '@nuxtjs/composition-api/module', // https://composition-api.nuxtjs.org,
    '@nuxtjs/eslint-module', // https://go.nuxtjs.dev/eslint
    '@nuxtjs/stylelint-module', // https://go.nuxtjs.dev/stylelint
    'nuxt-windicss', // https://windicss.org/integrations/nuxt
    '@nuxtjs/style-resources', // https://github.com/nuxt-community/style-resources-module
    'nuxt-build-optimisations', // https://github.com/harlan-zw/nuxt-build-optimisations
    '@nuxtjs/router', // https://github.com/nuxt-community/router-module
    '@nuxt/content' // https://content.nuxtjs.org/
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios', // https://axios.nuxtjs.org
    '@nuxtjs/dayjs', // https://github.com/nuxt-community/dayjs-module
    // 'nuxt-i18n', // https://i18n.nuxtjs.org
    'nuxt-precompress', // https://github.com/frenchrabbit/nuxt-precompress
    '@luxdamore/nuxt-prune-html', // https://luxdamore.github.io/nuxt-prune-html
    '@nuxtjs/component-cache', // https://github.com/nuxt-community/component-cache-module
    // '@dewib/xhr-cache', // https://xhr-cache.dewib.com
    '@nuxtjs/auth-next', // https://auth.nuxtjs.org
    '@nuxtjs/proxy', // https://github.com/nuxt-community
    ['@nuxtjs/html-minifier', { logHtml: true }], // https://github.com/nuxt-community/html-minifier-module
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    loaders: {
      scss: {
        sourceMap: true,
        sassOptions: {
          quiet: true,
        }
      },
    },
    optimizeCSS: true,
  },

  ssr: false,

  target: 'static',

  typescript: {
    typeCheck: {
      eslint: {
        files: './src/**/*.{ts,js,vue}'
      }
    }
  },

  loading: {
    color: '#67C23A'
  },

  routerModule: {
    keepDefaultRouter: true
  },

  axios: {
    prefix: process.env.PREFIX,
    // proxy: true
  },

  // proxy: {
  //   '/grade': {
  //     target: 'http://localhost:3000',
  //     // async router() {
  //     //   const hostJSON = await require('./public/host.json')
  //     //   return hostJSON.data
  //     // }
  //   }
  // },

  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  vite: {
    ssr: true,
    optimizeDeps: {
      include: [
        'cookie'
      ],
    },
  },

  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.ts'
      }, {
        code: 'zh',
        file: 'zh-CN.ts'
      }
    ],
    defaultLocale: 'zh',
    lazy: true,
    langDir: 'lang/'
  },

  dayjs: {
    locales: ['zh-cn', 'en'],
    defaultLocale: 'zh-cn',
    defaultTimeZone: 'Asia/Beijing',
    plugins: [
      'utc',
      'timezone',
      'localeData'
    ]
  }
}

export default config
