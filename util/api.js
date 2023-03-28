import Vue from 'vue'

// 全局请求遮罩
var needLoadingRequestCount = 0;

function showFullScreenLoading() {
	if (needLoadingRequestCount === 0) {
		uni.showLoading({
			title: '加载中',
			mask: true
		})
	}
	needLoadingRequestCount++;
};

function tryHideFullScreenLoading() {
	needLoadingRequestCount--;
	if (needLoadingRequestCount === 0) uni.hideLoading();
};

// 需要登陆的，都写到这里，否则就是不需要登陆的接口
const methodsUid = [
	'getResumeList',
	'updateResume',
	'addResume',
	'delResume'
];

const callFunction = function(name, data = {}, option = {
	showLoading: true
}) {
	if (option.showLoading) showFullScreenLoading()
	return new Promise((resolve, reject) => {

		let uid = Vue.prototype.$store.getters['user/getUid']
		if (methodsUid.indexOf(name) >= 0) {
			data.uid = uid;
		} else {
			if (uid) {
				data.uid = uid;
			}
		}

		uniCloud.callFunction({
			name,
			data
		})
		.then(res => {
			if (option.showLoading) tryHideFullScreenLoading()
			if (res && res.result) {
				resolve(res.result)
			}
		})
		.catch(err => {
			if (option.showLoading) tryHideFullScreenLoading()
			reject()
		})
	})
}

/**
 * 所有的请求
 */
// 用户登录
export const wechatLogin = (data) => callFunction('wechatLogin', data);
// 获取用户简历
export const getResumeList = (data) => callFunction('getResumeList', data);
// 修改简历
export const updateResume = (data) => callFunction('updateResume', data);
// 添加简历
export const addResume = (data) => callFunction('addResume', data);
// 删除简历
export const delResume = (data) => callFunction('delResume', data);
// 根据_id获取简历信息
export const getResumeById = (data) => callFunction('getResumeById', data);
// 获取列表 - 比如：简历模板
export const getResumeTplList = (data) => callFunction('queryList', data);