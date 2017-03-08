/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var Display = {};

Display.Topics = [];
function setTopic(j, x, y, w, h) {
	Display.Topics[j] = {};
	Display.Topics[j].x = x;
	Display.Topics[j].y = y;
	Display.Topics[j].w = w;
	Display.Topics[j].h = h;
}
function getTopic(j) {
	return Display.Topics[j];
}
function expandTopic(j, n) {
	//console.log(j, Display.Topics[j], Display.Topics[j]);
	Display.Topics[j].x = Display.Topics[j].x - n;
	Display.Topics[j].y = Display.Topics[j].y - n;
	Display.Topics[j].w = Display.Topics[j].w + 2 * n;
	Display.Topics[j].h = Display.Topics[j].h + 2 * n;
}
Display.Tasks = [];
function setTask(j, i, x, y, w, h) {
	try{		
		Display.Tasks[j][i] = {};
	}
	catch(e) {
		Display.Tasks[j] = [];
		Display.Tasks[j][i] = {};
	}
	Display.Tasks[j][i].x = x;
	Display.Tasks[j][i].y = y;
	Display.Tasks[j][i].w = w;
	Display.Tasks[j][i].h = h;
}
function getTask(j, i) {
	try {
		return Display.Tasks[j][i];
	}
	catch(e){
		return false;
	}
}


Display.Buttons = {};

Display.Buttons["login_btn.png"] = {};

function setButton(name, x, y, w, h) {
	//console.log(name, x, y, w, h);
	Display.Buttons[name] = {};
	Display.Buttons[name].x = x;
	Display.Buttons[name].y = y;
	Display.Buttons[name].w = w;
	Display.Buttons[name].h = h;
}
function getButton(name) {
	return Display.Buttons[name];
}
function expandButton(name, n) {
	Display.Buttons[name].x = Display.Buttons[name].x - n;
	Display.Buttons[name].y = Display.Buttons[name].y - n;
	Display.Buttons[name].w = Display.Buttons[name].w + 2 * n;
	Display.Buttons[name].h = Display.Buttons[name].h + 2 * n;
}

