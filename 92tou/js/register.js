var codetimer = null;
var second_init = 180;
var codesecond = 180; //倒计时
var IsOKTelNo = 0;
var IsOKMobileCode = 0;
var IsOKPwd = 0;
var IsOKPicCode = 0;
$(function () {
    //刷新验证码
	//    $("#Imgcode").click(function(){
	// 	   $("#Imgcode").attr('src','../user/graphical?'+Math.random());
	//    });

    //验证手机输入
    $("#phoneNum").blur(function () {
        IsOKTelNo = 0;
        var obj = $(this);
        var strMobile = $.trim($(obj).val());

        if (strMobile == "") {
			$(".prompt_msg").eq(0).show();
            // $(this).removeClass("border-red").addClass("border-red");
            $(".prompt_msg").eq(0).html("请输入手机号码");
            return;
        }
        if (!IsMobile(strMobile)) {
            // $(this).removeClass("border-red").addClass("border-red");
			$(".prompt_msg").eq(0).show();
            $(".prompt_msg").eq(0).html("请输入正确的手机号");
            return;
        }
        //验证手机号码是否存在
    	var url = 'telphoneCheck';
    	var param = { telphone: strMobile };
    	var data = CommnUtil.ajax(url, param,"json");
    	if (data.code == 1) {
    		IsOKTelNo = 1;
            // $(obj).removeClass("border-red");
            // $(obj).next().removeClass("err").html("");
    	}else {

    		// $(obj).removeClass("border-red").addClass("border-red");
			$(".prompt_msg").eq(0).show();
            $(".prompt_msg").eq(0).html(data.msg);
    	}

    });
    //验证码
    $("#phoneCode").blur(function () {
        IsOKMobileCode = 0;
        var strCode = $.trim($(this).val());

        if (strCode == "") {
            // $(this).removeClass("border-red").addClass("border-red");
			$(".prompt_msg").eq(1).show();
            $(".prompt_msg").eq(1).html("请输入手机验证码");
            return;
        }
        if (!IsMobileCode(strCode)) {
            $(".prompt_msg").eq(1).show();
            $(".prompt_msg").eq(1).html("请输入正确的验证码");
            return;
        }else {
            // $(this).removeClass("border-red");
            // $(this).next().next().next().removeClass("err").html("");
        }
        IsOKMobileCode = 1;
    });
    //获取验证码
    $("#sendCode").click(function () {

        var obj = $(this);
        var mobileobj = $("#phoneNum");
        var strMobile = $.trim($(mobileobj).val());
        if (strMobile == "") {
            $(".prompt_msg").eq(0).show();
            $(".prompt_msg").eq(0).html("请输入手机号码");
            return;
        }
        if (!IsMobile(strMobile)) {
            $(".prompt_msg").eq(0).show();
            $(".prompt_msg").eq(0).html("手机号码格式不正确");
            return;
        }
        // $(obj).hide();

        $(obj).html("短信发送中");
        //获取短信验证码
    	var url = 'msgcode';
    	var param = { telphone: strMobile,msgType: '1' };
    	var data = CommnUtil.ajax(url, param,"json");
    	if (data.code == 1) {
    		codesecond = second_init;
            $(obj).html(codesecond + "秒后可重新发送");
            clearInterval(codetimer);
            codetimer = setInterval(setCodeTime, 1000, "1");
    	}else {
    		IsOKTelNo = 0;
            // $(mobileobj).removeClass("border-red").addClass("border-red");
            $(obj).html(data.msg);
            // $("#sendCodeText").hide();
            // $(obj).show();
            return;
    	}
    });
    //验证密码
    $("#password").blur(function () {
        IsOKPwd = 0;
        var password = $.trim($(this).val());
        if (password == "") {
            // $(this).removeClass("border-red").addClass("border-red");
			$(".prompt_msg").eq(2).show();
            $(".prompt_msg").eq(2).html("请输入登录密码");
            return;
        }
        if (!IsPwd(password)) {
            $(".prompt_msg").eq(2).show();
            $(".prompt_msg").eq(2).html("6-16个字符，由字母或数字组合");
            return;
        }
        else {
            // $(this).removeClass("border-red");
            // $(this).next().removeClass("err").html("");
        }
        IsOKPwd = 1;
    });

	// 重复输入密码
	$("#repeatPassword").blur(function() {
		var password = $.trim($("#password").val());
		var repeatPassword = $.trim($("#repeatPassword").val());
		if (repeatPassword == "") {
			$(".prompt_msg").eq(3).show();
			$(".prompt_msg").eq(3).html("请再次输入密码");
            return;
		} else if (password != repeatPassword) {
			$(".prompt_msg").eq(3).show();
			$(".prompt_msg").eq(3).html("两次输入密码不一致,请重新输入");
            return;
		}
	})
    //验证图片验证码
   /* $("#codeNum").blur(function () {
        IsOKPicCode = 0;
        var codeNum = $.trim($(this).val());
        if (codeNum == "") {
            $(this).removeClass("border-red").addClass("border-red");
            $(this).next().next().next().removeClass("err").addClass("err").html("请输入图形验证码");
            return;
        }
        if (!IsPicCode(codeNum)) {
            $(this).removeClass("border-red").addClass("border-red");
            $(this).next().next().next().removeClass("err").addClass("err").html("图形验证码格式有误");
            return;
        }
        else {
            $(this).removeClass("border-red");
            $(this).next().next().next().removeClass("err").html("");
        }
        IsOKPicCode = 1;
    });*/
    //提交注册
    $("#btnRegister").click(function () {

        if (!CheckAgree()) {
            alert("注册为就爱投会员需同意会员协议");
            return;
        }
        if (IsOKTelNo != 1 || IsOKMobileCode != 1 || IsOKPwd != 1) {
            return;
        }
        var strMobile = $.trim($("#phoneNum").val());
        var password = $.trim($("#password").val());
        var MobileCode = $.trim($("#phoneCode").val());
        //var PicCode = $.trim($("#codeNum").val());
        var invatecode = $.trim($("#invatecode").val());
        //提交注册
        var url = 'register';
    	var param = { telphone: strMobile,password:password,msgcode:MobileCode,dev:'PC',invitecode:invatecode };
    	var data = CommnUtil.ajax(url, param,"json");
    	if (data.code == 1) {
    		YesAlert("注册成功", "../user/toLogin");
    	}else {
    		//  $("#Imgcode").attr('src','../user/graphical?'+Math.random());
    		 alert(data.msg);
             return;
    	}

    });

	$(".input").focus(function() {
	    $(this).parent(".form_box").addClass("on");
		$(this).parent(".form_box").nextAll(".prompt_msg").hide();

	})
	$(".input").blur(function() {
	    $(".form_box").removeClass("on");
	})

});


