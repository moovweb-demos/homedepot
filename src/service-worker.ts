import { skipWaiting, clientsClaim } from 'workbox-core'
import { Prefetcher, prefetch } from '@layer0/prefetch/sw'
import DeepFetchPlugin, { DeepFetchCallbackParam } from '@layer0/prefetch/sw/DeepFetchPlugin'

skipWaiting()
clientsClaim()

new Prefetcher({
  plugins: [
    new DeepFetchPlugin([
      {
        selector: '.content_image img.stretchy.stretchy',
        maxMatches: 1,
        attribute: 'src',
        as: 'image',
        callback: deepFetchCoverImages,
      },
      {
        selector: 'img#mainImage',
        maxMatches: 1,
        attribute: 'src',
        as: 'image',
        callback: deepFetchPDPImages,
      },
      {
        selector: '.product-pod-images img.product-pod-images__image',
        maxMatches: 2,
        attribute: 'src',
        as: 'image',
        callback: deepFetchPLPImages,
      },
      {
        selector: 'script[src^="/l0-thdstaticassets"]',
        maxMatches: 4,
        attribute: 'src',
        as: 'script',
      },

    ]),
  ],
})
  .route()
  // .cache(/^https:\/\/images\.thdstatic\.com\/.*/)

///////////////////////////////////////////////
// Callback function for PDP image selector //
function deepFetchPDPImages({ $el, el, $ }: DeepFetchCallbackParam) {
  const src = $el.attr('src') || '';
  console.log("[][]][][[][]][][][][][[]][[][][]\nPrefetching PDP: "+src+"\n");
  prefetch(src, 'image');
}

///////////////////////////////////////////////
// Callback function for PLP image selector //
function deepFetchPLPImages({ $el, el, $ }: DeepFetchCallbackParam) {
  const src = $el.attr('src') || '';
  console.log("[][]][][[][]][][][][][[]][[][][]\nPrefetching PLP: "+src+"\n");
  prefetch(src, 'image');
}

//////////////////////////////////////////////
// Callback function for PLP image selector //
function deepFetchCoverImages({ $el, el, $ }: DeepFetchCallbackParam) {
  const src = $el.attr('src') || '';
  console.log("[][]][][[][]][][][][][[]][[][][]\nPrefetching Cover: "+src+"\n");
  prefetch(src, 'image');
}


// function logPrefetchedContent({$el}) { // for testing
//   // console.log("[][]][][[][]][][][][][[]][[][][]")
//   console.log("content '"+$el.attr('src')+"' has been prefetched...")
// }
