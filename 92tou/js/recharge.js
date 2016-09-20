
var IsOKAmount = 0;
$(function () {
    $("#Recharge").addClass("cur");
    //hideAllBankLimit();

    //绑定银行
	var url = "../user/getPayBank?payCode=1";// 1 丰付接口 2 宝付接口 等等
	var data = CommnUtil.ajax(url, null,"json");
	if (data.code == 1) {

		var h = '';
		for ( var i = 0; i < data.data.length; i++) {
			var checked = '';
			if(i==0){
				checked = 'checked';
			}
			h+= '<label onclick="showLimitMoney('+ data.data[i].bankID +');" for="rdo'+ data.data[i].bankID +'"><input type="radio" name="bankgroup" id="rdo'+ data.data[i].bankID +'" value="'+ data.data[i].bankID +'" '+ checked +'><img src="'+ data.data[i].bankImgUrl +'"></label>';
		}
		$("#mybanks").html(h);

	}else {
		alert("获取银行失败");
         return;
	}


    //切换
        $(".Rtit li").bind("click", function () {
            var index = $(this).index();
            var items = $("div.RinfoBox > div.item");
            $(this).parent().children("li").attr("class", "");
            $(this).attr("class", "cur");
            items.hide();
            items.eq(index).fadeIn();
            if(index == 1){
            	$("#allbanklimit").css("display","none");
            	hideAllBankLimit();
            }
            else{
            	$("#allbanklimit").css("display","block");
            	hideAllBankLimit();
            }
        });

    /*JQuery 限制文本框只能输入数字和小数点*/
    $(".lf").keyup(function () {
        $(this).val($(this).val().replace(/[^0-9.]/g, ''));
    }).bind("paste", function () {  //CTR+V事件处理
        $(this).val($(this).val().replace(/[^0-9.]/g, ''));
    }).css("ime-mode", "disabled"); //CSS设置输入法不可用

    $("#moneyAmount").focus(function() { //输入框阴影
        $(this).parent().addClass("on");
    })

    $("#moneyAmount").blur(function () {
        IsOKAmount = 0;
        $(this).parent().removeClass("on");
        var Amount = $.trim($(this).val());
        if (Amount == "") {
            $(".form-right").show();
            $(".form-right").html("*请输入要充值金额");
            // $(this).removeClass("border-red").addClass("border-red");
            // $(this).next().removeClass("err").addClass("err").html("请输入要充值金额");
            return;
        }
        else if(IsDouble(Amount) == false)
        {
            $(".form-right").show();
            $(".form-right").html("输入额度不正确（不允许0开头）");
            // $(this).removeClass("border-red").addClass("border-red");
            // $(this).next().removeClass("err").addClass("err").html("输入额度不正确（不允许0开头）");
            return;
        }
        else if (parseInt(Amount) < 100) {
            $(".form-right").show();
            $(".form-right").html("单笔充值不低于100元（只保留2位小数）");
            // $(this).removeClass("border-red").addClass("border-red");
            // $(this).next().removeClass("err").addClass("err").html("单笔充值不低于100元（只保留2位小数）");
            return;
        }
        else {
            $(this).removeClass("border-red");
            $(this).next().removeClass("err").html("");
        }
        IsOKAmount = 1;
    });
    //充值
    $("#btnRecharge").click(function () {
        $("#moneyAmount").blur();
        if (IsOKAmount == 0) {
            return;
        }
        var Amount = $.trim($("#moneyAmount").val());
        var Type = $(".Rtit li.cur").attr("type");
        //var Type = 1;
        var BankType = $(":radio[name=bankgroup][checked]").val();


        if($("#hididentitycard").val() == '' || $("#hididentitycard").val() == null || $("#hididentitycard").val() == "null" || $("#hididentitycard").val() == undefined || $("#hididentitycard").val() == "undefined"){
			 YesAlert("亲爱的用户 ：请先绑定身份证进行实名认证！", "../user/toUserBaseInfo");
			 return;
		 }

        var userstatus = $("#hiduserstatus").val();
        if(userstatus == 2 || userstatus == 3){
        	 /*layer.confirm('亲爱的用户 您好：就爱投平台支付系统已从丰付支付资金托管升级为丰付网融管家，为平台用户的资金带来更加可靠的安全性，便利性。系统升级后平台用户的资金账户已全部迁移至丰付网融管家，因而需要您激活丰付网融管家账户！', function() {
        		var hrefbank = "../user/PayBankRegister";
        		if(userstatus == 3){
        			hrefbank = "../user/PayActivateUser";
        		}
        		document.getElementById("btnRecharge").target = "_blank";
                document.getElementById("btnRecharge").href = hrefbank;

        	});*/
        	if(userstatus == 2){
    			var href = "../user/PayBankRegister";
    		}
    		if(userstatus == 3){
    			var href = "../user/PayActivateUser";
    		}
        	YesAlert("亲爱的用户 您好：就爱投平台支付系统已从丰付支付资金托管升级为丰付网融管家，为平台用户的资金带来更加可靠的安全性，便利性。系统升级后平台用户的资金账户已全部迁移至丰付网融管家，因而需要您激活丰付网融管家账户！", href);
      		return;
        }
        else{
        	 var href = "../user/touserRechangeAmount?payTypeID=1&dev=pc&Amount=" + Amount + "&payway=" + Type + "&bankID=" + BankType;
             document.getElementById("btnRecharge").target = "_blank";
             document.getElementById("btnRecharge").href = href;
        }



    });
});

