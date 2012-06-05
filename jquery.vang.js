(function( $ ) {
	var _plugin = $.extend(this,  {
		update : [],
		options : {
			divs :{
				content : '.content',
				scroll_bar  : 'scrollbar',
				scroll_grab : 'scrollgrab'
			},
			update_time : 400
			
		},
		set_scroll : function(self){
			if($( '> '+ self.options.divs.content, self).outerHeight() < self.currentScrollHeight){
				var scrollPercent = $( '> '+self.options.divs.content, self).outerHeight() /  self.currentScrollHeight;
				var scrollbarHeight = Math.round( $('> ' + self.options.divs.content , self).height()  * scrollPercent) ;
				$('> .' + self.options.divs.scroll_bar,self).show().find('> .' + self.options.divs.scroll_grab).height( scrollbarHeight + 'px');

				self.lastMoves = [];
				$('> ' + self.options.divs.content, self).bind("touchmove", function(e){
					self.lastMoves.push( e.originalEvent);
				

				});
				$('> ' + self.options.divs.content, self).bind("touchend", function(e){
					
					if(self.lastMoves.length >= 2){
						if(Math.abs(self.lastMoves.pop().pageY - self.lastMoves.pop().pageY) >= 2){
							$('> .' + self.options.divs.scroll_bar + ' > .' + self.options.divs.scroll_grab,self).css({
								opacity: 0
							});
						}
					} else {
						$('> .' + self.options.divs.scroll_bar + ' > .' + self.options.divs.scroll_grab,self).css({
							opacity: 1
						});
					}
					self.lastMoves = [];
				});



				

	
				if($.fn.drag){
					$('> .' + self.options.divs.scroll_bar + ' > .' + self.options.divs.scroll_grab, self).unbind('drag').drag(function( ev, dd ){
						$('> ' + self.options.divs.content , self).scrollTop(dd.offsetY/scrollPercent);
					});
				}

				$('> .' + self.options.divs.scroll_bar + ' > .' + self.options.divs.scroll_grab,self).css('top', Math.round( $(self.options.divs.content, self).scrollTop() * scrollPercent)+'px');
				$('> ' + self.options.divs.content, self).unbind('scroll').scroll(
					function(){
						$('> .' + self.options.divs.scroll_bar + ' > .' + self.options.divs.scroll_grab,self).css({
							opacity: 1
						});
						$('> .' + self.options.divs.scroll_bar + ' > .' + self.options.divs.scroll_grab,self).css('top', Math.round( $(this).scrollTop() * scrollPercent)+'px');
					});
			} else {
				$('> .' + self.options.divs.scroll_bar, self).hide();
			}
		},
		add_to_update : function(item){
			_plugin.update.push(item);
			_plugin.start_update();
		},
		start_update : function(){
			if(!_plugin.interval_id){
				_plugin.interval_id = setInterval(function(){
					for(var i in _plugin.update ){
						if(_plugin.update[i].currentScrollHeight != $('> '+_plugin.update[i].options.divs.content, _plugin.update[i]).prop('scrollHeight')){
							_plugin.update[i].currentScrollHeight  = $('> '+_plugin.update[i].options.divs.content, _plugin.update[i]).prop('scrollHeight');
							_plugin.set_scroll(_plugin.update[i]);
						}
					}
				}, _plugin.options.update_time);
			}
		}, 
		interval_id : false
	});
	
	$.fn.vanG = function() {
		return this.each(function(defaults) {
			var self = this;
			if(!self.hasScroll){
				self.hasScroll = true;
				self.options = $.extend(_plugin.options, defaults);
				self.currentScrollHeight = $('> '+self.options.divs.content, self).prop('scrollHeight');
				$(self).append('<div class="'+self.options.divs.scroll_bar+'"><div class="'+self.options.divs.scroll_grab+'"></div></div>' );
				_plugin.set_scroll (self);
				_plugin.add_to_update(self);
			}
		});
	};
})( jQuery );