/*
 * Project: Twitter Bootstrap Hover Dropdown
 * Author: Cameron Spear
 * Contributors: Mattia Larentis
 *
 * Dependencies?: Twitter Bootstrap's Dropdown plugin
 *
 * A simple plugin to enable twitter bootstrap dropdowns to active on hover and provide a nice user experience.
 *
 * No license, do what you want. I'd love credit or a shoutout, though.
 *
 * http://cameronspear.com/blog/twitter-bootstrap-dropdown-on-hover-plugin/
 */
;(function($, window, undefined) {
    
    // outside the scope of the jQuery plugin to
    // keep track of all dropdowns
    var $allDropdowns = $();

    // if instantlyCloseOthers is true, then it will instantly
    // shut other nav items when a new one is hovered over
    $.fn.dropdownHover = function(options) {

        // the element we really care about
        // is the dropdown-toggle's parent
        $allDropdowns = $allDropdowns.add(this.parent());

        return this.each(function() {
            var $this = $(this),
                $parent = $this.parent(),
                defaults = {
                    delay: 500,
                    instantlyCloseOthers: true
                },
                data = {
                    delay: $(this).data('delay'),
                    instantlyCloseOthers: $(this).data('close-others')
                },
                settings = $.extend(true, {}, defaults, options, data),
                timeout;

            $parent.hover(function(event) {
                // so a neighbor can't open the dropdown
                if(!$parent.hasClass('open') && !$this.is(event.target)) {
                    return true;
                }

                if(settings.instantlyCloseOthers === true)
                    $allDropdowns.removeClass('open');

                window.clearTimeout(timeout);
                $parent.addClass('open');
            }, function() {
                timeout = window.setTimeout(function() {
                    $parent.removeClass('open');
                }, settings.delay);
            });

            // this helps with button groups!
            $this.hover(function() {
                if(settings.instantlyCloseOthers === true)
                    $allDropdowns.removeClass('open');

                window.clearTimeout(timeout);
                $parent.addClass('open');
            });

            // handle submenus
            $parent.find('.dropdown-submenu').each(function(){
                var $this = $(this);
                var subTimeout;
                $this.hover(function() {
                    window.clearTimeout(subTimeout);
                    $this.children('.dropdown-menu').show();
                    // always close submenu siblings instantly
                    $this.siblings().children('.dropdown-menu').hide();
                }, function() {
                    var $submenu = $this.children('.dropdown-menu');
                    subTimeout = window.setTimeout(function() {
                        $submenu.hide();
                    }, settings.delay);
                });
            });
        });
    };

    $(document).ready(function() {
        // apply dropdownHover to all elements with the data-hover="dropdown" attribute
        $('[data-hover="dropdown"]').dropdownHover();
    });
})(jQuery, this);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

window.roledata = {};

var profilebar_interactive = false;

$('.rolemenus a:not(#savetoprofile):not(.mobileopen)').click(function() {

	$(this).closest('.dropdown-menu').prevAll('button').html($(this).html() + ' <span class="caret"></span>').addClass('role-filledin');
	window.roledata[$(this).data('name')] = $(this).data('value');
	if(profilebar_interactive) { window.user_search = null; $('#savetoprofile').css('display','inline-block').text('Search'); }
	
	if($(this).data('name') == 'roles') {
		$('.rolemenus button.dropdown-toggle:eq(1)').toggleClass('disabled', $(this).data('value') == '3' );
		//$('.gradebuttons .btn, #band1, #band2, #band3').toggleClass('disabled', $(this).data('value') == '3' );
		if(window.roledata.roles != 3 && window.roledata.subjects) {
			$('.rolemenus .btn-group:eq(1) a[data-value="'+window.roledata.subjects+'"]').click();
		}
	}
	
	if(window.roledata.subjects == 2 && window.roledata.roles && window.roledata.roles == 1) {
		$('.gradebuttons button:eq(9)').text('HS');
		$('.gradebuttons button:gt(9)').css('visibility', 'hidden');
	}
	else {
		$('.gradebuttons button:eq(9)').text('9');
		$('.gradebuttons button:gt(9)').css('visibility', 'visible');
		
	}

	if(window.roledata.roles == 3) {
	 	$('.rolemenus button.dropdown-toggle:eq(1)').html('All Subjects <span class="caret"></span>');
	 	//$('.gradebuttons .btn').addClass('active');
	 	formatGrades();
	}
	
	if($('#role-submit').hasClass('disabled') && roledata.roles && roledata.subjects) {
		$('#role-submit').removeClass('disabled').click();
	}

	$(this).attr('href', 'javascript:void()');
});

