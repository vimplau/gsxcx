// pages/index/teacher/index.js
var call = require('../../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher_list:[],
    page_index:1,
    page_size:10,
    flag:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '师资介绍'
    })
    this.get_teacher_list();
  },

  //师资力量
  get_teacher_list:function(){
    if (this.data.flag){
      let url = '/mini_teacher_list';
      let params = {
        'page_index':this.data.page_index,
        'page_size':this.data.page_size
      }
      call.request(url,params,
        res=>{
          let data = res.data.data;
            if (data.length < this.data.page_size){
              this.setData({
                flag:0
              });
            }
            this.setData({
              teacher_list:this.data.teacher_list.concat(data),
              page_index:this.data.page_index + 1
            });
        })
    }
  },

  //点击老师
  teacher_detail:function(e){
    var id = e.currentTarget.dataset.src;
    wx.navigateTo({
      url: "/pages/index/detail/index?id="+id+"&type=1"
    })
  },

  //页面数据初始化
  initData:function(){
    this.setData({
      teacher_list:[],
      page_index:1,
      page_size:10,
      flag:1,
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
    this.initData()
    this.get_teacher_list()
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