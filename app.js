$(document).ready(function(){
	
	//object ingredient
	var Ingredient = function(name, type, drinkName) {
		this.name = name;
		this.type = type;
		this.drinkName = drinkName;
	}

	//object pantry
	var Pantry = function(name) {
		this.name = name;
		this.ingredients = {};
	}

	//push ingredient name and type to pantry
	Pantry.prototype.addIngredient = function(ingredient) {
		if (this.ingredients[ingredient.type]) {
			this.ingredients[ingredient.type].push(ingredient.name);
		} else {
			this.ingredients[ingredient.type] = [ingredient.name];    
		}
	}

	//object customer
	var Customer = function(name) {
		this.name = name;
		this.preferences = [];
		this.favorite = {};
	}

	//object drink the bartender makes
	var Drink = function(name, ingredients) {
		this.name = name;
		this.ingredients = ingredients;
	}

	var myDrink = new Drink("myDrink");
	var guest = new Customer(name)
	//create drink from preferences
	Drink.prototype.makeDrink = function(Customer, Ingredient) {
		if (guest.preferences.length > 0) {
			//find random ingredients that match preferences
			for (var i = 0; i < guest.preferences.length; i++) {			
				console.log(guest.preferences[i]);	
			//insert adjectives
			}
		} else {
			var html = "<p>" + "A glass of distilled sea water." + "</p>"
			$("#drinks").html(html);    
		}
	}

	//object worker which includes bartender
	var Worker = function(name) {
		this.name = name;
		this.customers = {};
	}

	//prompt by the bartender, customer name gets pushed to customer object
	Worker.prototype.greet = function() {
		var name = prompt("Ahoy matey! What say your name?");
		if (this.customers[name]) {
			alert("Welcome back, here is your favorite drink: " + this.customers[name].favorite.name);
		} else {
			guest = new Customer(name);
			this.customers[name] = guest;
		}
	}

	//bartender object is a worker, bartender asks an array of questions
	var Bartender = function(name) {
		Worker.call(this, name);
		this.questions = [];
	}

	Bartender.prototype = Object.create(Worker.prototype);
	Bartender.prototype.constructor = Bartender;
	
	//bartender's questions are asked, push question to questions
	Bartender.prototype.addQuestion = function(question) {
		this.questions.push(question);
	}

	Bartender.prototype.askQuestion = function(questionCount) {
		if (questionCount < this.questions.length) {		
			var html = '<h2>' + this.questions[questionCount].text + '</h2>' +
				'<br>' +
				'<select class="form-control input-lg" id="answer"><option value="" disabled selected>Select...or else...!</option><option value="yea">Yea</option><option value="nay">Nay</option></select>' +
				'<br>' +
				'<button id="questionSubmit" class="btn btn-danger btn-lg btn-block">Submit</button>'
			$('#question').html(html);
		} else {
			$('#question').hide();
			var html = '<h2>' + "This is what you asked for..." + '</h2>' //+DRINK NAME
			$('#results').html(html);
			console.log('making drink');
			myDrink.makeDrink(Customer, Ingredient);
		}
	}

	//question is an object
	var Question = function(text, type) {
		this.text = text;
		this.type = type;
	}

	var myPantry = new Pantry("myPantry");

	var newIngredient = new Ingredient("Slug of Rum", "strong", "Slug");
	myPantry.addIngredient(newIngredient);
	var newIngredient = new Ingredient("Shot of Whisky", "strong", "Shot");
	myPantry.addIngredient(newIngredient);
	var newIngredient = new Ingredient("Splash of Gin", "strong", "Splash");
	myPantry.addIngredient(newIngredient);
	var newIngredient = new Ingredient("Olive on a stick", "salty", "Olive");
	myPantry.addIngredient(newIngredient);
	var newIngredient = new Ingredient("Salt-dusted rim", "salty", "Dusted");
	myPantry.addIngredient(newIngredient);
	var newIngredient = new Ingredient("Rasher of bacon", "salty", "Bacon");
	myPantry.addIngredient(newIngredient);
	var newIngredient = new Ingredient("Shake of bitters", "bitter", "Bitters");
	myPantry.addIngredient(newIngredient);
	var newIngredient = new Ingredient("splash of tonic", "bitter", "Tonic");
	myPantry.addIngredient(newIngredient);
	var newIngredient = new Ingredient("twist of lemon peel", "bitter", "Twist");
	myPantry.addIngredient(newIngredient);
	var newIngredient = new Ingredient("Sugar cube", "sweet", "Cube");
	myPantry.addIngredient(newIngredient);
	var newIngredient = new Ingredient("spoonful of honey", "sweet", "Honey");
	myPantry.addIngredient(newIngredient);
	var newIngredient = new Ingredient("splash of cola", "sweet", "Cola");
	myPantry.addIngredient(newIngredient);
	var newIngredient = new Ingredient("Slice of orange", "fruity", "Orange");
	myPantry.addIngredient(newIngredient);
	var newIngredient = new Ingredient("dash of cassis", "fruity", "Cassis");
	myPantry.addIngredient(newIngredient);
	var newIngredient = new Ingredient("cherry on top", "fruity", "Cherry");
	myPantry.addIngredient(newIngredient);

	var bartender = new Bartender("Vic");

	var question = new Question("Do ye like yer drinks strong?", "strong");	
	bartender.addQuestion(question);
	var question = new Question("Do ye like it with a salty tang?", "salty");	
	bartender.addQuestion(question);
	var question = new Question("Are ye a lubber who likes it bitter?", "sweet");	
	bartender.addQuestion(question);
	var question = new Question("Would ye like a bit of sweetness with yer poison?", "bitter");	
	bartender.addQuestion(question);
	var question = new Question("Are ye one for a fruity finish?", "fruity");	
	bartender.addQuestion(question);

	var guest;
	var questionCount = 0;
	bartender.greet();

	console.log(bartender);
	console.log(myPantry);
	console.log(guest);

	$('#begin').click(function() {
		$('.start').hide();
		bartender.askQuestion(questionCount);
		questionCount++
	})

	$(document).on('click', '#questionSubmit', function() {
		if ($('#answer').val() === "yea") {
			guest.preferences.push(bartender.questions[questionCount].type);
		}
		bartender.askQuestion(questionCount);	
		questionCount++	
	})
});