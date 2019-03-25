const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const mime = require('./mime.json');

const server = http.createServer((req,res)=>{
	console.log('url',req.url);
	let reqUrl = url.parse(req.url,true);
	// console.log(reqUrl);
	let pathname = reqUrl.pathname;

	//约定：如果请求的是目录，则返回目录下面的index.html页面
	if (pathname.lastIndexOf('.') == -1) {
		pathname = pathname + '/index.html';
	}

	let filePath = path.normalize(__dirname + '/boke/' +pathname);
	let extname = path.extname(filePath);
	console.log(extname);

	fs.readFile(filePath,(err,data)=>{
			if(err){
				res.setHeader('Content-Type',"text/html;charset=utf-8");
				res.end('<h1>出错啦!</h1>');
			}else{
				res.setHeader('Content-Type',mime[extname]+";charset=utf-8");
				res.end(data);
			}
		});


	// res.write('<h1>hello 你好</h1>');
	// res.end('kuazhu');
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running at http://127.0.0.1:3000')
})