import toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const assetsOperate = require('../../assets-operate/index')
const assetsAurire = require('../../assets-acquire/index')
const uniformMessage = require('../../uniform-message/index')
const couponAcquire = require('../../coupon-acquire/index')
const orderAcquire = require('../../order-acquire/index')
const couponOperate = require('../../coupon-operate/index')
const utils = require('../../utils/index')
const vms = require('../../utils/vms/index')
const map = require('../../utils/map/index')
const userAcquire = require("../../user-acquire/index")
Page({

  data: {
    new_pop_show:false,
    time: 60 * 1000,
    monthCardType: false,
    join_popup_show: false
  }, 
  async new_pop_btn(){
    this.onClose()
    await couponOperate.add_coupon_code()
    wx.switchTab({
      url: '../orderRelease/orderRelease',
    })
  },
  onChange(e) {
    this.setData({
      timeData: e.detail,
    });
  },
  countFinish(){
    this.setData({
      new_pop_show:false
    })
  },
  onClose() {
    this.setData({ new_pop_show: false });
  },
  header() {
    wx.switchTab({
      url: '../me/me',
    })
  },
  async header_arrow() {
    // this.setData({
    //   join_popup_show: true
    // })
    //  let res = await vms.Completed("13516615663")
  },
  join_popup_onclose() {
    this.setData({
      join_popup_show: false
    })
  },
  monthCardHelp() {
    wx.navigateTo({
      url: '../monthcard-buy/monthcard-buy',
    })
  },
  buyMonthCard() {
    wx.navigateTo({
      url: '../monthcard-buy/monthcard-buy',
    })
  },

  /** 进入接单点击监听 */
  join() {
    if (this.data.address) {
      wx.navigateTo({
        url: '../member-page/member-page',
      })
      return
    }

    if (!this.data.address) {
      wx.navigateTo({
        url: '../user-info/user-info',
      })
    }

  },
  async next(e) {
    if (e.detail) {
      wx.setStorageSync('temp-code', e.detail)
    }
    wx.switchTab({
      url: '../orderRelease/orderRelease',
    })
  },
  free() {
    wx.navigateTo({
      url: '../customer-service/customer-service',
    })
  },
  async uploadQRCode() {
    let res = await assetsOperate.updateQRCode()
    if (res) {
      toast('上传成功')
    }
    this.selectComponent('#uploadQRCode').loadData()
  },


  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (options) {
    let recommender = options.Recommender
    let code = options.Code
    let user_order_count = await userAcquire.getUserOrderCount()
    console.log("用户下单数"+user_order_count)
    let mycount = await couponOperate.get_uid_today_coupon_count(wx.getStorageSync('openId'))
    console.log("我的今日领券次数",mycount)
    if(user_order_count <= 2 && mycount < 6){
      this.setData({
        new_pop_show:true
      })
    }
    //正常进入首页
    if(!recommender&&!code){

      return
    }
    //经过推荐人进入首页
    //toast("推荐人是："+recommender+"兑换码是"+code)
    // user_order_count = "0"
    if(user_order_count <= 2){
      let ee = await couponOperate.add_coupon_code_to_user(recommender,code)
      console.log("给对方加优惠券结果",ee)
      if(ee != false){
        console.log("发送消息结果",await uniformMessage.rewardReceipt(recommender))
      }


    }else{
      toast("该活动仅限新用户参与哦~")
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

    this.selectComponent('#header').setHeader()
    let address = await assetsAurire.getAddress()
    console.log(address)
    this.setData({
      address
    })
    // let ress = await uniformMessage.sendCheckoutSuccess(wx.getStorageSync('openId'))
    //  console.log(ress)
    let res = await couponAcquire.get()
    if (res.data.length == 1) {
      this.setData({
        monthCardType: true
      })
    }
    console.log(this.data.monthCardType)

    let res2 = await orderAcquire.getOrderByStatus(2)
    if (res2.data.length >= 1) {
      this.setData({
        haveOrder: true
      })
    }
    let group = [{
      lat:"113.023946",
      lng:"23.154494"
    },{
      lat:"113.019922",
      lng:"23.135486"
    },{
      lat:"113.04385223.136616",
      lng:"23.136616"
    },{
      lat:"113.048883",
      lng:"23.160807"

    }]
 
      let res3 = await wx.getLocation({
        type:'wgs84',
      })

            this.setData({
              gps:res3
            })
            let ww = await map.isPointInPolygon(group,this.data.gps.longitude,this.data.gps.latitude)
        this.setData({
          in_neusoft:ww
        })
        console.log(this.data.in_neusoft)

  // let g =  await  wx.getLocation({
  //     type: 'wgs84',
  //   })
  //   console.log(g)
  //   this.setData({
  //     gps:g
  //   })
    

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