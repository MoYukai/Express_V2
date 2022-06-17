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
    pickingList:''
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
        pickingList:data
      })
    },
    detail(e) {
      this.triggerEvent("detail",this.data.pickingList[e.target.dataset.popidx])
    },

  }
})
