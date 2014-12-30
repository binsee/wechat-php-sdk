//http://stackoverflow.com/questions/6658517/window-resize-in-jquery-firing-multiple-times
(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null; 
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100); 
      };
  }
    // smartresize 
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

(function($){

  var myWidth = 0;
  function getSize(){
    if( typeof( window.innerWidth ) == 'number' ) {
      myWidth = window.innerWidth;
    } else if( document.documentElement && document.documentElement.clientWidth) {
      myWidth = document.documentElement.clientWidth;
    };
  };
  var m = $('#main'),
      s = $('#asidepart'),
	  t = $('.toc-aside'),
	  a = $('.toc-article h2'),
	  tl = $('.toc-article li'),
	  to = $('.toc-article ol'),
	  ta = $('.toc-article'),
      i = $('.icon-toc-toggle');
		
  // $(window).resize(function(){
  $(window).smartresize(function(){
    getSize(); 
    if (myWidth < 768) {
      m.removeClass('moveMain');
      s.css('display', 'block').removeClass('fadeOut');
      // t.css('display', 'none');
	  /*
      <% if( is_post()&&(page.toc !== false) && theme.toc.aside){ %>
      $('#toc.toc-aside').css('display', 'none');
      <% } %>  
	  */
    } else {
		t.css('display', 'none');
	}
  });
  //点击显示文章目录
  a.click(function(){
	// document.getElementById('toc-child').style.display=(document.getElementById('toc-child').style.display =='none')?'':'none';
	
	if (to.css('display') == 'none') {
		if (tl.length>10) {
			//ta.css('margin', '1.6em 0').css('width', '100%');
		}
		to.css('display', 'block');
	} else {
		if (tl.length>10) {
			//ta.css('width', 'auto').css('margin', '2em 0 1em 1em');
		}
		to.css('display', 'none');
	}
  });
  i.click(function(){
	getSize();
    if (myWidth < 768) {
		if (t.css('display') == 'none') {
			t.css('display', 'block').removeClass('fadeIn');
		} else {
			t.css('display', 'none').addClass('fadeIn');
		}
	} else {
		if (s.css('display') == 'none') {
			t.css('display', 'none').removeClass('fadeIn');
			s.css('display', 'block').removeClass('fadeOut').addClass('fadeIn');
		} else {
			t.css('display', 'block').addClass('fadeIn');
			s.addClass('fadeOut').css('display', 'none').removeClass('fadeOut');
		}
		m.toggleClass('moveMain');
	}

  });
  $(window).scroll(function(){
    t.css("top",Math.max(80,360-$(this).scrollTop()));
  });
})(jQuery);

$(document).ready(function(){ 
  var t  = $('#toc'),
	  i  = $('.icon-toc-toggle'),
      ah = $('#toc li');
      tl = $('.toc-article li')
      to = $('.toc-article ol')
  if(ah.length==0){
    t.css('display','none');
    i.css('display','none');
  }

//文章中的文章目录太长，隐藏
  if (tl.length > 10) {
	  to.css('display', 'none')
  }

});
