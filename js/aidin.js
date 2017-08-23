var CurrentAddText = false;



var cntrlIsPressed = false;

		$(document).keydown(function(event){
			if(event.which=="17")
			cntrlIsPressed = true;
			if((event.which=="46" || event.which=="8") && $('.selectedItem').attr('contenteditable') != "true")
			$('.selectedItem').remove();
		});
		$(document).keyup(function(){
			cntrlIsPressed = false;
		});

		function AddText(enable){
			if(enable == true){
				var left1 = 0;
				var left2 = 0;
				var top1 = 0;
				var top2 = 0;
				var id = "TextDiv" + ($('.TextDiv').size()+1);
				var parentOffset = $('.slide').offset(); 
				var Q = ($('body').width()-$('.slide').offset().left)/$('.slide').width();
				$('.slide').on("mousedown", function(e) {
					if (e.which == 1) {
						left1 = e.pageX - parentOffset.left + $(window).scrollLeft();
						top1 = e.pageY - parentOffset.top + $(window).scrollTop();
					}
				});
				$('.slide').on("mousemove", function(e) {
					
					if (e.which == 1) {
						left2 = e.pageX - parentOffset.left + $(window).scrollLeft();
						top2 = e.pageY - parentOffset.top + $(window).scrollTop();
						$('#holder').css({'top' : top1*Q, 'left': left1*Q, height: (top2-top1)*Q,width: (left2-left1)*Q,'position':'fixed','display':'block'});
					}
				});
				
				$('.slide').on("mouseup", function(e) {
					if (e.which == 1) {					
						$('<div/>').css({'top' : top1*Q, 'left': left1*Q, height: (top2-top1)*Q,width: (left2-left1)*Q}).
						addClass('TextDiv').attr({'id':id}).text('Text Field').appendTo('.slide');
						
						$('#'+id).click(function(){
							if(cntrlIsPressed || $(this).attr('contenteditable') == 'true'){
								$(this).attr({'contenteditable':'true'});
							}
							else if($(this).hasClass('selectedItem')){
								$(this).removeClass('selectedItem');
							}
							else{
								$(this).addClass('selectedItem');
								$(this).attr({'contenteditable':'false'});
							}
						});
						
						$('#'+id).focusout(function(){
							$(this).removeClass('selectedItem');
							$(this).attr({'contenteditable':'false'});
						});
						
						
						$('#holder').css({'display':'none'});
					}
				});
			}
			else{
				$('.slide').unbind('mouseup mousemove mousedown');
			}
			
		}

