const model = require('./model')
import toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const couponAcquire = require('../../coupon-acquire/index')
const userOperate = require('../../user-operate/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    address: [
      "18Mall菜鸟驿站",
      "阳光在线广场菜鸟驿站",
      "顺丰驿站",
      "京东小蜜蜂"
    ],
    address_idx: 0,
    userAddress: '',
    monthCardBought: false,
    boughtDesc: "已买袋鼠月卡 · 本单免费",
    userInfoPopShow: false,
    userInfo: '',
    free_code:'',
    size_radio:'1'
  },
  onChangeSize(e){
    console.log(e)
    this.setData({
      size_radio:e.detail
    })
    if(this.data.size_radio == '1'){
      //初始小件
      this.setData({
        price:this.data.price_backup,
      })
      return 
    }
    if(this.data.size_radio == '2'){
      //中件
      this.setData({
        price_backup:this.data.price,
        price : this.data.price + 300
      })
      return
    }
  },
  closeUserInfoPop() {
    this.setData({
      userInfoPopShow: false
    })
  },
  async getUserInfo(e) {
    if (e.detail.errMsg == 'getUserProfile:fail auth deny') {
      console.log("用户拒绝授权")
      toast('请同意授权')
    } else {
      console.log("用户同意授权", e.detail.userInfo)
      Toast.loading({
        message: '提交订单中…',
        forbidClick: true
      });
      await userOperate.writeUserInfo(e.detail.userInfo)
      //  存在免费次数情况
      if(this.data.free_code_count >= 1){
        this.onSubmit_withFreeCode()
        return
      }

      //非购买月卡情况
      if (!this.data.monthCardBought) {
        this.onSubmit_noMonthCard()
        return
      }
      //购买了月卡的情况
      if (this.data.monthCardBought) {
        this.onSubmit_withMonthCard()
        return
      }
    }


  },
  async showUserInfoPop() {
    console.log("用户信息", this.data.userInfo)
    this.setData({
      userInfoPopShow: true
    })



  },
  codeInput(e) {
    this.setData({
      code: e.detail
    })
  },
  // 提交订单按钮
  async onSubmit() {
    if (!this.data.code) {
      Toast('请输入取件码')
      return
    }
    if (!this.data.userAddress) {
      Toast('请完善收货地址')
      return
    }


    this.showUserInfoPop()





  },

  async onSubmit_noMonthCard() {
    let res = await model.orderRelease(this.data.userAddress, this.data.code, this.data.address[this.data.address_idx], this.data.price, "normal", this.data.originalFee)
    if (res) {
      Toast('提交成功！')
      this.setData({
        code: ''
      })
      wx.navigateTo({
        url: '../progress/progress',
      })
    } else {
      Toast('提交失败！')
    }
  },
  async onSubmit_withMonthCard() {
    let res = await model.orderRelease(this.data.userAddress, this.data.code, this.data.address[this.data.address_idx], this.data.price, "monthCard", this.data.originalFee)
    if (res) {
      Toast('提交成功！')
      this.setData({
        code: ''
      })
      wx.navigateTo({
        url: '../progress/progress',
      })
    } else {
      Toast('提交失败！')
    }
  },
  async onSubmit_withFreeCode() {
    console.log(this.data.price)
    console.log(this.data.originalFee)
    let res = await model.orderRelease(this.data.userAddress, this.data.code, this.data.address[this.data.address_idx], this.data.price, "freeCode", this.data.originalFee)
    console.log(res)
    if (res) {
      Toast('提交成功！')
      this.setData({
        code: ''
      })
      wx.navigateTo({
        url: '../progress/progress',
      })
    } else {
      Toast('提交失败！')
    }
  },
  select(e) {
    this.setData({
      address_idx: e.detail
    })
    console.log(this.data.address_idx)
  },
  gotoAddress() {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  resetTotal(price) {
    this.setData({
      price
    })
  },
  setOriginalFee(originalFee) {
    this.setData({
      originalFee
    })
  },
  monthCardOperate(boolen) {
    this.setData({
      monthCardBought: boolen.detail
    })
    if (this.data.monthCardBought == true) {
      this.setData({
        previous_price: this.data.price
      })
      this.resetTotal(1900)
    } else {
      this.setData({
        price: this.data.previous_price
      })
    }
  },
  monthCardHelp() {
    wx.navigateTo({
      url: '../monthcard-buy/monthcard-buy',
    })
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
  async onShow(options) {
    let res = await couponAcquire.get()
    if (res.data.length == 1) {
      this.setData({
        monthCardType: true
      })
    }
    //TODO:获取用户免费券数量
    let res0 = await couponAcquire.get_coupon_code()
    let res9 = await couponAcquire.get_coupon_code_count()
    console.log("mf",res0.data.length)
    console.log("sss",res9.total)
    this.setData({
      free_code:res0.data
    })
    this.setData({
      free_code_count:res9.total
    })




    let res2 = await couponAcquire.getTodayCount()
    console.log(res2)
    this.setData({
      today_remain: 2 - res2
      // today_remain:2
    })

    if (this.data.today_remain == 0) {
      this.setData({
        boughtDesc: '本日次数已用完~'
      })
    }

    let s = await couponAcquire.getRemainDays()
    this.setData({
      day_remain: s
    })

    console.log("缓存中的取件码", wx.getStorageSync('temp-code'))
    if (wx.getStorageSync('temp-code')) {
      console.log("存在取件码缓存")
      this.setData({
        code: wx.getStorageSync('temp-code')
      })
    }
    Toast.loading({
      message: '加载中...',
      forbidClick: true
    })
    this.selectComponent("#month-card-release").reset()
    let userAddress = await model.getAddress()
    this.setData({
      userAddress
    })
    console.log("获取", this.data.userAddress)
    this.setData({
      monthCardBought : false
    })
    if (this.data.userAddress.dorm_name == "新生宿舍") {
      this.resetTotal(300)
      this.setOriginalFee(300)
    } else if (this.data.userAddress.dorm_name == "东软小镇") {
      this.resetTotal(200)
      this.setOriginalFee(200)
    } else {
      this.resetTotal(200)
      this.setOriginalFee(200)
    }
    Toast.clear()
    console.log(this.data.today_remain)
    //月卡有效的情况下的下单
    if (this.data.today_remain != 0) {
      if (this.data.userAddress.dorm_name == "新生宿舍") {
        this.resetTotal(0)
        this.setOriginalFee(300)
      } else if (this.data.userAddress.dorm_name == "东软小镇") {
        this.resetTotal(0)
        this.setOriginalFee(200)
      } else {
        this.resetTotal(0)
        this.setOriginalFee(200)
      }
    }

    if(this.data.free_code_count >= 1){
      //存在免费码
      if (this.data.userAddress.dorm_name == "新生宿舍") {
        this.resetTotal(0)
        this.setOriginalFee(300)
      } else if (this.data.userAddress.dorm_name == "东软小镇") {
        this.resetTotal(0)
        this.setOriginalFee(200)
      } else {
        this.resetTotal(0)
        this.setOriginalFee(200)
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.setStorageSync('temp-code', '')
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