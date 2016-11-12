$(document).ready(function(){
	
	var Ingredient = function(name, type) {
		this.name = name;
		this.type = type;
	}

	var Pantry = function(name) {
		this.name = name;
		this.ingredients = {};
	}

	Pantry.prototype.addIngredient = function(ingredient) {
		if (this.ingredients[ingredient.type]) {
			this.ingredients[ingredient.type].push(ingredient.name);
		} else {
			this.ingredients[ingredient.type] = [ingredient.name];    
		}
	}

	var Customer = function(name) {
		this.name = name;
		this.preferences = [];
		this.favorite = {};
	}

	var Drink = function(name, ingredients) {
		this.name = name;
		this.ingredients = ingredients;
	}

	var Worker = function(name) {
		this.name = name;
		this.customers = {};
	}

	Worker.prototype.greet = function() {
		var name = prompt("Ahoy matey! What say your name?");
		if (this.customers[name]) {
			alert("Welcome back, here is your favorite drink " + this.customers[name].favorite.name);
		} else {
			guest = new Customer(name);
			this.customers[name] = guest;
		}
	}

	var Bartender = function(name) {
		Worker.call(this, name);
		this.questions = [];
	}

	Bartender.prototype = Object.create(Worker.prototype);
	Bartender.prototype.constructor = Bartender;
	Bartender.prototype.addQuestion = function(question) {
		this.questions.push(question);
	}
	Bartender.prototype.askQuestion = function(num) {
		if (num < this.questions.length) {		
			var html = '<h2>' + this.questions[num].text + '</h2>' +
				'<select id="answer"><option value="yea">Yea</option><option value="nay">Nay</option></select>' +
				'<button id="questionSubmit">Submit</button>'
			$('#question').html(html);
		} else {
			console.log('making drink');
		}
	}

	var Question = function(text, type) {
		this.text = text;
		this.type = type;
	}

	var myPantry = new Pantry("myPantry");

	var newIngredient = new Ingredient("Slug of Rum", "strong");
	myPantry.addIngredient(newIngredient);
	var newIngredient = new Ingredient("Shot of Whisky", "strong");
	myPantry.addIngredient(newIngredient);

	var bartender = new Bartender("Vic");

	var question = new Question("Do you like your drink strong?", "strong");	
	bartender.addQuestion(question);
	var question = new Question("Do you like your drink salty?", "salty");	
	bartender.addQuestion(question);
	var question = new Question("Do you like your drink sweet?", "sweet");	
	bartender.addQuestion(question);
	var question = new Question("Do you like your drink bitter?", "bitter");	
	bartender.addQuestion(question);
	var question = new Question("Do you like your drink fruity?", "fruity");	
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