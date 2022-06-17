import Dialog from '../../../../../miniprogram_npm/@vant/weapp/dialog/dialog';
const orderOperate = require('../../../../../order-operate/index')
const orderAcquire = require('../../../../../order-acquire/index')
import Toast from '../../../../../miniprogram_npm/@vant/weapp/toast/toast';
class index{

  static async orderDelivery(e){
    let orderId = e.target.dataset.pop._id
    let flag = false

    const beforeClose = (action) => new Promise((resolve) => {
      if(action === "cancel"){
        resolve(true)
      }else{
        orderOperate.orderDelivery(orderId).then(res=>{
          if(res){
            Toast('取货成功')
            flag = true
          }
          
          resolve(true)
        })
      }

    })

    await Dialog.confirm({
      title: '确认接单',
      message: '点击确认，确认取到快递',
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