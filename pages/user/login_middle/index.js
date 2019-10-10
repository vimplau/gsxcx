// pages/user/login/index.js
var call = require('../../../utils/request.js')
var utils = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登录'
    })
  },

  //手机号登陆，跳转
  phoneLogin:function(e){
    wx.navigateTo({
      url:"/pages/user/phone_login/index",
    });
  },

  //微信登录
  getPhoneNumber (e) {
    console.log(e);
    if (!e.detail.hasOwnProperty('encryptedData')){
      return
    }

    var encryptedData = e.detail.encryptedData
    var iv = e.detail.iv
    
    wx.checkSession({
      success () {
        //session_key 未过期，并且在本生命周期一直有效
        console.log('success')
        login_by_wx(encryptedData,iv)
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        console.log('fail')
        wx.login({
          success (res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url:  call.baseUrl + '/wx_login',
                data: {
                  'code':res.code,
                },
                header: {'content-type':'application/json'},
                method: 'post',
                dataType: 'json',
                responseType: 'text',
                success: (result) => {
                  let response = result.data;
                  if (response.code == 0){
                    wx.setStorageSync('user_id',response.data.user_id)
                    wx.setStorageSync('expire_time',+new Date + 30 * 24 * 3600 * 1000)
                    login_by_wx(encryptedData,iv)
                  }
                },
                fail: () => {
                  console.log('登录失败！')
                },
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })

    //微信登录
    function login_by_wx(encryptedData,iv){
      let url = '/login_by_wx';
      let params = {
        'encryptedData':encryptedData,
        'iv':iv
      }
      console.log(params)
      call.request(url,params,
        res=>{
          utils.toast("登录成功")
          wx.setStorageSync('is_login', true)
          wx.setStorageSync('user_id',res.data.data.user_id)
          wx.navigateBack({
            delta: 1
          })
        },
        res=>{
          call.wx_login()
        })
    }
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
    wx.setStorageSync('switchTabToHome',true)
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

  }
})