function getRanges(array) {
  var ranges = [], rstart, rend;
  for (var i = 0; i < array.length; i++) {
    rstart = array[i];
    rend = rstart;
    while (array[i + 1] - array[i] == 1) {
      rend = array[i + 1]; // increment the index if the numbers sequential
      i++;
    }
    ranges.push(rstart == rend ? rstart+'' : rstart + '-' + rend);
  }
  return ranges;
}

function formatGrades() {
	setTimeout(function() {
		var str = getRanges( $('.gradebuttons .active').map(function() { return $(this).index() }).get() ).join(', ');
		str = str.split('');
		if(str[0] === '0') str[0] = 'K';
		var pl = str.length>1 ? 's ':' ';
		if(str.join('') == '10' || str.join('') == '11' || str.join('') == '12') pl=' ';
		str = str.join('') +  ' <span class="caret"></span>';
		var grd = 'Grade'+pl+ str; 
		if(roledata.subjects==2) { grd = grd.replace(/(Grades [K\d]+)-12/, '$1-High School').replace('Grades 9-High School', 'High School').replace('9-12','HS').replace('-12', '-HS'); } 
		$('.gradebuttons').closest('.dropdown-menu').prevAll('button').html(grd.replace('-','&ndash;'));
		//$('.gradebuttons').closest('.dropdown-menu').prevAll('button').html('Grade'+pl+ str);
	}, 10);
	if(profilebar_interactive) { window.user_search = null; $('#savetoprofile').css('display','inline-block').text('Search'); }
}


$("#band1").click(function() {
	//if(window.roledata && window.roledata.roles == 3) return;
	$('.gradebuttons button:lt(6)').addClass('active')
	$('.gradebuttons button:gt(5), #band2, #band3').removeClass('active');
	formatGrades();
});
$("#band2").click(function() {
	//if(window.roledata && window.roledata.roles == 3) return;
	$('.gradebuttons button:lt(6), .gradebuttons button:gt(8), #band2, #band3').removeClass('active')
	$('.gradebuttons button:gt(5):lt(3)').addClass('active');
	formatGrades();
});
$("#band3").click(function() {
	//if(window.roledata && window.roledata.roles == 3) return;
	$('.gradebuttons button:gt(8)').addClass('active')
	$('.gradebuttons button:lt(9), #band2, #band3').removeClass('active');
	formatGrades();
});

$(".gradebuttons button").click(function() {
	$('#band1, #band2, #band3').parent().removeClass('active');
	formatGrades();
});

function profilebar_response(data) {
	$('#savetoprofile').removeClass('disabled').text('Search Saved');
	setTimeout(function() {
		$('#savetoprofile').fadeOut(300);
	}, 5000);
}

$('#role-submit, #savetoprofile').click(function() {
	if(window.user_search && user_search.needsave) {
		if(user_search.loggedout) {
			location.href = site.root_uri + '/login';
			return false;	
		}
		$('#savetoprofile').text('Saving...').addClass('disabled');
		
		$.post( site.root_uri + '/saveprofilebar/' + [roledata.roles, roledata.subjects].join('/') + '/' + $('.gradebuttons .active').map(function() { return $(this).index() }).get().join('/') , null, profilebar_response, "json" );
		
		return false;	
	}
	
	if(!roledata.roles) { $('#role-submit').css('text-transform','none').text('Please choose your position.'); $('#role-submit').addClass('disabled'); return false; }
	if(roledata.roles == 3 && !roledata.subjects) roledata.subjects = 1;
	if(!roledata.subjects) { $('#role-submit').css('text-transform','none').text('Please choose your subject.'); $('#role-submit').addClass('disabled'); return false; }
	if(!$('.gradebuttons .active').size()) { $('#role-submit').css('text-transform','none').text('Please choose at least one grade.'); return false;  }
	
	var track = 300;
	if(roledata.roles==3) track=408;
	location.href = site.root_uri + '/dashboard/'+track+'/search/' + [roledata.roles, roledata.subjects].join('/') + '/' + $('.gradebuttons .active').map(function() { return $(this).index() }).get().join('/');
});

