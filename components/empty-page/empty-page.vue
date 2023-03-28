<template>
	<view class="mescroll-empty" :class="{ 'empty-fixed': option.fixed }" :style="{ 'z-index': option.zIndex, top: option.top }">
		<view>
			<image v-if="icon" class="empty-icon" :src="icon" mode="widthFix" />
		</view>
		<view v-if="tip" class="empty-tip">{{ tip }}</view>
		<view v-if="option.btnText" class="empty-btn" @click="emptyClick">{{ option.btnText }}</view>
	</view>
</template>

<script>
	export default {
		props: {
			option: {
				type: Object,
				default: {
					icon: '/static/img/nodata.png',
					tip: '~ 空空如也 ~'
				}
			}
		},
		computed: {
			// 图标
			icon() {
				return this.option.icon || '/static/img/nodata.png';
			},
			// 文本提示
			tip() {
				return this.option.tip || '~ 空空如也 ~';
			}
		},
		methods: {
			// 点击按钮
			emptyClick() {
				this.$emit('emptyclick');
			}
		}
	};
</script>

<style lang="scss">
	.mescroll-empty {
		box-sizing: border-box;
		width: 100%;
		padding: 100rpx 50rpx;
		text-align: center;
		height: 100%;
		.empty-fixed {
			z-index: 99;
			position: absolute;
			/*transform会使fixed失效,最终会降级为absolute */
			top: 100rpx;
			left: 0;
		}

		.empty-icon {
			width: 280rpx;
			height: 280rpx;
		}

		.empty-tip {
			margin-top: 20rpx;
			font-size: 24rpx;
			color: $font-c9;
		}

		.empty-btn {
			display: inline-block;
			margin-top: 40rpx;
			min-width: 200rpx;
			padding: 18rpx;
			font-size: 28rpx;
			border: 1rpx solid #e04b28;
			border-radius: 60rpx;
			color: #e04b28;
			&:active {
				opacity: 0.75;
			}
		}
	}
</style>
