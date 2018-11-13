jQuery(document).ready(function(){
	/* Пагинация в профиле */
	jQuery('#profileContentWrapper').on('click','.box-pagination li', function(e){
		e.preventDefault();
		var li = jQuery(this);

		if(li.hasClass('current')){
			return false;
		}
		page = li.attr('data-page');
		var wrapper = li.closest('.tab-pane');
		var link = wrapper.attr('data-get');
		wrapper.animate({opacity: 0}, 200,function(){
			jQuery.ajax({
				url: '/'+link+'/',
				data: {
					page: page,
					id: jQuery('#profileContentWrapper').attr('data-id'),
				},
				success: function(r){
					wrapper.html(r);
					wrapper.animate({opacity: 1}, 200);
				}
			});
		});
	});
	/* end: Пагинация в профиле */


	/* Загрузка фото профиля */
	jQuery('#load-profile-photo').click(function(e){
		if(!jQuery(this).hasClass('active')){
			jQuery('#load-profile-photo-input').click();
		}
	});
	jQuery('#load-profile-photo-input').change(function(e){
		jQuery('#load-profile-photo').addClass('active');

		var text = 'Загрузка';
		var d = '';
		var b = '';
		var i = 0;
		var t = setInterval(function(){
			i = i < 3 ? i + 1 : 1;
			d = '';
			for(var k = 1; k <= i; k++){
				d += '.';
			}
			jQuery('#load-profile-photo .text').text(text+d);
		},300);

		var file = document.getElementById('load-profile-photo-input').files.length;
		if(file){
			var fd = new FormData();
			fd.append( 'file', document.getElementById('load-profile-photo-input').files[0] );
			jQuery.ajax({
				'method': 'post',
				'dataType': 'json',
				data: fd,
				processData: false,
				contentType: false,
				'url': '/loadProfilePhoto/',
				success: function(r){
					if(r.status = 'saccess'){
						jQuery('#user-photo-wrap').find('img').attr('src', r.photo);
						jQuery('#login-wget').find('img').attr('src', r.photo);
					}
					clearInterval(t);
					jQuery('#load-profile-photo').removeClass('active');
					jQuery('#load-profile-photo .text').text('Изменить аватарку');
				}
			});
		}else{
			clearInterval(t);
			jQuery('#load-profile-photo').removeClass('active');
			jQuery('#load-profile-photo .text').text('Изменить аватарку');
		}
	});
	/* end: Загрузка фото профиля */

	function homeNews(){
		var xhr = null;
		var _this = this;

		this.getAJAX = function(){
			if(_this.xhr){
				_this.xhr.abort();
				_this.xhr = null;
			}

			_this.xhr = jQuery.ajax({
				method: 'GET',
				dataType: 'JSON',
				url:     '/homeNews/',
				data: jQuery('#home_news_form').serializeArray(),
				success: function(r){
					_this.xhr = null;
					if(r.type == 'html'){
						jQuery('#home_news_form #home_news_content').html(r.html);
						jQuery('#home_news_form #home_news_content').animate({opacity: 1}, 500, function(){
						});
					}else{
						var btn = jQuery('#home_news_form').find('#home_news_load_more');
						var l = 0;
						if(r.json){
							for(var key in r.json){
								l++;
								var t = jQuery(r.json[key]).css('display', 'none');
								jQuery('#home_news_content').find('.articles-small-list').append(t);
								t.fadeIn();
							}
						}

						if(!r.json ||  l < 12){
							btn.html('<span class="help">Ничего нет</span>');
							btn.addClass('disabled');
						}else{
							btn.html('<span class="help">Показать ещё <span class="icon-bold-down"></span></span>');
						}
						btn.removeClass('activated');
					}
				},
				error: function(r){
					_this.xhr = null;
					jQuery('#home_news_form #home_news_content').css('opacity','1');
				}
			});
		};

		jQuery('#home_news_form select, #home_news_form input[type="radio"]').change(function(e){
			e.preventDefault();
			jQuery('#home_news_offset').val('0');
			jQuery('#home_news_form #home_news_content').animate({opacity: 0}, 500, function(){
				_this.getAJAX();
			});
		});

		jQuery('#home_news_form').on('click','#home_news_load_more',function(e){
			e.preventDefault();
			var elem = jQuery(this);
			if(elem.hasClass('activated') || elem.hasClass('disabled')){
				return false;
			}
			elem.html('<span class="help">Загрузка...</span>');
			elem.addClass('activated');
			jQuery('#home_news_offset').val(parseInt(jQuery('#home_news_offset').val()) + 12);
			_this.getAJAX();
		});

	};

	if(jQuery('#home_news_form').length){
		homeNews();
	}
	function serialNews(){
		var xhr = null;
		var _this = this;

		this.getAJAX = function(){
			if(_this.xhr){
				_this.xhr.abort();
				_this.xhr = null;
			}

			_this.xhr = jQuery.ajax({
				method: 'GET',
				dataType: 'JSON',
				url:     '/getSerialNews/',
				data: jQuery('#serial-news-filter-wrapper').serializeArray(),
				success: function(r){
					_this.xhr = null;
					jQuery('#serial-news-content').html(r.posts);
				},
				error: function(r){
					_this.xhr = null;
					jQuery('#serial-news-content').css('opacity','1');
				}
			});
		};

		jQuery('#serial-news-filter-wrapper select').change(function(e){
			e.preventDefault();
			jQuery('#serial_news_offset').val('0');
			//jQuery('#serial-news').animate({opacity: 0}, 500, function(){
			_this.getAJAX();
			//});
		});

		jQuery('#serial-news .btn-load-more').on('click',function(e){
			e.preventDefault();
			jQuery('#serial_news_offset').val(parseInt(jQuery('#serial_news_offset').val()) + 12);
			_this.getAJAX();
		});

	};

	if(jQuery('#serial-news-filter-wrapper').length){
		serialNews();
	}

	function serialsFilter(){
		this._this = this;
		this.xhr = null;
		this.textTimout = null;
		this.contentWrap = jQuery('#serials-filter-content');
		this.filterWrap = jQuery('#serials-filter-form');

		this.makeNewUrl = function(){
			var current = _this.filterWrap.find('[name="genre"] option:selected');
			var alias = '/serials/';

			if(current.attr('data-alias')){
				alias += current.attr('data-alias')+'/';
			}
			var params = [];

			var year = _this.filterWrap.find('[name="year"] option:selected').val();

			if(year){
				params.push('year='+year);
			}

			var tv = _this.filterWrap.find('[name="tv"] option:selected').val();
			if(tv != ''){
				params.push('tv='+tv);
			}

			var status = _this.filterWrap.find('[name="status"] option:selected').val();
			if(status != ''){
				params.push('status='+status);
			}

			var sort =  _this.filterWrap.find('input[name="sort"]:checked').val();
			if(sort != ''){
				params.push('sort='+sort);
			}
			var page = _this.filterWrap.find('input[name="page"]').val();
			if(page > 1){
				params.push('page='+page);
			}

			var query = _this.filterWrap.find('input[name="query"]').val();
			if(query != ''){
				params.push('query='+query);
			}

			if(params.length){
				alias += '?'+params.join('&');
			}
			window.history.pushState('page2', 'Title', alias);
		};

		this.filterWrap.on('change','select, input[type="radio"]', function(){
			_this.reloadFilter();
		});

		this.filterWrap.on('input','input[name="query"]', function(){
			if(_this.textTimout){
				clearTimeout(_this.textTimout);
			}
			_this.textTimout = setTimeout(_this.reloadFilter, 500);
		});

		this.contentWrap.on('click', '.btn-load-more', function(e){
			e.preventDefault();
			var elem = jQuery(this);
			if(elem.hasClass('activated')){
				return false;
			}
			elem.addClass('activated');
			elem.find('a > span').text('Идет загрузка');
			_this.filterWrap.find('input[name="page"]').val(parseInt(elem.attr('data-current')) + 1);
			_this.getAjax();
		});

		this.reloadFilter = function(){
			this.filterWrap.find('[name="page"]').val(1);
			_this.contentWrap.animate({opacity: 0}, 500, function(){
				_this.getAjax();
			});
		}

		this.getAjax = function(){
			_this.makeNewUrl();
			if(_this.xhr){
				_this.xhr.abort();
				_this.xhr = null;
			}

			var data = this.filterWrap.serializeArray();
			_this.xhr = jQuery.ajax({
				method: 'GET',
				dataType: 'JSON',
				url:     '/getSerials/',
				data: data,
				success: function(r){
					if(r.type == 'full'){
						_this.contentWrap.html(r.content);
						_this.contentWrap.animate({opacity: 1}, 500, function(){
						});
					}else{
						_this.contentWrap.find('.serials-list').append(r.posts);
						_this.contentWrap.find('#full-pagination').html(r.pagination);
					}
					_this.xhr = null;
				},
				error: function(r){
					_this.xhr = null;
					//alert('error');
				}
			});
		}
	}

	if(jQuery('#serials-filter-form').length > 0){
		serialsFilter();
	}

	function materialsCategory(){
		this._this = this;
		this.xhr = null;
		this.textTimout = null;
		this.contentWrap = jQuery('#materials-category-wrapper');
		this.filterWrap = jQuery('#materials-category-filter-wrapper');


		this.filterWrap.on('change','select', function(){
			_this.reloadFilter();
		});

		this.reloadFilter = function(){
			this.filterWrap.find('[name="page"]').val(1);
			_this.contentWrap.animate({opacity: 0}, 500, function(){
				_this.getAjax();
			});
		}

		this.makeNewUrl = function(){
			var current = _this.filterWrap.find('[name="category_id"] option:selected');
			var alias = '/'+current.attr('data-alias')+'/';


			var params = [];

			var serial_id = _this.filterWrap.find('[name="serial_id"] option:selected').val();

			if(serial_id){
				params.push('serial_id='+serial_id);
			}

			var page = _this.filterWrap.find('input[name="page"]').val();
			if(page > 1){
				params.push('page='+page);
			}

			if(params.length){
				alias += '?'+params.join('&');
			}console.log(alias);
			window.history.pushState('page2', 'Title', alias);
		};

		this.contentWrap.on('click', '.btn-load-more', function(e){
			e.preventDefault();
			var elem = jQuery(this);
			if(elem.hasClass('activated')){
				return false;
			}
			elem.addClass('activated');
			elem.find('a > span').text('Идет загрузка');
			_this.filterWrap.find('input[name="page"]').val(parseInt(elem.attr('data-current')) + 1);
			_this.getAjax();
		});

		this.getAjax = function(){
			_this.makeNewUrl();
			if(_this.xhr){
				_this.xhr.abort();
				_this.xhr = null;
			}

			var data = this.filterWrap.serializeArray();
			_this.xhr = jQuery.ajax({
				method: 'GET',
				dataType: 'JSON',
				url:     '/getMaterials/',
				data: data,
				success: function(r){
					if(r.type == 'full'){
						_this.contentWrap.find('.news-wrapper').html(r.content);
						_this.contentWrap.animate({opacity: 1}, 500, function(){
						});
					}else{
						for(var key in r.posts){
							var p = jQuery(r.posts[key].html).css('display','none');
							var nd = r.posts[key].nd;
							var date = r.posts[key].date;
							if(!_this.contentWrap.find('.news-wrapper').find('#d'+nd).length){
								_this.contentWrap.find('.news-wrapper').append('<div id="d'+nd+'" class="day-row"><div class="title">'+date+'</div><ul class="articles-list small-block-grid-2 medium-block-grid-3 large-block-grid-3"></ul></div>');
							}
							if(!$('.news-wrapper').find('a[href="' + $(p).find('a.article-top').attr('href') + '"]').length)
								_this.contentWrap.find('.news-wrapper').find('#d'+nd+' .articles-list').append(p);
							p.fadeIn();
						}
					}

					_this.contentWrap.find('#pagination').html(r.pagination);
					_this.xhr = null;
				},
				error: function(r){
					_this.xhr = null;
					//alert('error');
				}
			});
		}
	}

	if(jQuery('#materials-category-wrapper').length > 0){
		materialsCategory();
	}



	if(jQuery('#serial-news').length > 0){

		jQuery('#serial-news').on('click', '.btn-load-more', function(e){

			e.preventDefault();

			var elem = jQuery(this);
			if(elem.hasClass('activated')){
				return false;
			}

			elem.addClass('activated');
			elem.find('a > span').text('Идет загрузка');

			jQuery.ajax({
				method: 'GET',
				dataType: 'JSON',
				url:     '/GetSerialMaterials/',
				data: {
					page: parseInt(elem.attr('data-current')) + 1,
					id: jQuery('#serial-news').attr('data-news-id'),
				},
				success: function(r){
					if(r.status == 'success'){
						jQuery('#serial-news').find('ul.news-list').append(r.posts);
						jQuery('#pagination').html(r.pagination);
					}
				},
				error: function(r){
					_this.xhr = null;
					//alert('error');
				}

			});

		});
	}

	if(jQuery('#serial_news_in_news').length){
		jQuery('#serial_news_in_news .btn-load-more').click(function(e){
			e.preventDefault();
			var btn = jQuery(this);

			if(btn.hasClass('activated')){
				return false;
			}

			btn.addClass('activated').find('a').html('<span class="help">Загрузка...</span>');

			var data = {
				page: btn.attr('data-page'),
				id: btn.attr('data-id'),
			};

			jQuery.ajax({
				method: 'GET',
				dataType: 'JSON',
				url:     '/getNewsInNews/',
				data: data,
				success: function(r){
					for(var k in r){
						jQuery('#serial_news_in_news ul').append(jQuery(r[k]));
					}
					if(r.length < 3){
						btn.find('a').html('<span class="help">Ничего нет</span>');
						btn.find('a').addClass('disabled');
					}else{
						btn.removeClass('activated');
						btn.find('a').html('<span class="help">Показать ещё <span class="icon-bold-down"></span></span>');
						btn.attr('data-page', parseInt(btn.attr('data-page')) + 1);
					}
				}
			});
		});
	}

	function ReviewsPaginationInit()
	{
		jQuery('.btn-load-more').click(function(e){

			e.preventDefault();

			var elem = jQuery(this);
			if(elem.hasClass('activated')){
				return false;
			}

			elem.addClass('activated');
			elem.find('a > span').text('Идет загрузка');

			jQuery.ajax({
				method: 'GET',
				dataType: 'JSON',
				url:     '/GetSerialReviews/',
				data: {
					page: parseInt(elem.attr('data-current')) + 1,
					id: jQuery('.reviews-list').attr('data-news-id'),
					type: jQuery('#reviews_type').val()
				},
				success: function(r){
					if(r.status == 'success'){
						jQuery('.reviews-list').append(r.posts);
						jQuery('#pagination').html(r.pagination);
					}
					ReviewsPaginationInit();
				},
				error: function(r){
					_this.xhr = null;
					//alert('error');
				}

			});

		});
	}
	if(jQuery('.block-reviews-list').length > 0){
		ReviewsPaginationInit();
	}

	if(jQuery('#get-episodes').length){
		jQuery('#get-episodes').click(function(e){
			e.preventDefault();
			var btn = jQuery(this);

			if(btn.hasClass('activated')){
				return false;
			}

			var ep = jQuery('#get-episodes-wrapper');

			btn.addClass('activated').find('a').html('<span class="help">Загрузка...</span>');

			var data = {
				skip: btn.attr('data-skip'),
				take: btn.attr('data-take'),
			};

			jQuery.ajax({
				method: 'GET',
				dataType: 'JSON',
				url:     '/getEpisodes/',
				data: data,
				success: function(r){
					for(var k in r){
						if(!ep.find('#der'+r[k].strtime).length){
							ep.append('<div id="der'+r[k].strtime+'" class="date-row"><div class="date-title">'+r[k].weekDay+' <span class="date">'+r[k].date+'</span></div><ul class="schedule-list small-block-grid-3 medium-block-grid-2 large-block-grid-2"></ul></div>');
						} else
							ep.find('#der'+r[k].strtime).find('ul').append(jQuery('<li></li>').html(r[k].html));
					}
					if(r.length < 15){
						btn.find('a').html('<span class="help">Ничего нет</span>');
						btn.find('a').addClass('disabled');
					}else{
						btn.removeClass('activated');
						btn.find('a').html('<span class="help">Показать ещё <span class="icon-bold-down"></span></span>');
						btn.attr('data-skip', parseInt(btn.attr('data-skip')) + parseInt(btn.attr('data-take')));
					}
				}
			});

		});
	}

	jQuery(document).on('click','[data-news-like]', function(e){
		e.preventDefault();
		var elem = jQuery(this);
		if(elem.hasClass('active')){
			addNotification('Вы уже оценивали эту запись!');
			return false;
		}

		var id = elem.attr('data-news-like');
		jQuery.ajax({
			method: 'get',
			dataType: 'json',
			url: '/like/',
			data: {
				id: id,
			},
			success: function(r){
				if(r.error == 1)
					addNotification('Необходимо авторизоваться');
				else {
					addNotification(r.text);
					$('[data-news-like=' + id + ']').text(parseInt(elem.text()) + 1);
					elem.addClass('active');
				}
			}
		});

	});

	jQuery(document).on('click', '[data-review-change]', function(e){
		e.preventDefault();
		var elem = jQuery(this);
		var id = elem.closest('[data-review-id]').attr('data-review-id');
		var type = elem.hasClass('rating_up') ? 'up' : 'down';
		var c = parseInt(elem.attr('data-review-change')) + 1;
		elem.attr('data-review-change', c);

		jQuery.ajax({
			method: 'get',
			dataType: 'json',
			url: '/voteReview/',
			data: {
				id: id,
				type: type,
			},
			success: function(r){
				if(r.status == 'success'){
					elem.text((c > 0 ? (type == 'up' ? '+' : '-') : '')+c);
				}
				addNotification(r.message);
			}
		});
	});



	window.addNotification = function(text){
		var elem = jQuery('<div class="notification-item">'+text+'</div>');
		jQuery('#notification-line').append(elem);
		elem.fadeIn(1000, function(){
			elem.fadeOut(1000, function(){
				elem.remove();
			});
		});
	}



	function resizesearch()
	{
		relnewsh=.65*parseInt(jQuery(".related_news .ajaxnewsitem .anwimage").css("width"))+190;
		jQuery(".related_news").css("height",relnewsh);
		jQuery(".searchcontwraper").css("max-height",document.documentElement.clientHeight-121);
	}
	function dle_do_custsearch(a)
	{
		$("#ajgloope").css("display","none");
		$("#ajloader").css("display","block");
		$.post("/custSearch/",{query:""+a},function(a) {
			if(a != '<div class="ajaxalert">Ничего не найдено</div>')
				$('.block-ajax-results').addClass('open');
			else
				$('.block-ajax-results').removeClass('open');
			$("#ajloader").css("display","none");
			$("#ajgloope").css("display","block");
			$("#searchsuggestionscust").html(a);
			$('#searchsuggestionscust .view-all').appendTo('.block-ajax-results');
			resizesearch();
			$("#searchsuggestionscust").fadeIn();
		});
	}
	var afterSearchval = "";
	var dle_custsearch_delay = "";
	jQuery("#storycust").keyup(function() {
		var a=$(this).val();
		afterSearchval!=a&&a.length>2&&(clearInterval(dle_custsearch_delay),dle_custsearch_delay=setTimeout(function(){dle_do_custsearch(a)},600),afterSearchval=a);
	});

	if($('.serial-item-rating .stars').length > 0)
	{
		var ratingWidth = $('.serial-item-rating .stars .colorbar').width();
		$('.serial-item-rating .stars').mouseover(function(e) {
			var hoverWidth = e.clientX - 800;
			$('.serial-item-rating .stars .colorbar').width(hoverWidth);
		});
		$('.serial-item-rating .stars').hover(function() {}, function() {
			$('.serial-item-rating .stars .colorbar').width(ratingWidth);
		});
	}

	$('.field-favorites a').click(function() {
		var id = $(this).data('id');
		var action = $(this).data('action');
		$.post("/favorites/", { fav_id: id, action: action }, function(a) {
			if(a == "error")
			{
				addNotification('Необходимо авторизоваться');
			} else if(action == 'minus') {
				$('.field-favorites a').data('action', 'plus');
				addNotification('Вы убрали новость из закладок');
				$('.field-favorites span').html(a);
			} else {
				$('.field-favorites a').data('action', 'minus');
				addNotification('Вы добавили новость в закладки');
				$('.field-favorites span').html(a);
			}
		});
		return false;
	});

	$('#serial-review-form .error-message').click(function() {
		$('#serial-review-form').removeClass('has-error');
		$('#serial-review-form textarea').focus();
	});
	$('#serial-review-form').submit(function() {
		if($('#login-wget .login-window').length > 0)
		{
			$('#login-wget').addClass('active');
			$('<div>').addClass('add-review-bg').click(function() {
				$(this).remove();
				$('#login-wget').removeClass('active');
			}).appendTo('body');
		} else if($('#serial-review-form [name=text]').val().length < 140) {
			addNotification('Длина отзыва должна быть не менее 140 символов.');
			$('#serial-review-form .error-message').html('<span class="icon-error">!</span>Длина отзыва должна быть не менее 140 символов.');
			$(this).addClass('has-error');
		} else if(Number($('#comment-rating').val()) == 0) {
			addNotification('Не выбран рейтинг.');
			$('#serial-review-form .error-message').html('<span class="icon-error">!</span>Не выбран рейтинг.');
			$(this).addClass('has-error');
		} else {
			$.ajax({
				type: "POST",
				dataType: "JSON",
				data: $(this).serialize(),
				url: "/addReview/",
				success: function(result) {
					if(result.result == "true")
					{
						addNotification('Ваш отзыв успешно добавлен');
						$('#serial-review-form [name=text]').val('');
						$('#comment-rating').val('');
						$('.serial-comment-rating .ghost').css('width', '0px');
						$('.serial-comment-rating .colorbar').css('width', '0px');
					} else
						addNotification('Ошибка добавления отзыва: ' + result.error);
				}
			});
		}
		return false;
	});
	$('#serial-review-form #comment-field').focus(function() {
		if($('#login-wget .login-window').length > 0)
		{
			$(this).blur();
			$('#login-wget').addClass('active');
			$('<div>').addClass('add-review-bg').click(function() {
				$(this).remove();
			}).appendTo('body');
		}
	});

	if(document.location.hash.length > 0)
	{
		var id = document.location.hash;
		if((id.indexOf("-") > 0) && ($(id).length > 0))
		{
			$(id).find('.item-review').addClass('review-focused');
			setTimeout(function() {
				$(window).scroll(function() {
					$('.item-review.review-focused').removeClass('review-focused');
				});
			}, 2000);
		}
	}

	setTimeout(function() {
		$('.addcomments .not-register a').click(function() {
			$('#login-wget').addClass('active');
			$('<div>').addClass('add-review-bg').click(function() {
				$(this).remove();
			}).appendTo('body');
			return false;
		});
	}, 1000);
});

