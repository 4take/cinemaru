module.exports = {
    test: /\/jquery.js$/,
    loader: "expose-loader?$!expose-loader?jQuery"
}