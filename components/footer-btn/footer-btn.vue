<template>
	<view class="footer-btn">
		<view class="submit-body">
			<view class="submit-btn" @click="submitHandle">
				<slot name="text"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods:{
			submitHandle(){
				this.$emit('submit')
			}
		}
	}
</script>

<style lang="scss">
	.footer-btn {
		margin-top: 40upx;
		height: 160upx;

		.submit-body {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 160upx;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 22;

			.submit-btn {
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: $index-color;
				color: #fff;
				letter-spacing: 4upx;
				font-size: 34upx;
				height: 90upx;
				width: 90%;
				border-radius: 100upx;
			}
		}
	}
</style>
