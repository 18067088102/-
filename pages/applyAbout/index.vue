<template>
	<view class="u-content">
		<u-parse :html="detail.content"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {
					content: ''
				}
			}
		},
		onLoad() {
			this.getNoticeListRequest()
		},
		methods: {
			async getNoticeListRequest() {
				var that = this
				return await that.$http(that.$api.getNoticeListUrl, {
					method: 'GET',
					data: {},
					token: uni.getStorageSync('token')
				}).then(res => {
					if (res.code == 200) {
						var notice = res.entityList[0].notice
						that.detail.content = notice
					}else {
						that.$u.toast(res.message)
					}
				}).catch(err => {})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.u-content {
		padding: 24rpx;
		font-size: 32rpx;
		color: $u-content-color;
		line-height: 1.6;
	}
</style>
