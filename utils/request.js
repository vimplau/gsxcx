// 请求api的基础路径
export const baseUrl = 'https://wx.gsi.com.cn/api/v1.0'
 
/**
 * 统一的请求封装
 * @param {String} url 请求的api地址
 * @param {JSON} params 请求携带的参数
 * @param {String} method 请求方法，默认post
 * @param {boolean} [loading=true] 是否显示loading，默认true
 */
export function request(url, params, doSuccess,doFail,method='POST',loading = true) {
  // 请求开始，显示loading
  console.log('request')
  if (loading) {
    wx.showLoading({
      title: '加载中'
    })
  }
  params['user_id'] = wx.getStorageSync('user_id')
  // 请求
  wx.request({
    url: baseUrl + url,
    data: params,
    method:  method,
    header: {'content-type':'application/json'},
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      if (res.statusCode === 200) {
        if(res.data.code == 0){
          doSuccess(res) // 接收res并传到then的参数中去
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
            duration: 1000
          })
        }
      } else {
        wx.showToast({
          title: '网络错误',
          icon: 'loading',
          duration: 1000
        })
      }
      wx.hideLoading() // 结束加载
    },
    fail: function(e) {
      wx.showToast({
        title: '网络错误',
        icon: 'loading',
        duration: 1000
      })
      wx.hideLoading() // 结束加载
      doFail()
    }
  })
}

/**
 * 登录的请求
 */
function check_login(toIndex=0){
  var need_login = false
  var userId = wx.getStorageSync('user_id')
  var expireTime = wx.getStorageSync('expire_time')
  var now = + new Date()
  if (!userId || now > expireTime){
    need_login = true
  }

  wx.checkSession({
    success () {
      //session_key 未过期，并且在本生命周期一直有效
    },
    fail () {
      // session_key 已经失效，需要重新执行登录流程
      need_login = true;
    }
  })

  if (need_login){
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url:  baseUrl + '/wx_login',
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
                if (toIndex){
                  wx.switchTab({
                    url: '/pages/index/index/index',
                  })
                }
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
}

/**
 * 微信登录的请求
 */
function wx_login(){
  wx.login({
    success (res) {
      if (res.code) {
        //发起网络请求
        wx.request({
          url:  baseUrl + '/wx_login',
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

module.exports.request = request;
module.exports.check_login = check_login;
module.exports.wx_login = wx_login;
module.exports.baseUrl = baseUrl;