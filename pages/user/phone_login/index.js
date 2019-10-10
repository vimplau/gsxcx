// pages/user/login/index.js
var call = require('../../../utils/request.js')
var utils = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    code_disabled: true,
    getCode : '获取验证码',
    phone:'',
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登录'
    })
  },

  /**
   * 校验手机号
   * @param {*} e 
   */
  checkInputPhone:function(e){
    let phone = e.detail.value
    this.setData({
      phone: phone
    })
    if (phone.length == 0){
      this.toast('手机号不能为空')
      return
    }else{
      if (utils.checkPhone(phone)){
        this.setData({
          code_disabled: false
        })
      }else{
        this.setData({
          code_disabled: true
        })
        this.toast('手机号错误')
        return
      }
    }
    
  },

  /**
   * 校验验证码
   * @param {*} e 
   */
  checkInputCode:function(e){
    let code = e.detail.value
    this.setData({
      code: code
    })
  },

  /**
   * 获取验证码
   */
  getCode:function(e){
    var that = this;
    var times = 60
    var i = setInterval(function() {
      times--
      if (times <= 0) {
        that.setData({
            code_disabled: false,
            getCode: "获取验证码",
        })
        clearInterval(i)
      } else {
        that.setData({
            getCode: "重新获取(" + times + ")",
            code_disabled: true
        })
      }
    }, 1000)

    let url = '/send_sms';
    let params = {
      'phone_number':this.data.phone,
    }
    call.request(url,params,
      res=>{
        utils.toast("发送成功")
      })
  },

  formSubmit:function(e){
    let phone = e.detail.value.phone
    let code = e.detail.value.code
    
    if (phone == "") {
      utils.show("电话不能为空");
      return
    }
    if(!utils.checkPhone(phone)){
      utils.show("请输入正确的电话号码");
      return
    }
    if(code == ''){
      utils.show("验证码不能为空");
      return
    }

    let url = '/login_by_phone';
    let params = {
      'phone_number':phone,
      'code':code,
    }
    call.request(url,params,
      res=>{
        this.setData({
          disabled:false,
          loading:false
        });
        wx.setStorageSync('is_login', true)
        wx.navigateBack({
          delta: 2
        })
      },
      res=>{
        utils.show("登录失败")
        this.setData({
          disabled:false,
          loading:false
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