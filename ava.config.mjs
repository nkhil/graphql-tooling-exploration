
export default {
  files: [
    'src/test/**/*.test.ts'
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
  },
}
