"use strict";
var y = document.getElementsByClassName("menu-button");
var menuButton = y[0];
console.log(menuButton);
var body       = document.body;

menuButton.addEventListener('click', function() {
  body.classList.toggle('menuActive');
  this.classList.toggle('active');
});
