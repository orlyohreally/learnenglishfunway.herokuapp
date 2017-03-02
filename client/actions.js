var States = require('./states.js');



function loadMenuItems(){
	States.atlas.MenuItem.addEventListener("load", function() {
		States.MenuItem.loadedMenuItems = true;
		Canvas.drawMenuItems();
	})
}
Load = {};
Load.Animals = function(){
	States.atlas.Animalsframe.addEventListener("load", function() {
		States.Task.loadedAnimalsframe = true;
	})
}
Load.AnimalsWords = function(){
	States.atlas.AnimalsWordsframe.addEventListener("load", function() {
		States.Task.loadedAnimalsWordsframe = true;
	})
}
Load.Numbers = function(){
	States.atlas.Numbersframe.addEventListener("load", function() {
		States.Task.loadedNumbersframe = true;
	})
}
Load.NumbersWords = function(){
	States.atlas.NumbersWordsframe.addEventListener("load", function() {
		States.Task.loadedNumbersWordsframe = true;
	})
}
Load.Letters = function(){
	States.atlasLetters.addEventListener("load", function() {
		States.Task.loadedLetters = true;
	})
}
Load.MenuItemsTasks = function(j){
	States.atlas.MenuItemTask.addEventListener("load", function() {
		States.MenuItem.loadMenuItemsTasks = true;
		drawMenuItemsTasks(j);
	}, false);	
}

function respondCanvas(){ 
	console.log("respondCanvas");
	try{
		States.Profile.UserName = document.getElementById("UserName").value;
		States.Profile.Password = document.getElementById("Password").value;
		$("#UserName").remove();
		$("#Password").remove();
		$("#inputdiv").remove();
	}
	catch(e){
		if(!States.Profile.LoggedIn) {
			States.Profile.UserName = "";
			States.Profile.Password = "";
		}
	}
	c.attr('width', $(container).width()); //max width
	c.attr('height', $(container).height() ); //max height
	States.Screen.width = $(container).width();
	States.Screen.height = $(container).height();
	Canvas.clearRect(0, 0, Screen.width/Math.min(Screen.k_width, Screen.k_height), Screen.height/Math.min(Screen.k_width, Screen.k_height))
	States.MenuItem.rwidth = Screen.width;
	States.MenuItem.rheight = Screen.height * 0.6;
	States.Screen.k_width = MenuItem.rwidth / MenuItem.width;
	States.Screen.k_height =  MenuItem.rheight / MenuItem.height;
	
	States.recountValues();
	console.log("initMenu");
	initMenu();
	
	ctx.fillStyle="#000000";
	
}
function displayMenu() {
	try{
		console.log("displayMenu");
		var frame = Properties.Buttons["left-arrow.png"].frame;
		if(Properties.Tasks.length && Properties.Topics.length) {
			respondCanvas();
			console.log("frame", frame);
			var tmp = [];
			for (i = 0; i < MenuItem.itemsCount; i++) {
				tmp[i] = Properties.Topics[i].Name;
			}
			States.setItemList(tmp);
			States.Menuitems.setItemsCount = (Properties.Topics).length;
			tmp = [];
			for (q = 0; q < MenuItem.itemsCount; q++) {
				try{
					tmp[q] = Properties.Tasks[q].length;
				}
				catch(e){
					tmp[q] = 0;
				}
			}
			States.Tasks.setItemsCount(tmp);
		}
	}
	catch(e) {
			setTimeout(function(){
				displayMenu();
			})
		}
}
function logInCancelButtonClicked() {
	States.setUserName("");
	$("#UserName").remove();
	$("#Password").remove();
	$("#inputdiv").remove();
	
	Main.clearRect(0, 0, Screen.width/ Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height) )
	States.setLogInuser(false);
	States.Mode.MenuItem = true;
	States.Mode.Menu = false;
	Main.respondCanvas();
}
function logInUser(User, Accent) {
	States.logInUser(User, Accent)
	States.setLoggedIn(true);
}

module.exports= {
	respondCanvas: respondCanvas,
	displayMenu: displayMenu,
	logInCancelButtonClicked: logInCancelButtonClicked,
	logInUser: logInUser,
	Load: Load
}