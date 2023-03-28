<template>
	<view class="set-experience">
		<head-custom isBack="true" :addHeight="20" />
		<header-title>
			<block slot="title">在校经历</block>
			<block slot="info">简要总结一下你的校园成长经历，帮助TA人了解你</block>
		</header-title>

		<form-textarea :valMax="valMax" v-model="val" placeholder="举例: 1、在校担任职位...2、获得荣誉...3、所学主要课程..."></form-textarea>

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
				valMax: 300,
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
