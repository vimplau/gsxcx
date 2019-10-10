// pages/index/detail/index.js
var call = require('../../../utils/request.js')
var utils = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher_detail:[],
    news_detail:[],
    is_teacher:true,
    id : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type
    var id = options.id

    wx.setNavigationBarTitle({
      title: '文章详情'
    })

    this.setData({
      id:id
    })

    if (type == 1){//师资介绍
      this.get_teacher_detail(id)
    }else{
      this.setData({
        is_teacher:false
      })
      this.get_news_detail(id)
    }
  },

  //获取老师详情
  get_teacher_detail:function(teacher_id){
    let url = '/mini_get_teacher_detail';
    let params = {
      'teacher_id':teacher_id,
    }
    call.request(url,params,
      res=>{
        this.setData({
          teacher_detail:res.data.data
        });
      })
  },

  //获取新闻详情
  get_news_detail:function(id){
    let url = '/mini_get_news_info';
    let params = {
      'news_id':id,
    }
    call.request(url,params,
      res=>{
        this.setData({
          news_detail:res.data.data
        });
      })
  },

  //预览图片
  previewImg:function(e){ 
    var current = e.target.dataset.src;
    var imgArr = [current]; 
    utils.previewImg(current,imgArr)
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

  }
})