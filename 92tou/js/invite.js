var totalRecord=0;
var pageSize=0;

$(function () {

	var url = "../user/userInvitecode";
	var data = CommnUtil.ajax(url, null,"json");
	if (data.code == 1) {
		$("#Invitecode").html(data.data.Invitecode);
		var text = " 就爱投—汽车权益众筹领导者品牌！全新的互联网金融投资方式，项目信息全流程透明 安全可靠有保证，预期年化收益最高可达61%，收益高的不要不要的，不信就来，有你好看！我的专属邀请码:"+ data.data.Invitecode + ",邀您前来体验，别让钱在银行里继续缩水了！网站地址：http://92tou.com/";
		$("#content").html(text);
	}
	else{

	}
    getInviteRecord(1);

})

function getInviteRecord(curpage){
	//获取邀请记录
	var url = '../user/userInviteList';
	var param = JSON.stringify({ "data":{"page": curpage}});
	var data = CommnUtil.ajax(url, param,"json");
	if (data.code == 1) {
		totalRecord = data.totalRecord;
		pageSize = data.rowCount;
		var h = '<ul class="title" style="width:910px;"><li style="width:20%;">编号</li><li style="width:20%">被推广人用户名</li><li style="width:20%">收入</li><li style="width:30%">日期</li></ul>';
		for ( var i = 0; i < data.data.length; i++) {
			h+= '<ul class="item" style="width:910px;"><li style="width:20%;">' + parseInt(i+1) + '</li><li style="width:20%">' + data.data[i].invateNickName + '</li>';
			h+='<li style="width:20%;">' + data.data[i].recommendAmount + '</li><li style="width:30%">' + new Date(data.data[i].recommendTime).format("yyyy-MM-dd hh:mm:ss") + '</li></ul>';
		}
		$("#invite_record_list").html(h);
	}else {
		alert("获取邀请记录失败");
         return;
	}

	 supage('pageNav','getInviteRecord','',curpage,totalRecord,pageSize);
}
