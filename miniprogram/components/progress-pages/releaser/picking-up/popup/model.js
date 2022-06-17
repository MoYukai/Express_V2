import Dialog from '../../../../../miniprogram_npm/@vant/weapp/dialog/dialog';
const orderOperate = require('../../../../../order-operate/index')
const orderAcquire = require('../../../../../order-acquire/index')
const assetsOperate = require('../../../../../assets-operate/index')
import Toast from '../../../../../miniprogram_npm/@vant/weapp/toast/toast';
class index{
  
  static async orderCancel(pop,reason){
    let flag = false

    const beforeClose = (action) => new Promise((resolve) => {
      if(action === "cancel"){
        resolve(true)
      }else{
        orderOperate.orderCancel(pop._id,reason).then(res=>{
          if(res){
            Toast('取消成功')
            resolve(true)
            flag = true
          }
        })
        assetsOperate.refund(pop.totalFee,pop).then(res=>{
          console.log(res)
          resolve(true)
        })
      }

    })

  await Dialog.confirm({
      title: '确认取消',
      message: '点击确认提交取消订单申请，1-3小时完成审核，请耐心等待',
      transition:'fade',
      beforeClose

    }).then(res=>{

    })
    .catch(err=>{

    })

    return flag
    
  }

}
module.exports = index