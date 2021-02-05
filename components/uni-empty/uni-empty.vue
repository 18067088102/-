<template>
	<view class="empty_page" :style="{background: bgColor}">
		<image class="empty_img" src="../../static/icon_null_img.png"></image>
		<text class="empty_text">{{emptyText}}</text>
	</view>
</template>

<script>
	export default {
		name: "UniEmpty",
		props: {
			emptyText: {
				type: String,
				default: '暂无数据...'
			},
			bgColor: {
				type: String,
				default: '#F6F6F6'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.empty_page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.empty_img {
		width: 280rpx;
		height: 206rpx;
	}
	
	.empty_text {
		margin-top: 28rpx;
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #2A2C2F;
		line-height: 46rpx;
	}
</style>
