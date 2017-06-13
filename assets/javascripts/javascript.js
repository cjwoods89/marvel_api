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

    var queryResult = $.get( 'http://gateway.marvel.com/v1/public/characters?limit=100&nameStartsWith='+ charName.val() + '&' + publicKey, function( data ) {

      queryResult.done(function(data){

        for (var i = 0; i < data.data.results.length; i++) {

          if (data.data.results[i].description == "" || data.data.results[i].description == " ") {
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
            ); // listContainer.append

          }; // for loop

        });

      });

    listBox.css("display","block");

  });

  // Pull up the Modal
  listBox.on("click",".myButton button",function(){

    var modalTitle = $('#myModalLabel');
    var modalBody = $('#modalContent');
    modalTitle.html("Events involving this character:");

    var eventsQuery = $.get( 'http://gateway.marvel.com/v1/public/characters/' + $(this).attr('id') + '/events?' + '&' + publicKey, function( data ) {

      // Resetting the modal
      modalBody.text('');

      eventsQuery.done(function(data){

          for (var i = 0; i < data.data.results.length; i++) {

            modalBody.append( '<p> <strong>' + data.data.results[i].title + ' </strong> : ' + data.data.results[i].description + '</p><i><u>' + data.data.results[i].characters.available + ' characters in total for the ' + data.data.results[i].title + ' series.</u></i><br/><br/>')

            // console.log(data.data.results[i].title + ':' + data.data.results[i].description);

          }; // for loop

      }); // done method

      eventsQuery.fail(function(){

        modalBody.append( '<p> <strong> The event title has failed to load</strong> : ' +  ' The event description has failed to load!</p> </br>')

      }); // fail method
    }); // get request

  });


})();
