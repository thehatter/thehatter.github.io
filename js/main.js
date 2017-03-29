$( document ).ready(function() {
  
  var menuButton = $('.menu-button');
  var body       = $('body');

  $('.menu-button').click(function() {
    $('body').toggleClass("menuActive");
    $('.menu-button').toggleClass("menuActive");
  });

});