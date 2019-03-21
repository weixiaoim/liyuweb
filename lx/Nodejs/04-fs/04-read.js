const fs = require('fs');
const util = require('util');


/*
fs.open('./01.txt','r',(err,fd)=>{
	if (err) {
		console.log('open error',err)
	}else{
		let buf = Buffer.alloc(100);
		fs.read(fd,buf,0,100,0,(err)=>{
			if (err) {
				console.log('read error',err);
			}else{
				console.log('read success');
			}

			fs.close(fd,(err)=>{
				if (err) {
					console.log('close error',err);
				}else{
					console.log('close success')
				}
			})
		});
	}
});
*/

/*
fs.readFile('./01.txt',{flag:'r'},(err,data)=>{
	if (err) {
		console.log('readFile error',err);
	}else{
		console.log('readFile success');
	}
})
*/



const readFile = util.promisify(fs.readFile);
readFile('./01.txt',{flag:'r'})
.then(data=>{
	console.log(data);
})
