// 生产
// let HOST_SERVER = 'http://220.180.36.31:30000/p/adm/api';
// let HOST_SERVER = BASE_URL + '/auth';
// let HOST_SERVER2 = BASE_URL + '/archives';
// let HOST_SERVER3 = BASE_URL + '/notification';
// let HOST_SERVER4 = BASE_URL + '/estate';

// 本地测试
let HOST_SERVER = 'http://192.168.8.161:8090/ycm';

let api = { //共个接口
    getApplyRecordListUrl: HOST_SERVER + "/api/biz/record/page",  //查询申请记录分页列表接口
	addApplyRecordUrl: HOST_SERVER + "/api/biz/record/save",
	updateApplyRecordUrl: HOST_SERVER + "/api/biz/record/update",
	getApplyRecordDetailUrl: HOST_SERVER + "/api/biz/record/info",
	getNoticeListUrl: HOST_SERVER + "/api/biz/notice/list", 
	loginUrl: HOST_SERVER + "/api/login", //登录接口
	getLoginSMSCodeUrl: HOST_SERVER + "/sms/sendLoginSMS", //发送登录账号短信验证码接口
	// getMessageListUrl: HOST_SERVER + "/biz/preventNotice/page",
	uploadImageUrl: HOST_SERVER + '/oss/upload', //上传图片
	viewImgaeUrl: HOST_SERVER + '/oss/view', //拼接图片完整地址
}

module.exports = api;
