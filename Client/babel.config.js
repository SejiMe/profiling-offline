module.exports = function (api) {
  api.cache(true);
  return {
    env: {
      production: {
        plugins: ['@emotion'],
      },
    },
    presets: ['next/babel'],
    plugins: ['@emotion', 'macros'],
  };
};
