const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  console.log("ceshi")
  let timestamp = new Date().getTime()
  return timestamp

}