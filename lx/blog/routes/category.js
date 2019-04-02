
const express = require('express')
const CategoryModel = require('../models/category.js')
const pagination = require('../util/pagination.js')
const router = express.Router()

//权限验证
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请用管理员账号登录</h1>')
	}
})

//显示分类列表
router.get("/",(req,res)=>{
		const options = {
		page:req.query.page,
		model:CategoryModel,
		query:{},
		projection:'-password -__v',
		sort:{order:1}
	}
	pagination(options)
	.then(data=>{
		res.render('admin/category_list',{
			userInfo:req.userInfo,
			categories:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/category'
		})	
	})
})
//显示添加分类页面
router.get("/add",(req,res)=>{
	res.render('admin/category_add',{
		userInfo:req.userInfo
	})
})
//处理添加分类页面
router.post("/add",(req,res)=>{
	const { name,order } = req.body;
	CategoryModel.findOne({name})
	.then(category=>{
		if (category) {
			//已经存在同名的分类
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:"添加分类失败，分类已存在"
			})
		}else{
			CategoryModel.insertMany({name,order})
			.then(categories=>{
				res.render('admin/success',{
					userInfo:req.userInfo,
					message:'分类添加成功',
					url:'/category'
				})
			})
			.catch(err=>{
				throw err
			})
		}
	})
	.catch(err=>{
		res.render('admin/error',{
				userInfo:req.userInfo,
				message:"添加分类失败，数据库操作失误，请稍后再试"
		})
	})
})

module.exports = router