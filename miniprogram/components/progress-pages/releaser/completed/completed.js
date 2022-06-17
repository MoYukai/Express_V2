const model = require('./model')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    completedList:""
  },
  lifetimes:{
    async attached(){
      
      this.loadData()
     }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    async loadData(){
      let {data} = await model.getOrderList()
      this.setData({
        completedList:data
      })
    },
    detail(e) {
      this.triggerEvent("detail", this.data.completedList[e.target.dataset.popidx])
    },
  }
})
