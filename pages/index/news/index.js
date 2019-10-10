// pages/index/activity/index.js
var call = require('../../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    news_list:[],
    page_index:1,
    page_size:10,
    flag:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '新闻动态'
    })
    this.get_news_list()
  },

  //新闻动态
  get_news_list:function(){
    //console.log(this);
    if (this.data.flag){
      
      let url = '/mini_get_news_list';
      let params = {
        page_index:this.data.page_index,
        page_size:this.data.page_size
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
                news_list:this.data.news_list.concat(data),
                page_index:this.data.page_index + 1
              });
        }
      )
    }

  },

  initData:function(){
    this.setData({
      news_list:[],
      page_index:1,
      page_size:10,
      flag:1,
    });
  },

  //点击老师
  news_detail:function(e){
    var id = e.currentTarget.dataset.src;
    wx.navigateTo({
      url: "/pages/index/detail/index?id="+id+"&type=2"
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
    this.get_news_list()
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