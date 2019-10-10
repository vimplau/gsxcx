// pages/user/index/index.js
var call = require('../../../utils/request.js')
var utils = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhone:'',
    isLogin : false,
    avatarUrl:"http://wechatapppro-1252524126.file.myqcloud.com/appiOW1KfWe9943/image/cmVzb3VyY2UtY291cnNlQXJ0aWNsZS02MzEyOTQwOQ.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的'
    })
  },

  check_login:function(){
    this.setData({
      isLogin:false
    });
    var is_login = wx.getStorageSync('is_login')
    var switch_tab_to_home = wx.getStorageSync('switchTabToHome')
    
    if(is_login == "" && !switch_tab_to_home){
      wx.navigateTo({
        url:"/pages/user/login_middle/index",
      });
      return
    }else if (is_login == '' && switch_tab_to_home){
      wx.switchTab({
        url: '/pages/index/index/index',
        success: function(res) {
          wx.setStorageSync('switchTabToHome',false)
        }
      })
      return
    }

    let url = '/get_wx_user_info';
    let params = {}
    call.request(url,params,
      res=>{
        if (res.data.data.user_minichat_info.hasOwnProperty('phone')){
          this.setData({
            userPhone:res.data.data.user_minichat_info.phone,
            isLogin:true
          });
        }else{
          this.setData({
            userPhone:'',
            isLogin:false
          });
        }
      })
  },

  //预览图片
  previewImg:function(e){ 
    var current = e.target.dataset.src;
    var imgArr = [current]; 
    utils.previewImg(current,imgArr)

  },

  //关于我们
  aboutUs:function(){
    wx.switchTab({
      url: '/pages/about_us/index/index'
    })
  },

  //退出登录
  loginOut:function(){
    wx.showModal({
      content: '是否退出',
      success (res) {
        if (res.confirm) {
          wx.setStorageSync('is_login',false)
          wx.setStorageSync('switchTabToHome',false)
          wx.switchTab({
            url: '/pages/index/index/index'
          })
        }
      }
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
    this.check_login()
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
    this.check_login()
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