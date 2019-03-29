

const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
	title: {
		type:String,
		default:''
	},
	content: {
		type:String,
		default:''
	},
	author:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'user'	
	}	
});

BlogSchema.statics.findBlog = function(query){
	return this.findOne(query)
	.populate('author','name age -_id')	
}

const BlogModel = mongoose.model('blog', BlogSchema);

module.exports = BlogModel;