module.exports =  {
    test: require.resolve('snapsvg'),
    loader: 'imports-loader?this=>window,fix=>module.exports=0'
}