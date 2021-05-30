import cheerio from 'cheerio'
import Response from '@layer0/core/router/Response'
import Request from '@layer0/core/router/Request'
import { injectBrowserScript } from '@layer0/starter'

export default function transform(response: Response, request: Request) {
  // inject browser.ts into the document returned from the origin
  injectBrowserScript(response)

  if (response.body) {
    const $ = cheerio.load(response.body)
    // console.log("Transform script running on '"+response.req.originalUrl+"'") // for testing

    // Those 2 scripts are added using server side transformation just for Proof of Concept purposes.
    // For production those 2 scripts should be included in original website base code.
    $('head').append(`
      <script src="/__layer0__/cache-manifest.js" defer="defer"></script>
      <script src="/main.js" defer="defer"></script>
    `)

    $('*').attr('layer0', 'layer0')

    // $('script[src]').map((i, el) => {
    //   var link = $(el).attr('src') || '';
    //   $(el).attr('src', link.replace(/.+\.com\//, '/'));
    // })

    // Fixing CORS image issues by proxing images to Layer0 server | images.homedepot-static.com
    $('img[src*="https://images.homedepot-static.com"]').map((i, el) => {
      var url = $(el).attr('src') || '';
      var newUrl = url.replace('https://images.homedepot-static.com', '/l0-images');
      $(el).attr('src', newUrl)
    })

    // Fixing CORS image issues by proxing images to Layer0 server | images.homedepot-static.com
    $('img[src*="https://images.thdstatic.com"]').map((i, el) => {
      var url = $(el).attr('src') || '';
      var newUrl = url.replace('https://images.thdstatic.com', '/l0-thdstatic');
      $(el).attr('src', newUrl)
    })

    // Relativise links
    $('a[href]').map((i, el) => {
      var link = $(el).attr('href') || '';
      $(el).attr('href', link.replace(/.+\.com\//, '/'));
      if (typeof $(el).attr('data-link') !== 'undefined') {
        var dataLink = $(el).attr('data-link') || '';
        $(el).attr('data-link', dataLink.replace(/.+\.com\//, '/'));
      }
    })

    response.body = $.html()
                      .replace(/https:\/\/www\.homedepot\.com\//g, '/')
  }
}
