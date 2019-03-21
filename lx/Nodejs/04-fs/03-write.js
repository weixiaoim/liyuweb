const fs = require('fs');



/*
fs.open('01.txt','a',(err,fd)=>{
	if (err) {
		console.log('open error',err);
	}else{
		fs.write(fd,'hello',(err)=>{
			if (err) {
				console.log('write error',err);
			}else{
				console.log('write success');
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


fs.writeFile('./01.txt','wyk',{flag:'a'},(err)=>{
	if (err) {
		console.log('writeFile error',err);
	}else{
		console.log('writeFile success');
	}
})