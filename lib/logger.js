/**
 * Created by ChowChiKwan on 2019/08/26.
 */
const chalk = require('chalk')
const format = require('util').format

/**
 * Prefix.
 */
const prefix = '  cvue-cli'
const sep = chalk.gray('·')

/**
 * Log a `message` to the console.
 * @param {String} message
 */
exports.log = function (...args) {
  const msg = format.apply(format, args)
  console.log(chalk.green(prefix), sep, msg)
}

/**
 * Log an error `message` to the console and exit.
 * @param {String} message
 */
exports.fatal = function (...args) {
  if (args[0] instanceof Error) args[0] = args[0].message.trim()
  const msg = format.apply(format, args)
  console.error(chalk.red(prefix), sep, msg)
  process.exit(1)
}

/**
 * Log a success `message` to the console and exit.
 * @param {String} message
 */
exports.success = function (...args) {
  const msg = format.apply(format, args)
  console.log()
  console.log(chalk.green(prefix), sep, msg)
}
