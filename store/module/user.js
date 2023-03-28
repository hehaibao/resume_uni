/**
 * 用户信息
*/
const user = {
	namespaced: true,
	state: {
		uid: '',
		token: null,
		userInfo: null,
		login: false
	},
	mutations: {
		setUserInfo(state, userInfo) { // 用户信息
			state.userInfo = userInfo
		},
		setUid(state, uid) {
			state.uid = uid
		},
		setToken(state, token, tokenExpired) { // token
			state.token = token
			uni.setStorageSync('uni_id_token', token)
			uni.setStorageSync('uni_id_token_expired', tokenExpired)
		},
		setLogin(state, login) {
			state.login = login
		}
	},
	getters: {
		getUserInfo: (state) => state.userInfo,
		getUid: (state) => state.uid,
		getToken: (state) => state.token,
		getLogin: (state) => state.login
	}
}

export default user
