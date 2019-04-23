const path = require('path');

module.exports = {
	//指定打包环境
	mode:'development',
	//指定入口
	entry: './src/index.js',
	//制定出口
	output: {
		//出口文件名称
		filename: 'bundle.js',
		//出口的文件所在目录
		path: path.resolve(__dirname, 'dist')
	}
};