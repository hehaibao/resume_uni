<template>
	<view class="header">
		<view class="title">
			<slot name="title"></slot>
		</view>
		<view class="info">
			<slot name="info"></slot>
		</view>
	</view>
</template>

<style lang="scss">
	.header {
		padding: 30upx 30upx 24upx;
		.title {
			color: $font-c10;
			font-size: 40upx;
		}

		.info {
			color: $font-c9;
			font-size: 28upx;
			line-height: 56upx;
		}
	}
</style>
