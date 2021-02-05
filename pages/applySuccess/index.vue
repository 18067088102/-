<template>
	<view class="success_container">
		<image class="success_img" src="../../static/pic_success.png"></image>
		<text class="success_text">提交成功</text>
		<text class="des_text">审核周期为1~3个工作日，\n请在“申请记录查询”中查看结果！</text>
		<view class="btn_box">
			<view class="apply_btn" @click="applyClick">继续申请</view>
			<view class="back_btn" @click="backClick">返回</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fromID: ''
			}
		},
		onLoad(options) {
			this.fromID = options.fromID
		},
		methods: {
			applyClick() {
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2];
				prevPage.$vm.userName = ''
				prevPage.$vm.userPhone = ''
				prevPage.$vm.cardNum = ''
				prevPage.$vm.carType = ''
				prevPage.$vm.lines = ''
				prevPage.$vm.times = ''
				prevPage.$vm.startDate = ''
				prevPage.$vm.endDate = ''
				prevPage.$vm.onRemove1()
				prevPage.$vm.onRemove2()
				prevPage.$vm.onRemove3()
				uni.navigateBack({
					delta: 1
				})
			},
			backClick() {
				uni.navigateBack({
					delta: this.fromID == 0 ? 2 : 3
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.success_container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.success_img {
		width: 268rpx;
		height: 268rpx;
		margin-top: 135rpx;
	}

	.success_text {
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #262626;
		line-height: 45rpx;
		margin-top: 54rpx;
	}

	.des_text {
		height: 68rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 34rpx;
		margin-top: 8rpx;
		text-align: center;
	}
	
	.btn_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 80rpx;
		margin-top: 162rpx;
	}
	
	.apply_btn {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 290rpx;
		height: 80rpx;
		background: #1978EF;
		border-radius: 40rpx;
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 42rpx;
	}
	
	.back_btn {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 290rpx;
		height: 80rpx;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 40rpx;
		border: 1rpx solid #1978EF;
		margin-left: 24rpx;
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #1978EF;
		line-height: 42rpx;
	}
</style>
