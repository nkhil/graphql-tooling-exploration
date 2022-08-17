const fs = require('fs')
const path = require('path')

const getFirestorePort = (projectDir) => {
  try {
    const filepath = path.join(projectDir, '.firestore-emulator')
    return fs.readFileSync(filepath, 'utf-8').trim('')
  } catch (error) {
    return ''
  }
}

module.exports = ({ projectDir }) => ({
  files: ['src/test/**/*.test.ts'],
  ignoredByWatcher: ['.c8_output', 'coverage'],
  timeout: '30s',
  typescript: {
    rewritePaths: {
      'src/': 'build/',
    },
    compile: false,
  },
  environmentVariables: {
    TZ: 'UTC',
    FIRESTORE_EMULATOR_HOST: `0.0.0.0:${getFirestorePort(projectDir)}`
  },
})
