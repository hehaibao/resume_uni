/**
 * 指的是出生日期，格式为"xxxx-xx-xx"
 */
function yearInterval(startYear) {
	var returnYear,
		startYearArr = startYear.split("-"),
		birthYear = startYearArr[0],
		birthMonth = startYearArr[1],
		birthDay = startYearArr[2],
		d = new Date(),
		nowYear = d.getFullYear(),
		nowMonth = d.getMonth() + 1,
		nowDay = d.getDate();
	if (nowYear == birthYear) {
		returnYear = 0; //同年
	} else {
		var yearDiff = nowYear - birthYear; //年之差
		if (yearDiff > 0) {
			if (nowMonth == birthMonth) {
				var dayDiff = nowDay - birthDay; //日之差
				if (dayDiff < 0) {
					returnYear = yearDiff - 1;
				} else {
					returnYear = yearDiff;
				}
			} else {
				var monthDiff = nowMonth - birthMonth; //月之差
				if (monthDiff < 0) {
					returnYear = yearDiff - 1;
				} else {
					returnYear = yearDiff;
				}
			}
		} else {
			returnYear = -1; //返回-1 表示输入错误
		}
	}
	return returnYear; //返回周岁年龄
}

/**
 * 将时间戳转换为日期
 */
function timestampToTime(timestamp, full = false) {
	var date = ""
	if (timestamp.length == 13) {
		date = new Date(timestamp * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
	} else {
		date = new Date(timestamp); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
	}
	var Y = date.getFullYear();
	var M = date.getMonth() + 1;
	var D = date.getDate();
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	// 给一位数的数据前面加 “0”
	if (M >= 1 && M <= 9) {
	  M = "0" + M;
	}
	if (D >= 0 && D <= 9) {
	  D = "0" + D;
	}
	if (h >= 0 && h <= 9) {
	  h = "0" + h;
	}
	if (m >= 0 && m <= 9) {
	  m = "0" + m;
	}
	if (s >= 0 && s <= 9) {
	  s = "0" + s;
	}
	return full ? Y + '-' + M + '-'+ D + ' ' + h + ':' + m + ':' + s : Y + '-' + M + '-'+ D;
}

export default {
	yearFilter(startYear) {
		return yearInterval(startYear)
	},
	timestamp2Time (timestamp) {
		return timestampToTime(timestamp)
	}
}
