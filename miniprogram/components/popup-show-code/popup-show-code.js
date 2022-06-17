// components/popup-show-code/popup-show-code.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type:Boolean,
      value:false
    },
    item:{
      type:Object
    },
    qrpath:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes:{
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose(){
      this.triggerEvent("onClose")
    },
    service(){
      this.triggerEvent("service")
    }
  }
})
