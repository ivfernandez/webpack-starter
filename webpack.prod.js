const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {

    //development no va a minificar nada, mientras production si.
    mode: 'production',
    //para optimizar (minificar) mi css en caso de que quiera (si uso mode production):
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ]
    },
    output: {
        //Para que cuando suba un cambio, el nombre de mi js cambie, asi refresca la cache del navegador de los usuarios.
        filename: 'main.[contentHash].js' 
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                /*Excluimos styles.css ya que ese va a manejarse en la regla de abajo, para tener ese archivo globalmente en mi app*/
                use: [
                    'style-loader',
                    'css-loader'
                ] 

            },
            {
                test: /styles\.css$/,
                use: [
                    /*Usamos este plugin para poder manejar ese css globalmente en mi app*/
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ] 

            },
            {
                test: /\.html$/i, //Que tome todos los archivos .html
                loader: 'html-loader',
                options: {
                        attributes: false,
                        minimize: false /*Por si quiero que me minimice los html*/
                },
                
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: './src/index.html', //Que archivo html voy a tomar
          filename: './index.html' //Y donde lo quiero colocar
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css', 
            //En este caso lo voy a dejar con el mismo nombre, pero podria cambiarlo si quisiera.
            ignoreOrder: false //La recomiendan para que no nos tire los warnings
        }),
        new CopyPlugin({
            patterns: [
            //Le digo que copie a la carpeta assets de dist.
            { from: 'src/assets', to: 'assets/' },
        ],}),
        new MinifyPlugin(),
        new CleanWebpackPlugin(),
        
    ]
}