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
			this.customers[name] = new Customer(name);
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

	bartender.greet();

});