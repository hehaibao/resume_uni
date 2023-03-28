<template>
	<view class="index">
		<head-custom :addHeight="20">
			<block slot="content">简历管理</block>
		</head-custom>

		<view class="index-body">
			<block v-if="resumeData.length">
				<resume-list :resumeData="resumeData" />
			</block>
			<block v-else>
				<empty-page />
			</block>
			
			<view class="tips" v-if="resumeData.length >=1 && !isLoad">温馨提示：每个账号最多创建{{total}}份简历</view>
		</view>
		
		<footer-btn @submit="addResumeHandle" v-if="resumeData.length < total">
			<text slot="text">
				<text class="cuIcon-add"></text> 新建简历
			</text>
		</footer-btn>

	</view>
</template>

<script>
	import resumeList from '../../components/resume-list/resume-list.vue';
	import emptyPage from '../../components/empty-page/empty-page.vue';
	import footerBtn from '../../components/footer-btn/footer-btn.vue';
	export default {
		components: {
			resumeList,
			emptyPage,
			footerBtn
		},
		data() {
			return {
				isLoad: true,
				total: 1 // 总共可以创建简历的数量
			}
		},
		computed: {
			resumeData() {
				return this.$store.getters['resume/getResumeData']
			}
		},
		onLoad() {
			getApp().globalData.successCallbackHander.add(() => {
				this.loadResumeList()
			}, this)
		},
		onShareAppMessage: function() {
			return {
				title: `免费创建简历工具`,
				path: 'pages/index/index',
			};
		},
		methods: {
			addResumeHandle() {
				this.$comm.navigateTo("/pages/base-info/base-info")
			},
			loadResumeList() {
				return this.$api.getResumeList().then(res => {
					if (res.code) {
						this.$store.commit('resume/setResumeData', res.data)
						this.isLoad = false
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.index {
		min-height: 100vh;
		display: flex;
		flex-direction: column;

		.index-body {
			width: 100%;
			flex: 1;
		}
		
		.tips {
			color: #999;
			font-size: 24rpx;
			margin: 0 30rpx;
			text-align: right;
		}
	}
</style>
