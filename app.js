//app.js
var call = require('utils/request.js')
App({
  //全局变量
  globalData: {
    request_url: 'https://wx.gsi.com.cn/api/v1.0',
    user_id : '',
    expire_time : ''
  },

  onLaunch: function () {
      //判断是否需要登录
      var need_login = false
      var userId = wx.getStorageSync('user_id')
      var expireTime = wx.getStorageSync('expire_time')
      var now = + new Date()
      if (!userId || now > expireTime){
        console.log('no user_id')
        need_login = true
      }
      wx.checkSession({
        success () {
          //session_key 未过期，并且在本生命周期一直有效
          console.log('onLaunch-unexpired')
        },
        fail () {
          // session_key 已经失效，需要重新执行登录流程
          console.log('onLaunch-expired')
          need_login = true;
        }
      })

      if (need_login){
        wx.reLaunch({
          url:"/pages/login/index/index"
        });
      }
  },

})