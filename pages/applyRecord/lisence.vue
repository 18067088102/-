<template>
	<view class="lisence_container">
		<view class="lisence_head">
			<text class="head_text">车辆临时电子通行证</text>
			<view class="content_box">
				<view class="lisence_content">
					<image class="success_img" src="../../static/status_success.png"></image>
					<view class="item_bottom">
						<view class="type-container">
							<text class="type-text">车牌号码:</text>
							<text class="content-text">皖S23948</text>
						</view>
						<view class="type-container">
							<text class="type-text">车辆类型:</text>
							<text class="content-text">大型汽车</text>
						</view>
						<view class="type-container">
							<text class="type-text">通行路线:</text>
							<text class="content-text">包公大道；长江路；长江路；长江路；长江路；长江路；长江路；长江路；长江路；</text>
						</view>
						<view class="type-container">
							<text class="type-text">通行时段:</text>
							<text class="content-text">2020-11-27至2021-11-27</text>
						</view>
						<view class="type-container">
							<text class="type-text">有效期限:</text>
							<text class="content-text">2020-11-26至2021-11-26</text>
						</view>
						<view class="type-container">
							<text class="type-text">证件编号:</text>
							<text class="content-text">02021654646</text>
						</view>
						<view class="type-container" style="margin-bottom: 0rpx;">
							<text class="type-text">发证机关:</text>
							<text class="content-text">肥东交警大队</text>
						</view>
					</view>
				</view>
				<button class='submit-btn' style="margin-top: 138rpx;width: calc(100% - 150rpx);" @click="downloadPdf">下载电子通行证</button>
			</view>
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
			downloadPdf() {
				// window.scrollTo(0, 0)  //注意这里必须设置为顶部不然会出现图片不全
				// let that = this;
				// that.$html2canvas(document.body, {
				//     onrendered:function(canvas) {
				
				//         var contentWidth = canvas.width;
				//         var contentHeight = canvas.height;
				
				//         //一页pdf显示html页面生成的canvas高度;
				//         var pageHeight = contentWidth / 595.28 * 841.89;
				//         //未生成pdf的html页面高度
				//         var leftHeight = contentHeight;
				//         //pdf页面偏移
				//         var position = 0;
				//         //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
				//         var imgWidth = 555.28;
				//         var imgHeight = 555.28/contentWidth * contentHeight;
				
				//         var pageData = canvas.toDataURL('image/jpeg', 1.0);
				
				//         var pdf = new that.$jsPDF('', 'pt', 'a4');
				//         //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
				//         //当内容未超过pdf一页显示的范围，无需分页
				//         if (leftHeight < pageHeight) {
				//             pdf.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight );
				//         } else {
				//             while(leftHeight > 0) {
				//                 pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
				//                 leftHeight -= pageHeight;
				//                 position -= 841.89;
				//                 //避免添加空白页
				//                 if(leftHeight > 0) {
				//                     pdf.addPage();
				//                 }
				//             }
				//         }
				
				//         pdf.save('电子通行证' + '.pdf');
				//     }
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lisence_container {
		width: 100%;
		height: 100%;
		background-color: #F6F6F6;
		position: relative;
	}

	.lisence_head {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 313rpx;
		background: linear-gradient(324deg, #36B0F8 0%, #1978EF 100%);
		position: relative;
	}

	.head_text {
		font-size: 34rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 34rpx;
		margin-top: 64rpx;
	}
	
	.content_box {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 136rpx;
	}

	.lisence_content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: calc(100% - 60rpx);
		padding: 40rpx 30rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 2rpx 19rpx 0rpx rgba(0, 0, 0, 0.09);
		border-radius: 20rpx;
	}

	.success_img {
		width: 140rpx;
		height: 140rpx;
	}

	.item_bottom {
		display: flex;
		flex-direction: column;
		margin-top: 32rpx;
		// padding: 24rpx 30rpx;
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
</style>
