var topics = ["Iron Man", "Black Widow", "Captain America", "The Incredible Hulk", "Black Panther", "Thor"];
var totalGifs = 10;
var cutOffRating = "PG";

function makeButtons(){
	for(var i = 0; i < topics.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("btn");
		newButton.addClass("avengers-button");
		newButton.text(topics[i]);
		$("#button-container").append(newButton);
	}
	$(".avengers-button").unbind("click");

	$(".avengers-button").on("click", function(){
		$(".gif-image").unbind("click");
		$("#gif-container").empty();
		populateGIFContainer($(this).text());
	});

}

function addButton(hero){
	if(topics.indexOf(hero) === -1) {
		topics.push(hero);
		$("#button-container").empty();
		makeButtons();
	}
}

function populateGIFContainer(hero){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + hero + 
		"&api_key=Ypd1403lc0NJbDSmM0h8M2oKeRWUa4Qh&rating=" + cutOffRating + "&limit=" + totalGifs,
		method: "GET"
	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
			newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		});
		
		$(".gif-image").unbind("click");
		$(".gif-image").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-data"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-data"));
			}
		});
	});
}

$(document).ready(function(){
	makeButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#favoriteAvenger").val().trim());
		$("#favoriteAvenger").val("");
	});
});