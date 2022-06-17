// components/month-card-release/month-card-release.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bought:{
      type:Boolean,
      value:false
    },
    today_remain:{
      type:String,
      value:"2"
    },
    day_remain:{
      type:String,
      value:"30"
    },
    boughtDesc:{
      type:String,
      value:"已购买袋鼠月卡 · 本单免费"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    month_card:false,
    bought:false,
    today_remain:2,
    day_remain:30
  },
  lifetimes:{

  },

  /**
   * 组件的方法列表
   */
  methods: {
    reset(){
      this.setData({
        month_card:false
      })
    },
    radio(){
      if(this.data.month_card == true){
        this.setData({
          month_card:false
        })
        this.triggerEvent("monthCardOperate",false)
      }else{
        this.setData({
          month_card:true
        })
        this.triggerEvent("monthCardOperate",true)
      }
    },
    help(){
      this.triggerEvent("help")
    }
  }
})
