export default {
  srcDir: 'src/',

  head: {
    // Global page headers: https://go.nuxtjs.dev/config-head
    title: 'Mandala.web.template',
    htmlAttrs: {
      lang: 'zh',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [
    // Global CSS: https://go.nuxtjs.dev/config-css
    'element-ui/lib/theme-chalk/index.css',
  ],

  plugins: [
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    { src: '@/plugins/element-ui' },

    { src: '@/plugins/mock' }, // http://mockjs.com
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module', // https://go.nuxtjs.dev/eslint

    '@nuxtjs/stylelint-module', // https://go.nuxtjs.dev/stylelint

    'nuxt-windicss', // https://windicss.org/integrations/nuxt.html

    'nuxt-build-optimisations', // https://github.com/harlan-zw/nuxt-build-optimisations
  ],

  modules: [
    // Modules: https://go.nuxtjs.dev/config-modules
    '@nuxt/http', // https://http.nuxtjs.org

    '@nuxtjs/dayjs', // https://github.com/nuxt-community/dayjs-module

    'nuxt-i18n', // https://i18n.nuxtjs.org

    '@nuxt/image', // https://image.nuxtjs.org

    'nuxt-precompress', // https://github.com/frenchrabbit/nuxt-precompress

    '@luxdamore/nuxt-prune-html', // https://luxdamore.github.io/nuxt-prune-html

    '@nuxtjs/component-cache', // https://github.com/nuxt-community/component-cache-module

    // '@dewib/xhr-cache', // https://xhr-cache.dewib.com

    '@nuxtjs/auth-next', // https://auth.nuxtjs.org

    ['@nuxtjs/html-minifier', { logHtml: true }], // https://github.com/nuxt-community/html-minifier-module
  ],

  build: {
    // Build Configuration: https://go.nuxtjs.dev/config-build
    transpile: [/^element-ui/],
  },
}
