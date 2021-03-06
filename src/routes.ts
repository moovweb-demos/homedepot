import { Router } from '@layer0/core/router'
import { starterRoutes } from '@layer0/starter'
import { CACHE_ASSETS, CACHE_PAGES } from './cache'
import shoppingFlowRouteHandler from './shoppingFlowRouteHandler'

export default new Router()
  .use(starterRoutes)

  // Home page
  .match('/', shoppingFlowRouteHandler)

  // PLP page
  .match('/b/:path*', shoppingFlowRouteHandler)

  // PDP page
  .match('/p/:path*', shoppingFlowRouteHandler)

  // CSS Mobile page
  .match('/content/css/mobile/mobile-main.css', shoppingFlowRouteHandler)


  // https://assets.thdstatic.com/react-components/buybelt/1.0.41/main.js

  // example route for cacheable assets:
  // .match('/images/:path*', ({ cache, proxy }) => {
  //   cache(CACHE_ASSETS)
  //   return proxy('origin')
  // })

  .match('/l0-images/:path*', ({ proxy, cache }) => {
    cache(CACHE_ASSETS)
    return proxy('images', { path: ':path*' })
  })

  .match('/l0-thdstatic/:path*', ({ proxy, cache }) => {
    cache(CACHE_ASSETS)
    return proxy('thdstaticImages', { path: ':path*' })
  })

  .match('/l0-thdstaticassets/:path*', ({ proxy, cache }) => {
    cache(CACHE_ASSETS)
    return proxy('thdstaticAssets', { path: ':path*' })
  })



  .match('/l0-contentgrid/:path*', ({ proxy, cache }) => {
    cache(CACHE_ASSETS)
    return proxy('contentgrid', { path: ':path*' })
  })

  .match('/l0-assets/:path*', ({ proxy, cache }) => {
    cache(CACHE_ASSETS)
    return proxy('assets', { path: ':path*' })
  })



  .match('/service-worker.js', ({ serviceWorker }) => serviceWorker('dist/service-worker.js'))
  .match('/main.js', ({ serveStatic, cache }) => {
    cache(CACHE_ASSETS)
    return serveStatic('dist/browser.js')
  })

  // fallback route for all other requests:
  .fallback(({ proxy }) => {
    proxy('origin')
  })

  //////////////////////////////////////////////////////////
  ////////// Static Prerendering implementation ////////////
  //////////////////////////////////////////////////////////

  // More details at:
  // https://developer.moovweb.com/guides/static_prerendering

  // .prerender([
  //   // HTML pages
  //   { path: '/' },
  //   { path: '/categories/mens' },
  //   { path: '/categories/mens/shirts' },
  //   { path: '/categories/mens/pants' },
  //   { path: '/categories/womens' },
  //   { path: '/categories/womens/shirts' },
  //   { path: '/categories/womens/pants' },

  //   // API responses
  //   { path: '/api/index.json' },
  //   { path: '/api/categories/mens.json' },
  //   { path: '/api/categories/mens/shirts.json' },
  //   { path: '/api/categories/mens/pants.json' },
  //   { path: '/api/categories/womens.json' },
  //   { path: '/api/categories/womens/shirts.json' },
  //   { path: '/api/categories/womens/pants.json' },
  // ])
