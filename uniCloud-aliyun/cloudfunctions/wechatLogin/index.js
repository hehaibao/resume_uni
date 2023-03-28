const uniID = require('uni-id')
exports.main = async (event, context) => {
	const {
		code
	} = event

	// 校验 token
	const auth = await uniID.checkToken(event.uniIdToken)
	if (auth.code === 0) {
		return auth
	}

	const res = await uniID.loginByWeixin({
		code
	})
	return res
};
