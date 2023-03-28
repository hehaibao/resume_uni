<template>
	<view class="project-describe">
		<head-custom isBack="true" :addHeight="20" />
		<header-title>
			<block slot="title">项目描述</block>
			<block slot="info">简要说明项目的内容</block>
		</header-title>

		<form-textarea :valMax="valMax" v-model="val" placeholder="举例: 1、使用了怎样的技术 2、项目人员分布"></form-textarea>

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
