const { default: toast } = require('../../../../miniprogram_npm/@vant/weapp/toast/toast')
const orderAcquire = require('../../../../order-acquire/index')
const utils = require('../../../../utils/index')
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
    poolList:''
  },
  lifetimes:{
    attached(){
      this.loadData()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    async loadData(){
      toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'circular',
      });
      let {data} = await orderAcquire.getOtherOrderByStatus(1)
      // data = await utils.createDateToTimestamp(data)
      console.log(data)
      this.setData({
        poolList:data
      })
      toast.clear()
    },
    detail(e){
      this.triggerEvent("detail",this.data.poolList[e.target.dataset.popidx])
    }
  }
})
