const withPrefresh = require('@prefresh/next');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// https://github.com/vercel/next.js/blob/canary/examples/using-preact/next.config.js
module.exports = withBundleAnalyzer(withPrefresh({
  webpack(config, { dev, isServer }) {
    // Move Preact into the framework chunk instead of duplicating in routes:
    const splitChunks = config.optimization && config.optimization.splitChunks;

    if (splitChunks) {
      const { cacheGroups } = splitChunks;
      const test = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/;

      if (cacheGroups.framework) {
        cacheGroups.preact = {
          ...cacheGroups.framework,
          test,
        };
        // if you want to merge the 2 small commons+framework chunks:
        // cacheGroups.commons.name = 'framework';
      }
    }

    if (isServer) {
      // mark `preact` stuffs as external for server bundle to prevent duplicate copies of preact
      config.externals.push(
        /^(preact|preact-render-to-string|preact-context-provider)([\\/]|$)/,
      );
    }

    // Install webpack aliases:
    const aliases = config.resolve.alias || {};

    aliases.react = 'preact/compat';
    aliases['react-dom'] = 'preact/compat';

    // Automatically inject Preact DevTools:
    if (dev && !isServer) {
      const { entry } = config;

      // eslint-disable-next-line no-param-reassign
      config.entry = () => entry().then((entries) => ({
        ...entries,
        'main.js': ['preact/debug'].concat(entries['main.js'] || []),
      }));
    }

    return config;
  },
}));
