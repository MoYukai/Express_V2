const common = require('./common/index')
class index{

  static async writeUserInfo(userInfo){
    if(!userInfo){
      //用户拒绝了
      console.log("用户拒绝了获取信息")
      return
    }

    if(await common.checkUserInfo()){
      //已有用户信息的情况
      return await common.updateUserInfo(userInfo)

    }

    if(!await common.checkUserInfo()){
      //没有用户信息的情况
      return await common.addUserInfo(userInfo)
    }

  }


}

module.exports = index