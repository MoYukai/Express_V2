const { default: toast } = require('../../../../../miniprogram_npm/@vant/weapp/toast/toast')
const orderAcquire = require('../../../../../order-acquire/index')
const util = require('../../../../../utils/index')
Component({
  externalClasses:
    ['in-page'],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    waitingList:'',
    nowPage:1,
    popupShow:false,
    windowHeight:''


  },
  lifetimes:{
    created(){
      this.loadData()
    }

  },


  methods: {
    async nextPage(){
      toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      this.setData({
        nowPage:this.data.nowPage+1
      })
      let nextData = await orderAcquire.adminGetOrderStatusOneSPCloud(1,this.data.nowPage,20)
      console.log("下一页的数据",this.data.nowPage,nextData)

      this.setData({
        waitingList : this.data.waitingList.concat(nextData)
      })
      if(nextData == ''){
        toast("已经到底了哦")
      }else{
        toast.clear()
      }
      console.log(this.data.waitingList)
      
    },

    async loadData(){
     let res = await orderAcquire.adminGetOrderStatusOneSPCloud(1,this.data.nowPage,20)
     console.log(res)
     this.setData({
       waitingList:res
     })
    },

    clickRow(e){
      console.log(e.currentTarget.dataset.orderdata)
      this.setData({
        popupShow:true,
        popupOrderData:e.currentTarget.dataset.orderdata
      })
    },

    popUpClose(){
      this.setData({
        popupShow:false
      })

    }

  }
})
