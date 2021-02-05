<template>
	<view class="login_container">
		<view class="login_box">
			<view class="home_head">
				<image class="logo" src="/static/pic_logo.png"></image>
				<text class="text1">肥东交警</text>
				<text class="text2">黄牌车通行证申请</text>
			</view>
			<view class='login-container1'>
				<!-- 手机号 -->
				<view class='phone-view common-view'>
					<image class="left_img" src="../../static/icon_login_phone.png"></image>
					<input class='login-input' :value="phoneNo" @input="getValue" @blur="phoneNoBlur" data-id="phoneNo" type='number'
					 maxlength='11' placeholder='请输入手机号' placeholder-class='placeholder'></input>
				</view>
				<!-- 验证码 -->
				<view class='vscode-view common-view'>
					<image class="left_img" src="../../static/icon_login_code.png"></image>
					<input style="width: 310rpx;" class='login-input' :value="smsCode" @input="getValue" data-id="smsCode" maxlength='6'
					 placeholder='输入验证码' placeholder-class='placeholder'></input>
					<view class='line'></view>
					<text class='vscode-text' @click='onGetCode'>{{getCodeText}}</text>
				</view>
				<!-- 注册按钮 -->
				<button class='submit-btn' style="margin-bottom: 30rpx;" :loading="isLoading" @click="submitHandler" :disabled="isDisable">{{buttonText}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNo: '',
				smsCode: '',
				isLoading: false,
				buttonText: '登录',
				isDisable: true,
				getCodeText: '获取验证码',
				isDisabled: true,
				fromID: '', //0:初进入时登录；1:token过期跳转登录
			}
		},
		onLoad(options) {
			this.fromID = options.fromID ? options.fromID : 0
			if (this.fromID == 0) {
				const token = uni.getStorageSync('token')
				if (token) {
					uni.redirectTo({
						url: '/pages/home/index',
					})
				}
			}
		},
		onShow() {
			this.phoneNo = uni.getStorageSync('phoneNo')
		},
		methods: {
			onGetCode() {
				if (this.phoneNo == '') {
					this.$u.toast('手机号码不能为空')
				} else if (this.phoneNo.length != 11 || !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNo))) {
					this.$u.toast('请输入正确的手机号')
				} else {
					if (this.isDisabled == true) {
						uni.showToast({
							title: '加载中…',
							icon: 'loading'
						})
						this.getCodeRequest();
					} else {
						this.$u.toast('已获取验证码,请稍后再试')
					}
				}
			},
			/**
			 * 获取短信验证码
			 */
			async getCodeRequest() {
				var that = this
				return await that.$http(that.$api.getLoginSMSCodeUrl + "?phone=" + that.phoneNo, {
					method: 'POST',
					data: {},
					token: ''
				}).then(res => {
					that.handleRequestResult(res)
				}).catch(err => {})
			},
			handleRequestResult(res) {
				uni.hideToast()
				if (res.code == 200) {
					_this.$u.toast('获取验证码成功')
					var _this = this
					var coden = 60 //定义60秒的倒计时
					var codeV = setInterval(function() {
						_this.getCodeText = (--coden) + 's' + '后重试'
						_this.isDisabled = false
						if (coden == -1) { //清除setInterval倒计时，这里可以做很多操作，按钮变回原样等
							clearInterval(codeV)
							_this.getCodeText = '获取验证码'
							_this.isDisabled = true
						}
					}, 1000) //1000是1秒
				} else {
					_this.$u.toast(res.message)
				}
			},
			submitHandler: function submitHandler(e) {
				if (this.phoneNo.length != 11 || !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNo))) {
					this.$u.toast('请输入正确的手机号')
					return
				}
				this.isLoading = true
				this.buttonText = '登录中...'
				this.isDisable = true
				this.onLoginEvent()
			},

			async onLoginEvent() {
				var that = this
				return await that.$http(that.$api.loginUrl + '?mobile=' + that.phoneNo + '&vcode=' + that.smsCode, {
					method: 'POST',
					data: {},
					token: ''
				}).then(res => {
					that.isLoading = false
					that.buttonText = '登录'
					that.isDisable = false
					if (res.code == 200) {
						uni.setStorageSync('phoneNo', that.phoneNo)
						uni.setStorageSync('token', res.token.token)
						uni.showToast({
							title: '登录成功',
							icon: 'none',
							success: (res) => {
								if (that.fromID == 0) {
									uni.redirectTo({
										url: "/pages/home/index"
									})
								}else {
									uni.navigateBack({
										delta: 1
									})
								}
							}
						})
					} else {
						this.$u.toast(res.message)
					}
				}).catch(err => {
					that.isLoading = false
					that.buttonText = '登录'
					that.isDisable = false
				})
			},
			toForget() {
				uni.navigateTo({
					url: '/pages/register/index?fromID=1',
				})
			},
			phoneNoBlur(event) {
				let phoneNo = event.detail.value || event.detail.text;
				if (!phoneNo) {
					phoneNo = ''
				}
				if (phoneNo.length != 11 || !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNo))) {
					this.$u.toast('请输入正确的手机号')
				}
			},
			getValue(e) {
				let type = e.currentTarget.dataset.id;
				if (type == 'phoneNo') {
					this.phoneNo = e.detail.value.replace(/\s+/g, '')
				}
				if (type == "smsCode") {
					this.smsCode = e.detail.value.replace(/\s+/g, '')
				}
				this.validateEmpty();
			},
			validateEmpty() {
				if (this.phoneNo == '' || this.smsCode == '') {
					this.isDisable = true
				} else {
					this.isDisable = false
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.login_container {
		width: 100%;
		height: 100%;
		background: linear-gradient(318deg, #36B0F8 0%, #1978EF 100%);
		padding: 220rpx 40rpx 0;
	}

	.login_box {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 754rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 2rpx 20rpx 0rpx rgba(11, 59, 115, 0.13);
		border-radius: 20rpx;
	}

	.home_head {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 40rpx;
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
	}

	.text2 {
		font-size: 30rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #797979;
		line-height: 30rpx;
	}

	.login-container1 {
		display: flex;
		flex-direction: column;
		margin-top: 48rpx;
	}

	.common-view {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 590rpx;
		padding: 0 32rpx;
		height: 92rpx;
		background: #EDF0F7;
		border-radius: 46rpx;
		position: relative;
	}

	.phone-view {
		margin: 0 40rpx;
	}

	.left_img {
		width: 44rpx;
		height: 44rpx;
		margin-right: 8rpx;
	}

	.login-input {
		width: 530rpx;
		height: 40rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(47, 45, 44, 1);
		line-height: 48rpx;
	}

	.placeholder {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #9EA0A6;
		line-height: 40rpx;
		text-align: left;
	}

	.vscode-view {
		margin: 32rpx 40rpx 0;
	}

	.line {
		width: 2rpx;
		height: 32rpx;
		background: #CCD7F2;
		border-radius: 2rpx;
		margin-left: 10rpx;
	}

	.vscode-text {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #1978EF;
		line-height: 40rpx;
		margin-left: 16rpx;
	}

	.submit-btn {
		height: 92rpx;
		background: #1978EF;
		border-radius: 46rpx;
		margin-top: 42rpx;
	}
</style>
