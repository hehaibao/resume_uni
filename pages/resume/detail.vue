<template>
	<view class="resume-info">
		<head-custom :addHeight="20" isBack="true">
			<block slot="content">编辑简历</block>
		</head-custom>
		<view class="body">
			<view class="info-body my" v-if="resumeInfo">
				<view class="info-userinfo">
					<view class="material w100">
						<view class="name">{{resumeInfo.resume_name || '-'}}</view>
						<view class="data">
							{{resumeInfo.expected_position || '-'}}
							<text class="resume-time">简历更新于: ({{resumeInfo.update_time | timestamp2Time}})</text>
						</view>
					</view>
				</view>
				<view class="content">
					<view class="progress">
						<view class="progress-bar" :style="{'width': `${getProgress}%`}"></view>
						<view class="progress-txt">简历完成进度：{{getProgress}}%</view>
					</view>
					<view class="job-intention-body body-info border-bottom">
						<view class="header-title">
							<view class="title">
								基本信息
								<text v-if="resumeInfo.user_name" class="ok cuIcon-roundcheckfill"></text>
							</view>
							<view class="edit" @tap="goPage('base-info')">
								<text class="cuIcon-edit"></text> 编辑
							</view>
						</view>
					</view>

					<view class="form-body body-info border-bottom">
						<view class="header-title">
							<view class="title">
								教育经历
								<text v-if="resumeInfo.educationalList && resumeInfo.educationalList.length" class="ok cuIcon-roundcheckfill"></text>
							</view>
							<view class="edit" @tap="goPage('school-experience')">
								<text class="cuIcon-edit"></text> 编辑
							</view>
						</view>
					</view>

					<view class="work-body body-info border-bottom">
						<view class="header-title">
							<view class="title">
								工作经历
								<text v-if="resumeInfo.workList && resumeInfo.workList.length" class="ok cuIcon-roundcheckfill"></text>
							</view>
							<view class="edit" @tap="goPage('work-experience')">
								<text class="cuIcon-edit"></text> 编辑
							</view>
						</view>
					</view>

					<view class="project-body body-info border-bottom">
						<view class="header-title">
							<view class="title">
								项目经历
								<text v-if="resumeInfo.projectList && resumeInfo.projectList.length" class="ok cuIcon-roundcheckfill"></text>
							</view>
							<view class="edit" @tap="goPage('project-experience')">
								<text class="cuIcon-edit"></text> 编辑
							</view>
						</view>
					</view>

					<view class="major-body body-info border-bottom">
						<view class="header-title">
							<view class="title">
								专业技能
								<text v-if="resumeInfo.major_about" class="ok cuIcon-roundcheckfill"></text>
							</view>
							<view class="edit" @tap="goPage('professional')">
								<text class="cuIcon-edit"></text> 编辑
							</view>
						</view>
					</view>

					<view class="evaluate-body body-info border-bottom">
						<view class="header-title">
							<view class="title">
								自我评价
								<text v-if="resumeInfo.evaluate_about" class="ok cuIcon-roundcheckfill"></text>
							</view>
							<view class="edit" @tap="goPage('self-evaluation')">
								<text class="cuIcon-edit"></text> 编辑
							</view>
						</view>
					</view>
				</view>
				<view class="resume-id">简历编号：#RESUME-{{resumeInfo._id}}</view>
			</view>
		</view>

		<view class="foot">
			<!-- 预览 -->
			<button class="foot-btn circle preview" @click="previewResume">
				<text class="cuIcon-attention"></text>
			</button>
			<!-- 分享 -->
			<button class="foot-btn circle share" open-type="share">
				<text class="cuIcon-share"></text>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				resumeId: ''
			};
		},
		onLoad(option) {
			let { resumeId } = option
			this.resumeId = resumeId
		},
		computed: {
			resumeInfo() {
				return this.$store.getters['resume/getResumeByIdData'](this.resumeId)
			},
			getProgress() {
				// 获取简历完成进度
				let progressVal = 0
				if (!this.resumeInfo) {
					return 0
				}
				if (this.resumeInfo.user_name) {
					progressVal += 30
				}
				if (this.resumeInfo.educationalList && this.resumeInfo.educationalList.length) {
					progressVal += 20
				}
				if (this.resumeInfo.workList && this.resumeInfo.workList.length) {
					progressVal += 20
				}
				if (this.resumeInfo.projectList && this.resumeInfo.projectList.length) {
					progressVal += 20
				}
				if (this.resumeInfo.major_about) {
					progressVal += 5
				}
				if (this.resumeInfo.evaluate_about) {
					progressVal += 5
				}
				return progressVal
			}
		},
		methods: {
			goPage(page) {
				if (page == 'base-info') {
					// 基本信息
					let info = this.$comm.getObjVal(this.resumeInfo, [
						"user_name", "user_head", "job_status", "user_sex", "user_birthday", "user_marriage", "user_politic",
						"user_phone", "user_wechat", "user_mail", "user_location", "working_hours", "salary_requirements", "expected_position"
					])
					this.$store.commit('update/setInfoData', info)
					uni.$once('updateInfo', (_info) => {
						let _resumeInfo = JSON.parse(JSON.stringify(this.resumeInfo))
						Object.assign(_resumeInfo, _info)
						this.$api.updateResume(_resumeInfo).then(res => {
							if (res.code) {
								this.$comm.successToShow("保存成功")
								this.$store.commit('resume/setResumeByIdData', _resumeInfo)
							}
						})
					})
				} else if (page == 'school-experience') {
					// 教育经历
					let info = this.$comm.getObjVal(this.resumeInfo, ['educationalList'])
					this.$store.commit('update/setSchoolInfoData', info.educationalList && info.educationalList.length ? info.educationalList[0] : [])
					uni.$once('updateSchoolInfo', (_schoolInfo) => {
						let _resumeInfo = JSON.parse(JSON.stringify(this.resumeInfo))
						Object.assign(_resumeInfo, {
							educationalList: [_schoolInfo]
						})
						this.$api.updateResume(_resumeInfo).then(res => {
							if (res.code) {
								this.$comm.successToShow("保存成功")
								this.$store.commit('resume/setResumeByIdData', _resumeInfo)
							}
						})
					})
				} else if (page === 'work-experience') {
					// 工作经历
					let info = this.$comm.getObjVal(this.resumeInfo, ['workList'])
					this.$store.commit('update/setWorkInfoData', info.workList && info.workList.length ? info.workList : [])
					uni.$once('updateWorkInfo', (_workInfo) => {
						let _resumeInfo = JSON.parse(JSON.stringify(this.resumeInfo))
						Object.assign(_resumeInfo, {
							workList: _workInfo
						})
						this.$api.updateResume(_resumeInfo).then(res => {
							if (res.code) {
								this.$comm.successToShow("保存成功")
								this.$store.commit('resume/setResumeByIdData', _resumeInfo)
							}
						})
					})
				} else if (page === 'project-experience') {
					// 项目经历
					let info = this.$comm.getObjVal(this.resumeInfo, ['projectList'])
					this.$store.commit('update/setProjectInfoData', info.projectList && info.projectList.length ? info.projectList : [])
					uni.$once('updateProjectInfo', (_projectInfo) => {
						let _resumeInfo = JSON.parse(JSON.stringify(this.resumeInfo))
						Object.assign(_resumeInfo, {
							projectList: _projectInfo
						})
						this.$api.updateResume(_resumeInfo).then(res => {
							if (res.code) {
								this.$comm.successToShow("保存成功")
								this.$store.commit('resume/setResumeByIdData', _resumeInfo)
							}
						})
					})
				} else if (page === 'professional') {
					// 专业技能
					let info = this.$comm.getObjVal(this.resumeInfo, ['major_about'])
					this.$store.commit('update/setMajorInfoData', info['major_about'])

					uni.$once('updateMajorInfo', (_majorInfo) => {
						let _resumeInfo = JSON.parse(JSON.stringify(this.resumeInfo))
						Object.assign(_resumeInfo, {
							major_about: _majorInfo
						})
						this.$api.updateResume(_resumeInfo).then(res => {
							if (res.code) {
								this.$comm.successToShow("保存成功")
								this.$store.commit('resume/setResumeByIdData', _resumeInfo)
							}
						})
					})
				} else if (page === 'self-evaluation') {
					// 自我评价
					let info = this.$comm.getObjVal(this.resumeInfo, ['evaluate_about'])
					this.$store.commit('update/setEvaluateInfoData', info['evaluate_about'])

					uni.$once('updateEvaluateInfo', (_evaluateInfo) => {
						let _resumeInfo = JSON.parse(JSON.stringify(this.resumeInfo))
						Object.assign(_resumeInfo, {
							evaluate_about: _evaluateInfo
						})
						this.$api.updateResume(_resumeInfo).then(res => {
							if (res.code) {
								this.$comm.successToShow("保存成功")
								this.$store.commit('resume/setResumeByIdData', _resumeInfo)
							}
						})
					})
				}
				this.$comm.navigateTo(`/pages/${page}/${page}?pageType=update`)
			},
			previewResume () {
				// 预览简历
				this.$comm.navigateTo(`/pages/resume/preview?resumeId=${this.resumeId}`)
			}
		},
		onShareAppMessage: function() {
			return {
				title: `推您一份简历『${this.resumeInfo.resume_name}』`,
				path: 'pages/resume/preview?resumeId=' + this.resumeId,
			};
		}
	}
</script>

<style lang="scss">
	@import "../../static/scss/resume.scss";
	@include btnStyle(60upx);
	@include button-init;
	.resume-id {
		color: #999;
		font-size: 24rpx;
		margin: 30rpx 40rpx 10rpx;
		text-align: left;
	}
</style>
