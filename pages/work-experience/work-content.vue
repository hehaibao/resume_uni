<template>
	<view class="work-content">
		<head-custom isBack="true" :addHeight="20" />
		<header-title>
			<block slot="title">工作内容</block>
			<block slot="info">简要说明工作所负责的内容</block>
		</header-title>

		<form-textarea heigth="800rpx" :valMax="valMax" v-model="val" placeholder="举例: 1、主要负责新员工入职培训; 2、分析制定员工每月个人销售业绩;3、帮助员工提高每日客单价,整体店面管理等工作"></form-textarea>

		<footer-btn @submit="submitHandle">
			<text slot="text">保存</text>
		</footer-btn>
	</view>
</template>

<script>
	import headerTitle from '../../components/header-title/header-title.vue';
	import footerBtn from '../../components/footer-btn/footer-btn.vue';
	import formTxtarea from '../../components/form-textarea/form-textarea.vue';

	export default {
		components: {
			headerTitle,
			footerBtn,
			formTxtarea
		},
		data() {
			return {
				valMax: 1600,
				val: ''
			};
		},
		onLoad({
			val = ''
		}) {
			this.val = val
		},
		methods: {
			submitHandle() {
				this.$comm.navigateBack()
				uni.$emit('setContent', this.val)
			}
		}
	}
</script>
