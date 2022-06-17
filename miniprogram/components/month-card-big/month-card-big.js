// components/month-card-big/month-card-big.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    buy:{
      type:Boolean,
      value:false
    },
    expire:{
      type:String, 
      value:'----------'
    },
    count:{
      type:String,
      value:'--'
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
      this.triggerEvent('buy')
    },
    use(){
      this.triggerEvent('use')
    }
  }
})
