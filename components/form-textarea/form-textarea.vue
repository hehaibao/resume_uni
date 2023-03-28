<template>
	<view class="form-textarea">
		<view class="uni-textarea" :style="{'height':heigth}">
			<textarea :placeholder="placeholder" :maxlength="valMax" class="textarea-ui" :show-confirm-bar="true"
				:value="value" placeholder-class="placeholderText" @input="inputHandle" />
			<view class="size">
				<text class="curr-text">{{size}}</text>/<text class="max-text">{{valMax}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		props: {
			valMax: {
				type: Number,
				default: 300
			},
			placeholder: {
				type: String,
				default: '请输入'
			},
			value: {
				type: String,
				default: ''
			},
			heigth: {
				type: String,
				default: '600rpx'
			}
		},
		computed: {
			size() {
				return this.value.length;
			}
		},
		methods: {
			inputHandle(e) {
				let val = e.target.value;
				this.$emit("input", val)
			}
		}
	}
</script>

<style lang="scss">
	.placeholderText {
		color: $font-c9;
	}
	.form-textarea {
		.uni-textarea {
			padding: 10upx 30upx;
			height: 400upx;
			position: relative;

			.textarea-ui {
				width: 100%;
				font-size: 30upx;
				font-family: STXihei;
				font-weight: 400;
				height: 100%;
				color: $font-c10;
				position: relative;
				background-color: #f2f2f2;
				padding: 30upx;
			}

			.size {
				position: absolute;
				bottom: -36upx;
				right: 30upx;

				.max-text {
					color: $font-c10;
				}

				.curr-text {
					color: $index-color;
				}
			}
		}
	}
</style>
