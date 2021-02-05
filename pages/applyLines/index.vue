<template>
	<view class="lines_container">
		<u-sticky offset-top="-80">
			<view class="search_box">
				<u-search v-model="value" @change="change" @custom="custom" @search="search" :shape="shape" :clearabled="clearabled"
				 :show-action="showAction" :action-style="actionStyle" :input-align="inputAlign" @clear="clear"></u-search>
			</view>
		</u-sticky>
		<u-checkbox-group @change="checkboxGroupChange" :width="radioCheckWidth" :wrap="radioCheckWrap">
			<view class="list_item" v-for="(item, index) in checkboxList" :key="index">
				<u-checkbox v-model="item.checked" :name="item.name">{{ item.name }}</u-checkbox>
			</view>
		</u-checkbox-group>
		<view class="list_bottom">
			<text class="bottom_text">已选择: {{model.linesNum}}条线路</text>
			<u-button class="sure_btn" :custom-style="customStyle" type="primary" @click="sureLineClick">确定</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				shape: 'round',
				clearabled: true,
				showAction: true,
				actionStyle: {
					color: '#2979ff'
				},
				customStyle: {
					width: '150rpx',
					height: '60rpx'
				},
				inputAlign: 'left',
				model: {
					choosedLines: '',
					linesNum: 0
				},
				radioCheckWidth: '100%',
				radioCheckWrap: true,
				checkboxList: [{
						name: '金阳路',
						checked: false,
						disabled: false
					},
					{
						name: '桂王路',
						checked: false,
						disabled: false
					},
					{
						name: '桥头集路',
						checked: false,
						disabled: false
					},
					{
						name: '临河东路',
						checked: false,
						disabled: false
					},
					{
						name: '临河西路',
						checked: false,
						disabled: false
					},
					{
						name: '临河南路',
						checked: false,
						disabled: false
					},
					{
						name: '临泉东路',
						checked: false,
						disabled: false
					},
					{
						name: '塘杨路',
						checked: false,
						disabled: false
					},
					{
						name: '梁园路',
						checked: false,
						disabled: false
					},
					{
						name: '浮槎山路',
						checked: false,
						disabled: false
					},
					{
						name: '合蚌路',
						checked: false,
						disabled: false
					},
					{
						name: '四顶山路',
						checked: false,
						disabled: false
					},
					{
						name: '魏武路',
						checked: false,
						disabled: false
					},
					{
						name: '镇西路',
						checked: false,
						disabled: false
					},
					{
						name: '古河路',
						checked: false,
						disabled: false
					},
					{
						name: '临泉路',
						checked: false,
						disabled: false
					},
					{
						name: '长江东路',
						checked: false,
						disabled: false
					},
					{
						name: '来河路',
						checked: false,
						disabled: false
					},
					{
						name: '包公大道',
						checked: false,
						disabled: false
					},
					{
						name: '新安江路',
						checked: false,
						disabled: false
					},
					{
						name: '龙城路',
						checked: false,
						disabled: false
					},
					{
						name: '沿河西路',
						checked: false,
						disabled: false
					},
					{
						name: '沿河西路',
						checked: false,
						disabled: false
					}
				],
			}
		},
		onLoad (options) {
			var lines = options.lines
			if(lines) {
				var linesArr = lines.split(',')
				this.model.linesNum = linesArr.length
				this.checkboxList.map(item => {
					if(linesArr.indexOf(item.name) != -1) {
						item.checked = true
					}
				})
			}
		},
		methods: {
			change(value) {
				// 搜索框内容变化时，会触发此事件，value值为输入框的内容
				//console.log(value);
			},
			custom(value) {
				//console.log(value);
				this.$u.toast('输入值为：' + value)
			},
			search(value) {
				this.$refs.uToast.show({
					title: '搜索内容为：' + value,
					type: 'success'
				})
			},
			clear() {
				// console.log(this.value);
			},
			// checkbox选择发生变化
			checkboxGroupChange(e) {
				this.model.choosedLines = e.toString();
				this.model.linesNum = e.length;
			},
			sureLineClick() {
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2];
				prevPage.$vm.lines = this.model.choosedLines
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lines_container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: calc(100% - 100rpx);
		// background-color: red;
		position: relative;
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

	.lines_content {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: calc(100% - 100rpx);
	}

	.list_item {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 90rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		// border-bottom: 1rpx solid #E4E7ED;
	}

	.list_bottom {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		position: fixed;
		left: 0;
		bottom: 0;
	}

	.bottom_text {
		font-size: 32rpx;
		color: #333;
	}

	.sure_btn {
		position: absolute;
		right: 30rpx;
	}
</style>