function hideAllBankLimit() {
    $("#allbanklimit").css("display", "none");
    showLimitMoney(1);
}

function showLimitMoney(id)
{
    if (id == 1) {
        //中国工商银行
        $("#allbanklimit").css("display", "");
        $("#icbc").css("display", "");
        $("#huaxia").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#guangda").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 21) {
        //华夏银行
        $("#allbanklimit").css("display", "");
        $("#huaxia").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#guangda").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 22) {
        //上海银行
        $("#allbanklimit").css("display", "");
        $("#shanghai").css("display", "");
        $("#icbc").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#guangda").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 23) {
        //渤海银行
        $("#allbanklimit").css("display", "");
        $("#bohai").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#guangda").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 24) {
        //杭州银行
        $("#allbanklimit").css("display", "");
        $("#hangzhou").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#huishang").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#guangda").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 25) {
        //徽商银行
        $("#allbanklimit").css("display", "");
        $("#huishang").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#guangda").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 26) {
        //浙商银行
        $("#allbanklimit").css("display", "");
        $("#zheshang").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#guangda").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 27) {
        //北京农商银行
        $("#allbanklimit").css("display", "");
        $("#beijingnongshang").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#guangda").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 2) {
        //农业银行
        $("#allbanklimit").css("display", "");
        $("#nongye").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#guangda").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 3) {
        //中国银行
        $("#allbanklimit").css("display", "");
        $("#zhongguo").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#guangda").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 4) {
        //建设银行
        $("#allbanklimit").css("display", "");
        $("#jianshe").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#guangda").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 5) {
        //招商银行
        $("#allbanklimit").css("display", "");
        $("#zhaoshang").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#guangda").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 6) {
        //交通银行
        $("#allbanklimit").css("display", "");
        $("#jiaotong").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#guangda").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 7) {
        //邮政储蓄银行
        $("#allbanklimit").css("display", "");
        $("#youzheng").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#guangda").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 8) {
        //民生银行
        $("#allbanklimit").css("display", "");
        $("#minsheng").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#guangda").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 9) {
        //广发银行
        $("#allbanklimit").css("display", "");
        $("#guangfa").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#pufa").css("display", "none");
        $("#guangda").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 11) {
        //浦发银行
        $("#allbanklimit").css("display", "");
        $("#pufa").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#guangda").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 12) {
        //光大银行
        $("#allbanklimit").css("display", "");
        $("#guangda").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 13) {
        //中信银行
        $("#allbanklimit").css("display", "");
        $("#zhongxin").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#guangda").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 14) {
        //兴业银行
        $("#allbanklimit").css("display", "");
        $("#xingye").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#guangda").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 15) {
        //北京银行
        $("#allbanklimit").css("display", "");
        $("#beijing").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#guangda").css("display", "none");
        $("#pingan").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 17) {
        //平安银行
        $("#allbanklimit").css("display", "");
        $("#pingan").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#guangda").css("display", "none");
        $("#ningbo").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 18) {
        //宁波银行
        $("#allbanklimit").css("display", "");
        $("#ningbo").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#guangda").css("display", "none");
        $("#dongya").css("display", "none");

    }
    else if (id == 20) {
        //东亚银行
        $("#allbanklimit").css("display", "");
        $("#dongya").css("display", "");
        $("#icbc").css("display", "none");
        $("#shanghai").css("display", "none");
        $("#bohai").css("display", "none");
        $("#hangzhou").css("display", "none");
        $("#huishang").css("display", "none");
        $("#huaxia").css("display", "none");
        $("#beijingnongshang").css("display", "none");
        $("#nongye").css("display", "none");
        $("#zhongguo").css("display", "none");
        $("#jianshe").css("display", "none");
        $("#zheshang").css("display", "none");
        $("#jiaotong").css("display", "none");
        $("#youzheng").css("display", "none");
        $("#minsheng").css("display", "none");
        $("#guangfa").css("display", "none");
        $("#pufa").css("display", "none");
        $("#zhaoshang").css("display", "none");
        $("#zhongxin").css("display", "none");
        $("#xingye").css("display", "none");
        $("#beijing").css("display", "none");
        $("#pingan").css("display", "none");
        $("#guangda").css("display", "none");
        $("#ningbo").css("display", "none");

    }
}
