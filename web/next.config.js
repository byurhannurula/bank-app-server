/* eslint-disable no-param-reassign */
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  webpack(config, options) {
    config.resolve.alias['@lib'] = `${__dirname}/src/lib`
    config.resolve.alias['@util'] = `${__dirname}/src/util`
    config.resolve.alias['@pages'] = `${__dirname}/src/pages`
    config.resolve.alias['@hooks'] = `${__dirname}/src/hooks`
    config.resolve.alias['@styles'] = `${__dirname}/src/styles`
    config.resolve.alias['@context'] = `${__dirname}/src/context`
    config.resolve.alias['@requests'] = `${__dirname}/src/requests`
    config.resolve.alias['@components'] = `${__dirname}/src/components`
    config.resolve.alias['@common'] = `${__dirname}/src/components/common`

    return config
  },
})