module.exports= {
	getButton: getButton,
	setButton: setButton,	
	expandButton: expandButton,
	setTask: setTask,
	getTask: getTask,
	setTopic: setTopic,
	getTopic: getTopic,
	expandTopic: expandTopic
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
function getRandomArray(array, arrayB, size) {
	//console.log("array", array);
	var arrayA = array.slice(0);
	//console.log(arrayA);
	for(var i = 0; i < size; i++){
		var j = randomInteger(0, arrayA.length);
		arrayB[i] = arrayA[j];
		arrayA.splice(j, 1);
		//console.log("splicing in function");
	}
	return arrayB;
}

module.exports = {
	randomInteger: randomInteger,
	getRandomArray: getRandomArray,
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

(function(){
	$(document).ready(function(){
		var functions = __webpack_require__(1);
		var Display = __webpack_require__(0);
		var ctx = document.getElementById("MainCanvas").getContext("2d");
		var video;
		
		//video animals American accent https://www.youtube.com/watch?v=BfUoopDpmmY
		//video numbers from 1 to 10 "british" https://www.youtube.com/watch?v=dk9Yt1PqQiw&index=2&list=PL9811F95B184967D5
		//video numbers from 1 to 20 american https://www.youtube.com/watch?v=D0Ajq682yrA
		
		/************************************Resizing*******************************************************/
			
		
				
		$(window).resize(respondCanvas);
		
		var Mode = {};
		var Task = {};
		var Rewards = {};
		var MenuItem = {};
		var Title = {};
		var Profile = {};
		var Thumbnails = [];
		var currentVideoFrame = new Image();
		var Quiz = {};
		Quiz.Content = [];
		Mode.MenuItem  = true;
		Mode.Tasks = false;
		Mode.LogIn = false;
		Mode.SignIn = false;
		Mode.Exercise = false;
		Mode.Results = false;
		Mode.Quiz = false;
		Mode.Menu = false;
		//Mode.Alphabetsong = false;
		Mode.CountDown = false;
		Mode.Mobile = false;
		MenuItem.height = 600;
		MenuItem.width = 1800;
		MenuItem.display = 2;
		//MenuItem.itemsCount = 5;
		MenuItem.firstItem = 0;
		MenuItem.size = 100;
		MenuItem.ItemList = {};
		//MenuItem.ItemList = ["alphabet", "animals", "numbers", "sport", "toys"];
		MenuItem.clicked = -1;
		MenuItem.chosen = MenuItem.clicked;

		Task.display = 4;
		Task.firstTask = 0;
		Task.test = [];
		Task.toTest = [];
		Task.Result = {};
		Task.Frames = {};
		Task.asked = {};
		var frametype1, frametype2;
		Title.width = 1800;
		Title.height = 180;
		

		var sound_on = true;
		var playing = false;

		Rewards.width = MenuItem.width;
		Rewards.height = MenuItem.height / 5;
		Rewards.size = 300;

		Profile.width = 540;
		Profile.height = 180;
		
		Profile.Accent = "UK English Male";
		NewAccent = Profile.Accent
		Profile.LoggedIn = false;
		koef = 0.75;
		
		
		
		
		
		
		var c = $('#MainCanvas');
		var ct = c.get(0).getContext('2d');
		var container = $(c).parent();
		c.attr('width', $(container).width()); //max width
		c.attr('height', $(container).height() ); //max height
		Screen = {};
		Screen.width = $(container).width();
		Screen.height = $(container).height();
		MenuItem.rwidth = Screen.width;
		MenuItem.rheight = Screen.height * 0.6;
		Screen.k_width = MenuItem.rwidth / MenuItem.width;
		Screen.k_height =  MenuItem.rheight / MenuItem.height;
		
		function respondCanvas(){ 
			MenuItem.display = 2;
			MenuItem.itemsCount = 5;
			MenuItem.size = 100;
			try{
				Profile.UserName = document.getElementById("UserName").value;
				Profile.Password = document.getElementById("Password").value;
				$("#UserName").remove();
				$("#Password").remove();
				$("#inputdiv").remove();
			}
			catch(e){
				if(!Profile.LoggedIn) {
					Profile.UserName = "";
					Profile.Password = "";
				}
			}
			c.attr('width', $(container).width()); //max width
			c.attr('height', $(container).height() ); //max height
			Screen.width = $(container).width();
			Screen.height = $(container).height();
			clearScreenRect(0, 0, Screen.width/Math.min(Screen.k_width, Screen.k_height), Screen.height/Math.min(Screen.k_width, Screen.k_height))
			MenuItem.rwidth = Screen.width;
			MenuItem.rheight = Screen.height * 0.6;
			Screen.k_width = MenuItem.rwidth / MenuItem.width;
			Screen.k_height =  MenuItem.rheight / MenuItem.height;
			
			
			//white space starts
			if(Screen.width < 482 || Screen.height < 482) {
				console.log("small screen", Screen.width, Screen.height);
				Mode.Mobile = true;
				MenuItem.starts = 50 / Math.min(Screen.k_width, Screen.k_height);
				MenuItem.ends = Screen.height / Math.min(Screen.k_width, Screen.k_height);
			}
			else {
				Mode.Mobile = false;
				MenuItem.starts = 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height);
				MenuItem.ends = 0.8 * Screen.height / Math.min(Screen.k_width, Screen.k_height);
			}
			
			MenuItem.rheight = MenuItem.ends - MenuItem.starts;
			
			//выравнивание по вертикали
			A = (MenuItem.ends - MenuItem.starts) - 2 * 40;
			//выравнивание по горизонтали 
			B = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - 2 * 40 - 2 * koef*100 - (MenuItem.display - 1) * 68) / (MenuItem.display);
			
			if(A < B){
				MenuItem.size = A;
			}
			else {
				MenuItem.size = B;
			}
			if((MenuItem.starts - 2 * 20)/130*470 > Screen.width * 0.5 / Math.min(Screen.k_width, Screen.k_height)) {
				Title.size = Screen.width * 0.5 / Math.min(Screen.k_width, Screen.k_height);
			}
			else {
				Title.size = (MenuItem.starts - 2 * 20)/130*470;
			}
			//menu items start
			MenuItem.topSpace = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
			MenuItem.leftSpace = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - MenuItem.display * MenuItem.size - (MenuItem.display - 1) * 68 - 2 * 100*koef - 5) / 4;
			if(!Math.floor(2 * MenuItem.topSpace / MenuItem.size) > 0 && Math.floor(2 * MenuItem.leftSpace / MenuItem.size) > 0) {
				MenuItem.display = MenuItem.display + Math.floor( 2 * MenuItem.leftSpace / MenuItem.size);
				if(MenuItem.display > MenuItem.itemsCount) {
					MenuItem.display = MenuItem.itemsCount;
				}
				MenuItem.leftSpace = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - MenuItem.display * MenuItem.size - (MenuItem.display - 1) * 68 - 2 * 100*koef - 5) / 4;
			
			}
			if(MenuItem.firstItem + MenuItem.display > MenuItem.itemsCount) {
				MenuItem.firstItem = MenuItem.itemsCount - MenuItem.display;
			}
			t_a_width = 100*0.5;
			Task.topSpace = (MenuItem.size - 2 * t_a_width - (Task.display) * (55/368*MenuItem.size + 10) + 10) / 2;
			
			//Title.leftSpace = MenuItem.leftSpace;
			Title.leftSpace = 50;
			
			if(MenuItem.starts < Rewards.size){
				Rewards.topSpace =  MenuItem.ends + (Rewards.size - MenuItem.starts ) / 2;
			}
			else {
				Rewards.topSpace = MenuItem.ends + (MenuItem.starts - Rewards.size) / 2;
				
			}
			if(MenuItem.starts != MenuItem.starts) {
				Rewards.topSpace = MenuItem.topSpace + MenuItem.size + 20;
			}
			
			Rewards.leftSpace = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - 4 * Rewards.size - 3 * 68) / 2
			if((MenuItem.starts - 2 * 20)/137*470 > Screen.width * 0.5 / Math.min(Screen.k_width, Screen.k_height)) {
				Profile.size_btn = 75/(228 + 6 * 75) * (3 * (Title.size *130/479) - 3 * 2 * 5 + 2 * 5)*228/75;
			} else {
				Profile.size_btn = 75/(228 + 6 * 75) * (3 * MenuItem.starts - 3 * 2 * 20 - 3 * 2 * 5 + 2 * 5)*228/75;
			}
			initMenu();
			
			ctx.fillStyle="#000000";
			
		}
		
		/************************************Resizing ended***********************************************/
		
		function loadThumbnail(name){
			Thumbnails[name] = new Image;
			Thumbnails[name].src = '/img/Alphabet/'+ name + ' thumbnail.png';
			Thumbnails[name].addEventListener("load", function() {
				thumbnailLoaded = true;
			}, false);	
		}
		name = 'abc song';
		loadThumbnail(name);
		k1 = -1;
		function DrawMenuItem(j){
			var frame = Properties.Topics[j].Frame;
			ctx.drawImage(atlasMenuItem, frame.x, frame.y, frame.w, frame.h, Display.getTopic(j).x * Math.min(Screen.k_width, Screen.k_height), Display.getTopic(j).y * Math.min(Screen.k_width, Screen.k_height), Display.getTopic(j).w * Math.min(Screen.k_width, Screen.k_height), Display.getTopic(j).h * Math.min(Screen.k_width, Screen.k_height));
			var frame = Properties.Buttons['lock.png'];
			if(!Properties.Tasks[j].length) {
				drawLock(Display.getTopic(j).x + (Display.getTopic(j).w - frame.w / frame.h * Display.getTopic(j).h / 4) / 2, Display.getTopic(j).y + (Display.getTopic(j).h - Display.getTopic(j).h / 4) / 2, frame.w / frame.h * Display.getTopic(j).h / 4, Display.getTopic(j).h / 4);
			}
		}
		var atlasMenuItem = new Image();
		function drawMenuItems(){
			try{
				var j = MenuItem.firstItem; //порядок в спрайте
				while(j < MenuItem.firstItem + MenuItem.display){
					if(j != MenuItem.clicked - MenuItem.firstItem){
						var pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
						var pY =  MenuItem.topSpace;
						var pW = MenuItem.size;
						var pH = MenuItem.size;
						console.log("j = ", j);
						Display.setTopic(j, pX, pY, pW, pH);
						//DrawMenuItem(j, pX, pY, pW, pH);
						DrawMenuItem(j);
					}
					j = j + 1;
				}
				document.getElementById("Loading").style.visibility = "hidden";
			
			}
			catch(e){};
		}
		MenuItem.loadedMenuItems;
		function loadMenuItems(){
			atlasMenuItem.src = '/img/Menu-Items/menu-items.png';
			atlasMenuItem.addEventListener("load", function() {
				MenuItem.loadedMenuItems = true;
				drawMenuItems();
			})
		}
		var atlas = {};
		atlas.Animalsframe = new Image();
		Task.loadedAnimalsframe;
		function loadAnimals(){
			atlas.Animalsframe.src = '/img/Animals/animals.png';
			atlas.Animalsframe.addEventListener("load", function() {
				Task.loadedAnimalsframe = true;
			})
		}
		atlas.AnimalsWordsframe = new Image();
		Task.loadedAnimalsWordsframe;
		function loadAnimalsWords(){
			atlas.AnimalsWordsframe.src = '/img/Animals/animal-words.png';
			atlas.AnimalsWordsframe.addEventListener("load", function() {
				Task.loadedAnimalsWordsframe = true;
			})
		}
		atlas.Numbersframe = new Image();
		Task.loadedNumbersframe;
		function loadNumbers(){
			atlas.Numbersframe.src = '/img/Numbers/numbers.png';
			atlas.Numbersframe.addEventListener("load", function() {
				Task.loadedNumbersframe = true;
			})
		}
		atlas.NumbersWordsframe = new Image();
		Task.loadedNumbersWordsframe;
		function loadNumbersWords(){
			atlas.NumbersWordsframe.src = '/img/Numbers/number-words.png';
			atlas.NumbersWordsframe.addEventListener("load", function() {
				Task.loadedNumbersWordsframe = true;
			})
		}
		var atlasLetters = new Image();
		Task.loadedLetters;
		function loadLetters(){
			atlasLetters.src = '/img/Alphabet/letters.png';
			atlasLetters.addEventListener("load", function() {
				Task.loadedLetters = true;
			})
		}
		function clearMenuItemRect(x, y, width, height) {
			ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height) , width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));
		}
		function clearScreenRect(x, y, width, height) {
			ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height) , width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));
		}
		
		function drawLeftArrow() {
			var frame = Properties.Buttons["left-arrow.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("left-arrow.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("left-arrow.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("left-arrow.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("left-arrow.png").h * Math.min(Screen.k_width, Screen.k_height));
		}

		function drawRightArrow(){
			var frame = Properties.Buttons["right-arrow.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("right-arrow.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("right-arrow.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("right-arrow.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("right-arrow.png").h * Math.min(Screen.k_width, Screen.k_height));		
		}
		function drawBottomArrow() {
			var frame = Properties.Buttons["left-arrow.png"];
			pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
			pY =  MenuItem.topSpace + MenuItem.size;
			b_a_width = 100*0.5;
			b_a_height = 0.5*100*226/152;
			ctx.save();
			ctx.translate((pX + MenuItem.size / 2 - 3/4*b_a_width)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
			ctx.rotate(-Math.PI / 2);
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("bottom-arrow.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("bottom-arrow.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("bottom-arrow.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("bottom-arrow.png").h * Math.min(Screen.k_width, Screen.k_height));
			ctx.restore();
		}

		function drawTopArrow(){
			var frame = Properties.Buttons["left-arrow.png"];
			pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
			pY =  MenuItem.topSpace;
			t_a_width = 100*0.5;
			t_a_height = 0.5*100*226/152;
			ctx.save();
			ctx.translate((pX + MenuItem.size / 2 + 3/4*t_a_width)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
			ctx.rotate(Math.PI / 2);			
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("top-arrow.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("top-arrow.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("top-arrow.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("top-arrow.png").h * Math.min(Screen.k_width, Screen.k_height));		
			ctx.restore();
		}
		function drawTitle(x, y, width, height){
			var frame = Properties.Buttons["title.png"];
			if(!Mode.Mobile)
				ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height) , y * Math.min(Screen.k_width, Screen.k_height) , width * Math.min(Screen.k_width, Screen.k_height) , height * Math.min(Screen.k_width, Screen.k_height) );			
			else
				Menu_ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height) , y * Math.min(Screen.k_width, Screen.k_height) , width * Math.min(Screen.k_width, Screen.k_height) , height * Math.min(Screen.k_width, Screen.k_height) );			
		}
		function drawLock(x, y, width, height) {
			var frame = Properties.Buttons["lock.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));
		}
		function drawMenuButton() {
			var frame = Properties.Buttons["menu_btn.png"];
			if(!Mode.Menu)
				ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("menu_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("menu_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("menu_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("menu_btn.png").h * Math.min(Screen.k_width, Screen.k_height));
			else
				Menu_ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("menu_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("menu_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("menu_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("menu_btn.png").h * Math.min(Screen.k_width, Screen.k_height));
		}
		function drawRewardsButton(x, y, width, height){
			var frame = Properties.Buttons["rewards_btn.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawProgressButton(x, y, width, height){
			var frame = Properties.Buttons["progress_btn.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawPhrasesButton(x, y, width, height){
			var frame = Properties.Buttons["phrase_of_the_day_btn.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawQuizButton(x, y, width, height){
			var frame = Properties.Buttons["quiz_btn.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawLogInButton(x,y,width,height){
			var frame = Properties.Buttons["login_btn.png"];
			var LogIn = Display.getButton("login_btn.png");
			if(!Mode.Mobile)
				ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, LogIn.x * Math.min(Screen.k_width, Screen.k_height), LogIn.y * Math.min(Screen.k_width, Screen.k_height), LogIn.w * Math.min(Screen.k_width, Screen.k_height), LogIn.h * Math.min(Screen.k_width, Screen.k_height))
			else
				Menu_ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, LogIn.x * Math.min(Screen.k_width, Screen.k_height), LogIn.y * Math.min(Screen.k_width, Screen.k_height), LogIn.w * Math.min(Screen.k_width, Screen.k_height), LogIn.h * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawSignInButton(x, y, width,height){
			var frame = Properties.Buttons["sign_up_btn.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawSoundOnButton(x, y, width,height){
			var frame = Properties.Buttons["sound_on.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawSoundOffButton(x, y, width,height){
			var frame = Properties.Buttons["sound_off.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawPlayButton(x, y, width,height){
			var frame = Properties.Buttons["play_btn.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawStopButton(x, y, width,height){
			var frame = Properties.Buttons["stop_btn.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawPauseButton(x, y, width,height){
			var frame = Properties.Buttons["pause_btn.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawExitButton(x, y, width,height){
			var frame = Properties.Buttons["exit_btn.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawRestartButton(x, y, width,height){
			var frame = Properties.Buttons["restart_btn.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawHelpButton(x, y, width,height){
			var frame = Properties.Buttons["help_btn.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawInfoButton(x, y, width,height){
			var frame = Properties.Buttons["info_btn.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawSignInForm(x, y, width, height) {
			drawMenuItems()
			var frame = Properties.Forms["sign_in_form.png"];
			ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawResultForm(x, y, width, height) {
			var frame = Properties.Forms["result_form.png"];
			ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawResultOkayButton(x, y, width, height) {
			var frame = Properties.Forms["result_form_okay_btn.png"];
			ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawResultTryAgainButton(x, y, width, height) {
			var frame = Properties.Forms["result_form_try_again_btn.png"];
			ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawDigit(n, x, y, width, height, type = "") {
			if(type != "")
				type = type + "-";
			var frame = Properties.Numbers[type + n + ".png"];
			ctx.drawImage(atlas.Numbersframe, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawLetter(n, x, y, width, height, type = "") {
			if(type != "")
				type = type + "-";
			var frame = Properties.Letters[type + n + ".png"];
			ctx.drawImage(atlasLetters, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawLogInForm(x, y, width, height) {
			var frame = Properties.Forms["log_in_form.png"];
			ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawLogInCancelButton(x, y, width, height) {
			var frame = Properties.Forms["log_in_form_cancel_btn.png"];
			var button = Display.getButton("log_in_form_cancel_btn.png");
			if(!Mode.Mobile)
				ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, button.x * Math.min(Screen.k_width, Screen.k_height), button.y * Math.min(Screen.k_width, Screen.k_height), button.w * Math.min(Screen.k_width, Screen.k_height), button.h * Math.min(Screen.k_width, Screen.k_height))
			else
				Menu_ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, button.x * Math.min(Screen.k_width, Screen.k_height), button.y * Math.min(Screen.k_width, Screen.k_height), button.w * Math.min(Screen.k_width, Screen.k_height), button.h * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawLogInLogInButton() {
			var frame = Properties.Forms["log_in_form_login_btn.png"];
			var button = Display.getButton("log_in_form_login_btn.png");
			ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, button.x * Math.min(Screen.k_width, Screen.k_height), button.y * Math.min(Screen.k_width, Screen.k_height), button.w * Math.min(Screen.k_width, Screen.k_height), button.h * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawSignInSignInButton(x, y, width, height) {
			var frame = Properties.Forms["sign_in_form_signin_btn.png"];
			ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawSignInSaveButton(x, y, width, height) {
			var frame = Properties.Forms["sign_in_form_save_btn.png"];
			ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawSignInCancelButton(x, y, width, height) {
			var frame = Properties.Forms["sign_in_form_cancel_btn.png"];
			ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawProfilePicture(x, y, width, height) {
			var frame = Properties.Buttons["profile_girl1.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		
		function drawCorrect(x, y, width, height) {
			var frame = Properties.Buttons["correct.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawWrong(x, y, width, height) {
			var frame = Properties.Buttons["wrong.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawRedHeart(x, y, width, height) {
			var frame = Properties.Buttons["red-heart.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawHeart(x, y, width, height) {
			var frame = Properties.Buttons["heart.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawDarkStar(x, y, width, height) {
			var frame = Properties.Buttons["dark-star.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawStar(x, y, width, height) {
			var frame = Properties.Buttons["star.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawTap(x, y, width, height) {
			var frame = Properties.Buttons["tap.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawDrag(x, y, width, height) {
			var frame = Properties.Buttons["drag-flick.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawHold(x, y, width, height) {
			var frame = Properties.Buttons["touch-and-hold.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawSkip(x, y, width, height) {
			var frame = Properties.Buttons["skip.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function fillRect(x, y, width, height) {
			ctx.fillRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function clearRect(x, y, width, height) {
			ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function clearRectRect(rect) {
			ctx.clearRect(rect.x * Math.min(Screen.k_width, Screen.k_height), rect.y * Math.min(Screen.k_width, Screen.k_height), rect.w * Math.min(Screen.k_width, Screen.k_height), rect.h * Math.min(Screen.k_width, Screen.k_height))
		}
		function fillRectYellow(x, y, width, height) {
			ctx.fillStyle="#F7FE2E";
			if(!Mode.Menu)
				ctx.fillRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
			else
				Menu_ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function fillRectGreen(x, y, width, height) {
			ctx.fillStyle="#7cc576";
			if(!Mode.Menu)
				ctx.fillRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
			else
				Menu_ctx.fillRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function PointInRect(Point, Rect) {
			if(Point.x >= Rect.x* Math.min(Screen.k_width, Screen.k_height) && Point.x <= (Rect.x + Rect.w)* Math.min(Screen.k_width, Screen.k_height) && Point.y >= Rect.y * Math.min(Screen.k_width, Screen.k_height) && Point.y <= (Rect.y + Rect.h)* Math.min(Screen.k_width, Screen.k_height))
				return true
			return false;
		}
		function mouseInRect(x, y, width, height) {
			try{
				if(mouseX >= x.x* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (x.x + x.w)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= x.y* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (x.y + x.h)* Math.min(Screen.k_width, Screen.k_height)){
					return true;
				}
				return false;
			}
			catch(e) {
				if(mouseX >= x* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (x + width)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= y* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (y + height)* Math.min(Screen.k_width, Screen.k_height)) {
					return true;
				}
				return false;
			}
		}
		function speak(Word) {
			try {
				if(sound_on)
					responsiveVoice.speak(Word, Profile.Accent);
			}
			catch(e){};
		}
		/*function speak(Word) {
			var w = new SpeechSynthesisUtterance();
			w.text = Word;
			w.lang = 'en-US';
			speechSynthesis.speak(w);
		}*/
		var Forms_loaded = false;
		var atlasForms = new Image();
		function loadForms(){
			atlasForms.src = '/img/Forms/forms.png';
			atlasForms.addEventListener("load", function() {
				Forms_loaded = true;
			}, false);	
		}
		var atlasButtons = new Image();

		var loadedButtons;
		function loadButtons(/*l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height*/){
			atlasButtons.src = '/img/Menu-Items/buttons.png';
			atlasButtons.addEventListener("load", function() {
					//drawButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height);
					//title
					//drawTitle(Title.leftSpace, 20, Title.size, Title.size * 130/470);	
					loadedButtons  = true;
					
			}, false);	
		}
				
		function drawButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height) {
			if(Mode.MenuItem) {
				//left arrow
				Display.setButton("left-arrow.png", l_a_x, l_a_y, l_a_width, l_a_height);
				if(MenuItem.firstItem) {
					drawLeftArrow();
				}
				//right arrow
				if(MenuItem.firstItem + MenuItem.display < MenuItem.itemsCount) {
					Display.setButton("right-arrow.png", r_a_x, r_a_y, r_a_width, r_a_height);
					drawRightArrow();
				}
			}
			if(!Mode.Mobile) {
				if(!Mode.Exercise) {
					fillRectYellow(0, MenuItem.ends, Screen.width/ Math.min(Screen.k_width, Screen.k_height), 1000)
					//Rewards
					Display.setButton("rewards_btn.png",Rewards.leftSpace, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
					drawRewardsButton(Rewards.leftSpace, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
					//Progress button
					Display.setButton("progress_btn.png", Rewards.leftSpace + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
					drawProgressButton(Rewards.leftSpace + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
					//Phrases button
					Display.setButton("phrase_of_the_day_btn.png", Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
					drawPhrasesButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
					//Quiz button
					Display.setButton("quiz_btn.png", Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
					drawQuizButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				}
				if(!Profile.LoggedIn) {
					//Log in button
					Display.setButton("login_btn.png", (Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
					drawLogInButton();
					//Sign in button
					drawSignInButton((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) -  Profile.size_btn - Title.leftSpace, (20 + 5) + Profile.size_btn*75/228, Profile.size_btn, Profile.size_btn*75/228);
				}
				else {
					drawProfilePicture(((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace) + Profile.size_btn * 1/ 6, 20, Profile.size_btn * 2/3, Profile.size_btn * 2/ 3);
				}
				//Sound on button
				
				if(sound_on)
					drawSoundOnButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				else
					drawSoundOffButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				//Help button
				drawHelpButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2 * 5) / 3, (Profile.size_btn - 2 * 5) / 3)		
				//Info button
				drawInfoButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + 5 + (Profile.size_btn - 2 * 5)/3 + (Profile.size_btn - 2 * 5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
			}
			else if(Mode.Menu) {
				if(Screen.width < Screen.height) {
					var frame = Properties.Buttons["login_btn.png"];
					var button_frame = {};
					button_frame.y = MenuItem.starts + 20;
					button_frame.h = (MenuItem.ends - MenuItem.starts - 7 * 20) / 7;
					button_frame.w = frame.w / frame.h * button_frame.h;
					if(button_frame.w + 2 * 20 > Screen.width / Math.min(Screen.k_width, Screen.k_height)) {
						button_frame.w = Screen.width / Math.min(Screen.k_width, Screen.k_height) - 2 * 20;
						button_frame.h = frame.h / frame.w * button_frame.w;
					}
					button_frame.x = 20 + (Screen.width / Math.min(Screen.k_width, Screen.k_height) - button_frame.w - 2* 20) / 2;
				}
				Display.setButton("login_btn.png", button_frame.x, button_frame.y, button_frame.w, button_frame.h);
				drawLogInButton();
			}
		}
		/************************************Starting*******************************************************/
		
		function showForms() {
			if(Mode.LogIn){
				showLogInForm()
			}
			else if(Mode.SignIn) {
				showSignInForm()
			}
		}
		function readyToShowForms() {
			if(MenuItem.loadedMenuItems && loadedButtons) {
				showForms()
			}
			else
			{
				setTimeout(function(){
					readyToShowForms()
				}, 1);
			}
		}
		function checkLoadButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height) {
			if(loadedButtons) {
				drawButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height);
				//title
				if(!Mode.Mobile) {
					drawTitle(Title.leftSpace, 20, Title.size, Title.size*130/470);
				}
				else {
					var frame = Properties.Buttons["menu_btn.png"];
					var MenuFrame = {};
					MenuFrame.x = Title.leftSpace;
					MenuFrame.y = 20;
					MenuFrame.h = MenuItem.starts - 2 * 20;
					MenuFrame.w = frame.w / frame.h * MenuFrame.h;
					Display.setButton("menu_btn.png", MenuFrame.x, MenuFrame.y, MenuFrame.w, MenuFrame.h);
					drawMenuButton();
				}
			}
			else {
				loadButtons(/*l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height*/);
				setTimeout(function(){
					checkLoadButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height);
				}, 10);
			}
		}
		function drawHeader() {
			ctx.fillStyle="#F7FE2E";
			ctx.fillRect(0, 0, Screen.width, MenuItem.starts * Math.min(Screen.k_width, Screen.k_height));
			if(!Mode.Exercise && !Mode.Mobile)
				ctx.fillRect(0, MenuItem.ends, Screen.width, Screen.height - MenuItem.ends * Math.min(Screen.k_width, Screen.k_height));
			
			var l_a_x = MenuItem.leftSpace;
			var l_a_width = 100*koef;
			var l_a_height = koef*100*226/152;
			var l_a_y =  MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2;
			
			var r_a_height = koef*100*226/152;
			var r_a_y =  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2;
			var r_a_width = koef*100;
			var r_a_x = MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width;
			checkLoadButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height);
			
			
			if(Profile.LoggedIn) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4)
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4)
				
				
				drawProfilePicture(((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace) + Profile.size_btn * 1/ 6, 20, Profile.size_btn * 2/3, Profile.size_btn * 2/ 3)
				
			}
		}
		function initMenu() {
			if(!Mode.Menu) {
				if(!Mode.Exercise) {
					drawHeader();
					if(MenuItem.loadedMenuItems) {
						drawMenuItems();
					}
					else {
						loadMenuItems();
					}
					if(MenuItem.clicked > -1) {
						MenuItemClicked(MenuItem.clicked);

					}
				}
				else {
					if(Mode.Exercise && !Mode.MusicVideo && !Mode.Results) {
						document.getElementById("Loading").style.visibility = "hidden";
						drawHeader();
						drawTest();					
					}
					else if(!Mode.MusicVideo){
						document.getElementById("Loading").style.visibility = "hidden";
						drawHeader();
						showResultForm(Task.Result.Answers, Task.Total, Task.MaxPoint);
					}
					
					if(Mode.MusicVideo) {
						drawHeader();
						var size_btn = 70;
						drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
						displayVideo();
					}
				}
			}
			else {
				drawHeader();
			}
			loadForms();
			loadNumbers();
			loadLetters();
			readyToShowForms();
			loadButtons();
		}

		var mouseX;
		var mouseY;
		MainCanvas.addEventListener("touchmove", checkPosMenuItem, false);
		MainCanvas.addEventListener("mousemove", checkPosMenuItem);
		
		function checkPosMenuItem(mouseEvent){
			event.preventDefault();
			try {
				var touch = mouseEvent.changedTouches[0];
				var rect = MainCanvas.getBoundingClientRect();
				var scaleX = MainCanvas.width / rect.width;
				var scaleY = MainCanvas.height / rect.height;
				mouseX = (touch.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
				mouseY = (touch.clientY - rect.top) * scaleY;
			}
			catch(e) {
			var rect = MainCanvas.getBoundingClientRect(),
				scaleX = MainCanvas.width / rect.width;
				scaleY = MainCanvas.height / rect.height;
				mouseX = (mouseEvent.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
				mouseY = (mouseEvent.clientY - rect.top) * scaleY;
				
			}
			HoverMenuItem(mouseX, mouseY);
		}
		function checkPosMenu(mouseEvent){
			event.preventDefault();
			try {
				var touch = mouseEvent.changedTouches[0];
				var rect = MenuCanvas.getBoundingClientRect();
				var scaleX = MenuCanvas.width / rect.width;
				var scaleY = MenuCanvas.height / rect.height;
				mouseX = (touch.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
				mouseY = (touch.clientY - rect.top) * scaleY;
			}
			catch(e) {
			var rect = MenuCanvas.getBoundingClientRect(),
				scaleX = MenuCanvas.width / rect.width;
				scaleY = MenuCanvas.height / rect.height;
				mouseX = (mouseEvent.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
				mouseY = (mouseEvent.clientY - rect.top) * scaleY;
				
			}
			HoverMenuItem(mouseX, mouseY);
		}
		
		function SignInNewUser(Profile) {
			socket.emit('newUser', {
				User: Profile
			})
			socket.on('newUser', function(data){
				return data.res;
			})
			return false;
		}
		function checkProfileData(UserName, Password) {
			
			if(Password != "" && UserName != "")
				return true;
			return false;
		}
		function checkPoint(Point, Array) {
			var i = 0;
			while(i < Array.length) {
				if(PointInRect(Point, Array[i])) {
					return i;
					i = Array.length + 1;
				}
				else {
					i++;
				}
			}
			return i;
		}
		function countCorrect(Answers) {
			var count = 0;
			var a = Answers.slice(0);
			for( var i = 0; i < a.length; i++) {
				if(a[i].Attempts > 0)
					count++;
			}
			return count;
		}
		var k = -1;
		var k1 = -1;
		var k2 = -1; // hovering what word
		var k3 = -1; //pressing what word
		var Pressed = {}; //for coordinates of clicked point
		var l_a_ch = false;
		var r_a_ch = false;
		var login_ch = false;
		var signin_ch = false;
		var rewards_ch = false;
		var progress_ch = false;
		var phrases_ch = false;
		var quiz_ch = false;
		var sound_ch = false;
		var help_ch = false;
		var task_ch = false;
		var b_a_ch = false;
		var t_a_ch = false;
		var info_ch = false;
		var log_in_btn = false;
		var cancel_btn = false;
		var info_ch = false;
		var sign_in_btn = false;
		var cancel_btn = false;
		var play_btn_ch = false;
		var pause_btn_ch = false;
		var stop_btn_ch = false;
		var restart_btn_ch = false;
		var exit_btn_ch = false;
		var word_ch = false;
		var try_again_ch = false;
		var okay_ch = false;
		var skip_ch = false;
		var menu_btn_ch = false;
		function HoverMenuItem(mouseX, mouseY){
			//left arrow has been hovered
			if(Mode.MenuItem && MenuItem.firstItem > 0) {
				if (!(l_a_ch) && mouseInRect(Display.getButton("left-arrow.png"))) {	
					clearMenuItemRect(Display.getButton("left-arrow.png").x, Display.getButton("left-arrow.png").y, Display.getButton("left-arrow.png").w, Display.getButton("left-arrow.png").h);
					Display.expandButton("left-arrow.png", 5);
					drawLeftArrow();
					l_a_ch = true;
				}else if ((l_a_ch) && !(mouseX >= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.leftSpace - 5) && mouseX <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.leftSpace + koef*100 + 5) && mouseY >=  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2 - 5)  && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2 + koef*100*226/152 + 5) )) {	
					clearMenuItemRect(Display.getButton("left-arrow.png").x, Display.getButton("left-arrow.png").y, Display.getButton("left-arrow.png").w, Display.getButton("left-arrow.png").h);
					Display.expandButton("left-arrow.png", -5);
					drawLeftArrow();
					l_a_ch = false;
				}
			}
			//right arrow is hovered
			if(Mode.MenuItem && (MenuItem.firstItem + MenuItem.display < MenuItem.itemsCount)){
				if (!(r_a_ch) && (mouseInRect(Display.getButton("right-arrow.png")))) {	
					clearMenuItemRect(Display.getButton("right-arrow.png").x, Display.getButton("right-arrow.png").y, Display.getButton("right-arrow.png").w, Display.getButton("right-arrow.png").h);
					Display.expandButton("right-arrow.png", 5);
					drawRightArrow();
					r_a_ch = true;
				}
				else if ((r_a_ch) && !(mouseInRect(Display.getButton("right-arrow.png")))) {
					clearMenuItemRect(Display.getButton("right-arrow.png").x, Display.getButton("right-arrow.png").y, Display.getButton("right-arrow.png").w, Display.getButton("right-arrow.png").h);
					Display.expandButton("right-arrow.png", -5);
					drawRightArrow();
					r_a_ch = false;
				}
			}
			// menu tasks has been hovered
			if(Mode.Tasks && (MenuItem.clicked > -1) && (mouseY >= MenuItem.topSpace * Math.min(Screen.k_width, Screen.k_height) && mouseY <= (MenuItem.topSpace + MenuItem.size) * Math.min(Screen.k_width, Screen.k_height))) {
				i = 0;
				t_a_width = 100*0.5;
				//pX = MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem - MenuItem.firstItem);
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace;
				while (i < Task.display) {
					//if(k1 == -1 && !(task_ch) && mouseInRect(pX, pY + (55/ 368 * MenuItem.size + 10) * i + t_a_width + Task.topSpace, MenuItem.size, 55/368*MenuItem.size)){
					if(k1 == -1 && !(task_ch) && mouseInRect(Display.getTask(MenuItem.clicked, Task.firstTask + i))){
						if(Properties.Tasks[MenuItem.clicked][Task.firstTask + i].Content) {
							ctx.clearRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY  + (55 / 368 * MenuItem.size + 10) * i + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height), (MenuItem.size)*Math.min(Screen.k_width, Screen.k_height), (55/ 368 * MenuItem.size)*Math.min(Screen.k_width, Screen.k_height));
							drawTask(MenuItem.clicked, Task.firstTask + i, pX - 3, pY + (55 / 368 * MenuItem.size + 10) * i  + t_a_width + Task.topSpace - 3,  MenuItem.size + 6, 55/368*MenuItem.size + 6)
							k1 = i;
							task_ch = true;
						}
						i = Task.display + 1;
					}
					else{
						i = i + 1;
					}
				}
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace;
				if((Mode.Tasks && (MenuItem.clicked > -1) && !(mouseY >= pY  + (55 / 368 * MenuItem.size + 10) * k1 + t_a_width + Task.topSpace * Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY  + (55 / 368 * MenuItem.size + 10) * k1 + t_a_width + Task.topSpace + MenuItem.size) * Math.min(Screen.k_width, Screen.k_height)))&& (k1 > -1 && task_ch && !(mouseX >= (pX - 3)*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + MenuItem.size + 6)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY + (55/ 368 * MenuItem.size + 10) * k1 + t_a_width + Task.topSpace - 3)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY  + (55 / 368 * MenuItem.size + 10) * k1 + t_a_width + Task.topSpace + 55/368*MenuItem.size + 6)*Math.min(Screen.k_width, Screen.k_height)))){
					ctx.clearRect((pX-3)*Math.min(Screen.k_width, Screen.k_height), (pY  + (55 / 368 * MenuItem.size + 10) * k1 + t_a_width + Task.topSpace - 3)*Math.min(Screen.k_width, Screen.k_height), (MenuItem.size + 6)*Math.min(Screen.k_width, Screen.k_height), (55/ 368 * MenuItem.size + 6)*Math.min(Screen.k_width, Screen.k_height));
					drawTask(MenuItem.clicked, Task.firstTask + k1, pX, pY + (55 / 368 * MenuItem.size + 10) * k1  + t_a_width + Task.topSpace,  MenuItem.size, 55/368*MenuItem.size)
					k1 = -1;
					task_ch = false;
				}
			}
			
			//top arrow has been hovered
			if(Mode.Tasks && (Task.firstTask > 0)) {
				if(MenuItem.clicked > -1) {
					if(!(t_a_ch) && mouseInRect(Display.getButton("top-arrow"))){
						clearRectRect(Display.getButton("top-arrow"));
						t_a_ch = true;
						Display.expandButton("top-arrow.png", 5);
						Display.expandButton("top-arrow", 5);
						drawTopArrow();
					}
					else if (Mode.Tasks && t_a_ch && !(mouseInRect(Display.getButton("top-arrow")))){
						t_a_ch = false;
						clearRectRect(Display.getButton("top-arrow"));
						Display.expandButton("top-arrow.png", -5);
						Display.expandButton("top-arrow", -5);
						drawTopArrow();
					}
					
				}
			}
			if(Mode.Tasks && (Task.firstTask + Task.display < Task.itemsCount[MenuItem.clicked])) {
			//bottom arrow hovered
				if(MenuItem.clicked > -1) {
					if(!(b_a_ch) && mouseInRect(Display.getButton("bottom-arrow"))){
						b_a_ch = true;
						clearRectRect(Display.getButton("bottom-arrow"));
						Display.expandButton("bottom-arrow.png", 5);
						Display.expandButton("bottom-arrow", 5);
						drawBottomArrow();
						
					}
					//else if((b_a_ch) && !(mouseInRect(pX - 5, pY - 5, b_a_width + 10, b_a_height + 10))){
					else if((b_a_ch) && !(mouseInRect(Display.getButton("bottom-arrow")))){
						b_a_ch = false;
						clearRectRect(Display.getButton("bottom-arrow"));
						Display.expandButton("bottom-arrow.png", -5);
						Display.expandButton("bottom-arrow", -5);
						drawBottomArrow();
					}
					
				}
			}
			//Menu items hovered
			var i = 0;
			while (Mode.MenuItem && (i < MenuItem.display)) {
				//if((k == -1) && mouseY >= Math.min(Screen.k_width, Screen.k_height) * MenuItem.topSpace   && mouseY <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.size + MenuItem.topSpace) && (mouseX >= Math.min(Screen.k_width, Screen.k_height) * X_l && mouseX <= Math.min(Screen.k_width, Screen.k_height) * X_r)){
				if((k == -1) && mouseInRect(Display.getTopic(i + MenuItem.firstItem))){
					if(MenuItem.clicked - MenuItem.firstItem != i){
						if(Properties.Tasks[i + MenuItem.firstItem].length) {
							k = i;
							Display.expandTopic(i + MenuItem.firstItem, 10);
							DrawMenuItem(i + MenuItem.firstItem);
						}
						i = MenuItem.display + 1;
					}
					else{
						i = MenuItem.display + 1;
					}
				}
				else {
					i++;
				}
				
			}
			
				if (Mode.MenuItem && (k > -1) && !(mouseInRect(Display.getTopic(k + MenuItem.firstItem)))){
					clearRect(Display.getTopic(k + MenuItem.firstItem).x, Display.getTopic(k + MenuItem.firstItem).y, Display.getTopic(k + MenuItem.firstItem).w, Display.getTopic(k + MenuItem.firstItem).h);
					Display.expandTopic(k + MenuItem.firstItem, -10);
					DrawMenuItem(k + MenuItem.firstItem);
					k = -1;
					
				}
			//Login button hovered
			if (((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.Exercise && !Profile.LoggedIn && !Mode.LogIn && !Mode.SignIn &&!login_ch && mouseInRect(Display.getButton("login_btn.png"))) {
				fillRectYellow(Display.getButton("login_btn.png").x, Display.getButton("login_btn.png").y, Display.getButton("login_btn.png").w, Display.getButton("login_btn.png").h);
				var n = 2;
				if(Mode.Menu)
					n = 10;
				Display.expandButton("login_btn.png", n);
				drawLogInButton();
				login_ch = true;
			}
			else if(((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.Exercise && !Profile.LoggedIn && !Mode.LogIn && !Mode.SignIn &&login_ch && !(mouseInRect(Display.getButton("login_btn.png")))) {
				if(!Profile.LoggedIn) {
					fillRectYellow(Display.getButton("login_btn.png").x, Display.getButton("login_btn.png").y, Display.getButton("login_btn.png").w, Display.getButton("login_btn.png").h);
					var n = 2;
					if(Mode.Menu)
						n = 10;
					Display.expandButton("login_btn.png", -n);
					drawLogInButton();
					login_ch = false;
				}
			}
			//Sign in button hovered###
			if (!Mode.Mobile && !Mode.Exercise && !Profile.LoggedIn && !Mode.LogIn && !Mode.SignIn && !signin_ch && mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace) * Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + Profile.size_btn) * Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace, (20 + 5) + Profile.size_btn*75/228 + 3, Profile.size_btn, Profile.size_btn*75/228);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace, (20 + 5) + Profile.size_btn*75/228 + 3, Profile.size_btn, Profile.size_btn*75/228);
				drawSignInButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4)
				signin_ch = true;
			}
			else if(!Mode.Mobile && !Mode.Exercise && !Profile.LoggedIn && !Mode.LogIn && !Mode.SignIn &&signin_ch && !(mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace) * Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + Profile.size_btn) * Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4)
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4)
				drawSignInButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) -Profile.size_btn - Title.leftSpace, (20 + 5) + Profile.size_btn*75/228, Profile.size_btn, Profile.size_btn*75/228);
				signin_ch = false;
			}
			//rewards button
			//if (!Mode.Mobile && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&!rewards_ch && mouseX >= (Rewards.leftSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
			if (!Mode.Mobile && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&!rewards_ch && mouseInRect(Display.getButton("rewards_btn.png"))) {
				clearScreenRect(Rewards.leftSpace, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				fillRectYellow(Rewards.leftSpace, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				Display.expandButton("rewards_btn.png", 5);
				drawRewardsButton(Rewards.leftSpace - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				rewards_ch = true;
			}
			else if(!Mode.Mobile && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&rewards_ch && !(mouseX >= (Rewards.leftSpace - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect(Rewards.leftSpace - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				fillRectYellow(Rewards.leftSpace - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				Display.expandButton("rewards_btn.png", -5);
				drawRewardsButton(Rewards.leftSpace, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				rewards_ch = false;
			}
			//Progress button hovered
			//if (!Mode.Mobile && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&!progress_ch && mouseX >= (Rewards.leftSpace + Rewards.size + 68)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
			if (!Mode.Mobile && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&!progress_ch && mouseInRect(Display.getButton("progress_btn.png"))) {
				clearScreenRect(Rewards.leftSpace + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				fillRectYellow(Rewards.leftSpace + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				drawProgressButton(Rewards.leftSpace + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				progress_ch = true;
			}
			else if(!Mode.Mobile && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&progress_ch && !(mouseInRect(Display.getButton("progress_btn.png")))) {
				clearScreenRect(Rewards.leftSpace + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				fillRectYellow(Rewards.leftSpace + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				drawProgressButton(Rewards.leftSpace + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				progress_ch = false;
			}
			
			//Phrases button hovered
			if (!Mode.Mobile && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&!phrases_ch && mouseInRect(Display.getButton("phrase_of_the_day_btn.png"))) {
				clearScreenRect(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				fillRectYellow(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				drawPhrasesButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				phrases_ch = true;
			}
			else if(!Mode.Mobile && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&phrases_ch && !(mouseInRect(Display.getButton("phrase_of_the_day_btn.png")))) {
				clearScreenRect(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				fillRectYellow(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				drawPhrasesButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				
				phrases_ch = false;
			}
			//Quiz button has been hovered
			if (!Mode.Mobile && !Mode.Exercise && !Mode.LogIn && !Mode.SignIn &&!quiz_ch && mouseX >= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + Rewards.size + 68+ Rewards.size + 68)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
				clearScreenRect(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				fillRectYellow(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				drawQuizButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				quiz_ch = true;
			}
			else if(!Mode.Mobile && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&quiz_ch && !(mouseX >= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 + Rewards.size + 68 - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + Rewards.size + 68+ Rewards.size + 68 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				fillRectYellow(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				drawQuizButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				quiz_ch = false;
			}
			//sound button hovered
			if (!Mode.Mobile && !Mode.LogIn && !Mode.SignIn &&!sound_ch && mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height)) {
				clearScreenRect((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				fillRectYellow((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				if(sound_on) {
					drawSoundOnButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				}
				else {
					drawSoundOffButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height)- Profile.size_btn - Title.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				}
				
				sound_ch = true;
			}
			else if(!Mode.Mobile && !Mode.LogIn && !Mode.SignIn &&sound_ch && !(mouseX >= ((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				fillRectYellow((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				if(sound_on) {
					drawSoundOnButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				}
				else {
					drawSoundOffButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				}
				sound_ch = false;
			}
			//help button has been hovered
			//drawHelpButton((Screen.width - 150*75/228)/ Math.min(Screen.k_width, Screen.k_height)- MenuItem.leftSpace + 150/3 + 5, (20 + 5) + 150*75/228 + 3 + 150*75/228 + 5, 150 / 3, 150 / 3)		
			if (!Mode.Mobile && !Mode.LogIn && !Mode.SignIn &&!help_ch && mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn- Title.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height)) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + (Profile.size_btn - 2*5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + (Profile.size_btn - 2*5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				drawHelpButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + (Profile.size_btn - 2*5)/3 + 5 - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				help_ch = true;
			}
			else if(!Mode.Mobile && !Mode.LogIn && !Mode.SignIn &&help_ch && !(mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + (Profile.size_btn - 2*5)/3 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height)- Profile.size_btn - Title.leftSpace + (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + (Profile.size_btn - 2*5)/3 + 5 - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + (Profile.size_btn - 2*5)/3 + 5 - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				drawHelpButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + (Profile.size_btn-2*5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				help_ch = false;
			}
			//Info button has been hovered
			if (!Mode.Mobile && !Mode.LogIn && !Mode.SignIn &&!info_ch&& mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5+ (Profile.size_btn - 2 * 5)/3 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn- Title.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5 + (Profile.size_btn - 2*5) / 3+ (Profile.size_btn - 2 * 5)/3 + 5 )* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height)) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn - 2*5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn - 2*5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				drawInfoButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace+ (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn - 2*5)/3 + 5 - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				info_ch = true;
			}
			else if(!Mode.Mobile && !Mode.LogIn && !Mode.SignIn &&info_ch && !(mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5+ (Profile.size_btn - 2 * 5)/3 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn- Title.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5 + (Profile.size_btn - 2*5) / 3+ (Profile.size_btn - 2 * 5)/3 + 5 )* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace+ (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn - 2*5)/3 + 5 - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace+ (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn - 2*5)/3 + 5 - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				drawInfoButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace+ (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn-2*5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				info_ch = false;
			}
				
			/*if(Mode.LogIn && mouseInRect((Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size *4/3) / 205 * 368)/2, MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size * 4/3) / 2, (MenuItem.size *4/3) / 205 * 368, MenuItem.size * 4/3)) {
				//log in area
			}
					
			if(Mode.SignIn && mouseInRect((Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size *3/2))/2, MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size * 3/2) / 2, (MenuItem.size *6/4), MenuItem.size * 6/4)) {
				//sign in area
			}*/
			//Login form login button has been hovered
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
			Y_ = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
			if (Mode.LogIn && !log_in_btn && mouseInRect(Display.getButton("log_in_form_login_btn.png"))) {
				clearScreenRect(X_ + 49, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202);
				Display.expandButton("log_in_form_login_btn.png", 2);
				drawLogInLogInButton();
				log_in_btn = true;
			}
			else if(Mode.LogIn && log_in_btn && !(mouseInRect(Display.getButton("log_in_form_login_btn.png")))) {
				clearScreenRect(X_ + 49 - 2, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40 - 2, (MenuItem.size) / 202 * 156 + 4, MenuItem.size * 37 / 202 + 4);
				log_in_btn = false;
				X_1 = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_1 = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_ = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
				drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
				Display.expandButton("log_in_form_login_btn.png", -2);
				drawLogInLogInButton();
				drawLogInCancelButton();
			}
			//Cancel button has been hovered during login mode
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
			Y_ = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
			if (Mode.LogIn && !cancel_btn && mouseInRect(Display.getButton("log_in_form_cancel_btn.png"))) {
				clearScreenRect(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202);
				Display.expandButton("log_in_form_cancel_btn.png", 2);
				drawLogInCancelButton();
				cancel_btn = true;
			}
			else if(Mode.LogIn && cancel_btn && !(mouseInRect(Display.getButton("log_in_form_cancel_btn.png")))) {
				clearScreenRect(X_ + 49 + (MenuItem.size) / 202 * 156 + 35 - 2, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40 - 2, (MenuItem.size) / 202 * 156 + 4, MenuItem.size * 37 / 202 + 4);
				cancel_btn = false;
				X_1 = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_1 = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
				
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_ = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
				drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
				drawLogInLogInButton();
				Display.expandButton("log_in_form_cancel_btn.png", -2);
				drawLogInCancelButton();
			}
			
			//Signin button hovered SignIn mode
			Y_ = (MenuItem.topSpace + MenuItem.starts) / 2
			size_ = 2*(Y_ -  MenuItem.starts) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			//if (Mode.SignIn && !sign_in_btn && mouseInRect(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)) {
			if (Mode.SignIn && !sign_in_btn && mouseInRect(Display.getButton("sign_in_form_signin_btn.png"))) {
				clearScreenRect(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156);
				drawSignInSignInButton(X_ + 20 / 368 * size_ - 2, Y_ + 318 / 368 * size_ - 2, 157 / 368 * size_ + 4, 157 / 368 * size_ * 37 / 156 + 4)
				sign_in_btn = true;
			}
			//else if(Mode.SignIn && sign_in_btn && !(mouseInRect(X_ + 20 / 368 * size_ - 2, Y_ + 318 / 368 * size_ - 2, 157 / 368 * size_ + 4, 157 / 368 * size_ * 37 / 156 + 4))) {
			else if(Mode.SignIn && sign_in_btn && !(mouseInRect(Display.getButton("sign_in_form_signin_btn.png")))) {
				clearScreenRect(X_ + 20 / 368 * size_ - 2, Y_ + 318 / 368 * size_ - 2, 157 / 368 * size_ + 4, 157 / 368 * size_ * 37 / 156 + 4);
				sign_in_btn = false;
				Y_ = (MenuItem.topSpace + MenuItem.starts) / 2
				size_ = 2*(Y_ -  MenuItem.starts) + MenuItem.size;
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
				drawSignInForm(X_, Y_, size_, size_);
				if(NewAccent == "US English Female")
					AmericanAccent()
				if(NewAccent == "Australian Female")
					AustralianAccent()
				if(NewAccent == "UK English Male")
					BritishAccent()
				drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			}
			
			//Cancel button hovered SignIn mode
			Y_ = (MenuItem.topSpace + MenuItem.starts) / 2
			size_ = 2*(Y_ -  MenuItem.starts) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			//if (Mode.SignIn && !cancel_btn && mouseInRect(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)) {
			if (Mode.SignIn && !cancel_btn && mouseInRect(Display.getButton("sign_in_form_cancel_btn.png"))) {
				clearScreenRect(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156);
				drawSignInCancelButton(X_ + 190 / 368 * size_ - 2, Y_ + 318 / 368 * size_ - 2, 157 / 368 * size_ + 4, 157 / 368 * size_ * 37 / 156 + 4)
				cancel_btn = true;
			}
			//else if(Mode.SignIn && cancel_btn && !(mouseInRect(X_ + 190 / 368 * size_ - 2, Y_ + 318 / 368 * size_ - 2, 157 / 368 * size_ + 4, 157 / 368 * size_ * 37 / 156 + 4))) {
			else if(Mode.SignIn && cancel_btn && !(mouseInRect(Display.getButton("sign_in_form_cancel_btn.png")))) {
				clearScreenRect(X_ + 20 / 368 * size_ - 2, Y_ + 318 / 368 * size_ - 2, 157 / 368 * size_ + 4, 157 / 368 * size_ * 37 / 156 + 4);
				cancel_btn = false;
				Y_ = (MenuItem.topSpace + MenuItem.starts) / 2
				size_ = 2*(Y_ - MenuItem.starts) + MenuItem.size;
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
				drawSignInForm(X_, Y_, size_, size_);
				if(NewAccent == "US English Female")
						AmericanAccent()
				if(NewAccent == "Australian Female")
						AustralianAccent()
				if(NewAccent == "UK English Male")
						BritishAccent()
				drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				
			}
			//exit button has been hovered during MusicVideo
			var size_btn = 70;
			//if (Mode.Exercise && Mode.MusicVideo && !Mode.SignIn && !Mode.LogIn &&!exit_btn_ch && mouseInRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn)) {
			if (Mode.Exercise && Mode.MusicVideo && !Mode.SignIn && !Mode.LogIn &&!exit_btn_ch && mouseInRect(Display.getButton("exit_btn.png"))) {
				clearScreenRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
				drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn - 3, MenuItem.starts + 20 - 3, size_btn + 6, size_btn + 6);
				exit_btn_ch = true;
			}
			//else if(Mode.MusicVideo && !Mode.SignIn && !Mode.LogIn && exit_btn_ch && !(mouseInRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn - 3, MenuItem.starts + 20 - 3, size_btn + 6, size_btn + 6))) {
			else if(Mode.MusicVideo && !Mode.SignIn && !Mode.LogIn && exit_btn_ch && !(mouseInRect(Display.getButton("exit_btn.png")))) {
				clearScreenRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn - 3, MenuItem.starts + 20 - 3, size_btn + 6, size_btn + 6);
				drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
				exit_btn_ch = false;
			}
			
			//MatchTheAnimalsWithTheirNames exit button has been hovered
			if(Mode.Exercise && !Mode.MusicVideo && !Mode.Results) {
				try{
					size_btn = setWordHeight();
					if(frametype1 == "Wordsframe" && frametype2 == "frame")
						size_btn = 70;
				}
				catch(e) {
					size_btn = ((MenuItem.ends - MenuItem.starts - 40) - 4 * 10 - (MenuItem.ends - MenuItem.starts - 40) * 2/5) / 5
				}
			}
			//if ((Mode.Exercise && !Mode.MusicVideo && !Mode.Results) && !Mode.SignIn && !Mode.LogIn &&!exit_btn_ch && mouseInRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn)) {
			if ((Mode.Exercise && !Mode.MusicVideo && !Mode.Results) && !Mode.SignIn && !Mode.LogIn &&!exit_btn_ch && mouseInRect(Display.getButton("exit_btn.png"))) {
				clearRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
				drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn - 3, MenuItem.starts + 20 - 3, size_btn + 6, size_btn + 6);
				exit_btn_ch = true;
			}
			//else if((Mode.Exercise && !Mode.MusicVideo && !Mode.Results) && !Mode.SignIn && !Mode.LogIn && exit_btn_ch && !(mouseInRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn - 3, MenuItem.starts + 20 - 3, size_btn + 6, size_btn + 6))) {
			else if((Mode.Exercise && !Mode.MusicVideo && !Mode.Results) && !Mode.SignIn && !Mode.LogIn && exit_btn_ch && !(mouseInRect(Display.getButton("exit_btn.png")))) {
				clearRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn - 3, MenuItem.starts + 20 - 3, size_btn + 6, size_btn + 6);
				drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
				exit_btn_ch = false;
			}
			//MatchTheAnimalsWithTheirNames word has been hovered
			try {
				if ((!Mode.Menu && !Mode.CountDown && !Mode.Results && Mode.Exercise && !Mode.MusicVideo) && !Mode.SignIn && !Mode.LogIn &&!word_ch) {
					var Array = [];
					var animal_height
					if(frametype1 == "frame") {
						animal_height = Screen.height / Math.min(Screen.k_width, Screen.k_height) / 4;
					}
					else if(frametype1 == "Wordsframe"){
						animal_height = 100;
					}
					var edge = 0;
					var word_height = setWordHeight();
					//var center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / 2;
					//var top = Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 40 + animal_height + 40;
					var top, center;
					if(frametype1 == "frame") {
						center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / 2;
						top = MenuItem.starts + 40 + animal_height + 40;
					}
					else if(frametype1 == "Wordsframe") {
						center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / Math.floor((Task.test.length + 1) / 2);
						top = MenuItem.starts + 40 + animal_height + 40;
					}
					for(var i = 0; i < Task.test.length; i++) {
						var wordFrame = (Task.test.concat())[i][frametype2];
							Array[i] = {};
							Array[i].x = (edge + center/2-wordFrame.w*word_height/wordFrame.h/2);
							Array[i].y = top;
							Array[i].w = wordFrame.w*word_height/wordFrame.h;
							Array[i].h = word_height;
						if(frametype1 == "frame") {
							if(i % 2){
								top = top + word_height + 30;
								edge = 0;
							}
							else edge = center;
						}
						else if(frametype1 == "Wordsframe") {
							if(!((i + 1) % Math.floor((Task.test.length + 1) / 2))){
							top = top + word_height + 20;
							edge = 0;
							}
							else { 
								edge = edge + center;
							}
						}
					}
					var i = checkPoint({x:mouseX, y:mouseY}, Array);
					k2 = i;
					if(k2 < Array.length) {
						wordFrame = (Task.test.concat())[k2][frametype2];
						ctx.clearRect((Array[k2]).x*Math.min(Screen.k_width, Screen.k_height), (Array[k2].y)*Math.min(Screen.k_width, Screen.k_height), (Array[k2].w)*Math.min(Screen.k_width, Screen.k_height), (Array[k2].h)*Math.min(Screen.k_width, Screen.k_height));
						ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[k2].x - 6)*Math.min(Screen.k_width, Screen.k_height), (Array[k2].y - 3)*Math.min(Screen.k_width, Screen.k_height), (Array[k2].w + 6)*Math.min(Screen.k_width, Screen.k_height), (Array[k2].h + 6)*Math.min(Screen.k_width, Screen.k_height));
						word_ch = true;
					}
				}
				else if((!Mode.Menu && !Mode.CountDown && !Mode.Results && Mode.Exercise && !Mode.MusicVideo) && !Mode.SignIn && !Mode.LogIn && word_ch) {
					
					var Array = [];
					var animal_height, center, top;
					if(frametype1 == "frame") {
						animal_height = Screen.height / Math.min(Screen.k_width, Screen.k_height) / 4;
					}
					else if(frametype1 == "Wordsframe"){
						animal_height = 100;
					}
					var edge = 0;
					var word_height = setWordHeight();
					if(frametype1 == "frame") {
						center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / 2;
						top = MenuItem.starts + 40 + animal_height + 40;
					}
					else if(frametype1 == "Wordsframe") {
						center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / Math.floor((Task.test.length + 1) / 2);
						top = MenuItem.starts + 40 + animal_height + 40;
					}
					var TopforTap = 0;
					for(var i = 0; i < Task.test.length; i++) {
						var wordFrame = Task.test[i][frametype2];
						Array[i] = {};
						Array[i].x = (edge + center/2-wordFrame.w*word_height/wordFrame.h/2);
						Array[i].y = top;
						Array[i].w = wordFrame.w*word_height/wordFrame.h;
						Array[i].h = word_height;
						if(Mode.Training && Task.test[i].Word == Task.asked.Word) {
							var Hand_frame =  Properties.Buttons["tap.png"];
							var Hand = {};
							Hand.h = 3/2*setWordHeight();
							Hand.w = Hand.h * Hand_frame.w / Hand_frame.h;
							
							drawTap( (edge + center/2-wordFrame.w*word_height/wordFrame.h/2) + wordFrame.w*word_height/wordFrame.h / 2 - Hand.w / 2, top, Hand.w, Hand.h);
							var TopforTap = top;
							var edgeforTap = edge;
						}
						if(frametype1 == "frame") {
							if(i % 2){
								top = top + word_height + 30;
								edge = 0;
							}
							else edge = center;
						}
						else if(frametype1 == "Wordsframe"){
							if(!((i + 1) % Math.floor((Task.test.length + 1) / 2))){
								top = top + word_height + 20;
								edge = 0;
							}
							else { 
								edge = edge + center;
							}
						}
					}
					var i = k2;
					if(k3 == -1 && !PointInRect({x:mouseX, y:mouseY}, Array[i])) {
						wordFrame = Task.test[i][frametype2];
						
						ctx.clearRect((Array[i].x - 6)*Math.min(Screen.k_width, Screen.k_height), (Array[i].y - 3)*Math.min(Screen.k_width, Screen.k_height), (Array[i].w + 6)*Math.min(Screen.k_width, Screen.k_height), (Array[i].h + 6)*Math.min(Screen.k_width, Screen.k_height));
						ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[i] - 6).x*Math.min(Screen.k_width, Screen.k_height), (Array[i].y - 6)*Math.min(Screen.k_width, Screen.k_height), (Array[i].w + 12)*Math.min(Screen.k_width, Screen.k_height), (Array[i].h + 12)*Math.min(Screen.k_width, Screen.k_height));
						drawTest();
						ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[i]).x*Math.min(Screen.k_width, Screen.k_height), (Array[i].y)*Math.min(Screen.k_width, Screen.k_height), (Array[i].w)*Math.min(Screen.k_width, Screen.k_height), (Array[i].h)*Math.min(Screen.k_width, Screen.k_height));
						ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[i] - 6).x*Math.min(Screen.k_width, Screen.k_height), (Array[i].y)*Math.min(Screen.k_width, Screen.k_height), (Array[i].w)*Math.min(Screen.k_width, Screen.k_height), (Array[i].h)*Math.min(Screen.k_width, Screen.k_height));
						if(Mode.Training && Task.test[k2].Word == Task.asked.Word) {
							var Hand_frame =  Properties.Buttons["tap.png"];
							var Hand = {};
							Hand.h = 3/2*setWordHeight();
							Hand.w = Hand.h * Hand_frame.w / Hand_frame.h;
							
							top = TopforTap;
							edge = edgeforTap;
							drawTap( (edge + center/2-wordFrame.w*word_height/wordFrame.h/2) + wordFrame.w*word_height/wordFrame.h / 2 - Hand.w / 2, top, Hand.w, Hand.h);
						
						}
						word_ch = false;
						k2 = -1;
					}
					if(k3 != -1){
						drawHeader();
						wordFrame = Task.test[k3][frametype2];
						Array[k3].x = Array[k3].x + mouseX/Math.min(Screen.k_width, Screen.k_height) - Pressed.x/Math.min(Screen.k_width, Screen.k_height);
						Array[k3].y = Array[k3].y + mouseY/Math.min(Screen.k_width, Screen.k_height) - Pressed.y/Math.min(Screen.k_width, Screen.k_height);
						var Point = {x:Array[k3].x*Math.min(Screen.k_width, Screen.k_height), y:Array[k3].y*Math.min(Screen.k_width, Screen.k_height)};
						var Rect = {x:0, y:0, w:Screen.width/Math.min(Screen.k_width, Screen.k_height), h:MenuItem.starts + 20};
						
						ctx.clearRect((Array[k3].x - 6)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].y - 3)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].w + 6)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].h + 6)*Math.min(Screen.k_width, Screen.k_height));
						ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[k3] - 6).x*Math.min(Screen.k_width, Screen.k_height), (Array[k3].y - 6)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].w + 12)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].h + 12)*Math.min(Screen.k_width, Screen.k_height));
						ctx.clearRect(0, MenuItem.starts, Screen.width, Screen.height);
						drawTest();
						ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[k3]).x*Math.min(Screen.k_width, Screen.k_height), (Array[k3].y)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].w)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].h)*Math.min(Screen.k_width, Screen.k_height));
						ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[k3] - 6).x*Math.min(Screen.k_width, Screen.k_height), (Array[k3].y)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].w)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].h)*Math.min(Screen.k_width, Screen.k_height));
						if(Mode.Training && Task.test[k3].Word == Task.asked.Word) {
							var Hand_frame =  Properties.Buttons["tap.png"];
							var Hand = {};
							Hand.h = 3/2*setWordHeight();
							Hand.w = Hand.h * Hand_frame.w / Hand_frame.h;
							var top, animal_height, center;
							//var animal_height = Screen.height / Math.min(Screen.k_width, Screen.k_height) / 4;
							if(frametype1 == "frame") {
								animal_height = Screen.height / Math.min(Screen.k_width, Screen.k_height) / 4;
							}
							else {
								animal_height = 50;
							}
							var edge = 0;
							if(frametype1 == "frame") {
								center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / 2;
								top = MenuItem.starts + 40 + animal_height + 40;
							}
							else if(frametype1 == "Wordsframe") {
								center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / Math.floor((Task.test.length + 1) / 2);
								top = MenuItem.starts + 40 + animal_height + 40;
							}
							var word_height = setWordHeight();
							drawTap( (Screen.width / Math.min(Screen.k_width, Screen.k_height) - Task.asked[frametype1].w*animal_height/Task.asked[frametype1].h) / 2 +  Task.asked[frametype1].w*animal_height/Task.asked[frametype1].h / 2 - Hand.w / 2, MenuItem.starts + (20 + 20) + animal_height / 2 - Hand.h / 2, Hand.w, Hand.h);
										
						}
					}
				}
			}
			catch(e){}
			
			if(Mode.Results || (Mode.Exercise && !Mode.MusicVideo)) {
			var frame = Properties.Forms["result_form.png"];
			var Result_form = {};
			Result_form.h = MenuItem.size;
			Result_form.w = Result_form.h * frame.w / frame.h;
			Result_form.x = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - Result_form.w) / 2;
			Result_form.y = (Screen.height / Math.min(Screen.k_width, Screen.k_height) - Result_form.h) / 2;
			
			var btn = Properties.Forms["result_form_try_again_btn.png"];
			var btn_width = (Result_form.w - 2 * 20 * Result_form.w / frame.w - 20) / 2;
			var btn_height = btn_width * btn.h / btn.w;
			
			//try again hovered in show results
			if (!Mode.Quiz && Mode.Results && !Mode.SignIn && !Mode.LogIn &&!try_again_ch && mouseInRect(Result_form.x + 20 * Result_form.w / frame.w, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w, btn_width, btn_height)) {
				//clearScreenRect(Result_form.x + 20 * Result_form.w / frame.w, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w, btn_width, btn_height);
				drawResultTryAgainButton(Result_form.x + 20 * Result_form.w / frame.w - 3, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w - 3, btn_width + 6, btn_height + 6);
				try_again_ch = true;
			}
			else if(!Mode.Quiz && Mode.Results && !Mode.SignIn && !Mode.LogIn && try_again_ch && !(mouseInRect(Result_form.x + 20 * Result_form.w / frame.w - 3, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w - 3, btn_width - 6, btn_height + 6))) {
				clearScreenRect(Result_form.x + 20 * Result_form.w / frame.w - 3, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w - 3, btn_width + 6, btn_height + 6);
				drawResultForm(Result_form.x, Result_form.y, Result_form.w, Result_form.h);
				drawResultTryAgainButton(Result_form.x + 20 * Result_form.w / frame.w, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w, btn_width, btn_height);
				drawResultOkayButton(Result_form.x + 20 * Result_form.w / frame.w + 20 + btn_width, Result_form.y + Result_form.h - btn_height / 2 -  10 * Result_form.w / frame.w, btn_width, btn_height);
					
				var Correct = countCorrect(Task.Result.Answers);
				var Answers = Task.Result.Answers;
				var Total = Task.Total;
				var Max = Task.MaxPoint;
				var digit_frame = Properties.Numbers["small-dark-1.png"];
				var digit = {};
				digit.h = 12  * Result_form.h / frame.h;
				digit.w = digit.h * digit_frame.w / digit_frame.h;
				
				//drawDigit(Correct, Result_form.x + 115 * Result_form.w / frame.w, Result_form.y + 51 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
				//drawDigit(Total, Result_form.x + 115 * Result_form.w / frame.w, Result_form.y + 68 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
				Correct = Correct +"";
				for(var j = 0; j < Correct.length; j++)
					drawDigit(Correct[j], Result_form.x + 115 * Result_form.w / frame.w + j * digit.w, Result_form.y + 51 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
				Total = Total +"";
				for(var j = 0; j < Total.length; j++)
					drawDigit(Total[j], Result_form.x + 115 * Result_form.w / frame.w + j * digit.w, Result_form.y + 68 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
				
				var points = countPoints(Answers, Total, Max);
				//var stars = Math.round(points / (Max * Total) * 5);
				var stars = 0;
				if(!Mode.Quiz)
					stars = Math.round(points / (Max * Total) * 5);
				else
					stars = Math.round(points / Quiz.TotalMax * 5);
				
				points = points +"";
				for(var j = 0; j < points.length; j++)
					drawDigit(points[j], Result_form.x + 115 * Result_form.w / frame.w + j * digit.w, Result_form.y + 86 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
				var star_frame = Properties.Buttons["star.png"];
				var star = {}
				star.h = digit.h;
				star.w = star.h * star_frame.w / star_frame.h;
				for(var j = 0; j < stars; j++)
					drawStar(Result_form.x + 115 * Result_form.w / frame.w + j * star.w, Result_form.y + 103 * Result_form.h / frame.h - star.h, star.w, star.h);
				for(var j = 0; j < 5 - stars; j++)
					drawDarkStar(Result_form.x + 115 * Result_form.w / frame.w + (stars + j) * star.w, Result_form.y + 103 * Result_form.h / frame.h - star.h, star.w, star.h);
				var minuts = 0, seconds = 0;
				if(Mode.Quiz) {
					minuts = Math.floor((Quiz.Finish.getTime() - Quiz.Start.getTime()) / 1000 / 60) + "";
					seconds = Math.floor((Quiz.Finish.getTime() - Quiz.Start.getTime()) / 1000 - minuts * 60) + "";
				}
				else {
					minuts = Math.floor((Task.Result.Finish.getTime() - Task.Result.Start.getTime()) / 1000 / 60) + "";
					seconds = Math.floor((Task.Result.Finish.getTime() - Task.Result.Start.getTime()) / 1000 - minuts * 60) + "";
				}
				var i = 0;
				var j = 0;
				if(minuts != "0") {
					for (i; i < minuts.length; i++) {
						drawDigit(minuts[i], Result_form.x + 115 * Result_form.w / frame.w + i * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
					}
					var min = "min";
					i++;
					for(j; j < min.length;j++) {
						drawLetter(min[j], Result_form.x + 115 * Result_form.w / frame.w + (i + j) * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
					}
					i = i + j + 1;
					j = 0;
				}
				if(seconds != "0") {
					for (j = 0; j < seconds.length; j++) {
						drawDigit(seconds[j], Result_form.x + 115 * Result_form.w / frame.w + (i + j) * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
					}
					i = i + j + 1;
					var sec = "sec";
					for(j = 0; j < sec.length;j++) {
						drawLetter(sec[j], Result_form.x + 115 * Result_form.w / frame.w + (i + j) * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
					}
				}
				
				try_again_ch = false;
			}
			
				var frame = Properties.Forms["result_form.png"];
				var Result_form = {};
				Result_form.h = MenuItem.size;
				Result_form.w = Result_form.h * frame.w / frame.h;
				Result_form.x = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - Result_form.w) / 2;
				Result_form.y = (Screen.height / Math.min(Screen.k_width, Screen.k_height) - Result_form.h) / 2;
				
				var size_btn = setWordHeight();
				if(frametype1 == "Wordsframe" && frametype2 == "frame")
					size_btn = 70;
				var frame = Properties.Buttons["skip.png"];
				
				//skip hovered
				if (Mode.Training && (Mode.Exercise && !Mode.MusicVideo) && !Mode.SignIn && !Mode.LogIn &&!skip_ch && mouseInRect(Title.leftSpace + 20, MenuItem.starts + 20, size_btn * frame.w / frame.h,size_btn)) {
					//clearScreenRect(Result_form.x + 20 * Result_form.w / frame.w, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w, btn_width, btn_height);
					clearScreenRect(Title.leftSpace + 20, MenuItem.starts + 20, size_btn * frame.w / frame.h,size_btn)
					drawSkip(Title.leftSpace + 20 - 3, MenuItem.starts + 20 - 3, size_btn * frame.w / frame.h + 6, size_btn + 6)
					skip_ch = true;
				}
				else if(Mode.Training && (Mode.Exercise && !Mode.MusicVideo) && !Mode.SignIn && !Mode.LogIn && skip_ch && !(mouseInRect(Title.leftSpace + 20 - 3, MenuItem.starts + 20 - 3, size_btn * frame.w / frame.h + 6,size_btn + 6))) {
					clearScreenRect(Title.leftSpace + 20 - 3, MenuItem.starts + 20 - 3, size_btn * frame.w / frame.h + 6, size_btn + 6)
					drawSkip(Title.leftSpace + 20, MenuItem.starts + 20, size_btn * frame.w / frame.h,size_btn)
					skip_ch = false;
				}			
				var frame = Properties.Forms["result_form.png"];
				var Result_form = {};
				Result_form.h = MenuItem.size;
				Result_form.w = Result_form.h * frame.w / frame.h;
				Result_form.x = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - Result_form.w) / 2;
				Result_form.y = (Screen.height / Math.min(Screen.k_width, Screen.k_height) - Result_form.h) / 2;
				
				var btn = Properties.Forms["result_form_try_again_btn.png"];
				var btn_width = (Result_form.w - 2 * 20 * Result_form.w / frame.w - 20) / 2;
				var btn_height = btn_width * btn.h / btn.w;
				
				
				//okay hovered in show results
				if (Mode.Results && !Mode.SignIn && !Mode.LogIn &&!okay_ch && mouseInRect(Result_form.x + 20 * Result_form.w / frame.w + 20 + btn_width, Result_form.y + Result_form.h - btn_height / 2 -  10 * Result_form.w / frame.w, btn_width, btn_height)) {
					//clearScreenRect(Result_form.x + 20 * Result_form.w / frame.w, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w, btn_width, btn_height);
					drawResultOkayButton(Result_form.x + 20 * Result_form.w / frame.w + 20 + btn_width - 3, Result_form.y + Result_form.h - btn_height / 2 -  10 * Result_form.w / frame.w - 3, btn_width + 6, btn_height + 6);
					okay_ch = true;
				}
				else if(Mode.Results && !Mode.SignIn && !Mode.LogIn && okay_ch && !(mouseInRect(Result_form.x + 20 * Result_form.w / frame.w + 20 + btn_width - 3, Result_form.y + Result_form.h - btn_height / 2 -  10 * Result_form.w / frame.w - 3, btn_width + 6, btn_height + 6))) {
					clearScreenRect(Result_form.x + 20 * Result_form.w / frame.w + 20 + btn_width - 3, Result_form.y + Result_form.h - btn_height / 2 -  10 * Result_form.w / frame.w - 3 + 6, btn_width, btn_height + 6);
					drawResultForm(Result_form.x, Result_form.y, Result_form.w, Result_form.h);
					drawResultOkayButton(Result_form.x + 20 * Result_form.w / frame.w + 20 + btn_width, Result_form.y + Result_form.h - btn_height / 2 -  10 * Result_form.w / frame.w, btn_width, btn_height);
					if(!Mode.Quiz)
						drawResultTryAgainButton(Result_form.x + 20 * Result_form.w / frame.w, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w, btn_width, btn_height);
					var Correct = 0;
					if(!Mode.Quiz)
						Correct = countCorrect(Task.Result.Answers);
					else
						Correct = Quiz.Correct;
					var Answers = Task.Result.Answers;
					var Total = 0;
					if(!Mode.Quiz)
						Total = Task.Total;
					else
						Total = Quiz.Total;
					var Max = Task.MaxPoint;
					var digit_frame = Properties.Numbers["small-dark-1.png"];
					var digit = {};
					digit.h = 12  * Result_form.h / frame.h;
					digit.w = digit.h * digit_frame.w / digit_frame.h;
					
					//drawDigit(Correct, Result_form.x + 115 * Result_form.w / frame.w, Result_form.y + 51 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
					//drawDigit(Total, Result_form.x + 115 * Result_form.w / frame.w, Result_form.y + 68 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
					Correct = Correct +"";
					for(var j = 0; j < Correct.length; j++)
						drawDigit(Correct[j], Result_form.x + 115 * Result_form.w / frame.w + j * digit.w, Result_form.y + 51 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
					Total = Total +"";
					for(var j = 0; j < Total.length; j++)
						drawDigit(Total[j], Result_form.x + 115 * Result_form.w / frame.w + j * digit.w, Result_form.y + 68 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
					
					var point = 0;
					if(!Mode.Quiz)
						points = countPoints(Answers, Total, Max);
					else
						points = Quiz.Points;
					if(!Mode.Quiz)
						stars = Math.round(points / (Max * Total) * 5);
					else
						stars = Math.round(points / Quiz.TotalMax * 5);
					points = points +"";
					for(var j = 0; j < points.length; j++)
						drawDigit(points[j], Result_form.x + 115 * Result_form.w / frame.w + j * digit.w, Result_form.y + 86 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
					var star_frame = Properties.Buttons["star.png"];
					var star = {}
					star.h = digit.h;
					star.w = star.h * star_frame.w / star_frame.h;
					for(var j = 0; j < stars; j++)
						drawStar(Result_form.x + 115 * Result_form.w / frame.w + j * star.w, Result_form.y + 103 * Result_form.h / frame.h - star.h, star.w, star.h);
					for(var j = 0; j < 5 - stars; j++)
						drawDarkStar(Result_form.x + 115 * Result_form.w / frame.w + (stars + j) * star.w, Result_form.y + 103 * Result_form.h / frame.h - star.h, star.w, star.h);
					var minuts = 0, seconds = 0;
					if(Mode.Quiz) {
						minuts = Math.floor((Quiz.Finish.getTime() - Quiz.Start.getTime()) / 1000 / 60) + "";
						seconds = Math.floor((Quiz.Finish.getTime() - Quiz.Start.getTime()) / 1000 - minuts * 60) + "";
					}
					else {
						minuts = Math.floor((Task.Result.Finish.getTime() - Task.Result.Start.getTime()) / 1000 / 60) + "";
						seconds = Math.floor((Task.Result.Finish.getTime() - Task.Result.Start.getTime()) / 1000 - minuts * 60) + "";
					}
					var i = 0;
					var j = 0;
					if(minuts != "0") {
						for (i; i < minuts.length; i++) {
							drawDigit(minuts[i], Result_form.x + 115 * Result_form.w / frame.w + i * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
						}
						var min = "min";
						i++;
						for(j; j < min.length;j++) {
							drawLetter(min[j], Result_form.x + 115 * Result_form.w / frame.w + (i + j) * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
						}
						i = i + j + 1;
						j = 0;
					}
					if(seconds != "0") {
						for (j = 0; j < seconds.length; j++) {
							drawDigit(seconds[j], Result_form.x + 115 * Result_form.w / frame.w + (i + j) * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
						}
						i = i + j + 1;
						var sec = "sec";
						for(j = 0; j < sec.length;j++) {
							drawLetter(sec[j], Result_form.x + 115 * Result_form.w / frame.w + (i + j) * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
						}
					}
					okay_ch = false;
				}
			}
			if(Mode.MenuItem || Mode.Menu) {
				try {
					// menu button has been hovered
					if(Mode.Mobile && (Mode.MenuItem || Mode.Menu) && !Mode.Exercise && !Mode.Results && !Mode.SignIn && !Mode.LogIn && !menu_btn_ch && mouseInRect(Display.getButton("menu_btn.png"))) {
						fillRectYellow(Display.getButton("menu_btn.png").x, Display.getButton("menu_btn.png").y, Display.getButton("menu_btn.png").w, Display.getButton("menu_btn.png").h);
						Display.expandButton("menu_btn.png", 5);
						drawMenuButton();
						menu_btn_ch = true;
					}
					else if(Mode.Mobile && (Mode.MenuItem || Mode.Menu) && !Mode.Exercise && !Mode.Results && !Mode.SignIn && !Mode.LogIn && menu_btn_ch && !mouseInRect(Display.getButton("menu_btn.png"))) {
						fillRectYellow(Display.getButton("menu_btn.png").x, Display.getButton("menu_btn.png").y, Display.getButton("menu_btn.png").w, Display.getButton("menu_btn.png").h);
						Display.expandButton("menu_btn.png", -5);
						drawMenuButton();
						menu_btn_ch = false;
					}
				}
				catch(e){}
			}
		}
		function leftArrowClicked() {
			MenuItem.clicked = -1;
			MenuItem.chosen = MenuItem.clicked;
			if(MenuItem.firstItem > 0) {
				MenuItem.firstItem = MenuItem.firstItem - 1;
				clearMenuItemRect((MenuItem.leftSpace - 5), ( MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2 - 5) , (koef*100 + 10), (koef*100*226/152 + 10));
				drawMenuItems()
				if(MenuItem.firstItem) {
					drawLeftArrow();
				}
				if(MenuItem.firstItem + MenuItem.display < MenuItem.itemsCount) {
					drawRightArrow();
				}
			}
			
		}
		function rightArrowClicked() {
			if(MenuItem.firstItem + MenuItem.display >= MenuItem.itemsCount) {
				//clearMenuItemRect(MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - 100*koef - 5, MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2 - 5, koef*100 + 10, koef*100*226/152 + 10);
				clearRectRect(Display.getTopic(MenuItem.firstItem + MenuItem.clicked));
			}
			console.log("im here");
			MenuItem.clicked = -1;
			MenuItem.chosen = MenuItem.clicked;
			MenuItem.firstItem = MenuItem.firstItem + 1;
			l_a_x = MenuItem.leftSpace;
			l_a_width = 100*koef;
			l_a_height = koef*100*226/152;
			l_a_y =  MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2;
			
			drawLeftArrow(l_a_x, l_a_y, l_a_width, l_a_height);
			drawMenuItems();
			
		}

		function bottomArrowClicked() {
				j = MenuItem.clicked;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace;
				t_a_width = 100*0.5;
				t_a_height = 0.5*100*226/152;
				Task.firstTask = Task.firstTask + 1;
				drawTask(j, Task.firstTask, pX, (pY+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				drawTask(j, Task.firstTask + 1, pX, (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				drawTask(j, Task.firstTask + 2, pX, (pY + (55/368*MenuItem.size + 10) * 2+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				drawTask(j , Task.firstTask + 3, pX, (pY + (55/368*MenuItem.size + 10) * 3+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				
				if(Task.firstTask > 0) {
					drawTopArrow();
				}
				if(Task.firstTask + Task.display >= Task.itemsCount[MenuItem.clicked]){
					clearRectRect(Display.getButton("bottom-arrow"));
				}
		}

		function topArrowClicked() {
				j = MenuItem.clicked;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace;
				t_a_width = 100*0.5;
				t_a_height = 0.5*100*226/152;
				Task.firstTask = Task.firstTask - 1;
				
				drawTask(j, Task.firstTask, pX, (pY+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Trace the letters
				drawTask(j, Task.firstTask + 1, pX, (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Name the letter
				drawTask(j, Task.firstTask + 2, pX, (pY + (55/368*MenuItem.size + 10) * 2+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Name the letter sounds
				drawTask(j , Task.firstTask + 3, pX, (pY + (55/368*MenuItem.size + 10) * 3+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				console.log(Display.getButton("top-arrow"), Task.firstTask);
				if(Task.firstTask <= 0) {
					console.log("hello");
					clearRectRect(Display.getButton("top-arrow"));
					//fillRect(Display.getButton("top-arrow").x - 5, Display.getButton("top-arrow").y - 5, Display.getButton("top-arrow").w + 10, Display.getButton("top-arrow").h + 10);
					
				}
				//draw bottom arrow
					//bottom arrow
					/*pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
					pY =  MenuItem.topSpace + MenuItem.size;
					b_a_width = 100*0.5;
					b_a_height = 0.5*100*226/152;
					ctx.save();
					ctx.translate((pX + MenuItem.size / 2 - 3/4*b_a_width)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
					ctx.rotate(-Math.PI / 2);*/
					//drawLeftArrow(0, 0, b_a_width, b_a_height)
					drawBottomArrow();
					//ctx.restore();
				
		}

		var atlasMenuItemTask = new Image();
		MenuItem.loadedMenuItemTasks = false;
		function loadMenuItemsTasks(j){
			// Load image and the json that defines locations
			atlasMenuItemTask.src = '/img/Menu-Items/Tasks.png';
			atlasMenuItemTask.addEventListener("load", function() {
				MenuItem.loadMenuItemsTasks = true;
				drawMenuItemsTasks(j);
			}, false);	
		}
		function getUserNameLogIn(str, x, y){
			$(document).keydown(function(e){
					if(Profile.storeUserNameLogIn == true) {
					key = e.which || e.keyCode;
					/*if(key >= 48 && key <= 105) {
						if(Profile.UserName != "Username")
							Profile.UserName = Profile.UserName + String.fromCharCode(key);
						else
							Profile.UserName = String.fromCharCode(key)
					}
					else if(key == 32) {
							Profile.UserName = Profile.UserName = Profile.UserName + " "
						}
					else if(key == 8)
						Profile.UserName = Profile.UserName.substring(0, Profile.UserName.length-1);
					delete key, e*/
						Profile.UserName = $("#UserName").value;
					}
					
				});
				$(document).keyup(function(e){
					if(Profile.storeUserNameLogIn == true) {
						clearScreenRect((X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size));
						X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
						Y_ = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
						drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
						//ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
						drawLogInLogInButton();
						drawLogInCancelButton();
						//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
						//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
						
					}
				});
			
			return str
		}

		function getPasswordLogIn(str, x, y){
			$(document).keydown(function(e){
					if(Profile.storePasswordLogIn == true) {
					key = e.which || e.keyCode;
					if(key >= 48 && key <= 105) {
						if(Profile.Password != "Password")
							Profile.Password = Profile.Password + String.fromCharCode(key);
						else
							Profile.Password = String.fromCharCode(key)
					}
					else if(key == 32) {
							Profile.Password = Profile.Password = Profile.Password + " "
						}
					else if(key == 8)
						Profile.Password = Profile.Password.substring(0, Profile.Password.length-1);
					
					}
					
				});
				$(document).keyup(function(e){
					if(Profile.storePasswordLogIn == true) {
						clearScreenRect((X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size));
						X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
						Y_ = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
						drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
						//ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
						drawLogInLogInButton();
						drawLogInCancelButton();
						//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
						//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
						
					}
				});
			return str
		}

		function getUserNameSignIn(str, x, y){
			$(document).keydown(function(e){
					if(Profile.storeUserNameSignIn == true) {
					key = e.which || e.keyCode;
					if(key >= 48 && key <= 105) {
						if(Profile.UserName != "Username")
							Profile.UserName = Profile.UserName + String.fromCharCode(key);
						else
							Profile.UserName = String.fromCharCode(key)
					}
					else if(key == 32) {
							Profile.UserName = Profile.UserName = Profile.UserName + " "
						}
					else if(key == 8)
						Profile.UserName = Profile.UserName.substring(0, Profile.UserName.length-1);
					
					}
					
				});
				$(document).keyup(function(e){
					if(Profile.storeUserNameSignIn == true) {
						ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
						Y_ = (MenuItem.topSpace + MenuItem.starts) / 2
						size_ = 2*(Y_ - MenuItem.starts) + MenuItem.size;
						X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (size_))/2
						
						//mouseInRect(X_ + 35 / 368 * size_, Y_ + 57 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_)
			
						drawSignInForm(X_, Y_, size_, size_);
						if(NewAccent == "US English Female")
							AmericanAccent()
						if(NewAccent == "Australian Female")
							AustralianAccent()
						if(NewAccent == "UK English Male")
							BritishAccent()
						drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
						drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
						//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
						//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
						
					
					}
				});
			
			return str
		}

		function getPasswordSignIn(str, x, y){
			$(document).keydown(function(e){
					if(Profile.storePasswordSignIn == true) {
					key = e.which || e.keyCode;
					if(key >= 48 && key <= 105) {
						if(Profile.Password != "Password")
							Profile.Password = Profile.Password + String.fromCharCode(key);
						else
							Profile.Password = String.fromCharCode(key)
					}
					else if(key == 32) {
							Profile.Password = Profile.Password = Profile.Password + " "
						}
					else if(key == 8)
						Profile.Password = Profile.Password.substring(0, Profile.Password.length-1);
					
					}
					
				});
				$(document).keyup(function(e){
					if(Profile.storePasswordSignIn == true) {
						Y_ = (MenuItem.topSpace + MenuItem.starts) / 2
						size_ = 2*(Y_ - MenuItem.starts) + MenuItem.size;
						X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (size_))/2
						drawSignInForm(X_, Y_, size_, size_);
						ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
						if(NewAccent == "US English Female")
							AmericanAccent()
						if(NewAccent == "Australian Female")
								AustralianAccent()
						if(NewAccent == "UK English Male")
								BritishAccent()
						drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
						drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
						//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
						//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
						
					}
				});
			return str
		}

		function drawTask(j, i, x, y, width, height) {
			try{
				var frame = Properties.Tasks[j][i].Frame;
				Display.setTask(j, i, x, y, width, height);
				ctx.drawImage(atlasMenuItemTask, frame.x, frame.y, frame.w, frame.h, x*Math.min(Screen.k_width, Screen.k_height), y*Math.min(Screen.k_width, Screen.k_height) , width*Math.min(Screen.k_width, Screen.k_height), height*Math.min(Screen.k_width, Screen.k_height))
				var Lockframe = Properties.Buttons['lock.png'];
				if(!Properties.Tasks[j][i].Content) {
					drawLock(x + (width - Lockframe.w / Lockframe.h * height / 2) / 2, y + (height - height / 2) / 2, Lockframe.w / Lockframe.h * height / 2, height / 2);
				}
			}
			catch(e){}
		}
		
		function drawMenuItemsTasks(j){
			
			pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
			pY =  MenuItem.topSpace;
			t_a_width = 100*0.5;
			t_a_height = 0.5*100*226/152;
			clearRectRect(Display.getTopic(j));
			Display.setButton("top-arrow.png", 0, 0, t_a_width, t_a_height);
			if(Task.firstTask > 0) {
				drawTopArrow();
			}
			
			/*if(Task.itemsCount[j] >= 0){
				drawTask(j, Task.firstTask, pX, (pY+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size);
				if(Task.itemsCount[j] >= 1){
					drawTask(j, Task.firstTask + 1, pX, (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
					if(Task.itemsCount[j] >= 2){
						drawTask(j, Task.firstTask + 2, pX, (pY + (55/368*MenuItem.size + 10) * 2+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
						if(Task.itemsCount[j] >= 3){
							drawTask(j, Task.firstTask + 3, pX, (pY + (55/368*MenuItem.size + 10) * 3+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
						}
					}
				}
			}*/
			var i = 0;
			while((i < Task.itemsCount[j]) && (i < Task.display)) {
				drawTask(j, Task.firstTask + i, pX, (pY + (55/368*MenuItem.size + 10) * i + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size);
				i = i + 1;
			}
			if(Task.firstTask + Task.display < Task.itemsCount[MenuItem.clicked]) {
				//bottom arrow
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace + MenuItem.size;
				/*ctx.save();
				ctx.translate((pX + MenuItem.size / 2 - 3/4*t_a_width)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
				ctx.rotate(-Math.PI / 2);*/
				b_a_height = 100*0.5;
				b_a_width = 0.5*100*226/152;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2;
				pY = MenuItem.topSpace + MenuItem.size - b_a_height;
				Display.setButton("bottom-arrow.png", 0, 0, t_a_width, t_a_height);
				Display.setButton("bottom-arrow", pX, pY, b_a_width, b_a_height);
				console.log(Display.getButton("bottom-arrow.png"));
				drawBottomArrow();
				t_a_height = 100*0.5;
				t_a_width = 0.5*100*226/152;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2;
				pY =  MenuItem.topSpace;
				Display.setButton("top-arrow", pX, pY,t_a_width, t_a_height);		
			}
			
			
			
			
		}
		function MenuItemClicked(j) {
			k = -1;
			k1 = -1;
			task_ch = false;
			if(sound_on && !Mode.Exercise) {
				if(MenuItem.chosen != j)
					speak(MenuItem.ItemList[j]);
				MenuItem.chosen = MenuItem.clicked;
				
			}
			if(!MenuItem.loadMenuItemsTasks) {
				loadMenuItemsTasks(j);
			}
			else {
				drawMenuItemsTasks(j);
			}
			
		}

		function showLogInForm(){
				var iter = 0;
				if(Forms_loaded){
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
					Y_ = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
					document.getElementById("Loading").style.visibility = "hidden";
					drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
					Display.setButton("log_in_form_login_btn.png", X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202);
					drawLogInLogInButton();
					Display.setButton("log_in_form_cancel_btn.png", X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202);
					drawLogInCancelButton();
					ctx.fillStyle='#000000';
					var div = document.createElement('inputDiv');
					div.innerHTML = "<input id = 'UserName' name = 'UserName' autofocus/><input id = 'Password' name = 'UserName' autofocus/>";
					document.getElementById("mainDiv").appendChild(div);
					document.getElementById("UserName").style.top = (Y_ + 57 / 202 * MenuItem.size) * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("UserName").style.left = (X_ + 35 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("UserName").style.paddingLeft = (20 / 368 * size_) * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("UserName").style.paddingRight = (20 / 368 * size_) * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("UserName").style.width = 297 / 368 * (MenuItem.size) / 202 * 368*Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("UserName").style.height = 35 / 202 * MenuItem.size * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("UserName").style.border = "2px solid";
					document.getElementById('UserName').style.position = "absolute";
					document.getElementById('UserName').style.backgroundColor = "transparent";
					document.getElementById("Password").style.top = (Y_ + 115 / 202 * MenuItem.size) * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("Password").style.left = (X_ + 35 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("Password").style.paddingLeft = (20 / 368 * size_) * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("Password").style.paddingRight = (20 / 368 * size_) * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("Password").style.width = 297 / 368 * (MenuItem.size) / 202 * 368 *Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("Password").style.height = 35 / 202 * MenuItem.size * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("Password").style.border = "2px solid";
					document.getElementById('Password').style.position = "absolute";
					document.getElementById('Password').style.backgroundColor = "transparent";
					if(Profile.UserName)
						document.getElementById('UserName').value = Profile.UserName;
					if(Profile.Password)
						document.getElementById('Password').value = Profile.Password;
					
					pressedUserNameLogIn = 0;
					pressedPasswordLogIn = 0;
					Mode.MenuItem  = false;
					Mode.Tasks = false;
					Mode.LogIn = true;	
					Mode.SignIn= false;
				}
				else {
					setTimeout(function(){
						showLogInForm();
					}, 1);
				}
		}
		function countPoints(Answers, TaskN, Max) {
			var points = 0;
			for (var i = 0; i < Answers.length; i++) {
				if(Answers[i].Attempts)
					points = points + Max + 1 - Answers[i].Attempts;
			}
			return points;
		}
		function showResultForm(Answers = Task.Result.Answers, Total = Task.Total, Max = 4){
				if(Forms_loaded){
					delete Pressed.x;
					delete Pressed.y;
					delete Task.asked;
					clearRect(0, 0, Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height));
					drawHeader();
					Mode.Results = true;
					//stop_loading = true;
					var Correct = 0;
					if(!Mode.Quiz)
						Correct = countCorrect(Task.Result.Answers);
					else {
						Correct = Quiz.Correct;
						Total = Quiz.Total;
					}
					
					try {
					var frame = Properties.Forms["result_form.png"];
					var Result_form = {};
					Result_form.h = MenuItem.size;
					Result_form.w = Result_form.h * frame.w / frame.h;
					Result_form.x = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - Result_form.w) / 2;
					Result_form.y = (Screen.height / Math.min(Screen.k_width, Screen.k_height) - Result_form.h) / 2;
					drawResultForm(Result_form.x, Result_form.y, Result_form.w, Result_form.h);
					document.getElementById("Loading").style.visibility = "hidden";
					var btn = Properties.Forms["result_form_try_again_btn.png"];
					var btn_width = (Result_form.w - 2 * 20 * Result_form.w / frame.w - 20) / 2;
					var btn_height = btn_width * btn.h / btn.w;
					if(!Mode.Quiz)
						drawResultTryAgainButton(Result_form.x + 20 * Result_form.w / frame.w, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w, btn_width, btn_height);
					drawResultOkayButton(Result_form.x + 20 * Result_form.w / frame.w + 20 + btn_width, Result_form.y + Result_form.h - btn_height / 2 -  10 * Result_form.w / frame.w, btn_width, btn_height);
					
					
					var digit_frame = Properties.Numbers["small-dark-1.png"];
					var digit = {};
					digit.h = 12  * Result_form.h / frame.h;
					digit.w = digit.h * digit_frame.w / digit_frame.h;
					Correct = Correct +"";
					for(var j = 0; j < Correct.length; j++)
						drawDigit(Correct[j], Result_form.x + 115 * Result_form.w / frame.w + j * digit.w, Result_form.y + 51 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
					Total = Total +"";
					for(var j = 0; j < Total.length; j++)
						drawDigit(Total[j], Result_form.x + 115 * Result_form.w / frame.w + j * digit.w, Result_form.y + 68 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
					
					var points = 0;
					if(!Mode.Quiz)
						points = countPoints(Answers, Total, Max);
					else
						points = Quiz.Points;
					Task.Result.Points = points;
					var stars = 0;
					if(!Mode.Quiz)
						stars = Math.round(points / (Max * Total) * 5);
					else
						stars = Math.round(points / Quiz.TotalMax * 5);
					points = points +"";
					for(var j = 0; j < points.length; j++)
						drawDigit(points[j], Result_form.x + 115 * Result_form.w / frame.w + j * digit.w, Result_form.y + 86 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
					var star_frame = Properties.Buttons["star.png"];
					var star = {}
					star.h = digit.h;
					star.w = star.h * star_frame.w / star_frame.h;
					for(var j = 0; j < stars; j++)
						drawStar(Result_form.x + 115 * Result_form.w / frame.w + j * star.w, Result_form.y + 103 * Result_form.h / frame.h - star.h, star.w, star.h);
					for(var j = 0; j < 5 - stars; j++)
						drawDarkStar(Result_form.x + 115 * Result_form.w / frame.w + (stars + j) * star.w, Result_form.y + 103 * Result_form.h / frame.h - star.h, star.w, star.h);
					var minuts = 0, seconds = 0;
					if(Mode.Quiz) {
						minuts = Math.floor((Quiz.Finish.getTime() - Quiz.Start.getTime()) / 1000 / 60) + "";
						seconds = Math.floor((Quiz.Finish.getTime() - Quiz.Start.getTime()) / 1000 - minuts * 60) + "";
					}
					else {
						minuts = Math.floor((Task.Result.Finish.getTime() - Task.Result.Start.getTime()) / 1000 / 60) + "";
						seconds = Math.floor((Task.Result.Finish.getTime() - Task.Result.Start.getTime()) / 1000 - minuts * 60) + "";
					}
					var i = 0;
					var j = 0;
					if(minuts != "0") {
						for (i; i < minuts.length; i++) {
							drawDigit(minuts[i], Result_form.x + 115 * Result_form.w / frame.w + i * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
						}
						var min = "min";
						i++;
						for(j; j < min.length;j++) {
							drawLetter(min[j], Result_form.x + 115 * Result_form.w / frame.w + (i + j) * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
						}
						i = i + j + 1;
						j = 0;
					}
					if(seconds != "0") {
						for (j = 0; j < seconds.length; j++) {
							drawDigit(seconds[j], Result_form.x + 115 * Result_form.w / frame.w + (i + j) * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
						}
						i = i + j + 1;
						var sec = "sec";
						for(j = 0; j < sec.length;j++) {
							drawLetter(sec[j], Result_form.x + 115 * Result_form.w / frame.w + (i + j) * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
						}
					}
					if(Profile.LoggedIn)
						socket.emit("Result", {Result: Task.Result});
					}
					catch(e) {showResultForm(Answers, Total, Max);}
				}
				else {
					if(Forms_loaded == false)
						loadForms();
					setTimeout(function(){
						showResultForm(Answers, Total, Max);
					}, 20);
				}
		}
		function showSignInForm(){
				var iter = 0;
				drawLoading();
				if(Forms_loaded){
					//stop_loading = true;
					Y_ = (MenuItem.topSpace + MenuItem.starts) / 2
					size_ = 2*(Y_ - MenuItem.starts) + MenuItem.size;
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (size_))/2
					document.getElementById("Loading").style.visibility = "hidden";
					drawSignInForm(X_, Y_, size_, size_);
					var div = document.createElement('inputDiv');
					div.innerHTML = "<input id = 'UserName' name = 'UserName' autofocus/><input id = 'Password' name = 'UserName' autofocus/>";
					
					document.getElementById("mainDiv").appendChild(div);
					document.getElementById("UserName").style.top = (Y_ + 57 / 368 * size_) * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("UserName").style.left = (X_ + 35 / 368 * size_) * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("UserName").style.paddingLeft = (20 / 368 * size_) * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("UserName").style.paddingRight = (20 / 368 * size_) * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("UserName").style.width = 298/ 368 * size_*Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("UserName").style.height = 36 / 368 * size_ * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("UserName").style.border = "2px solid";
					document.getElementById('UserName').style.position = "absolute";
					document.getElementById('UserName').style.backgroundColor = "transparent";
					document.getElementById("Password").style.top = (Y_ + 115 / 368 * size_) * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("Password").style.left = (X_ + 35 / 368 * size_) * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("Password").style.paddingLeft = (20 / 368 * size_) * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("Password").style.paddingRight = (20 / 368 * size_) * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("Password").style.width = 298/ 368 * size_*Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("Password").style.height = 36 / 368 * size_ * Math.min(Screen.k_width, Screen.k_height);
					document.getElementById("Password").style.border = "2px solid";
					document.getElementById('Password').style.position = "absolute";
					document.getElementById('Password').style.backgroundColor = "transparent";
					if(Profile.UserName)
						document.getElementById('UserName').value = Profile.UserName;
					if(Profile.Password)
						document.getElementById('Password').value = Profile.Password;
					
					BritishAccent();
					Display.setButton("sign_in_form_signin_btn.png", X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156);
					drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156);
					Display.setButton("sign_in_form_cancel_btn.png", X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156);
					drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156);
					ctx.fillStyle='#000000';
					//ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
					//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
					//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
					pressedUserNameSignIn = 0;
					pressedPasswordSignIn = 0;
					
					
					Mode.MenuItem  = false;
					Mode.Tasks = false;
					Mode.LogIn = false;
					Mode.SignIn = true;			
				}
				else {
					setTimeout(function(){
						showSignInForm();
					}, 1);
				}
				
		}

		function UserNameAreaClickedSignIn() {
			Y_ = (MenuItem.topSpace + MenuItem.starts) / 2
			size_ = 2*(Y_ - MenuItem.starts) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			drawSignInForm(X_, Y_, size_, size_);
			ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
			if(NewAccent == "US English Female")
					AmericanAccent()
			if(NewAccent == "Australian Female")
					AustralianAccent()
			if(NewAccent == "UK English Male")
					BritishAccent()
			
			pressedUserNameSignIn = pressedUserNameSignIn + 1;
			drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			if(Profile.storeUserNameSignIn != false && Profile.storeUserNameSignIn != true) {
				Profile.storeUserNameSignIn = true;
				if(Profile.storePasswordSignIn == true)
					Profile.storePasswordSignIn = false;
				getUserNameSignIn(Profile.UserName, X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size + 20 / 202 * MenuItem.size)
			}
			else {
				Profile.storeUserNameSignIn = true;
				if(Profile.storePasswordSignIn == true)
					Profile.storePasswordSignIn = false;
			}
		}

		function UserNameAreaClickedLogIn() {
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
			Y_ = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
			clearScreenRect((X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size));
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_ = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
				drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
				pressedUserNameLogIn = pressedUserNameLogIn + 1;
				drawLogInLogInButton();
				drawLogInCancelButton();
				if(Profile.storeUserNameLogIn != false && Profile.storeUserNameLogIn != true) {
					Profile.storeUserNameLogIn = true;
					if(Profile.storePasswordLogIn == true)
						Profile.storePasswordLogIn = false;
					//getUserNameLogIn(Profile.UserName, X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size + 20 / 202 * MenuItem.size)
				}
				else {
					Profile.storeUserNameLogIn = true;
					if(Profile.storePasswordLogIn == true)
						Profile.storePasswordLogIn = false;
				}
		}
		function PasswordAreaClickedLogIn() {

			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
			Y_ = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
			clearScreenRect((X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size));
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_ = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
				drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
				pressedPasswordLogIn = pressedPasswordLogIn + 1;
				drawLogInLogInButton();
				drawLogInCancelButton();
				
				
		}
		function PasswordAreaClickedSignIn() {
				Y_ = (MenuItem.topSpace + MenuItem.starts) / 2
				size_ = 2*(Y_ - MenuItem.starts) + MenuItem.size;
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (size_))/2
				drawSignInForm(X_, Y_, size_, size_);
				if(NewAccent == "US English Female")
					AmericanAccent()
				if(NewAccent == "Australian Female")
					AustralianAccent()
				if(NewAccent == "UK English Male")
					BritishAccent()
				drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
				pressedPasswordSignIn = pressedPasswordSignIn + 1;
				if(Profile.storePasswordSignIn != false && Profile.storePasswordSignIn != true) {
					Profile.storePasswordSignIn = true;
					getPasswordSignIn(Profile.Password, X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size + 20 / 202 * MenuItem.size)
					if(Profile.storeUserNameSignIn == true)
						Profile.storeUserNameSignIn = false;
				}
				else {
					Profile.storePasswordSignIn = true;
					if(Profile.storeUserNameSignIn == true)
						Profile.storeUserNameSignIn = false;
				}
				
		}

		function AmericanAccent() {
			drawSignInForm(X_, Y_, size_, size_);
			ctx.fillStyle = "#000000";
			fillRect(X_ + (35 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_);
			fillRect(X_ + (35 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, (36 + 8) / 368 * size_, 2);
			fillRect(X_ + (35 - 4) / 368 * size_, Y_ + 177 / 368 * size_ + (23 + 4) / 368 * size_, (36 + 8) / 368 * size_, 2);
			fillRect(X_ + 35 / 368 * size_ + (36 + 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_);
			NewAccent = "US English Female";
		}
		function AustralianAccent() {
			drawSignInForm(X_, Y_, size_, size_);
			ctx.fillStyle = "#000000"
			fillRect(X_ + (80 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			fillRect(X_ + (80 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRect(X_ + (80 - 4) / 368 * size_, Y_ + 177 / 368 * size_ + (23 + 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRect(X_ + 80 / 368 * size_ + (36 + 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			NewAccent = "Australian Female"
		}
		function BritishAccent() {
			drawSignInForm(X_, Y_, size_, size_);
			ctx.fillStyle = "#000000"
			fillRect(X_ + (124 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			fillRect(X_ + (124 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRect(X_ + (124 - 4) / 368 * size_, Y_ + 177 / 368 * size_ + (23 + 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRect(X_ + 124 / 368 * size_ + (36 + 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			NewAccent = "UK English Male"
		}
		function clearSelectedAccent() {
			fillRectGreen(X_ + (35 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			fillRectGreen(X_ + (35 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRectGreen(X_ + (35 - 4) / 368 * size_, Y_ + 177 / 368 * size_ + (23 + 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRectGreen(X_ + 35 / 368 * size_ + (36 + 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			fillRectGreen(X_ + (80 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			fillRectGreen(X_ + (80 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRectGreen(X_ + (80 - 4) / 368 * size_, Y_ + 177 / 368 * size_ + (23 + 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRectGreen(X_ + 80 / 368 * size_ + (36 + 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			fillRectGreen(X_ + (124 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			fillRectGreen(X_ + (124 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRectGreen(X_ + (124 - 4) / 368 * size_, Y_ + 177 / 368 * size_ + (23 + 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRectGreen(X_ + 124 / 368 * size_ + (36 + 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			
			
		}
		
		function displayVideo() {
			//if(Mode.Alphabetsong) {
				//video.src = "/img/Alphabet/abc song.mp4"
				video = document.getElementById("Video");
				document.getElementById("Loading").style.visibility = "hidden";
				if(!video) {
					var ID = Task.Frames[Task.TaskName].YoutubeID;
					var url_ = "https://www.youtube.com/embed/" + ID + "?controls=2&autoplay=1";
					var div = document.createElement('inputDiv');
					div.innerHTML = '<iframe id = "Video" width="420" height="315"></iframe>';
					document.getElementById("mainDiv").appendChild(div);
					video = document.getElementById("Video");
					video.style.visibility = "visible";
					video.style.position = "absolute";
					video.src = url_;
				}
				var size_btn = 70;
				var VideoFrame = {};
				VideoFrame.height = MenuItem.ends - 40;
				
				VideoFrame.width = 1280/720*VideoFrame.height;
				if(VideoFrame.width + 2 * Title.leftSpace + size_btn > Screen.width / Math.min(Screen.k_width, Screen.k_height)) {
					VideoFrame.width = Screen.width / Math.min(Screen.k_width, Screen.k_height) - 2 * Title.leftSpace - size_btn;
					VideoFrame.height = 720 / 1280 * VideoFrame.width;
				}
				VideoFrame.x = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - VideoFrame.width - 2 * Title.leftSpace) / 2;
				VideoFrame.y = (MenuItem.starts + 20);
				

				
				video.style.top = VideoFrame.y * Math.min(Screen.k_width, Screen.k_height);
				video.style.left = VideoFrame.x * Math.min(Screen.k_width, Screen.k_height);
				video.style.width = VideoFrame.width * Math.min(Screen.k_width, Screen.k_height);
				video.style.height = VideoFrame.height * Math.min(Screen.k_width, Screen.k_height);
			//}
		}
		function PlaySong() {
			var size_btn = 70;
			Display.setButton("exit_btn.png", Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
			drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
			displayVideo();
		}
		function setWordHeight(){
			try {
				if(frametype1 == "frame" && frametype2 == "Wordsframe") {
					var animal_height = Screen.height / Math.min(Screen.k_width, Screen.k_height) / 4;
					var word_height = (Screen.height  / Math.min(Screen.k_width, Screen.k_height) - MenuItem.starts - 40 * Math.floor((Task.test.length + 1) / 2) - animal_height - (Math.floor((Task.test.length + 1) / 2) - 1) * 30) / Math.floor((Task.test.length + 1) / 2);
					var broadest_word = (Task.test).slice(0);
					for(var i = 0; i < broadest_word.length; i++) {
						broadest_word[i][frametype2] = Task.test.slice(0)[i][frametype2];
					}
					broadest_word = broadest_word.sort(function(a, b){
						return a[frametype2].w * word_height/a[frametype2].h - b[frametype2].w * word_height/b[frametype2].h;
					})[broadest_word.length - 1];
					var frame_width = broadest_word.w + 50;
					var max_word_width = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - 2 * Title.leftSpace - 30) / 2;
					if(max_word_width < broadest_word[frametype2].w*word_height/broadest_word[frametype2].h) {
						word_height = max_word_width * broadest_word[frametype2].h / broadest_word[frametype2].w;
					}
					return word_height;
				}
				else if(frametype1 == "Wordsframe" && frametype2 == "frame") {
					var animal_height = 100;
					var max_word_height = (MenuItem.ends - 40 - animal_height - 40 - 2 * 20) / 2;
					var max_word_width = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - 2 * Title.leftSpace - 10 * (Math.floor((Task.test.length + 1) / 2) - 1)) / Math.floor((Task.test.length + 1) / 2);
					var broadest_word = (Task.test).slice(0);
					for(var i = 0; i < broadest_word.length; i++) {
						broadest_word[i][frametype2] = Task.test.slice(0)[i][frametype2];
					}
					broadest_word = broadest_word.sort(function(a, b){
						return a[frametype2].w * max_word_height/a[frametype2].h - b[frametype2].w * max_word_height/b[frametype2].h;
					})[broadest_word.length - 1];
					if(max_word_height * broadest_word[frametype2].w / broadest_word[frametype2].h < max_word_width) {
						return max_word_height;
					}
					else {
						return max_word_width * broadest_word[frametype2].h / broadest_word[frametype2].w;
					}
				}
			
			}
			catch(e){};
		}
		function drawTest() {
			ctx.clearRect(0, MenuItem.starts * Math.min(Screen.k_width, Screen.k_height), Screen.width, Screen.height);
			var top, center, animal_height;
			if(frametype1 == "frame") {
				animal_height = Screen.height / Math.min(Screen.k_width, Screen.k_height) / 4;
			}
			else {
				animal_height = 100;
			}
			var edge = 0;
			
			if(frametype1 == "frame") {
				center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / 2;
				top = MenuItem.starts + 40 + animal_height + 40;
			}
			else if(frametype1 == "Wordsframe") {
				center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / Math.floor((Task.test.length + 1) / 2);
				top = MenuItem.starts + 40 + animal_height + 40;
			}
			var word_height = setWordHeight();
			ctx.drawImage(atlas[Task.TopicName + frametype1],Task.asked[frametype1].x, Task.asked[frametype1].y, Task.asked[frametype1].w, Task.asked[frametype1].h, (Screen.width - Task.asked[frametype1].w*animal_height/Task.asked[frametype1].h*Math.min(Screen.k_width, Screen.k_height)) / 2, MenuItem.starts*Math.min(Screen.k_width, Screen.k_height) + (20 + 20) * Math.min(Screen.k_width, Screen.k_height), Task.asked[frametype1].w*animal_height/Task.asked[frametype1].h*Math.min(Screen.k_width, Screen.k_height), animal_height*Math.min(Screen.k_width, Screen.k_height));
			for(var i = 0; i < Task.test.length; i++) {
				var wordFrame = (Task.test.concat())[i][frametype2];
				if(frametype1 == "frame") {
					if(k3 != i)
						//ctx.drawImage(atlas.AnimalsWordsframe, wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h,(edge + center/2-wordFrame.w*word_height/wordFrame.h/2)*Math.min(Screen.k_width, Screen.k_height), top*Math.min(Screen.k_width, Screen.k_height), wordFrame.w*word_height/wordFrame.h*Math.min(Screen.k_width, Screen.k_height), word_height*Math.min(Screen.k_width, Screen.k_height));
						ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h,(edge + center/2-wordFrame.w*word_height/wordFrame.h/2)*Math.min(Screen.k_width, Screen.k_height), top*Math.min(Screen.k_width, Screen.k_height), wordFrame.w*word_height/wordFrame.h*Math.min(Screen.k_width, Screen.k_height), word_height*Math.min(Screen.k_width, Screen.k_height));
					
					if(i % 2){
						top = top + word_height + 30;
						edge = 0;
					}
					else edge = center;
				}
				else if(frametype1 == "Wordsframe") {
					if(k3 != i) {
						//ctx.fillRect((edge + center/2-wordFrame.w*word_height/wordFrame.h/2)*Math.min(Screen.k_width, Screen.k_height), top*Math.min(Screen.k_width, Screen.k_height), wordFrame.w*word_height/wordFrame.h*Math.min(Screen.k_width, Screen.k_height), word_height*Math.min(Screen.k_width, Screen.k_height));
						ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h,(edge + center/2-wordFrame.w*word_height/wordFrame.h/2)*Math.min(Screen.k_width, Screen.k_height), top*Math.min(Screen.k_width, Screen.k_height), wordFrame.w*word_height/wordFrame.h*Math.min(Screen.k_width, Screen.k_height), word_height*Math.min(Screen.k_width, Screen.k_height));
						
					}
					if(!((i + 1) % Math.floor((Task.test.length + 1) / 2))){
						top = top + word_height + 20;
						edge = 0;
					}
					else { 
						edge = edge + center;
					}
				}
			}
			
			size_btn = word_height;
			if(frametype1 == "Wordsframe" && frametype2 == "frame") {
				size_btn = 70;
			}
			Display.setButton("exit_btn.png", Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
			drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
			
			if(!Mode.Training) {
				var frame = Properties.Buttons["red-heart.png"];
				var i;
				for(i = 0; i < Task.tries; i++) {
					drawRedHeart(Title.leftSpace + 20 + (2/3*size_btn * frame.w / frame.h + 20) * i, MenuItem.starts + 20, 2/3*size_btn * frame.w / frame.h,2/3*size_btn)
				}
				for(i; i < 4; i++) {
					drawHeart(Title.leftSpace + 20 + (2/3*size_btn * frame.w / frame.h + 20) * i, MenuItem.starts + 20, 2/3*size_btn * frame.w / frame.h,2/3*size_btn)
				}
			}
			else {
				var frame = Properties.Buttons["skip.png"];
				drawSkip(Title.leftSpace + 20, MenuItem.starts + 20, size_btn * frame.w / frame.h,size_btn)
				
			}
		}
		MainCanvas.addEventListener("mouseup", checkClick);
		MainCanvas.addEventListener("touchend", checkClick);
		function checkClick(mouseEvent){
			event.preventDefault();
			if(mouseEvent.which == 1 || mouseEvent.changedTouches) {
				try {
					var touch = mouseEvent.changedTouches[0];
					var rect = MainCanvas.getBoundingClientRect();
					var scaleX = MainCanvas.width / rect.width;
					var scaleY = MainCanvas.height / rect.height;
					mouseX = (touch.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
					mouseY = (touch.clientY - rect.top) * scaleY;
				}
				catch(e) {}
				console.log(mouseX, mouseY);
				
				// menu button has been clicked
				if(Mode.Mobile && !Mode.Menu && Mode.MenuItem && !Mode.Exercise && !Mode.Results && !Mode.SignIn && !Mode.LogIn && mouseInRect(Display.getButton("menu_btn.png"))) {
					Mode.Menu = true;
					Mode.MenuItem = false;
					var Menu = document.createElement('canvas');
					Menu.id = 'MenuCanvas';
					Menu.width = document.getElementById("MainCanvas").width;
					Menu.height = document.getElementById("MainCanvas").height;
					document.getElementById("mainDiv").appendChild(Menu);
					MenuCanvas = document.getElementById("MenuCanvas");
					
					MenuCanvas.addEventListener("touchmove", checkPosMenu, false);
					MenuCanvas.addEventListener("mousemove", checkPosMenu);
					MenuCanvas.addEventListener("mousedown", MouseDown);
					MenuCanvas.addEventListener("touchstart", MouseDown);
					MenuCanvas.addEventListener("mouseup", checkClick);
					MenuCanvas.addEventListener("touchend", checkClick);
					Menu_ctx = document.getElementById("MenuCanvas").getContext("2d");
					
					respondCanvas();
				}
				else if(Mode.Mobile && Mode.Menu && mouseInRect(Display.getButton("menu_btn.png"))) {
					Mode.Menu = false;
					Mode.MenuItem = true;
					$("#MenuCanvas").remove();
					respondCanvas();
				}
				//if(Mode.MenuItem) {
					if(Mode.Tasks && MenuItem.clicked > -1) {
						//top arrow has been clicked
						t_a_height = 100*0.5;
						t_a_width = 0.5*100*226/152;
						pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2;
						pY =  MenuItem.topSpace;
						if(mouseInRect(Display.getButton("top-arrow"))){	
							Task.a_clicked = true;
							if(Task.firstTask > 0) {
								topArrowClicked()
							}
						}			
						//bottom arrow has been clicked
						if(mouseInRect(Display.getButton("bottom-arrow"))){
							Task.a_clicked = true;
							if(Task.firstTask + Task.display < Task.itemsCount[MenuItem.clicked]) {
								bottomArrowClicked();
							}
						}
					}
					
					if(Mode.MenuItem && MenuItem.clicked > -1) {
						//check background click
						//not top & bottom arrows have been clicked
						//top arrow has been clicked
						t_a_height = 100*0.5;
						t_a_width = 0.5*100*226/152;
						pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2;
						pY =  MenuItem.topSpace;
						if(Mode.Tasks && mouseX >= pX*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + t_a_width)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY + t_a_height)*Math.min(Screen.k_width, Screen.k_height)){
							
						}
						else {
							b_a_height = 100*0.5;
							b_a_width = 0.5*100*226/152;
							pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2;
							pY = Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.topSpace - b_a_height;
							if(Mode.Tasks && mouseX >= pX*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + b_a_width)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY + b_a_height)*Math.min(Screen.k_width, Screen.k_height)){
								
							}
							
							//background has been clicked
							else if(((Mode.Tasks && !(mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2 * 5) / 3)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + 150*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + 3 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2 * 5) / 3)* Math.min(Screen.k_width, Screen.k_height))) && !(mouseX >= pX*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + t_a_width)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY + t_a_height)*Math.min(Screen.k_width, Screen.k_height)))&&!(mouseX >= pX*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + b_a_width)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY + b_a_height)*Math.min(Screen.k_width, Screen.k_height))) {
								X_l = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;

								if(!mouseInRect(X_l, MenuItem.topSpace, MenuItem.size, MenuItem.size)) {
									MenuItem.chosen = MenuItem.clicked;
									DrawMenuItem(MenuItem.clicked);
									MenuItem.clicked = -1;
									Mode.Tasks = false;
									
								}
								else {
									//MenuItem.clicked = MenuItem.chosen;
								}
								
								
							}	
						}
					}
					
					//Menu Item has been clicked
					if(Mode.MenuItem && MenuItem.clicked == -1) {
						var j = 0;
						while (j < MenuItem.display)  {
							X_l = 2 * MenuItem.leftSpace + 100*koef + 68 * (j + 1) + MenuItem.size * j - 68;
							X_r = 2 * MenuItem.leftSpace + 100*koef + 68 * (j + 1) + MenuItem.size * (j + 1) - 68;
							if(mouseY >= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace)  && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.size + MenuItem.topSpace)  && (mouseX >= Math.min(Screen.k_width, Screen.k_height) * X_l && mouseX <= Math.min(Screen.k_width, Screen.k_height) * X_r)){
								if(Properties.Tasks[j + MenuItem.firstItem].length) {
									Mode.Tasks = true;
									Task.firstTask = 0;
									//Mode.Exercise = false;
									MenuItem.clicked = j + MenuItem.firstItem;
									MenuItemClicked(MenuItem.clicked);
									//###								
									
								}
								else {
									console.log("no tasks yet");
								}
								
								j = MenuItem.display + 1;		
								
								
							}
							else {
								j++;
							}
						}
					}
					
					//left arrow has been clicked
					if(Mode.MenuItem && MenuItem.firstItem >= 0) {
						if (mouseX >= Math.min(Screen.k_width, Screen.k_height) * MenuItem.leftSpace && mouseX <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.leftSpace + koef*100) && mouseY >=  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 -  koef*100*226/152/ 2 ) && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 -  koef*100*226/152/ 2 + koef*100*226/152) ) {	
							leftArrowClicked();
						}
					}
					
					//right arrow has been clicked
					var r_a_height = koef*100*226/152;
					var r_a_y =  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2;
					var r_a_width = koef*100;
					var r_a_x = MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width;
					if(Mode.MenuItem && MenuItem.firstItem + MenuItem.display < MenuItem.itemsCount){
						if (mouseX >= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - 100*koef) && mouseX <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - 100*koef + koef*100) && mouseY >=  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2)  && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2 + koef*100*226/152)) {	
							rightArrowClicked();
						}
					}
					
						
					
					
					//Login button has been clicked
					if(((Mode.Mobile && Mode.Menu) || (!Mode.Mobile && Mode.MenuItem)) && !Mode.Exercise && !Profile.LoggedIn && !Mode.SignIn && !Mode.LogIn && mouseInRect(Display.getButton("login_btn.png"))) {
						if(Forms_loaded == false)
							loadForms()
						drawLoading();
						if(Profile.storeUserNameLogIn == true)
							Profile.storeUserNameLogIn = false;
						if(Profile.storePasswordLogIn == true)
							Profile.storePasswordLogIn = false;
						showLogInForm()
					}
					//Sign Up button has been clicked
					if(!Mode.Mobile && !Mode.Exercise &&!Profile.LoggedIn && !Mode.LogIn && !Mode.LogIn && mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace) * Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + Profile.size_btn) * Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
						if(Forms_loaded == false)
							loadForms();
						showSignInForm();
						
					
						//Profile.UserName = "Username"
						Profile.UserName = "";
						//Profile.Password = "Password"
						Profile.Password = "";
					}
				}
				//Sound button is clicked
				if(!Mode.Mobile && !Mode.LogIn && !Mode.SignIn && mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + (Profile.size_btn - 2 * 5) / 3)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + 150*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + 3 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2 * 5) / 3)* Math.min(Screen.k_width, Screen.k_height)) {
					fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + 3 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
					if(sound_on) {
						drawSoundOffButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
						sound_on = false;
						var video = document.getElementById("Video");
						if(video)
							$("#Video").muted = true;
					}
					else {
						drawSoundOnButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
						sound_on = true;
						var video = document.getElementById("Video");
						if(video)
							$("#Video").muted = false;
					}
					
				}
				if(Mode.LogIn) {
					if(Mode.LogIn && mouseInRect((Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size *4/3) / 205 * 368)/2, MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size * 4/3) / 2, (MenuItem.size *4/3) / 205 * 368, MenuItem.size * 4/3)) {
						//log in area clicked
					}
					
					//cancel button has been clicked during login mode
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
					Y_ = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
					console.log(Mode.LogIn, mouseInRect(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202))
					if(Mode.LogIn && mouseInRect(Display.getButton("log_in_form_cancel_btn.png"))) {
						setTimeout(function(){
						if(Profile.storeUserNameLogIn == true)
							Profile.storeUserNameLogIn = false;
						if(Profile.storePasswordLogIn == true)
							Profile.storePasswordLogIn = false;
						Profile.UserName = "";
						Profile.Password = "";
						$("#UserName").remove();
						$("#Password").remove();
						$("#inputdiv").remove();
						
						clearScreenRect(0, 0, Screen.width/ Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height) )
						Mode.LogIn = false;
						Mode.MenuItem = true;
						respondCanvas();
						}, 200);
					}
					//username area has been clicked LogIn Mode
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
					Y_ = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
					if(Mode.LogIn && mouseInRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size)){
						UserNameAreaClickedLogIn()
					}
					
					//password area has been clicked LogIn Mode
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
					Y_ = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
					if(Mode.LogIn && mouseInRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 115 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size)){
						//PasswordAreaClickedLogIn();
						
					}
					
					
					//login button clicked LogIn Mode
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
					Y_ = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
					if(Mode.LogIn && mouseInRect(Display.getButton("log_in_form_login_btn.png")))
					{
						if(checkProfileData(document.getElementById("UserName").value, document.getElementById("Password").value)) {
							drawLoading();
							Profile.UserName = document.getElementById("UserName").value;
							Profile.Password = document.getElementById("Password").value;
							var User = {};
							User.UserName = Profile.UserName;
							User.Password = Profile.Password;
							socket.emit('auth', {
								User: User
							})
							var ok;
							socket.on('auth', function(data){
								if(data.res) {
									ok = true;
									Profile.Accent = data.User.Accent;
									Profile.LoggedIn = true;
									Mode.LogIn = false;
									Mode.MenuItem = true;
									Profile.storeUserNameLogIn = false;
									Profile.storePasswordLogIn = false;
									clearScreenRect(0, 0, Screen.width/ Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height) )
									$("#UserName").remove();
									$("#Password").remove();
									$("#inputdiv").remove();
									Profile.Password = "";
									respondCanvas();
								}
								else if(data.res == false) {
									if(ok == undefined) {
										ok = false;
										alert("Wrong data");
									}
								}
								
							});
						}
						else {
							alert("fill all the information");
							console.log("fill all the information");
						}
					}
					//background has been clicked during LogIn Mode
					if(Mode.LogIn && !mouseInRect(X_ + 47 - 2, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40 - 2, (MenuItem.size) / 202 * 156 + 4, MenuItem.size * 37 / 202 + 4)&& !(mouseInRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 115 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size) || mouseInRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size))) {
						if(Profile.storeUserNameLogIn == true)
							Profile.storeUserNameLogIn = false;
						if(Profile.storePasswordLogIn == true)
							Profile.storePasswordLogIn = false;
					}
				}
				if(Mode.SignIn){
					//username area clicked SignIn Mode
					Y_ = (MenuItem.topSpace + MenuItem.starts) / 2
					size_ = 2*(Y_ - MenuItem.starts) + MenuItem.size;
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
					if(Mode.SignIn && mouseInRect(X_ + 35 / 368 * size_, Y_ + 57 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_)) {
						UserNameAreaClickedSignIn()
						//fillRect(X_ + 35 / 368 * size_, Y_ + 57 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_)
						
					}
					if(Mode.SignIn && mouseInRect((Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size *3/2))/2, MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size * 3/2) / 2, (MenuItem.size *6/4), MenuItem.size * 6/4)) {
									
					}
					//password area clicked SignIn Mode
					Y_ = (MenuItem.topSpace + MenuItem.starts) / 2
					size_ = 2*(Y_ - MenuItem.starts) + MenuItem.size;
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
					if(Mode.SignIn && mouseInRect(X_ + 35 / 368 * size_, Y_ + 115 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_)) {
						//PasswordAreaClickedSignIn()
						//fillRect(X_ + 35 / 368 * size_, Y_ + 115 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_)
					}
					if(Mode.SignIn && !(mouseInRect(X_ + 35 / 368 * size_, Y_ + 57 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_) || mouseInRect(X_ + 35 / 368 * size_, Y_ + 115 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_))) {
						if(Profile.storeUserNameSignIn == true)
							Profile.storeUserNameSignIn = false;
						if(Profile.storePasswordSignIn == true)
							Profile.storePasswordSignIn = false;
					}
					
					//flag area clicked SignIn Mode
					Y_ = (MenuItem.topSpace + MenuItem.starts) / 2
					size_ = 2*(Y_ - MenuItem.starts) + MenuItem.size;
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
					//American accent
					if(Mode.SignIn && mouseInRect(X_ + 35 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23/ 368 * size_)) {
						AmericanAccent()
						//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
						//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
						drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
						drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
							
					}
					//Australian accent
					Y_ = (MenuItem.topSpace + MenuItem.starts) / 2
					size_ = 2*(Y_ - MenuItem.starts) + MenuItem.size;
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
					if(Mode.SignIn && mouseInRect(X_ + 80 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23 / 368 * size_)) {
						AustralianAccent()
						//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
						//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
						drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
						drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
						
					}
					//British accent
					Y_ = (MenuItem.topSpace + MenuItem.starts) / 2
					size_ = 2*(Y_ - MenuItem.starts) + MenuItem.size;
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
					if(Mode.SignIn && mouseInRect(X_ + 124 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23 / 368 * size_)) {
						BritishAccent()
						//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
						//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
						drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
						drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
						
					}
					//Cancel button clicked SignIn Mode
					Y_ = (MenuItem.topSpace + MenuItem.starts) / 2
					size_ = 2*(Y_ - MenuItem.starts) + MenuItem.size;
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
					//if (Mode.SignIn && mouseInRect(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)) {
					if (Mode.SignIn && mouseInRect(Display.getButton("sign_in_form_cancel_btn.png"))) {
						setTimeout(function(){
						Mode.SignIn = false;
						Mode.MenuItem = true;
						NewAccent = "UK English Male";
						if(Profile.storeUserNameSignIn == true)
							Profile.storeUserNameSignIn = false;
						if(Profile.storePasswordSignIn == true)
							Profile.storePasswordSignIn = false;
						Profile.UserName = "";
						Profile.Password = "";
						$("#UserName").remove();
						$("#Password").remove();
						$("#inputdiv").remove();
						clearScreenRect(0, 0, Screen.width/ Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height) )
						respondCanvas();
						}, 200);
					}
					
					//Signin button clicked SignIn mode
					Y_ = (MenuItem.topSpace + MenuItem.starts) / 2
					size_ = 2*(Y_ - MenuItem.starts) + MenuItem.size;
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
					console.log(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156, Display.getButton("sign_in_form_signin_btn.png"));
					//if (Mode.SignIn && mouseInRect(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)) {
					if (Mode.SignIn && mouseInRect(Display.getButton("sign_in_form_signin_btn.png"))) {
						if(checkProfileData(document.getElementById("UserName").value, document.getElementById("Password").value)){
							drawLoading();
							var ok;
							Profile.UserName = document.getElementById("UserName").value;
							Profile.Password = document.getElementById("Password").value;
							var User = {};
							User.UserName = Profile.UserName;
							User.Password = Profile.Password;
							User.Accent = NewAccent;
							socket.emit('newUser', {
								User: User
							});
							socket.on('newUser', function(data){
								if(data.res) {
									ok = true;
									Profile.LoggedIn = true;
									Mode.SignIn = false;
									Mode.MenuItem = true;
									Profile.storeUserNameSignIn = false;
									Profile.storePasswordSignIn = false;
									Profile.Accent = NewAccent;
									clearScreenRect(0, 0, Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height) )
									$("#UserName").remove();
									$("#Password").remove();
									$("#inputdiv").remove();
									Profile.Password = "";
									respondCanvas();
								}
								else if(!data.res) {
									if(ok == undefined) {
										ok = false;
										alert("This user name is already taken");
									}
								}
								
							})
							
						}
						else {
							alert("Fill all information");
						}
					}
				}
				function selectAnimal(){
					
					if(!Mode.Training && Task.toTest.length == Task.test.length) {
						
						Task.Result.Start = new Date;
						Task.Result.Answers = [];
						if(Mode.Quiz) {
							Quiz.Start = Task.Result.Start;
							Task.Result.Quiz = true;
						}
					}
					if(Task.toTest.length) {
						document.getElementById("Loading").style.visibility = "hidden";
						var i = functions.randomInteger(0, Task.toTest.length - 1);
						var animal = Task.toTest.concat()[i];
						Task.asked = Task.toTest.concat()[i];
						ctx.fillStyle="#000000";
						Task.tries = Task.MaxPoint;
						delete Pressed.x;
						delete Pressed.y;
						
						drawTest();
					}
					else if(!Mode.Training){
						Task.Result.Finish = new Date;
						delete Task.Result.time;
						Mode[Task.TaskName.replace(/\s/g,'')] = false;
						if(!Mode.Quiz) {
							loadForms();
							drawLoading();
							showResultForm(Task.Result.Answers, Task.Total, Task.MaxPoint);
						}
						else {
							if(Profile.LoggedIn) {
								Task.Result.Finish = new Date();
								socket.emit("Result", {Result: Task.Result});
							}
							Quiz.Total = Quiz.Total + Task.Result.Answers.length;
							Quiz.Correct = Quiz.Correct + countCorrect(Task.Result.Answers);
							Quiz.Points = Quiz.Points + countPoints(Task.Result.Answers, Task.Result.Answers.length, Quiz.Content[Exercise_num].Max_point);
							Quiz.TotalMax = Quiz.TotalMax + Task.Result.Answers.length * Quiz.Content[Exercise_num].Max_point;
							Mode.Results = false;
							Task.Result = {};
							delete Task.Frames[Task.TaskName];
							ctx.clearRect(0, MenuItem.starts * Math.min(Screen.k_width, Screen.k_height), Screen.width, (MenuItem.ends - MenuItem.starts) * Math.min(Screen.k_width, Screen.k_height));
								
							Exercise_num++;
							if(Exercise_num < Quiz.Content.length)
								showTask(Quiz.Content[Exercise_num].Name, Quiz.Content[Exercise_num].Topic_Name, Quiz.Content[Exercise_num].Max_point, Quiz.Content[Exercise_num].Content.length, -1, Quiz.Content[Exercise_num].Content);
							else {
								if(Mode.Quiz)
									Quiz.Finish = new Date;
								loadForms();
								drawLoading();
								showResultForm();
							}
						}
					}
					else {
						Mode[Task.TaskName.replace(/\s/g,'')] = false;
						clearRect(0,0,Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height));
						drawHeader();
						var digit_frame = Properties.Numbers["1.png"];
						var digit = {};
						digit.h = (MenuItem.ends - MenuItem.starts) / 2;
						digit.w = digit.h * digit_frame.w / digit_frame.h;
						drawDigit(3, (Screen.width / Math.min(Screen.k_width, Screen.k_height) - digit.w) / 2, (Screen.height  / Math.min(Screen.k_width, Screen.k_height) - digit.h)/2, digit.w, digit.h);
						setTimeout(function(){
							clearRect(0,0,Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height));
							drawHeader();
							drawDigit(2, (Screen.width / Math.min(Screen.k_width, Screen.k_height) - digit.w) / 2, (Screen.height  / Math.min(Screen.k_width, Screen.k_height) - digit.h)/2, digit.w, digit.h);
							setTimeout(function(){
								clearRect(0,0,Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height));
								drawHeader();
								drawDigit(1, (Screen.width / Math.min(Screen.k_width, Screen.k_height) - digit.w) / 2, (Screen.height  / Math.min(Screen.k_width, Screen.k_height) - digit.h)/2, digit.w, digit.h);
									setTimeout(function(){
										Mode[Task.TaskName.replace(/\s/g,'')] = true;
										Mode.Training = false;
										clearRect(0,0,Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height));
										drawHeader();
										setTest((Task.Frames[Task.TaskName]).concat(), Task.Total);
								}, 1000)
							}, 1000)
						},1000)
					}
				}
				
				
				function checkAnswer(answer_i) {
					if(Task.test[answer_i].Word == Task.asked.Word) {
						return true;
					}
					else {
						return false;
					}
				}
				function setTest(Array, N){
					document.getElementById("Loading").style.visibility = "hidden";
					Mode.Results = false;
					Mode.CountDown = false;
					Task.Total = N;
					if(!Mode.Training)
						Task.test = functions.getRandomArray(Array, [], N);
					else
						Task.test = functions.getRandomArray(Array, [], Array.length);
					Task.toTest = Task.test.slice(0);
					selectAnimal();
				}
				var checkloaded = {};
				checkloaded.Animals = function (TaskName, N) {
					if(Task.loadedAnimalsWordsframe && Task.loadedAnimalsframe) {
						try {
							if(Profile.LoggedIn) {
								Task.Result.UserName = Profile.UserName;
								Task.Result.Exercise = TaskName;
								Task.Result.Topic_Name = Task.TopicName;
							};
							
							setTest(Task.Frames[TaskName].concat(), N);
						}
						catch(e) {
							setTimeout(function() {
								checkloaded.Animals(TaskName, N);
							}, 200);
							
						}
					}
					else {setTimeout(function(){
							checkloaded.Animals(TaskName, N);
						}, 200)
					}
				}
				checkloaded.Numbers = function (TaskName, N) {
					if(Task.loadedNumbersWordsframe && Task.loadedNumbersframe) {
						try {
							if(Profile.LoggedIn) {
								Task.Result.UserName = Profile.UserName;
								Task.Result.Exercise = TaskName;
								Task.Result.Topic_Name = Task.TopicName;
							};
							setTest(Task.Frames[TaskName].concat(), N);
						}
						catch(e) {
							setTimeout(function() {
								//checkloaded.Numbers(TaskName, N);
							}, 200);
							
						}
					}
					else {setTimeout(function(){
							checkloaded.Numbers(TaskName, N);
						}, 200)
					}
				}
				function showTask(TaskName, TopicName,Points, N, j = -1, QuizArray = []) {
					Mode.CountDown = false;
					Task.TaskName = TaskName;
					Task.TopicName = TopicName;
					Task.MaxPoint = Points;
					Task.N_toTest = N;
					if(Mode.Quiz) {
						Task.Frames[TaskName] = QuizArray;
						Mode.Training = false;
					}
					k2 = -1;
					k3 = -1;
					word_ch = false;
					switch(TaskName) {
						case 'Alphabet song':
							Mode.MusicVideo = true;
							Mode[Task.TaskName.replace(/\s/g,'')] = true;
							socket.emit('getVideoID', {
								TaskName: TaskName,
								Accent: Profile.Accent
							})
							socket.on('getVideoID', function(data){
								Task.Frames[Task.TaskName] = data.Content;
								PlaySong();
							})
							drawLoading();
							break;
						case 'Name animals':
							Mode[Task.TaskName.replace(/\s/g,'')] = true;
							frametype1 = "frame";
							frametype2 = "Wordsframe";
							if(!Mode.Quiz)
								Mode.Training = true;
							if(!Task.loadedAnimalsWordsframe)
								loadAnimalsWords();
							if(!Task.loadedAnimalsframe)
								loadAnimals();
							
							drawLoading();
							if(!Mode.Quiz) {
							socket.emit('getTask', {
								TaskName: TaskName
							})
							socket.on('getTask', function(data){
								//Animals = data.Content;
								Task.Frames[TaskName] = data.Content;
								checkloaded.Animals(TaskName, N);
								})
							}
							else
								checkloaded.Animals(TaskName, N);
							try{
								size_btn = setWordHeight();
								if(frametype1 == "Wordsframe" && frametype2 == "frame")
									size_btn = 70;
							}
							catch(e) {
								size_btn = ((MenuItem.ends - MenuItem.starts - 40) - 4 * 10 - (MenuItem.ends - MenuItem.starts - 40) * 2/5) / 5
							}
							Display.setButton("exit_btn.png", Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
							drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
							
							break;
						case 'Find the animal':
							drawLoading();
							
							Mode.Findtheanimal = true;
							if(!Mode.Quiz)
								Mode.Training = true;
							frametype1 = "Wordsframe";
							frametype2 = "frame";
				
							if(!Task.loadedAnimalsWordsframe)
								loadAnimalsWords();
							if(!Task.loadedAnimalsframe)
								loadAnimals();
							
								
							if(!Mode.Quiz) {
								socket.emit('getTask', {
									TaskName: TaskName
								})
								socket.on('getTask', function(data){
									Task.Frames[TaskName] = data.Content;
									checkloaded.Animals(TaskName, N);	
								})	
							}
							else							
								checkloaded.Animals(TaskName, N);							
							try{
								size_btn = setWordHeight();
								if(frametype1 == "Wordsframe" && frametype2 == "frame")
									size_btn = 70;
							}
							catch(e) {
								size_btn = ((MenuItem.ends - MenuItem.starts - 40) - 4 * 10 - (MenuItem.ends - MenuItem.starts - 40) * 2/5) / 5
							}
							drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
							
							break;
						case 'Name numbers from 0 to 9':
							
							if(!Mode.Quiz)
									Mode.Training = true;
							frametype2 = "Wordsframe";
							frametype1 = "frame";
							if(!Task["loaded" +TopicName + "Wordsframe"])
								loadNumbersWords();
							if(!Task["loaded" +TopicName + "frame"])
								loadNumbers();
							drawLoading();
							if(!Mode.Quiz) {
								socket.emit('getTask', {
									TaskName: TaskName
								})
								socket.on('getTask', function(data){
									Task.Frames[TaskName] = data.Content;
									checkloaded.Numbers(TaskName, N);		
								})		
							}
							else
								checkloaded.Numbers(TaskName, N);
							try{
								size_btn = setWordHeight();
								if(frametype1 == "Wordsframe" && frametype2 == "frame")
									size_btn = 70;
							}
							catch(e) {
								size_btn = ((MenuItem.ends - MenuItem.starts - 40) - 4 * 10 - (MenuItem.ends - MenuItem.starts - 40) * 2/5) / 5
							}
							drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
							
							break;
						case 'Find numbers from 0 to 9':
							if(!Mode.Quiz)
								Mode.Training = true;
							frametype1 = "Wordsframe";
							frametype2 = "frame";
							if(!Task["loaded" +TopicName + "Wordsframe"])
								loadNumbersWords();
							if(!Task["loaded" +TopicName + "frame"])
								loadNumbers();
							drawLoading();
							if(!Mode.Quiz) {
								socket.emit('getTask', {
									TaskName: TaskName
								})
								socket.on('getTask', function(data){
									Task.Frames[TaskName] = data.Content;
									checkloaded.Numbers(TaskName, N);		
								})		
							}
							else
								checkloaded.Numbers(TaskName, N);
							try{
								size_btn = setWordHeight();
								if(frametype1 == "Wordsframe" && frametype2 == "frame")
									size_btn = 70;
							}
							catch(e) {
								size_btn = ((MenuItem.ends - MenuItem.starts - 40) - 4 * 10 - (MenuItem.ends - MenuItem.starts - 40) * 2/5) / 5
							}
							drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
							
							break;
							
							case 'Animals song':
								Mode.MusicVideo = true;
								Mode[Task.TaskName.replace(/\s/g,'')] = true;
								socket.emit('getVideoID', {
									TaskName: TaskName,
									Accent: Profile.Accent
								})
								socket.on('getVideoID', function(data){
									Task.Frames[Task.TaskName] = data.Content;
									PlaySong();
								})
								drawLoading();
							break;
							case 'Numbers song (1 - 10)':
								Mode.MusicVideo = true;
								Mode[Task.TaskName.replace(/\s/g,'')] = true;
								socket.emit('getVideoID', {
									TaskName: TaskName,
									Accent: Profile.Accent
								})
								socket.on('getVideoID', function(data){
									Task.Frames[Task.TaskName] = data.Content;
									PlaySong();
								})
								drawLoading();
							break;
							case 'Numbers song (1 - 20)':
								Mode[Task.TaskName.replace(/\s/g,'')] = true;
								socket.emit('getVideoID', {
									TaskName: TaskName,
									Accent: Profile.Accent
								})
								socket.on('getVideoID', function(data){
									Task.Frames[Task.TaskName] = data.Content;
									PlaySong();
								})
								drawLoading();
							break;
							default: 
									delete Task.TaskName;
									delete Task.TopicName;
									delete Task.MaxPoint;
									delete Task.N_toTest;
									Mode.Exercise = false;
									Mode.Tasks = true;
									Mode.MenuItem = true;
									MenuItem.clicked = j;
									MenuItem.chosen = j;
									
									Mode.LogIn = false;
									Mode.SignIn = false;
									Mode.Results = false;
									
									respondCanvas();
									//alert(TaskName + " is not available yet:(");
					}
				}
				
				
				//exit button has been clicked during song
				//var size_btn = 70;
				//if (Mode.Exercise && Mode.MusicVideo && !Mode.SignIn && !Mode.LogIn && mouseInRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn)) {
				if (Mode.Exercise && Mode.MusicVideo && !Mode.SignIn && !Mode.LogIn && mouseInRect(Display.getButton("exit_btn.png"))) {
					Mode.MenuItem = true;
					Mode.Exercise = false;
					$("#Video").remove();
					$("inputdiv").remove();
					
					Mode[Task.TaskName.replace(/\s/g,'')] = false;
					Mode.MusicVideo = false;
					clearRect(0, MenuItem.starts, Screen.width / Math.min(Screen.k_width, Screen.k_height), MenuItem.ends);
					MenuItem.clicked = -1;
					MenuItem.chosen = MenuItem.clicked;
					setTimeout(function(){
						initMenu();
					}, 20)
					if(Profile.LoggedIn) {
						Task.Result.Finish = new Date();
						socket.emit("Result", {Result: Task.Result});
					}
					Task.Result = {};
				}
				
				//task has been clicked
				console.log("look", Mode.Tasks);
				if(Mode.Tasks) {
					var j = MenuItem.clicked;
					var i = 0;
					console.log("here", i);
					while (i < Task.display)  {
						var pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
						var pY =  MenuItem.topSpace;
						var t_a_width = 100*0.5;
						var t_a_height = 0.5*100*226/152;
						console.log("here", i);
						if(mouseInRect(Display.getTask(j, i))){
							
							try{
								Mode.Exercise = true;
								clearRect(0, MenuItem.starts, Screen.width/ Math.min(Screen.k_width, Screen.k_height), MenuItem.ends)
								Mode.Tasks = false;
								Mode.MenuItem = false;
								showTask(Properties.Tasks[j][Task.firstTask + i].Name, Properties.Tasks[j][Task.firstTask + i].Topic_Name, Properties.Tasks[j][Task.firstTask + i].Max_point, Properties.Tasks[j][Task.firstTask + i].N_toTest, j);						
							}
							catch(e){};
							i  = Task.display + 1;
						}
						else {
							i++;
						}
					}
				}
				//MatchTheAnimalsWithTheirNames exit button has been clicked
				if(Mode.Results || (Mode.Exercise && !Mode.MusicVideo)) {
					try{
						size_btn = setWordHeight();
						if(frametype1 == "Wordsframe" && frametype2 == "frame")
							size_btn = 70;
					}
					catch(e) {
						size_btn = ((MenuItem.ends - MenuItem.starts - 40) - 4 * 10 - (MenuItem.ends - MenuItem.starts - 40) * 2/5) / 5
					}
				}
				//if (Mode.Exercise && !Mode.MusicVideo && !Mode.Results && !Mode.SignIn && !Mode.LogIn && mouseInRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn)) {
				if (Mode.Exercise && !Mode.MusicVideo && !Mode.Results && !Mode.SignIn && !Mode.LogIn && mouseInRect(Display.getButton("exit_btn.png"))) {
					if(Mode.Quiz)
						Mode.Quiz = false;
					Mode.MenuItem = true;
					Mode.Exercise = false;
					delete Task.Frames[Task.TaskName];
					delete Task.toTest;
					delete Task.test;
					Mode[Task.TaskName.replace(/\s/g,'')] = false;
					ctx.clearRect(0, 0, Screen.width, Screen.height)
					MenuItem.clicked = -1;
					MenuItem.chosen = MenuItem.clicked;
					initMenu();
					delete Task.Result.time;
					
					
					if(Profile.LoggedIn && !Mode.Training){
						socket.emit("Result", {Result: Task.Result});
						
					}
					Task.Result = {};
				}
				//MatchTheAnimalsWithTheirNames word has been clicked
				if ((!Mode.Menu && !Mode.CountDown && !Mode.Results && Mode.Exercise && !Mode.MusicVideo) && !Mode.SignIn && !Mode.LogIn) {
					try {
						Array = [];
						var edge = 0;
						var top, center, animal_height;
						if(frametype1 == "frame") {
							animal_height = Screen.height / Math.min(Screen.k_width, Screen.k_height) / 4;
							top = Screen.height * MenuItem.starts + 40 + animal_height + 40;
							center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / 2;
						}
						else if(frametype1 == "Wordsframe") {
							center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / Math.floor((Task.test.length + 1) / 2);
							top = MenuItem.starts + 40 + animal_height + 40;
							animal_height = 100;
						}
						var word_height = setWordHeight();
						
						
						for(var i = 0; i < Task.test.length; i++) {
							var wordFrame = (Task.test.concat())[i][frametype2];
							Array[i] = {};
							Array[i].x = (edge + center/2-wordFrame.w*word_height/wordFrame.h/2);
							Array[i].y = top;
							Array[i].w = wordFrame.w*word_height/wordFrame.h;
							Array[i].h = word_height;
							
							if(frametype1 == "frame") {
								if(i % 2){
									top = top + word_height + 30;
									edge = 0;
								}
								else edge = center;
							}
							else if(frametype1 == "Wordsframe") {
								if(!((i + 1) % Math.floor((Task.test.length + 1) / 2))){
								top = top + word_height + 20;
								edge = 0;
								}
								else { 
									edge = edge + center;
								}
							}
						}
						if((Mode.Exercise && !Mode.MusicVideo) &&k3 != -1) {
							drawHeader();
							clearRect(0, MenuItem.starts, Screen.width/ Math.min(Screen.k_width, Screen.k_height), Screen.height/ Math.min(Screen.k_width, Screen.k_height));
							
							if(mouseInRect((Screen.width / Math.min(Screen.k_width, Screen.k_height) - Task.asked[frametype1].w*animal_height/Task.asked[frametype1].h) / 2, MenuItem.starts + (20 + 20), Task.asked[frametype1].w*animal_height/Task.asked[frametype1].h, animal_height)) {
								Task.tries--;
								var correct = checkAnswer(k3);
								if(correct){
									if(Task.TopicName != "Numbers")
										speak("a " + Task.test[k3].Word);
									else
										speak(Task.test[k3].Word);
									var frame = Properties.Buttons["correct.png"];
									var word_width = Screen.width / Math.min(Screen.k_width, Screen.k_height) / 3;
									var word_height = word_width * frame.h / frame.w;
									drawCorrect((Screen.width / Math.min(Screen.k_width, Screen.k_height) - word_width) / 2, MenuItem.starts - word_height - 20, word_width, word_height);
										
									Task.toTest.splice(Task.toTest.indexOf((Task.test.concat())[k3]), 1);
									if(!Mode.Training && Task.Result.Answers.length) {
										time = new Date;
										Task.Result.Answers.push({Word: Task.test[k3].Word, Attempts: 4 - Task.tries, Time: (time - Task.Result.time) / 1000});
										Task.Result.time = time;
									}
									else if(!Mode.Training) {
										Task.Result.time = new Date;
										Task.Result.Answers.push({Word: Task.test[k3].Word, Attempts: 4 - Task.tries, Time: (Task.Result.time - Task.Result.Start) / 1000});
									}
									k3 = -1;
									selectAnimal();
									
									delete Pressed.x;
									delete Pressed.y;
									setTimeout(function(){
										drawHeader();
									}, 500)
								}
								else {
									if(Task.tries) {
										drawTest();
										
									}
									else {
										Task.toTest.splice(Task.toTest.indexOf(Task.asked), 1);
										if(!Mode.Training && Task.Result.Answers.length) {
											time = new Date;
											Task.Result.Answers.push({Word: Task.asked.Word, Attempts: 0, Time: (time - Task.Result.time) / 1000});
											Task.Result.time = time;
										}
										else if(!Mode.Training) {
											Task.Result.time = new Date;
											Task.Result.Answers.push({Word: Task.asked.Word, Attempts: 0, Time: (Task.Result.time - Task.Result.Start) / 1000});
										}
										if(Task.TopicName != "Numbers")
											speak("a " + Task.asked.Word);
										else
											speak(Task.asked.Word);
										Task.Result.time = new Date;
										setTimeout(function(){
											selectAnimal();
										}, 500)
									}
									setTimeout(function(){
										drawHeader();
									}, 500)
									var frame = Properties.Buttons["wrong.png"];
									var word_width = Screen.width / Math.min(Screen.k_width, Screen.k_height) / 3;
									var word_height = word_width * frame.h / frame.w;
									drawWrong((Screen.width / Math.min(Screen.k_width, Screen.k_height) - word_width) / 2, MenuItem.starts - word_height - 20, word_width, word_height);
									
									k3 = -1;
									drawTest();
									delete Pressed.x;
									delete Pressed.y;
									
								}
							}
							else {
								k3 = -1;
								delete Pressed.x;
								delete Pressed.y;
								drawTest();
							}
						}
						var i = checkPoint({x:mouseX, y:mouseY}, Array);
						if(i < Array.length) {
							if(Task.TopicName != "Numbers")
								speak("a " + Task.test[i].Word);
							else
								speak(Task.test[i].Word);
						}
						else if(Mode.Exercise){
							k3 = -1;
							delete Pressed.x;
							delete Pressed.y;
							if(Mode[Task.TaskName])
								drawTest();	
							
						}	
					}
					catch(e){}
				}
				
				if(Mode.Results || (Mode.Exercise && !Mode.MusicVideo)) {
					//try again clicked in result form
					var frame = Properties.Forms["result_form.png"];
					var Result_form = {};
					Result_form.h = MenuItem.size;
					Result_form.w = Result_form.h * frame.w / frame.h;
					Result_form.x = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - Result_form.w) / 2;
					Result_form.y = (Screen.height / Math.min(Screen.k_width, Screen.k_height) - Result_form.h) / 2;
					
					var btn = Properties.Forms["result_form_try_again_btn.png"];
					var btn_width = (Result_form.w - 2 * 20 * Result_form.w / frame.w - 20) / 2;
					var btn_height = btn_width * btn.h / btn.w;
					if (!Mode.Quiz && Mode.Results && !Mode.SignIn && !Mode.LogIn && mouseInRect(Result_form.x + 20 * Result_form.w / frame.w, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w, btn_width, btn_height)) {
						Task.Result = {};
						Mode[Task.TaskName.replace(/\s/g,'')] = true;
						Mode.Results = false;
						Task.Result = {};
						if(Profile.LoggedIn) {
							Task.Result.UserName = Profile.UserName;
							Task.Result.Exercise = Task.TaskName;
							Task.Result.Topic_Name = Task.TopicName;
						};
						
						showTask(Task.TaskName, Task.TopicName, Task.MaxPoint, Task.N_toTest);
						
					}
					
					var frame = Properties.Forms["result_form.png"];
					var Result_form = {};
					Result_form.h = MenuItem.size;
					Result_form.w = Result_form.h * frame.w / frame.h;
					Result_form.x = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - Result_form.w) / 2;
					Result_form.y = (Screen.height / Math.min(Screen.k_width, Screen.k_height) - Result_form.h) / 2;
					
					var btn = Properties.Forms["result_form_okay_btn.png"];
					var btn_width = (Result_form.w - 2 * 20 * Result_form.w / frame.w - 20) / 2;
					var btn_height = btn_width * btn.h / btn.w;
					
					
					//okay has been clicked in show results
					if (Mode.Results && !Mode.SignIn && !Mode.LogIn && mouseInRect(Result_form.x + 20 * Result_form.w / frame.w + 20 + btn_width, Result_form.y + Result_form.h - btn_height / 2 -  10 * Result_form.w / frame.w, btn_width, btn_height)) {
						
						Mode.Quiz = false;
						Mode.MenuItem = true;
						Mode.Exercise = false;
						delete Task.Frames[Task.TaskName];
						delete Task.toTest;
						delete Task.test;
						Mode.Results = false;
						Task.Result = {};
						Mode[Task.TaskName.replace(/\s/g,'')] = false;
						
						
						ctx.clearRect(0, 0, Screen.width, Screen.height);
						MenuItem.clicked = -1;
						MenuItem.chosen = MenuItem.clicked;
						setTimeout(function() {
							initMenu();
						}, 100);
						
					}
					//skip has been clicked
					var size_btn = setWordHeight();
					if(frametype1 == "Wordsframe" && frametype2 == "frame")
							size_btn = 70;
					var frame = Properties.Buttons["skip.png"];
					
					if (!Mode.Quiz && Mode.Training && (Mode.Exercise && !Mode.MusicVideo) && !Mode.SignIn && !Mode.LogIn && mouseInRect(Title.leftSpace + 20, MenuItem.starts + 20, size_btn * frame.w / frame.h,size_btn)) {
						Mode.CountDown = true;
						Mode.Training = false;
						Mode[Task.TaskName.replace(/\s/g,'')] = false;
							clearRect(0,0,Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height));
							drawHeader();
							var digit_frame = Properties.Numbers["1.png"];
							var digit = {};
							digit.h = (MenuItem.ends - MenuItem.starts) / 2;
							digit.w = digit.h * digit_frame.w / digit_frame.h;
							drawDigit(3, (Screen.width / Math.min(Screen.k_width, Screen.k_height) - digit.w) / 2, (Screen.height  / Math.min(Screen.k_width, Screen.k_height) - digit.h)/2, digit.w, digit.h);
							setTimeout(function(){
								clearRect(0,0,Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height));
								drawHeader();
								drawDigit(2, (Screen.width / Math.min(Screen.k_width, Screen.k_height) - digit.w) / 2, (Screen.height  / Math.min(Screen.k_width, Screen.k_height) - digit.h)/2, digit.w, digit.h);
								setTimeout(function(){
									clearRect(0,0,Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height));
									drawHeader();
									drawDigit(1, (Screen.width / Math.min(Screen.k_width, Screen.k_height) - digit.w) / 2, (Screen.height  / Math.min(Screen.k_width, Screen.k_height) - digit.h)/2, digit.w, digit.h);
										setTimeout(function(){
											Mode[Task.TaskName.replace(/\s/g,'')] = true;
											Mode.Training = false;
											clearRect(0,0,Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height));
											drawHeader();
											setTest((Task.Frames[Task.TaskName]).concat(), Task.Total);
									}, 1000)
								}, 1000)
							},1000)
					}
				}
				//drawProfilePicture(((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace) + Profile.size_btn * 1/ 6, 20, Profile.size_btn * 2/3, Profile.size_btn * 2/ 3);
				//Profile picture has been clicked
				if((Mode.MenuItem || Mode.Tasks) && Profile.LoggedIn && mouseInRect(((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace) + Profile.size_btn * 1/ 6, 20, Profile.size_btn * 2/3, Profile.size_btn * 2/ 3)) {
					socket.emit("Logout", {});
					socket.on("Logout", function(data){
						if(data.res) {
							Profile.LoggedIn = false;
							Profile.Accent = "UK English Male";
							respondCanvas();
						}
					})
				}
				//Quiz has been clicked
				if(!Mode.Mobile && !Mode.Results&& !Mode.Exercise && (Mode.Tasks  || Mode.MenuItem) && mouseInRect(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228)) {
					if(Profile.LoggedIn) {
						drawLoading();
						socket.emit('getQuiz', {
							UserName: Profile.UserName
						});
						socket.on('getQuiz', function(data) {
							if(data.quiz) {
								Mode.Quiz = true;
								Mode.Exercise = true;
								clearRect(0, MenuItem.starts, Screen.width/ Math.min(Screen.k_width, Screen.k_height), MenuItem.ends);
								Mode.Tasks = false;
								Mode.MenuItem = false;
								
								Quiz.Content = data.quiz;
								Exercise_num = 0;
								Quiz.Correct = 0;
								Quiz.Total = 0;
								Quiz.Points = 0;
								Quiz.TotalMax = 0;
								if(Exercise_num < Quiz.Content.length) {
									showTask(Quiz.Content[Exercise_num].Name, Quiz.Content[Exercise_num].Topic_Name, Quiz.Content[Exercise_num].Max_point, Quiz.Content[Exercise_num].Content.length, -1, Quiz.Content[Exercise_num].Content);
								}
							}
							else {
								document.getElementById("Loading").style.visibility = "hidden";
								alert("You have not finished any exercises to get a Quiz");
								
							}
						})
					}
					else {
						document.getElementById("Loading").style.visibility = "hidden";
						alert("You must be logged in to get a quiz");
						
						
					}
				}
				//rewards button has been clicked
				if (!Mode.Mobile && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn && mouseInRect(Display.getButton("rewards_btn.png"))) {
					alert("Rewards are not available yet:(");
				}
				//progress button has been clicked
				if (!Mode.Mobile && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn && mouseInRect(Display.getButton("progress_btn.png"))) {
					alert("Progress is not available yet:(");
				}
				//phrases button has been clicked
				if (!Mode.Mobile && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn && mouseInRect(Display.getButton("phrase_of_the_day_btn.png"))) {
					alert("Phrases are not available yet:(");
				}
				//help button has been clicked
				if (!Mode.Mobile && !Mode.LogIn && !Mode.SignIn && mouseInRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5,  (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3)) {
					alert("Help is not available yet:(");
				}
				//info button has been clicked
				if (!Mode.Mobile && !Mode.LogIn && !Mode.SignIn && mouseInRect(Screen.width/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5+ (Profile.size_btn - 2 * 5)/3 + 5,(20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2 * 5)/3 + 5 , (Profile.size_btn - 2*5) / 3)){
					alert("Information is not available yet:(");
				}
			
		}
		MainCanvas.addEventListener("mousedown", MouseDown);
		MainCanvas.addEventListener("touchstart", MouseDown);
		function MouseDown(mouseEvent){
			event.preventDefault();
			if(mouseEvent.which == 1 || mouseEvent.changedTouches) {
				try {
					var touch = mouseEvent.changedTouches[0];
					var rect = MainCanvas.getBoundingClientRect();
					var scaleX = MainCanvas.width / rect.width;
					var scaleY = MainCanvas.height / rect.height;
					mouseX = (touch.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
					mouseY = (touch.clientY - rect.top) * scaleY;
				}
				catch(e) {
					
				}
				try {
					if ((!Mode.Results && Mode.Exercise && !Mode.MusicVideo) && !Mode.SignIn && !Mode.LogIn) {
						var Array = [];
						var edge = 0;
						var top, center, animal_height;
						if(frametype1 == "frame") {
							animal_height = Screen.height / Math.min(Screen.k_width, Screen.k_height) / 4;
							center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / 2;
							top = MenuItem.starts + 40 + animal_height + 40;
						}
						else if(frametype1 == "Wordsframe") {
							animal_height = 100;
							center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / Math.floor((Task.test.length + 1) / 2);
							top = MenuItem.starts + 40 + animal_height + 40;
							
						}
						var word_height = setWordHeight();
						for(var i = 0; i < Task.test.length; i++) {
							var wordFrame = (Task.test.concat())[i][frametype2];
							Array[i] = {};
							Array[i].x = (edge + center/2-wordFrame.w*word_height/wordFrame.h/2);
							Array[i].y = top;
							Array[i].w = wordFrame.w*word_height/wordFrame.h;
							Array[i].h = word_height;
							var TopforTap;
							var edgeforTap;
							if(Task.test[i].Word == Task.asked.Word) {
								TopforTap = top;
								edgeforTap = edge;
							}
							if(frametype1 == "frame") {
								if(i % 2){
									top = top + word_height + 30;
									edge = 0;
								}
								else edge = center;
							}
							else if(frametype1 == "Wordsframe") {
								if(!((i + 1) % Math.floor((Task.test.length + 1) / 2))){
								top = top + word_height + 20;
								edge = 0;
								}
								else { 
									edge = edge + center;
								}
							}
						}
						var i = checkPoint({x:mouseX, y:mouseY}, Array);
						if(i < Array.length) {
							k3 = i;
								
							try {
								var touch = mouseEvent.changedTouches[0];
								var rect = MainCanvas.getBoundingClientRect();
								var scaleX = MainCanvas.width / rect.width;
								var scaleY = MainCanvas.height / rect.height;
								mouseX = (touch.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
								mouseY = (touch.clientY - rect.top) * scaleY;
							}
							catch(e) {}
							Pressed.x = mouseX;
							Pressed.y = mouseY;
							//if(Mode.Training && Task.test[k3].Word == Task.asked.Word) {
							if(Mode.Training) {
								drawTest();
								top = TopforTap;
								edge = edgeforTap;
								var wordFrame = (Task.test.concat())[k3][frametype2];
								//ctx.drawImage(atlas.AnimalsWordsframe, wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[k3]).x*Math.min(Screen.k_width, Screen.k_height), (Array[k3].y)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].w)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].h)*Math.min(Screen.k_width, Screen.k_height));
								ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[k3]).x*Math.min(Screen.k_width, Screen.k_height), (Array[k3].y)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].w)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].h)*Math.min(Screen.k_width, Screen.k_height));
								ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[k3] - 6).x*Math.min(Screen.k_width, Screen.k_height), (Array[k3].y)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].w)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].h)*Math.min(Screen.k_width, Screen.k_height));
								var Hand_frame =  Properties.Buttons["tap.png"];
								var Hand = {};
								Hand.h = 3/2*setWordHeight();
								Hand.w = Hand.h * Hand_frame.w / Hand_frame.h;
								var wordFrame = (Task.test.concat())[Task.test.indexOf(Task.asked)][frametype2];
								
								drawDrag( (edge + center/2-wordFrame.w*word_height/wordFrame.h/2) + wordFrame.w*word_height/wordFrame.h / 2 - Hand.w / 2, top, Hand.w, Hand.h);
							}
						}
						else {
							k3 = -1;
							
							delete Pressed.x;
							delete Pressed.y;
						}
					}
				}
				catch(e){}
			}
		}
	var loading = new Image();
	//var stop_loading = false;
	loading.loadedLoading;
	function loadLoading(){
		loading.src = '/img/Loading/loading.png';
		loading.addEventListener("load", function() {
			loading.loadedLoading = true;
		})
	}
	function drawLoading(){
		/*if(!stop_loading) {
			ctx.clearRect(Screen.width / 2 - 48*Math.min(Screen.k_width, Screen.k_height), Screen.height / 2 - 48*Math.min(Screen.k_width, Screen.k_height), 48*Math.min(Screen.k_width, Screen.k_height), 48*Math.min(Screen.k_width, Screen.k_height));
			ctx.drawImage(loading, current * 48, 0, 48, 48, Screen.width / 2 - 48*Math.min(Screen.k_width, Screen.k_height), Screen.height / 2 - 48*Math.min(Screen.k_width, Screen.k_height), 48*Math.min(Screen.k_width, Screen.k_height), 48*Math.min(Screen.k_width, Screen.k_height));
			if(current < 16)
				current++;
			else
				current = 0;
			setTimeout(function(){
				drawLoading();
			}, 200);
		}*/
		document.getElementById("Loading").style.visibility = "visible";

		
	}
	var current = 0;
	loadLoading();
	try {
		loadButtons();
		loadAnimals();
		loadAnimalsWords();
		loadMenuItems();
	}
	catch(e){}
	var Properties = {};
	Properties.Topics = [];
	Profile.LoggedIn = false;
	socket.on('Old session', function(data) {
		Profile.UserName = data.user.UserName;
		Profile.Password = data.user.Password;
		Profile.Accent = data.user.Accent;
		Profile.LoggedIn = true;
	})
	function displayMenu() {
		try{
			var frame = Properties.Buttons["left-arrow.png"].frame;
			if(Properties.Tasks.length && Properties.Topics.length) {
				respondCanvas();
				MenuItem.ItemList = [];
				for (i = 0; i < MenuItem.itemsCount; i++) {
					MenuItem.ItemList[i] = Properties.Topics[i].Name;
				}
				Task.itemsCount = [];
				MenuItem.itemsCount = (Properties.Topics).length;
				for (q = 0; q < MenuItem.itemsCount; q++) {
					try{
						Task.itemsCount[q] = Properties.Tasks[q].length;
					}
					catch(e){
						Task.itemsCount[q] = 0;
					}
				}
			}
		}
		catch(e) {
				setTimeout(function(){
					displayMenu();
				})
			}
	}
	function getProperties() {
		socket.on('getProperties', function(data){
			Properties.Topics = data.topics;
			Properties.Tasks = data.tasks;
			Properties.Buttons = data.buttons;
			Properties.Forms = data.forms;
			Properties.Numbers = data.numbers;
			Properties.Letters = data.letters;
			current = 0;
			drawLoading();
			console.log(data);
			//loadButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height);
			displayMenu();
			
				
			
		})
	}
	getProperties();
	
	
});
})();



/***/ })
/******/ ]);