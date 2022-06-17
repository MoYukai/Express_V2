const { default: toast } = require('../../../../../miniprogram_npm/@vant/weapp/toast/toast')
const orderAcquire = require('../../../../../order-acquire/index')
const util = require('../../../../../utils/index')
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
    nowPage:1,

  },
  lifetimes:{
    created (){
      this.loadData()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async loadData(){
      let res = await orderAcquire.adminGetOrderStatusTwoSPCloud(2,3,this.data.nowPage,20)
      console.log("进行中数据",res)
      this.setData({
        processingList: res
      })
     },

     async nextPage(){
      toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      this.setData({
        nowPage:this.data.nowPage+1
      })
      let nextData = await orderAcquire.adminGetOrderStatusTwoSPCloud(2,3,this.data.nowPage,20)
      console.log("下一页的数据",this.data.nowPage,nextData)

      this.setData({
        processingList : this.data.processingList.concat(nextData)
      })
      if(nextData == ''){
        toast("已经到底了哦")
      }else{
        toast.clear()
      }
      console.log(this.data.processingList)
      
    },

  }
})
