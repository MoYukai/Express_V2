const db = wx.cloud.database()
const _ = db.command

/** 
 * 向云数据库新增一条数据, 
 * 默认携带创建时间、更新时间、删除时间三个字段13位时间戳
 * @param {string} collectionName 目标集合名称
 * @param {object} addData 需要插入的数据对象
 */
const add = async (collectionName, addData = {}) => {
  const nowTime = new Date().getTime()
  addData.createTime = nowTime
  addData.updateTime = nowTime
  addData.deleteTime = null
  return await db.collection(collectionName)
    .add({
      data: addData
    })
}


/** 
 * 软删除云数据库数据（逻辑删除）
 * 原理:将对应条目的deleteTime更新赋值
 * @param {string} collectionName 目标集合名称
 * @param {string} whereObj 软删除检索条件
 */
const deleteByWhere = async (collectionName, whereObj) => {
  return await db.collection(collectionName)
    .where(whereObj)
    .update({
      data: {
        deleteTime: new Date().getTime()
      }
    })
}

/** 
 * 软删除云数据库数据（逻辑删除）
 * 原理:将对应条目的deleteTime更新赋值
 * @param {string} collectionName 目标集合名称
 * @param {string} whereObj 软删除检索条件
 */
const deleteByDocId = async (collectionName, docId) => {
  return await db.collection(collectionName)
    .doc(docId)
    .update({
      data: {
        deleteTime: new Date().getTime()
      }
    })
}

/**
 * 硬删除云数据库记录（物理删除）
 * @param {string} collectionName 
 * @param {string} docId 
 */
const removeByDocId = async (collectionName, docId) => {
  return await db.collection(collectionName)
    .doc(docId)
    .remove()
}

/** 
 * 更新数据（doc版本）
 * @param {string} collectionName 目标集合名称
 * @param {string} docId 更新的_id条件
 * @param {object} updateData 更新的数据对象
 */
const updateByDoc = async (collectionName, docId, updateData = {}) => {
  const nowTime = new Date().getTime()
  updateData.updateTime = nowTime
  return await db.collection(collectionName)
    .doc(docId)
    .update({
      data: updateData
    })
}

/** 
 * 更新数据(where版本)
 * @param {string} collectionName 目标集合名称
 * @param {object} updateWhere 更新的条件对象
 * @param {object} updateData 更新的数据对象
 */
const updateByWhere = async (collectionName, updateWhere = {}, updateData = {}) => {
  const nowTime = new Date().getTime()
  updateData.updateTime = nowTime
  return await db.collection(collectionName)
    .where(updateWhere)
    .update({
      data: updateData
    })
}

/** 
 * 获取云数据库数据
 * @param {string} collectionName 目标集合名称
 * @param {object} whereObj 查询条件对象
 * @param {object} field 查询结果返回指定的字段,默认返回全部
 * @param {number} limit 取出条数 默认 15
 * @param {number} skip 跨过的查询条数 默认0
 * @param {string} orderByName 排序字段名称,默认:'createTime'
 * @param {string} orderByType 排序类型 'asc' 或者 'desc',默认:'desc',即createTime字段降序（创建时间越早越前面）
 */
const getByWhere = async (collectionName, whereObj, field = {}, limit = 15, skip = 0, orderByName = 'createTime', orderByType = 'desc') => {
  return await db.collection(collectionName)
    .orderBy(orderByName, orderByType)
    .where(whereObj)
    .field(field)
    .limit(limit)
    .skip(skip)
    .get()
}

/** 
 * 通过文档id从云数据库获取数据
 * @param {string} collectionName 目标集合名称
 * @param {string} docId 文档唯一id
 * @param {object} field 过滤字段, 默认全部要
 */
const getByDoc = async (collectionName, docId, field = {}) => {
  return await db.collection(collectionName).doc(docId)
    .field(field)
    .get()
}

/**
 * 获取指定集合符合条件的数量
 * @param {string} collectionName 目标集合名称
 * @param {object} whereObj 查询条件对象
 */
const getCount = async (collectionName, whereObj) => {
  return await db.collection(collectionName)
    .where(whereObj)
    .count()
}


module.exports = {
  add: add,
  deleteByWhere: deleteByWhere,
  deleteByDocId: deleteByDocId,
  removeByDocId: removeByDocId,
  updateByDoc: updateByDoc,
  updateByWhere: updateByWhere,
  getByWhere: getByWhere,
  getByDoc: getByDoc,
  getCount: getCount
}