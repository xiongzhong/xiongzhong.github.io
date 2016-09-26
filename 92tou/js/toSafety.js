var imgBox = $(".imgBox");
var bigImg = $(".bigImg");
var bg = $("#bg");
var h = $("body").css("height");
imgBox.click(function(event) {
	var index = $(this).index();
	bg.show();
	bigImg.eq(index).show();
	if (index == 0) {
		img1();
	} else if (index == 1) {
		img2();
	} else if (index == 2) {
		img3();
	} else if (index == 3) {
		img4();
	}
	event.stopPropagation();
})


bigImg.click(function(event) {
	event.stopPropagation();
	return;
})

$(document).click(function() {
	bg.hide();
	bigImg.hide();
	start();
})

function img1() {
	$("#img1").animate({
		top: "50%",
		left: "50%",
		marginTop: "-400px",
		marginLeft: "-500px"
	},1000)
};
function img2() {
	$("#img2").animate({
		width: "1000px",
		marginTop: "-400px",
		marginLeft: "-500px"
	},1000)
};
function img3() {
	$("#img3").animate({
		top: "50%",
		marginTop: "-400px"
	},1000)
};
function img4() {
	$("#img4").animate({
		top: "50%",
		left: "50%",
		marginTop: "-400px",
		marginLeft: "-500px"
	},1000)
};

// 返回初始状态
function start() {
	$("#img1").css({
		top: "-100%",
		left: "-100%"
	})
	$("#img2").css({
		top: "50%",
		left: "50%",
		width: "0px"
	})

	$("#img3").css({
		top: "200%",
		left: "50%",
		marginLeft: "-500px"
	})
	$("#img4").css({
		top: "200%",
		left: "200%"
	})
}
