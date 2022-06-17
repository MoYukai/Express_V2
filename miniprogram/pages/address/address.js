import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const model = require("./model.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    sms_show: false,
    sms_btn: '重发',
    sms_num: -1,
    user: {
      room: "",
      name: "",
      phone: "",
      college_name: "广东东软学院",
      dorm_name: "新生宿舍",
      dorm_number: "JAVA1"
    },
    college: [{
      name: "广东东软学院",
      dorm: [{
          name: "新生宿舍",
          number: ["JAVA1", "JAVA2", "JAVA3", "JAVA4"]
        },
        {
          name: "东软小镇",
          number: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
        }
      ]
    }]
  },
  next() {
    // console.log("ceshi",typeof(this.data.user))
      if (!this.data.user.room) {
        Toast('请输入房间号')
        return
      }



      if (!this.data.user.name) {
        Toast('请输入姓名')
        return
      }



      if (!this.data.user.phone) {
        Toast('请输入电话')
        return
      }



      if (!(/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.data.user.phone))) {
        Toast('电话号码错误')
        return
      }




    if (this.data.sms_num != -1) {
      this.sms_onShow()
      return
    }

    this.sms_onShow()
    var random = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
    console.log(random)
    this.setData({
      random
    })

    this.send_sms(this.data.user.phone, random)

  },
  async sms_next() {
    if (this.data.random == this.data.sms && this.data.user.phone == this.data.sms_phone) {
      console.log("符合")
      await model.saveAddress(this.data.user)
      Toast('更新成功！')
      this.sms_onClose()
      wx.navigateBack({
        delta: 0,
      })
      return
    }
    Toast('验证码错误！')
  },
  async send_sms(phone, code) {

    Toast.loading({
      message: '发送中...',
      forbidClick: true,
      loadingType: 'spinner',
    });
    this.sms_btn_ing()
    console.log(await model.sendSms(phone, code))
    this.setData({
      sms_phone: phone
    })
    Toast.clear()
    Toast('发送成功！');
    this.sms_btn_run()
  },
  sms_resend() {
    if (!this.data.sms_btn_active) {
      return
    }
    this.send_sms()
  },
  sms_btn_ing() {
    this.setData({
      sms_btn: '发送中..',
      sms_btn_active: false
    })
  },
  sms_btn_run() {
    this.setData({
      sms_num: 30
    })
    let inter = setInterval(() => {
      this.setData({
        sms_num: this.data.sms_num - 1,
        sms_btn: this.data.sms_num + 's',
        sms_btn_active: false
      })
      if (this.data.sms_num == -1) {
        this.setData({
          sms_btn: '重发',
          sms_btn_active: true
        })
        clearInterval(inter)
      }
    }, 1000)

  },
  dorm_select(e) {
    this.setData({
      'user.dorm_name': e.target.dataset.dorm
    })
    if (e.target.dataset.dorm == this.data.college[0].dorm[0].name) {
      console.log("1")
      this.setData({
        "user.dorm_number": this.data.college[0].dorm[0].number[0]
      })
    }
    if (e.target.dataset.dorm == this.data.college[0].dorm[1].name) {
      this.setData({
        "user.dorm_number": this.data.college[0].dorm[1].number[0]
      })
    }
    console.log(this.data.user.dorm_name)
  },
  handler() {

  },
  onChange(event) {
    // const { picker, value, index } = event.detail;
    // Toast(`当前值：${value}, 当前索引：${index}`);
  },
  selectNumber() {
    this.pop_onShow()
  },
  pop_onShow() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  sms_onClose() {
    this.setData({
      sms_show: false
    })
  },
  sms_onShow() {
    this.setData({
      sms_show: true
    })
  },
  onConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    console.log(value)
    this.setData({
      'user.dorm_number': value
    })
    this.onClose()
  },
  roomInput(e) {

    this.setData({
      'user.room': e.detail.value
    })

  },
  nameInput(e) {
    this.setData({
      'user.name': e.detail.value
    })
  },
  phoneInput(e) {
    this.setData({
      'user.phone': e.detail.value
    })
  },
  smsInput(e) {
    this.setData({
      sms: e.detail.value
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
  async onShow() {
    let user = await model.getAddress()
    if(!user){
      return
    }
    if(user == undefined){

    }else{
      this.setData({
        user
      })
    }

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