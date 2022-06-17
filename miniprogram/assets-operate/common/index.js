const db = wx.cloud.database()
const _ = db.command
import toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const utils = require('../../utils/index')
class index {

  static async addBalance(totalFee, describe, orderInfo) {
    const detail = {
      balanceDelta: totalFee,
      describe,
      orderInfo,
      timestamp: db.serverDate()
    }
    console.log(detail)
    const res = await db.collection('user').where({
      _openid: wx.getStorageSync('openId')
    }).update({
      data: {
        userAssets: {
          balance: _.inc(totalFee),
          record: _.push(detail)
        }
      }
    })
    return res
  }

  static async addBalanceByOpenID(totalFee, describe, orderInfo,openID) {
    const detail = {
      balanceDelta: totalFee,
      describe,
      orderInfo,
      timestamp: db.serverDate()
    }
    console.log(detail)
    const res = await db.collection('user').where({
      _openid: openID
    }).update({
      data: {
        userAssets: {
          balance: _.inc(totalFee),
          record: _.push(detail)
        }
      }
    })
    return res
  }

  static async decBalance(totalFee, describe) {
    const detail = {
      balanceDelta: -totalFee,
      describe,
      timestamp: db.serverDate()
    }
    console.log(detail)
    const res = await db.collection('user').where({
      _openid: wx.getStorageSync('openId')
    }).update({
      data: {
        userAssets: {
          balance: _.inc(-totalFee),
          record: _.push(detail)
        }
      }
    })
    return res
  }

  static async addQRCode() {
    let fileID = await utils.uploadSingleImageFromAlbum()
    toast.loading({
      duration: 500,
      forbidClick: true,
      message: "上传中"
    })
    console.log(fileID)
    //用户取消了上传操作
    if (!fileID) {
      toast('你取消了上传')
      return false
    }
    let res = await db.collection('user').where({
      _openid: wx.getStorageSync('openId')
    }).update({
      data: {
        userAssets: {
          QRCode: {
            path: fileID,
            updateTimestamp: db.serverDate()
          }
        }
      }
    })
    return true
  }



}
module.exports = index