<template>
	<view class="professional">
		<head-custom isBack="true" :addHeight="20" />
		<header-title>
			<block slot="title">专业技能</block>
			<block slot="info">填写自己最熟练、有竞争力的技能</block>
		</header-title>

		<form-textarea :valMax="valMax" v-model="val" heigth="600rpx"></form-textarea>

		<footer-btn @submit="submitHandle">
			<text slot="text">
				保存
			</text>
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
				let major_about = this.$store.getters['update/getMajorInfoData']
				this.val = major_about
			}
		},
		methods: {
			submitHandle() {
				this.$comm.navigateBack(1,()=>{
					uni.$emit('updateMajorInfo', this.val)
				})
			}
		}
	}
</script>
