$(function() {
  $('[data-bs-toggle="tooltip"]').tooltip();

  function search_index(_q) {
    for (var i = 0; i < ccs_search.length; i++) {
      ccs_search[i].score = 0;
    }

    var words = _q.split(' ');
    for (var i = 0; i < words.length; i++) {
      var word_regex = new RegExp(words[i], 'gi');
      for (var j = 0; j < ccs_search.length; j++) {
        if (ccs_search[j].title.search(word_regex) >= 0) {
          ccs_search[j].score += 10;
        } else if (ccs_search[j].text.search(word_regex) >= 0) {
          ccs_search[j].score += 5;
        }
      }
    }

    var results = [];
    for (var i = 0; i < ccs_search.length; i++) {
      if (ccs_search[i].score > 0) {
        results.push(ccs_search[i]);
      }
    }
    results.sort((a, b) => b.score - a.score);

    return results;
  }

  $('#search_form').submit(function(event) {
    event.preventDefault();
    return false;
  });

  var delay_timer = null
  $('#q').keyup(function(event) {
    var q = $('#q').val();
    clearTimeout(delay_timer);
    delay_timer = setTimeout(function() {
      if (q.length >= 3) {
        var results = search_index(q);
        $('#q_results > li').remove();
        for (var i = 0; i < results.length; i++) {
          $('#q_results').append('<li><a class="dropdown-item" href="' + results[i].url + '">' + results[i].chapter + ' // ' + results[i].title + '</a></li>');
        }
        new bootstrap.Dropdown('#q_results');
        $('#q_results').show();
      }
    }, 500);
  });
})
