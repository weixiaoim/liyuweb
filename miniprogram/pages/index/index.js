//index.js
//获取应用实例
const app = getApp()

Page({
  tapMotto:function(){
    // console.log('tapMotto...')
    /*
    //带有返回
    wx.navigateTo({
      // url: "../article/article",
      url: "/pages/article/article",
    })
    */
    wx.redirectTo({
      url: '../article/article',
    })
  },
  /*
  tapText:function(){
    console.log('tapText...')
  }
  */
})
