import webpack from 'webpack'

export function buildBabelLoader(isTsx: boolean): webpack.RuleSetRule {
  return ({
    test: isTsx ? /\.(jsx|tsx)/ : /\.(js|ts)/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        plugins: [
          [
            '@babel/plugin-transform-typescript',
            {
              isTsx,
            },
          ],
          '@babel/plugin-transform-runtime',
        ],
      },
    },
  })
}
