const db = uniCloud.database()
const resume = db.collection('resume')
exports.main = async (event, context) => {
	const {
		uid,
		_id,
		...resumeInfo
	} = event
	
	const timeStamp = new Date().getTime()
	
	resumeInfo.update_time = timeStamp
	
	let data = await resume.where({
		uid,
		_id
	}).update(resumeInfo)
	
	if (data.updated === 0) {
		return {
			code: 0,
			msg: '简历更新失败',
			data: null
		}
	}

	return {
		code: 1,
		data: data
	}
};
