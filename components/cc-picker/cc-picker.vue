<template>
	<picker class="from-picker arrow" @change="change" :value="Index" :range="Range">
		<view class="picker">
			<text v-if="Value">
				{{Value}}
			</text>
			<text v-else class="picker-info">
				{{null_str||'请选择'}}
			</text>
		</view>
	</picker>
</template>

<script>
	export default {
		name: 'ccPicker',
		props: {
			range: {
				type: Array,
				default: []
			},
			value: {
				type: String
			},
			null_str: {
				type: String,
				default: '',
			}
		},
		data() {
			return {
				Value: this.value
			}
		},
		methods: {
			change(e) {
				this.Value = this.Range[parseInt(e.target.value)];
				this.$emit('change', this.Value);
			}
		},
		computed: {
			Index() {
				return this.Range.findIndex(val => val == this.Value);
			},
			Range() {
				return this.range;
			}
		},
		watch: {
			value(newVal) {
				this.Value = newVal
			},
			Value(newVal) {
				this.$emit('input', newVal)
			}
		}
	}
</script>

<style lang="scss">
	.from-picker {
		text-align: left;
		width: 100%;
		position: relative;

		.picker-info {
			color: $font-c9;
			font-size: 28upx;
		}
	}
</style>
