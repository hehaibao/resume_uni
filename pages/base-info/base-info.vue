<template>
	<view class="base-info">
		<head-custom isBack="true" :addHeight="20">
			<block slot="content">基本信息</block>
		</head-custom>
		<view class="list-content">
			<view class="cu-list menu sm-border from-body padding-top-sm">

				<view class="cu-item from-item">
					<view class="content from-content">
						<view class="from-title">照片</view>
					</view>
					<view class="action from-action">
						<image class="cu-avatar round form-avatar" @tap="setUsererHead" :src="resumeInfo.user_head" mode="aspectFill"></image>
					</view>
				</view>

				<view class="cu-item from-item">
					<view class="content from-content">
						<view class="from-title">姓名<text class="required">*</text></view>
					</view>
					<view class="action from-action">
						<input class="from-input" placeholder="请输入你的姓名" v-model="resumeInfo.user_name" />
					</view>
				</view>

				<view class="cu-item from-item arrow">
					<view class="content from-content">
						<view class="from-title">性别<text class="required">*</text></view>
					</view>
					<view class="action from-action">
						<cc-picker :style="{width:'100%'}" :range="sexTypeList" v-model="resumeInfo.user_sex"></cc-picker>
					</view>

				</view>

				<view class="cu-item from-item arrow">
					<view class="content from-content">
						<view class="from-title">出生日期<text class="required">*</text></view>
					</view>
					<view class="action from-action">
						<picker class="from-picker" mode="date" :value="resumeInfo.user_birthday" :start="startTime" :end="endTime" @change="pickerChange($event,'birthday')">
							<view class="picker">
								<text v-if="resumeInfo.user_birthday">
									{{resumeInfo.user_birthday}}
								</text>
								<text v-else class="placeholder-picker">
									请选择出生日期
								</text>
							</view>
						</picker>
					</view>
				</view>

				<view class="cu-item from-item">
					<view class="content from-content">
						<view class="from-title">手机号<text class="required">*</text></view>
					</view>
					<view class="action from-action">
						<input class="from-input" type="number" maxlength="11" placeholder="请输入你的手机号" v-model="resumeInfo.user_phone" />
					</view>
				</view>
				
				<view class="cu-item from-item arrow">
					<view class="content from-content">
						<view class="from-title">婚姻状况<text class="required">*</text></view>
					</view>
					<view class="action from-action">
						<cc-picker :style="{width:'100%'}" :range="marriageList" v-model="resumeInfo.user_marriage"></cc-picker>
					</view>
				</view>
				
				<view class="cu-item from-item arrow">
					<view class="content from-content">
						<view class="from-title">政治面貌<text class="required">*</text></view>
					</view>
					<view class="action from-action">
						<cc-picker :style="{width:'100%'}" :range="politicCountenanceList" v-model="resumeInfo.user_politic"></cc-picker>
					</view>
				</view>
				
				<view class="cu-item from-item">
					<view class="content from-content">
						<view class="from-title">微信号<text class="required">*</text></view>
					</view>
					<view class="action from-action">
						<input class="from-input" placeholder="请输入你的微信号" v-model="resumeInfo.user_wechat" />
					</view>
				</view>
				
				<view class="cu-item from-item">
					<view class="content from-content">
						<view class="from-title">常用邮箱</view>
					</view>
					<view class="action from-action">
						<input class="from-input" placeholder="请输入你的邮箱" v-model="resumeInfo.user_mail" />
					</view>
				</view>

			</view>

			<view class="cu-list menu sm-border from-body padding-top-sm">
				<view class="cu-item from-item">
					<view class="content from-content">
						<view class="from-title">当前求职状态<text class="required">*</text></view>
					</view>
					<view class="action from-action">
						<input class="from-input" placeholder="请输入你的当前求职状态" v-model="resumeInfo.job_status" />
					</view>
				</view>
				
				<view class="cu-item from-item arrow">
					<view class="content from-content">
						<view class="from-title">参加工作时间<text class="required">*</text></view>
					</view>
					<view class="action from-action">
						<picker class="from-picker" mode="date" :value="resumeInfo.working_hours" :start="startTime" :end="endTime" @change="pickerChange($event,'hours')">
							<view class="picker">
								<text v-if="resumeInfo.working_hours">
									{{resumeInfo.working_hours}}
								</text>
								<text v-else class="placeholder-picker">
									请选择参加工作时间
								</text>
							</view>
						</picker>
					</view>
				</view>
				
				<view class="cu-item from-item">
					<view class="content from-content">
						<view class="from-title">期望职位<text class="required">*</text></view>
					</view>
					<view class="action from-action">
						<input class="from-input" placeholder="请输入你的期望职位" v-model="resumeInfo.expected_position" />
					</view>
				</view>
				
				<view class="cu-item from-item arrow">
					<view class="content from-content">
						<view class="from-title">期望薪资</view>
					</view>
					<view class="action from-action">
						<salary-picker :salary="resumeInfo.salary_requirements" @pickerChange="pickerChange($event,'salary')">
						</salary-picker>
					</view>
				</view>
				
				<view class="cu-item from-item arrow">
					<view class="content from-content">
						<view class="from-title">意向城市</view>
					</view>
					<view class="action from-action">
						<picker class="from-picker" mode="region" :value="resumeInfo.user_location" @change="pickerChange($event,'location')">
							<view class="picker">
								{{resumeInfo.user_location.join("")}}
							</view>
						</picker>
					</view>
				</view>
			</view>
		</view>

		<footer-btn @submit="nextClickHandle">
			<text slot="text">保存</text>
		</footer-btn>
	</view>
