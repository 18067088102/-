<template>
	<view class="record_container">
		<u-sticky offset-top="-100">
			<view class="search_box">
				<u-search v-model="keyword" placeholder="车牌号搜索" @click="showKeyBoard" :disabled="true" :shape="shape"
				 :show-action="showAction" :action-style="actionStyle" :input-align="inputAlign"></u-search>
			</view>
		</u-sticky>
		<view style="margin-top: 280rpx;" v-if="isNoData">
			<uni-empty :emptyText="emptyText"></uni-empty>
		</view>
		<u-keyboard :mask="true" ref="uKeyboard" safe-area-inset-bottom @confirm="cardNumConfirm" :random="false" :dotEnable="false"
		 mode="car" :confirmBtn="true" :cancelBtn="true" :tooltip="true" v-model="showCarNum" @change="change" @backspace="backspace"></u-keyboard>
		<view class="record_list">
			<view class="record_item" v-for="(item, index) in listsItem" :key="index">
				<view class="item_top solid-bottom">
					<view class="top_left">
						<image class="left_img" src="../../static/icon_license.png"></image>
						<text class="carNum_text">{{item.carNum}}</text>
					</view>
					<view class="top_left" @click="onDetail(index)">
						<text class="detail_text">查看详情</text>
						<image class="right_img" src="../../static/icon_right.png"></image>
					</view>
				</view>
				<view class="item_bottom">
					<view class="type-container">
						<text class="type-text">车辆类型:</text>
						<text class="content-text">{{item.carType}}</text>
					</view>
					<view class="type-container">
						<text class="type-text">申请时间:</text>
						<text class="content-text">{{item.createTime}}</text>
					</view>
					<view class="type-container">
						<text class="type-text">申请路线:</text>
						<text class="content-text">{{item.applicationRoute}}</text>
					</view>
					<view class="type-container" style="margin-bottom: 0rpx;">
						<text class="type-text">通行时间:</text>
						<text class="content-text">{{item.periodTime}}</text>
					</view>
					<view class="status_box" :class="item.reviewStatus=='5'?'bg1':item.reviewStatus=='2'||item.reviewStatus=='4'||item.reviewStatus=='6'?'bg2':'bg3'">
						<text class="status_text" :class="item.reviewStatus=='5'?'color1':item.reviewStatus=='2'||item.reviewStatus=='4'||item.reviewStatus=='6'?'color2':'color3'">{{item.reviewStatus=='5'?'审核通过':item.reviewStatus=='2'||item.reviewStatus=='4'||item.reviewStatus=='6'?'未通过':'待审核'}}</text>
					</view>
				</view>
			</view>
			<uni-load-more v-if="!isNoData&&isShowLoadMore" :status="status"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import uniEmpty from '@/components/uni-empty/uni-empty.vue'
	
	export default {
		components: {
			uniLoadMore,
			uniEmpty
		},
		data() {
			return {
				emptyText: '暂无搜索结果...',
				status: 'more',
				keyword: '',
				listsItem: [],
				loading: true,
				page: 1,
				pages: 0,
				isNoData: false,
				isShowLoadMore: false,
				
				shape: 'round',
				clearabled: true,
				showAction: false,
				actionStyle: {
					color: '#2979ff'
				},
				showCarNum: false,
				inputAlign: 'left',
			}
		},
		onShow() {
			this.getApplyRecordListRequest(1, true)
		},
		methods: {
			showKeyBoard() {
				this.showCarNum = true
			},
			// 点击退格键
			backspace() {
				if (this.keyword.length) this.keyword = this.keyword.substr(0, this.keyword.length - 1)
			},
			// 键盘按键发生变化
			change(detail) {
				this.keyword += detail
			},
			cardNumConfirm(e) {
				// console.log(this.keyword)
				this.getApplyRecordListRequest(1, true)
			},
			async getApplyRecordListRequest(pageNo, override) {
				var that = this
				return await that.$http(that.$api.getApplyRecordListUrl, {
					method: 'GET',
					data: {
						limit: '10',
						page: pageNo,
						carNumber: this.keyword
					},
					token: uni.getStorageSync('token')
				}).then(res => {
					if (res.code == 200) {
						const list = res.result.list
						that.status = list.length == 0 ? 'noMore' : 'more'
						that.isNoData = list.length == 0 ? true : false
						that.page = pageNo //当前的页号
						that.pages = res.result.totalPage //总页数
						that.listsItem = override ? list : that.listsItem.concat(list)
						that.isShowLoadMore = that.listsItem.length < 10 ? false : true
					} else {
						that.$u.toast(res.message)
						that.isNoData = true
					}
				}).catch(err => {
					that.isNoData = true
				})
			},
			onDetail(index) {
				var id = this.listsItem[index].id
				uni.navigateTo({
					url: '/pages/applyRecord/detail?id=' + id
				})
			}
		},
		/**
		 * 监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			uni.showNavigationBarLoading()
			this.getApplyRecordListRequest(1, true).then(() => {
				uni.hideNavigationBarLoading()
				// 处理完成后，终止下拉刷新
				uni.stopPullDownRefresh()
			})
		},
		/**
		 * 监听页面上拉触底事件
		 */
		onReachBottom: function() {
			if (this.loading && this.page < this.pages) {
				this.status = 'loading'
				this.getApplyRecordListRequest(this.page + 1)
			}
			if (this.loading && this.page == this.pages) {
				this.status = 'noMore'
			}
		},
	}
</script>

<style lang="scss" scoped>
	.record_container {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 100%;
		background: #F6F6F6;
	}

	.search_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
	}
	
	.record_list {
		padding: 4rpx 30rpx 24rpx;
	}

	.record_item {
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: #FFFFFF;
		box-shadow: 0rpx 2rpx 19rpx 0rpx rgba(0, 0, 0, 0.03);
		border-radius: 10rpx;
		margin-top: 24rpx;
	}

	.item_top {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 27rpx 30rpx 21rpx;
	}

	.top_left {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.left_img {
		width: 44rpx;
		height: 26rpx;
		margin-right: 16rpx;
	}

	.carNum_text {
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #262626;
		line-height: 32rpx;
	}

	.detail_text {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #595959;
		line-height: 24rpx;
	}

	.right_img {
		width: 24rpx;
		height: 24rpx;
		margin-left: 10rpx;
	}

	.item_bottom {
		display: flex;
		flex-direction: column;
		padding: 24rpx 30rpx;
		position: relative;
	}

	.type-container {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		margin-bottom: 18rpx;
		width: 100%;
	}

	.type-text {
		width: 138rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #262626;
		line-height: 28rpx;
	}

	.content-text {
		width: calc(100% - 138rpx);
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #595959;
		line-height: 34rpx;
	}

	.status_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 48rpx;
		padding: 0 20rpx;
		position: absolute;
		right: 0;
		top: 17rpx;
		border-top-left-radius: 24rpx;
		border-bottom-left-radius: 24rpx;
	}

	.status_text {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		line-height: 24rpx;
	}

	.bg1 {
		background-color: rgba(235, 251, 251, 1);
	}

	.bg2 {
		background-color: rgba(252, 243, 245, 1);
	}

	.bg3 {
		background-color: rgba(251, 243, 212, 1);
	}

	.color1 {
		color: #37CBCB;
	}

	.color2 {
		color: #F2647B;
	}

	.color3 {
		color: #F7B500;
	}

	.solid-bottom::after {
		border-bottom: 1rpx solid #EEEEEE;
	}
</style>
