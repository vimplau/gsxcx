// pages/about_us/index/index.js
var call = require('../../../utils/request.js')
var utils = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    picture_url:'',
  },

  //预览图片
  previewImg:function(e){ 
    var current = e.target.dataset.src;
    var imgArr = [current]; 
    utils.previewImg(current,imgArr);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '关于我们'
    })
    this.aboutUs()
  },

  //请求接口
  aboutUs:function(){
    let url = '/about_us';
    let params = {}
    call.request(url,params,
      res=>{
        this.setData({
          picture_url:res.data.data.picture_url
        });
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.aboutUs()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})