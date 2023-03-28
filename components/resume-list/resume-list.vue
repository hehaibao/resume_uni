<template>
	<view class="cu-list menu sm-border resume-list">
		<view class="cu-item resume-item" v-for="(resume, index) in resumeData" :key="index">
			<view class="avatar round" :style="{backgroundImage: `url(${resume.user_head || ''})`}"></view>
			<view class="content resume-content">
				<view class="resume-info-one">
					<view class="resume-title">{{resume.resume_name}}</view>
					<view class="resume-more" @tap.stop="resumeClickHandle(resume._id)"><text class="cuIcon-command margin-right-xs"></text> 操作</view>
				</view>
				<view class="resume-info-two">
					<view class="resume-position">{{resume.expected_position}}</view>
					<view class="resume-time">简历更新于: {{resume.update_time | timestamp2Time}}</view>
				</view>
			</view>
		</view>
		
		<!-- 修改简历名称 弹出层 -->
		<view class="cu-modal" :class="showRemoveName?'show':''" @click.self="hideRemoveNameModal">
			<view class="cu-dialog bg-white" @click.stop>
				<view class="cu-bar justify-end">
					<view class="content">修改简历名称</view>
					<view class="action" @tap="hideRemoveNameModal">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="padding-xl content-input">
					<view class="cu-form-group">
						<input placeholder="请输入简历名称" name="input" v-model="changeRemoveName"></input>
					</view>
				</view>
				<view class="cu-bar justify-end">
					<view class="save-name" @tap="saveRemoveName">保存</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showRemoveName: false,
				changeRemoveName: '',
				changeRemoveId: -1
			};
		},
		props: {
			resumeData: {
				type: Array,
				default: []
			}
		},
		methods: {
			resumeClickHandle(resumeId) {
				uni.showActionSheet({
					itemList: ['编辑简历', '预览简历', '删除简历', '重命名简历', '选择简历模板'],
					itemColor: '#666666',
					success: (res) => {
						let { tapIndex } = res;
						switch (tapIndex) {
							case 0:
								// 编辑简历
								this.goMyInfo(resumeId)
								break;
							case 1:
								// 预览简历
								this.$comm.navigateTo(`/pages/resume/preview?resumeId=${resumeId}`)
								break;
							case 2:
								// 删除简历
								uni.showModal({
									title: ' 温馨提示',
									content: '确认要删除简历么',
									confirmColor: '#00d2ca',
									success: (res) => {
										if (res.confirm) {
											this.$api.delResume({
												_id: resumeId
											}).then(res => {
												if (res.code) {
													this.$comm.successToShow("删除成功", () => {
														this.$store.commit('resume/delResumeByIdData', {
															_id: resumeId
														})
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
								})
							break
							case 3:
								// 重命名简历
								let resume = this.resumeData.find(resume => resume._id === resumeId)
								this.changeRemoveName = resume.resume_name
								this.changeRemoveId = resume._id
								this.showRemoveNameModal()
								break;
							case 4:
								// 选择模板
								const resumeInfo = this.resumeData.find(resume => resume._id === resumeId)
								this.$comm.navigateTo(`/pages/resume-template/resume-template?resumeId=${resumeId}&resumeTplId=${resumeInfo.template_id}`)
								break
							default:
								break;
						}
					}
				})
			},
			goMyInfo(resumeId) {
				this.$comm.navigateTo(`/pages/resume/detail?resumeId=${resumeId}`)
			},
			hideRemoveNameModal() {
				this.showRemoveName = false
			},
			showRemoveNameModal() {
				this.showRemoveName = true
			},
			saveRemoveName() {
				if (!this.changeRemoveName) {
					this.$comm.errorToShow('请输入简历名称')
					return false
				}
				this.hideRemoveNameModal()
				this.$api.updateResume({
					_id: this.changeRemoveId,
					resume_name: this.changeRemoveName
				}).then(res => {
					if (res.code) {
						this.$store.commit('resume/updateResumeName', {
							_id: this.changeRemoveId,
							resume_name: this.changeRemoveName
						})
						this.$comm.successToShow("修改成功")
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.cu-list.resume-list {
		margin: 30upx 30upx 0;
		.cu-item.resume-item {
			display: flex;
			background-color: $index-bg-gray;
			border-radius: 20upx;
			padding: 50upx 30upx;
			margin-bottom: 30upx;
			
			&:nth-last-child(2)::after {
				border: none;
			}

			&::after {
				border-bottom-color: transparent;
			}

			.avatar {
				width: 100upx;
				height: 100upx;
				background-color: #ddd;
				background-position: center;
				background-repeat: no-repeat;
				background-size: cover;
				margin-right: 20upx;
				align-self: flex-start;
			}

			.resume-content {
				display: flex;
				flex-direction: column;

				.resume-info-one {
					display: flex;
					align-items: center;
				}

				.resume-info-one {
					.resume-title {
						color: $font-c10;
						font-size: 32upx;
						flex: 1;
					}

					.resume-more {
						font-size: 28upx;
						color: $index-color;
					}
				}


				.resume-info-two {
					padding: 12upx 0 0;

					.resume-position {
						color: $font-c9;
						font-size: 26upx;
						flex: 1;
					}

					.resume-time {
						color: $font-c9;
						font-size: 24upx;
					}
				}
			}
		}

		.cu-modal {
			z-index: 9999;
		}

		.cu-dialog {
			width: 640upx;
			border-radius: 25upx;

			.content-input {
				padding: 0 50upx 20upx;
				margin: 30upx 0;
			}

			.cu-form-group {
				border: 2rpx solid #f2f2f2;
				border-radius: 10rpx;
				input {
					font-size: 36upx;
					padding-right: 0;
				}
			}

			.save-name {
				width: 100%;
				height: 100%;
				border: none;
				border-top: 1upx solid $index-bg-gray;
				margin: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				min-height: 100rpx;
				color: $index-color;
				font-size: 34upx;
			}
		}

	}
</style>
