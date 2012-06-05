(function( $ ) {
	var _plugin = $.extend(this,  {
		update : [],
		options : {
			divs :{
				content : '.content',
				scroll_bar  : 'scrollbar',
				scroll_grab : 'scrollgrab'
			},
			update: true
		},
		setScroll : function(self){
			if($( '> '+ self.options.divs.content, self).outerHeight() < self.currentScrollHeight){
				var scrollPercent = $( '> '+self.options.divs.content, self).outerHeight() /  self.currentScrollHeight;
				var scrollbarHeight = Math.round( $('> ' + self.options.divs.content , self).height()  * scrollPercent) ;
				$('> .' + self.options.divs.scroll_bar,self).show().find('> .' + self.options.divs.scroll_grab).height( scrollbarHeight + 'px');

				if($.fn.drag){
					$('> .' + self.options.divs.scroll_bar + ' > .' + self.options.divs.scroll_grab, self).unbind('drag').drag(function( ev, dd ){
						$('> ' + self.options.divs.content , self).scrollTop(dd.offsetY/scrollPercent);
					});
				}

				$('> .' + self.options.divs.scroll_bar + ' > .' + self.options.divs.scroll_grab,self).css('top', Math.round( $(self.options.divs.content, self).scrollTop() * scrollPercent)+'px');
				$('> ' + self.options.divs.content, self).unbind('scroll').scroll(
					function(){
						$('> .' + self.options.divs.scroll_bar + ' > .' + self.options.divs.scroll_grab,self).css('top', Math.round( $(this).scrollTop() * scrollPercent)+'px');
					});
			} else {
				$('> .' + self.options.divs.scroll_bar, self).hide();
			}
		}
	});

	setInterval(function(){
		for(var i in _plugin.update ){
			if(_plugin.update[i].currentScrollHeight != $('> '+_plugin.update[i].options.divs.content, _plugin.update[i]).prop('scrollHeight')){
				_plugin.update[i].currentScrollHeight  = $('> '+_plugin.update[i].options.divs.content, _plugin.update[i]).prop('scrollHeight');
				_plugin.setScroll(_plugin.update[i]);
			}
		}
	}, 400);
		
	$.fn.vanG = function() {
		return this.each(function(defaults) {
			var self = this;
			self.options = $.extend(_plugin.options, defaults);
			self.currentScrollHeight = $('> '+self.options.divs.content, this).prop('scrollHeight');
			$(this).append('<div class="'+self.options.divs.scroll_bar+'"><div class="'+self.options.divs.scroll_grab+'"></div></div>' );

			_plugin.setScroll (self);
			_plugin.update.push(self)
		});
	};
})( jQuery );