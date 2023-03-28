/**
 * 验证
 */
const numberReg = /^-?[1-9][0-9]?.?[0-9]*$/
const phoneReg = /^1[0-9]{10,10}$/
const emailReg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
const cardReg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/

export default {
	isEmpty: function(val) {
		return Boolean(!(val == "" || val == null || val == undefined))
	},
	isArrayEmpty: function(arr) {
		return Boolean(arr.length)
	},
	isPhone: function(val) {
		return phoneReg.test(val)
	},
	isEmail: function(val) {
		return emailReg.test(val)
	},
	validate: function(data, rules) {
		let res = {
			isOk: true,
			errmsg: ''
		}
		if (!rules || !rules.length) {
			return res
		}
		for (let rule of rules) {
			// rule: {name:'', type:'', errmsg:'', min:1, max:2, eq:'', required:Boolean, regex:''}
			if (!rule || !rule.name || !rule.type) {
				continue
			}

			// 如果值不存在
			if (!data[rule.name]) {
				// 如果是必填项就返回错误提示，required可以作为type是为了不同的type能给用户不同的提示
				if (rule.type === 'required' || rule.required) {
					res = {
						isOk: false,
						errmsg: rule.errmsg
					}
					if (!res.errmsg) {
						res.errmsg = '请正确输入所有数据' //默认提示
					}
					return res
				}
				// 如果不是必填项就跳过
				continue
			}

			switch (rule.type) {
				// required 上面已经判断过了
				case 'equals':
				case 'eq':
					if (data[rule.name] !== data[rule.eqName]) {
						res = {
							isOk: false,
							errmsg: rule.errmsg
						}
					}
					break
				case 'phone':
					if (!phoneReg.test(data[rule.name])) {
						res = {
							isOk: false,
							errmsg: rule.errmsg
						}
					}
					break
				case 'idCard':
					if (!cardReg.test(data[rule.name])) {
						res = {
							isOk: false,
							errmsg: rule.errmsg
						}
					}
					break
				case 'email':
					if (!emailReg.test(data[rule.name])) {
						res = {
							isOk: false,
							errmsg: rule.errmsg
						}
					}
					break
				case 'arrlength':
					if (!data[rule.name].length) {
						res = {
							isOk: false,
							errmsg: rule.errmsg
						}
					}
					break
				case 'range': // 数字类型的值取值范围
					// {name: 'xxx', type: 'range', min: 6, max: 6, required: true, errmsg: 'xxx'}
					let val = data[rule.name]
					if (val) {
						if (numberReg.test(val)) {
							if (rule.min && val < rule.min) {
								res = {
									isOk: false,
									errmsg: rule.errmsg
								}
							} else if (rule.max && val > rule.max) {
								res = {
									isOk: false,
									errmsg: rule.errmsg
								}
							}
						} else {
							res = {
								isOk: false,
								errmsg: rule.errmsg
							}
						}
					}
					break
				case 'lengthRange': // 字符串长度取值范围
					// {name: 'xxx', type: 'lengthRange', min: 6, max: 6, errmsg: 'xxx'}
					let le = data[rule.name] ? data[rule.name].length : 0
					if (rule.min && le < rule.min) {
						res = {
							isOk: false,
							errmsg: rule.errmsg
						}
					} else if (rule.max && le > rule.max) {
						res = {
							isOk: false,
							errmsg: rule.errmsg
						}
					}
					break
				case 'regex': // 自定义正则表达式
					// {name: 'xxx', type: 'regex', regex: /^1[0-9]{10,10}$/, errmsg: 'xxx'}
					if (rule.regex && !rule.regex.test(data[rule.name])) {
						res = {
							isOk: false,
							errmsg: rule.errmsg
						}
					}
					break

			}
			// 发现任何一个错误就立即返回，后面的不再判断
			if (!res.isOk) {
				if (!res.errmsg) {
					res.errmsg = '请正确输入所有数据' //默认提示
				}
				return res
			}
		}
		return res
	}
}
