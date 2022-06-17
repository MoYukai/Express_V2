// components/wallet-card/wallet-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    leftColor:{
      type:String,
      value:"#EF9861"
    },
    rightColor:{
      type:String,
      value:"#EB6946"
    },
    title:{
      type:String,
      value:"当前账户余额（元）"
    },
    number:{
      type:String,
      value:"0.00"
    },
    button:{
      type:String,
      value:"去提现"
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
    btn(){
      this.triggerEvent("btn")
    }
  }
})
