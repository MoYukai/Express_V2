wx.cloud.init({
  env: 'second-env-0gm0mwun7feb1243',
  traceUser: true,
})
const db = wx.cloud.database()
const utils = require('./utils/index')
class index{

  static checkForUpdate(){
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      console.log("是否有新版本",res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      updateManager.applyUpdate()
    })

    updateManager.onUpdateFailed(function () {
     
    })
  }

  static async userComeIn(){
    console.log("用户进入小程序")
    this._userCheck()
  }

  static async _userCheck(){
    let res = await db.collection('user').where({
      _openid:wx.getStorageSync('openId')
    }).get()
    // console.log(res.data.length)
    if(res.data.length >= 1){
      this._userUpdate()
    }else{
      this._userWrite()
    }
  }

  static async _userUpdate(){
    let config = {
      college : 12574
    }
    let res = await db.collection('user').where({
      _openid:wx.getStorageSync('openId')
    }).update({
      data:{
        config,
        updateTimestamp:db.serverDate()
      }
    })
    console.log("更新用户信息",res)
  }
  static async _userWrite(){
    let config = {
      college : 12574
    }
    const source = wx.getLaunchOptionsSync()
    let res = await db.collection('user').add({
      data:{
        config,
        source,
        createTimestamp:db.serverDate(),
        updateTimestamp:db.serverDate()
      }
    })
    console.log("新建用户信息",res)
  }

  static async saveOpenId(){
    let res = await wx.cloud.callFunction({
      name:'functions',
      data:{
        type:'getOpenId'
      }
      
    })
    wx.setStorageSync('openId', res.result.openid)
    console.log("获取到的unionID",res.result.unionid)
  }

  static async getAv(){
    let res = await db.collection('user').where({
      _openid:wx.getStorageSync('openId')
    }).get()
    if(res.data[0].userInfo == undefined){
      return
    }
    let av = 
    res.data[0].userInfo.data.avatarUrl
    console.log(av)
    wx.setStorageSync('avatarUrl', av)
  }



}

module.exports = index