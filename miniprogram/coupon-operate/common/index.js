const db = wx.cloud.database()
const _ = db.command
const couponAcquire = require('../../coupon-acquire/index')
const until = require('../../utils/index')
const { default: toast } = require('../../miniprogram_npm/@vant/weapp/toast/toast')
class index {
  //查询uid下今日核销的优惠券数
  static async get_uid_today_coupon_count(uid){
    let startTime = await until.getTodayStartTime()
    let endTime = await until.getTodayEndTime()
    console.log("传入的id",uid)
    let count = await db.collection('coupon-code').where({
      avaliable:true,
      owner:_.eq(uid),
      createTimestamp: _.lte(new Date(endTime)).and(_.gte(new Date(startTime)))
    }).count()
    return count.total
  }

  static async add_coupon_code_to_user(openid,code){
    let res = await db.collection('coupon-code').where({
      code,
      avaliable:true,
      owner:_.eq(null)
    }).get()
    if(res.data.length == 1){
      await db.collection('coupon-code').where({
        code
      }).update({
        data:{
          owner:openid,
          avaliable:true
        }
      })
      return res
    }else{
      return res
    }
  }

  static async add_coupon_code(){
    let code = await this.code()
    await db.collection('coupon-code').add({
      data:{
        code,
        owner:wx.getStorageSync('openId'),
        avaliable:true,
        createTimestamp:db.serverDate()
      }
    })
    toast.success('领取成功！')
    return true
  }
  static async use_coupon_code(code){
    let res = await db.collection('coupon-code').where({
      code,
      avaliable:true,
      owner:_.eq(null)
    }).get()
    if(res.data.length == 1){
      await db.collection('coupon-code').where({
        code
      }).update({
        data:{
          owner:wx.getStorageSync('openId'),
          avaliable:true
        }
      })
      return true
    }else{
      return false
    }
  }

  static async cut_coupon_code(){
    let res = await db.collection('coupon-code').where({
      avaliable:true,
      owner:wx.getStorageSync('openId')
    }).get()
    if(res.data.length >= 1){
      await db.collection('coupon-code').where({
        code:res.data[0].code
      }).update({
        data:{
          avaliable:false
        }
      })
      return true
    }else{
      return false
    }
  }

  static async coupon_code(){

    var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = 12; i > 0; --i) {
      result += str[Math.floor(Math.random() * str.length)];
    }
    await db.collection('coupon-code').add({
      data:{
        code:result,
        createTimestamp: db.serverDate(),
        avaliable:true
      }
    })
    return result
  }

  static async add(price) {
    const res = await db.collection('coupon').add({
      data: {
        price,
        type: 'monthCard',
        total: 60,
        createTimestamp: db.serverDate(),
        expiresTimestamp: db.serverDate({
          offset: 60 * 60 * 1000 * 24 * 30
        })
      }
    })
    return res
  }



  static async use() {
    let { data } = await couponAcquire.get()
    console.log(data.length)
    if (data.length === 0) {
      toast('未购买月卡')
      return false
    }
    if (data.length > 1) {
      toast('查询到多张卡片，请联系客服')
      return false
    }

    if(await couponAcquire.getTodayCount() >= 2){
      toast('今日次数用完')
      return false
    }

    toast('使用了月卡提交订单')
    const records = {
      usingTimestamp: db.serverDate()
    }
    await db.collection('coupon').doc(data[0]._id).update({
      data: {
      
          total: _.inc(-1),
          records: _.push(records)

      }
    })

    await db.collection('coupon-record').add({
      data: {
        usageTime: db.serverDate(),
        detail: data[0]
      }
    })

    return true

  }

  static async code(){
    var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = 12; i > 0; --i) {
      result += str[Math.floor(Math.random() * str.length)];
    }
    return result
  }


}
module.exports = index