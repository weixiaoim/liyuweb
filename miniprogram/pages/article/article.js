var { articles } = require('../../data/db.js')



Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*
    articles:[
      {
        avatar:'../../images/tx.jpg',
        date:'2019-05-07',
        title:'我是标题',
        img:'../../images/rb2.jpg',
        desc:'我是描述',
        star:30,
        view:40
      },
      {
        avatar: '../../images/tx.jpg',
        date: '2019-05-07',
        title: '我是标题',
        img: '../../images/rb4.jpg',
        desc: '我是描述',
        star: 40,
        view: 50
      }
    ]
    */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('onLoad');
    /*
    var articles = [
      {
        avatar: '../../images/tx.jpg',
        date: '2019-05-07',
        title: '我是标题',
        img: '../../images/rb2.jpg',
        desc: '我是描述',
        star: 30,
        view: 40
      },
      {
        avatar: '../../images/tx.jpg',
        date: '2019-05-07',
        title: '我是标题',
        img: '../../images/rb4.jpg',
        desc: '我是描述',
        star: 40,
        view: 50
      }
    ];
    */
    /*
    this.setData({
      articles: articles
    },function(){
      console.log('in cb',this.data.articles)
    }.bind(this))
    console.log('out cb', this.data.articles)
    */
    this.setData({
      articles: articles
    })
  },
    

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log('onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('onShow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log('onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log('onUnload');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // console.log('onPullDownRefresh');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log('onReachBottom');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    // console.log('onShareAppMessage');
  },
  tapArticleItem:function(ev){
    var articleId = ev.currentTarget.dataset.articleId;
    console.log(articleId)
    wx.navigateTo({
      url: './article-detail/article-detail?articleId=' + articleId,
    })
  }
})