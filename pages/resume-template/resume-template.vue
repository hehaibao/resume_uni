<template>
	<view class="template-box">
		<head-custom isBack="true" :addHeight="20">
			<block slot="content">选择简历模板</block>
		</head-custom>
		<view class="tpl-body">
			<block v-if="resumeTplData.length">
				<view class="tpl-item" :class="{'active': item._id==selectedTplId}" @click="selectTpl(item._id)" v-for="item in resumeTplData" :key="item._id" :style="{backgroundImage: `url(${item.cover})`}">
					<view class="default" v-if="item.default">默认</view>
					<view class="bottom">
						<view class="name">{{item.name}}</view>
						<view class="preview" @click.stop="previewResume(item._id)"><text class="cuIcon-attention"></text> 预览</view>
					</view>
				</view>
			</block>
			<block v-if="!resumeTplData.length && !isLoad">
				<empty-page />
			</block>
		</view>
	</view>
</template>

<script>
import emptyPage from '../../components/empty-page/empty-page.vue';
export default {
	data() {
		return {
			isLoad: true,
			resumeId: '', // 简历id
			page: 1,
			pageSize: 10,
			hasMore: true,
			resumeTplData: [], // 简历模板数据
			selectedTplId: '' // 已选择的简历模板id
		}
	},
	components: {
		emptyPage
	},
	onLoad(option) {
		this.resumeId = option.resumeId
		this.selectedTplId = option.resumeTplId
		this.getTplList()
	},
	onReachBottom() {
		if (this.hasMore) {
			this.page++
			this.getTplList()
		}
	},
	methods: {
		getTplList () {
			// 获取简历模板列表
			const that = this;
			that.$api.getResumeTplList({
				dbName: "resume-template",
				order: {
					name: 'sort',
					type: 'desc'
				},
				pageIndex: that.page,
				pageSize: that.pageSize
			}).then(res => {
				const { data, hasMore } = res
				that.hasMore = hasMore
				that.isLoad = false
				that.resumeTplData = that.page == 1 ? data : that.resumeTplData.concat(data)
			})
		},
		selectTpl (tplId) {
			// 选择模板
			if (this.selectedTplId == tplId) return
			this.selectedTplId = tplId
			this.$api.updateResume({
				_id: this.resumeId,
				template_id: this.selectedTplId
			}).then(res => {
				if (res.code) {
					this.$store.commit('resume/updateResumeTplId', {
						_id: this.resumeId,
						template_id: this.selectedTplId
					})
					this.$comm.successToShow("切换简历模板成功")
				}
			})
		},
		previewResume (tplId) {
			// 预览简历模板
			this.$comm.navigateTo(`/pages/resume/preview?resumeId=${this.resumeId}&tplId=${tplId}`)
		}
	}
}
</script>

<style lang="scss">
.template-box {
	min-height: 100vh;
	.tpl-body {
		margin: 30rpx;
		display: flex;
		flex-wrap: wrap;
		.tpl-item {
			display: flex;
			flex-flow: column;
			width: 48%;
			height: 580rpx;
			margin: 0 4% 4% 0;
			background-color: $index-bg-gray;
			background-position: center top;
			background-repeat: no-repeat;
			background-size: cover;
			border: 1rpx solid $index-bg-gray;
			border-radius: 10rpx;
			position: relative;
			
			&:nth-child(2n) {
				margin-right: 0;
			}
			
			&.active {
				border-color: $index-color;
			}
			
			.bottom {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 60rpx;
				line-height: 60rpx;
				background-color: rgba(0,0,0,.5);
				color: #fff;
				font-size: 24rpx;
				padding: 0 20rpx;
				border-bottom-left-radius: 10rpx;
				border-bottom-right-radius: 10rpx;
				overflow: hidden;
				.name {
					width: 70%;
					height: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					float: left;
				}
				.preview {
					float: right;
					font-size: 24rpx;
				}
			}
			
			.default {
				background-color: rgba(0,0,0,.5);
				color: #fff;
				font-size: 24rpx;
				padding: 6rpx 12rpx;
				position: absolute;
				top: 20rpx;
				left: 0;
				border-top-right-radius: 20rpx;
				border-bottom-right-radius: 20rpx;
			}
		}
	}
}
</style>