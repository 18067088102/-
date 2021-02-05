<template>
	<view class="home_content">
		<view class="home_head">
			<image class="logo" src="/static/pic_logo.png"></image>
			<text class="text1">肥东交警</text>
			<text class="text2">黄牌车通行证申请</text>
		</view>
		<view class="home_bottom">
			<view class="button1" @click="applyOnlineClick">申请通行证</view>
			<view class="button1 button2" @click="applyRecordClick">申请记录查询</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			applyOnlineClick() {
				uni.navigateTo({
					url: '/pages/applyOnline/index'
				})
			},

			applyRecordClick() {
				uni.navigateTo({
					url: '/pages/applyRecord/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home_content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}

	.home_head {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 235rpx;
	}

	.logo {
		height: 128rpx;
		width: 128rpx;
	}

	.text1 {
		font-size: 40rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #262626;
		line-height: 40px;
		margin-top: 43rpx;
	}

	.text2 {
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #797979;
		line-height: 32rpx;
		margin-top: 20rpx;
	}
	
	.home_bottom {
		display: flex;
		flex-direction: column;
		position: absolute;
		bottom: 95rpx;
	}
	
	.button1 {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 540rpx;
		height: 88rpx;
		border-radius: 44rpx;
		background-color: #1978EF;
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
	
	.button2 {
		background-color: #3A5996;
		margin-top: 20rpx;
	}
</style>
