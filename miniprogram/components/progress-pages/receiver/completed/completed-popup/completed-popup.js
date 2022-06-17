const model = require('./model')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
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
    reLoad(){
      this.triggerEvent("reLoad")
    },
    hidePop(){
      this.triggerEvent("hidePop")
    },
    showPic(e){
      wx.previewImage({
        urls: [e.target.dataset.img],
      })
    },
    async contact(e){
     wx.makePhoneCall({
       phoneNumber: e.target.dataset.pop.userAddress.phone,
     })

    },
    back(){
      this.triggerEvent("back")
    }
  }
})
