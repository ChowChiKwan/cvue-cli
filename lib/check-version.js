/**
 * Created by ChowChiKwan on 2019/08/26.
 */
const request = require('request')
const semver = require('semver')
const chalk = require('chalk')

const packageConfig = require('../package.json')

module.exports = (done) => {
  // Ensure minimum supported node version is used
  const nodeVersion = packageConfig.engines.node
  if (!semver.satisfies(process.version, nodeVersion)) {
    return console.log(
      chalk
        .red('  You must upgrade node to >=' + nodeVersion + '.x to use cvue-cli')
    )
  }

  request(
    {
      url: 'https://registry.npmjs.org/cusvue-cli',
      timeout: 1000
    },
    (err, res, body) => {
      if (!err && res.statusCode === 200) {
        const latestVersion = JSON.parse(body)['dist-tags'].latest
        const localVersion = packageConfig.version
        if (semver.lt(localVersion, latestVersion)) {
          console.log()
          console.log(chalk.yellow('  A newer version of cvue-cli is available.'))
          console.log()
          console.log('  latest:    ' + chalk.green(latestVersion))
          console.log('  installed: ' + chalk.yellow(localVersion))
        }
      }
      done()
    }
  )
}
