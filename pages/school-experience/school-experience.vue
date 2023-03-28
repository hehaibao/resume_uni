<template>
	<view class="education">
		<head-custom isBack="true" :addHeight="20" />
		<header-title>
			<block slot="title">编辑教育经历</block>
			<block slot="info">填写最高学历哦</block>
		</header-title>
		<view class="form-body">
			<row-item>
				<block slot="title">学校名称<text class="required">*</text></block>
				<input slot="from" v-model="schoolInfo.educational_school" class="input" placeholder-class="input-placeholder" placeholder="请填写你的学校" />
			</row-item>
			<row-item>
				<block slot="title">学历<text class="required">*</text></block>
				<cc-picker :style="{width:'100%'}" slot="from" :range="educationList" v-model="schoolInfo.educational_education" null_str="请选择你的学历"></cc-picker>
			</row-item>
			<row-item>
				<block slot="title">专业名称<text class="required">*</text></block>
				<input slot="from" v-model="schoolInfo.educational_major" class="input" placeholder-class="input-placeholder" placeholder="请填写你的专业" />
			</row-item>
			<row-item>
				<block slot="title">在读时间<text class="required">*</text></block>
				<input @click="showPickHandle" slot="from" class="input arrow" disabled="true" placeholder-class="input-placeholder" placeholder="请选择时间段" :value="timeSlotArr" />
			</row-item>

			<row-item>
				<block slot="title">在校经历</block>
				<input @click="setExperienceHandle" slot="from" class="input arrow" disabled="true" placeholder-class="input-placeholder" placeholder="请填写在校经历" :value="schoolInfo.educational_about" />
			</row-item>

			<footer-btn @submit="nextClickHandle">
				<text slot="text">
					保存
				</text>
			</footer-btn>

			<rangeDatePick :show="isShowPick" @showchange="hidePickHandle" :start="startTime" :end="endTime" :value="schoolInfo.educational_time" @change="pickChange" @cancel="hidePickHandle" fields="month">
			</rangeDatePick>
		</view>
	</view>
</template>

<script>
	import headerTitle from '../../components/header-title/header-title.vue';
	import educationItem from '../../components/row-item/row-item.vue';
	import rangeDatePick from '@/components/range-picker/range-picker.vue';
	import footerBtn from '../../components/footer-btn/footer-btn.vue';
	import ccPicker from '../../components/cc-picker/cc-picker.vue';
	export default {
		components: {
			headerTitle,
			educationItem,
			rangeDatePick,
			footerBtn,
			ccPicker
		},
		data() {
			return {
				schoolInfo: {
					educational_school: '',
					educational_education: '本科',
					educational_major: '',
					educational_time: Array(2).fill(this.$comm.formatDate("YYYY-MM")),
					educational_about: ''
				},
				startTime: this.$comm.formatDate("YYYY-MM", this.$comm.getDateByYear(-20)),
				endTime: this.$comm.formatDate("YYYY-MM", this.$comm.getDateByYear()),
				isShowPick: false,
				educationList: ['小学', '初中', '高中', '中专', '大专', '本科', '硕士', '博士', 'MBA'],
			};
		},
		onLoad(option) {
			let { pageType } = option
			if (pageType == 'update') {
				let schoolInfo = this.$store.getters['update/getSchoolInfoData']
				this.schoolInfo = Object.assign(this.schoolInfo, schoolInfo)
			}
		},
		computed: {
			timeSlotArr() {
				return this.schoolInfo.educational_time.join(" 至 ")
			}
		},
		methods: {
			showPickHandle() {
				this.isShowPick = true
			},
			hidePickHandle() {
				this.isShowPick = false
			},
			pickChange(e) {
				this.schoolInfo.educational_time = e
			},
			setExperienceHandle() {
				this.$comm.navigateTo(`/pages/school-experience/school-experience-about?val=${this.schoolInfo.educational_about}`)
				uni.$once('setContent', (e) => {
					this.schoolInfo.educational_about = e
				})
			},
			nextClickHandle() {
				let schoolInfo = JSON.parse(JSON.stringify(this.schoolInfo))
				let valLoginRes = this.$validate.validate(schoolInfo, [{
					name: 'educational_school',
					type: 'required',
					errmsg: '请填写学校名称'
				}, {
					name: 'educational_education',
					type: 'required',
					errmsg: '请填写学历'
				}, {
					name: 'educational_major',
					type: 'required',
					errmsg: '请填写专业名称'
				}, {
					name: 'educational_time',
					type: 'arrlength',
					errmsg: '请填写在读时间'
				}])
				if (!valLoginRes.isOk) {
					this.$comm.errorToShow(valLoginRes.errmsg)
					return false
				}
				this.$comm.navigateBack(1,()=>{
					uni.$emit('updateSchoolInfo', schoolInfo)
				})
			}
		}
	}
</script>

<style lang="scss">
	.education {
		@include formStyle;
	}
</style>
