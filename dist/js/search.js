$(function() {
	var template = "<div class='mdl-card mdl-cell mdl-cell--4-col-desktop mdl-cell--4-col-tablet mdl-cell--12-col-phone mdl-shadow--4dp'><div class='mdl-card__title mdl-color--indigo-600 mdl-color-text--white'><h2 class='mdl-card__title-text'>card-title</h2></div><div class='mdl-card__supporting-text'>card-text</div><div class='mdl-card__actions'> <a href='card-link' class='mdl-button mdl-js-button mdl-button--primary mdl-js-ripple-effect' data-upgraded=',MaterialButton,MaterialRipple'>Перейти по ссылке<span class='mdl-button__ripple-container'><span class='mdl-ripple'></span></span></a></div></div>"

	$('#form').on('submit',(function(e) {
		e.preventDefault();
		var searchValue = $('#wiki-inp_s').val();
		console.log(searchValue);

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
  				gsrsearch: searchValue,
  				srlimit: 10
  			},
 			 dataType: 'jsonp',
  			success: function (x) {
	  				console.log(x);
	  				x.query.search.forEach(function(item, i, search){
	  					var newTemplate = template.replace('card-title', x.query.search[i].title);
	  					newTemplate = newTemplate.replace('card-text', x.query.search[i].snippet)
	  					$('.search_results .mdl-grid').append(newTemplate);
	  				});
  				}
		});
	}));

});
