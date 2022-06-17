import Dialog from '../../../../../miniprogram_npm/@vant/weapp/dialog/dialog';
const orderOperate = require('../../../../../order-operate/index')
const orderAcquire = require('../../../../../order-acquire/index')
import Toast from '../../../../../miniprogram_npm/@vant/weapp/toast/toast';
class index{

  static async orderPick(e){
    let orderId = e.target.dataset.pop._id
    let flag = false

    const beforeClose = (action) => new Promise((resolve) => {
      if(action === "cancel"){
        resolve(true)
      }else{
        orderOperate.orderPick(orderId).then(res=>{
          if(res){
            Toast('接单成功')
            flag = true
          }
          
          resolve(true)
        })
      }

    })

    await Dialog.confirm({
      title: '确认接单',
      message: '点击确认，将当前订单放入我的取货栏',
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