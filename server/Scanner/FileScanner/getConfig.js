const path = require('path')
const log = require('../../lib/Log')('FileScanner')
const fs = require('fs')
const { NodeVM } = require('vm2')
const CONFIG = '_kes.v1.js'

// search each folder from dir up to baseDir
function getConfig (dir, baseDir) {
  dir = path.normalize(dir)
  baseDir = path.normalize(baseDir)
  const cfgPath = path.resolve(dir, CONFIG)

  try {
    const userScript = fs.readFileSync(cfgPath, 'utf-8')
    log.info('  => using config: %s', cfgPath)

    try {
      const vm = new NodeVM({ wrapper: 'none' })
      return vm.run(userScript)
    } catch (err) {
      log.error(err)
    }
  } catch (err) {
    log.verbose(`  => no config in ${dir}`)
  }

  if (dir === baseDir) {
    return
  }

  // try parent dir
  return getConfig(path.resolve(dir, '..'), baseDir)
}

module.exports = getConfig
