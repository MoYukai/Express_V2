const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  console.log(event.query)
  let res = await db.collection(event.collection)
  .where(event.query).orderBy(event.orderBy,event.DEAsc).get()

  return {
    res
  }
}