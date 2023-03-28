<template>
	<view class="resume-component-box">
		<component0 v-if="tplIndex == 0" :resumeInfo="resumeInfo" :isShare="isShare"></component0>
		<component1 v-if="tplIndex == 1" :resumeInfo="resumeInfo" :isShare="isShare"></component1>
	</view>
</template>

<script>
	// 因为当前版本无法动态加载组件，所以每次增加模板，都需要手动在此添加组件
	import component0 from '@/pages/resume/templates/component0.vue'
	import component1 from '@/pages/resume/templates/component1.vue'
	export default {
		components: {
			component0,
			component1
		},
		data() {
			return {
				resumeId: '', // 简历id
				tplId: '', // 模板id
				tplIndex: 0, // 模板对应的索引
				resumeInfo: null, // 简历信息
				isShare: false, // 是否来源于分享
				resumeTplData: [] // 模板列表
			};
		},
		async onLoad (option) {
			let shareOption = uni.getLaunchOptionsSync()
			const {resumeId, tplId} = option
			this.isShare = shareOption.scene === 1008 || shareOption.scene === 1007 ? true : false // 区分是否源于分享
			this.resumeId = resumeId
			await this.getTplList()
			await this.loadResumeById()
			this.tplId = tplId ? tplId : this.resumeInfo.template_id // 优先获取URL传来的模板id，之后再获取简历信息绑定的模板id
			// 根据模板id，获取索引值，如果找不到就默认为0
			let tplI = this.resumeTplData.findIndex(item => item._id == this.tplId)
			if (tplI <= 0) {
				tplI = 0
			}
			this.tplIndex = tplI
		},
		methods: {
			async loadResumeById() {
				// 获取简历信息
				await this.$api.getResumeById({
					_id: this.resumeId
				}).then(res => {
					const {data, code, msg} = res
					if (code) {
						this.resumeInfo = data
					} else {
						uni.showToast({
							title: msg,
							icon: 'none'
						})
					}
				})
			},
			async getTplList () {
				// 获取简历模板列表
				await this.$api.getResumeTplList({
					dbName: "resume-template",
					order: {
						name: 'sort',
						type: 'desc'
					}
				}).then(res => {
					const { data } = res
					this.resumeTplData = data
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
