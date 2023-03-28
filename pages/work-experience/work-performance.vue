<template>
	<view class="work-performance">
		<head-custom isBack="true" :addHeight="20" />
		<header-title>
			<block slot="title">工作业绩</block>
			<block slot="info">填写有吸引力的工作业绩，将会引起TA人的关注</block>
		</header-title>

		<form-textarea :valMax="valMax" v-model="val" placeholder="请输入工作业绩"></form-textarea>

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
