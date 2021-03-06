// pages/entry.js
const componentList = [
  {
    name: '顶部切换',
    key: 'topbar'
  },
  {
    name: '列表状态',
    key: 'list-status'
  },
  {
    name: '选项组',
    key: 'select-group'
  },
  {
    name: '日历',
    key: 'calendar'
  },
  {
    name: '音频播放器',
    key: 'audio-player'
  },
  {
    name: '通知消息',
    key: 'notice'
  },
  {
    name: '录音',
    key: 'voice-word'
  },
  {
    name: '页面按钮',
    key: 'page-button'
  }
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    componentList: [ ...componentList ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  goComponentPage (e) {
    let { currentTarget: { dataset: { key } } } = e

    wx.navigateTo({
      url: `/pages/${key}`
    })
  }
})
