$().ready(function(){	
	/**
     * 常量配置
     * 
     * */
	//计时时间设置
	timeInit = 60;
	//跳转路径
	basePath = "http://localhost:8080/normandy.web";
	//自服务跳转路径
	ssobasePath = "https://218.206.179.114/sso/";
	//找回密码路径
	findPwd = "https://218.206.179.114/sso/findPwd";
	//刷新主页面
	reloadIndex = "https://218.206.179.114/sso/index";
	//验证信息路径
	validateUserInfoURL = basePath+"/loginRequest";
	//登录验证码路径
	loginCaptcha = basePath+"/GetCaptcha?model=1";
	//动态短信验证码路径
	DSCaptcha = basePath+"/SMSOTPRequest";
	DSCaptcha2 = basePath+"/GetCaptcha?model=2";
	//显示验证码路径
	imageCodeFlagReq = basePath+"/imageCodeFlagReq";
	//邮箱正则
	mailPattern = /^([a-zA-Z0-9\_\-\.])+@([a-zA-Z0-9\_\-\.])+(\.([a-zA-Z0-9])+)+$/;
	//登录flag
	login = "登录";
	loadingFuction = "";
    /**
     * 倒计时
     * 
     * */
	
	djs = 0;
	MAdjs = 0;
	function timeTo(){
	    if(djs>0){
	        djs--;
	        $("#getDS").text(djs+"秒后重新获取");
	      
	        if(djs == 0){
	        	$("#getDS").addClass("greybtn");
	          	$("#getDS").removeClass("disabled");
		        $("#getDS").text("获取动态密码");
		        
		        return;
		    }
	        setTimeout(timeTo,1000);
	    }
	   


	}
	function time(){
	    if( djs != 0){
	        return;
	    }
	    djs = timeInit;
	    jishi = setTimeout(timeTo,0);
	}
	
	function MAtimeTo(){
	    if(MAdjs>0){
	    	MAdjs--;
	        $("#quick").val(MAdjs+"秒后重新认证");
	        if(MAdjs == 0){
		        $("#quick").val("重新认证");
		        return;
		    }
	        setTimeout(MAtimeTo,1000);
	    }
	    


	}
	function MAtime(){
	    if( MAdjs != 0){
	        return;
	    }
	    MAdjs = timeInit;
	    setTimeout(MAtimeTo,0);
	}
	
	
	 /**
     * 普通认证登录按钮载入事件
     * 
     * */
	function loading(){
		login = $("#normal").val();
		if(login =="loading."){
			$("#normal").val("loading..");
		}
		if(login =="loading.."){
			$("#normal").val("loading...");
		}
		if(login =="登录" || login =="loading..."){
			$("#normal").val("loading.");
		}
	}
	
	 /**
     * 普通认证登录框事件
     * 
     * */
		//普通认证登录框用户名获焦事件
	   $("#upUsername").focus(function(){
			 $("#upUsernameException").text("");
	    });
	   
	   //普通认证登录框用户名失焦事件
	   $("#upUsername").blur(function(){
	        var username = $("#upUsername").val();
	        username = $.trim(username);
	        if(username == "请输入手机号/邮箱"){
	        	$("#upUsernameException").text("手机号/邮箱不能为空");
	            return;
	        }
	        var number = /^[0-9]+$/;
	        if(number.test(username)){
	            var phoneNumber = /^[0-9]{11}$/;
	            if(phoneNumber.test(username)){
	                var mobilePhone = /^(13[0-9]|15[5-9]|15[0-3]|18[5-9]|180|182|147|145)[0-9]{8}$/;
	                if(!mobilePhone.test(username)){
	                    $("#upUsernameException").text("请输入正确的手机号码");
	                    return;
	                }
	            }else{
	                $("#upUsernameException").text("手机号码格式不正确");
	                return;
	            }
	        }else{
	            if(!mailPattern.test(username)){
	                $("#upUsernameException").text("邮箱格式错误，请重新输入");
	                return;
	            }
	        }

	        $("#upUsernameException").text("");
	        
//	        var url = imageCodeFlagReq;
//	        var jsonData = {"username":$.trim($("#upUsername").val())};
//	        $.post(url, jsonData, function(data) {
//	            if(data.resultCode == 1){
//	            	 if($('#LoginImgCodeDiv').css('display') != "block"){
//	            		 $('#loginImgCodeException').text("请输入图形验证码");
//	            		 $('#loginImgCode').val("请输入图中文字");
//	            		 $('#LoginImgCodeDiv').css({display:"block"});
//	            		 
//	            		 var username = $.trim($("#upUsername").val());
//	                     if(username == "请输入手机号/邮箱"){
//	            	    		username ="";
//	            	    	}
//	            	    	$("#loginImg").attr("src",loginCaptcha+"&username="+username+"&"+Math.random());
//	            	 }
//	            }
//	            if(data.resultCode == 2){
//	            	  if($('#DSImgCodeDiv').css('display') != "block"){
//	            		  $('#DSImgCodeException').text("请输入图形验证码");
//	            		  $('#DSImgCode').val("请输入图中文字");
//		            		  $('#DSImgCodeDiv').css({display:"block"});
//		            		  var username = $.trim($("#upUsername").val());
//		            	        if(username == "请输入手机号/邮箱"){
//		            		    		username ="";
//		            		    	}
//		            		    	$("#DSImg").attr("src",DSCaptcha+"&username="+username+"&"+Math.random());
//		            	 }
//	            }
//	            if(data.resultCode == 3){
//	            	 if($('#LoginImgCodeDiv').css('display') != "block"){
//	            		 $('#loginImgCodeException').text("请输入图形验证码");
//	            		 $('#loginImgCode').val("请输入图中文字");
//	            		 $('#LoginImgCodeDiv').css({display:"block"});
//	            		 
//	            		 var username = $.trim($("#upUsername").val());
//	                     if(username == "请输入手机号/邮箱"){
//	            	    		username ="";
//	            	    	}
//	            	    	$("#loginImg").attr("src",loginCaptcha+"&username="+username+"&"+Math.random());
//	            	 }
//	            	 
//	            	  if($('#DSImgCodeDiv').css('display') != "block"){
//	            		  $('#DSImgCodeException').text("请输入图形验证码");
//	            		  $('#DSImgCode').val("请输入图中文字");
//		            		  $('#DSImgCodeDiv').css({display:"block"});
//		            		  var username = $.trim($("#upUsername").val());
//		            	        if(username == "请输入手机号/邮箱"){
//		            		    		username ="";
//		            		    	}
//		            		    	$("#DSImg").attr("src",DSCaptcha+"&username="+username+"&"+Math.random());
//		            	 }
//	            }
//	            if(data.resultCode == 0){
//	            	 $('#DSImgCode').val("请输入图中文字");
//	            	 $('#loginImgCode').val("请输入图中文字");
//	            	 
//	            	$('#loginImgCodeException').text("");
//	            	$('#LoginImgCodeDiv').css({display:"none"});
//	            	
//	            	$('#DSImgCodeException').text("");
//	            		$('#DSImgCodeDiv').css({display:"none"});
//	            }
//	        });

	    });
	   
	   //普通认证登录 密码提示框获焦事件
	   $("#pwdText").focus(function(){
		   $('#pwdText').css({display:"none"});
		   $('#password').css({display:"block"});
		   $('#password').focus();
	   });
	   //普通认证登录框密码获焦事件
	   $("#password").focus(function(){
	        $("#passwordException").text("");

	    });
	   //普通认证登录框密码失焦事件
	   $("#password").blur(function(){
	        var pwd = $("#password").val();
	        pwd = $.trim(pwd);
	        if(pwd == ""){
	            $('#pwdText').css({display:"block"});
	 		    $('#password').css({display:"none"});
	 		   $("#passwordException").text("密码/短信验证码不能为空");
	            return;
	        }
	        if(pwd.length>16||pwd.length<6){
	            $("#passwordException").text("密码/短信验证码长度要求6~16位");
	            return;
	        }

	        $("#passwordException").text("");

	    });
	   //普通认证登录框   登录图形验证码获焦事件
	   $("#loginImgCode").focus(function(){
	        $("#loginImgCodeException").text("");
	    });
	   //普通认证登录框   登录图形验证码失焦事件
	    $("#loginImgCode").blur(function(){
	        var code = $("#loginImgCode").val();
	        code = $.trim(code);
	        if(code == "请输入图中文字"){
	        	$("#loginImgCodeException").text("图形验证码不能为空");
	        	$("#loginImg").click();
	        	return;
	        }
	        var coder = /^[\w]+$/;
	        if(!coder.test(code)){
	            $("#loginImgCodeException").text("请输入正确的图形验证码");
	            $("#loginImg").click();
	            return;
	        }
	    });
	    
	    //普通认证登录框   短信图形验证码获焦事件
		   $("#DSImgCode").focus(function(){
		        $("#DSImgCodeException").text("");
		    });
	   //普通认证登录框   短信图形验证码失焦事件
	    $("#DSImgCode").blur(function(){
	        var code = $("#DSImgCode").val();
	        code = $.trim(code);
	        if(code == "请输入图中文字"){
	        	$("#DSImgCodeException").text("图形验证码不能为空");
	        	$("#DSImg").click();
	        	return;
	        }
	        var coder = /^[\w]+$/;
	        if(!coder.test(code)){
	            $("#DSImgCodeException").text("请输入正确的图形验证码");
	            $("#DSImg").click();
	            return;
	        }
	    });
	    //普通认证登录   获取动态短信
	    $("#getDS").click(function(){
	    	
	        if(djs != 0){
	            return;
	        }
	        var username = $("#upUsername").val();
	        username = $.trim(username);
	        var number = /^[0-9]+$/;
	        if(number.test(username)){
	            var phoneNumber = /^[0-9]{11}$/;
	            if(phoneNumber.test(username)){
	                var mobilePhone = /^(13[0-9]|15[5-9]|15[0-3]|18[5-9]|180|182|147|145)[0-9]{8}$/;
	                if(!mobilePhone.test(username)){
	                    $("#upUsernameException").text("请输入正确的手机号码");
	                    return;
	                }
	            }else{
	                $("#upUsernameException").text("手机号码格式不正确");
	                return;
	            }
	        }else{
	        	 $("#upUsernameException").text("请输入正确的手机号码");
                 return;
	        }
	        if($('#DSImgCodeDiv').css('display') == "block"){
	            var code = $("#DSImgCode").val();
	            code = $.trim(code);
	            if(code == "请输入图中文字"){
		        	$("#DSImgCodeException").text("图形验证码不能为空");
		        	$("#DSImg").click();
		        	return;
		        }
		        var coder = /^[\w]+$/;
		        if(!coder.test(code)){
		            $("#DSImgCodeException").text("请输入正确的图形验证码");
		            $("#DSImg").click();
		            return;
		        }
	        }
	        var url = DSCaptcha;            
            var jsonData = "";
	        if($('#DSImgCodeDiv').css('display') == "block"){
	        	jsonData = {"username":$.trim($("#upUsername").val()),"authType":
		            $("#authType").val(),"tid":$("#tid").val(),"operationType":2,
		            "relayState":$("#relayState").val(),"imageValidateCode":$("#DSImgCode").val()};
	        }else{
	        	jsonData = {"username":$.trim($("#upUsername").val()),"authType":
		            $("#authType").val(),"tid":$("#tid").val(),"operationType":2,
		            "relayState":$("#relayState").val()};
	        }


	        $.post(url, jsonData, function(data) {
	            //data =(new Function("","return "+data))();
	            if(data.resultCode == 101105){

	                $("#getDS").addClass("disabled");
		        	$("#getDS").removeClass("greybtn");
	                time();
	            }
                if(data.resultCode == 101120){

                    $("#upUsernameException").text("您的手机暂不支持本功能 ");

                }
	            if(data.resultCode == 101119){
	                $('#DSImgCodeException').text("请输入图形验证码");
	                $('#DSImgCodeDiv').css({display:"block"});
	                var username = $.trim($("#upUsername").val());
	                if(username == "请输入手机号/邮箱"){
	        	    		username ="";
	        	    	}
	        	    	$("#DSImg").attr("src",DSCaptcha+"&username="+username+"&"+Math.random());
	            }
	            if(data.resultCode == 101104){
	                $('#DSImgCodeException').text("图形验证码超时,请重新输入");
	                var username = $.trim($("#upUsername").val());
	                if(username == "请输入手机号/邮箱"){
	        	    		username ="";
	        	    	}
	        	    	$("#DSImg").attr("src",DSCaptcha+"&username="+username+"&"+Math.random());
	            }
	            if(data.resultCode == 101117){
	                $('#DSImgCodeException').text("图形验证码错误,请重新输入");
	                var username = $.trim($("#upUsername").val());
	                if(username == "请输入手机号/邮箱"){
	        	    		username ="";
	        	    	}
	        	    	$("#DSImg").attr("src",DSCaptcha+"&username="+username+"&"+Math.random());
	            }

	        });

	    });
	    //普通认证登录   获取动态短信
	    $("#getDS2").click(function(){
	    	
	        if(djs != 0){
	            return;
	        }
	        var username = $("#upUsername").val();
	        username = $.trim(username);
	        var number = /^[0-9]+$/;
	        if(number.test(username)){
	            var phoneNumber = /^[0-9]{11}$/;
	            if(phoneNumber.test(username)){
	                var mobilePhone = /^(13[0-9]|15[5-9]|15[0-3]|18[5-9]|180|182|147|145)[0-9]{8}$/;
	                if(!mobilePhone.test(username)){
	                    $("#upUsernameException").text("请输入正确的手机号码");
	                    return;
	                }
	            }else{
	                $("#upUsernameException").text("手机号码格式不正确");
	                return;
	            }
	        }else{
	        	 $("#upUsernameException").text("请输入正确的手机号码");
                 return;
	        }
	        if($('#DSImgCodeDiv').css('display') == "block"){
	            var code = $("#DSImgCode").val();
	            code = $.trim(code);
	            if(code == "请输入图中文字"){
		        	$("#DSImgCodeException").text("图形验证码不能为空");
		        	$("#DSImg").click();
		        	return;
		        }
		        var coder = /^[\w]+$/;
		        if(!coder.test(code)){
		            $("#DSImgCodeException").text("请输入正确的图形验证码");
		            $("#DSImg").click();
		            return;
		        }
	        }
	        var url =  basePath+"/loginRequest";            
            var jsonData = "";
	        if($('#DSImgCodeDiv').css('display') == "block"){
	        	jsonData = {"username":$.trim($("#upUsername").val()),"authType":
		            $("#authType").val(),"tid":$("#tid").val(),"operationType":2,
		            "relayState":$("#relayState").val(),"imageValidateCode":$("#DSImgCode").val()};
	        }else{
	        	jsonData = {"username":$.trim($("#upUsername").val()),"authType":
		            $("#authType").val(),"tid":$("#tid").val(),"operationType":2,
		            "relayState":$("#relayState").val()};
	        }


	        $.post(url, jsonData, function(data) {
	            //data =(new Function("","return "+data))();
	            if(data.resultCode == 101105){

	                $("#getDS2").addClass("disabled");
		        	$("#getDS2").removeClass("greybtn");
	                time();
	            }
                if(data.resultCode == 101120){

                    $("#upUsernameException").text("您的手机暂不支持本功能 ");

                }
	            if(data.resultCode == 101119){
	                $('#DSImgCodeException').text("请输入图形验证码");
	                $('#DSImgCodeDiv').css({display:"block"});
	                var username = $.trim($("#upUsername").val());
	                if(username == "请输入手机号/邮箱"){
	        	    		username ="";
	        	    	}
	        	    	$("#DSImg").attr("src",DSCaptcha+"&username="+username+"&"+Math.random());
	            }
	            if(data.resultCode == 101104){
	                $('#DSImgCodeException').text("图形验证码超时,请重新输入");
	                var username = $.trim($("#upUsername").val());
	                if(username == "请输入手机号/邮箱"){
	        	    		username ="";
	        	    	}
	        	    	$("#DSImg").attr("src",DSCaptcha+"&username="+username+"&"+Math.random());
	            }
	            if(data.resultCode == 101117){
	                $('#DSImgCodeException').text("图形验证码错误,请重新输入");
	                var username = $.trim($("#upUsername").val());
	                if(username == "请输入手机号/邮箱"){
	        	    		username ="";
	        	    	}
	        	    	$("#DSImg").attr("src",DSCaptcha+"&username="+username+"&"+Math.random());
	            }

	        });

	    });
	  //普通认证登录   登录事件
	    $("#normal").click(function(){
		    	if(login !="登录"){
		    		return;
		    	}
		    	
		    	$("#upUsernameException").text("");
		    	$("#passwordException").text("");
		    	$("#loginImgCodeException").text("");
		    	$("#DSImgCodeException").text("");
	    		$("#authType").val("UPDS");
	    		var username = $("#upUsername").val();
		        username = $.trim(username);
		        if(username == "请输入手机号/邮箱"){
		        	$("#upUsernameException").text("手机号/邮箱不能为空");
		            return;
		        }
		        var number = /^[0-9]+$/;
		        if(number.test(username)){
		            var phoneNumber = /^[0-9]{11}$/;
		            if(phoneNumber.test(username)){
		                var mobilePhone = /^(13[0-9]|15[5-9]|15[0-3]|18[5-9]|180|182|147|145)[0-9]{8}$/;
		                if(!mobilePhone.test(username)){
		                    $("#upUsernameException").text("请输入正确的手机号码");
		                    return;
		                }
		            }else{
		                $("#upUsernameException").text("手机号码格式不正确");
		                return;
		            }
		        }else{
		            if(!mailPattern.test(username)){
		                $("#upUsernameException").text("邮箱格式错误，请重新输入");
		                return;
		            }
		        }
		        var pwd = $("#password").val();
		        pwd = $.trim(pwd);
		        if(pwd == ""){
		            $("#passwordException").text("密码/短信验证码不能为空");
		            return;
		        }
		        if(pwd.length>16||pwd.length<6){
		            $("#passwordException").text("密码/短信验证码长度要求6~16位");
		            return;
		        }
		        if($('#LoginImgCodeDiv').css('display') == "block"){
		        	 var code = $("#loginImgCode").val();
				        code = $.trim(code);
				        if(code == "请输入图中文字"){
				        	$("#loginImgCodeException").text("图形验证码不能为空");
				        	$("#loginImg").click();
				        	return;
				        }
				        var coder = /^[\w]+$/;
				        if(!coder.test(code)){
				            $("#loginImgCodeException").text("请输入正确的图形验证码");
				            $("#loginImg").click();
				            return;
				        }
	        }
		       
		        var url = validateUserInfoURL;
		        var password = $("#password").val();
		        var username = $("#upUsername").val();

		        password = hex_sha1("feition"+":"+password);

                var jsonData = "";	
		        if($('#LoginImgCodeDiv').css('display') == "block"){
		        	jsonData = {"username":username,"password":password,"authType":
			            $("#authType").val(),"asDomain":$("#asDomain").val(),
			            "callBackURL":$("#callBackURL").val(),
			            "relayState":$("#relayState").val(),
	                    "imageValidateCode":$("#loginImgCode").val(),
	                    "operationType":1};
		        }else{
		        	 jsonData = {"username":username,"password":password,"authType":
				            $("#authType").val(),"asDomain":$("#asDomain").val(),
				            "callBackURL":$("#callBackURL").val(),
				            "relayState":$("#relayState").val(),
		                    "operationType":1};
		        }
		       
		        $.ajax({
		            url:url,
		            type:"post",
		            timeout: 30000,
		            data:jsonData,
		            beforeSend:function(){
		            	//这里是开始执行方法，显示效果，效果自己写
		               clearInterval(loadingFuction);
		               loadingFuction = setInterval(loading,300);
		                
		            },
		            complete:function(){
		                //方法执行完毕，效果自己可以关闭，或者隐藏效果
		            	clearInterval(loadingFuction);
		            	$("#normal").val("登录");
		                login = "登录";
		            },
		            success:function(data){
//		            	var data = data.model.data;
		            	var data = eval('(' + data + ')');; //由JSON字符串转换为JSON对象
		                //数据加载成功
		            		if(data.resultCode == 101000){
				                //parent.location.href = data.callBackURL+"?SToken="+data.SToken +"&relayState="+data.relayState;
		            			 parent.location.href = "login";
				            }
		                    if(data.resultCode == 101109){
		                        parent.location.href = data.callBackURL+"?SToken="+data.SToken+"&relayState="+data.relayState;
		                    }
				            if(data.resultCode == 101101){
				                $("#upUsernameException").text("用户名或密码错误,请重新输入");
				                if($('#LoginImgCodeDiv').css('display') == "block"){
				                	
				                	var username = $.trim($("#upUsername").val());
				                    if(username == "请输入手机号/邮箱"){
				           	    		username ="";
				           	    	}
				           	    	$("#loginImg").attr("src",loginCaptcha+"&username="+username+"&"+Math.random());
				                }
				            }
				            if(data.resultCode == 101103){
				            	$("#upUsernameException").text("用户名或密码错误,请重新输入");
				                $('#loginImgCodeException').text("请输入图形验证码");
				                $('#LoginImgCodeDiv').css({display:"block"});
				                
				                var username = $.trim($("#upUsername").val());
				                if(username == "请输入手机号/邮箱"){
				       	    		username ="";
				       	    	}
				       	    	$("#loginImg").attr("src",loginCaptcha+"&username="+username+"&"+Math.random());
				            }
				            if(data.resultCode == 101104){
				                $('#loginImgCodeException').text("图形验证码超时,请重新输入");
				                
				                var username = $.trim($("#upUsername").val());
				                if(username == "请输入手机号/邮箱"){
				       	    		username ="";
				       	    	}
				       	    	$("#loginImg").attr("src",loginCaptcha+"&username="+username+"&"+Math.random());
				            }
				            if(data.resultCode == 101117){
				                $('#loginImgCodeException').text("图形验证码错误,请重新输入");
				                
				                var username = $.trim($("#upUsername").val());
				                if(username == "请输入手机号/邮箱"){
				       	    		username ="";
				       	    	}
				       	    	$("#loginImg").attr("src",loginCaptcha+"&username="+username+"&"+Math.random());
				            }
				            if(data.resultCode == 101102){
				                $("#upUsernameException").text("认证次数过多,请重新获取动态短信 ");
				            }
				            if(data.resultCode == 101110){
				                $("#upUsernameException").text("动态短信认证失败，请输入正确的短信验证码 ");
				            }
				            if(data.resultCode == 101111){
				                $("#upUsernameException").text("动态短信认证超时,请重新获取短信验证码");
				            }
				            if(data.resultCode == 100201){
		                        $("#upUsernameException").text("该账号是隐式账号");

		                    }
				            if(data.resultCode == 104102){
		                        $("#upUsernameException").text("输入的账号不存在");

		                    }


		            },
		            error:function(data,error){
		              //数据加载失败
		            	 if(error == "timeout"){
							  $("#upUsernameException").text("请求超时,请稍后重试!");
						  }else{
							  $("#upUsernameException").text("请求失败,请稍后重试!");
						  }
		           }
		        });
      
	    });
	    
	    //一键登录   登录事件
	    $("#quick").click(function(){
	    	$("#authType").val("MA");
		   	 if(MAdjs != 0){
		            return;
		        }
		   	$("#maUsernameException").text("");
	    	$("#maImgCodeException").text("");
 		var username = $("#maUsername").val();
	        username = $.trim(username);
	        if(username == "请输入中国移动手机号码"){
	        	$("#maUsernameException").text("手机号码不能为空");
	            return;
	        }
	        var number = /^[0-9]+$/;
	        if(number.test(username)){
	            var phoneNumber = /^[0-9]{11}$/;
	            if(phoneNumber.test(username)){
	                var mobilePhone = /^(13[4-9]|15[7-9]|15[0-2]|18[7-8]|182|147)[0-9]{8}$/;
	                if(!mobilePhone.test(username)){
	                    $("#maUsernameException").text("请输入中国移动手机号码");
	                    return;
	                }
	            }else{
	                $("#maUsernameException").text("手机号码格式不正确");
	                return;
	            }
	        }else{
	        	 $("#maUsernameException").text("请输入中国移动手机号码");
                 return;
	        }

	        $("#maUsernameException").text("");
	        
	        if($('#maImgCodeDiv').css('display') == "block"){
	        		var code = $("#maImgCode").val();
			        code = $.trim(code);
			        if(code == "请输入图中文字"){
			        	 $("#maImgCodeException").text("图形验证码不能为空");
			        	 $("#maImg").click();
			        	 return;
			        }
			        var coder = /^[\w]+$/;
			        if(!coder.test(code)){
			            $("#maImgCodeException").text("请输入正确的图形验证码");
			            $("#maImg").click();
			            return;
			        }
	        }
	        MAtime();
	        var url = validateUserInfoURL;
	        var jsonData = "";
	        if($('#maImgCodeDiv').css('display') == "block"){
	        	jsonData = {"username":username,"authType":
		            $("#authType").val(),"asDomain":$("#asDomain").val(),
		            "callBackURL":$("#callBackURL").val(),
		            "relayState":$("#relayState").val(),"imageValidateCode":$("#maImgCode").val()};
	        }else{
	        	jsonData = {"username":username,"authType":
		            $("#authType").val(),"asDomain":$("#asDomain").val(),
		            "callBackURL":$("#callBackURL").val(),
		            "relayState":$("#relayState").val()};
	        }
	        
	        $.ajax({
	            url:url,
	            type:"post",
	            timeout: 60000,
	            data:jsonData,
	            beforeSend:function(){
	            	//这里是开始执行方法，显示效果，效果自己写
	                
	            },
	            complete:function(){
	                //方法执行完毕，效果自己可以关闭，或者隐藏效果
	            },
	            success:function(data){
//	            	var data = data.model.data;
	            	var data = eval('(' + data + ')');; //由JSON字符串转换为JSON对象
	                //数据加载成功
	            	if(data.resultCode == 101113){

	                    parent.location.href = data.callBackURL+"?SToken="+data.SToken+"&relayState="+data.relayState;

	                }
	                if(data.resultCode == 101112){
	                    $("#maUsernameException").text("移动签名认证失败 ");
	                }
	                if(data.resultCode == 101114){
	                    $("#maUsernameException").text("移动签名认证超时,请重新认证 ");
	                }
		            if(data.resultCode == 101103){
		            	$("#maUsernameException").text("移动签名认证失败 ");
                        $('#maImgCodeDiv').css({display:"block"});
		                $('#maImgCodeException').text("请输入图形验证码");
		                
		          
            	    	var username = $.trim($("#maUsername").val());
            	        if(username == "请输入中国移动手机号码"){
            		    		username ="";
            		    	}
            		    	$("#maImg").attr("src",loginCaptcha+"&username="+username+"&"+Math.random());
		            }
		            if(data.resultCode == 101104){
		                $('#maImgCodeException').text("图形验证码超时,请重新输入");
		                
		                var username = $.trim($("#maUsername").val());
		                if(username == "请输入中国移动手机号码"){
            	    		username ="";
            	    	}
            	    	$("#maImg").attr("src",loginCaptcha+"&username="+username+"&"+Math.random());
		            }
		            if(data.resultCode == 101117){
		                $('#maImgCodeException').text("图形验证码错误,请重新输入");
		                
		                var username = $.trim($("#maUsername").val());
		                if(username == "请输入中国移动手机号码"){
            	    		username ="";
            	    	}
            	    	$("#maImg").attr("src",loginCaptcha+"&username="+username+"&"+Math.random());
		            }
		            if(data.resultCode == 101106){
                        parent.location.href = data.callBackURL+"?SToken="+data.SToken+"&relayState="+data.relayState;

                    }
                    if(data.resultCode == 101107){
                        $("#maUsernameException").text("sim卡认证失败 ");
                    }
                    if(data.resultCode == 101108){
                        $("#maUsernameException").text("sim卡认证超时,请重新认证 ");

                    }
                    if(data.resultCode == 101118){
                        $("#maUsernameException").text("您的手机暂不支持一键登录 ");

                    }
                    if(data.resultCode == 100201){
                        $("#maUsernameException").text("您的手机暂不支持一键登录 ");

                    }

	            },
	            error:function(data,error){
	              //数据加载失败
	            	 if(error == "timeout"){
						  $("#maUsernameException").text("请求超时,请稍后重试!");
					  }else{
						  $("#maUsernameException").text("请求失败,请稍后重试!");
					  }
	           }
	        });
	    	
	    });
	 
	    
	    /**
	     * 一键登录 事件
	     * 
	     * */
	    
	    	//一键登录 用户名获焦事件
		   $("#maUsername").focus(function(){
				 $("#maUsernameException").text("");
		    });
		   
		   //一键登录 用户名失焦事件
		   $("#maUsername").blur(function(){
		        var username = $("#maUsername").val();
		        username = $.trim(username);
		        if(username == "请输入中国移动手机号码"){
		        	$("#maUsernameException").text("手机号码不能为空");
		            return;
		        }
		        var number = /^[0-9]+$/;
		        if(number.test(username)){
		            var phoneNumber = /^[0-9]{11}$/;
		            if(phoneNumber.test(username)){
		                var mobilePhone = /^(13[4-9]|15[7-9]|15[0-2]|18[7-8]|182|147)[0-9]{8}$/;
		                if(!mobilePhone.test(username)){
		                    $("#maUsernameException").text("请输入中国移动手机号码");
		                    return;
		                }
		            }else{
		                $("#maUsernameException").text("手机号码格式不正确");
		                return;
		            }
		        }else{
		        	 $("#maUsernameException").text("请输入中国移动手机号码");
	                    return;
		        }

		        $("#maUsernameException").text("");
		        
		        var url = imageCodeFlagReq;
		        var jsonData = {"username":$.trim($("#maUsername").val())};
		        $.post(url, jsonData, function(data) {
		            if(data.resultCode == 1 ||data.resultCode == 3){
		            	 if($('#maImgCodeDiv').css('display') != "block"){
		            		 $('#maImgCodeException').text("请输入图形验证码");
		            		 $('#maImgCode').val("请输入图中文字");
		            		 $('#maImgCodeDiv').css({display:"block"});
		            		 
		            		 var username = $.trim($("#maUsername").val());
		            	        if(username == "请输入中国移动手机号码"){
		            		    		username ="";
		            		    }
		            		    $("#maImg").attr("src",loginCaptcha+"&username="+username+"&"+Math.random());
		            	 }
		            
		            }
		            if(data.resultCode == 0){
		            	$('#maImgCodeException').text("");
		            	$('#maImgCode').val("请输入图中文字");
		            	$('#maImgCodeDiv').css({display:"none"});
		            }
		        });

		    });
		   
	   //一键登录   图形验证码获焦事件
	   $("#maImgCode").focus(function(){
	        $("#maImgCodeException").text("");
	    });
	   //一键登录   图形验证码失焦事件
	    $("#maImgCode").blur(function(){
	        var code = $("#maImgCode").val();
	        code = $.trim(code);
	        if(code == "请输入图中文字"){
	        	 $("#maImgCodeException").text("图形验证码不能为空");
	        	 $("#maImg").click();
	        	 return;
	        }
	        var coder = /^[\w]+$/;
	        if(!coder.test(code)){
	            $("#maImgCodeException").text("请输入正确的图形验证码");
	            $("#maImg").click();
	            return;
	        }
	    });

    $("#loginImgChange,#loginImg").click(function(){
    	 var username = $.trim($("#upUsername").val());
         if(username == "请输入手机号/邮箱"){
	    		username ="";
	    	}
	    	$("#loginImg").attr("src",loginCaptcha+"&username="+username+"&"+Math.random());
    });
    $("#DSImgChange,#DSImg").click(function(){
    	var username = $.trim($("#upUsername").val());
        if(username == "请输入手机号/邮箱"){
	    		username ="";
	    	}
	    	$("#DSImg").attr("src",DSCaptcha+"&username="+username+"&"+Math.random());
    });
    $("#maImgChange,#maImg").click(function(){
    	var username = $.trim($("#maUsername").val());
        if(username == "请输入中国移动手机号码"){
	    		username ="";
	    	}
	    	$("#maImg").attr("src",loginCaptcha+"&username="+username+"&"+Math.random());
    });
    
    
    $("#close").click(function(){
    	 $("#quick").val("登录");
    	parent.location.href= reloadIndex;
    });
    
    $(".Loginregister").click(function() {
		parent.location.href = ssobasePath + "index?register=register";
//		var url = ssobasePath + "register";
//		var param = "";
//		$.post(url, param, function(data) {
//			parent.$("#loginBox").fadeIn();
//			parent.$("#loginBG").fadeIn();
//			parent.$("#loginBox").css({
//				left	:	($(window).innerWidth() - $('#loginBox').outerWidth()) / 2 + $(document).scrollLeft(),
//				top		:	($(window).innerHeight() - $('#loginBox').outerHeight()) / 2 + $(document).scrollTop()
//			});
//			parent.$("#loginBox").html(data);
//		});
	});
    $("#forgetPwd").click(function() {
    	parent.location.href = findPwd;
    });
    
    /**
     * enter 登录事件
     * 
     * */
    $(function(){
	    document.onkeydown = function(e){  
	      var ev = document.all ? window.event : e;
	      if(ev.keyCode==13) {	    	  
	    	 if($("#authType").val() == "MA"){
	    		 $("#authType").val("MA");
			   	 if(MAdjs != 0){
			            return;
			        }
			   	$("#maUsernameException").text("");
		    	$("#maImgCodeException").text("");
	 		var username = $("#maUsername").val();
		        username = $.trim(username);
		        if(username == "请输入中国移动手机号码"){
		        	$("#maUsernameException").text("手机号码不能为空");
		            return;
		        }
		        var number = /^[0-9]+$/;
		        if(number.test(username)){
		            var phoneNumber = /^[0-9]{11}$/;
		            if(phoneNumber.test(username)){
		                var mobilePhone = /^(13[4-9]|15[7-9]|15[0-2]|18[7-8]|182|147)[0-9]{8}$/;
		                if(!mobilePhone.test(username)){
		                    $("#maUsernameException").text("请输入中国移动手机号码");
		                    return;
		                }
		            }else{
		                $("#maUsernameException").text("手机号码格式不正确");
		                return;
		            }
		        }else{
		        	 $("#maUsernameException").text("请输入中国移动手机号码");
	                 return;
		        }

		        $("#maUsernameException").text("");
		        
		        if($('#maImgCodeDiv').css('display') == "block"){
		        		var code = $("#maImgCode").val();
				        code = $.trim(code);
				        if(code == "请输入图中文字"){
				        	 $("#maImgCodeException").text("图形验证码不能为空");
				        	 $("#maImg").click();
				        	 return;
				        }
				        var coder = /^[\w]+$/;
				        if(!coder.test(code)){
				            $("#maImgCodeException").text("请输入正确的图形验证码");
				            $("#maImg").click();
				            return;
				        }
		        }
		        MAtime();
		        var url = validateUserInfoURL;
		        var jsonData = "";
		        if($('#maImgCodeDiv').css('display') == "block"){
		        	jsonData = {"username":username,"authType":
			            $("#authType").val(),"asDomain":$("#asDomain").val(),
			            "callBackURL":$("#callBackURL").val(),
			            "relayState":$("#relayState").val(),"imageValidateCode":$("#maImgCode").val()};
		        }else{
		        	jsonData = {"username":username,"authType":
			            $("#authType").val(),"asDomain":$("#asDomain").val(),
			            "callBackURL":$("#callBackURL").val(),
			            "relayState":$("#relayState").val()};
		        }
		        
		        $.ajax({
		            url:url,
		            type:"post",
		            timeout: 60000,
		            data:jsonData,
		            beforeSend:function(){
		            	//这里是开始执行方法，显示效果，效果自己写
		                
		            },
		            complete:function(){
		                //方法执行完毕，效果自己可以关闭，或者隐藏效果
		            },
		            success:function(data){
		                //数据加载成功
		            	if(data.resultCode == 101113){

		                    parent.location.href = data.callBackURL+"?SToken="+data.SToken+"&relayState="+data.relayState;

		                }
		                if(data.resultCode == 101112){
		                    $("#maUsernameException").text("移动签名认证失败 ");
		                }
		                if(data.resultCode == 101114){
		                    $("#maUsernameException").text("移动签名认证超时,请重新认证 ");
		                }
			            if(data.resultCode == 101103){
			            	$("#maUsernameException").text("移动签名认证失败 ");
	                        $('#maImgCodeDiv').css({display:"block"});
			                $('#maImgCodeException').text("请输入图形验证码");
			                
			          
	            	    	var username = $.trim($("#maUsername").val());
	            	        if(username == "请输入中国移动手机号码"){
	            		    		username ="";
	            		    	}
	            		    	$("#maImg").attr("src",loginCaptcha+"&username="+username+"&"+Math.random());
			            }
			            if(data.resultCode == 101104){
			                $('#maImgCodeException').text("图形验证码超时,请重新输入");
			                
			                var username = $.trim($("#maUsername").val());
			                if(username == "请输入中国移动手机号码"){
	            	    		username ="";
	            	    	}
	            	    	$("#maImg").attr("src",loginCaptcha+"&username="+username+"&"+Math.random());
			            }
			            if(data.resultCode == 101117){
			                $('#maImgCodeException').text("图形验证码错误,请重新输入");
			                
			                var username = $.trim($("#maUsername").val());
			                if(username == "请输入中国移动手机号码"){
	            	    		username ="";
	            	    	}
	            	    	$("#maImg").attr("src",loginCaptcha+"&username="+username+"&"+Math.random());
			            }
			            if(data.resultCode == 101106){
	                        parent.location.href = data.callBackURL+"?SToken="+data.SToken+"&relayState="+data.relayState;

	                    }
	                    if(data.resultCode == 101107){
	                        $("#maUsernameException").text("sim卡认证失败 ");
	                    }
	                    if(data.resultCode == 101108){
	                        $("#maUsernameException").text("sim卡认证超时,请重新认证 ");

	                    }
	                    if(data.resultCode == 101118){
	                        $("#maUsernameException").text("您的手机暂不支持一键登录 ");

	                    }

		            },
		            error:function(data,error){
		              //数据加载失败
		            	 if(error == "timeout"){
							  $("#maUsernameException").text("请求超时,请稍后重试!");
						  }else{
							  $("#maUsernameException").text("请求失败,请稍后重试!");
						  }
		           }
		        });
	    	 }else{
	    		 if(login !="登录"){
			    		return;
			    	}
			    	
			    	$("#upUsernameException").text("");
			    	$("#passwordException").text("");
			    	$("#loginImgCodeException").text("");
			    	$("#DSImgCodeException").text("");
		    		$("#authType").val("UPDS");
		    		var username = $("#upUsername").val();
			        username = $.trim(username);
			        if(username == "请输入手机号/邮箱"){
			        	$("#upUsernameException").text("手机号/邮箱不能为空");
			            return;
			        }
			        var number = /^[0-9]+$/;
			        if(number.test(username)){
			            var phoneNumber = /^[0-9]{11}$/;
			            if(phoneNumber.test(username)){
			                var mobilePhone = /^(13[0-9]|15[5-9]|15[0-3]|18[5-9]|180|182|147|145)[0-9]{8}$/;
			                if(!mobilePhone.test(username)){
			                    $("#upUsernameException").text("请输入正确的手机号码");
			                    return;
			                }
			            }else{
			                $("#upUsernameException").text("手机号码格式不正确");
			                return;
			            }
			        }else{
			            if(!mailPattern.test(username)){
			                $("#upUsernameException").text("邮箱格式错误，请重新输入");
			                return;
			            }
			        }
			        var pwd = $("#password").val();
			        pwd = $.trim(pwd);
			        if(pwd == ""){
			            $("#passwordException").text("密码/短信验证码不能为空");
			            return;
			        }
			        if(pwd.length>16||pwd.length<6){
			            $("#passwordException").text("密码/短信验证码长度要求6~16位");
			            return;
			        }
			        if($('#LoginImgCodeDiv').css('display') == "block"){
			        	 var code = $("#loginImgCode").val();
					        code = $.trim(code);
					        if(code == "请输入图中文字"){
					        	$("#loginImgCodeException").text("图形验证码不能为空");
					        	$("#loginImg").click();
					        	return;
					        }
					        var coder = /^[\w]+$/;
					        if(!coder.test(code)){
					            $("#loginImgCodeException").text("请输入正确的图形验证码");
					            $("#loginImg").click();
					            return;
					        }
		        }
			       
			        var url = validateUserInfoURL;
			        var password = $("#password").val();
			        var username = $("#upUsername").val();

			        password = hex_sha1(username+":"+password);

	                var jsonData = "";	
			        if($('#LoginImgCodeDiv').css('display') == "block"){
			        	jsonData = {"username":username,"password":password,"authType":
				            $("#authType").val(),"asDomain":$("#asDomain").val(),
				            "callBackURL":$("#callBackURL").val(),
				            "relayState":$("#relayState").val(),
		                    "imageValidateCode":$("#loginImgCode").val(),
		                    "operationType":1};
			        }else{
			        	 jsonData = {"username":username,"password":password,"authType":
					            $("#authType").val(),"asDomain":$("#asDomain").val(),
					            "callBackURL":$("#callBackURL").val(),
					            "relayState":$("#relayState").val(),
			                    "operationType":1};
			        }
			       
			        $.ajax({
			            url:url,
			            type:"post",
			            timeout: 30000,
			            data:jsonData,
			            beforeSend:function(){
			            	//这里是开始执行方法，显示效果，效果自己写
			               clearInterval(loadingFuction);
			               loadingFuction = setInterval(loading,300);
			                
			            },
			            complete:function(){
			                //方法执行完毕，效果自己可以关闭，或者隐藏效果
			            	clearInterval(loadingFuction);
			            	$("#normal").val("登录");
			                login = "登录";
			            },
			            success:function(data){
			                //数据加载成功
			            		if(data.resultCode == 101000){
					                parent.location.href = data.callBackURL+"?SToken="+data.SToken+"&relayState="+data.relayState;
					            }
			                    if(data.resultCode == 101109){
			                        parent.location.href = data.callBackURL+"?SToken="+data.SToken+"&relayState="+data.relayState;
			                    }
					            if(data.resultCode == 101101){
					                $("#upUsernameException").text("用户名或密码错误,请重新输入");
					                if($('#LoginImgCodeDiv').css('display') == "block"){
					                	
					                	var username = $.trim($("#upUsername").val());
					                    if(username == "请输入手机号/邮箱"){
					           	    		username ="";
					           	    	}
					           	    	$("#loginImg").attr("src",loginCaptcha+"&username="+username+"&"+Math.random());
					                }
					            }
					            if(data.resultCode == 101103){
					            	$("#upUsernameException").text("用户名或密码错误,请重新输入");
					                $('#loginImgCodeException').text("请输入图形验证码");
					                $('#LoginImgCodeDiv').css({display:"block"});
					                
					                var username = $.trim($("#upUsername").val());
					                if(username == "请输入手机号/邮箱"){
					       	    		username ="";
					       	    	}
					       	    	$("#loginImg").attr("src",loginCaptcha+"&username="+username+"&"+Math.random());
					            }
					            if(data.resultCode == 101104){
					                $('#loginImgCodeException').text("图形验证码超时,请重新输入");
					                
					                var username = $.trim($("#upUsername").val());
					                if(username == "请输入手机号/邮箱"){
					       	    		username ="";
					       	    	}
					       	    	$("#loginImg").attr("src",loginCaptcha+"&username="+username+"&"+Math.random());
					            }
					            if(data.resultCode == 101117){
					                $('#loginImgCodeException').text("图形验证码错误,请重新输入");
					                
					                var username = $.trim($("#upUsername").val());
					                if(username == "请输入手机号/邮箱"){
					       	    		username ="";
					       	    	}
					       	    	$("#loginImg").attr("src",loginCaptcha+"&username="+username+"&"+Math.random());
					            }
					            if(data.resultCode == 101102){
					                $("#upUsernameException").text("认证次数过多,请重新获取动态短信 ");
					            }
					            if(data.resultCode == 101110){
					                $("#upUsernameException").text("动态短信认证失败，请输入正确的短信验证码 ");
					            }
					            if(data.resultCode == 101111){
					                $("#upUsernameException").text("动态短信认证超时,请重新获取短信验证码");
					            }

			            },
			            error:function(data,error){
			              //数据加载失败
			            	 if(error == "timeout"){
								  $("#upUsernameException").text("请求超时,请稍后重试!");
							  }else{
								  $("#upUsernameException").text("请求失败,请稍后重试!");
							  }
			           }
			        });
	    	 }
	      }
	    };
	 });
});
