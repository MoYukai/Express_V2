// pages/admin/order-panel/pages/all/popup/popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    popupShow:{
      type:Boolean
    },
    pop:{
      type:Object
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    hidePop(){
      this.triggerEvent("close")
    },
    contact(){
      const phone = this.data.pop.userAddress.phone
      wx.makePhoneCall({
        phoneNumber: phone,
      })
    }

  }
})
