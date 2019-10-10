// pages/index/introduction/index.js
var call = require('../../../utils/request.js')
var utils = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_id:'',
    activity_data:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.activity_name
    })
    this.setData({
      activity_id:options.activity_id,
    })
    this.get_activity_detail();
  },

  get_activity_detail:function(){
    let url = '/mini_get_activity_info';
    let params = {
      'activity_id':this.data.activity_id
    }
    call.request(url,params,
      res=>{
        this.setData({
          activity_data:res.data.data
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

  },
  experience:function(){
    wx.switchTab({
      url: '/pages/course/experience/index'
    })
  },
})