if(window.user_search) {
	$.each(user_search.grades, function(idx,g) { $('.gradebuttons button').eq(g).click()});

	$('.rolemenus .btn-group:eq(0) a[data-value="'+user_search.roles+'"]').click();
	if(user_search.roles==6) { roledata.roles=6; if(!user_search.loggedout) $('#savetoprofile').hide(); }
	$('.rolemenus .btn-group:eq(1) a[data-value="'+user_search.subjects+'"]').click();
	
	if(!user_search.needsave) { $('#savetoprofile').hide(); $('.rolemenus .viewing').hide(); }
}
profilebar_interactive = true;

$('.gradebuttons').one('click',function() { if($('.gradebuttons .btn.active').size() == 12) { var chosen=$('.gradebuttons .btn:not(.active)'); $('.gradebuttons .btn.active').removeClass('active'); chosen.addClass('active'); }})
$('.gradebuttons .btn:gt(8)').click(function(){ if(roledata.roles==1 && roledata.subjects==2 && !window.gradelink) { window.gradelink=true; $('.gradebuttons .btn:gt(8)').not(this).click(); gradelink=false; }})


// homepage 
$('.dropdown-stayopen').click(function(event) { event.stopPropagation(); return true; })
$('.dropdown-stayopen .btn').click(function(){ $(this).button('toggle') });


// login/reg

function form_response(data) {
	if(data.success && data.location) {
		if(data.location == site.root_uri+"/" && document.referrer)
			location.href = document.referrer;
		else
			location.href = data.location;
		return;
	}
	
	$(data.formid + ' a.btn-go').removeClass('disabled');
	$(data.formid + ' .errors').remove();
	$(data.formid + ' .has-error').removeClass('has-error');
	
	for(var i in data.errors) {
		$(data.formid + ' #' + data.errors[i].id ).parent().prepend('<p class="errors">' + data.errors[i].message + '</p>');
		$(data.formid + ' #' + data.errors[i].id ).parent().addClass('has-error');
	}
}

$('#login-submit').click(function() {
	$(this).addClass('disabled');
	$.post( site.root_uri + '/login', $('#loginform input').serialize(), form_response, "json" );
});

$('#forgotpass-submit').click(function() {
	$(this).addClass('disabled');
	$.post( site.root_uri + '/forgotpass', $('#theform input').serialize(), form_response, "json" );
});

$('#resetpass-submit').click(function() {
	$(this).addClass('disabled');
	$.post( location.href, $('#theform input').serialize(), form_response, "json" );
});

$('#register-submit').click(function() {
	$(this).addClass('disabled');
	$.post( site.root_uri + '/register', $('#registerform input, #registerform select').serialize(), form_response, "json" );
});

$('#profile-submit').click(function() {
	$(this).addClass('disabled');
	$.post( site.root_uri + '/edit-profile', $('#theform input, #theform select').serialize(), form_response, "json" );
});


function bookmark_response(data) {
	if(data.success) $('.bookmark-control').toggleClass('added');
	else location.href = site.root_uri + '/login';
}
$('.bookmark-control').click(function() {
	if($(this).hasClass('added')) {
		$.post( site.root_uri + '/unbookmark/' + $(this).data('page'), null, bookmark_response, "json" );
		_gaq.push(['_trackEvent', 'Bookmarks' , 'Remove', $(this).data('page')]); 
	}
	else {
		$.post( site.root_uri + '/bookmark/' + $(this).data('page'), null, bookmark_response, "json" );
		_gaq.push(['_trackEvent', 'Bookmarks' , 'Add', $(this).data('page')]);
	}
});

$('.stuff-trash').click(function() {
	var t = $(this);
	$.post( site.root_uri + '/unbookmark/' + $(this).data('page'), null, function() { t.closest('.bookmark-cell').hide(200); }, "json" );
	_gaq.push(['_trackEvent', 'Bookmarks' , 'Remove', $(this).data('page')]); 
});

function feedback_modal() {
	$('<div class=modal><div class=modal-dialog><div class=modal-content><div class=modal-header><button type="button" class="close" data-dismiss="modal">&times;</button></div><h2>Feedback</h2><h3>'+$('h2:eq(0)').text()+'</h3><textarea class="form-control"></textarea><a href="#" class="btn btn-go btn-goforward" id="fbsubmit">Submit Feedback</a><a href="#" class="btn btn-go-inverse" data-dismiss="modal">Cancel</a></div></div></div>').modal();

	_gaq.push(['_trackEvent', 'Feedback' , 'Open', location.href]);
	$('#fbsubmit').click(function() {
		_gaq.push(['_trackEvent', 'Feedback' , 'Submit', location.href]);
		$.post( site.root_uri + '/feedback', { 'body': $('.modal textarea').val(), 'title': $('h2:eq(0)').text(), 'uri': location.href  }, function() {}, "json" );
		$('.modal.in').modal('hide'); 
		fbthanks_modal(); 
	});
}

