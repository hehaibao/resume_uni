const db = uniCloud.database()
const resume = db.collection('resume')
exports.main = async (event, context) => {
	const {
		_id
	} = event
	
	let { data } = await resume.where({
		_id
	}).get()
	
	if (data.length > 0) {
		return {
			code: 1,
			data: data[0]
		}
	} else {
		return {
			code: 0,
			msg: '获取简历信息失败',
			data: null
		}
	}

};
