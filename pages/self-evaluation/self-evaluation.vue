<template>
	<view class="self-evaluation">
		<head-custom isBack="true" :addHeight="20" />
		<header-title>
			<block slot="title">自我评价</block>
			<block slot="info">说说自己吧~</block>
		</header-title>

		<form-textarea :valMax="valMax" v-model="val" heigth="600rpx"></form-textarea>

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
				valMax: 500,
				val: ''
			};
		},
		onLoad(option) {
			let { pageType } = option
			if (pageType == 'update') {
				let evaluate_about = this.$store.getters['update/getEvaluateInfoData']
				this.val = evaluate_about
			}
		},
		methods: {
			submitHandle() {
				this.$comm.navigateBack(1, () => {
					uni.$emit('updateEvaluateInfo', this.val)
				})
			}
		}
	}
</script>
