$().ready(function() {
	/**
	 * 常量配置
	 * 
	 */

	/**
	 * 普通认证登录框事件
	 * 
	 */
	// 普通认证登录框用户名获焦事件
	$("#appid").focus(function() {
		$("#appid").val("");
	});
	$("#appPackage").focus(function() {
		$("#appPackage").val("");
	});
	$("#sign").focus(function() {
		$("#sign").val("");
	});

	$("#reset").click(function() {
		$("#appid").val("");
		$("#appPackage").val("");
		$("#sign").val("");
	});

	// 普通认证登录 获取动态短信
	$("#submit").click(function() {

		var appid = $("#appid").val();
		var appPackage = $("#appPackage").val();
		var sign = $("#sign").val();

		if ($.trim(appid) == "") {
			$("#appid").val("sourceid不能为空");
			return;
		}
		if ($.trim(appPackage) == "") {
			$("#appPackage").val("包名不能为空");
			return;
		}
		if ($.trim(sign) == "") {
			$("#sign").val("签名不能为空");
			return;
		}
	//	var url = basePath + "normandy/client/getAppKey";
		var url = basePath + "client/getAppKey";

		var params = "sourceId=" + appid;
		params += "&appPackage=" + appPackage;
		params += "&sign=" + sign;

		$.post(url, params, function(data) {
			//data = data.parseJSON();
			if (data.error) {
				$("#error").text(data.error);
				return;
			} else {
				$("#appkey").val(data.appKey);
			}

		});

	});

});
