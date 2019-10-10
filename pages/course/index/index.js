// pages/course/index/index.js
var call = require('../../../utils/request.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    course_list : [],
    can_get_course:true,
    page_index:1,
    page_size:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '课程'
    })

    this.getCourseList();
      
  },

  //获取课程列表
  getCourseList:function(){
    if (this.data.can_get_course){
      let url = '/mini_get_course_list';
      let params = {
        'page_index' : this.data.page_index,
        'page_size' : this.data.page_size,
      }
      call.request(url,params,
        res=>{
          let data = res.data.data;
          if (data.length < this.data.page_size){
            this.setData({
              can_get_course:false
            });
          }
          this.setData({
            course_list:this.data.course_list.concat(data),
            page_index:this.data.page_index + 1,
          });
        })
    }
  },

  //体验课程
  experience:function(){
    wx.switchTab({
      url: '/pages/course/experience/index'
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
    this.setData({
      course_list : [],
      can_get_course:true,
      page_index:1,
      page_size:10
    })
    this.getCourseList()
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