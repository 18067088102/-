export default (path, options = {
	method: 'GET',
	data: {},
	token
}) => {

	const newOptions = {
		login: true,
		url: path,
		data: options.data,
		header: {
			'token': options.token,
			'Content-Type': 'application/json'
		},
		method: options.method.toUpperCase(),
	}
	return new Promise(function(resolve, reject) {
		// if (newOptions.url.indexOf('authenticate/doCountOwnerAuthenticateCount') >= 0 || newOptions.url.indexOf(
		// 		'authenticate/doFindByUserId') >= 0 ||
		// 	newOptions.url.indexOf('banner/list') >= 0 || newOptions.url.indexOf('headlines/page') >= 0 ||
		// 	newOptions.url.indexOf('elegant/page') >= 0 || newOptions.url.indexOf('onekeyCallConf/page') >= 0) {
		// 	// 禁止这些请求时出现加载弹框
		// } else {
			uni.showLoading({
				title: '加载中...',
				mask: true
			})
		// }
		uni.request({
			...newOptions,
			success: function(response) {
				uni.hideLoading()
				if (response.data.code == 401 || response.data.code == 403) {
					// uni.removeStorageSync('token')
					uni.showModal({
						content: '登录已过期，请重新登录',
						cancelText: '再想想',
						cancelColor: '#797979',
						confirmText: '去登录',
						confirmColor: '#218EFF',
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/login/index?fromID=1',
								})
							}
						}
					})
					reject(response.data)
				}
				if (response.statusCode >= 200 && response.statusCode < 300) {
					resolve(response.data)
				} else {
					reject(response.data)
				}
			},
			fail: function(err) {
				uni.hideLoading()
				uni.showToast({
					title: '请求失败，请稍后重试',
					icon: "none"
				})
				reject(err)
			}
		});
	});
}
