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
    deliveringList:""
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
        deliveringList:data
      })
    },
    detail(e) {
      this.triggerEvent("detail", this.data.deliveringList[e.target.dataset.popidx])
    },

  }
})
