$(function () {
	$("#moneyAmount").focus(function() { // 输入框阴影
		$(this).parent().addClass("on");

		$(".news").hide();
	})
	$("#moneyAmount").blur(function () {
		    $(this).parent().removeClass("on");
	        var Amount = $.trim($(this).val());
	        var AviAmount = $("#hidAviamount").val();
	        if (Amount == "") {
				$(".news").show();
				$(".news").html("请输入要提现金额");
	            // $(this).removeClass("border-red").addClass("border-red");
	            // $(this).next().removeClass("err").addClass("err").html("请输入要提现金额");
	            return;
	        }
	        else if (IsDouble(Amount) == false || parseFloat(Amount) < 100) {
				$(".news").show();
				$(".news").html("单笔提现不低于100元（只保留2位小数）");
	            // $(this).removeClass("border-red").addClass("border-red");
	            // $(this).next().removeClass("err").addClass("err").html("单笔提现不低于100元（只保留2位小数）");
	            return;
	        }
	        else if (parseFloat(Amount) > parseFloat(AviAmount)) {
				$(".news").show();
				$(".news").html("可用金额不足");
	            // $(this).removeClass("border-red").addClass("border-red");
	            // $(this).next().removeClass("err").addClass("err").html("可用金额不足");
	            return;
	        }
	       /* else if (parseFloat(Amount) > MaxAmount) {
	            $(this).removeClass("border-red").addClass("border-red");
	            $(this).next().removeClass("err").addClass("err").html("单笔提现金额不能超过" + MaxAmount + "元");
	            return;
	        }*/
	        else {
	            $(this).removeClass("border-red");
	            $(this).next().removeClass("err").html("");
	        }
	        //计算手续费
	        var HandAmount = changeTwoDecimal(parseFloat(Amount) * 0.003);
	        if (parseFloat(Amount) <= 1000) {
	            HandAmount = 3;
	        }
	        if(HandAmount >= 300)
	        {
	            HandAmount = 300;
	        }
	        var RealAmount = 0;
	        if (HandAmount + parseFloat(Amount) <= AviAmount) {
	            RealAmount = parseFloat(Amount);
	        }
	        else {
	            RealAmount = parseFloat(AviAmount) - HandAmount;
	        }



	        //显示手续费
	        $("#FeeAmount").html(HandAmount);
	        $("#RealAmount").html(RealAmount);
	});

	   $("#btnWithDraw").bind("click", function () {

		   if($("#hididentitycard").val() == '' || $("#hididentitycard").val() == null || $("#hididentitycard").val() == "null" || $("#hididentitycard").val() == undefined || $("#hididentitycard").val() == "undefined"){
			   YesAlert("亲爱的用户 ：请先绑定身份证进行实名认证！", "../user/toUserBaseInfo");
				 return;
		   }
           var amount = $("#moneyAmount").val();
           if(amount != '' && amount != null && amount != "null" && amount != undefined && amount != "undefined" && amount >= 100 && parseFloat($("#hidAviamount").val()) >= parseFloat(amount)){
        	   var userstatus = $("#hiduserstatus").val();
               if(userstatus == 2 || userstatus == 3){
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
            	   window.open("../user/UserWithdraw?fetAmount="+ amount +"&dev=pc");
               }
           }

       });
});
