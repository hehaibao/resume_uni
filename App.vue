<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.platform == 'android' ? e.statusBarHeight + 50 : e.statusBarHeight + 45;
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					let {bottom, top} = custom
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = bottom + top - e.statusBarHeight;
					// #endif
				}
			})

			this.authLogin()
		},
		methods: {
			authLogin() {
				// 用户登录
				uni.login({
					provider: 'weixin',
					success: async (loginRes) => {
						let code = loginRes.code

						await this.$api.wechatLogin({
							code
						}).then(res => {
							const {uid, userInfo, token, tokenExpired} = res
							this.$store.commit('user/setUid', uid)
							this.$store.commit('user/setUserInfo', userInfo)
							this.$store.commit('user/setLogin', true)
							if (token) {
								this.$store.commit('user/setToken', token, tokenExpired)
							}

							// 登录成功
							this.globalData.successCallbackHander.exec()
						})
					}
				})
			}
		},
		globalData: {
			successCallbackHander: {
				callbackList: new Array(), // 登录回调函数
				add (func, _this) {
					// 添加回调函数
					let isLogin = Vue.prototype.$store.getters['user/getLogin'] // 获取登录状态
					let route = _this.__route__
					if (isLogin) {
						func()
					} else {
						let callIndex = this.callbackList.findIndex(call => call.route == route)
						if (callIndex === -1) {
							this.callbackList.push({
								func: func.bind(_this),
								route: route
							})
						}
					}
				},
				exec () {
					// 执行回调函数
					this.callbackList.forEach(callback => callback.func())
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "./static/scss/main.scss";
	@import "./static/scss/icon.scss";
</style>
