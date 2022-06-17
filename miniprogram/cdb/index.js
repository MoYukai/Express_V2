class index{

  static async get(collection,query,orderBy,DEAsc){

   let res = await wx.cloud.callFunction({
      name:"functions",
      data:{
        type:'cdb',
        collection,
        query,
        orderBy,
        DEAsc
      }
    })

    return res

  }

}
module.exports = index