//限制输入数字
limitInt($("#phoneNum"));

//限制只能输入数字(不可以含有小数)
function limitInt(fn) {
    jQuery(fn).keydown(function (e) {
        // 注意此处不要用keypress方法，否则不能禁用　Ctrl+V 与　Ctrl+V,具体原因请自行查找keyPress与keyDown区分，十分重要，请细查
        if (((e.keyCode > 47) && (e.keyCode < 58)) || (e.keyCode == 9) || (e.keyCode == 8) || ((e.keyCode >= 96) && (e.keyCode <= 105))) {// 判断键值
            return true;
        } else {
            return false;
        }

    }).focus(function () {
        this.style.imeMode = 'disabled';   // 禁用输入法,禁止输入中文字符
    });
}


//重新获取短信倒计时
function setCodeTime() {
    var second = Math.floor(codesecond);
    $("#sendCode").html(second+"秒后可重新获取");
    // $("#sendCode").hide();
    codesecond--;
    if (codesecond < 1) {
		$("#sendCode").html("获取短信验证码")
        // $("#sendCode").show();
        // $("#sendCodeText").hide();
        clearInterval(codetimer);
        return;
    }
}

function CheckAgree() {
    var agree = $("#chbAgree").attr("checked");
    if (agree == "checked" || agree) {
        return true;

    } else {

        return false;
    }
}

function IsMobile(strMobile) {
    strMobile = $.trim(strMobile);
    var regTel = new RegExp("^(13|14|15|17|18)[0-9]{9}$", "i");
    if (regTel.test(strMobile)) {
        return true;
    }
    else
    {
        return false;
    }
}

//短信验证码格式
function IsMobileCode(strVCode) {
    strVCode = $.trim(strVCode);
    var regVCode = new RegExp("^[0-9]{6,6}$", "i");
    if (regVCode.test(strVCode)) {
        return true;
    }
    else {
        return false;
    }
}

//验证密码格式
function IsPwd(strPwd) {
    strPwd = $.trim(strPwd);
    var regPwd = new RegExp("^[0-9a-zA-Z]{6,16}$", "i");
    if (regPwd.test(strPwd)) {
        return true;
    }
    else {
        return false;
    }
}

//图片验证码格式
function IsPicCode(strVCode) {
    strVCode = $.trim(strVCode);
    var regVCode = new RegExp("^[0-9a-zA-Z]{5,5}$", "i");
    if (regVCode.test(strVCode)) {
        return true;
    }
    else {
        return false;
    }
}

function YesAlert(msg, url) {
    layer.open({
        content: msg
    , btn: ['确定']
    , yes: function (index) { //或者使用btn1
        window.location.href = url;
    }, cancel: function (index) { //或者使用btn2
        window.location.href = url;
    }
    });
}

function YesParentAlert(msg, url) {
    layer.open({
        content: msg
    , btn: ['确定']
    , yes: function (index) { //或者使用btn1
    	window.open(url,'','fullscreen,scrollbars,resizable=yes,toolbar=no')
    }, cancel: function (index) { //或者使用btn2
    	window.open(url,'','fullscreen,scrollbars,resizable=yes,toolbar=no')
    }
    });
}
