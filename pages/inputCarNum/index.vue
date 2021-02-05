<template>
	<view class="input_container">
		<view class="carNum_box solid-bottom">
			<view class="box_head">
				<text class="head_text">车牌号码</text>
				<!-- <view class="head_right" @click="changeCarType">
					<image class="switch-car-num" src="/static/icon_qiehuan.png"></image>
					<text class="head_text">{{isCommonCar?"切换为新能源车牌号":"切换为普通车牌号"}}</text>
				</view> -->
			</view>
			<u-toast ref="uToast"></u-toast>
			<u-message-input mode="box" :maxlength="maxlength" :value="value" :bold="false" @showBoard="showBoard" @finish="finish"
			 :disabled-keyboard="true" width="72" height="86" font-size="32" inactive-color="#D9D9D9" active-color="#1978EF"></u-message-input>
		</view>
		<view class="cu-form-group solid-bottom" style="padding: 0;" @click="selectCarType">
			<view class="type_text">车辆类型</view>
			<picker disabled>
				<view class="picker" :class="carType?'color2':'color1'">
					{{carType?carType:'请选择'}}
				</view>
			</picker>
		</view>
		<button class='submit-btn' style="margin-top: 70rpx;width: calc(100% - 150rpx);" :loading="isLoading" @click="submitHandler" :disabled="isDisable">{{buttonText}}</button>
		<u-picker mode="selector" v-model="selectShow" @confirm="selectConfirm" :defaultSelector="defaultValue" :range="selectList"
		 :range-key="rangKey"></u-picker>
		<u-keyboard :mask="true" ref="uKeyboard" safe-area-inset-bottom @confirm="carNumConfirm" :random="false" :dotEnable="false"
		 mode="car" :confirmBtn="true" :cancelBtn="true" :tooltip="true" v-model="showCarNum" @change="change" @backspace="backspace"></u-keyboard>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				maxlength: 7,
				value: '皖A',
				showCarNum: true,
				isCommonCar: true,
				carType: '',
				isLoading: false,
				buttonText: '查询',
				isDisable: false,
				defaultValue: [0],
				rangKey: 'name',
				selectList: [{
						value: '大型汽车',
						name: '大型汽车'
					},
					{
						value: '小型汽车',
						name: '小型汽车'
					},
					{
						value: '大型新能源汽车',
						name: '大型新能源汽车'
					},
					{
						value: '小型新能源汽车',
						name: '小型新能源汽车'
					}
				],
				selectShow: false,
			}
		},
		computed: {

		},
		onLoad(options) {
			if (options.carNum) {
				this.value = options.carNum
				this.maxlength = this.value.length
			}
			this.isCommonCar = this.maxlength == 7 ? true : false
		},
		methods: {
			selectCarType() {
				this.selectShow = true
			},
			selectConfirm(e) {
				let index = e[0]
				this.defaultValue = e
				this.carType = this.selectList[index].name
			},
			changeCarType() {
				this.isCommonCar = !this.isCommonCar
				this.maxlength = this.isCommonCar ? 7 : 8;
			},
			showBoard(event) {
				this.showCarNum = true
			},
			// 点击退格键
			backspace() {
				if (this.value.length) this.value = this.value.substr(0, this.value.length - 1)
			},
			// 键盘按键发生变化
			change(detail) {
				this.value += detail
			},
			// 确认按钮
			carNumConfirm() {
				if (this.value.length < this.maxlength) {
					this.$refs.uToast.show({
						title: '请输入完整的车牌号',
						type: 'default'
					})
					return
				}
			},
			finish(value) {
				this.$refs.uToast.show({
					title: '输入完成，值为：' + value,
					type: 'success'
				})
			},
			submitHandler() {
				uni.navigateTo({
					url: "/pages/applyRecord/index"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.input_container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 30rpx;
	}

	.carNum_box {
		display: flex;
		flex-direction: column;
		padding-bottom: 28rpx;
	}

	.box_head {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		margin-bottom: 20rpx;
	}

	.head_text {
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #262626;
		line-height: 40rpx;
	}

	.head_right {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.switch-car-num {
		width: 28rpx;
		height: 26rpx;
		margin-right: 10rpx;
	}

	.type_text {
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #262626;
		line-height: 40rpx;
	}
	
	.solid-bottom::after {
	  border-bottom: 1rpx solid #EEEEEE;
	}
</style>
