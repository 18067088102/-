<template>
	<view class="times_container">
		<u-checkbox-group @change="checkboxGroupChange" :width="radioCheckWidth" :wrap="radioCheckWrap">
			<view class="times_content">
				<view class="list_item" v-for="(item, index) in checkboxList" :key="index">
					<u-checkbox v-model="item.checked" :disabled="item.disabled" @change="checkboxChange" :name="item.name">{{ item.name }}</u-checkbox>
					<view class="city_box">
						<view class="type_box">
							<view class="type_box_item normal_bg" @click="chooseDate1(index)">
								<text class="normal_color">{{index==0?model.date1?model.date1:'起始时段':index==1?model.date3?model.date3:'起始时段':index==2?model.date5?model.date5:'起始时段':model.date7?model.date7:'起始时段'}}</text>
							</view>
						</view>
						<text class="middle_text">至</text>
						<view class="type_box">
							<view class="type_box_item normal_bg" @click="chooseDate2(index)">
								<text class="normal_color">{{index==0?model.date2?model.date2:'结束时段':index==1?model.date4?model.date4:'结束时段':index==2?model.date6?model.date6:'结束时段':model.date8?model.date8:'结束时段'}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-checkbox-group>
		<button class='submit-btn' style="margin-top: 70rpx;" @click="submit">提交</button>
		<u-picker mode="time" :defaultTime="defaultTime1" v-model="showDate1" :params="params" end-year="2030" @confirm="confirmDate1"></u-picker>
		<u-picker mode="time" :defaultTime="defaultTime2" v-model="showDate2" :params="params" end-year="2030" @confirm="confirmDate2"></u-picker>
		<u-picker mode="time" :defaultTime="defaultTime3" v-model="showDate3" :params="params" end-year="2030" @confirm="confirmDate3"></u-picker>
		<u-picker mode="time" :defaultTime="defaultTime4" v-model="showDate4" :params="params" end-year="2030" @confirm="confirmDate4"></u-picker>
		<u-picker mode="time" :defaultTime="defaultTime5" v-model="showDate5" :params="params" end-year="2030" @confirm="confirmDate5"></u-picker>
		<u-picker mode="time" :defaultTime="defaultTime6" v-model="showDate6" :params="params" end-year="2030" @confirm="confirmDate6"></u-picker>
		<u-picker mode="time" :defaultTime="defaultTime7" v-model="showDate7" :params="params" end-year="2030" @confirm="confirmDate7"></u-picker>
		<u-picker mode="time" :defaultTime="defaultTime8" v-model="showDate8" :params="params" end-year="2030" @confirm="confirmDate8"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model: {
					choosedTimes: '',
					date1: '',
					date2: '',
					date3: '',
					date4: '',
					date5: '',
					date6: '',
					date7: '',
					date8: ''
				},
				showDate1: false,
				showDate2: false,
				showDate3: false,
				showDate4: false,
				showDate5: false,
				showDate6: false,
				showDate7: false,
				showDate8: false,
				defaultTime1: '00:00',
				defaultTime2: '00:00',
				defaultTime3: '00:00',
				defaultTime4: '00:00',
				defaultTime5: '00:00',
				defaultTime6: '00:00',
				defaultTime7: '00:00',
				defaultTime8: '00:00',
				params: {
					hour: true,
					minute: true
				},
				radioCheckWidth: 'auto',
				radioCheckWrap: false,
				checkboxList: [{
						name: '时段1',
						checked: false,
						disabled: true
					},
					{
						name: '时段2',
						checked: false,
						disabled: true
					},
					{
						name: '时段3',
						checked: false,
						disabled: true
					},
					{
						name: '时段4',
						checked: false,
						disabled: true
					}
				],
				beginTimeArr: [],
				overTimeArr: [],
				choosedArr: []
			}
		},
		onLoad(options) {
			var times = options.times
			if (times) {
				var timesArr = times.split(',')
				for (var i = 0; i < timesArr.length; i++) {
					var startDate = timesArr[i].split('-')[0]
					var endDate = timesArr[i].split('-')[1]
					this.checkboxList[i].disabled = false
					this.checkboxList[i].checked = true
					if (i == 0) {
						this.model.date1 = startDate
						this.model.date2 = endDate
						this.defaultTime1 = this.model.date1
						this.defaultTime2 = this.model.date2
						this.beginTimeArr.splice(0, 1, this.model.date1)
						this.overTimeArr.splice(0, 1, this.model.date2)
						this.choosedArr.push('时段1')
					} else if (i == 1) {
						this.model.date3 = startDate
						this.model.date4 = endDate
						this.defaultTime3 = this.model.date3
						this.defaultTime4 = this.model.date4
						this.beginTimeArr.splice(1, 1, this.model.date3)
						this.overTimeArr.splice(1, 1, this.model.date4)
						this.choosedArr.push('时段2')
					} else if (i == 2) {
						this.model.date5 = startDate
						this.model.date6 = endDate
						this.defaultTime5 = this.model.date5
						this.defaultTime6 = this.model.date6
						this.beginTimeArr.splice(2, 1, this.model.date5)
						this.overTimeArr.splice(2, 1, this.model.date6)
						this.choosedArr.push('时段3')
					} else if (i == 3) {
						this.model.date7 = startDate
						this.model.date8 = endDate
						this.defaultTime7 = this.model.date7
						this.defaultTime8 = this.model.date8
						this.beginTimeArr.splice(3, 1, this.model.date7)
						this.overTimeArr.splice(3, 1, this.model.date8)
						this.choosedArr.push('时段4')
					}
				}
			}
		},
		methods: {
			chooseDate1(index) {
				switch (index) {
					case 0:
						this.showDate1 = true
						break;
					case 1:
						if (!this.model.date1 || !this.model.date2) {
							this.$u.toast('请按顺序选择时段')
							return
						}
						this.showDate3 = true
						break;
					case 2:
						if (!this.model.date3 || !this.model.date4) {
							this.$u.toast('请按顺序选择时段')
							return
						}
						this.showDate5 = true
						break;
					case 3:
						if (!this.model.date5 || !this.model.date6) {
							this.$u.toast('请按顺序选择时段')
							return
						}
						this.showDate7 = true
						break;
					default:
						break;
				}
			},
			chooseDate2(index) {
				switch (index) {
					case 0:
						this.showDate2 = true
						break;
					case 1:
						if (!this.model.date1 || !this.model.date2) {
							this.$u.toast('请按顺序选择时段')
							return
						}
						this.showDate4 = true
						break;
					case 2:
						if (!this.model.date3 || !this.model.date4) {
							this.$u.toast('请按顺序选择时段')
							return
						}
						this.showDate6 = true
						break;
					case 3:
						if (!this.model.date5 || !this.model.date6) {
							this.$u.toast('请按顺序选择时段')
							return
						}
						this.showDate8 = true
						break;
					default:
						break;
				}
			},
			confirmDate1(e) {
				this.model.date1 = ''
				if (this.params.hour) this.model.date1 += e.hour
				if (this.params.minute) this.model.date1 += ':' + e.minute
				this.defaultTime1 = this.model.date1
				this.beginTimeArr.splice(0, 1, this.model.date1)
			},
			confirmDate2(e) {
				if (!this.model.date1) {
					this.$u.toast('请先选择起始时段')
					return
				}
				this.model.date2 = ''
				if (this.params.hour) this.model.date2 += e.hour
				if (this.params.minute) this.model.date2 += ':' + e.minute
				if (this.model.date2 <= this.model.date1) {
					this.model.date2 = ''
					this.$u.toast('请确保结束时段大于起始时段再提交')
					return
				}
				this.defaultTime2 = this.model.date2
				this.overTimeArr.splice(0, 1, this.model.date2)
				this.checkboxList[0].disabled = false
			},
			confirmDate3(e) {
				this.model.date3 = ''
				if (this.params.hour) this.model.date3 += e.hour
				if (this.params.minute) this.model.date3 += ':' + e.minute
				this.defaultTime3 = this.model.date3
				this.beginTimeArr.splice(1, 1, this.model.date3)
			},
			confirmDate4(e) {
				if (!this.model.date3) {
					this.$u.toast('请先选择起始时段')
					return
				}
				this.model.date4 = ''
				if (this.params.hour) this.model.date4 += e.hour
				if (this.params.minute) this.model.date4 += ':' + e.minute
				if (this.model.date4 <= this.model.date3) {
					this.model.date4 = ''
					this.$u.toast('请确保结束时段大于起始时段再提交')
					return
				}
				this.defaultTime4 = this.model.date4
				this.overTimeArr.splice(1, 1, this.model.date4)
				this.checkboxList[1].disabled = false
			},
			confirmDate5(e) {
				this.model.date5 = ''
				if (this.params.hour) this.model.date5 += e.hour
				if (this.params.minute) this.model.date5 += ':' + e.minute
				this.defaultTime5 = this.model.date5
				this.beginTimeArr.splice(2, 1, this.model.date5)
			},
			confirmDate6(e) {
				if (!this.model.date5) {
					this.$u.toast('请先选择起始时段')
					return
				}
				this.model.date6 = ''
				if (this.params.hour) this.model.date6 += e.hour
				if (this.params.minute) this.model.date6 += ':' + e.minute
				if (this.model.date6 <= this.model.date5) {
					this.model.date6 = ''
					this.$u.toast('请确保结束时段大于起始时段再提交')
					return
				}
				this.defaultTime6 = this.model.date6
				this.overTimeArr.splice(2, 1, this.model.date6)
				this.checkboxList[2].disabled = false
			},
			confirmDate7(e) {
				this.model.date7 = ''
				if (this.params.hour) this.model.date7 += e.hour
				if (this.params.minute) this.model.date7 += ':' + e.minute
				this.defaultTime7 = this.model.date7
				this.beginTimeArr.splice(3, 1, this.model.date7)
			},
			confirmDate8(e) {
				if (!this.model.date7) {
					this.$u.toast('请先选择起始时段')
					return
				}
				this.model.date8 = ''
				if (this.params.hour) this.model.date8 += e.hour
				if (this.params.minute) this.model.date8 += ':' + e.minute
				if (this.model.date8 <= this.model.date7) {
					this.model.date8 = ''
					this.$u.toast('请确保结束时段大于起始时段再提交')
					return
				}
				this.defaultTime8 = this.model.date8
				this.overTimeArr.splice(3, 1, this.model.date8)
				this.checkboxList[3].disabled = false
			},
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				// console.log(e);
			},
			checkboxGroupChange(e) {
				// console.log(e)
				this.choosedArr = e
			},
			submit() {
				if (this.choosedArr.length == 0) {
					this.$u.toast('请至少选择一个时段')
					return
				}
				this.beginTimeArr = this.beginTimeArr.sort()
				this.overTimeArr = this.overTimeArr.sort()
				for (let i = 1; i < this.beginTimeArr.length; i++) {
					if (this.beginTimeArr[i] < this.overTimeArr[i - 1]) {
						this.$u.toast("时段间有交叉重复，请修改")
						return
					}
				}
				var choosedArr = []
				for (let i = 0; i < this.choosedArr.length; i++) {
					var timeStr = this.choosedArr[i]
					if (timeStr == '时段1') {
						var str1 = this.model.date1 + '-' + this.model.date2
						choosedArr.push(str1)
					}
					if (timeStr == '时段2') {
						var str2 = this.model.date3 + '-' + this.model.date4
						choosedArr.push(str2)
					}
					if (timeStr == '时段3') {
						var str3 = this.model.date5 + '-' + this.model.date6
						choosedArr.push(str3)
					}
					if (timeStr == '时段4') {
						var str4 = this.model.date7 + '-' + this.model.date8
						choosedArr.push(str4)
					}
				}
				this.model.choosedTimes = choosedArr.toString()
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2];
				prevPage.$vm.times = this.model.choosedTimes
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.times_container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.times_content {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.list_item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 90rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		border-bottom: 1rpx solid #E4E7ED;
		position: relative;
	}

	.right_date_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		position: absolute;
		right: 30rpx;
	}

	.date1_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 130rpx;
		// background-color: red;
	}

	.date_text {
		// margin: 0 20rpx;
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
</style>
