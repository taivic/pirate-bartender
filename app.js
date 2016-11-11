$(document).ready(function(){

	var questions = [
		"Do ye like yer drinks strong?",
		"Do ye like it with a salty tang?",
		"Are ye a lubber who likes it bitter?",
		"Would ye like a bit of sweetness with yer poison?",
		"Are ye one for a fruity finish?",
	]
	
	var pantry = {
		strong: 
			{
				0: "Splash of gin",
				1: "Glug of rum", 
				2: "slug of whisky", 
				
			},
		salty: 
			{
				0: "Olive on a stick", 
				1: "salt-dusted rim", 
				2: "rasher of bacon", 
			},
		bitter: 
			{ 
				0: "splash of tonic", 
				1: "twist of lemon peel",
				2: "Shake of bitters",
			},
		sweet: 
			{
				0: "splash of cola",
				1: "spoonful of honey",
				2: "Sugar cube",
			},
		fruity: 
			{
				0: "Slice of orange", 
				1: "cherry on top", 
				2: "dash of cassis", 
			},
	}
		
	var displayQuestions = function(){
		$(".one").empty();
		for (var i = 0; i < questions.length; i++){
			html = "";
			$("#question").html("<p>" + questions[i] + "</p>");
		}

	}

	$("#begin").click(function(e){
		e.preventDefault();
		displayQuestions();
	});

	/*var bartender = function(drinks){
		this.drinks = drinks;
	}
*/
});