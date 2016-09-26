$(function () {
   // $("#Imgcode").click(function(){
   //  $("#Imgcode").attr('src','../user/graphical?'+Math.random());
   // });
    //登录
    $("#loginBtn").click(function () {
        var TelNo = $.trim($("#name").val());
        var password = $.trim($("#password").val());
        if (TelNo == "") {
            $(".msg_txt").eq(0).show();
            $(".msg_txt").eq(0).html("请输入手机号！");
            return;
        }
        if (!IsMobile(TelNo)) {
            $(".msg_txt").eq(0).show();
            $(".msg_txt").eq(0).html("手机号码格式不正确！");
            return;
        }
        if (password == "") {
            $(".msg_txt").eq(1).show();
            $(".msg_txt").eq(1).html("请输入登录密码！");
            return;
        }
        if (!IsPwd(password)) {
            $(".msg_txt").eq(1).show();
            $(".msg_txt").eq(1).html("密码有误！");
            return;
        }
        //var PicCode = $.trim($("#codeNum").val());
        var url = 'login';
    	//var param = { "data":{"telphone": TelNo,"password":password,"ghcode":PicCode,"dev":'PC'}};
    	//var param = JSON.stringify( { "data":{"telphone": TelNo,"password":password,"ghcode":PicCode,"dev":'PC'}});
        var param = JSON.stringify( { "data":{"telphone": TelNo,"password":password,"dev":'PC'}});
    	var data = CommnUtil.ajax(url, param,"json");
    	if (data.code == 1) {
    		//YesAlert("登录成功", "../user/toIndex");
    		window.location.href = '../user/toIndex';
    	}else {
    		//刷新验证码，因为验证码只能用一次
    		//  $("#Imgcode").attr('src','../user/graphical?'+Math.random());
    		//  alert(data.msg);
    		//alert("登录失败");
             return;
    	}
    });

    $(".loginBox").keypress(function (e) {
        if (e.keyCode == "13") {
            $("#loginBtn").click();
        }
    });
});


//验证手机格式
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

//限制输入数字
limitInt($("#name"));

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

$(".input").focus(function() {
    $(this).parent().addClass("on");
})
$(".input").blur(function() {
    $(".phone_box").removeClass("on");
})
$(".input").eq(0).focus(function() {
    $(".msg_txt").eq(0).hide()
})
$(".input").eq(1).focus(function() {
    $(".msg_txt").eq(1).hide()
})
