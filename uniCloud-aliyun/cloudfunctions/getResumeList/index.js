const db = uniCloud.database()
const resume = db.collection('resume')
exports.main = async (event, context) => {
	const {
		uid
	} = event
	
	let { data } = await resume.where({
		uid
	}).get()
	
	if (data.length > 0) {
		return {
			code: 1,
			data: data
		}
	} else {
		return {
			code: 0,
			msg: '获取数据失败',
			data: null
		}
	}
	
};
