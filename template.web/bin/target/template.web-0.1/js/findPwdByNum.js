
$(document).ready(function(){
	var picCodeText = "请输入图中结果";
	var mobileNumberText = "请输入手机号码";
	var mesCodeText = "请输入手机验证码";
	var passwordText = "设置密码";
	var confirmPwdText = "确认密码";
	var kongge = "\xa0\xa0";
	var count = 0;
	var t ;
	var phoneMatch=/^(1(3[4-9]|47|5[012789]|8[278])\d{8})$|^(1(3[0-2]|5[56]|8[56]|45)\d{8})$|^((133|153|180|189)\d{8})$/;
	/**
	 * 数字校验
	 */
	var num = /^([0-9]\d*|0)$/;
	function getStyleChange(getMes){
		getMes.removeClass("btn btn-blue btn-radius-none"); 
		getMes.addClass("btn btn-gray btn-radius-none active");
		getMes.attr("disabled",true);
	}
	function getStyleChange2(getMes){
		getMes.removeClass("btn btn-gray btn-radius-none active");
		getMes.addClass("btn btn-blue btn-radius-none");
		getMes.attr("disabled",false);
	}
	function wrongNum(){
		$("#mobileCorrect").css('display','none');
		$("#picCode").val(picCodeText);
		$("#picCode").attr("disabled",true);
		getStyleChange($("#linkGetSmsCode"));
		$("#findPwd").attr("disabled",true);
	}
	function rightNum(){
		$("#errorMobileNumber").css('display','none');
		$("#errorMobileNumber").text("");
		$("#mobileCorrect").css('display','inline');
		$("#mobileCorrect").text(kongge+"手机号码已注册");
		$("#picCode").attr("disabled",false);
		getStyleChange2($("#linkGetSmsCode"));
		$("#findPwd").attr("disabled",false);
	}
$("#mobileNumber").keyup(function(){ 
	if($(this).val().length==11){
		if(!($(this).val().match(phoneMatch))){
			$("#errorMobileNumber").css('display','inline');
			$("#errorMobileNumber").text(kongge+"手机号码不合法");
			wrongNum();
			return;
		}
		var url = basePath + "isRegFindPwd";
		var params = "mobileNumber=" + $(this).val();
		$.post(url, params, function(data) {
			if(data == "没有注册"){
				$("#errorMobileNumber").css('display','inline');
				$("#errorMobileNumber").text(kongge+"手机号码未注册");
				wrongNum();
				return;
			}
			if(data == "手机挂失"){
				$("#errorMobileNumber").css('display','inline');
				$("#errorMobileNumber").text(kongge+"手机号码已挂失不能用于找回密码");
				wrongNum();
				return;
			}
			if(data == "手机销号"){
				$("#errorMobileNumber").css('display','inline');
				$("#errorMobileNumber").text(kongge+"手机号码已销号不能用于找回密码");
				wrongNum();
				return;
			}
			if(data == "已经注册"){
				rightNum();
				return;
			}
		});
	}
});
$("#mobileNumber").blur(function(){
	if($(this).val()==mobileNumberText){ 
		$(this).val(mobileNumberText); 
		$("#errorMobileNumber").css('display','inline');
		$("#errorMobileNumber").text(kongge+"手机号不能为空");
		wrongNum();
		return;
	} 
	if($(this).val().length!=11){ 
		$("#errorMobileNumber").css('display','inline');
		$("#errorMobileNumber").text(kongge+"手机号码不合法");
		wrongNum();
		return;
	} 
});

function picCodeJudge(picCode){
	if(picCode==picCodeText){ 
		$(this).val(picCodeText); 
		$("#errorPicCode").css('display','inline');
		$("#errorPicCode").text("图形码不能为空");
		return false;
	}
	if(!(picCode.trim().match(num))){
		$("#errorPicCode").css('display','inline');
		$("#errorPicCode").text("图形码不合法");
		return false;
	}else{
		$("#errorPicCode").css('display','none');
		$("#errorPicCode").text("");
		return true;
	}
	return true;
}

$("#picCode").blur(function(){
	if(!picCodeJudge($(this).val())){
		return;
	}
});
	/**
	 * 读秒处理
	 */
	var c = 60;
	function testAjax(){
		c = c - 1;
		$("#view").html(c+"秒之后可重新获取");
		if(c>=0){
			t=setTimeout(testAjax,1000);
		}else{
			c = 60;
			$("#view").html("60秒之后可重新获取");
			getStyleChange2($("#linkGetSmsCode"));
		}
	}
function getMesCode(){
	var mobileNumber = $("#mobileNumber").val();
	if(mobileNumber == mobileNumberText){
		$("#errorMobileNumber").css('display','inline');
		$("#errorMobileNumber").text(kongge+"手机号不能为空");
		getStyleChange2($("#linkGetSmsCode"));
		return;
	}
	var picCode = $("#picCode").val();
	if(!picCodeJudge(picCode)){
		getStyleChange2($("#linkGetSmsCode"));
		return;
	}
	var url = basePath + "webGetMesCode";
	var params = "mobileNumber=" + mobileNumber;
		params += "&picCode=" +$("#picCode").val();
		params += "&captchaId=" + $("#captchaId").val();
		params += "&type=" + "findPwdByNum";
	
	$.post(url, params, function(data) {
		if(data == "loseEffect"){
			$("#errorPicCode").css('display','inline');
			$("#errorPicCode").text(kongge+"验证码已失效");
			$("#captchaImg").click();
			getStyleChange2($("#linkGetSmsCode"));
			return;
		} 
		if(data == "wrongCode"){
			$("#errorPicCode").css('display','inline');
			$("#errorPicCode").text(kongge+"验证码错误");
			getStyleChange2($("#linkGetSmsCode"));
			return;
		}
		if(data == "success"){
			$("#mesCode").attr("disabled",false);
			testAjax();
		}
	});
}

function getMes(){
	var mobileNumber = $("#mobileNumber").val();
	if(mobileNumber == mobileNumberText){
		$("#errorMobileNumber").css('display','inline');
		$("#errorMobileNumber").text(kongge+"手机号不能为空");
		getStyleChange2($("#linkGetSmsCode"));
		return;
	}
	var url = basePath + "getMes";
	var params = "mobileNumber=" + mobileNumber;
		params += "&type=" + "findPwdByNum";
	
	$.post(url, params, function(data) {
		if(data == "success"){
			$("#mesCode").attr("disabled",false);
			testAjax();
		}
	});
}

/**
 * 获取按钮的点击事件
 */
$("#linkGetSmsCode").click(function(){
	getStyleChange($(this));
	if($("#view").html()!='60秒之后可重新获取'){
		return;
	}else{
		count++;
		if(count>3){
			if(count==4){
				$("#captchaImg").click();
				$("#picDiv").css("display","inline");
				getStyleChange2($(this));
			}else{
				getMesCode();
			}
		}else{
			getMes();
		}
	}
});

			$("#userHistory").click(function(){
				location.href = basePath+"userHistory";
			});
////短信验证码的点击事件
//$("#mesCode").click(function(){
//	if($(this).val()==mesCodeText){ 
//		$(this).val(""); 
//	} 
//});
////检查短信验证码的输入是否已超过5分钟
//function testLoseEffect(){
//	var url = basePath + "isBeyond";
//	var params = "mobileNumber=" + $("#mobileNumber").val();
//		params += "&type=" +"register";
//	$.post(url, params, function(data) {
//		if(data == "短信验证码失效，请重新获取验证码"){
//			$("#errorMesCode").css("display","inline");
//			$("#errorMesCode").text("验证码已失效");
//			return;
//		}else{
//			$("#errorMesCode").css("display","none");
//			$("#errorMesCode").text("");
//		} 
//	});
//}
////短信验证码的焦点离开事件
//$("#mesCode").blur(function(){
//	if($(this).val()==""){ 
//		$(this).val(mesCodeText); 
//		$("#errorMesCode").css("display","none");
//		$("#errorMesCode").text("");
//		return;
//	}else{
//		testLoseEffect();
//	}
//});
/**
 * 关闭浮层
 */
$("#btnMesError").click(function(){
	$("#mesError").modal("hide");
});
$("#btnCancel").click(function(){
	location.href = basePath+"index";
});
//点击注册
$("#findPwd").click(function(){
	var mobileNumber = $("#mobileNumber").val();
	if(mobileNumber==mobileNumberText){ 
		$("#errorMobileNumber").css('display','inline');
		$("#errorMobileNumber").text(kongge+"手机号不能为空");
		wrongNum();
		return;
	} 
	var mesCode = $("#mesCode").val();
	if(mesCode == mesCodeText){
		$("#errorContext").text("短信码不能为空");
		$("#mesError").modal("show");
		return;
	}
	var url = basePath + "phoneFindPwd";
	var params = "mobileNumber=" + mobileNumber;
		params += "&mesCode="+ mesCode;
		params += "&type="+ "findPwdByNum";
	$.post(url, params, function(data) {
		if(data == "session已过期"){
			location.href = basePath+"index";
		}
		if(data == "手机码已失效"){
			$("#errorContext").text("手机码已失效请重新获取");
			$("#mesError").modal("show");
			return;
		}
		if(data == "短信验证码不正确"){
			$("#errorContext").text(data);
			$("#mesError").modal("show");
			return;
		}
		if(data == "用户已连续错误点击确定按钮20次"){
			$("#errorContext").text("您已错误点击达20次，请重新获取短信验证码");
			$("#mesError").modal("show");
			return;
		}
		if(data == "密码找回成功"){
			location.href = basePath+"pwdSet";
		}
		});
	});

});