<template>
	<view>
		<view class="wrap">
			<view class="cu-bar" style="background-color: #F6F6F6;">
				<view class="action">
					<text class="action1" style="color: rgba(25, 31, 37, 0.4);">基本信息</text>
				</view>
			</view>
			<view class="cu-form-group solid-bottom">
				<view class="title" style="color: #191F25;">申请人<text style="color: #E02020;">*</text></view>
				<input :value="userName" @input="userNameInput" placeholder="请输入申请人姓名" placeholder-class='placeholder' maxlength="10"></input>
			</view>
			<view class="cu-form-group solid-bottom">
				<view class="title" style="color: #191F25;">手机号<text style="color: #E02020;">*</text></view>
				<input :value="userPhone" @input="userPhoneInput" @blur="userPhoneBlur" placeholder="请输入手机号" placeholder-class='placeholder'
				 maxlength="11" type="number"></input>
			</view>
			<view class="cu-form-group solid-bottom" @click="cardNumFocus">
				<view class="title" style="color: #191F25;">车牌号<text style="color: #E02020;">*</text></view>
				<input disabled :value="cardNum" placeholder="请输入车牌号" placeholder-class='placeholder'></input>
			</view>
			<view class="cu-form-group solid-bottom" @click="selectCarType">
				<view class="title" style="color: #191F25;">车辆类型<text style="color: #E02020;">*</text></view>
				<picker disabled>
					<view class="picker" :class="carType?'color2':'color1'">
						{{carType?carType:'请选择车辆类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group solid-bottom" @click="chooseLines">
				<view class="title" style="color: #191F25;">申请路线<text style="color: #E02020;">*</text></view>
				<picker disabled>
					<view class="picker" :class="lines?'color2':'color1'">
						{{lines?lines:'请选择申请路线'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group solid-bottom" @click="chooseTimes">
				<view class="title" style="color: #191F25;">通行时段<text style="color: #E02020;">*</text></view>
				<picker disabled>
					<view class="picker" :class="times?'color2':'color1'">
						{{times?times:'请选择通行时段'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title" style="color: #191F25;">有效期<text style="color: #E02020;">*</text></view>
				<view class="city_box">
					<view class="type_box">
						<view class="type_box_item normal_bg" @click="chooseDate1">
							<text class="normal_color">{{startDate?startDate:'起始日期'}}</text>
						</view>
					</view>
					<text class="middle_text">至</text>
					<view class="type_box">
						<view class="type_box_item normal_bg" @click="chooseDate2">
							<text class="normal_color">{{endDate?endDate:'结束日期'}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="line-view"></view>
			<view class="card_head">
				<text class="left_title">车辆行驶证<text style="color: #E02020;">*</text></text>
			</view>
			<view class="photo_box">
				<view class="photo_text">
					<u-upload width="333" height="206" ref="uUpload1" :file-list="imgList1" :action="action" :custom-btn="true"
					 max-count="1" @on-success="onSuccess1" @on-remove="onRemove1">
						<image slot="addBtn" class="slot-btn" src="../../static/pic_zhuye.png" hover-class="slot-btn__hover"
						 hover-stay-time="150"></image>
					</u-upload>
					<text class="tips_text">上传行驶证主页</text>
				</view>
				<view class="photo_text">
					<u-upload width="333" height="206" ref="uUpload2" :file-list="imgList2" :action="action" :custom-btn="true"
					 max-count="1" @on-success="onSuccess2" @on-remove="onRemove2">
						<image slot="addBtn" class="slot-btn" src="../../static/pic_fuye.png" hover-class="slot-btn__hover"
						 hover-stay-time="150"></image>
					</u-upload>
					<text class="tips_text">上传行驶证副页</text>
				</view>
			</view>
			<view class="card_head" style="margin-top: 48rpx;">
				<text class="left_title">其他材料</text>
			</view>
			<view class="photo_box">
				<u-upload width="333" height="206" ref="uUpload3" :file-list="imgList3" :action="action" :custom-btn="true"
				 max-count="1" @on-success="onSuccess3" @on-remove="onRemove3">
					<image slot="addBtn" class="slot-btn" src="../../static/pic_qita.png" hover-class="slot-btn__hover"
					 hover-stay-time="150"></image>
				</u-upload>
			</view>
			<view class="agreement">
				<u-checkbox v-model="check" @change="checkboxChange">已阅读</u-checkbox>
				<view class="agreement-text" @click="onOnlineAbout">
					《通行证申请须知》
				</view>
			</view>
			<button class='submit-btn' :loading="isLoading" @click="submitHandler" :disabled="isDisable">{{buttonText}}</button>
			<u-picker mode="selector" v-model="selectShow" @confirm="selectConfirm" :defaultSelector="defaultValue" :range="selectList"
			 :range-key="rangKey"></u-picker>
			<u-keyboard :mask="true" ref="uKeyboard" safe-area-inset-bottom @confirm="cardNumConfirm" :random="false" :dotEnable="false"
			 mode="car" :confirmBtn="true" :cancelBtn="true" :tooltip="true" v-model="showCarNum" @change="change" @backspace="backspace"></u-keyboard>
			<u-picker mode="time" :defaultTime="defaultTime" v-model="showDate" :params="params" end-year="2030" @confirm="confirmDate"></u-picker>
			<u-picker mode="time" :defaultTime="defaultTime1" v-model="showDate1" :params="params" end-year="2030" @confirm="confirmDate1"></u-picker>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				action: this.$api.uploadImageUrl,
				userName: '',
				userPhone: '',
				cardNum: '',
				carType: '',
				lines: '',
				times: '',
				startDate: '',
				endDate: '',
				illegalPhoneNum: false,
				isLoading: false,
				buttonText: '提交申请',
				isDisable: false,
				img1: '',
				img2: '',
				img3: '',
				imgList1: [],
				imgList2: [],
				imgList3: [],
				agreement: false,
				showDate: false,
				showDate1: false,
				showCarNum: false,
				defaultTime: '',
				defaultTime1: '',
				params: {
					year: true,
					month: true,
					day: true
				},
				defaultValue: [0],
				rangKey: 'name',
				selectList: [{
						value: '渣土车',
						name: '渣土车'
					},
					{
						value: '混凝土搅拌车',
						name: '混凝土搅拌车'
					},
					{
						value: '重型普通货车',
						name: '重型普通货车'
					},
					{
						value: '重型箱式货车',
						name: '重型箱式货车'
					},
					{
						value: '重型自卸货车',
						name: '重型自卸货车'
					},
					{
						value: '重型普通半挂车',
						name: '重型普通半挂车'
					},
					{
						value: '重型普通全挂车',
						name: '重型普通全挂车'
					},
					{
						value: '中型普通客车',
						name: '中型普通客车'
					},
					{
						value: '中型封闭货车',
						name: '中型封闭货车'
					},
					{
						value: '中型集装箱车',
						name: '中型集装箱车'
					},
					{
						value: '中型自卸货车',
						name: '中型自卸货车'
					},
					{
						value: '中型普通半挂车',
						name: '中型普通半挂车'
					},
					{
						value: '中型普通全挂车',
						name: '中型普通全挂车'
					},
					{
						value: '中型专项作业车',
						name: '中型专项作业车'
					},
					{
						value: '大型普通客车',
						name: '大型普通客车'
					},
					{
						value: '大型专项作业车',
						name: '大型专项作业车'
					}
				],
				check: false,
				selectShow: false,
				fromID: 0, //0:初始申请；1:审核不通过重新申请(编辑)
				id: ''
			}
		},
		onLoad(options) {
			this.fromID = options.fromID ? options.fromID : 0
			if (this.fromID == 1) {
				this.getRecordDetailRequest(options.id)
			}
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
						that.id = res.record.id
						that.userName = res.record.applicantName
						that.userPhone = res.record.applicantPhone
						that.cardNum = res.record.carNum
						that.carType = res.record.carType
						that.lines = res.record.applicationRoute
						that.times = res.record.passTime
						that.startDate = res.record.periodTime.split('至')[0]
						that.endDate = res.record.periodTime.split('至')[1]
						that.img1 = res.record.vehicleLicenseFrontImg
						that.img2 = res.record.vehicleLicenseBackImg
						that.img3 = res.record.additionalMaterials
						if (that.img1) {
							that.$refs.uUpload1.lists = [{
								'url': that.$common.combineImageUrl(that.img1)
							}]
						}
						if (that.img2) {
							that.$refs.uUpload2.lists = [{
								'url': that.$common.combineImageUrl(that.img2)
							}]
						}
						if (that.img3) {
							that.$refs.uUpload3.lists = [{
								'url': that.$common.combineImageUrl(that.img3)
							}]
						}
					}
				}).catch(err => {})
			},
			onRemove1(index, lists) {
				this.$refs.uUpload1.lists = []
				this.img1 = ''
			},
			onRemove2(index, lists) {
				this.$refs.uUpload2.lists = []
				this.img2 = ''
			},
			onRemove3(index, lists) {
				this.$refs.uUpload3.lists = []
				this.img3 = ''
			},
			onSuccess1(data, index, lists) {
				this.$u.toast('行驶证主页上传成功')
				this.img1 = data.message
			},
			onSuccess2(data, index, lists) {
				this.$u.toast('行驶证副页上传成功')
				this.img2 = data.message
			},
			onSuccess3(data, index, lists) {
				this.$u.toast('其他材料上传成功')
				this.img3 = data.message
			},
			selectCarType() {
				this.selectShow = true
			},
			userNameInput(event) {
				let userName = event.detail.value || event.detail.text;
				if (!userName) {
					userName = ''
				}
				this.userName = userName.replace(/\s+/g, '')
			},
			userPhoneInput(event) {
				let userPhone = event.detail.value || event.detail.text;
				if (!userPhone) {
					userPhone = ''
				}
				this.userPhone = userPhone.replace(/\s+/g, '')
			},
			userPhoneBlur(event) {
				let userPhone = event.detail.value || event.detail.text;
				if (!userPhone) {
					userPhone = ''
				}
				if (userPhone.length != 11 || !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(userPhone))) {
					this.$u.toast('请输入正确的手机号');
					this.illegalPhoneNum = true
				} else {
					this.illegalPhoneNum = false
				}
			},
			submitHandler() {
				if (!this.userName) return this.$u.toast('请输入申请人姓名');
				if (!this.userPhone) return this.$u.toast('请输入手机号');
				if (!this.cardNum) return this.$u.toast('请输入车牌号');
				if (!this.carType) return this.$u.toast('请选择车辆类型');
				if (!this.lines) return this.$u.toast('请选择申请路线');
				if (!this.times) return this.$u.toast('请选择通行时段');
				if (!this.img1) return this.$u.toast('请上传行驶证主页');
				if (!this.img2) return this.$u.toast('请上传行驶证副页');
				if (!this.agreement) return this.$u.toast('请勾选通行证申请须知');
				this.isLoading = true
				this.buttonText = '提交中...'
				this.isDisable = true
				this.addApplyRecordRequest()
			},
			async addApplyRecordRequest() {
				var that = this
				return await that.$http(that.fromID == 0 ? that.$api.addApplyRecordUrl : that.$api.updateApplyRecordUrl, {
					method: that.fromID == 0 ? 'POST' : 'PUT',
					data: that.fromID == 0 ? {
						applicantName: that.userName,
						applicantPhone: that.userPhone,
						carNum: that.cardNum,
						carType: that.carType,
						applicationRoute: that.lines,
						passTime: that.times,
						periodTime: that.startDate + '至' + that.endDate,
						vehicleLicenseFrontImg: that.img1,
						vehicleLicenseBackImg: that.img2,
						additionalMaterials: that.img3
					} : {
						id: that.id,
						reviewStatus: '0',
						reviewName: '',
						reviewReason: '',
						reviewRemark: '',
						applicantName: that.userName,
						applicantPhone: that.userPhone,
						carNum: that.cardNum,
						carType: that.carType,
						applicationRoute: that.lines,
						passTime: that.times,
						periodTime: that.startDate + '至' + that.endDate,
						vehicleLicenseFrontImg: that.img1,
						vehicleLicenseBackImg: that.img2,
						additionalMaterials: that.img3
					},
					token: uni.getStorageSync('token')
				}).then(res => {
					that.isLoading = false
					that.buttonText = '提交申请'
					that.isDisable = false
					if (res.code == 200) {
						var fromID = this.fromID == 0 ? 0 : 1
						uni.navigateTo({
							url: '/pages/applySuccess/index?fromID=' + fromID
						})
					} else {
						that.$u.toast(res.message)
					}
				}).catch(err => {
					that.isLoading = false
					that.buttonText = '提交申请'
					that.isDisable = false
				})
			},
			chooseLines() {
				uni.navigateTo({
					url: '/pages/applyLines/index?lines=' + this.lines
				})
			},
			chooseTimes() {
				uni.navigateTo({
					url: '/pages/applyTimes/index?times=' + this.times
				})
			},
			chooseDate1() {
				this.showDate = true
			},
			chooseDate2() {
				if (!this.startDate) {
					this.$u.toast('请先选择起始日期')
					return
				}
				this.showDate1 = true
			},
			confirmDate(e) {
				//获取当前时间
				var date = new Date()
				var year = date.getFullYear()
				var month = date.getMonth() + 1
				var day = date.getDate()
				if (month < 10) {
				    month = "0" + month
				}
				if (day < 10) {
				    day = "0" + day
				}
				var nowDate = year + "-" + month + "-" + day
				this.startDate = ''
				if (this.params.year) this.startDate += e.year
				if (this.params.month) this.startDate += '-' + e.month
				if (this.params.day) this.startDate += '-' + e.day
				if (this.startDate < nowDate) {
					this.startDate = ''
					this.$u.toast('起始日期不允许早于今日')
					return
				}
				this.defaultTime = this.startDate
			},
			confirmDate1(e) {
				this.endDate = ''
				if (this.params.year) this.endDate += e.year
				if (this.params.month) this.endDate += '-' + e.month
				if (this.params.day) this.endDate += '-' + e.day
				if (this.endDate <= this.startDate) {
					this.endDate = ''
					this.$u.toast('请确保结束日期大于起始日期')
					return
				}
				this.defaultTime1 = this.endDate
			},
			selectConfirm(e) {
				let index = e[0]
				this.defaultValue = e
				this.carType = this.selectList[index].name
			},
			cardNumFocus(event) {
				this.showCarNum = true
			},
			// 点击退格键
			backspace() {
				if (this.cardNum.length) this.cardNum = this.cardNum.substr(0, this.cardNum.length - 1)
			},
			// 键盘按键发生变化
			change(detail) {
				this.cardNum += detail
			},
			cardNumConfirm(e) {},
			// 勾选版权协议
			checkboxChange(e) {
				this.agreement = e.value;
			},
			onOnlineAbout() {
				uni.navigateTo({
					url: '/pages/applyAbout/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.slot-btn {
		width: 333rpx;
		height: 206rpx;
		border-radius: 10rpx;
	}

	.slot-btn__hover {
		// background-color: rgb(235, 236, 238);
	}

	.wrap {
		width: 100%;
		height: 100%;
	}

	.type_box {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.type_box_item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 26rpx;
		padding: 12rpx 24rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		line-height: 28rpx;
		margin-left: 19rpx;
	}

	.middle_text {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #191F25;
		line-height: 28rpx;
		margin-left: 19rpx;
	}

	.city_box {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.normal_bg {
		background: #E9EAED;
	}

	.normal_color {
		color: #63656B;
	}

	.right_date_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		position: absolute;
		right: 0;
	}

	.date1_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 220rpx;
	}

	.card_head {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 32rpx 30rpx 24rpx;
	}

	.left_title {
		font-size: 30rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #191F25;
		line-height: 30rpx;
	}

	.photo_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 25rpx;
	}

	.photo_text {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tips_text {
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #595959;
		line-height: 28rpx;
		margin-top: 20rpx;
	}

	.agreement {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 64rpx 0 20rpx;
	}

	.agreement-text {
		margin-left: -30rpx;
		color: #1978EF;
	}
</style>
