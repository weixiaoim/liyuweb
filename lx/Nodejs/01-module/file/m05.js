// const buf = Buffer.from('wyk')
// console.log(buf);//<Buffer 77 79 6b>
const buf1 = Buffer.from('你')
console.log(buf1);//<Buffer e7 8e 8b e6 9d a8 e5 87 af>
const buf2 = Buffer.alloc(3)
buf2[0] = 0xe4;
buf2[1] = 0xbd;
buf2[2] = 0xa0;
console.log(buf2.toString());