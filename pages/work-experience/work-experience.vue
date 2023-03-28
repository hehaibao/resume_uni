<template>
	<view class="work-experience">
		<head-custom isBack="true" :addHeight="20" />
		<header-title>
			<block slot="title">编辑工作经历</block>
			<block slot="info">填写最近几份工作哦</block>
		</header-title>

		<view class="form-body">
			<view class="row-item-box" v-for="(item, index) in workInfo" :key="index">
				<row-item>
					<block slot="title">公司名称<text class="required">*</text></block>
					<input slot="from" v-model="item.work_name" class="input" placeholder-class="input-placeholder" placeholder="请填写您入职过的公司" />
				</row-item>

				<row-item>
					<block slot="title">工作时间<text class="required">*</text></block>
					<input @click="showPickHandle(index)" slot="from" class="input arrow" disabled="true" placeholder-class="input-placeholder" placeholder="请选择时间段" :value="item.work_time.join(' 至 ')" />
				</row-item>

				<row-item>
					<block slot="title">职位名称<text class="required">*</text></block>
					<input slot="from" v-model="item.work_position" class="input" placeholder-class="input-placeholder" placeholder="请填写您的职位类型" />
				</row-item>

				<row-item>
					<block slot="title">工作内容<text class="required">*</text></block>
					<input @click="setJobContentHandle(index)" slot="from" class="input arrow" disabled="true" placeholder-class="input-placeholder" placeholder="请填写工作内容" :value="item.work_about" />
				</row-item>

				<row-item>
					<block slot="title">工作业绩<text class="required">*</text></block>
					<input @click="setPerformanceHandle(index)" slot="from" class="input arrow" disabled="true" placeholder-class="input-placeholder" placeholder="请填写工作业绩" :value="item.work_achievement" />
				</row-item>
			</view>
			<view class="add-btn" @click="addNewWorkItem">+ 新增</view>

			<footer-btn @submit="nextClickHandle">
				<text slot="text">
					保存
				</text>
			</footer-btn>
			
			<rangeDatePick :show="isShowPick" @showchange="hidePickHandle" :start="startTime" :end="endTime" :value="workInfo[currentIndex].work_time" @change="pickChange" @cancel="hidePickHandle" fields="month">
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
				workInfo: [{
					work_name: '',
					work_position: '',
					work_time: Array(2).fill(this.$comm.formatDate("YYYY-MM")),
					work_about: '',
					work_achievement: ''
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
				let workInfo = this.$store.getters['update/getWorkInfoData']
				this.workInfo = workInfo
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
				this.workInfo[this.currentIndex].work_time = e
			},
			addNewWorkItem () {
				if (this.workInfo.length >= 3) {
					uni.showToast({
						title: '最多添加3份工作经历',
						icon: 'none'
					})
					return
				}
				this.workInfo.push({
					work_name: '',
					work_position: '',
					work_time: Array(2).fill(this.$comm.formatDate("YYYY-MM")),
					work_about: '',
					work_achievement: ''
				})
			},
			setJobContentHandle(index) {
				this.$comm.navigateTo(`/pages/work-experience/work-content?val=${this.workInfo[index].work_about}`)
				uni.$once('setContent', (e) => {
					this.workInfo[index].work_about = e
				})
			},
			setPerformanceHandle(index) {
				this.$comm.navigateTo(`/pages/work-experience/work-performance?val=${this.workInfo[index].work_achievement}`)
				uni.$once('setContent', (e) => {
					this.workInfo[index].work_achievement = e
				})
			},
			nextClickHandle() {
				let workInfo = this.workInfo
				for (let i = 0, len = workInfo.length; i < len; i++) {
					let valLoginRes = this.$validate.validate(workInfo[i], [{
						name: 'work_name',
						type: 'required',
						errmsg: '请填写公司名称'
					}, {
						name: 'work_time',
						type: 'arrlength',
						errmsg: '请选择工作时间'
					}, {
						name: 'work_position',
						type: 'required',
						errmsg: '请填写职位名称'
					}, {
						name: 'work_about',
						type: 'required',
						errmsg: '请填写工作内容'
					}, {
						name: 'work_achievement',
						type: 'required',
						errmsg: '请填写工作业绩'
					}])
					if (!valLoginRes.isOk) {
						this.$comm.errorToShow(valLoginRes.errmsg)
						return false
					}
				}
				
				this.$comm.navigateBack(1, () => {
					uni.$emit('updateWorkInfo', workInfo)
				})
			}
		}
	}
</script>

<style lang="scss">
	.work-experience {
		@include formStyle;
	}
</style>
