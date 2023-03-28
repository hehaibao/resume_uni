const db = uniCloud.database()
const resume = db.collection('resume')
exports.main = async (event, context) => {
	const {
		uid,
		_id,
	} = event
	
	let data = await resume.where({
		uid,
		_id
	}).remove()
	
	if (data.deleted === 0) {
		return {
			code: 0,
			msg: '删除失败',
			data: null
		}
	}

	return {
		code: 1,
		data: data
	}
};
