const fs = require('fs');



/*
const fd = fs.openSync('./01.txt','w');

fs.writeSync(fd,'hello');

fs.closeSync(fd);
*/

fs.writeFileSync('./01.txt','wyk',{flag:'w'});
