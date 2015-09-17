// JavaScript Document
//changeImg

$(document).ready(function(){
	var curLi;
	var aImg=$('.mode1-password').find('li.pass-img a'),
	change_img = function (self, src) {
		self.find('img').attr('src', src);
	};
	aImg.hover(function(){
			var self = $(this),
			src = 'images/' + self.data('hover') + '.png';
		},function(){
			var self = $(this),
			src = 'images/' + self.data('leave') + '.png';
			if (!self.data('type')) {
				change_img(self, src);
			} else {
				self.hover(function(){
					src = 'images/' + self.data('hover') + '.png';
					change_img(self, src);
					},function(){
					if(self.data('type')){
						src = 'images/' + self.data('click') + '.png';
						change_img(self, src);
					}else{
						src = 'images/' + self.data('leave') + '.png';
						change_img(self, src);
					}
				});
			}
	});
	aImg.click(function(){
		i = 0, l = aImg.length;
		for (; i < l; i += 1) {
			var self = aImg.eq(i),
			src = 'images/' + self.data('leave') + '.png';
			change_img(self, src);
			self.data('type', 0);
		}
		var self = $(this),
		src = 'images/' + self.data('click') + '.png';
		change_img(self, src);
		$(this).data('type', 1);
		
		curLi=$(this);
		$(".bs-block").removeClass("bs-block");
		$("#content .mode1-password").eq($(aImg).index(curLi)).addClass("bs-block");
		$('em').remove();
		$(this).after("<em>");
	});
	
});
