// 显示二维码
$(".weixin").hover(function(){
	$(".fuwuhao").show()
}, function(){
	$(".fuwuhao").hide()
})


// 导航菜单
var navBtns = $(".nav_content_right li");
navBtns.click(function(){
	navBtns.removeClass("active");
	$(this).addClass("active");
})
