const fs = require('fs');


/*
const fd = fs.openSync('./01.txt','r');


const buf = Buffer.alloc(100);
console.log(buf);
fs.readSync(fd,buf,0,100,0);
console.log(buf);

fs.closeSync(fd);
*/

const data = fs.readFileSync('./01.txt',{flag:'r'});
console.log(data);