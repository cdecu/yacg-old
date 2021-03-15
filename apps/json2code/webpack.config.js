const ShebangPlugin = require('webpack-shebang-plugin');

module.exports = (config) => {
  return {
    ...config,
    plugins: [...config.plugins, new ShebangPlugin({ chmod: 0o755 })],
  };
};
