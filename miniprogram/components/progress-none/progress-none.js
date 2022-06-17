// components/progress-none/progress-none.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    btntitle:{
      type:String,
      value:'去发单'
    },
    none:{
      type:Boolean,
      value:true
    },
    title:{
      type:String,
      value:"无订单"
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
    goto(){
      // this.triggerEvent("noneBtn")
      wx.switchTab({
        url: '../../pages/orderRelease/orderRelease',
      })
    }
  }
})
