// components/month-card/month-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    monthCardType:{
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
    buy(){
      this.triggerEvent("buy")
    },
    help(){
      this.triggerEvent("monthCardHelp")
    }
  }
})
