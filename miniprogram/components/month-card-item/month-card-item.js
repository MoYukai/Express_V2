// components/month-card-item/month-card-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:"快递代拿免费"
    },
    desc:{
      type:String,
      value:"今日可用2次"
    },
    icon:{
      type:String,
      value:"../../static/icon/free.svg"
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
    use(){
      this.triggerEvent("use")
    }
  }
})
