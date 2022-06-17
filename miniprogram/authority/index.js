const common = require('./common/index')
class index{

  static async getType(){
    let {data} = await common.getAdmin()
    if(data.length != 1){
        return -1
    }
    return data[0].type
  }

}

module.exports = index