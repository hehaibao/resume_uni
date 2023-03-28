<template>
	<view class="project-experience">
		<head-custom isBack="true" :addHeight="20" />
		<header-title>
			<block slot="title">编辑项目经历</block>
			<block slot="info">填写最具价值的项目哦</block>
		</header-title>

		<view class="form-body">
			<view class="row-item-box" v-for="(item, index) in projectInfo" :key="index">
				<row-item>
					<block slot="title">项目名称<text class="required">*</text></block>
					<input slot="from" v-model="item.project_name" class="input" placeholder-class="input-placeholder" placeholder="例如：简历APP" />
				</row-item>

				<row-item>
					<block slot="title">项目职位<text class="required">*</text></block>
					<input slot="from" v-model="item.project_position" class="input" placeholder-class="input-placeholder" placeholder="例如：前端工程师" />
				</row-item>

				<row-item>
					<block slot="title">时间段<text class="required">*</text></block>
					<input @click="showPickHandle(index)" slot="from" class="input arrow" disabled="true" placeholder-class="input-placeholder" placeholder="请选择时间段" :value="item.project_time.join(' 至 ')" />
				</row-item>

				<row-item>
					<block slot="title">项目描述<text class="required">*</text></block>
					<input @click="setProjectAboutHandle(index)" slot="from" class="input arrow" disabled="true" placeholder-class="input-placeholder" placeholder="请填写项目描述" :value="item.project_about" />
				</row-item>

				<row-item>
					<block slot="title">项目成果<text class="required">*</text></block>
					<input @click="setProjectAchievementHandle(index)" slot="from" class="input arrow" disabled="true" placeholder-class="input-placeholder" placeholder="请填写项目成果" :value="item.project_achievement" />
				</row-item>
			</view>
			<view class="add-btn" @click="addNewProjectItem">+ 新增</view>

			<footer-btn @submit="nextClickHandle">
				<text slot="text">
					保存
				</text>
			</footer-btn>

			<rangeDatePick :show="isShowPick" @showchange="hidePickHandle" :start="startTime" :end="endTime" :value="projectInfo[currentIndex].project_time" @change="pickChange" @cancel="hidePickHandle" fields="month">
			</rangeDatePick>
		</view>
	</view>
</template>

<script>
	import headerTitle from '../../components/header-title/header-title.vue';
	import educationItem from '../../components/row-item/row-item.vue';
	import rangeDatePick from '@/components/range-picker/range-picker.vue';
	import footerBtn from '../../components/footer-btn/footer-btn.vue';
	export default {
		components: {
			headerTitle,
			educationItem,
			rangeDatePick,
			footerBtn
		},
		data() {
			return {
				projectInfo: [{
					project_name: '',
					project_position: '',
					project_time: Array(2).fill(this.$comm.formatDate("YYYY-MM")),
					project_about: '',
					project_achievement: ''
				}],
				startTime: this.$comm.formatDate("YYYY-MM", this.$comm.getDateByYear(-20)),
				endTime: this.$comm.formatDate("YYYY-MM", this.$comm.getDateByYear()),
				isShowPick: false,
				currentIndex: 0
			};
		},
		onLoad(option) {
			let { pageType } = option
			if (pageType == 'update') {
				let projectInfo = this.$store.getters['update/getProjectInfoData']
				this.projectInfo = projectInfo
			}
		},
		methods: {
			showPickHandle(index) {
				this.currentIndex = index
				this.isShowPick = true
			},
			hidePickHandle() {
				this.isShowPick = false
			},
			pickChange(e) {
				this.projectInfo[this.currentIndex].project_time = e
			},
			addNewProjectItem () {
				if (this.projectInfo.length >= 3) {
					uni.showToast({
						title: '最多添加3份项目经历',
						icon: 'none'
					})
					return
				}
				this.projectInfo.push({
					project_name: '',
					project_position: '',
					project_time: Array(2).fill(this.$comm.formatDate("YYYY-MM")),
					project_about: '',
					project_achievement: ''
				})
			},
			setProjectAboutHandle(index) {
				this.$comm.navigateTo(`/pages/project-experience/project-describe?val=${this.projectInfo[index].project_about}`)
				uni.$once('setContent', (e) => {
					this.projectInfo[index].project_about = e
				})
			},
			setProjectAchievementHandle(index) {
				this.$comm.navigateTo(`/pages/project-experience/project-achievements?val=${this.projectInfo[index].project_achievement}`)
				uni.$once('setContent', (e) => {
					this.projectInfo[index].project_achievement = e
				})
			},
			nextClickHandle() {
				let projectInfo = this.projectInfo
				for (let i = 0, len = projectInfo.length; i < len; i++) {
					let valLoginRes = this.$validate.validate(projectInfo[i], [{
						name: 'project_name',
						type: 'required',
						errmsg: '请填写项目名称'
					}, {
						name: 'project_position',
						type: 'required',
						errmsg: '请填写项目职位'
					}, {
						name: 'project_time',
						type: 'arrlength',
						errmsg: '请填写项目时间段'
					}, {
						name: 'project_about',
						type: 'required',
						errmsg: '请填写项目描述'
					}, {
						name: 'project_achievement',
						type: 'required',
						errmsg: '请填写项目成果'
					}])
					if (!valLoginRes.isOk) {
						this.$comm.errorToShow(valLoginRes.errmsg)
						return false
					}
				}
				this.$comm.navigateBack(1, () => {
					uni.$emit('updateProjectInfo', projectInfo)
				})
			}
		}
	}
</script>

<style lang="scss">
	.input-placeholder {
		color: $font-c9;
		font-size: 36upx;
	}

	.project-experience {
		@include formStyle;
	}
</style>
