<template>
	<view>
		<view class="head-custom" :style="{'height':(CustomBar+addHeight)+'px'}">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'']">
				<block v-if="isBack">
					<view class="action" @tap="BackPage">
						<text class="cuIcon-back"></text>
						<slot name="backText"></slot>
					</view>
				</block>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
			<view class="add-height" :style="{'height':addHeight+'px'}"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		computed: {
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var bgImage = this.bgImage;
				var bgColor = this.bgColor
				var addHeight = this.addHeight
				var style = `height:${CustomBar+addHeight}px;padding-top:${StatusBar}px;background-color:${bgColor};`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: '#00d2ca'
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
			addHeight: {
				type: Number,
				default: 0
			}
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss">
	.head-custom {
		.action {
			color: #fff;
		}

		.content {
			color: #fff;
			font-size: 32upx;

		}
	}

	.add-height {
		background-color: $index-color;
	}
</style>
