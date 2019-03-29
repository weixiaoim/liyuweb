
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
	name: {
		type:String,
		default:'Mark',	
		maxlength:[8,"Max 8"],
		minlength:[3,"Min 3"]
	},
	age:{
		type:Number,
		required:[true,"age must"],
		min:[18,"age min is 18"],
		max:[40,"age max ix 40"]
	},
	major:{
		type:String,
		enum:["art","computer","sport","music"]
	},
});


const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;