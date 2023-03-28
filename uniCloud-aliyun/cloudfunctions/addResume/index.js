const db = uniCloud.database()
const resume = db.collection('resume')
exports.main = async (event, context) => {
	const {
		uid,
		...resumeInfo
	} = event
	
	const timeStamp = new Date().getTime()

	if (!resumeInfo.resume_name) {
		resumeInfo.resume_name = `${resumeInfo.user_name}的个人简历`
	}
	let data = await resume.add({
		...resumeInfo,
		uid,
		'update_time': timeStamp
	})
	
	if (data.inserted === 0) {
		// 新增失败
		return {
			code: 0,
			msg: '添加简历失败',
			data: null
		}
	}

	return {
		code: 1,
		data: data
	}
};
