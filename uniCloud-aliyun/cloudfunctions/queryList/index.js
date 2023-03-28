'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	
	var dbName = event.dbName // 集合表名
	var search = event.search // 搜索
	var order = event.order ? event.order : {} // 排序
	var filter = event.filter ? event.filter : {} // 筛选条件
	var pageIndex = event.pageIndex ? event.pageIndex : 1 // 当前页数
	var pageSize = event.pageSize ? event.pageSize : 10 // 每页数量
	
	let countResult = {}
	if (search) {
		countResult = await db.collection(dbName).where({
			"name": new RegExp(search,'i')
		}).count()
	} else {
		countResult = await db.collection(dbName).where(filter).count()
	}
	const total = countResult.total  // 得到总记录数 
	const totalPage = Math.ceil(total / pageSize)  // 计算页数
	
	var hasMore = pageIndex > totalPage || pageIndex == totalPage ? false : true // 提示前端是否还有数据
	
	var result = {}
	if (search) {
		result = await db.collection(dbName)
			.where({
				"name": new RegExp(search,'i')
			})
			.skip((pageIndex - 1) * pageSize)
			.limit(pageSize)
			.get()
	} else {
		if (order.name && order.type) {
			result = await db.collection(dbName)
				.where(filter)
				.skip((pageIndex - 1) * pageSize)
				.limit(pageSize)
				.orderBy(order.name, order.type)
				.get()
		} else {
			result = await db.collection(dbName)
				.where(filter)
				.skip((pageIndex - 1) * pageSize)
				.limit(pageSize)
				.get()
		}
	}
	result.hasMore = hasMore
	return result
};