function fbthanks_modal() {
	$('<div class=modal><div class=modal-dialog><div class=modal-content><div class=modal-header><button type="button" class="close" data-dismiss="modal">&times;</button></div><h2>Thank you for your feedback.</h2></div></div></div>').modal();
}

function thanks_modal() {
	$('<div class=modal><div class=modal-dialog><div class=modal-content><div class=modal-header><button type="button" class="close" data-dismiss="modal">&times;</button></div><h2>Thank you for signing up.</h2></div></div></div>').modal();
}
$('.signup button').click(function() {
  $(this).parent().removeClass('has-error');
  $(this).parent().find('p.error').remove();
  if(!/.*@.*[.].*/.test( $('.signup input:eq(0)').val() ) ) {
    $(this).parent().addClass('has-error').prepend('<p class="error">Please enter a valid email address.</p>');
    return false;
  }
  

	$.post( site.root_uri + '/newsletter/' + encodeURIComponent($('.signup input:eq(0)').val()), null, thanks_modal , "json" );
});

$('a[href^="' + site.root_uri + '/"], a[href^="'+ location.protocol + '//' + location.hostname +'"]').click(function() {
	if(/\/file\/./.test($(this).attr('href'))) {
		_gaq.push(['_trackPageview',$(this).attr('href')]);
	}
});

$("a[href^='htt']:not([href*='"+window.location.hostname+"'])").click(function() {
	_gaq.push(['_trackEvent', 'Outbound Links' , $(this).attr('href')]); 
});

$('.detail-sharetools a[href*=twitter], .bookmark-share a[href*=twitter]').click(function() {
	_gaq.push(['_trackEvent', 'Share' , 'Twitter', location.href]); 
});
$('.detail-sharetools a[href*=facebook], .bookmark-share a[href*=facebook]').click(function() {
	_gaq.push(['_trackEvent', 'Share' , 'Facebook', location.href]); 
});
$('.detail-sharetools a[href*=plus], .bookmark-share a[href*=plus]').click(function() {
	_gaq.push(['_trackEvent', 'Share' , 'Google Plus', location.href]); 
});
$('.detail-sharetools a[href*=pinterest], .bookmark-share a[href*=pinterest]').click(function() {
	_gaq.push(['_trackEvent', 'Share' , 'Pinterest', location.href]); 
});
$('.detail-sharetools a[href*=mailto], .bookmark-share a[href*=mailto]').click(function() {
	_gaq.push(['_trackEvent', 'Share' , 'Email', location.href]); 
});


if($('.previewnav').size())
$('.openpreview, .cover img:eq(0)').click(function() {
	_gaq.push(['_trackEvent', 'Preview' , 'Open', location.href]);
	
	$('.cover').css('height', '530px');
	$('.cover img:eq(0)').hide(200);
	$('.previewnav').css('display', 'block');
	$('.previewnav a:eq(0)').click();
	 
});
$('.previewnav a').click(function() {
	var imgn = $(this).text();
	_gaq.push(['_trackEvent', 'Preview' , 'Show Image ' + imgn, location.href]);
	$('.previewimg').hide();
	$('#preview-' + imgn).css('display', 'block').hide().fadeIn(400);
});

//$('.dropdown-toggle').bind('touchstart', function() { $(this).click(); })

if('ontouchmove' in window)
window.addEventListener("touchmove", function(event) {
  if ($('.dropdown-menu:visible').size()) {
    // no more scrolling
    event.preventDefault();
  }
}, false);

$('.dropdown-toggle').click(function(){ 
	
	setTimeout(function() { 
		if($('.dropdown-menu:visible').size()) {
			//$('html.touch, html.touch body').css('overflow','hidden');
			//$('html').one('click', function() {
			//	$('html.touch, html.touch body').css('overflow','auto');
			//});
		
			if($('.dropdown-menu:visible').offset().top + $('.dropdown-menu:visible').height()  - $('body').scrollTop() > $(window).height()) { 
				$('.dropdown-menu:visible')[0].scrollIntoView(false); 
			}
			
		}

	}, 100); 
});

/*
$('.dashboard .mainbox').each(function() {
	if($(this).find('.collapsed').size()) $(this).addClass('child-collapsed');
});

$('.dashboard .mainbox').click(function(){ $(this).toggleClass('child-collapsed'); $(this).find('.collapse:not(.in):first').collapse('show'); $(this).find('a.collapsed:first').removeClass('collapsed');  })
*/
$('.dashboard .mainbox h2').click(function(){ $(this).parent().find('.collapse-control').click();  })
$('.dashboard .mainbox h2').addClass('child-collapsed')

