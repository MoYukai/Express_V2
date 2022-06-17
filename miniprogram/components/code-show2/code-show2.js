// components/code-show/code-show.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    code:{
      type:String,
      value:"00-0-0000"
    },
    name:{
      type:String,
      value:"请传入驿站参数"
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
    makeCall(){
      this.triggerEvent("makeCall")
    }

  }
})
