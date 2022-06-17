const { default: toast } = require("../../../../../miniprogram_npm/@vant/weapp/toast/toast")

// components/progress-pages/admin/module/row/row.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderData:{
      type:Object
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    progress:[
      {
        desc:"已接单",
        time:"10/03 12:18"
      },
      {
        desc:"正在配送中",
        time:"10/04 12:33"
      },
      {
        desc:"已送达",
        time:"10/04 19:00"
      }
    ]

  },

  /**
   * 组件的方法列表
   */
  methods: {
    contactRunner(e){
      const runnerPhone = e.currentTarget.dataset.orderdata.pickerDataLookUp[0].userData.address.phone
      wx.makePhoneCall({
        phoneNumber:runnerPhone,
      })
    }

  }
})
