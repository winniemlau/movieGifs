var movies =['Toy Story', 'Brave', 'The Incredibles', 'Up', 'Inside Out'];

$(document).ready(function() {
	renderButtons();

	 $('#addMovie').on('click', function(){
		var movie = $('#movie-input').val().trim();
     if (movie == "") {
			return false;
		}
		movies.push(movie);
		appendNewButton(movie);
		return false;
	});
});

function appendNewButton(movie){
	    var a = $('<button>')
	    a.addClass('movie');
	    a.attr('data-name', movie);
	    a.text(movie);
      a.on('click', displayMovieInfo);
	    $('#buttonsView').append(a);
	}
	function renderButtons(){
		for (var i = 0; i < movies.length; i++){
		    appendNewButton(movies[i])
		}
	}
	function displayMovieInfo(){
		var movie = $(this).data('name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

      var results = response.data;
      console.log(results);

        	for (var i = 0; i < results.length; i++) {
				 displayGif(results[i]);

			}

		});
    clearMyDiv();
	}
function displayGif(results){

		var movieDiv = $('<div>');
				movieDiv.addClass('imagestyling');
        var p = $('<p>').text("Rating: " + results.rating);
        var movieImage = $('<img>');
        movieImage.attr('src', results.images.fixed_height_still.url);
        movieImage.attr('data-still', results.images.fixed_height_still.url);
        movieImage.attr('data-animate', results.images.fixed_height.url);
        movieImage.attr('data-state', "still");
        movieImage.attr('class', "movieImage");
        movieImage.on('click', toggleImg);
        movieDiv.append(p);
        movieDiv.append(movieImage);
        $('#gifsAppearHere').prepend(movieDiv);
	}

function toggleImg(){
		var state = $(this).attr('data-state');
	 		if ( state == 'still'){
               $(this).attr('src', $(this).data('animate'));
               $(this).attr('data-state', 'animate');
        	}else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
        	}
	}

function clearMyDiv(){
  $('#gifsAppearHere').empty();
  $('#giftsAppearHere').html('');
}
