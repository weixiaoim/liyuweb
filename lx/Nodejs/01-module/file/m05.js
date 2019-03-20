const buf = Buffer.from('wyk')
console.log(buf);//<Buffer 77 79 6b>
const buf1 = Buffer.from('王杨凯')
console.log(buf1);//<Buffer e7 8e 8b e6 9d a8 e5 87 af>
buf1[0] = 0xe7
buf1[0] = 0x8e
buf1[0] = 0x8b
console.log(buf1);