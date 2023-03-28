import Vue from 'vue'
/**
 * 操作失败的提示信息
 */
function errorToShow(msg = '操作失败', callback = function() {}) {
	uni.showToast({
		title: msg,
		icon: 'none',
		duration: 1500
	})
	setTimeout(callback, 1500)
}
/**
 * 操作成功的提示信息
 */
function successToShow(msg = '保存成功', callback = function() {}) {
	uni.showToast({
		title: msg,
		icon: 'success',
		duration: 1000
	})
	setTimeout(callback, 500)
}
/**
 * 统一跳转
 */
function navigateTo(url, callback, events) {
	uni.navigateTo({
		url: url,
		animationType: 'pop-in',
		animationDuration: 300,
		success: callback,
		events: events
	})
}
/**
 * 关闭当前页面统一跳转
 */
function redirectTo(url, callback) {
	uni.redirectTo({
		url: url,
		animationType: 'pop-in',
		animationDuration: 300,
		success: callback
	})
}
/**
 * 关闭所有的页面打开一个页面
 */
function reLaunch(url, callback) {
	uni.reLaunch({
		url: url,
		animationType: 'pop-in',
		animationDuration: 300,
		success: callback
	})
}
/**
 * tabber跳转
 */
function switchTabTo(url, callback) {
	uni.switchTab({
		url: url,
		animationType: 'pop-in',
		animationDuration: 300,
		success: callback
	})
}
/**
 * 跳转的上一级页面
 */
function navigateBack(delta = 1, callback) {
	uni.navigateBack({
		delta,
		animationType: 'pop-in',
		animationDuration: 300,
		success: callback
	})
}
/**
 * 获取当前时间(YYYY-HH-DD),改变年份
 */
function getDateByYear(year) {
	var dd = new Date();
	year && dd.setFullYear(dd.getFullYear() + year);
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1;
	var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
	return y + '-' + m + '-' + d;
}
/**
 * 根据输入格式输出时间
 */
function formatDate(fmt = "yyyy-mm-dd", date) {
	if (date) {
		let arr = date.split(/[- : T /]/)
		arr[1] = arr[1] - 1
		date = new Date(...arr)
	} else {
		date = new Date()
	}
	let o = {
		"Y+": date.getFullYear(), //年
		"M+": (date.getMonth() + 1), // 月份
		"D+": date.getDate(), // 日
		"h+": date.getHours(), // 小时
		"m+": date.getMinutes(), // 分
		"s+": date.getSeconds() // 秒
	}
	for (let k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			if (k != "Y+") {
				o[k] = String(o[k]).padStart(2, "0")
			}
			fmt = fmt.replace(RegExp.$1, o[k])
		}
	}
	return fmt
}
/**
 * 获取对象的部分属性
 */
function getObjVal(obj, keys) {
	let newBbj = {}
	keys.forEach(key => {
		Object.assign(newBbj, {
			[key]: obj[key]
		})
	})
	return newBbj
}

export {
	errorToShow,
	successToShow,
	navigateTo,
	redirectTo,
	switchTabTo,
	navigateBack,
	reLaunch,
	getDateByYear,
	formatDate,
	getObjVal
}
