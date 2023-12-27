import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';

import { buildBabelLoader } from '../loaders/buildBabelLoader';
import { BuildOptions } from '../types/config';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const styleLoader = {
    test: /\.(scss|css)$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            localIdentName: isDev ? '[path][name]__local--[hash:base64:5]' : '[hash:base64:8]',
          },
        },
      },
      'sass-loader',
    ],
  };

  const assetLoader = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const codeBabeLoader = buildBabelLoader(false);
  const tsxCodeBabeLoader = buildBabelLoader(true);

  return [codeBabeLoader, tsxCodeBabeLoader, styleLoader, assetLoader];
}
