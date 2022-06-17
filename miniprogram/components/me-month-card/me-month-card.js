// components/me-month-card/me-month-card.js
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
    buyMonthCard(){
      this.triggerEvent("buy")
    }
  }
})
