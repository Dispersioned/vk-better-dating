import CopyWebpackPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { ProgressPlugin, type WebpackPluginInstance } from 'webpack';

import { BuildOptions } from '../types/config';

export function buildPlugins(options: BuildOptions): WebpackPluginInstance[] {
  const plugins: WebpackPluginInstance[] = [
    new HTMLWebpackPlugin({
      template: options.paths.html,
    }),
    new ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '*.(png|svg|jpg|jpeg)',
          to: '',
          context: path.resolve(__dirname, '..', '..', 'public'),
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
    }),
    new Dotenv(),
  ];

  return plugins;
}
