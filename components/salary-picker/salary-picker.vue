<template>
	<picker class="from-picker" mode="multiSelector" @change="salaryMultiChange" @columnchange="salaryMultiColumnChange" :value="pickerValue" :range="salaryList">
		<view class="picker">
			{{findValue(salary)}}
		</view>
	</picker>
</template>

<script>
	export default {
		props: {
			salary: {
				type: Array,
				default: ['面议', '面议']
			}
		},
		data() {
			return {
				pickerValue: Array(2).fill()
			};
		},
		watch: {
			salary: {
				handler(value) {
					this.init()
				},
				immediate: true
			}
		},
		computed: {
			twoList() {
				let twoList = this.salaryAllList
				if (this.pickerValue[0] == 0) {
					twoList = ['面议']
				} else {
					twoList = twoList.slice(this.pickerValue[0] + 1)
				}
				return twoList
			},
			salaryList() {
				let salaryList = [this.salaryAllList, this.twoList]
				return salaryList
			},
			salaryAllList() {
				let salaryAllList = ["面议"]
				let i = 1
				let step = 1
				while (i <= 250) {
					salaryAllList.push(i + "K")
					if (i < 30) {
						step = 1
					} else if (i < 100) {
						step = 5
					} else {
						step = 10
					}
					i += step
				}
				return salaryAllList
			}
		},
		methods: {
			salaryMultiColumnChange(e) {
				let { column, value } = e.detail
				this.$set(this.pickerValue, column, value)
				if (column == 0) {
					if (this.pickerValue[1] >= this.twoList.length) {
						this.$set(this.pickerValue, 1, this.twoList.length - 1)
					}
				}
			},
			salaryMultiChange(e) {
				let salaryList = this.salaryList
				this.$emit('pickerChange', [
					salaryList[0][this.pickerValue[0]],
					salaryList[1][this.pickerValue[1]]
				])
			},
			init() {
				this.pickerValue = this.getIndex(this.salary)
			},
			getIndex(value) {
				let salaryAllList = this.salaryAllList
				let oneSalaryIndex = salaryAllList.findIndex((salary) => salary == value[0])
				let twoList = []

				if (oneSalaryIndex === 0) {
					twoList = ['面议']
				} else {
					twoList = salaryAllList.slice(oneSalaryIndex+1)
				}
				let twoIndex = twoList.findIndex(two => two === value[1])
				return [oneSalaryIndex, twoIndex]
			},
			findValue() {
				let salaryList = this.salaryList
				let strArr = (salaryList.map((salary, index) => salary[this.pickerValue[index]]))
				return Array.from(new Set(strArr)).join(" - ")
			}
		}
	}
</script>

<style lang="scss">
	salary-picker {
		width: 100%;
	}
	.from-picker {
		width: 100%;

		.picker {
			line-height: 110upx;
			text-align: right;
			height: 100%;
			padding-left: 30upx;
			font-size: 28rpx;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			width: 100%;
			text-align: right;
		}
	}
</style>
