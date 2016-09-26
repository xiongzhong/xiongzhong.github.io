
$(function () {
    var investProgress = $("#invest_progress").html(); //众筹进度
    var yellow = $("#yellow"); // 进度条
    var shopNum = $("#shop_num"); //购买数量输入框
    var add = $("#add"); //加一
    var cut = $("#cut"); // 减一
    //限制输入数字
    limitInt($("#shop_num"));

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
    $("#cut").click(function () {
        var amount = shopNum.val().replace("份", "");
        if (parseInt(amount) <= 1) {
            return;
        }
        else {
            shopNum.val(parseInt(amount) - 1 + "份");
        }
    });

    // 加
    $("#add").click(function () {
        var maxamount = parseInt(parseInt($("#usable_sum").html())/100);
        if(parseInt($("#usable_sum").html())/100 > parseInt($("#remain_sum").html())){
            maxamount = parseInt($("#remain_sum").html());
        }
        var amount = shopNum.val().replace("份", "");
        if (maxamount > parseInt(amount) + 1) {
            shopNum.val(parseInt(amount) + 1 + "份");

        } else {
            shopNum.val(maxamount + "份");
        }

    });

    function inputNum() {
        shopNum.blur(function(){
            if ($.trim(shopNum.val()).replace("份", "").replace(" ", "") == "0" || $.trim(shopNum.val()).replace("份", "").replace(" ", "") == "" || $.trim(shopNum.val()).replace("份", "").replace(" ", "").charAt(0) == '0') {
               shopNum.val("1");
            }
            else if (parseInt($("#usable_sum").html())/100 > parseInt($("#remain_sum").html()) && parseInt($.trim(shopNum.val()).replace("份", "").replace(" ", "")) > parseInt($("#remain_sum").html())) {
               shopNum.val($("#remain_sum").html());
            }
            else if(parseInt($.trim(shopNum.val()).replace("份", "").replace(" ", "")) > parseInt($("#usable_sum").html())/100){
            shopNum.val(parseInt(parseInt($("#usable_sum").html())/100) + " 份");
            }
            else {
                shopNum.val($.trim(shopNum.val()).replace("份", "").replace(" ", "") + " 份");
            }
        })

    }
    inputNum()


    // 进度条
    function progress(element, value) {
        element.css({
            width: value
        })
    }
    progress(yellow, investProgress);



    // 是否同意服务协议  自定义单选框添加class
    var flage = true;
    $("#radio_btn").click(function(){
        if (flage) {
            $("#radio_btn").removeClass("on");
            flage = false;
        } else {
            $("#radio_btn").addClass("on");
            flage = true;
        }
    })




    // 立即投资
    $("#invest_btn").click(function(){
        if ($("#radio_btn").hasClass('on') == false) {
            // alert("是否同意服务协议")
        } else {

        }
    })


});
