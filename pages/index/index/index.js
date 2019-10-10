//index.js
var call = require('../../../utils/request.js')
var utils = require('../../../utils/util.js')

Page({
  data: {
    school_feature_list : [],
    teacher_list : [],
    preview_course_url:"",
    activity_data:"",
    },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/index'
    })
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '港盛国际集团活动'
    })

    this.school_feature()
    this.get_teacher_list()
    this.get_preview_course()
    this.get_activity_post_url()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '港盛集团讲座',
      path: '/pages/index/index/index'
    }
  },

  //体验课程
  experience:function(){
    wx.switchTab({
      url: '/pages/course/experience/index'
    })
  },

  //教学特色
  school_feature:function(){
    let url = '/mini_school_feature';
    let params = {}
    call.request(url,params,
      res=>{
        this.setData({
          school_feature_list:res.data.data
        });
      })
  },

  //师资力量
  get_teacher_list:function(){
    let url = '/mini_teacher_list';
    let params = {}
    call.request(url,params,
      res=>{
        this.setData({
          teacher_list:res.data.data
        });
      })
  },

  //课程预告
  get_preview_course:function(){
    let url = '/mini_preview_course';
    let params = {}
    call.request(url,params,
      res=>{
        this.setData({
          preview_course_url:res.data.data.course_cover_url
        });
      })
  },

  //活动报名
  get_activity_post_url:function(){
    let url = '/mini_activity_info';
    let params = {}
    call.request(url,params,
      res=>{
        this.setData({
          activity_data:res.data.data
        });
      })
  },

  //教学特色预览图片
  preview_special:function(e){ 
    var current = e.target.dataset.src;
    let list = [];
    for (var i = 0;i < this.data.school_feature_list.length;i++){
      list.push(this.data.school_feature_list[i].picture_url);
    }

    utils.previewImg(current,list)

  },

  //老师预览图片
  preview_teacher:function(e){ 
    var current = e.target.dataset.src;
    let list = [];
    for (var i = 0;i < this.data.teacher_list.length;i++){
      list.push(this.data.teacher_list[i].teacher_cover_url);
    }
    utils.previewImg(current,list)

  },

  //首页活动详情
  get_activity_detail:function(){
    wx.navigateTo({
      url: "/pages/index/introduction/index?activity_id="+this.data.activity_data.activity_id+"&activity_name="+this.data.activity_data.title
    })
  },

  //跳转到关于我们
  switchTabToAboutUs:function(){
    wx.switchTab({
      url:"/pages/about_us/index/index"
    })
  },

  //跳转到师资介绍
  navigateToTeacher:function(){
    wx.navigateTo({
      url:"/pages/index/teacher/index"
    })
  },

  //跳转到新闻动态
  navigateToNews:function(){
    wx.navigateTo({
      url:"/pages/index/news/index"
    })
  },

   //跳转到关于我们
  switchTabToExperience:function(){
    wx.switchTab({
      url:"/pages/course/experience/index"
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.school_feature()
    this.get_teacher_list()
    this.get_preview_course()
    this.get_activity_post_url()
    wx.stopPullDownRefresh()
  },
})
