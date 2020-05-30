function getRandomColour() {
  var letters = '0123456789ABCDEF';
  var colour = '#';
  for (var i = 0; i < 6; i++) {
    colour += letters[Math.floor(Math.random() * 16)];
  }
  return colour;
}

function isDarkColour(colour){

  var colour = colour.substring(1);      // strip #
  var rgb = parseInt(colour, 16);   // convert rrggbb to decimal
  var r = (rgb >> 16) & 0xff;  // extract red
  var g = (rgb >>  8) & 0xff;  // extract green
  var b = (rgb >>  0) & 0xff;  // extract blue

  var luma = (r + g + b) / 3;

  return luma < 128;
}

function setPageColour(){

  var colour = getRandomColour();

  if(isDarkColour(colour)){
    document.getElementById("titleText").style.color = "white";
  } else {
    document.getElementById("titleText").style.color = "black";
  }

  $('body,html').css('background-color', colour);

}

function loadQuote(){

  setPageColour();

  $.getJSON("https://got-quotes.herokuapp.com/quotes.json", function(json){

    var html = "";

    html += "<blockquote class='blockquote centered'>" + json.quote + "</blockquote>" + "<footer class='blockquote-footer centered'>" + json.character + "</footer>";

    html += "<br>";

    html += '<a id="twitterButton" href="https://twitter.com/share?url=https://codepen.io/Voidhur/pen/MGLGLb&amp;text=&ldquo;' + json.quote + '&rdquo;%20-- ' + json.character + '." target="_blank"> <img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" /> </a>';

    $("#quoteSpace").html(html);

  });

}

$(document).ready(function(){

  loadQuote();

  $("#getQuote").on("click", loadQuote);

});