$('.dashboard .jump a').click(function() { $('a[name="' + $(this).attr('href').split('#')[1] + '"].collapsed').click(); });

$('a[href="#more-description"]').click(function(){ 
	setTimeout(function() { var a = 'a[href="#more-description"]'; $(a).text(!$(a).hasClass('collapsed')?'Show Less':'Read More') }, 100); 
});

$('#profilebar').before('<div id="bar-placeholder"></div>');
$('#profilebar').removeClass('container').wrapInner('<div class="container"></div>');
$('#profilebar').affix({offset:{
	top: function() { return $('#topnav>.container').height() + ($('body').hasClass('search-open') ? 78 : 0); }
	}});




if($('.homepage').size()) {
	var rz = function() { var h = Math.max(640, Math.min(740, $(window).height())); $('.hpimage').css('height', h - 80); $('.hpspacer').css('height', h - 80 - 70);  };
	$(window).resize(rz);
	rz();
	}

$('nav input.form-control').focus(function() { $(this).closest('form').addClass('focused'); })
$('nav input.form-control').blur(function() { $(this).closest('form').removeClass('focused'); })


$('.detail .jump ul').empty();
$('h2[id]').each(function(i,e){$('.detail .jump > ul').append('<li><a href="#' + e.id + '">' + $(e).html() + '</a><ul class=nav></ul></li>')});
if(!$('h2[id]').size()) { $('.detail .jump').parent().hide(); }


$('.detail-subsubs tr:first-child > td > strong').each(function(i,e){$(this).attr('id', 'task'+i); $('.detail .jump ul ul').eq($(this).closest('.detail-subsubs').index()-3).append('<li><a href="#' + 'task' + i + '">' + $(e).html() + '</a></li>')});


var jumptop = function() { return 34 + 78; };
if($('#main > .row:not(.tracks):eq(0)').offset() && ( $(window).height() - $("#affixy").height() ) > 100)
$('#affixy').affix({offset:{
	top: function() { return $('#main > .row:not(.tracks):eq(0)').offset().top - jumptop(); },
	bottom: 200
}});


$('#searchbtn').click(function() {
	if(location.pathname == '/search') return;
	$('.navbar-toggle:visible').click();
	$('#profilebar').css('transition', '0.5s top');
	
	$(window).one('scroll',function() { $('#profilebar').css('transition', 'none'); })
	
	//setTimeout(function() { $('#profilebar').css('transition', 'none'); }, 1100);
	//if($(window).width() < 991) return;
	//$('#bigsearch').remove();
	
	//$('.homepage .curtain').css({'z-index':0,background:'transparent'})
	
	if(!$('#bigsearch').size()) {
	$('.curtain').after('<div id="bigsearch"><form action=/search><input name="q" type="search" class="form-control input-lg"><button class="btn btn-go btn-lg"><i class="icon-angle-right"></i></button></form></div>');
		$('#bigsearch').hide().fadeIn(1);
	}
	$('body').toggleClass('search-open');
	
	
	//$('#profilebar').css('visibility', 'hidden');
	
	$('#bigsearch input').focus();
	$('#bigsearch button').click(function() { $(this).closest('form').submit(); });
	/*$('#bigsearch input').blur(function() {
		$('.homepage .curtain').css({'z-index':-1,background:'transparent'});
		setTimeout(function() { $('#bigsearch').hide(); }, 100);
		//$('#profilebar').css('visibility', 'visible');
	});*/
});

$('input').keypress(function(e){if(e.keyCode == 13 && !$(this).closest('form').size()) { $(this).closest('.mainbox').find('.btn-goforward').click() }})

$('.mobileopen').click(function() { $('#profilebar').addClass('mobile-opened'); return false; }); 
$('.mobileclose').click(function() { $('#profilebar').removeClass('mobile-opened'); return false;  });

$(".jump a").click(function(event){
         event.preventDefault();
         //calculate destination place
         var dest=0;
         var dl = $(this.hash + ', a[name="' + this.hash.split('#')[1] + '"]');
         if(0 && dl.offset().top > $(document).height()-$(window).height()){
              dest=$(document).height()-$(window).height();
         }else{
              dest=dl.offset().top;
         }
         //go to destination
         $('html,body').animate({scrollTop:dest-45-jumptop()}, 1000,'swing');
     });
     
