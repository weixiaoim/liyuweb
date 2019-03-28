
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');


const mime = require('./mime.json');



const server = http.createServer((req,res)=>{
	console.log('url=>',req.url);
	let reqUrl = url.parse(req.url,true);
	let pathname = reqUrl.pathname;
	

	//约定：
	//1.请求以/static/开始的路径以为是静态资源
	//2.对于路由请求得约定： /Controller/action/arg1/arg2.....
	//					   /Wish/add
	//					   /Wish/del/12345678
	//					   /Wish/index
	if (pathname.startsWith('/static/')) {//静态处理
		let filePath =path.normalize(__dirname +pathname);
		let extname = path.extname(filePath);

		fs.readFile(filePath,(err,data)=>{
			if(err){
				res.setHeader('Content-Type',"text/html;charset=utf-8");
				res.end('<h1>出错啦!!!!!</h1>');
			}else{
				res.setHeader('Content-Type',mime[extname]+";charset=utf-8");
				res.end(data);
			}
		});
	}else{//路由处理
		let paths = pathname.split('/');
		let controller = paths[1] || 'Index';
		let action = paths[2] || 'index';
		let args = paths.slice(3);
		try{
			let mode = require('./Controller/'+controller);
			mode[action] && mode[action].apply(null,[req,res].concat(args));
		}
		catch(err){
			// console.log('err:::',err);
			res.setHeader('Content-Type',"text/html;charset=utf-8");
			res.end('<h1>出错啦!!!!1:::</h1>');
		}
	}


	
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running at http://127.0.0.1:3000')
})