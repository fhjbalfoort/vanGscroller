(function( $ ) {
	var _plugin = this;
	_plugin.options = {
		divs :{
			content : '.content',
			scroll_bar  : 'scrollbar',
			scroll_grab : 'scrollgrab'
		},
		update: true
	};
	_plugin.update = [];
	setInterval(function(){
		for(var i in _plugin.update ){
			if(_plugin.update[i].currentScrollHeight != $('> '+_plugin.update[i].options.divs.content, _plugin.update[i]).prop('scrollHeight')){
				_plugin.update[i].currentScrollHeight  = $('> '+_plugin.update[i].options.divs.content, _plugin.update[i]).prop('scrollHeight');
				_plugin.setScroll(_plugin.update[i]);
			}
		}
	}, 400);
	_plugin.setScroll = function(self){
		if($( '> '+ self.options.divs.content, self).outerHeight() < self.currentScrollHeight){
			var scrollPor = $( '> '+self.options.divs.content, self).outerHeight() /  self.currentScrollHeight;
			var scrollbarHeight = Math.round( $('> ' + self.options.divs.content , self).height()  * ($('> ' + self.options.divs.content, self).outerHeight() /  self.currentScrollHeight) ) ;
			$('> .' + self.options.divs.scroll_bar,self).show().find('> .' + self.options.divs.scroll_grab).height( scrollbarHeight + 'px');



			$('> .' + self.options.divs.scroll_bar + ' > .' + self.options.divs.scroll_grab, self).unbind('drag').drag(function( ev, dd ){
				if(dd.offsetY >= dd.startY-2 && dd.offsetY-dd.startY <= ($('> ' + self.options.divs.content , self).outerHeight()  )){
					$('> ' + self.options.divs.content , self).scrollTop((dd.offsetY-dd.startY)/scrollPor);
				}
			});


			$('> .' + self.options.divs.scroll_bar + ' > .' + self.options.divs.scroll_grab,self).css('top', Math.round( $(self.options.divs.content, self).scrollTop() * scrollPor)+'px');
			$('> ' + self.options.divs.content, self).unbind('scroll').scroll(
				function(){
					$('> .' + self.options.divs.scroll_bar + ' > .' + self.options.divs.scroll_grab,self).css('top', Math.round( $(this).scrollTop() * scrollPor)+'px');
				});
		} else {
			$('> .' + self.options.divs.scroll_bar, self).hide();

		}
	}
		
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