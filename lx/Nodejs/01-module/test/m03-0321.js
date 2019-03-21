const EventEmitter = require('events');

class MyEmitter extends EventEmitter{

}

const emitter = new MyEmitter();

emitter.on('text',() =>{
	console.log('1::::::  running.....');
})

emitter.emit('text');