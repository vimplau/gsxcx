// pages/course/experience/index.js
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
      course_data: ['课程1', '课程2', '课程3', '课程4'],
      index:0
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '课程报名'
    })
  },
  //课程选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //提交信息
  formSubmit:function(e){
    console.log(e);
    let name = e.detail.value.name
    let phone = e.detail.value.phone
    let industry = e.detail.value.industry
    let company = e.detail.value.company
    let post = e.detail.value.post
    let course = e.detail.value.course

    if (name == "") {
      utils.show("姓名不能为空");
      return;
    }
    if (phone == "") {
      utils.show("电话不能为空");
      return;
    }
    if(!utils.checkPhone(phone)){
        utils.show("请输入正确的电话号码");
        return;
    }
    // if (industry == "") {
    //   utils.show("行业不能为空");
    //   return;
    // }
    // if (company == "") {
    //   utils.show("公司不能为空");
    //   return;
    // }
    // if (post == "") {
    //   utils.show("职位不能为空");
    //   return;
    // }
    if (course == "") {
      utils.show("课程不能为空");
      return;
    }
    this.setData({
      disabled:true,
      loading:true
    });

    let url = '/commit_information';
    let params = {
      'name':name,
      'telephone_number':phone,
      'industry':industry,
      'company':company,
      'position':post,
      'course_choose':course
    }
    call.request(url,params,
      res=>{
        utils.show('提交成功')
        this.setData({
          disabled:false,
          loading:false
        });
      },
      res=>{
        utils.show('提交失败')
        this.setData({
          disabled:true,
          loading:false
        });
      })
  },

  //预览图片
  previewImg:function(e){ 
    var current = e.target.dataset.src;
    var imgArr = [current]; 
    utils.previewImg(current,imgArr);
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
    this.setData({
      disabled: false,
      loading: false
    });
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
    this.setData({
      disabled: false,
      loading: false
    });
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