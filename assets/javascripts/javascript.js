(function(){

  var charName = $('#charName');
  var searchButton = $('#search');
  var listContainer = $('.media-list');
  var mediaPrefix = "<li class='media'> <div class='media-left'> <a href='http://www.google.com/search?q="
  var mediaPrefix1 = "'> <img class='media-object' height='120' width='120' src='"
  var mediaPrefix2 = "'> </a> </div> <div class='media-body'> <h4 class='media-heading'>"
  var content;
  var mediaSuffix = "</h4>"
  var mediaSuffix2 = " </div> </li>"
  var mediaAlignSelector;

  var publicKey = '&ts=1&apikey=e74aa0437d913bcd0e57b3d6f55191a3&hash=9be636adf8d07b6a21396167bbf85b1b';

  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
  }

  searchButton.click(function(){

    listContainer.empty();

    $.get( 'http://gateway.marvel.com/v1/public/characters?limit=100&nameStartsWith='+ charName.val() + publicKey, function( data ) {

      for (var i = 0; i < data.data.results.length; i++) {

        // if (getRandomInt(0,1) = 1) ;
        //
        // if (getRandomInt(0,1) = 1) {
        //   mediaAlignSelector = left;
        // } else {
        //   mediamediaAlignSelector = right;
        // }

        content = data.data.results[i].description;
        var charArray = data.data.results[i].name.split(' ');

        listContainer.append(
          mediaPrefix + charArray.join('+') + mediaPrefix1 + data.data.results[i].thumbnail.path + '.' +
          data.data.results[i].thumbnail.extension +
          mediaPrefix2 +
          data.data.results[i].name +
          mediaSuffix + content + mediaSuffix2
        );

        console.log(data.data.results[i].name);
        console.log(mediaPrefix + charArray.join('+') + mediaPrefix1)

      }

    });
  });

})();
