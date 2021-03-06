module.exports = {
  routes: './src/routes.ts',
  connector: '@layer0/starter',
  backends: {
    origin: {
      domainOrIp: 'www.homedepot.com',
      hostHeader: 'www.homedepot.com',
    },
    images: {
      domainOrIp: 'images.homedepot-static.com',
      hostHeader: 'images.homedepot-static.com',
    },
    thdstaticImages: {
      domainOrIp: 'images.thdstatic.com',
      hostHeader: 'images.thdstatic.com',
    },
    thdstaticAssets: {
      domainOrIp: 'assets.thdstatic.com',
      hostHeader: 'assets.thdstatic.com',
    },
    contentgrid: {
      domainOrIp: 'contentgrid.thdstatic.com',
      hostHeader: 'contentgrid.thdstatic.com',
    },
    assets: {
      domainOrIp: 'assets.homedepot-static.com',
      hostHeader: 'assets.homedepot-static.com',
    },
  },
}
