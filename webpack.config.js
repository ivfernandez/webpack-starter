const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

    //development no va a minificar nada, mientras production si. (este archivo voy a usarlo para desarrollo, y para modo prod, creo una copia llamada webpack.prod.js)
    mode: 'development',
    //para optimizar (minificar) mi css en caso de que quiera (si uso mode production):
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ]
    },
    module: {
        rules: [
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
            filename: '[name].css', 
            //En este caso lo voy a dejar con el mismo nombre, pero podria cambiarlo si quisiera.
            ignoreOrder: false //La recomiendan para que no nos tire los warnings
        }),
        new CopyPlugin({
            patterns: [
            //Le digo que copie a la carpeta assets de dist.
            { from: 'src/assets', to: 'assets/' },
        ],})

    ]
}