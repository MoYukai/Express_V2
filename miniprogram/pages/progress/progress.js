import toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const model = require('./model')
const orderAcquire = require("../../order-acquire/index")
const userOperate = require("../../user-operate/index")
const couponOperate = require("../../coupon-operate/index")
const couponAcquire = require("../../coupon-acquire/index")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    pickingList: '',
    pickingPop: '',
    active: 0,
    deliveringList: '',
    wxPhone: '17388656686'
  },
  onClose() {

  },
  onCancel() {
    this.setData({
      show:false
    })
  },
  copyWx(e) {
    console.log(e.target.dataset.phone)
    wx.setClipboardData({
      data: e.target.dataset.phone,
    })
  },
  async confirm(e) {
    // let res = await userOperate.writeUserInfo(e.detail.userInfo)
    this.onShareAppMessage()
  },
  reLoad() {
    this.onShow()
  },
  refundDetail() {
    wx.navigateTo({
      url: '../wallet/wallet',
    })
  },
  // 取件中弹窗按钮
  pickingDetail(e) {
    this.setData({
      pickingPop: e.detail,
      pickingShow: true
    })
  },
  //派送中弹窗按钮
  deliveringDetail(e) {
    this.setData({
      deliveringPop: e.detail,
      deliveringShow: true
    })
  },

  //已完成弹窗按钮
  completedDetail(e) {
    this.setData({
      completedPop: e.detail,
      completedShow: true
    })
  },

  // 取消/退款弹窗按钮
  cancelledDetail(e) {
    this.setData({
      cancelledPop: e.detail,
      cancelledShow: true
    })
  },



  // 关闭所有弹窗
  _hideAllPop() {
    this.setData({
      cancelledShow: false,
      pickingShow: false,
      deliveringShow: false,
      completedShow: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.index) {
      this.setData({
        active: parseInt(options.index)
      })
    } else {
      console.log("无参数进入")
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    this.selectComponent('#picking-up').loadData()
    this.selectComponent('#delivering').loadData()
    this.selectComponent('#completed').loadData()
    this.selectComponent('#cancelled').loadData()
    let dotList = await orderAcquire.getOrderTabDot()
    this.setData({
      dotList
    })

    let res2 = await orderAcquire.getOrderByStatus(1, 2)
    let myTodayCouponCout = await couponOperate.get_uid_today_coupon_count(wx.getStorageSync('openId'))
    console.log("今日优惠券下载次数",myTodayCouponCout)
    if (res2.data.length >= 1) {
      this.setData({
      show: true
      })
    }
  },





  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // this.onClose()
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

    this.onShow()
    wx.stopPullDownRefresh({

    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  async onShareAppMessage () {
    console.log("计数")
    let code =  await couponOperate.new_coupon_code()
    return {
      title: "我来帮你拿快递啦~",
      path:'pages/index/index?Recommender='+wx.getStorageSync('openId')+'&Code='+code,
      imageUrl:'../../static/images/indexsc.jpeg',
      success: function(res) {
        console.log(res, "转发成功")
      },
      fail: function(res) {
        console.log(res, "转发失败")
      }
    }
  },
 async onShareTimeline() {
    return {
      title: '袋友速递', // 我是分享后显示的标题,可不填
      query: '', // id=123, 可不填 传递的参数，只能是这种格式
      imageUrl: '' // 可不填,可以是网络路径也可以是本地路径，分享到朋友圈显示的图标
    }
  }
  
  
})