</template>

<script>
	import ccPicker from '../../components/cc-picker/cc-picker.vue';
	import footerBtn from '../../components/footer-btn/footer-btn.vue';
	import salaryPicker from '../../components/salary-picker/salary-picker.vue';
	export default {
		components: {
			footerBtn,
			salaryPicker,
			ccPicker
		},
		data() {
			return {
				sexTypeList: ['男', '女', '保密'],
				marriageList: ['未婚', '已婚', '离婚', '丧偶'],
				politicCountenanceList: ['中共党员', '中共预备党员', '共青团员', '群众'],
				startTime: this.$comm.getDateByYear(-50),
				endTime: this.$comm.getDateByYear(),
				resumeInfo: {
					user_name: '',
					user_head: '',
					job_status: '',
					user_sex: '男',
					user_birthday: '',
					user_phone: '',
					user_wechat: '',
					user_mail: '',
					user_location: ["江苏省", "苏州市", "吴中区"],
					working_hours: '',
					salary_requirements: ['面议', '面议'],
					user_marriage: '未婚',
					user_politic: '群众'
				},
				pageType: ''
			};
		},
		onLoad(option) {
			let { pageType = 'add' } = option
			if (pageType == 'update') {
				let info = this.$store.getters['update/getInfoData']
				this.resumeInfo = Object.assign(this.resumeInfo, info)
			} else {
				this.$store.commit('add/clearAddData')
			}
			this.pageType = pageType

		},
		methods: {
			setUsererHead() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: async (res) => {
						let { tempFilePaths } = res
						uni.showLoading({
							title: "上传中"
						})
						const filePath = tempFilePaths[0]
						const cloudPath = Date.now() + filePath.match(/\.[^.]+?$/)[0]
						const { fileID } = await uniCloud.uploadFile({
							filePath: filePath,
							cloudPath: cloudPath
						})
						
						let result = await uniCloud.getTempFileURL({
							fileList: [fileID]
						});
						uni.hideLoading()
						
						this.resumeInfo.user_head = fileID
						this.$comm.successToShow("上传成功")
					}
				});
			},
			pickerChange(e, type) {
				let objValue = {
					key: '',
					value: ''
				}
				switch (type) {
					case 'salary':
						objValue = {
							key: 'salary_requirements',
							value: e
						}
						break;
					case 'location':
						objValue = {
							key: 'user_location',
							value: e.detail.value
						}
						break;
					case 'birthday':
						objValue = {
							key: 'user_birthday',
							value: e.detail.value
						}
						break;
					case 'hours':
						objValue = {
							key: 'working_hours',
							value: e.detail.value
						}
						break;
				}
				if (objValue.key) {
					this.resumeInfo[objValue.key] = objValue.value
				}
			},
			async nextClickHandle() {
				let resumeInfo = JSON.parse(JSON.stringify(this.resumeInfo))
				let valLoginRes = this.$validate.validate(resumeInfo, [{
						name: 'user_name',
						type: 'required',
						errmsg: '请填写姓名'
					},
					{
						name: 'user_birthday',
						type: 'required',
						errmsg: '请填写出生日期'
					},
					{
						name: 'user_phone',
						type: 'required',
						errmsg: '请填写手机号'
					},
					{
						name: 'user_phone',
						type: 'phone',
						errmsg: '请填写正确的手机号'
					},
					{
						name: 'user_marriage',
						type: 'required',
						errmsg: '请选择婚姻状况'
					},
					{
						name: 'user_politic',
						type: 'required',
						errmsg: '请选择政治面貌'
					},
					{
						name: 'user_wechat',
						type: 'required',
						errmsg: '请填写微信号'
					},
					{
						name: 'job_status',
						type: 'required',
						errmsg: '请填写当前求职状态'
					},
					{
						name: 'working_hours',
						type: 'required',
						errmsg: '请填写参加工作时间'
					},
					{
						name: 'expected_position',
						type: 'required',
						errmsg: '请填写期望职位'
					}
				])
				if (!valLoginRes.isOk) {
					this.$comm.errorToShow(valLoginRes.errmsg)
					return false
				}
				if (this.pageType == 'update') {
					this.$comm.navigateBack(1, () => {
						uni.$emit('updateInfo', resumeInfo)
					})

				} else if (this.pageType == 'add') {
					this.$store.commit('add/setInfoData', resumeInfo)
					
					// 添加简历
					this.$api.addResume(resumeInfo).then(res => {
						if (res.code) {
							this.$comm.successToShow("添加简历成功", () => {
								this.$comm.navigateTo(`/pages/index/index`)
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.base-info {
		background-color: $index-bg-gray;

		.cu-list.from-body {

			&.cu-list+.cu-list {
				margin-top: 0rpx;
			}

			.from-item.from-item {
				width: 100%;
				display: flex;
				align-items: center;
				height: 110rpx;
				overflow: hidden;

				&.arrow {
					padding-right: 50upx;

					&::before {
						right: 22upx;
					}
				}

				&:last-child::after {
					border: none;
				}

				&::after {
					border-bottom: 4upx solid $border-c;
					width: calc(200% - 110rpx);
				}


				.from-content {
					background-color: #ffffff;
					display: flex;
					align-items: center;
					min-height: 100upx;
					justify-content: space-between;
					flex: 0 1 auto;
					height: 100%;

					.from-title {
						text-align: justify;
						padding-left: 0upx;
						font-size: 32upx;
						position: relative;
						color: $font-c10;
					}
				}

				.from-action {
					flex: 1;
					display: flex;
					flex-direction: row-reverse;
					align-items: center;
					height: 100%;
					overflow: hidden;

					.form-avatar {
						width: 76upx;
						height: 76upx;
						display: flex;
						align-items: center;
					}

					.from-input {
						flex: 1;
						font-size: 28upx;
						color: $font-c10;
						text-align: right;
						overflow: hidden;
					}

					.from-picker {
						width: 100%;

						.picker {
							line-height: 110upx;
							height: 100%;
							padding-left: 30upx;
							font-size: 28rpx;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
							width: 100%;
							text-align: right;
						}

						.placeholder-picker {
							color: rgb(128, 128, 128);
							font-size: 28upx;
						}
					}
				}
			}
		}
	}
</style>
