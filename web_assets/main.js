$(function () {
  $('[data-bs-toggle="tooltip"]').tooltip();
  
  function search_index(_q) {
	  // sort by chapter?
	  return [{'title':'bla', 'chapter':'01', 'text':'blubb', 'url':'/ccs/10-mascihnells-lern-1/'}];
  }
  
  $('#search_form').submit(function(event) {
	  event.preventDefault();
	  return false;
  });
  
  $('#q').keyup(function(event) {
	  var q = $('#q').val();
	  if(q.length >= 3) {
		  var results = search_index(q);
		  $('#q_results > li').remove();
		  for(var i = 0; i < results.length; i++) {
			$('#q_results').append('<li><a class="dropdown-item" href="' + results[i].url + '">' + results[i].chapter + ' // ' + results[i].title + '</a></li>');
		  }
		  new bootstrap.Dropdown('#q_results');
	  }
  });
})
