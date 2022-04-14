import Path from 'path';
import { fileURLToPath } from 'url';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { runInContext } from 'vm';

const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

const rootDir = Path.join(__dirname);
const nodeModulesDir = Path.join(rootDir, 'node_modules');
const pubDir = Path.join(rootDir, 'public');
const srcDir = Path.join(rootDir, 'src');
const outDir = Path.join(rootDir, 'dist');

export default {
  mode: isDev ? 'development' : 'production',
  entry: Path.resolve(rootDir, 'src/index.tsx'),
  devtool: isDev ? 'eval-source-map' : undefined,
  stats: "errors-warnings",
  output: {
    path: Path.join(outDir, 'data'),
    filename: 'cai_bundle.js',
    publicPath: '/data/',
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
  },
  experiments: {
    outputModule: true,
    topLevelAwait: true,
  },
  devServer: {
    static: outDir,
    host: '0.0.0.0',
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'ts-loader',
        include: [ srcDir ],
        exclude: [ nodeModulesDir ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
        include: [ srcDir ],
        exclude: [ nodeModulesDir ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: pubDir, to: outDir },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Cards Against Insanity',
      description: "Cards Against Insanity is a card game against insanity is a card game against insanity is a card game",
      filename: '../index.html',
      showErrors: isDev ? true : false,
      hash: isDev ? false : true,
    }),
  ],
};
