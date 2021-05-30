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
  },
}
