
$(function () {
    var nameOk = 0;
    var cardOk = 0;
    $("#name").blur(function() {
        if ($("#name").val() == "") {
            $(".prompt_msg").eq(0).show();
            $(".prompt_msg").eq(0).html("请输入姓名")
        } else {
            nameOk = 1;
        }
    })
    $("#cardNum").blur(function() {
        var cardNum = $.trim($("#cardNum").val());
        if (cardNum == "") {
            $(".prompt_msg").eq(1).show();
            $(".prompt_msg").eq(1).html("请输入身份证号");
        } else if (!isCardNo(cardNum)) {
            $(".prompt_msg").eq(1).show();
            $(".prompt_msg").eq(1).html("请输入正确的身份证号");
        }else {
            cardOk = 1;
        }
    })

    if (nameOk == 1 && cardOk == 1) {
        alert("认证成功");
    }

    $(".input").focus(function() {
	    $(this).parent(".form_box").addClass("on");
		$(this).parent(".form_box").nextAll(".prompt_msg").hide();

	})
	$(".input").blur(function() {
	    $(".form_box").removeClass("on");
	})



    function isCardNo(card)  {
        // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(card) === false) {
            return  false;
        } else {
            return true;
        }
    }



});
