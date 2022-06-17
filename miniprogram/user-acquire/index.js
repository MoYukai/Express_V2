const common = require('./common/index')

class index{
static async getUserOrderCount(){
  return await common.getUserOrderCount()
}
  static async getUserCount(){
    let result = await common.getUserCount()
    result = result.total
    return result
  }

  static async getTodayUserCount(){
    let result = await common.getTodayUserCount()
    console.log(result)
    result = result.total
    return result
  }
}

module.exports = index