$(function() {
	var template = "<div class='mdl-card mdl-cell mdl-cell--4-col-desktop mdl-cell--4-col-tablet mdl-cell--12-col-phone mdl-shadow--4dp'><div class='mdl-card__title mdl-color--indigo-600 mdl-color-text--white'><h2 class='mdl-card__title-text'>card-title</h2></div><div class='mdl-card__supporting-text'>card-text</div><div class='mdl-card__actions'> <a target='_blank' href='card-link' class='mdl-button mdl-js-button mdl-button--primary mdl-js-ripple-effect' data-upgraded=',MaterialButton,MaterialRipple'>Перейти по ссылке<span class='mdl-button__ripple-container'><span class='mdl-ripple'></span></span></a></div></div>",
		searchValue,
		count = 0,
		newPages = [],
		newPage = {}


	$('#form').on('submit',(function(e) {
		$('#form').addClass('__pad300');
		e.preventDefault();
		$('.search_results .mdl-grid').html('');
		$('.mdl-textfield').removeClass('is-invalid');
		searchValue = $('#wiki-inp_s').val();
		if (!searchValue) {
			$('.mdl-textfield').addClass('is-invalid');
		}
		else{
			$('.mdl-spinner').addClass('is-active');
			$.ajax({
				url: '//en.wikipedia.org/w/api.php',
				data: { 
					action: 'query',
					list: 'search',
					srsearch: searchValue, 
					format: 'json' , 
					prop: 'info', 
					inprop: 'url', 
					generator: 'search', 
					gsrsearch: searchValue
				},
	 			dataType: 'jsonp',
				success: function (x) {
						$('#form').removeClass('__pad300')
						$('.mdl-spinner').removeClass('is-active');
						$.each(x.query.pages, function(index, val) {
							var pageTitle = val.title;
							var pageUrl = val.canonicalurl;
							newPage = {
								pageUrl,
								pageTitle
							};
							newPages.push(newPage);
							count++;
						});
						x.query.search.forEach(function(item, i, search){
							for (var j = 0; j < newPages.length; j++) {
								if(x.query.search[i].title === newPages[j].pageTitle){
									x.query.search[i].url = newPages[j].pageUrl;
								}
							}
							var newTemplate = template.replace('card-title', x.query.search[i].title);
							newTemplate = newTemplate.replace('card-text', x.query.search[i].snippet);
							newTemplate = newTemplate.replace('card-link', x.query.search[i].url)
							$('.search_results .mdl-grid').append(newTemplate);
						});
					}
			});
		}
	}));

});
