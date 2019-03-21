// console.log(process);
// console.log(global.process);
// console.log(process === global.process);
// console.log(process.argv);
// console.log(process.env);
// console.log(process.pid);
console.log(1);
process.nextTick(() =>{
	console.log(2);
})

console.log(3)