$('#about-news .news-item:gt(2)').wrapAll("<div class=collapse>");
$('#about-news .collapse').after('<a href=# class="btn btn-go btn-wide" id="news-seemore">See More</a>');
$('#news-seemore').click(function(){ $('#about-news .collapse').collapse('show'); $(this).remove(); return false; })
     
$('.footerpage h3 + p a').each(function() { $(this).parent().prev('h3').wrapInner('<a target="_blank"></a>').find('a').attr('href', $(this).attr('href')) })
$('.footerpage h3 + p + p a').each(function() { $(this).parent().prev('p').prev('h3').wrapInner('<a target="_blank"></a>').find('a').attr('href', $(this).attr('href')) });

$('.notaneducator .btn-smaller').remove();

$('.dashboard .jump .nav a').click(function() { $('.jump .nav li.active').removeClass('active'); $(this).parent().addClass('active'); event.preventDefault(); return false; })
//$('a[name]').each(function(){ this.id=this.name });
$(function() { if($('.jump').size()) $('body').scrollspy({target:'.jump',offset:jumptop()+46}); });



$('input[value=100][type=checkbox]').click(function() { for(var i=0;i<6;i++) $(this).closest('.container').find('input[value='+i+'][type=checkbox]').prop('checked', $(this).is(':checked')); })

$('input[value=101][type=checkbox]').click(function() { for(var i=6;i<9;i++) $(this).closest('.container').find('input[value='+i+'][type=checkbox]').prop('checked', $(this).is(':checked')); })

$('input[value=102][type=checkbox]').click(function() { for(var i=9;i<13;i++) $(this).closest('.container').find('input[value='+i+'][type=checkbox]').prop('checked', $(this).is(':checked')); })

// restructure math template top vid
$('.mathvid').insertBefore($('.detail-top'));

$('.inline-doc-vid-small a').click(function() { $(this).parent().addClass('in'); $(this).replaceWith($(this).data('player')); return false; })


$('.inline-doc-thumb a').click(function() { $('<div class="modal inline-doc-modal"><div class=modal-dialog><div class=modal-content><div class=modal-header><button type="button" class="close" data-dismiss="modal">&times;</button></div><h2>'+$(this).data('title')+'</h2><h3><a href="/file/'+$(this).data('id')+'" target=_blank>Download Document '+$(this).data('fsize')+'</a></h3>'+$(this).html()+'</div></div></div>').appendTo(document.body).modal(); return false; })


function downloadall_response(data) {
	var lis = $.map(data, function(e) { return '<li><label><input type=checkbox name=files[] value='+e.id+' checked> '+(e.displayname||e.name)+'</label></li>'; }).join('');
	$('<div class="modal download-all-modal"><div class=modal-dialog><div class=modal-content><div class=modal-header><button type="button" class="close" data-dismiss="modal">&times;</button></div><h2>Choose Your Download</h2><p>Select which documents, links, or videos you would like to download.</p><ul>'+lis+'</ul><button class="btn btn-go btn-goforward btn-wide">Download Selected</button></div></div></div>').modal();
	$('.download-all-modal.in button.btn-go').click(function() {
		if(!$('.download-all-modal.in input').serialize())
			$('.modal.in').modal('hide');
		else
			location.href = '/file/all2/' + $('a[href*="file/all/"]').attr('href').split('/')[3] + '?' + $('.download-all-modal.in input').serialize();
	});
}


$('a[href*="file/all/"]').click(function(){
	$.get( site.root_uri + '/file/all_list/' + $(this).attr('href').split('/')[3], null, downloadall_response, "json" );

	return false;
});

$('.rigor-tooltip').tooltip({container:'#main'});

if(location.hash) $(".jump a[href=\""+location.hash+"\"]").click();

if(/dev.*search.1.1.9.10.11.12/.test(location.href) && !/survey_test1=shown/.test(document.cookie)) {
	$('.survey-container').show();
	//$('.survey-container .x').click(function() { $('.survey-container').toggleClass('open'); });
	var idleClose = setTimeout(function() { function() { $('.survey-container').removeClass('open'); } }, 15000);
	$('.survey-container').click(function(e) { $('.survey-container').toggleClass('open'); e.stopPropagation(); clearTimeout(idleClose); });
	$(window).on('click scroll', function() { $('.survey-container').removeClass('open'); });
	setTimeout(function() { $('.survey-container').addClass('open'); document.cookie='survey_test1=shown'; }, 2500);
	
	
}