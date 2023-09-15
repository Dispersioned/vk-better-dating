import type { Configuration } from 'webpack';

import { BuildOptions } from '../types/config';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';

export function buildWebpackConfig(options: BuildOptions): Configuration {
  const { paths, mode, isDev } = options;

  return {
    mode,
    entry: paths.entry,
    output: {
      path: paths.build,
      filename: '[name].[contenthash].js',
      publicPath: '/',
      clean: true,
    },
    devServer: isDev ? buildDevServer(options) : undefined,
    module: {
      rules: buildLoaders(options),
    },
    plugins: buildPlugins(options),
    resolve: buildResolvers(options),
    devtool: isDev ? 'inline-source-map' : undefined,
  };
}
