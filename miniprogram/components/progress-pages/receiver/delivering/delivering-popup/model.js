import Dialog from '../../../../../miniprogram_npm/@vant/weapp/dialog/dialog';
const orderOperate = require('../../../../../order-operate/index')
const orderAcquire = require('../../../../../order-acquire/index')
import Toast from '@vant/weapp/toast/toast';
const utils = require('../../../../../utils/index')
class index {

  static async orderComplete(e) {
    let orderId = e.target.dataset.pop._id
    let flag = false
    let fileID = await utils.uploadSingleImage()

    if (fileID) {
      Toast.loading({
        message: '上传图片中',
        forbidClick: true
      })
      await orderOperate.orderUpdateDeliveryImg(orderId, fileID)
      await orderOperate.orderComplete(orderId)
      Toast('上传成功')
      flag = true
    } else {
      Toast('取消上传')
    }


    // const beforeClose = (action) => new Promise((resolve) => {
    //   if(action === "cancel"){
    //     resolve(true)
    //   }else{
    //     orderOperate.orderComplete(orderId).then(res=>{
    //       if(res){
    //         Toast('取货成功')
    //         flag = true
    //       }

    //       resolve(true)
    //     })
    //   }

    // })

    // await Dialog.confirm({
    //   title: '拍照',
    //   message: '拍照送达订单',
    //   transition:'fade',
    //   beforeClose

    // }).then(res=>{

    // })
    // .catch(err=>{

    // })


    return flag
  }
}
module.exports = index