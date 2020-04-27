$( document ).ready(function() {
  
  var menuButton = $('.menu-button');
  var body       = $('body');

  $('.menu-button').click(function() {
    $('body').toggleClass("menuActive");
    $('.menu-button').toggleClass("menuActive");
  });


  // post
  
  function contentsListGen(list) {
    var items = list.map(function(i) {
      return '<li><a href="#'+i.link+'">' + i.name + '</a></li>';
    })

    return '<ul class="contains">' + items.join('') + '</ul>';
  }
  
  if ($('article.post_article').length > 0) {
    //console.log('this is article');

    var contains = [];

    $('section').has('h2').each(function(index){
      var name = $(this).find('h2').attr('id', index).text().replace('# ', '');
      contains.push({name: name, link: index});
    })

    if (contains.length > 2) {
      var contentsBody = '<section class="contents">';
      contentsBody += '<h2>Содержание</h2>';
      contentsBody += contentsListGen(contains);
      contentsBody += '</section>';

      $('section.summary').after(contentsBody);
    }


  }

});
