<template>
	<view class="row-item">
		<view class="info-title">
			<slot name="title"></slot>
		</view>
		<view class="info-from">
			<slot name="from"></slot>
		</view>
	</view>
</template>

<style lang="scss">
	.row-item {
		padding: 30upx 20upx 0 30upx;
		position: relative;
		&::after {
			width: calc(200% - 100rpx);
			position: absolute;
			top: 0;
			left: 30upx;
			box-sizing: border-box;
			height: 200%;
			border-bottom: 5rpx solid $border-c;
			border-radius: inherit;
			content: " ";
			transform: scale(.5);
			transform-origin: 0 0;
			pointer-events: none;
		}

		.info-title {
			color: $font-c10;
			font-size: 32upx;
		}

		.info-from {
			height: 110upx;
			display: flex;
			align-items: center;
			font-size: 28upx;
		}
	}
</style>
