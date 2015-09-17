// JavaScript Document
$(document).ready(function() {
	$('.modal').click(function(even){
		event.stopPropagation();
	});
	$('.modal-dialog').css({   //弹窗层
	
		left	:	($(window).innerWidth() - $('.modal-dialog').outerWidth()) / 2,
		top		:	($(window).innerHeight() - $('.modal-dialog').outerHeight()) / 2
	});
	
	$(window).on('resize', function() {
		$('.modal-dialog').css({
			left	:	($(window).innerWidth() - $('.modal-dialog').outerWidth()) / 2 + $(document).scrollLeft(),
			top		:	($(window).innerHeight() - $('.modal-dialog').outerHeight()) / 2 + $(document).scrollTop()
		});
	});
 
    //each遍历文本框
 
    $("input[type='text'],input[type='password']").each(function() {
 
        //保存当前文本框的值
 
        var vdefault = this.value;
        $(this).addClass("col-c4c4c4");
        $(this).focus(function() {
 
            //获得焦点时，如果值为默认值，则设置为空
 
            if (this.value == vdefault) {
            	$(this).removeClass("col-c4c4c4");
                this.value = "";
 
            }
 
        });
 
        $(this).blur(function() {
 
            //失去焦点时，如果值为空，则设置为默认值
 
            if (this.value == "") {
            	$(this).addClass("col-c4c4c4");
                this.value = vdefault;
 
            }
 
        });
 
    });
	
	$("input[type='text'],input[type='password']").focus(function(){
		$(this).prevAll('.text-title').hide();
		})
	$("input[type='text'],input[type='password']").blur(function(){
		if($(this).val() ==""){
			$(this).prevAll('.text-title').show();
			
		}else{
			$(this).prevAll('.text-title').hide();
		}
		
	})
	
	/*----------------------------------------------------------------*/
	$('.text-border').click(function(event){
		$(this).parents('.mode1 li').css('overflow','inherit');
		if($(this).next('a').hasClass('down')){
			
		  $(this).next('a.down').removeClass('down').addClass('up');
		  $(this).nextAll('.drop-down-menu').show();
		  
		}else{
		  $(this).next('a.up').removeClass('up').addClass('down');
		  $(this).nextAll('ul.drop-down-menu').hide();
		}
		event.stopPropagation();
	})
	/*----------------------------------------------------------------*/
	$('.down').click(function(event){
		$(this).parents('.mode1 li').css('overflow','inherit');
		if($(this).hasClass('down')){
		  $(this).removeClass('down').addClass('up');
		  $(this).nextAll('.drop-down-menu').show();
		}else{
		  $(this).removeClass('up').addClass('down');
		  $(this).nextAll('ul.drop-down-menu').hide();
		}
		event.stopPropagation();
	})
	/*----------------------------------------------------------------*/
	$(document).click(function(){
		$('.drop-down-menu').hide();
		$('.up').removeClass('up').addClass('down');	
	})
	$('ul.drop-down-menu li').click(function(){
		
		$(this).parent().prevAll('span.text-border').text($(this).text());
		$(this).prevAll('span.text-border').hide();
		$(this).parent().hide();
		$('span.up').removeClass('up').addClass('down');
	})
	/*-----------------------------------------------------------*/
//	$('#list-2 p').hover(function(){
//		var mode=$(this).next('.mode1');
//		var Input=$(this).find('input');
//		$(this).css('background','#edf8fb')	;
//		if(mode.css('display')=='block'){
//			Input.addClass('in').val('收起');
//		}else{
//			Input.addClass('in').val('展开');	
//		}
//	},function(){
//		var mode=$(this).next('.mode1');
//		var Input=$(this).find('input');
//		if(mode.css('display')=='block'){
//			$(this).css('background','#edf8fb');
//			Input.addClass('in');
//		}else{
//			$(this).css('background','#fff');
//			Input.removeClass('in');	
//		}
//	})
//	
//	$('#list-2 p').find('.btn').click(function(){
//		var mode=$(this).parent().next('.mode1');
//		if(mode.css('display')=='none'){
//			mode.show();
//		}else{
//			mode.hide();	
//		}
//		if($(this).val()=='展开'){
//			$(this).val('收起')
//		}else{
//			$(this).val('展开')	
//		}	
//		
//	})
//	
	
	
	function keyevent(id){
		var index=0;
		var search_show = $(id);
		var len=search_show.find('li').length;
		var li0_top=$(search_show).find('li').eq(0).offset();
		var ulHeight = search_show.height();
		
		//$(search_show).find('li:first').css("background", "#00b5e5");
		 $(search_show).find('li').mouseover(function(){
					index=$(this).index();
					$(search_show).find('li').eq(index).css({"background":"#00b5e5","color":"#fff"}).siblings().css({"background":"","color":"#000"});
						 })
		
		$(document).keydown(function(event){ 
		    var key = event.keyCode;   
			//alert(li_top.top)
			if(search_show.is(':visible')){  
					 var key=event.which;  
					$(search_show).find('li').eq(index).css({"background":"none"});
					var li_top=$(search_show).find('li').eq(index).offset();
					//alert(li_top.top)
					 if (key == 38) { /*向上按钮*/  
						if (index == 0) {
							index=len-1; //到顶了， 
							
						}else{
							index--; 
						}   
					} else if (key == 40) {/*向下按钮*/  
						if (index == len-1) {
							index=0; //到底了 
							$(search_show).scrollTop(0);
						}else{
							index++;
							if(li_top.top > 513){
								//alert(11)
							var ultop=$(search_show).scrollTop();
								ultop += 40;
								$(search_show).scrollTop(ultop);
								}	
						}   
					}else if(key == 13){ 
							search_show.siblings('.text-border').text(search_show.find('li').eq(index).text());
							search_show.css('display','none');
//alert(search_show.find('li').eq(index).text())
						//Search()        //回车搜索
					}   
					var li = search_show.find("li:eq(" + index + ")");   
					li.css({"background":"#00b5e5","color":"#fff"}).siblings().css({"background":"","color":"#000"});  
					return false;
			}
	  })	 
	}
	keyevent('#Yaer');
	keyevent('#Month');	
	
	
	
	
});



