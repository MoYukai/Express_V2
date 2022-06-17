// components/popup-button/popup-button.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cancel:{
      type:String,
      value:"取消订单"
    },
    back:{
      type:String,
      value:"返回"
    },
    bottom:{
      type:String,
      value:"55"
    },
    single:{
      type:Boolean,
      value:false
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
    cancel(){
      this.triggerEvent("cancel")
    },
    back(){
      this.triggerEvent("back")
    }
  }
})
