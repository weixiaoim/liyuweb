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
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    ('index onLoad');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    ('index onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    ('index onShow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    ('index onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    ('index onUnload');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    ('index onPullDownRefresh');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    ('index onReachBottom');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    ('index onShareAppMessage');
  }
})
