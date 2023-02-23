module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-ethanmick`
  extends: ['ethanmick'],
  settings: {
    next: {
      rootDir: ['apps/*/']
    }
  }
}
