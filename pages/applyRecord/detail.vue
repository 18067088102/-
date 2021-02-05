<template>
	<view class="detail_container">
		<view class="cu-bar" style="background-color: #F6F6F6;">
			<view class="action">
				<text class="action1" style="color: rgba(25, 31, 37, 0.4);">申请信息</text>
			</view>
		</view>
		<view class="list_content">
			<view class="type-container">
				<text class="type-text">申请人:</text>
				<text class="content-text">{{dataDic.applicantName}}</text>
			</view>
			<view class="type-container">
				<text class="type-text">手机号:</text>
				<text class="content-text">{{dataDic.applicantPhone}}</text>
			</view>
			<view class="type-container">
				<text class="type-text">车牌号:</text>
				<text class="content-text">{{dataDic.carNum}}</text>
			</view>
			<view class="type-container">
				<text class="type-text">车辆类型:</text>
				<text class="content-text">{{dataDic.carType}}</text>
			</view>
			<view class="type-container">
				<text class="type-text">申请路线:</text>
				<text class="content-text">{{dataDic.applicationRoute}}</text>
			</view>
			<view class="type-container">
				<text class="type-text">通行时段:</text>
				<text class="content-text">{{dataDic.passTime}}</text>
			</view>
			<view class="type-container">
				<text class="type-text">有效期:</text>
				<text class="content-text">{{dataDic.periodTime}}</text>
			</view>
			<view class="type-container">
				<text class="type-text">申请时间:</text>
				<text class="content-text">{{dataDic.createTime}}</text>
			</view>
		</view>
		<view class="cu-bar" style="background-color: #F6F6F6;">
			<view class="action">
				<text class="action1" style="color: rgba(25, 31, 37, 0.4);">审核信息</text>
			</view>
		</view>
		<view class="list_content">
			<view class="type-container" v-if="dataDic.reviewStatus!='0'&&dataDic.reviewStatus!='1'&&dataDic.reviewStatus!='3'">
				<text class="type-text">审核部门:</text>
				<text class="content-text">{{dataDic.reviewName}}</text>
			</view>
			<view class="type-container" v-if="dataDic.reviewStatus!='0'&&dataDic.reviewStatus!='1'&&dataDic.reviewStatus!='3'">
				<text class="type-text">审核时间:</text>
				<text class="content-text">{{dataDic.reviewTime}}</text>
			</view>
			<view class="type-container">
				<text class="type-text">审核状态:</text>
				<text class="content-text" :style="dataDic.reviewStatus=='5'?'color: #37CBCB;':dataDic.reviewStatus=='2'||dataDic.reviewStatus=='4'||dataDic.reviewStatus=='6'?'color: #F2647B;':'color: #F7B500;'">{{dataDic.reviewStatus=='5'?'已通过':dataDic.reviewStatus=='2'||dataDic.reviewStatus=='4'||dataDic.reviewStatus=='6'?'未通过':'待审核'}}</text>
			</view>
			<view class="type-container" v-if="dataDic.reviewStatus!='0'&&dataDic.reviewStatus!='1'&&dataDic.reviewStatus!='3'&&dataDic.reviewStatus!='5'">
				<text class="type-text">审核备注:</text>
				<text class="content-text">{{dataDic.reviewRemark}}</text>
			</view>
		</view>
		<button v-if="dataDic.reviewStatus!='0'&&dataDic.reviewStatus!='1'&&dataDic.reviewStatus!='3'" class='submit-btn' style="margin-top: 70rpx;width: calc(100% - 250rpx);" @click="submitHandler(dataDic.reviewStatus)">{{dataDic.reviewStatus=='5'?'查看通行证':'重新提交'}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataDic: {},
				id: ''
			}
		},
		onLoad(options) {
			var id = options.id
			this.id = id
			this.getRecordDetailRequest(id)
		},
		methods: {
			async getRecordDetailRequest(id) {
				var that = this
				return await that.$http(that.$api.getApplyRecordDetailUrl + '/' + id, {
					method: 'GET',
					data: {},
					token: uni.getStorageSync('token')
				}).then(res => {
					if (res.code == 200) {
						that.dataDic = res.record
					}else {
						that.$u.toast(res.message)
					}
				}).catch(err => {})
			},
			submitHandler(status) {
				if(status=='5') {
					uni.navigateTo({
						url: '/pages/applyRecord/lisence'
					})
				}else{
					uni.navigateTo({
						url: `/pages/applyOnline/index?id=${this.id}&fromID=1`
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list_content {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 30rpx 30rpx 10rpx;
	}
	
	.type-container {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		margin-bottom: 24rpx;
		width: 100%;
	}
	
	.type-text {
		width: 125rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 28rpx;
		text-align: right;
	}
	
	.content-text {
		width: calc(100% - 155rpx);
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #262626;
		line-height: 34rpx;
		margin-left: 30rpx;
	}
</style>
