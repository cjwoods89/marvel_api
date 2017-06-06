(function(){

  // Storing HTML content
  var charName = $('#charName');
  var searchButton = $('#search');
  var listContainer = $('.media-list');
  var listBox = $('#content');
  var modelTitle = $('#myModalLabel');
  var modelBody = $('#modalContent');

  // Storing all of the fancy bootstraps into variables
  var mediaPrefix = "<li class='media'> <div class='media-left'> <a href='http://www.google.com/search?q="
  var mediaPrefix1 = "' target='_blank'> <img class='media-object' src='"
  var mediaPrefix2 = "'> </a> </div> <div class='media-body'> <h4 class='media-heading'>"
  var mediaSuffix = "</h4>"
  var mediaSuffix2 = " </div> </li>"

  // Storing modal stuff for bootstraps
  var modalButton = "<div class='myButton'><button type='button' align-text='right' class='btn btn-link' data-toggle='modal' data-target='.bs-example-modal-md' id='"
  var modalButton2 = "'>Read more...</button></div>"

  var content;
  var publicKey = 'ts=1&apikey=e74aa0437d913bcd0e57b3d6f55191a3&hash=9be636adf8d07b6a21396167bbf85b1b';

  searchButton.click(function(){

    // Resetting the body content
    listContainer.empty();

    $.get( 'http://gateway.marvel.com/v1/public/characters?limit=100&nameStartsWith='+ charName.val() + '&' + publicKey, function( data ) {

      for (var i = 0; i < data.data.results.length; i++) {

        if (data.data.results[i].description == "") {
          content = "No description available.....   "
        } else {
          content = data.data.results[i].description;
        }
        var charArray = data.data.results[i].name.split(' ');

        listContainer.append(
          mediaPrefix + charArray.join('+') + mediaPrefix1 + data.data.results[i].thumbnail.path + '.' +
          data.data.results[i].thumbnail.extension +
          mediaPrefix2 +
          data.data.results[i].name +
          mediaSuffix + content + modalButton + data.data.results[i].id + modalButton2 + mediaSuffix2
        );

        // *********************************
        // Used to alternate the offset of the items returned
        // However, the order of the div tag has to change as well
        // So..... I removed it!
        // $(".media-list .media:nth-child(even)").css("text-align", "right");
        // *********************************

      }

    });

    listBox.css("display","block");

  });

  // Pull up the Modal
  listBox.on("click",".myButton button",function(){

    var modalTitle = $('#myModalLabel');
    var modalBody = $('#modalContent');
    modalTitle.html("Events involving this character:");

    $.get( 'http://gateway.marvel.com/v1/public/characters/' + $(this).attr('id') + '/events?' + '&' + publicKey, function( data ) {

      // Resetting the modal
      modalBody.text('');

      for (var i = 0; i < data.data.results.length; i++) {

        modalBody.append( '<p> <strong>' + data.data.results[i].title + ' </strong> : ' + data.data.results[i].description + '</p> </br>')

        // console.log(data.data.results[i].title + ':' + data.data.results[i].description);

      };

    });

  });


})();
