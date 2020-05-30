function getSearchJson(query){

  var apiString = "https://en.wikipedia.org/w/api.php";

  apiString += "?action=opensearch&search=" + query + "&format=json&origin=*";

  return apiString;

}

function searchWiki(queryString){

  var apiLink = getSearchJson(queryString);

  $.getJSON(apiLink, function(json){

    //$("#randomPage").hide();

    document.getElementById("search").value = "";
    $("#search").attr("placeholder", queryString);

    var resultHtml = "";

    for(var i = 0; i < json[1].length; i++){

      if(!json[2][i].includes("may refer")){

        resultHtml += '<div class="result">';

        resultHtml += '<a href="' + json[3][i] + '" target="_blank>"';

        resultHtml += '<h3 class="resultTitle">' + json[1][i] + '</h3>';

        resultHtml += '</a>';

        resultHtml += '<p class="resultDescription">' + json[2][i] + '</p>';

        resultHtml += '</div>';

      }

    }

    $("#resultsDiv").html(resultHtml);

  });


}

$(document).ready(function(){

  $("#search").on("keydown", function(key){
    if(key.keyCode == 13){
      searchWiki(document.getElementById("search").value);
    }
  });

  $("#imageLink").attr("href", window.location.href);

});
