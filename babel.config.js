//让 babel 把当前的代码基于你当前的 nodejs 版本进行编译
module.exports = {
    presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};