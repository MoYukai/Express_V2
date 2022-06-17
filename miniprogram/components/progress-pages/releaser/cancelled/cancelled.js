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
    cancelledList: ''
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
        cancelledList:data
      })
    },
    detail(e){

      this.triggerEvent("detail", this.data.cancelledList[e.target.dataset.popidx])
    },

  }
})
