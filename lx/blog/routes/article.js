
const express = require('express')
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')
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

//显示文章列表
router.get("/",(req,res)=>{
		const options = {
		page:req.query.page,
		model:ArticleModel,
		query:{},
		projection:'-password -__v',
		sort:{_id:1}
	}
	pagination(options)
	.then(data=>{
		res.render('admin/article_list',{
			userInfo:req.userInfo,
			articles:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/article'
		})	
	})
})
//显示添加分类页面
router.get("/add",(req,res)=>{
	res.render('admin/category_add_edit',{
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
//显示编辑页面
router.get('/edit/:id',(req,res)=>{
	const { id } = req.params
	CategoryModel.findById(id)
	.then(category=>{
		res.render('admin/category_add_edit',{
			userInfo:req.userInfo,
			category
		})
	})
})

//处理编辑
router.post('/edit',(req,res)=>{
	const { id,name,order } = req.body
	CategoryModel.findById(id)
	.then(category=>{
		if(category.name == name && category.order == order){//没有修改
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:"请修改后再提交"
			})
		}else{
			CategoryModel.findOne({name:name,_id:{$ne:id}})
			.then(newCategory=>{
				if (newCategory) {
					res.render('admin/error',{
						userInfo:req.userInfo,
						message:"修改分类失败，分类已存在"
					})
				}else{
					CategoryModel.updateOne({_id:id},{name,order})
					.then(result=>{
						res.render('admin/success',{
							userInfo:req.userInfo,
							message:'分类修改成功',
							url:'/category'
						})
					})
				}
				
			})
			.catch(err=>{
					throw err;
			})
		}
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"修改分类失败，数据库操作失误，请稍后再试"
		})
	})
})
//删除
router.get('/delete/:id',(req,res)=>{
	const { id } = req.params
	CategoryModel.deleteOne({_id:id})
	.then(result=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'分类删除成功',
			url:'/category'
		})
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"删除分类失败，数据库操作失误，请稍后再试"
		})
	})
})

module.exports = router