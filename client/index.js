(function(){
	$(document).ready(function(){
	
		var ctx = document.getElementById("MainCanvas").getContext("2d");
		var video = document.getElementById('video');
		
		
		/************************************Resizing*******************************************************/
			
		
				
		$(window).resize(respondCanvas);
		
		
		var Mode = {};
		var Task = {};
		var Rewards = {};
		var MenuItem = {};
		var Title = {};
		var Profile = {};
		var Thumbnails = [];
		Mode.MenuItem  = true;
		Mode.Tasks = false;
		Mode.LogIn = false;
		Mode.SignIn = false;
		Mode.Exercise = false;
		//Mode.Alphabetsong = false;
		Mode.CountDown = false;
		MenuItem.height = 600;
		MenuItem.width = 1800;
		MenuItem.display = 3;
		MenuItem.firstItem = 0;
		MenuItem.size = 400;
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
		
		
		
		MenuItem.display = 3;
		MenuItem.itemsCount = 5;
		
		
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
			try{
			console.log("UserName:", document.getElementById("UserName").value);
			console.log("Password:", document.getElementById("Password").value);
			console.log(Profile.Password, Profile.UserName);
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
			
			//выравнивание по вертикали
			A = ((0.6 * Screen.height ) / Math.min(Screen.k_width, Screen.k_height)) - 2 * 40;
			//выравнивание по горизонтали 
			B = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - 2 * 40 - 2 * koef*100 - (MenuItem.display - 1) * 68) / (MenuItem.display);
			//ctx.fillRect(0, (0.2 * Screen.height/ Math.min(Screen.k_width, Screen.k_height) + 20)*Math.min(Screen.k_width, Screen.k_height), 1000, 1)
			
			if(A < B){
				console.log("A")
				MenuItem.size = A;
			}
			else {
				console.log("B")
				MenuItem.size = B;
			}
			
			Title.rwidth = Screen.width * 0.6;
			Title.rheight = Screen.height * 0.3;
			Title.k_width = Title.rwidth / Title.width;
			Title.k_height =  Title.rheight / Title.height;
			if((Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) - 2 * 20)/130*470 > Screen.width * 0.5 / Math.min(Screen.k_width, Screen.k_height)) {
				Title.size = Screen.width * 0.5 / Math.min(Screen.k_width, Screen.k_height);
			}
			else {
				Title.size = (Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) - 2 * 20)/130*470;
			}
			
			
			MenuItem.leftSpace = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - MenuItem.display * MenuItem.size - (MenuItem.display - 1) * 68 - 2 * 100*koef) / 4;
			if(!Math.floor(2 * MenuItem.topSpace / MenuItem.size) > 0 && Math.floor(2 * MenuItem.leftSpace / MenuItem.size) > 0) {
				MenuItem.display = MenuItem.display + Math.floor( 2 * MenuItem.leftSpace / MenuItem.size);
				if(MenuItem.display > MenuItem.itemsCount) {
					MenuItem.display = MenuItem.itemsCount;
				}
				MenuItem.leftSpace = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - MenuItem.display * MenuItem.size - (MenuItem.display - 1) * 68 - 2 * 100*koef) / 4;
			
			}
			if(MenuItem.firstItem + MenuItem.display > MenuItem.itemsCount) {
				MenuItem.firstItem = MenuItem.itemsCount - MenuItem.display;
			}
			MenuItem.starts = 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height);
			MenuItem.topSpace = 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + (Screen.height * 0.6 / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
			if(MenuItem.starts != 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height)) {
				MenuItem.topSpace = MenuItem.starts + 2 * 20;
			}
				
			Title.leftSpace = MenuItem.leftSpace;
			Rewards.rwidth = Screen.width;
			Rewards.rheight = 0.1 * Screen.height;
			Rewards.k_width = Rewards.rwidth / Rewards.width;
			Rewards.k_height =  Rewards.rheight / Rewards.height;
			if(Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) < Rewards.size){
				Rewards.topSpace = Screen.height * 0.8 / Math.min(Screen.k_width, Screen.k_height) + (Rewards.size - Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) ) / 2;
			}
			else {
				Rewards.topSpace = Screen.height * 0.8 / Math.min(Screen.k_width, Screen.k_height) + (Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) - Rewards.size) / 2;
				
			}
			if(MenuItem.starts != 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height)) {
				Rewards.topSpace = MenuItem.topSpace + MenuItem.size + 20;
			}
			
			Rewards.leftSpace = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - 4 * Rewards.size - 3 * 68) / 2
			console.log(Rewards.leftSpace, Screen.width / Math.min(Screen.k_width, Screen.k_height) - (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 + Rewards.size + 68 + Rewards.size))
			Profile.rwidth = Screen.width * 0.3;
			Profile.rheight = Screen.height * 0.3;
			Profile.k_width = Profile.rwidth / Profile.width;
			Profile.k_height =  Profile.rheight / Profile.height;
			if((Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) - 2 * 20)/137*470 > Screen.width * 0.5 / Math.min(Screen.k_width, Screen.k_height)) {
				Profile.size_btn = 75/(228 + 6 * 75) * (3 * (Title.size *130/479) - 3 * 2 * 5 + 2 * 5)*228/75;
			} else {
				Profile.size_btn = 75/(228 + 6 * 75) * (3 * Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) - 3 * 2 * 20 - 3 * 2 * 5 + 2 * 5)*228/75;
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
		function DrawMenuItem(i, j, pX, pY, pW, pH){
			var X = 368 * i;
			var Y = 0;
			var W = 368;
			var H = 368;
			var frame = Properties.Topics[i].Frame;
			ctx.drawImage(atlasMenuItem, frame.x, frame.y, frame.w, frame.h, pX * Math.min(Screen.k_width, Screen.k_height), pY * Math.min(Screen.k_width, Screen.k_height), pW * Math.min(Screen.k_width, Screen.k_height), pH * Math.min(Screen.k_width, Screen.k_height));
		}
		var atlasMenuItem = new Image();
		function drawMenuItems(){
			var i = MenuItem.firstItem; //порядок в спрайте
			var j = 0; // первая на экране
			while(j < MenuItem.display){
				if(j != MenuItem.clicked - MenuItem.firstItem){
					var pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j + 1) + MenuItem.size * j - 68;
					var pY =  MenuItem.topSpace;
					pW = MenuItem.size;
					pH = MenuItem.size;
					DrawMenuItem(i, j, pX, pY, pW, pH);
				}
				i = i + 1;
				j = j + 1;
			}
			
			delete i, j;
			delete pX, pY, pW, pH;
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
			console.log("loading animals");
			atlas.Animalsframe.src = '/img/Animals/animals.png';
			atlas.Animalsframe.addEventListener("load", function() {
				Task.loadedAnimalsframe = true;
			})
		}
		atlas.AnimalsWordsframe = new Image();
		Task.loadedAnimalsframeWordsframe;
		function loadAnimalsWords(){
			atlas.AnimalsWordsframe.src = '/img/Animals/animal-words.png';
			console.log("loading 238");
			atlas.AnimalsWordsframe.addEventListener("load", function() {
				Task.loadedAnimalsframeWordsframe = true;
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
			delete x, y, width, height;
		}
		function clearScreenRect(x, y, width, height) {
			ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height) , width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));
			delete x, y, width, height;
		}
		var atlasButtons = new Image();

		function drawLeftArrow(x, y, width, height) {
			var frame = Properties.Buttons["left-arrow.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));
		}

		function drawRightArrow(x, y, width, height){
			var frame = Properties.Buttons["right-arrow.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));		
		}
		function drawTitle(x, y, width, height){
			var frame = Properties.Buttons["title.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height) , y * Math.min(Screen.k_width, Screen.k_height) , width * Math.min(Screen.k_width, Screen.k_height) , height * Math.min(Screen.k_width, Screen.k_height) );			
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
		function drawLogInButton(x, y, width,height){
			var frame = Properties.Buttons["login_btn.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
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
			console.log("drawResultForm", frame);
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
			console.log(type + n + ".png")
			if(type != "")
				type = type + "-";
			var frame = Properties.Numbers[type + n + ".png"];
			ctx.drawImage(atlas.Numbersframe, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawLetter(n, x, y, width, height, type = "") {
			console.log(type + "-" + n + ".png")
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
			ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawLogInLogInButton(x, y, width, height) {
			var frame = Properties.Forms["log_in_form_login_btn.png"];
			ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
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
		function fillRectYellow(x, y, width, height) {
			ctx.fillStyle="#F7FE2E";
			ctx.fillRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function fillRectGreen(x, y, width, height) {
			ctx.fillStyle="#7cc576";
			ctx.fillRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function PointInRect(Point, Rect) {
			if(Point.x >= Rect.x* Math.min(Screen.k_width, Screen.k_height) && Point.x <= (Rect.x + Rect.w)* Math.min(Screen.k_width, Screen.k_height) && Point.y >= Rect.y * Math.min(Screen.k_width, Screen.k_height) && Point.y <= (Rect.y + Rect.h)* Math.min(Screen.k_width, Screen.k_height))
				return true
			return false;
		}
		function mouseInRect(x, y, width, height) {
			if(mouseX >= x* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (x + width)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= y* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (y + height)* Math.min(Screen.k_width, Screen.k_height))
				return true
			return false;
		}
		function speak(Word) {
			if(sound_on)
				responsiveVoice.speak(Word, Profile.Accent);
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
		var loadedButtons;
		function loadButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height){
			atlasButtons.src = '/img/Menu-Items/buttons.png';
			atlasButtons.addEventListener("load", function() {
					drawButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height);
					//title
					drawTitle(Title.leftSpace, 20, Title.size, Title.size * 130/470);	
					delete l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height;
					loadedButtons  = true;
					
			}, false);	
		}
				
		function drawButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height) {
			if(Mode.MenuItem) {
				//left arrow
				if(MenuItem.firstItem) {
					drawLeftArrow(l_a_x, l_a_y, l_a_width, l_a_height);
				}
				//right arrow
				if(MenuItem.firstItem + MenuItem.display < MenuItem.itemsCount) {
					drawRightArrow(r_a_x, r_a_y, r_a_width, r_a_height);
				}
			}
			if(!Mode.Exercise) {
				fillRectYellow(0, Screen.height/ Math.min(Screen.k_width, Screen.k_height) * 0.8, Screen.width/ Math.min(Screen.k_width, Screen.k_height), 1000)
				//Rewards
				drawRewardsButton(Rewards.leftSpace, Rewards.topSpace, Rewards.size, Rewards.size*75/228)
				//Progress button
				drawProgressButton(Rewards.leftSpace + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				//Phrases button
				drawPhrasesButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				//Quiz button
				drawQuizButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				drawQuizButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
			}
			if(!Profile.LoggedIn) {
				//Log in button
				drawLogInButton((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
				//Sign in button
				drawSignInButton((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) -  Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228, Profile.size_btn, Profile.size_btn*75/228);
			}
			else {
				drawProfilePicture(((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace) + Profile.size_btn * 1/ 6, 20, Profile.size_btn * 2/3, Profile.size_btn * 2/ 3);
			}
			//Sound on button
			if(sound_on)
				drawSoundOnButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
			else
				drawSoundOffButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
			//Help button
			drawHelpButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2 * 5) / 3, (Profile.size_btn - 2 * 5) / 3)		
			//Info button
			drawInfoButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + 5 + (Profile.size_btn - 2 * 5)/3 + (Profile.size_btn - 2 * 5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
			
			delete l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height;
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
		function drawHeader() {
			ctx.fillStyle="#F7FE2E";
			ctx.fillRect(0, 0, Screen.width, MenuItem.starts * Math.min(Screen.k_width, Screen.k_height));
			if(!Mode.Exercise)
				ctx.fillRect(0, Screen.height * 0.8, Screen.width, 1000);
			
			var l_a_x = MenuItem.leftSpace;
			var l_a_width = 100*koef;
			var l_a_height = koef*100*226/152;
			var l_a_y =  MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2;
			
			var r_a_height = koef*100*226/152;
			var r_a_y =  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2;
			var r_a_width = koef*100;
			var r_a_x = MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width;
			if(loadedButtons) {
				drawButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height);
				//title
				drawTitle(Title.leftSpace, 20, Title.size, Title.size*130/470);
			}
			else {
				loadButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height);
			}
			
			if(Profile.LoggedIn) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4)
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4)
				
				
				drawProfilePicture(((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace) + Profile.size_btn * 1/ 6, 20, Profile.size_btn * 2/3, Profile.size_btn * 2/ 3)
				
			}
		}
		function initMenu() {
			console.log("init-menu", stop_loading);
			stop_loading = true;
			if(!Mode.Exercise) {
				if(MenuItem.loadedMenuItems) {
					drawMenuItems();
				}
				else {
					loadMenuItems();
				}
				if(MenuItem.clicked > -1) {
					MenuItem.audio_played = true;
					Task.firstTask = 0;
					MenuItemClicked(MenuItem.clicked);
				}
			}
			else {
				if(Mode.Exercise && !Mode.Alphabetsong && !Mode.Results) {
					console.log("resizing on resize");
					drawHeader();
					drawTestAnimals();					
				}
				else if(!Mode.Alphabetsong){
					console.log("initMenushow result");
					drawHeader();
					showResultForm(Task.Result.Answers, Task.Total, Task.MaxPoint);
				}
			}
			loadNumbers();
			loadLetters();
			drawHeader();
			readyToShowForms();			
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
		
		function SignInNewUser(Profile) {
			socket.emit('newUser', {
				User: Profile
			})
			socket.on('newUser', function(data){
				console.log(data);
				console.log("new user:", data.res);
				return data.res;
			})
			return false;
		}
		function checkProfileData(UserName, Password) {
			console.log("checking data", UserName, Password);
			
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
		function HoverMenuItem(mouseX, mouseY){
			if(Mode.MenuItem && MenuItem.firstItem > 0) {
			if (!(l_a_ch) && mouseX >= Math.min(Screen.k_width, Screen.k_height) * MenuItem.leftSpace && mouseX <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.leftSpace + koef*100) && mouseY >=  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2)  && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2 + koef*100*226/152) ) {	
				l_a_x = MenuItem.leftSpace;
				l_a_width = 100*koef;
				l_a_height = koef*100*226/152;
				l_a_y =  MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2;
				
				clearMenuItemRect(l_a_x, l_a_y , l_a_width, l_a_height);
				var dx = -5;
				var dy = -5;
				var dw = 10;
				var dh = 10;
				drawLeftArrow(l_a_x + dx, l_a_y + dy, l_a_width + dw, l_a_height + dh);
				l_a_ch = true;
				delete l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height;
			}else if ((l_a_ch) && !(mouseX >= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.leftSpace - 5) && mouseX <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.leftSpace + koef*100 + 5) && mouseY >=  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2 - 5)  && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2 + koef*100*226/152 + 5) )) {	
				var dx = -5;
				var dy = -5;
				var dw = 10;
				var dh = 10;
				clearMenuItemRect((MenuItem.leftSpace + dx),  (MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2 + dy) , (koef*100 + dw), (koef*100*226/152 + dh));
				drawLeftArrow(MenuItem.leftSpace ,  MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2 , koef*100, koef*100*226/152);
				l_a_ch = false;
			}
			}
			//right arrow is hovered
			if(Mode.MenuItem && (MenuItem.firstItem + MenuItem.display < MenuItem.itemsCount)){
				var r_a_height = koef*100*226/152;
				var	r_a_y =  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2;
				var r_a_width = koef*100;
				var r_a_x = MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width;
			if (!(r_a_ch) && mouseX >= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - 100*koef) && mouseX <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - 100*koef + koef*100) && mouseY >=  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2)  && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2 + koef*100*226/152) ) {	
				clearMenuItemRect(MenuItem.rwidth / Math.min(Screen.k_width,  Screen.k_height) - MenuItem.leftSpace - koef*100, MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2 , koef*100, koef*100*226/152);dx = -5;
				dy = -5;
				dw = 10;
				dh = 10;
				drawRightArrow(Screen.width / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width + dx,  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2 + dy, koef*100 + dw, koef*100*226/152 + dh);
				r_a_ch = true;
				delete dx, dy, dw, dh;
			}else if ((r_a_ch) && !(mouseX >= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - 100*koef - 5) && mouseX <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - 100*koef + koef*100 + 5) && mouseY >=  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2 - 5)  && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2 + koef*100*226/152 + 5) )) {
				dx = -5;
				dy = -5;
				dw = 10;
				dh = 10;
				clearMenuItemRect(MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - 100*koef + dx, MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2 + dy, koef*100 + dw, koef*100*226/152 + dh);
				drawRightArrow(MenuItem.rwidth / Math.min(Screen.k_width,  Screen.k_height) - MenuItem.leftSpace - koef*100, MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2 , koef*100, koef*100*226/152);
				r_a_ch = false;
				delete dx, dy, dw, dh;
			}
			}
			// menu tasks are hovered
			if(Mode.Tasks && (MenuItem.clicked > -1) && (mouseY >= MenuItem.topSpace * Math.min(Screen.k_width, Screen.k_height) && mouseY <= (MenuItem.topSpace + MenuItem.size) * Math.min(Screen.k_width, Screen.k_height))) {
				//console.log("reacting1", k1)
				i = 0;
				t_a_width = 100*0.5;
				//pX = MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem - MenuItem.firstItem);
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace;
				while (i < Task.display) {
					//console.log("reacting2", "i =", i, MenuItem.clicked, task_ch, mouseInRect(pX, pY + (55/ 368 * MenuItem.size + 10) * i + t_a_width + Task.topSpace, MenuItem.size, 55/368*MenuItem.size))
					//if(k1 == -1 && !(task_ch) && mouseX >= pX*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + MenuItem.size)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY + (55/ 368 * MenuItem.size + 10) * i + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY + (55/ 368 * MenuItem.size + 10) * i + t_a_width + Task.topSpace + 55/368*MenuItem.size)*Math.min(Screen.k_width, Screen.k_height)){
					if(k1 == -1 && !(task_ch) && mouseInRect(pX, pY + (55/ 368 * MenuItem.size + 10) * i + t_a_width + Task.topSpace, MenuItem.size, 55/368*MenuItem.size)){
						//console.log("reacting3", k1)
						ctx.clearRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY  + (55 / 368 * MenuItem.size + 10) * i + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height), (MenuItem.size)*Math.min(Screen.k_width, Screen.k_height), (55/ 368 * MenuItem.size)*Math.min(Screen.k_width, Screen.k_height));
						drawTask(MenuItem.clicked, Task.firstTask + i, pX - 3, pY + (55 / 368 * MenuItem.size + 10) * i  + t_a_width + Task.topSpace - 3,  MenuItem.size + 6, 55/368*MenuItem.size + 6)
						k1 = i;
						i = Task.display + 1;
						task_ch = true;
					}
					else{
						i = i + 1;
					}
				}
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace;
				if((Mode.Tasks && (MenuItem.clicked > -1) && !(mouseY >= pY  + (55 / 368 * MenuItem.size + 10) * k1 + t_a_width + Task.topSpace * Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY  + (55 / 368 * MenuItem.size + 10) * k1 + t_a_width + Task.topSpace + MenuItem.size) * Math.min(Screen.k_width, Screen.k_height)))&& (k1 > -1 && task_ch && !(mouseX >= (pX - 3)*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + MenuItem.size + 6)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY + (55/ 368 * MenuItem.size + 10) * k1 + t_a_width + Task.topSpace - 3)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY  + (55 / 368 * MenuItem.size + 10) * k1 + t_a_width + Task.topSpace + 55/368*MenuItem.size + 6)*Math.min(Screen.k_width, Screen.k_height)))){
					ctx.clearRect((pX-3)*Math.min(Screen.k_width, Screen.k_height), (pY  + (55 / 368 * MenuItem.size + 10) * k1 + t_a_width + Task.topSpace - 3)*Math.min(Screen.k_width, Screen.k_height), (MenuItem.size + 6)*Math.min(Screen.k_width, Screen.k_height), (55/ 368 * MenuItem.size + 6)*Math.min(Screen.k_width, Screen.k_height));
					//ctx.fillRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY+ t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height), MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height));
					drawTask(MenuItem.clicked, Task.firstTask + k1, pX, pY + (55 / 368 * MenuItem.size + 10) * k1  + t_a_width + Task.topSpace,  MenuItem.size, 55/368*MenuItem.size)
					//ctx.fillRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY + (55/368*MenuItem.size + 10)*k1 + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
					k1 = -1;
					task_ch = false;
				}
			}
			
			//top arrow
			if(Mode.Tasks && (Task.firstTask > 0)) {
			if(MenuItem.clicked > -1) {
				t_a_height = 100*0.5;
				t_a_width = 0.5*100*226/152;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2;
				pY =  MenuItem.topSpace;
				if(!(t_a_ch) && mouseX >= pX*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + t_a_width)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY + t_a_height)*Math.min(Screen.k_width, Screen.k_height)){
					ctx.clearRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY)*Math.min(Screen.k_width, Screen.k_height), (t_a_width)*Math.min(Screen.k_width, Screen.k_height), (t_a_height)*Math.min(Screen.k_width, Screen.k_height));
					t_a_ch = true;
					
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
					pY =  MenuItem.topSpace;
					//ctx.fillRect((pX + MenuItem.size / 2)*Math.min(Screen.k_width, Screen.k_height), 0, 1, 10000)
					ctx.save();
					ctx.translate((pX + MenuItem.size / 2 + 3/4*t_a_height)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
					ctx.rotate(Math.PI / 2);
					drawLeftArrow(0 - 3, 0 - 3, t_a_height + 6, t_a_width + 6)
					ctx.restore();
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2;
					pY =  MenuItem.topSpace;
					delete pX, pY;
					delete t_a_height, t_a_width;
				
				
				}
				else if (Mode.Tasks && t_a_ch && !(mouseX >= (2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2)*Math.min(Screen.k_width, Screen.k_height) && mouseX <= (2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2 + t_a_width + 3)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (MenuItem.topSpace - 3)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (MenuItem.topSpace + t_a_height + 3)*Math.min(Screen.k_width, Screen.k_height))){
					t_a_ch = false;
					ctx.clearRect((pX - 3)*Math.min(Screen.k_width, Screen.k_height), (pY - 3)*Math.min(Screen.k_width, Screen.k_height), (t_a_width + 6)*Math.min(Screen.k_width, Screen.k_height), (t_a_height + 6)*Math.min(Screen.k_width, Screen.k_height))
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
					pY =  MenuItem.topSpace;
					//ctx.fillRect((pX + MenuItem.size / 2)*Math.min(Screen.k_width, Screen.k_height), 0, 1, 10000)
					ctx.save();
					ctx.translate((pX + MenuItem.size / 2 + 3/4*t_a_height)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
					ctx.rotate(Math.PI / 2);
					drawLeftArrow(0, 0, t_a_height, t_a_width)
					ctx.restore();
					delete pX, pY;
					delete t_a_height, t_a_width;
				}
				
			}
			}
			if(Mode.Tasks && (Task.firstTask + Task.display < Task.itemsCount[MenuItem.clicked])) {
			//bottom arrow hovered
			if(MenuItem.clicked > -1) {
				b_a_height = 100*0.5;
				b_a_width = 0.5*100*226/152;
				t_a_height = b_a_width;
				t_a_width = b_a_height;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2;
				pY = Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.topSpace - b_a_height;
				if(!(b_a_ch) && mouseX >= pX*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + b_a_width)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY + b_a_height)*Math.min(Screen.k_width, Screen.k_height)){
					ctx.clearRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY)*Math.min(Screen.k_width, Screen.k_height), (b_a_width)*Math.min(Screen.k_width, Screen.k_height), (b_a_height)*Math.min(Screen.k_width, Screen.k_height));
					//ctx.fillRect(pX*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height), b_a_width*Math.min(Screen.k_width, Screen.k_height), b_a_height*Math.min(Screen.k_width, Screen.k_height))
					b_a_ch = true;
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
					pY =  MenuItem.topSpace + MenuItem.size;
					ctx.save();
					ctx.translate((pX + MenuItem.size / 2 - 3/4*b_a_height)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
					ctx.rotate(-Math.PI / 2);
					drawLeftArrow(0 - 3, 0 - 3, b_a_height + 6, b_a_width + 6)
					ctx.restore();
					
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2;
					pY = Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.topSpace - b_a_height;
				}
				else if (Mode.Tasks && b_a_ch && !(mouseX >= (2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2 - 3)*Math.min(Screen.k_width, Screen.k_height) && mouseX <= (2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2 + b_a_width + 3)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.topSpace - b_a_height - 3)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.topSpace - b_a_height + b_a_height + 3)*Math.min(Screen.k_width, Screen.k_height))){
					b_a_ch = false;
					ctx.clearRect((pX - 5)*Math.min(Screen.k_width, Screen.k_height), (pY - 5)*Math.min(Screen.k_width, Screen.k_height), (b_a_width + 10)*Math.min(Screen.k_width, Screen.k_height), (b_a_height + 10)*Math.min(Screen.k_width, Screen.k_height))
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
					pY =  MenuItem.topSpace + MenuItem.size;
					ctx.save();
					ctx.translate((pX + MenuItem.size / 2 - 3/4*b_a_height)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
					ctx.rotate(-Math.PI / 2);
					drawLeftArrow(0, 0, b_a_height, b_a_width)
					ctx.restore();
				}
				delete pX, pY;
				delete b_a_height, b_a_width;
			}
			}
			//Menuitems hovered
			var i = 0;
			while (Mode.MenuItem && (i < MenuItem.display)) {
				X_l = 2 * MenuItem.leftSpace + 100*koef + 68 * (i + 1) + MenuItem.size * i - 68;
				X_r = 2 * MenuItem.leftSpace + 100*koef + 68 * (i + 1) + MenuItem.size * (i + 1) - 68;
				if((k == -1) && mouseY >= Math.min(Screen.k_width, Screen.k_height) * MenuItem.topSpace   && mouseY <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.size + MenuItem.topSpace) && (mouseX >= Math.min(Screen.k_width, Screen.k_height) * X_l && mouseX <= Math.min(Screen.k_width, Screen.k_height) * X_r)){
					if(MenuItem.clicked - MenuItem.firstItem != i){
					//clearMenuItemRect(X_l, MenuItem.topSpace, MenuItem.size, MenuItem.size);
					X = 368 * i;
					Y = 0;
					W = 368;
					H = 368;
					pX = X_l - 10;
					pY =  MenuItem.topSpace - 10;
					pW = MenuItem.size + 20;
					pH = MenuItem.size + 20;
					k = i;
					console.log("hovering", i, "item")
					DrawMenuItem(i + MenuItem.firstItem, i + MenuItem.firstItem, pX, pY, pW, pH);
					i = MenuItem.display + 1;
					}
					else{
						i = MenuItem.display + 1;
					}
				}
				else {
					i++;
				}
				delete X_l, X_r;
			}
			
			//if ((k > -1) && !(mouseY >= Math.min(Screen.k_width, Screen.k_height) * MenuItem.topSpace  && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.size + MenuItem.topSpace)  && (mouseX >= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * k ) && mouseX <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * (k + 1))))){
				if (Mode.MenuItem && (k > -1) && !(mouseY >= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.topSpace - 10)  && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.size + MenuItem.topSpace + 10)  && (mouseX >= Math.min(Screen.k_width, Screen.k_height) * (2 * MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * k - 68 - 10) && mouseX <= Math.min(Screen.k_width, Screen.k_height) * (2 * MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * (k + 1) - 68 + 10)))){
					//pX = MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * k - 10;
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * k - 68 - 10;
					pY =  MenuItem.topSpace - 10;
					pW = MenuItem.size + 20;
					pH = MenuItem.size + 20;
					//MenuItem.ctx.clearRect(pX, pY, pW, pH);
					clearMenuItemRect(pX, pY, pW, pH);
					
					//pX = MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * k
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * k - 68;
					pY =  MenuItem.topSpace;
					pW = MenuItem.size;
					pH = MenuItem.size;
					X_l = 2 * MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * k - 68;
					//X_r = MenuItem.leftSpace + 100*koef + 68 * (i + 1) + MenuItem.size * (i + 1)
					X_r = 2 * MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * (k + 1) - 68;
					//clearMenuItemRect(X_l - 10, MenuItem.topSpace-10, MenuItem.size + 20, MenuItem.size + 20);
					console.log("hovering ", k, "item")
					DrawMenuItem(k + MenuItem.firstItem, k + MenuItem.firstItem, pX, pY, pW, pH);
					//ctx.fillRect(pX, pY, pW, pH)
					//ctx.fillRect(Math.min(Screen.k_width, Screen.k_height) * (MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * k ), Math.min(Screen.k_width, Screen.k_height) * MenuItem.topSpace,Math.min(Screen.k_width, Screen.k_height) * (MenuItem.size),  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.size))
					//ctx.fillRect(Math.min(Screen.k_width, Screen.k_height) * (pX), Math.min(Screen.k_width, Screen.k_height) * pY, Math.min(Screen.k_width, Screen.k_height) * (MenuItem.size),  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.size))
					k = -1;
					delete X_l, pX, pY, pW, pH;
					
				}
			//Login button hovered
			//drawLogInButton((Screen.width  - 150*75/228)/ Math.min(Screen.k_width, Screen.k_height)- MenuItem.leftSpace, 20/ Math.min(Screen.k_width, Screen.k_height), 150, 150*75/228)
			if (!Mode.Exercise && !Profile.LoggedIn && !Mode.LogIn && !Mode.SignIn &&!login_ch && mouseX >= ((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace) * Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + Profile.size_btn) * Math.min(Screen.k_width, Screen.k_height) && mouseY >= (20) * Math.min(Screen.k_width, Screen.k_height) && mouseY <= (20 + Profile.size_btn*75/228) * Math.min(Screen.k_width, Screen.k_height)) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
				
				ctx.fillStyle="#F7FE2E";
				fillRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
				
				drawLogInButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, 20 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4);
				login_ch = true;
			}
			else if(!Mode.Exercise && !Profile.LoggedIn && !Mode.LogIn && !Mode.SignIn &&login_ch && !(mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn- MenuItem.leftSpace) * Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + Profile.size_btn) * Math.min(Screen.k_width, Screen.k_height) && mouseY >= (20) * Math.min(Screen.k_width, Screen.k_height) && mouseY <= (20 + Profile.size_btn*75/228) * Math.min(Screen.k_width, Screen.k_height))) {
				if(!Profile.LoggedIn) {
					clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, 20 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4);;
					fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, 20 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4);;
					drawLogInButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn- MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228)
				}
				login_ch = false;
			}
			//Sign in button hovered
			//drawSignInButton((Screen.width - 150*75/228)/ Math.min(Screen.k_width, Screen.k_height)- MenuItem.leftSpace, (20 + 5)/ Math.min(Screen.k_width, Screen.k_height) + 150*75/228 + 3, 150, 150*75/228)
			if (!Mode.Exercise && !Profile.LoggedIn && !Mode.LogIn && !Mode.SignIn && !signin_ch && mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace) * Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + Profile.size_btn) * Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228 + 3, Profile.size_btn, Profile.size_btn*75/228);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228 + 3, Profile.size_btn, Profile.size_btn*75/228);
				drawSignInButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4)
				signin_ch = true;
			}
			else if(!Mode.Exercise && !Profile.LoggedIn && !Mode.LogIn && !Mode.SignIn &&signin_ch && !(mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace) * Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + Profile.size_btn) * Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4)
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4)
				drawSignInButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) -Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228, Profile.size_btn, Profile.size_btn*75/228);
				signin_ch = false;
			}
			//rewards button
			if (!Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&!rewards_ch && mouseX >= (Rewards.leftSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
				console.log("rewards")
				clearScreenRect(Rewards.leftSpace, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				fillRectYellow(Rewards.leftSpace, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				drawRewardsButton(Rewards.leftSpace - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				rewards_ch = true;
			}
			else if(!Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&rewards_ch && !(mouseX >= (Rewards.leftSpace - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect(Rewards.leftSpace - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				fillRectYellow(Rewards.leftSpace - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				drawRewardsButton(Rewards.leftSpace, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				rewards_ch = false;
			}
			//Progress button hovered
			if (!Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&!progress_ch && mouseX >= (Rewards.leftSpace + Rewards.size + 68)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
				clearScreenRect(Rewards.leftSpace + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				fillRectYellow(Rewards.leftSpace + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				drawProgressButton(Rewards.leftSpace + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				progress_ch = true;
			}
			else if(!Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&progress_ch && !(mouseX >= (Rewards.leftSpace + Rewards.size + 68 - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect(Rewards.leftSpace + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				fillRectYellow(Rewards.leftSpace + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				drawProgressButton(Rewards.leftSpace + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				progress_ch = false;
			}
			
			//Phrases button hovered
			if (!Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&!phrases_ch && mouseX >= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + Rewards.size + 68)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
				clearScreenRect(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				fillRectYellow(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				drawPhrasesButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				phrases_ch = true;
			}
			else if(!Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&phrases_ch && !(mouseX >= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + Rewards.size + 68 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				fillRectYellow(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				drawPhrasesButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				
				phrases_ch = false;
			}
			//Quiz button has been hovered
			//drawQuizButton(MenuItem.leftSpace + 100*koef + 68 + Rewards.size + 68 + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228)
			if (!Mode.Exercise && !Mode.LogIn && !Mode.SignIn &&!quiz_ch && mouseX >= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + Rewards.size + 68+ Rewards.size + 68)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
				clearScreenRect(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				fillRectYellow(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				drawQuizButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				quiz_ch = true;
			}
			else if(!Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&quiz_ch && !(mouseX >= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 + Rewards.size + 68 - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + Rewards.size + 68+ Rewards.size + 68 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				fillRectYellow(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				drawQuizButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				quiz_ch = false;
			}
			//sound button hovered
			//drawSoundOnButton((Screen.width - 150*75/228)/ Math.min(Screen.k_width, Screen.k_height)- MenuItem.leftSpace, (20 + 5) + 150*75/228 + 3 + 150*75/228 + 5, 150 / 3, 150 / 3)
			if (!Mode.LogIn && !Mode.SignIn &&!sound_ch && mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height)) {
				clearScreenRect((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				fillRectYellow((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				if(sound_on) {
					drawSoundOnButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				}
				else {
					drawSoundOffButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height)- Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				}
				
				sound_ch = true;
			}
			else if(!Mode.LogIn && !Mode.SignIn &&sound_ch && !(mouseX >= ((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				fillRectYellow((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				if(sound_on) {
					drawSoundOnButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				}
				else {
					drawSoundOffButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				}
				sound_ch = false;
			}
			//help button has been hovered
			//drawHelpButton((Screen.width - 150*75/228)/ Math.min(Screen.k_width, Screen.k_height)- MenuItem.leftSpace + 150/3 + 5, (20 + 5) + 150*75/228 + 3 + 150*75/228 + 5, 150 / 3, 150 / 3)		
			if (!Mode.LogIn && !Mode.SignIn &&!help_ch && mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn- MenuItem.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height)) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				drawHelpButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5)/3 + 5 - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				help_ch = true;
			}
			else if(!Mode.LogIn && !Mode.SignIn &&help_ch && !(mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5)/3 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height)- Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5)/3 + 5 - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5)/3 + 5 - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				drawHelpButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn-2*5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				help_ch = false;
			}
			//Info button has been hovered
			//drawInfoButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + 5 + (Profile.size_btn - 2 * 5)/3 + (Profile.size_btn - 2 * 5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
			if (!Mode.LogIn && !Mode.SignIn &&!info_ch&& mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5+ (Profile.size_btn - 2 * 5)/3 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn- MenuItem.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5 + (Profile.size_btn - 2*5) / 3+ (Profile.size_btn - 2 * 5)/3 + 5 )* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height)) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn - 2*5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn - 2*5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				drawInfoButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace+ (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn - 2*5)/3 + 5 - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				info_ch = true;
			}
			else if(!Mode.LogIn && !Mode.SignIn &&info_ch && !(mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5+ (Profile.size_btn - 2 * 5)/3 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn- MenuItem.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5 + (Profile.size_btn - 2*5) / 3+ (Profile.size_btn - 2 * 5)/3 + 5 )* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace+ (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn - 2*5)/3 + 5 - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace+ (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn - 2*5)/3 + 5 - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				drawInfoButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace+ (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn-2*5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				info_ch = false;
			}
				
			if(Mode.LogIn && mouseInRect((Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size *4/3) / 205 * 368)/2, 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size * 4/3) / 2, (MenuItem.size *4/3) / 205 * 368, MenuItem.size * 4/3)) {
				//log in area
			}
					
			if(Mode.SignIn && mouseInRect((Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size *3/2))/2, 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size * 3/2) / 2, (MenuItem.size *6/4), MenuItem.size * 6/4)) {
				//sign in area
			}
			//Login form cancel button has been hovered
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
			Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
			if (Mode.LogIn && !log_in_btn && mouseInRect(X_ + 49, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)) {
				clearScreenRect(X_ + 49, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202);
				drawLogInLogInButton(X_ + 47 - 2, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40 - 2, (MenuItem.size) / 202 * 156 + 4, MenuItem.size * 37 / 202 + 4)
				log_in_btn = true;
			}
			else if(Mode.LogIn && log_in_btn && !(mouseInRect(X_ + 49, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202))) {
				clearScreenRect(X_ + 49 - 2, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40 - 2, (MenuItem.size) / 202 * 156 + 4, MenuItem.size * 37 / 202 + 4);
				log_in_btn = false;
				X_1 = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_1 = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
				drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
				//ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
				//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				drawLogInLogInButton(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
				drawLogInCancelButton(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
			}
			//Login form log in button has been hovered
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
			Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
			if (Mode.LogIn && !cancel_btn && mouseInRect(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)) {
				clearScreenRect(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202);
				drawLogInCancelButton(X_ + 49 + (MenuItem.size) / 202 * 156 + 35 - 2, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40 - 2, (MenuItem.size) / 202 * 156 + 4, MenuItem.size * 37 / 202 + 4)
				cancel_btn = true;
			}
			else if(Mode.LogIn && cancel_btn && !(mouseInRect(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202))) {
				clearScreenRect(X_ + 49 + (MenuItem.size) / 202 * 156 + 35 - 2, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40 - 2, (MenuItem.size) / 202 * 156 + 4, MenuItem.size * 37 / 202 + 4);
				cancel_btn = false;
				X_1 = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_1 = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
				
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
				drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
				//console.log("retyping", Profile.UserName)
				//ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
				//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				drawLogInLogInButton(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
				drawLogInCancelButton(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
			}
			
			//Signin button hovered SignIn mode
			//drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			if (Mode.SignIn && !sign_in_btn && mouseInRect(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)) {
				clearScreenRect(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156);
				drawSignInSignInButton(X_ + 20 / 368 * size_ - 2, Y_ + 318 / 368 * size_ - 2, 157 / 368 * size_ + 4, 157 / 368 * size_ * 37 / 156 + 4)
				sign_in_btn = true;
			}
			else if(Mode.SignIn && sign_in_btn && !(mouseInRect(X_ + 20 / 368 * size_ - 2, Y_ + 318 / 368 * size_ - 2, 157 / 368 * size_ + 4, 157 / 368 * size_ * 37 / 156 + 4))) {
				clearScreenRect(X_ + 20 / 368 * size_ - 2, Y_ + 318 / 368 * size_ - 2, 157 / 368 * size_ + 4, 157 / 368 * size_ * 37 / 156 + 4);
				sign_in_btn = false;
				Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
				size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
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
				//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				
			}
			
			//Cancel button hovered SignIn mode
			//drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			if (Mode.SignIn && !cancel_btn && mouseInRect(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)) {
				clearScreenRect(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156);
				drawSignInCancelButton(X_ + 190 / 368 * size_ - 2, Y_ + 318 / 368 * size_ - 2, 157 / 368 * size_ + 4, 157 / 368 * size_ * 37 / 156 + 4)
				cancel_btn = true;
				console.log(NewAccent)
			}
			else if(Mode.SignIn && cancel_btn && !(mouseInRect(X_ + 190 / 368 * size_ - 2, Y_ + 318 / 368 * size_ - 2, 157 / 368 * size_ + 4, 157 / 368 * size_ * 37 / 156 + 4))) {
				clearScreenRect(X_ + 20 / 368 * size_ - 2, Y_ + 318 / 368 * size_ - 2, 157 / 368 * size_ + 4, 157 / 368 * size_ * 37 / 156 + 4);
				cancel_btn = false;
				Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
				size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
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
				console.log("Accent = ", NewAccent)
				//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				
			}
			/*
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
			pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			drawPlayButton(pX + 20, pY, size_btn, size_btn)
			drawPauseButton(pX + 20, pY + size_btn + 10, size_btn, size_btn)
			drawStopButton(pX + 20, pY + size_btn + 10 + size_btn + 10, size_btn, size_btn)
			drawRestartButton(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)
			drawExitButton(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)
					
			*/
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
			pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			
			//pause button has been hovered
			//fillRect(pX + 20 - 3, pY + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
			if (Mode.Alphabetsong && !Mode.SignIn && !Mode.LogIn &&!pause_btn_ch && mouseInRect(pX + 20, pY + size_btn + 10, size_btn, size_btn)) {
				clearScreenRect(pX + 20, pY + size_btn + 10, size_btn, size_btn);
				drawPauseButton(pX + 20 - 3, pY + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
				pause_btn_ch = true;
			}
			else if(Mode.Alphabetsong && !Mode.SignIn && !Mode.LogIn && pause_btn_ch && !(mouseInRect(pX + 20 - 3, pY + size_btn + 10 - 3, size_btn + 6, size_btn + 6))) {
				clearScreenRect(pX + 20 - 3, pY + size_btn + 10 - 3, size_btn + 6, size_btn + 6);
				drawPauseButton(pX + 20, pY + size_btn + 10, size_btn, size_btn)
				pause_btn_ch = false;
			}
			//play button has been hovered
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
			pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			
			if (Mode.Alphabetsong && !Mode.SignIn && !Mode.LogIn &&!play_btn_ch && mouseInRect(pX + 20, pY, size_btn, size_btn)) {
				clearScreenRect(pX + 20, pY, size_btn, size_btn);
				drawPlayButton(pX + 20 - 3, pY - 3, size_btn + 6, size_btn + 6)
				play_btn_ch = true;
			}
			else if(Mode.Alphabetsong && !Mode.SignIn && !Mode.LogIn && play_btn_ch && !(mouseInRect(pX + 20 - 3, pY - 3, size_btn + 6, size_btn + 6))) {
				clearScreenRect(pX + 20 - 3, pY - 3, size_btn + 6, size_btn + 6);
				drawPlayButton(pX + 20, pY, size_btn, size_btn)
				play_btn_ch = false;
			}
			
			//stop button has been hovered
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
			pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			
			if (Mode.Alphabetsong && !Mode.SignIn && !Mode.LogIn &&!stop_btn_ch && mouseInRect(pX + 20, pY + size_btn + 10 + size_btn + 10, size_btn, size_btn)) {
				clearScreenRect(pX + 20, pY + size_btn + 10 + size_btn + 10, size_btn, size_btn);
				drawStopButton(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
				stop_btn_ch = true;
			}
			else if(Mode.Alphabetsong && !Mode.SignIn && !Mode.LogIn && stop_btn_ch && !(mouseInRect(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6))) {
				clearScreenRect(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6);
				drawStopButton(pX + 20, pY + size_btn + 10 + size_btn + 10, size_btn, size_btn)
				stop_btn_ch = false;
			}
			//restart button has been hovered
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
			pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			
			if (Mode.Alphabetsong && !Mode.SignIn && !Mode.LogIn &&!restart_btn_ch && mouseInRect(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)) {
				clearScreenRect(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn);
				drawRestartButton(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
				restart_btn_ch = true;
			}
			else if(Mode.Alphabetsong && !Mode.SignIn && !Mode.LogIn && restart_btn_ch && !(mouseInRect(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6))) {
				clearScreenRect(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6);
				drawRestartButton(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)
				restart_btn_ch = false;
			}
			//exit button has been hovered
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
			pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			
			if (Mode.Alphabetsong && !Mode.SignIn && !Mode.LogIn &&!exit_btn_ch && mouseInRect(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)) {
				clearScreenRect(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn);
				drawExitButton(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
				exit_btn_ch = true;
			}
			else if(Mode.Alphabetsong && !Mode.SignIn && !Mode.LogIn && exit_btn_ch && !(mouseInRect(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6))) {
				clearScreenRect(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6);
				drawExitButton(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)
				exit_btn_ch = false;
			}
			
			//MatchTheAnimalsWithTheirNames exit button has been hovered
			if(Mode.Exercise && !Mode.Alphabetsong) {
				try{
					size_btn = setWordHeight();
					if(frametype1 == "Wordsframe" && frametype2 == "frame")
						size_btn = 70;
				}
				catch(e) {
					size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
				}
			}
			if ((Mode.Exercise && !Mode.Alphabetsong) && !Mode.SignIn && !Mode.LogIn &&!exit_btn_ch && mouseInRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn, size_btn)) {
				clearRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn, size_btn);
				drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn - 3, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20 - 3, size_btn + 6, size_btn + 6);
				exit_btn_ch = true;
			}
			else if((Mode.Exercise && !Mode.Alphabetsong) && !Mode.SignIn && !Mode.LogIn && exit_btn_ch && !(mouseInRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn - 3, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20 - 3, size_btn + 6, size_btn + 6))) {
				clearRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn - 3, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20 - 3, size_btn + 6, size_btn + 6);
				drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn, size_btn);
				exit_btn_ch = false;
			}
			//MatchTheAnimalsWithTheirNames word has been hovered
			if ((!Mode.CountDown && !Mode.Results && Mode.Exercise && !Mode.Alphabetsong) && !Mode.SignIn && !Mode.LogIn &&!word_ch) {
				console.log("word has been hovered", Mode.CountDown);
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
					top = Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 40 + animal_height + 40;
				}
				else if(frametype1 == "Wordsframe") {
					center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / Math.floor((Task.test.length + 1) / 2);
					top = Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 40 + animal_height + 40;
					console.log(frametype1);
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
					console.log("in", k2, "rect");
					wordFrame = (Task.test.concat())[k2][frametype2];
					ctx.clearRect((Array[k2]).x*Math.min(Screen.k_width, Screen.k_height), (Array[k2].y)*Math.min(Screen.k_width, Screen.k_height), (Array[k2].w)*Math.min(Screen.k_width, Screen.k_height), (Array[k2].h)*Math.min(Screen.k_width, Screen.k_height));
					ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[k2].x - 6)*Math.min(Screen.k_width, Screen.k_height), (Array[k2].y - 3)*Math.min(Screen.k_width, Screen.k_height), (Array[k2].w + 6)*Math.min(Screen.k_width, Screen.k_height), (Array[k2].h + 6)*Math.min(Screen.k_width, Screen.k_height));
					word_ch = true;
				}
			}
			else if((!Mode.CountDown && !Mode.Results && Mode.Exercise && !Mode.Alphabetsong) && !Mode.SignIn && !Mode.LogIn && word_ch) {
				Array = [];
				var animal_height, center, top;
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
				if(frametype1 == "frame") {
					center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / 2;
					top = Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 40 + animal_height + 40;
				}
				else if(frametype1 == "Wordsframe") {
					center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / Math.floor((Task.test.length + 1) / 2);
					top = Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 40 + animal_height + 40;
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
					//console.log("left the rect");
					wordFrame = Task.test[i][frametype2];
					
					ctx.clearRect((Array[i].x - 6)*Math.min(Screen.k_width, Screen.k_height), (Array[i].y - 3)*Math.min(Screen.k_width, Screen.k_height), (Array[i].w + 6)*Math.min(Screen.k_width, Screen.k_height), (Array[i].h + 6)*Math.min(Screen.k_width, Screen.k_height));
					ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[i] - 6).x*Math.min(Screen.k_width, Screen.k_height), (Array[i].y - 6)*Math.min(Screen.k_width, Screen.k_height), (Array[i].w + 12)*Math.min(Screen.k_width, Screen.k_height), (Array[i].h + 12)*Math.min(Screen.k_width, Screen.k_height));
					drawTestAnimals();
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
					console.log("dragging");
					drawHeader();
					wordFrame = Task.test[k3][frametype2];
					Array[k3].x = Array[k3].x + mouseX/Math.min(Screen.k_width, Screen.k_height) - Pressed.x/Math.min(Screen.k_width, Screen.k_height);
					Array[k3].y = Array[k3].y + mouseY/Math.min(Screen.k_width, Screen.k_height) - Pressed.y/Math.min(Screen.k_width, Screen.k_height);
					var Point = {x:Array[k3].x*Math.min(Screen.k_width, Screen.k_height), y:Array[k3].y*Math.min(Screen.k_width, Screen.k_height)};
					var Rect = {x:0, y:0, w:Screen.width/Math.min(Screen.k_width, Screen.k_height), h:0.2*Screen.height/Math.min(Screen.k_width, Screen.k_height) + 20};
					
					ctx.clearRect((Array[k3].x - 6)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].y - 3)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].w + 6)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].h + 6)*Math.min(Screen.k_width, Screen.k_height));
					ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[k3] - 6).x*Math.min(Screen.k_width, Screen.k_height), (Array[k3].y - 6)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].w + 12)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].h + 12)*Math.min(Screen.k_width, Screen.k_height));
					ctx.clearRect(0, 0.2 * Screen.height, Screen.width, Screen.height);
					drawTestAnimals();
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
							top = Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 40 + animal_height + 40;
						}
						else if(frametype1 == "Wordsframe") {
							center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / Math.floor((Task.test.length + 1) / 2);
							top = Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 40 + animal_height + 40;
						}
						var word_height = setWordHeight();
						drawTap( (Screen.width / Math.min(Screen.k_width, Screen.k_height) - Task.asked[frametype1].w*animal_height/Task.asked[frametype1].h) / 2 +  Task.asked[frametype1].w*animal_height/Task.asked[frametype1].h / 2 - Hand.w / 2, Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + (20 + 20) + animal_height / 2 - Hand.h / 2, Hand.w, Hand.h);
									
					}
				}
			}
			if(Mode.Results || (Mode.Exercise && !Mode.Alphabetsong)) {
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
			if (Mode.Results && !Mode.SignIn && !Mode.LogIn &&!try_again_ch && mouseInRect(Result_form.x + 20 * Result_form.w / frame.w, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w, btn_width, btn_height)) {
				//clearScreenRect(Result_form.x + 20 * Result_form.w / frame.w, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w, btn_width, btn_height);
				drawResultTryAgainButton(Result_form.x + 20 * Result_form.w / frame.w - 3, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w - 3, btn_width + 6, btn_height + 6);
				try_again_ch = true;
			}
			else if(Mode.Results && !Mode.SignIn && !Mode.LogIn && try_again_ch && !(mouseInRect(Result_form.x + 20 * Result_form.w / frame.w - 3, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w - 3, btn_width - 6, btn_height + 6))) {
				clearScreenRect(Result_form.x + 20 * Result_form.w / frame.w - 3, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w - 3, btn_width + 6, btn_height + 6);
				drawResultForm(Result_form.x, Result_form.y, Result_form.w, Result_form.h);
				drawResultTryAgainButton(Result_form.x + 20 * Result_form.w / frame.w, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w, btn_width, btn_height);
				drawResultOkayButton(Result_form.x + 20 * Result_form.w / frame.w + 20 + btn_width, Result_form.y + Result_form.h - btn_height / 2 -  10 * Result_form.w / frame.w, btn_width, btn_height);
					
				var Correct = Task.Result.Answers.length;
				var Answers = Task.Result.Answers;
				var Total = Task.Total;
				var Max = Task.MaxPoint;
				//console.log(Correct, Total, Max);
				var digit_frame = Properties.Numbers["small-dark-1.png"];
				var digit = {};
				digit.h = 12  * Result_form.h / frame.h;
				digit.w = digit.h * digit_frame.w / digit_frame.h;
				
				drawDigit(Correct, Result_form.x + 115 * Result_form.w / frame.w, Result_form.y + 51 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
				drawDigit(Total, Result_form.x + 115 * Result_form.w / frame.w, Result_form.y + 68 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
				var points = countPoints(Answers, Total, Max);
				var stars = Math.round(points / (Max * Total) * 5);
				//console.log("stars", points / (Max * Total), stars);
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
				var minuts = Math.floor((Task.Result.Finish.getTime() - Task.Result.Start.getTime()) / 1000 / 60) + "";
				var seconds = Math.floor((Task.Result.Finish.getTime() - Task.Result.Start.getTime()) / 1000 - minuts * 60) + "";
				//console.log(Task.Result.Finish.getTime() - Task.Result.Start.getTime(), minuts, seconds);
				var i = 0;
				var j = 0;
				if(minuts != "0") {
					for (i; i < minuts.length; i++) {
						drawDigit(minuts[i], Result_form.x + 115 * Result_form.w / frame.w + i * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
						//console.log("drawing on", i);
					}
					var min = "min";
					i++;
					for(j; j < min.length;j++) {
						drawLetter(min[j], Result_form.x + 115 * Result_form.w / frame.w + (i + j) * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
						//console.log("drawing on", i + j);
					}
					i = i + j + 1;
					j = 0;
				}
				if(seconds != "0") {
					for (j = 0; j < seconds.length; j++) {
						//console.log(seconds[j]);
						drawDigit(seconds[j], Result_form.x + 115 * Result_form.w / frame.w + (i + j) * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
						//console.log("drawing on", i + j);
					}
					i = i + j + 1;
					var sec = "sec";
					for(j = 0; j < sec.length;j++) {
						//console.log(j, sec[j]);
						drawLetter(sec[j], Result_form.x + 115 * Result_form.w / frame.w + (i + j) * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
						//console.log("drawing on", i + j);
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
				if (Mode.Training && (Mode.Exercise && !Mode.Alphabetsong) && !Mode.SignIn && !Mode.LogIn &&!skip_ch && mouseInRect(Title.leftSpace + 20, Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn * frame.w / frame.h,size_btn)) {
					//clearScreenRect(Result_form.x + 20 * Result_form.w / frame.w, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w, btn_width, btn_height);
					clearScreenRect(Title.leftSpace + 20, Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn * frame.w / frame.h,size_btn)
					drawSkip(Title.leftSpace + 20 - 3, Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 20 - 3, size_btn * frame.w / frame.h + 6, size_btn + 6)
					skip_ch = true;
				}
				else if(Mode.Training && (Mode.Exercise && !Mode.Alphabetsong) && !Mode.SignIn && !Mode.LogIn && skip_ch && !(mouseInRect(Title.leftSpace + 20 - 3, Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 20 - 3, size_btn * frame.w / frame.h + 6,size_btn + 6))) {
					clearScreenRect(Title.leftSpace + 20 - 3, Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 20 - 3, size_btn * frame.w / frame.h + 6, size_btn + 6)
					drawSkip(Title.leftSpace + 20, Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn * frame.w / frame.h,size_btn)
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
					drawResultTryAgainButton(Result_form.x + 20 * Result_form.w / frame.w, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w, btn_width, btn_height);
						
					var Correct = Task.Result.Answers.length;
					var Answers = Task.Result.Answers;
					var Total = Task.Total;
					var Max = Task.MaxPoint;
					//console.log(Correct, Total, Max);
					var digit_frame = Properties.Numbers["small-dark-1.png"];
					var digit = {};
					digit.h = 12  * Result_form.h / frame.h;
					digit.w = digit.h * digit_frame.w / digit_frame.h;
					
					drawDigit(Correct, Result_form.x + 115 * Result_form.w / frame.w, Result_form.y + 51 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
					drawDigit(Total, Result_form.x + 115 * Result_form.w / frame.w, Result_form.y + 68 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
					var points = countPoints(Answers, Total, Max);
					var stars = Math.round(points / (Max * Total) * 5);
					//console.log("stars", points / (Max * Total), stars);
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
					var minuts = Math.floor((Task.Result.Finish.getTime() - Task.Result.Start.getTime()) / 1000 / 60) + "";
					var seconds = Math.floor((Task.Result.Finish.getTime() - Task.Result.Start.getTime()) / 1000 - minuts * 60) + "";
					//console.log(Task.Result.Finish.getTime() - Task.Result.Start.getTime(), minuts, seconds);
					var i = 0;
					var j = 0;
					if(minuts != "0") {
						for (i; i < minuts.length; i++) {
							drawDigit(minuts[i], Result_form.x + 115 * Result_form.w / frame.w + i * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
							//console.log("drawing on", i);
						}
						var min = "min";
						i++;
						for(j; j < min.length;j++) {
							drawLetter(min[j], Result_form.x + 115 * Result_form.w / frame.w + (i + j) * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
							//console.log("drawing on", i + j);
						}
						i = i + j + 1;
						j = 0;
					}
					if(seconds != "0") {
						for (j = 0; j < seconds.length; j++) {
							//console.log(seconds[j]);
							drawDigit(seconds[j], Result_form.x + 115 * Result_form.w / frame.w + (i + j) * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
							//console.log("drawing on", i + j);
						}
						i = i + j + 1;
						var sec = "sec";
						for(j = 0; j < sec.length;j++) {
							console.log(j, sec[j]);
							drawLetter(sec[j], Result_form.x + 115 * Result_form.w / frame.w + (i + j) * digit.w, Result_form.y + 120 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
							//console.log("drawing on", i + j);
						}
					}
					okay_ch = false;
				}
			}
			
		}
		function leftArrowClicked() {
			MenuItem.clicked = -1;
			MenuItem.chosen = MenuItem.clicked;
			if(MenuItem.firstItem > 0) {
				MenuItem.firstItem = MenuItem.firstItem - 1;
				clearMenuItemRect((MenuItem.leftSpace - 5), ( MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2 - 5) , (koef*100 + 10), (koef*100*226/152 + 10));
				drawMenuItems()
				l_a_x = MenuItem.leftSpace;
				l_a_width = 100*koef;
				l_a_height = koef*100*226/152;
				l_a_y =  MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2;
				if(MenuItem.firstItem) {
					drawLeftArrow(l_a_x, l_a_y , l_a_width, l_a_height);
				}
				if(MenuItem.firstItem + MenuItem.display < MenuItem.itemsCount) {
					r_a_height = koef*100*226/152;
					r_a_y =  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2;
					r_a_width = koef*100;
					r_a_x = MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width;
					drawRightArrow(Screen.width / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width,  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2, koef*100, koef*100*226/152);
				}
			}
			delete l_a_x, l_a_y , l_a_width, l_a_height
		}
		function rightArrowClicked() {
			MenuItem.clicked = -1;
			MenuItem.chosen = MenuItem.clicked;
			MenuItem.firstItem = MenuItem.firstItem + 1;
			l_a_x = MenuItem.leftSpace;
			l_a_width = 100*koef;
			l_a_height = koef*100*226/152;
			l_a_y =  MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2;
			if(MenuItem.firstItem + MenuItem.display >= MenuItem.itemsCount) {
				clearMenuItemRect(MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - 100*koef - 5, MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2 - 5, koef*100 + 10, koef*100*226/152 + 10);
			}
			drawLeftArrow(l_a_x, l_a_y, l_a_width, l_a_height);
			drawMenuItems()
			delete l_a_x, l_a_y , l_a_width, l_a_height
		}

		function bottomArrowClicked() {
				j = MenuItem.clicked;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace;
				t_a_width = 100*0.5;
				t_a_height = 0.5*100*226/152;
				//ctx.fillRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
				Task.firstTask = Task.firstTask + 1;
				
				drawTask(j, Task.firstTask, pX, (pY+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Trace the letters
				drawTask(j, Task.firstTask + 1, pX, (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Name the letter
				drawTask(j, Task.firstTask + 2, pX, (pY + (55/368*MenuItem.size + 10) * 2+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Name the letter sounds
				drawTask(j , Task.firstTask + 3, pX, (pY + (55/368*MenuItem.size + 10) * 3+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Task.a_clicked = false;
				
				
				if(Task.firstTask > 0) {
				//top arrow
				//ctx.fillRect(0, (MenuItem.topSpace)*Math.min(Screen.k_width, Screen.k_height), 1000, 100)
				//ctx.fillRect((pX + MenuItem.size / 2)*Math.min(Screen.k_width, Screen.k_height), 0, 1, 10000)
				//ctx.fillRect((pX + MenuItem.size / 2 + t_a_width / 2)*Math.min(Screen.k_width, Screen.k_height), 0, 1, 10000)
				//ctx.fillRect(0, pY*Math.min(Screen.k_width, Screen.k_height), 1000, 1)
				ctx.save();
				ctx.translate((pX + MenuItem.size / 2 + 3/4*t_a_width)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
				ctx.rotate(Math.PI / 2);
				drawLeftArrow(0, 0, t_a_width, t_a_height)
				ctx.restore();
				}
				if(Task.firstTask + Task.display >= Task.itemsCount[MenuItem.clicked]){
					b_a_height = 100*0.5;
					b_a_width = 0.5*100*226/152;
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2;
					pY = Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.topSpace - b_a_height;
					ctx.clearRect((pX-3)*Math.min(Screen.k_width, Screen.k_height), (pY-3)*Math.min(Screen.k_width, Screen.k_height), (b_a_width + 6)*Math.min(Screen.k_width, Screen.k_height), (b_a_height + 6)*Math.min(Screen.k_width, Screen.k_height));
				}
		}

		function topArrowClicked() {
				j = MenuItem.clicked;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace;
				t_a_width = 100*0.5;
				t_a_height = 0.5*100*226/152;
				//ctx.fillRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
				Task.firstTask = Task.firstTask - 1;
				
				drawTask(j, Task.firstTask, pX, (pY+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Trace the letters
				drawTask(j, Task.firstTask + 1, pX, (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Name the letter
				drawTask(j, Task.firstTask + 2, pX, (pY + (55/368*MenuItem.size + 10) * 2+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Name the letter sounds
				drawTask(j , Task.firstTask + 3, pX, (pY + (55/368*MenuItem.size + 10) * 3+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				
				if(Task.firstTask <= 0) {
				t_a_height = 100*0.5;
				t_a_width = 0.5*100*226/152;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2;
				pY =  MenuItem.topSpace;
				ctx.clearRect((pX - 3)*Math.min(Screen.k_width, Screen.k_height), (pY - 3)*Math.min(Screen.k_width, Screen.k_height), (t_a_width + 6)*Math.min(Screen.k_width, Screen.k_height), (t_a_height + 6)*Math.min(Screen.k_width, Screen.k_height))
				}
				//draw bottom arrow
					//bottom arrow
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
					pY =  MenuItem.topSpace + MenuItem.size;
					b_a_width = 100*0.5;
					b_a_height = 0.5*100*226/152;
					ctx.save();
					ctx.translate((pX + MenuItem.size / 2 - 3/4*b_a_width)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
					ctx.rotate(-Math.PI / 2);
					drawLeftArrow(0, 0, b_a_width, b_a_height)
					ctx.restore();
				
		}

		var atlasMenuItemTask = new Image();
		MenuItem.loadedMenuItemTasks = false;
		function loadMenuItemsTasks(j){
			// Load image and the json that defines locations
			atlasMenuItemTask.src = '/img/Menu-Items/Tasks.png';
			atlasMenuItemTask.addEventListener("load", function() {
				MenuItem.loadMenuItemsTasks = true;
				//console.log("drawing loaded sprites")
				drawMenuItemsTasks(j);
			}, false);	
		}
		function getUserNameLogIn(str, x, y){
			console.log("clicled")
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
						console.log(Profile.UserName);
					}
					
				});
				$(document).keyup(function(e){
					if(Profile.storeUserNameLogIn == true) {
						clearScreenRect((X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size));
						X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
						Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
						drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
						//ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
						drawLogInLogInButton(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
						drawLogInCancelButton(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
						//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
						//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
						delete key, e
					}
				});
			
			return str
			delete x, y, str
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
					delete key
					}
					
				});
				$(document).keyup(function(e){
					if(Profile.storePasswordLogIn == true) {
						clearScreenRect((X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size));
						X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
						Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
						drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
						//ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
						drawLogInLogInButton(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
						drawLogInCancelButton(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
						//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
						//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
						delete key
					}
				});
			return str
			delete x, y, str
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
					delete key, e
					}
					
				});
				$(document).keyup(function(e){
					if(Profile.storeUserNameSignIn == true) {
						ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
						Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
						size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
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
						
					delete key, e
					}
				});
			
			return str
			delete x, y, str
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
					delete key
					}
					
				});
				$(document).keyup(function(e){
					if(Profile.storePasswordSignIn == true) {
						Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
						size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
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
						delete key
					}
				});
			return str
			delete x, y, str
		}

		function drawTask(j, i, x, y, width, height) {
			try{
			var frame = Properties.Tasks[j][i].Frame;
			ctx.drawImage(atlasMenuItemTask, frame.x, frame.y, frame.w, frame.h, x*Math.min(Screen.k_width, Screen.k_height), y*Math.min(Screen.k_width, Screen.k_height) , width*Math.min(Screen.k_width, Screen.k_height), height*Math.min(Screen.k_width, Screen.k_height))
			}
			catch(e){
				console.log("no frame given");
			}
		}

		function drawMenuItemsTasks(j){
			//console.log("drawing tasks")
			//console.log(Task.firstTask)
			pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
			pY =  MenuItem.topSpace;
			t_a_width = 100*0.5;
			t_a_height = 0.5*100*226/152;
			clearMenuItemRect(pX - 10, pY - 10, MenuItem.size + 20, MenuItem.size + 20);
			Task.topSpace = (Screen.height/Math.min(Screen.k_width, Screen.k_height) - 2 * MenuItem.topSpace - 2 * t_a_width - (Task.display) * (55/368*MenuItem.size + 10) + 10) / 2;
			if(Task.firstTask > 0) {
			//top arrow
			ctx.save();
			ctx.translate((pX + MenuItem.size / 2 + 3/4*t_a_width)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
			ctx.rotate(Math.PI / 2);
			drawLeftArrow(0, 0, t_a_width, t_a_height)
			ctx.restore();
			}
			
			if(Task.itemsCount[j] >= 0){
				drawTask(j, 0, pX, (pY+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				if(Task.itemsCount[j] >= 1){
					drawTask(j, 1, pX, (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
					if(Task.itemsCount[j] >= 2){
						drawTask(j, 2, pX, (pY + (55/368*MenuItem.size + 10) * 2+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
						if(Task.itemsCount[j] >= 3){
							drawTask(j, 3, pX, (pY + (55/368*MenuItem.size + 10) * 3+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
						}
					}
				}
			}
			if(Task.firstTask + Task.display < Task.itemsCount[MenuItem.clicked]) {
			//bottom arrow
			pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
			pY =  MenuItem.topSpace + MenuItem.size;
			ctx.save();
			ctx.translate((pX + MenuItem.size / 2 - 3/4*t_a_width)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
			ctx.rotate(-Math.PI / 2);
			drawLeftArrow(0, 0, t_a_width, t_a_height)
			ctx.restore();
			}
			
			
			delete pX, pY;
			delete t_a_width, t_a_height;
			
		}
		function MenuItemClicked(j) {
			k = -1;
			k1 = -1;
			task_ch = false;
			//console.log(MenuItem.clicked)
			setTimeout(function(){
			if(sound_on && !Mode.Exercise) {
				if(MenuItem.chosen != j)
					speak(MenuItem.ItemList[j]);
				MenuItem.chosen = MenuItem.clicked;
				
				MenuItem.audio_played = true;
			}}, 500)
			if(!MenuItem.loadMenuItemsTasks) {
				loadMenuItemsTasks(j);
			}
			else {
				drawMenuItemsTasks(j)
			}
			
		}

		function showLogInForm(){
				var iter = 0;
				if(Forms_loaded){
					stop_loading = true;
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
					Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
					drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
					drawLogInLogInButton(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
					drawLogInCancelButton(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
					ctx.fillStyle='#000000';
					//ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
					//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
					//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
					var div = document.createElement('inputDiv');
					div.innerHTML = "<input id = 'UserName' name = 'UserName' autofocus/><input id = 'Password' name = 'UserName' autofocus/>";
					//mouseInRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 115 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size)
					//mouseInRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size)
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
					console.log("Profile.UserName, Profile.Password", Profile.UserName, Profile.Password);
					if(Profile.UserName)
						document.getElementById('UserName').value = Profile.UserName;
					if(Profile.Password)
						document.getElementById('Password').value = Profile.Password;
					console.log("input code");
					
					pressedUserNameLogIn = 0;
					pressedPasswordLogIn = 0;
					delete X_, Y_
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
				points = points + Max + 1 - Answers[i].Attempts;
			}
			console.log(points);
			return points;
		}
		function showResultForm(Answers = Task.Result.Answers, Total = Task.Total, Max){
				delete Pressed.x;
				delete Pressed.y;
				delete Task.asked;
				clearRect(0, 0, Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height));
				drawHeader();
				Mode.Results = true;
				stop_loading = true;
				var Correct = Answers.length;
				if(Forms_loaded){
					var frame = Properties.Forms["result_form.png"];
					var Result_form = {};
					Result_form.h = MenuItem.size;
					Result_form.w = Result_form.h * frame.w / frame.h;
					Result_form.x = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - Result_form.w) / 2;
					Result_form.y = (Screen.height / Math.min(Screen.k_width, Screen.k_height) - Result_form.h) / 2;
					
					drawResultForm(Result_form.x, Result_form.y, Result_form.w, Result_form.h);
					var btn = Properties.Forms["result_form_try_again_btn.png"];
					var btn_width = (Result_form.w - 2 * 20 * Result_form.w / frame.w - 20) / 2;
					var btn_height = btn_width * btn.h / btn.w;
					drawResultTryAgainButton(Result_form.x + 20 * Result_form.w / frame.w, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w, btn_width, btn_height);
					drawResultOkayButton(Result_form.x + 20 * Result_form.w / frame.w + 20 + btn_width, Result_form.y + Result_form.h - btn_height / 2 -  10 * Result_form.w / frame.w, btn_width, btn_height);
					
					
					var digit_frame = Properties.Numbers["small-dark-1.png"];
					var digit = {};
					digit.h = 12  * Result_form.h / frame.h;
					digit.w = digit.h * digit_frame.w / digit_frame.h;
					drawDigit(Correct, Result_form.x + 115 * Result_form.w / frame.w, Result_form.y + 51 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
					drawDigit(Total, Result_form.x + 115 * Result_form.w / frame.w, Result_form.y + 68 * Result_form.h / frame.h - digit.h, digit.w, digit.h, "small-dark");
					var points = countPoints(Answers, Total, Max);
					Task.Result.Points = points;
					console.log(points, Task.Result, Task.Result.Points);
					
					var stars = Math.round(points / (Max * Total) * 5);
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
					var minuts = Math.floor((Task.Result.Finish.getTime() - Task.Result.Start.getTime()) / 1000 / 60) + "";
					var seconds = Math.floor((Task.Result.Finish.getTime() - Task.Result.Start.getTime()) / 1000 - minuts * 60) + "";
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
				else {
					console.log("waiting for result form");
					setTimeout(function(){
						showResultForm(Answers, Total, Max);
					}, 100);
				}
		}
		function showSignInForm(){
				var iter = 0;
				stop_loading = true;
				drawLoading();
				if(Forms_loaded){
					stop_loading = true;
					Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
					size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (size_))/2
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
					console.log("Profile.UserName, Profile.Password", Profile.UserName, Profile.Password);
					if(Profile.UserName)
						document.getElementById('UserName').value = Profile.UserName;
					if(Profile.Password)
						document.getElementById('Password').value = Profile.Password;
					
					console.log("input code");
					BritishAccent()
					drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
					drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
					ctx.fillStyle='#000000';
					//ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
					//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
					//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
					pressedUserNameSignIn = 0;
					pressedPasswordSignIn = 0;
					
					delete X_, Y_, size_
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
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			drawSignInForm(X_, Y_, size_, size_);
			ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
			if(NewAccent == "US English Female")
					AmericanAccent()
			if(NewAccent == "Australian Female")
					AustralianAccent()
			if(NewAccent == "UK English Male")
					BritishAccent()
			/*var input = document.getElementById("hiddenInput");
				input.style.position = "absolute";
				input.style.top =  (Y_ + 57 / 368 * size_) * Math.min(Screen.k_width, Screen.k_height);
				//console.log(X_, Y_);
				input.style.left = (X_ + 35 / 368 * size_) * Math.min(Screen.k_width, Screen.k_height);
				input.style.display = "block";
				//input.style.autofocus = true;
				input.style.height =  36 / 368 * size_* Math.min(Screen.k_width, Screen.k_height);
				input.style.width = 298/ 368 * size_* Math.min(Screen.k_width, Screen.k_height);
				fillRect(X_, Y_, 100, input.style.height);*/
				//console.log(36 / 368 * size_* Math.min(Screen.k_width, Screen.k_height), 298 / 368 * size_* Math.min(Screen.k_width, Screen.k_height));
			/*if(pressedUserNameSignIn != 0)
				ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			else
				Profile.UserName = ""
			if(pressedPasswordSignIn != 0)
				ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			else
				ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			*/
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
			Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
			clearScreenRect((X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size));
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
				drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
				/*ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
				if(pressedUserNameLogIn != 0)
					ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				else
					Profile.UserName = ""
				if(pressedPasswordLogIn != 0)
					ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				else
					ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				*/
				pressedUserNameLogIn = pressedUserNameLogIn + 1;
				drawLogInLogInButton(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
				drawLogInCancelButton(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
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
			Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
			clearScreenRect((X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size));
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
				drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
				/*ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
				if(pressedUserNameLogIn != 0)
					ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				else
					ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				if(pressedPasswordLogIn != 0)
					ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				else
					Profile.Password = ""
				*/pressedPasswordLogIn = pressedPasswordLogIn + 1;
				drawLogInLogInButton(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
				drawLogInCancelButton(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
				console.log("password area clicked", Profile.storeUserNameLogIn, Profile.storePasswordLogIn)
				/*if(Profile.storePasswordLogIn != false && Profile.storePasswordLogIn != true) {
					Profile.storePasswordLogIn = true;
					getPasswordLogIn(Profile.Password, X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size + 20 / 202 * MenuItem.size)
					if(Profile.storeUserNameLogIn == true)
						Profile.storeUserNameLogIn = false;
				}
				else {
					Profile.storePasswordLogIn = true;
					if(Profile.storeUserNameLogIn == true)
						Profile.storeUserNameLogIn = false;
				}*/
				
		}
		function PasswordAreaClickedSignIn() {
				Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
				size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
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
				//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			
				/*if(pressedUserNameSignIn != 0)
					ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				else
					ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				if(pressedPasswordSignIn != 0)
					ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				else
					Profile.Password = ""
				*/
				pressedPasswordSignIn = pressedPasswordSignIn + 1;
				console.log("password area clicked", Profile.storeUserNameLogIn, Profile.storePasswordLogIn)
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
			console.log("AmericanAccent")
			drawSignInForm(X_, Y_, size_, size_);
			//drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			//drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			ctx.fillStyle = "#000000"
			fillRect(X_ + (35 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			fillRect(X_ + (35 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRect(X_ + (35 - 4) / 368 * size_, Y_ + 177 / 368 * size_ + (23 + 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRect(X_ + 35 / 368 * size_ + (36 + 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			//fillRect(X_ + 35 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23 / 368 * size_)
			NewAccent = "US English Female"
		}
		function AustralianAccent() {
			console.log("AustralianAccent")
			//fillRect(X_ + 80 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23 / 368 * size_)
			drawSignInForm(X_, Y_, size_, size_);
			//drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			//drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			ctx.fillStyle = "#000000"
			fillRect(X_ + (80 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			fillRect(X_ + (80 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRect(X_ + (80 - 4) / 368 * size_, Y_ + 177 / 368 * size_ + (23 + 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRect(X_ + 80 / 368 * size_ + (36 + 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			NewAccent = "Australian Female"
		}
		function BritishAccent() {
			console.log("BritishAccent")
			drawSignInForm(X_, Y_, size_, size_);
			//drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			//drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			//fillRect(X_ + 124 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23 / 368 * size_)
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
		video.addEventListener('loadstart', function() {
			console.log("loading!")
			var $this = this; //cache
			if (Mode.Exercise && Mode.Alphabetsong) {
				pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2
				drawPlayerButtons()
				pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2
				ctx.drawImage(Thumbnails['abc song'], pX * Math.min(Screen.k_width, Screen.k_height) +  300 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 1066 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)) - 300 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
				if(!playing)
					stop_loading = false;
				//ctx.fillRect(pX * Math.min(Screen.k_width, Screen.k_height) + 1066 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 1366 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)) - 1066 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
				//ctx.fillRect(pX * Math.min(Screen.k_width, Screen.k_height) + 1066 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 1366 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)) - 1066 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 10000);console.log(Thumbnails['abc song'])
			}
		}, 0);
		video.addEventListener('play', function() {
		var $this = this; //cache
		Task.Result.Start = new Date;
		stop_loading = true;
		(function loop() {
			if (!$this.paused && !$this.ended) {
				playing = true;
				if(!sound_on)
					video.muted = true;
				else
					video.muted = false;
				var videoScr = $this.src
				if($this.src.indexOf("/img/Alphabet/abc%20song.mp4") !== -1) {
					pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2
					ctx.drawImage($this, pX * Math.min(Screen.k_width, Screen.k_height), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 1366 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
					ctx.clearRect(pX * Math.min(Screen.k_width, Screen.k_height), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 300 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
					ctx.clearRect(pX * Math.min(Screen.k_width, Screen.k_height) + 1066 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 1366 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)) - 1066 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
					//buttons were here
					setTimeout(loop, 1000 / 30); // drawing at 30fps
				}
				drawPlayerButtons();
		  }
		})();
		}, 0);
		function AlphabetSongPlay() {
			video.src = "/img/Alphabet/abc song.mp4"
			console.log("play!")
			if(!sound_on)
				video.muted = true;
			video.play()
		}
		function AlphabetSongEx() {
			AlphabetSongPlay()
			
		}
		function drawPlayerButtons() {
			//buttons
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
			pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
			//size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) / 2  - 40 - 10 * 4) / 5
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			if(!play_btn_ch)
				drawPlayButton(pX + 20, pY, size_btn, size_btn)
			else
				drawPlayButton(pX + 20- 3, pY - 3, size_btn + 6, size_btn + 6)
			if(!pause_btn_ch)
				drawPauseButton(pX + 20, pY + size_btn + 10, size_btn, size_btn)
			else
				drawPauseButton(pX + 20 - 3, pY + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
			if(!stop_btn_ch)
				drawStopButton(pX + 20, pY + size_btn + 10 + size_btn + 10, size_btn, size_btn)
			else
				drawStopButton(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
			if(!restart_btn_ch)
				drawRestartButton(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)
			else
				drawRestartButton(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
			if(!exit_btn_ch)
				drawExitButton(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)
			else
				drawExitButton(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
			delete size_btn
		}
		/*function setAnimalWidth() {
			var animal_height = 50;
			var word_height = (0.8 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40 * 2 - animal_height - 1 * 30) / 2;
			var broadest_word = (Task.test).slice(0);
			for(var i = 0; i < broadest_word.length; i++) {
				broadest_word[i][frametype2] = Task.test.slice(0)[i][frametype2];
			}
			broadest_word = broadest_word.sort(function(a, b){
				return a[frametype2].w * word_height/a[frametype2].h - b[frametype2].w * word_height/b[frametype2].h;
			})[broadest_word.length - 1];
			var frame_width = broadest_word.w + 50;
			var max_word_width = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - 2 * Title.leftSpace - 30) / Math.floor((Task.test.length + 1) / 2);
			//var word_width = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (Math.floor((Task.test.length + 1) / 2) - 1) * 30) / Math.floor((Task.test.length + 1) / 2);
		}*/
		function setWordHeight(){
			try {
				if(frametype1 == "frame" && frametype2 == "Wordsframe") {
					var animal_height = Screen.height / Math.min(Screen.k_width, Screen.k_height) / 4;
					var word_height = (0.8 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40 * Math.floor((Task.test.length + 1) / 2) - animal_height - (Math.floor((Task.test.length + 1) / 2) - 1) * 30) / Math.floor((Task.test.length + 1) / 2);
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
					var max_word_height = (0.8 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40 - animal_height - 40 - 2 * 20) / 2;
					var max_word_width = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - 2 * Title.leftSpace - 10 * (Math.floor((Task.test.length + 1) / 2) - 1)) / Math.floor((Task.test.length + 1) / 2);
					var broadest_word = (Task.test).slice(0);
					for(var i = 0; i < broadest_word.length; i++) {
						broadest_word[i][frametype2] = Task.test.slice(0)[i][frametype2];
					}
					broadest_word = broadest_word.sort(function(a, b){
						return a[frametype2].w * max_word_height/a[frametype2].h - b[frametype2].w * max_word_height/b[frametype2].h;
					})[broadest_word.length - 1];
					//console.log(max_word_height, max_word_width, (Math.floor((Task.test.length + 1) / 2) - 1), Math.floor((Task.test.length + 1) / 2));
					if(max_word_height * broadest_word[frametype2].w / broadest_word[frametype2].h < max_word_width) {
						//console.log("A", max_word_height);
						return max_word_height;
					}
					else {
						//console.log(Screen.width,"B",max_word_width , broadest_word[frametype2].h, broadest_word[frametype2].w);
						return max_word_width * broadest_word[frametype2].h / broadest_word[frametype2].w;
						
						
					}
				}
			
			}
			catch(e){};
		}
		function drawTestAnimals() {
			console.log("drawtestanimals");
			console.log("Task.asked", Task.asked);
			ctx.clearRect(0, 0.2 * Screen.height, Screen.width, Screen.height);
			var top, center, animal_height;
			console.log(frametype1, frametype2);
			if(frametype1 == "frame") {
				animal_height = Screen.height / Math.min(Screen.k_width, Screen.k_height) / 4;
			}
			else {
				animal_height = 100;
			}
			var edge = 0;
			
			if(frametype1 == "frame") {
				center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / 2;
				top = Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 40 + animal_height + 40;
			}
			else if(frametype1 == "Wordsframe") {
				center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / Math.floor((Task.test.length + 1) / 2);
				top = Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 40 + animal_height + 40;
			
			}
			var word_height = setWordHeight();
			console.log(Task.TopicName + frametype1);
			//ctx.drawImage(atlas.Animalsframe,Task.asked[frametype1].x, Task.asked[frametype1].y, Task.asked[frametype1].w, Task.asked[frametype1].h, (Screen.width - Task.asked[frametype1].w*animal_height/Task.asked[frametype1].h*Math.min(Screen.k_width, Screen.k_height)) / 2, Screen.height * 0.2 + (20 + 20) * Math.min(Screen.k_width, Screen.k_height), Task.asked[frametype1].w*animal_height/Task.asked[frametype1].h*Math.min(Screen.k_width, Screen.k_height), animal_height*Math.min(Screen.k_width, Screen.k_height));
			ctx.drawImage(atlas[Task.TopicName + frametype1],Task.asked[frametype1].x, Task.asked[frametype1].y, Task.asked[frametype1].w, Task.asked[frametype1].h, (Screen.width - Task.asked[frametype1].w*animal_height/Task.asked[frametype1].h*Math.min(Screen.k_width, Screen.k_height)) / 2, Screen.height * 0.2 + (20 + 20) * Math.min(Screen.k_width, Screen.k_height), Task.asked[frametype1].w*animal_height/Task.asked[frametype1].h*Math.min(Screen.k_width, Screen.k_height), animal_height*Math.min(Screen.k_width, Screen.k_height));
				
			for(var i = 0; i < Task.test.length; i++) {
				var wordFrame = (Task.test.concat())[i][frametype2];
				console.log(wordFrame);
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
			drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn, size_btn);
			if(!Mode.Training) {
				var frame = Properties.Buttons["red-heart.png"];
				var i;
				for(i = 0; i < Task.tries; i++) {
					drawRedHeart(Title.leftSpace + 20 + (2/3*size_btn * frame.w / frame.h + 20) * i, Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 20, 2/3*size_btn * frame.w / frame.h,2/3*size_btn)
				}
				for(i; i < 4; i++) {
					drawHeart(Title.leftSpace + 20 + (2/3*size_btn * frame.w / frame.h + 20) * i, Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 20, 2/3*size_btn * frame.w / frame.h,2/3*size_btn)
				}
			}
			else {
				var frame = Properties.Buttons["skip.png"];
				drawSkip(Title.leftSpace + 20, Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn * frame.w / frame.h,size_btn)
				
			}
		}
		MainCanvas.addEventListener("mouseup", checkClick);
		MainCanvas.addEventListener("touchend", checkClick);
		function checkClick(mouseEvent){
			event.preventDefault();
			try {
				var touch = mouseEvent.changedTouches[0];
				var rect = MainCanvas.getBoundingClientRect();
				var scaleX = MainCanvas.width / rect.width;
				var scaleY = MainCanvas.height / rect.height;
				mouseX = (touch.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
				mouseY = (touch.clientY - rect.top) * scaleY;
				console.log(mouseX, mouseY);
			}
			catch(e) {
				
			}
			if(Mode.Tasks && MenuItem.clicked > -1) {
				//top arrow has been clicked
				t_a_height = 100*0.5;
				t_a_width = 0.5*100*226/152;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2;
				pY =  MenuItem.topSpace;
				if(mouseInRect(pX, pY, t_a_width, t_a_height)){	
					Task.a_clicked = true;
					if(Task.firstTask > 0) {
						topArrowClicked()
					}
				}			
				//bottom arrow has been clicked
				b_a_height = 100*0.5;
				b_a_width = 0.5*100*226/152;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2;
				pY = Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.topSpace - b_a_height;
				
				if(mouseX >= pX*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + b_a_width)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY + b_a_height)*Math.min(Screen.k_width, Screen.k_height)){
					Task.a_clicked = true;
					if(Task.firstTask + Task.display < Task.itemsCount[MenuItem.clicked]) {
						bottomArrowClicked()
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
						
						//здесь не работает not working properly
						console.log("background")
						//Task.a_clicked = false;
						//task_ch = false;
						
						if(!mouseInRect(X_l, MenuItem.topSpace, MenuItem.size, MenuItem.size)) {
							pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
							pY =  MenuItem.topSpace;
							pW = MenuItem.size;
							pH = MenuItem.size;
							MenuItem.chosen = MenuItem.clicked;
							clearMenuItemRect(pX, pY, pW, pH);
							console.log("drawing after clicked")
							DrawMenuItem(MenuItem.clicked, MenuItem.clicked - MenuItem.firstItem, pX, pY, pW, pH);
							MenuItem.clicked = -1;
							console.log(MenuItem.clicked)
							Mode.Tasks = false;
							
						}
						else {
							//MenuItem.clicked = MenuItem.chosen;
						}
						
						
					}	
				}
			}
			//MenuItem has been clicked
			var j = 0;
			if(Mode.MenuItem && MenuItem.clicked == -1) {
				while (j < MenuItem.display)  {
					
					X_l = 2 * MenuItem.leftSpace + 100*koef + 68 * (j + 1) + MenuItem.size * j - 68;
					X_r = 2 * MenuItem.leftSpace + 100*koef + 68 * (j + 1) + MenuItem.size * (j + 1) - 68;
					if(mouseY >= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace)  && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.size + MenuItem.topSpace)  && (mouseX >= Math.min(Screen.k_width, Screen.k_height) * X_l && mouseX <= Math.min(Screen.k_width, Screen.k_height) * X_r)){
						console.log("taskpressed")
						//it was here
						Mode.Tasks = false;
						Task.firstTask = 0;
						MenuItem.audio_played = false;
						MenuItem.clicked = j + MenuItem.firstItem;
						setTimeout(function(){
							Mode.Tasks = true;
							Mode.Exercise = false;
						}, 5);
						
						MenuItemClicked(MenuItem.clicked);
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
			r_a_height = koef*100*226/152;
			r_a_y =  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2;
			r_a_width = koef*100;
			r_a_x = MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width;
			if(Mode.MenuItem && MenuItem.firstItem + MenuItem.display < MenuItem.itemsCount){
				if (mouseX >= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - 100*koef) && mouseX <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - 100*koef + koef*100) && mouseY >=  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2)  && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2 + koef*100*226/152)) {	
					rightArrowClicked();
				}
			}
			
			
			//Sound button is clicked
			if(!Mode.LogIn && !Mode.SignIn && mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2 * 5) / 3)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + 150*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + 3 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2 * 5) / 3)* Math.min(Screen.k_width, Screen.k_height)) {
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + 3 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				if(sound_on) {
					drawSoundOffButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
					sound_on = false;
				}
				else {
					drawSoundOnButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
					sound_on = true;
				}
				
			}
			//Login button has been clicked
			if(!Mode.Exercise && !Profile.LoggedIn && !Mode.SignIn && !Mode.LogIn && mouseX >= ((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace) * Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + Profile.size_btn) * Math.min(Screen.k_width, Screen.k_height) && mouseY >= (20) * Math.min(Screen.k_width, Screen.k_height) && mouseY <= (20 + Profile.size_btn*75/228) * Math.min(Screen.k_width, Screen.k_height)) {
				if(Forms_loaded == false)
						loadForms()
				stop_loading = false;
				drawLoading();
				//Profile.UserName = "Username"
				//Profile.Password = "Password"
				//delete Profile.storePasswordLogIn;
				//delete Profile.storeUserNameLogIn;
				if(Profile.storeUserNameLogIn == true)
					Profile.storeUserNameLogIn = false;
				if(Profile.storePasswordLogIn == true)
					Profile.storePasswordLogIn = false;
				showLogInForm()
			}
			//Sign Up button has been clicked
			if(!Mode.Exercise &&!Profile.LoggedIn && !Mode.LogIn && !Mode.LogIn && mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace) * Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + Profile.size_btn) * Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
				if(Forms_loaded == false)
					loadForms();
				showSignInForm();
				
			
				//Profile.UserName = "Username"
				Profile.UserName = "";
				//Profile.Password = "Password"
				Profile.Password = "";
			}
			delete X_l, X_r, j;
			if(Mode.LogIn && mouseInRect((Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size *4/3) / 205 * 368)/2, 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size * 4/3) / 2, (MenuItem.size *4/3) / 205 * 368, MenuItem.size * 4/3)) {
				//log in area clicked
			}
					
			if(Mode.SignIn && mouseInRect((Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size *3/2))/2, 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size * 3/2) / 2, (MenuItem.size *6/4), MenuItem.size * 6/4)) {
				console.log("sign in area clicked")				
			}
			//cancel button has been clicked during login mode
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
			Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
			if(Mode.LogIn && mouseInRect(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)) {
				Mode.LogIn = false;
				Mode.MenuItem = true;
				if(Profile.storeUserNameLogIn == true)
					Profile.storeUserNameLogIn = false;
				if(Profile.storePasswordLogIn == true)
					Profile.storePasswordLogIn = false;
				console.log("UserName:", document.getElementById("UserName").value);
				console.log("Password:", document.getElementById("Password").value);
				Profile.UserName = "";
				Profile.Password = "";
				$("#UserName").remove();
				$("#Password").remove();
				$("#inputdiv").remove();
				
				clearScreenRect(0, 0, Screen.width/ Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height) )
				respondCanvas()
				
			}
			//username area has been clicked LogIn Mode
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
			Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
			if(Mode.LogIn && mouseInRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size)){
				UserNameAreaClickedLogIn()
			}
			
			//password area has been clicked LogIn Mode
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
			Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
			if(Mode.LogIn && mouseInRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 115 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size)){
				//PasswordAreaClickedLogIn();
				
			}
			//login button clicked LogIn Mode
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
			Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
			if(Mode.LogIn && mouseInRect(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202))
			{
				console.log("UserName:", document.getElementById("UserName").value);
				console.log("Password:", document.getElementById("Password").value);
				
				if(checkProfileData(document.getElementById("UserName").value, document.getElementById("Password").value)) {
					Profile.UserName = document.getElementById("UserName").value;
					Profile.Password = document.getElementById("Password").value;
					var User = {};
					User.UserName = Profile.UserName;
					User.Password = Profile.Password;
					socket.emit('auth', {
						User: User
					})
					socket.on('auth', function(data){
						if(data.res) {
							console.log("correct data", data.User);
							Profile.Accent = data.User.Accent;
							Profile.LoggedIn = true;
							Mode.LogIn = false;
							Mode.MenuItem = true;
							Profile.storeUserNameLogIn = false;
							Profile.storePasswordLogIn = false;
							console.log(Profile.UserName, Profile.Password)
							clearScreenRect(0, 0, Screen.width/ Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height) )
							$("#UserName").remove();
							$("#Password").remove();
							$("#inputdiv").remove();
							respondCanvas()
						}
						else {
							console.log("wrong data");
							alert("wrong data");
						}
					});
				}
				else {
					console.log("fill all the information");
					alert("fill all the information");
				}
			}
			//background has been clicked during LogIn Mode
			if(Mode.LogIn && !mouseInRect(X_ + 47 - 2, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40 - 2, (MenuItem.size) / 202 * 156 + 4, MenuItem.size * 37 / 202 + 4)&& !(mouseInRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 115 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size) || mouseInRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size))) {
				console.log("background")
				if(Profile.storeUserNameLogIn == true)
					Profile.storeUserNameLogIn = false;
				if(Profile.storePasswordLogIn == true)
					Profile.storePasswordLogIn = false;
			}
			
			//username area clicked SignIn Mode
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			if(Mode.SignIn && mouseInRect(X_ + 35 / 368 * size_, Y_ + 57 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_)) {
				UserNameAreaClickedSignIn()
				//fillRect(X_ + 35 / 368 * size_, Y_ + 57 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_)
				
			}
			//password area clicked SignIn Mode
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			if(Mode.SignIn && mouseInRect(X_ + 35 / 368 * size_, Y_ + 115 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_)) {
				//PasswordAreaClickedSignIn()
				//fillRect(X_ + 35 / 368 * size_, Y_ + 115 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_)
			}
			if(Mode.SignIn && !(mouseInRect(X_ + 35 / 368 * size_, Y_ + 57 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_) || mouseInRect(X_ + 35 / 368 * size_, Y_ + 115 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_))) {
				console.log("background")
				if(Profile.storeUserNameSignIn == true)
					Profile.storeUserNameSignIn = false;
				if(Profile.storePasswordSignIn == true)
					Profile.storePasswordSignIn = false;
			}
			
			//flag area clicked SignIn Mode
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
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
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			if(Mode.SignIn && mouseInRect(X_ + 80 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23 / 368 * size_)) {
				AustralianAccent()
				//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				
			}
			//British accent
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			if(Mode.SignIn && mouseInRect(X_ + 124 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23 / 368 * size_)) {
				BritishAccent()
				//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				
			}
			//Cancel button clicked SignIn Mode
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			if (Mode.SignIn && mouseInRect(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)) {
				Mode.SignIn = false;
				Mode.MenuItem = true;
				NewAccent = "UK English Male";
				console.log("UserName:", document.getElementById("UserName").value);
				console.log("Password:", document.getElementById("Password").value);
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
				respondCanvas()
			}
			
			//Signin button clicked SignIn mode
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			if (Mode.SignIn && mouseInRect(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)) {
				if(checkProfileData(document.getElementById("UserName").value, document.getElementById("Password").value)){
					Profile.UserName = document.getElementById("UserName").value;
					Profile.Password = document.getElementById("Password").value;
					var User = {};
					User.UserName = Profile.UserName;
					User.Password = Profile.Password;
					User.Accent = NewAccent;
					console.log(NewAccent);
					socket.emit('newUser', {
						User: User
					})
					console.log("newUser", Profile);
					socket.on('newUser', function(data){
						console.log(data);
						console.log("new user:", data.res);
						
						if(data.res) {
							Profile.LoggedIn = true;
							Mode.SignIn = false;
							Mode.MenuItem = true;
							Profile.storeUserNameSignIn = false;
							Profile.storePasswordSignIn = false;
							Profile.Accent = NewAccent;
							console.log("newUser", Profile);
							console.log(Profile.Accent);
							console.log(Profile.UserName, Profile.Password, Profile.Accent)
							clearScreenRect(0, 0, Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height) )
							$("#UserName").remove();
							$("#Password").remove();
							$("#inputdiv").remove();
							respondCanvas()
						}
						else {
							ctx.fillText("this username is taken", (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
						}
						
					})
				}
				else {
					alert("Fill all information");
				}
			}
			function selectAnimal(){
				console.log("selectAnimal");
				if(!Mode.Training && Task.toTest.length == Task.test.length) {
					Task.Result.Start = new Date;
					Task.Result.Answers = [];
				}
				if(Task.toTest.length) {
					var i = randomInteger(0, Task.toTest.length - 1);
					console.log("random", i);
					var animal = Task.toTest.concat()[i];
					Task.asked = Task.toTest.concat()[i];
					console.log("i", i, animal);
					ctx.fillStyle="#000000";
					Task.tries = Task.MaxPoint;
					stop_loading = true;
					console.log("Pressed", Pressed);
					delete Pressed.x;
					delete Pressed.y;
				
					drawTestAnimals();
				}
				else if(!Mode.Training){
					Task.Result.Finish = new Date;
					delete Task.Result.time;
					//Mode.Matchtheanimalswiththeirnames = false;
					Mode[Task.TaskName.replace(/\s/g,'')] = false;
					
					loadForms();
					stop_loading = false;
					drawLoading();
					showResultForm(Task.Result.Answers, Task.Total, Task.MaxPoint);
					console.log("Test is finished", "Task.Result", Task.Result.Answers.length);
					
				}
				else {
					Mode[Task.TaskName.replace(/\s/g,'')] = false;
					clearRect(0,0,Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height));
					drawHeader();
					console.log(Mode.Matchtheanimalswiththeirnames, Task.TaskName.replace(/\s/g,''), Task.loadedNumbers);
					var digit_frame = Properties.Numbers["1.png"];
					console.log(digit_frame);
					var digit = {};
					digit.h = 300;
					digit.w = digit.h * digit_frame.w / digit_frame.h;
					console.log("hello");
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
			function setTest(Array, N){
				console.log("set test", Profile.UserName, Profile.Password);
				stop_loading = true;
				Mode.Results = false;
				Mode.CountDown = false;
				Task.Total = N;
				if(!Mode.Training)
					Task.test = getRandomArray(Array, [], N);
				else
					Task.test = getRandomArray(Array, [], Array.length);
				console.log("test", Task.test, Task.test.length);
				Task.toTest = Task.test.slice(0);
				console.log("Task.toTest", Task.toTest);
				selectAnimal();
			}
			function checkAnswer(answer_i) {
				//console.log("checkAnswer");
				//console.log("before", Task.toTest, Task.toTest.length);
							
				console.log(Task.test[answer_i].Word, Task.asked.Word, Task.test[answer_i].Word == Task.asked.Word);
				if(Task.test[answer_i].Word == Task.asked.Word) {
					return true;
				}
				else {
					return false;
				}
			}
			var checkloaded = {};
			checkloaded.Animals = function (TaskName, N) {
				if(Task.loadedAnimalsframeWordsframe && Task.loadedAnimalsframe) {
						console.log("animals are loaded");
						try {
							console.log(Task.Frames[TaskName].concat());
							setTest(Task.Frames[TaskName].concat(), N);
						}
						catch(e) {
							console.log(TaskName, N);
							setTimeout(function() {
								checkloaded.Animals(TaskName, N);
							}, 200);
							
						}
				}
				else {setTimeout(function(){
						console.log("animals are not loaded yet");
						console.log("waiting to load");
						checkloaded.Animals(TaskName, N);
					}, 200)
				}
			}
			checkloaded.Numbers = function (TaskName, N) {
				if(Task.loadedNumbersWordsframe && Task.loadedNumbersframe) {
						console.log("numbers are loaded");
						try {
							console.log(Task.Frames[TaskName].concat());
							setTest(Task.Frames[TaskName].concat(), N);
						}
						catch(e) {
							console.log(TaskName, N);
							setTimeout(function() {
								checkloaded.Numbers(TaskName, N);
							}, 200);
							
						}
				}
				else {setTimeout(function(){
						console.log("animals are not loaded yet");
						console.log("waiting to load");
						checkloaded.Numbers(TaskName, N);
					}, 200)
				}
			}
			function showTask(TaskName, TopicName,Points, N = 0) {
				console.log(TaskName);
				Mode.CountDown = false;
				Task.TaskName = TaskName;
				Task.TopicName = TopicName;
				Task.MaxPoint = Points;
						
				if(Profile.LoggedIn) {
					Task.Result.UserName = Profile.UserName;
					Task.Result.Exercise = TaskName;
				};
				switch(TaskName) {
					case 'Alphabet song':
						console.log(Task.TaskName.replace(/\s/g,''));
						Mode[Task.TaskName.replace(/\s/g,'')] = true;
				
						name = 'abc song';
						if(!Thumbnails[name]) {
							loadThumbnail(name);
						}
						AlphabetSongEx();
						stop_loading = false;
						drawLoading();
						break;
					case 'Name animals':
						console.log("in case");
						console.log(Task.TaskName.replace(/\s/g,''));
						Mode[Task.TaskName.replace(/\s/g,'')] = true;
						frametype1 = "frame";
						frametype2 = "Wordsframe";
			
						Mode.Training = true;
						if(!Task.loadedAnimalsframeWordsframe)
							loadAnimalsWords();
						if(!Task.loadedAnimalsframe)
							loadAnimals();
						try{
							console.log(Task.Frames[TaskName].length);
						}
						catch(e){
							stop_loading = false;
							drawLoading();
							console.log("getting Animals for the first time");
							socket.emit('getTask', {
								TaskName: TaskName
							})
							socket.on('getTask', function(data){
								//Animals = data.Content;
								Task.Frames[TaskName] = data.Content;
							})
						}
						
						checkloaded.Animals(TaskName, N);
						try{
							size_btn = setWordHeight();
							if(frametype1 == "Wordsframe" && frametype2 == "frame")
								size_btn = 70;
						}
						catch(e) {
							size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
						}
						drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn, size_btn);
						
						break;
					case 'Find the animal':
						Mode.Findtheanimal = true;
						Mode.Training = true;
						frametype2 = "Wordsframe";
						frametype1 = "frame";
			
						if(!Task.loadedAnimalsframeWordsframe)
							loadAnimalsWords();
						if(!Task.loadedAnimalsframe)
							loadAnimals();
						try{
							console.log(Task.Frames[TaskName].length);
						}
						catch(e){
							stop_loading = false;
							drawLoading();
							console.log("getting Animals for the first time", TaskName);
							socket.emit('getTask', {
								TaskName: TaskName
							})
							socket.on('getTask', function(data){
								Task.Frames[TaskName] = data.Content;
								console.log("get Task emit", Task.Frames[TaskName]);
							})
						}
						
						checkloaded.Animals(TaskName, N);							
						try{
							size_btn = setWordHeight();
							if(frametype1 == "Wordsframe" && frametype2 == "frame")
								size_btn = 70;
						}
						catch(e) {
							size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
						}
						drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn, size_btn);
						
						break;
					case 'Name numbers from 0 to 9':
						Mode.Training = true;
						frametype2 = "Wordsframe";
						frametype1 = "frame";
						if(!Task["loaded" +TopicName + "frameWordsframe"])
							loadNumbersWords();
						if(!Task["loaded" +TopicName + "frame"])
							loadNumbers();
						try{
							console.log(Task.Frames[TaskName].length);
						}
						catch(e){
							stop_loading = false;
							drawLoading();
							console.log("getting Animals for the first time", TaskName);
							socket.emit('getTask', {
								TaskName: TaskName
							})
							socket.on('getTask', function(data){
								Task.Frames[TaskName] = data.Content;
								console.log("get Task emit", Task.Frames[TaskName]);
							})
						}
						
						checkloaded.Numbers(TaskName, N);							
						try{
							size_btn = setWordHeight();
							if(frametype1 == "Wordsframe" && frametype2 == "frame")
								size_btn = 70;
						}
						catch(e) {
							size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
						}
						drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn, size_btn);
						
						break;
						case 'Find numbers from 0 to 9':
							Mode.Training = true;
							frametype1 = "Wordsframe";
							frametype2 = "frame";
							if(!Task["loaded" +TopicName + "frameWordsframe"])
								loadNumbersWords();
							if(!Task["loaded" +TopicName + "frame"])
								loadNumbers();
							try{
								console.log(Task.Frames[TaskName].length);
							}
							catch(e){
								stop_loading = false;
								drawLoading();
								console.log("getting Animals for the first time", TaskName);
								socket.emit('getTask', {
									TaskName: TaskName
								})
								socket.on('getTask', function(data){
									Task.Frames[TaskName] = data.Content;
									console.log("get Task emit", Task.Frames[TaskName]);
								})
							}
							
							checkloaded.Numbers(TaskName, N);							
							try{
								size_btn = setWordHeight();
								if(frametype1 == "Wordsframe" && frametype2 == "frame")
									size_btn = 70;
							}
							catch(e) {
								size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
							}
							drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn, size_btn);
							
						break;
				}
			}
			
			//AlphabetSong play button has been clicked
			//pause button has been clicked
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
			pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			
			if (Mode.Alphabetsong && !Mode.SignIn && !Mode.LogIn && mouseInRect(pX + 20, pY + size_btn + 10, size_btn, size_btn)) {
				video.pause()
			}
			//play button has been clicked
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
			pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			
			if (Mode.Alphabetsong && !Mode.SignIn && !Mode.LogIn && mouseInRect(pX + 20, pY, size_btn, size_btn)) {
				video.play()
			}
			//stop button has been clicked
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
			pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			if (Mode.Alphabetsong && !Mode.SignIn && !Mode.LogIn && mouseInRect(pX + 20, pY + size_btn + 10 + size_btn + 10, size_btn, size_btn)) {
				console.log("stop button has been clicked")
				console.log(video.currentTime);
				video.load();
			}
			
			//restart button has been clicked
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
			pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			if (Mode.Alphabetsong && !Mode.SignIn && !Mode.LogIn && mouseInRect(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)) {
				ctx.clearRect(0, 0.2 * Screen.height, Screen.width, 0.6 * Screen.height)
				video.load()
				video.play()
			}
			//exit button has been clicked
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
			pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			if (Mode.Alphabetsong && !Mode.SignIn && !Mode.LogIn && mouseInRect(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)) {
				console.log("exit")
				Mode.MenuItem = true;
				Mode.Exercise = false;
				//Mode.Alphabetsong = false;
				Mode[Task.TaskName.replace(/\s/g,'')] = false;
					
				video.load()
				ctx.clearRect(0, 0.2 * Screen.height, Screen.width, 0.6 * Screen.height)
				MenuItem.clicked = -1;
				MenuItem.chosen = MenuItem.clicked;
				initMenu();
				delete mouseX
				delete mouseY
				if(Profile.LoggedIn) {
					Task.Result.Finish = new Date();
					socket.emit("Result", {Result: Task.Result});
				}
				Task.Result = {};
			}
			
			//task has been clicked
			if(Mode.Tasks) {
				var j = MenuItem.clicked;
				var i = 0;
				console.log("Task.itemsCount[j]", Task.itemsCount[j])
					
				while (i < Task.display)  {
					var pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
					var pY =  MenuItem.topSpace;
					var t_a_width = 100*0.5;
					var t_a_height = 0.5*100*226/152;
					//console.log("Task.firstTask", Task.firstTask, "i", i, "j", j);
					//fillRect(pX, (pY + (55/368*MenuItem.size + 10) * i + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size);
					console.log("Task.itemsCount[j]", Task.itemsCount[j])
					if(mouseInRect(pX, (pY + (55/368*MenuItem.size + 10) * i + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)){
						console.log(i, "task was clicked");
						Mode.Exercise = true;
						console.log("Mode.Exercise", Mode.Exercise);
						clearRect(0, MenuItem.starts, Screen.width/ Math.min(Screen.k_width, Screen.k_height), 0.8 * Screen.height / Math.min(Screen.k_width, Screen.k_height))
						Mode.Tasks = false;
						Mode.MenuItem = false;
						//console.log(Properties.Tasks);
						showTask(Properties.Tasks[j][i].Name, Properties.Tasks[j][i].Topic_Name, Properties.Tasks[j][i].Max_point, Properties.Tasks[j][i].N_toTest);						
						i  = Task.display + 1;
					}
					else {
						i++;
					}
				}
			}
			//MatchTheAnimalsWithTheirNames exit button has been clicked
			if(Mode.Results || (Mode.Exercise && !Mode.Alphabetsong)) {
				try{
					size_btn = setWordHeight();
					if(frametype1 == "Wordsframe" && frametype2 == "frame")
						size_btn = 70;
				}
				catch(e) {
					size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
				}
			}
			if (Mode.Exercise && !Mode.SignIn && !Mode.LogIn && mouseInRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn, size_btn)) {
				console.log("exit")
				Mode.MenuItem = true;
				Mode.Exercise = false;
				//Mode.Matchtheanimalswiththeirnames = false;
				Mode[Task.TaskName.replace(/\s/g,'')] = false;
				ctx.clearRect(0, 0.2 * Screen.height, Screen.width, 0.6 * Screen.height)
				MenuItem.clicked = -1;
				MenuItem.chosen = MenuItem.clicked;
				initMenu();
				delete Task.Result.time;
				
				
				if(Profile.LoggedIn){
					socket.emit("Result", {Result: Task.Result});
					
				}
				Task.Result = {};
			}
			//MatchTheAnimalsWithTheirNames word has been clicked
			if ((!Mode.CountDown && !Mode.Results && Mode.Exercise && !Mode.Alphabetsong) && !Mode.SignIn && !Mode.LogIn) {
				console.log("MatchTheAnimalsWithTheirNames word has been clicked");
				Array = [];
				var edge = 0;
				var top, center, animal_height;
				if(frametype1 == "frame") {
					animal_height = Screen.height / Math.min(Screen.k_width, Screen.k_height) / 4;
					top = Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 40 + animal_height + 40;
					center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / 2;
				}
				else if(frametype1 == "Wordsframe") {
					center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / Math.floor((Task.test.length + 1) / 2);
					top = Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 40 + animal_height + 40;
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
				if((Mode.Exercise && !Mode.Alphabetsong) &&k3 != -1) {
					drawHeader();
					ctx.clearRect(0, 0.2 * Screen.height, Screen.width, Screen.height);
					
					if(mouseInRect((Screen.width / Math.min(Screen.k_width, Screen.k_height) - Task.asked[frametype1].w*animal_height/Task.asked[frametype1].h) / 2, Screen.height * 0.2/ Math.min(Screen.k_width, Screen.k_height) + (20 + 20), Task.asked[frametype1].w*animal_height/Task.asked[frametype1].h, animal_height)) {
						Task.tries--;
						//console.log("checking the answer");
						var correct = checkAnswer(k3);
						if(correct){
							if(Task.TopicName != "Numbers")
								speak("a " + Task.test[k3].Word);
							else
								speak(Task.test[k3].Word);
							//console.log("correct answer");
							var frame = Properties.Buttons["correct.png"];
							var word_height = setWordHeight();
							var word_width = word_height * frame.w / frame.h;
							
							drawCorrect((Screen.width / Math.min(Screen.k_width, Screen.k_height) - word_width) / 2, 0.2*Screen.height / Math.min(Screen.k_width, Screen.k_height) - word_height - 20, word_width, word_height);
								
							Task.toTest.splice(Task.toTest.indexOf((Task.test.concat())[k3]), 1);
							if(!Mode.Training && Task.Result.Answers.length) {
								time = Date.now();
								Task.Result.Answers.push({Word: Task.test[k3].Word, Attempts: 4 - Task.tries, Time: (time - Task.Result.time) / 1000});
								Task.Result.time = time;
								console.log(Task.Result.Answers[0]);
							}
							else if(!Mode.Training) {
								Task.Result.time = Date.now();
								Task.Result.Answers.push({Word: Task.test[k3].Word, Attempts: 4 - Task.tries, Time: (Task.Result.time - Task.Result.Start) / 1000});
							}
							k3 = -1;
							selectAnimal();
							
							delete Pressed.x;
							delete Pressed.y;
							console.log("drawn");
							setTimeout(function(){
								drawHeader();
							}, 500)
						}
						else {
							console.log("wrong answer");
							var frame = Properties.Buttons["wrong.png"];
							var word_height = 3 /2 * setWordHeight();
							var word_width = word_height * frame.w / frame.h;
							drawWrong((Screen.width / Math.min(Screen.k_width, Screen.k_height) - word_width) / 2, 0.2*Screen.height / Math.min(Screen.k_width, Screen.k_height) - word_height - 20, word_width, word_height);
							
							console.log("answer", k3);
							k3 = -1;
							delete Pressed.x;
							delete Pressed.y;
							if(Task.tries) {
								console.log("is it here");
			
								drawTestAnimals();
							}
							else {
								console.log("not asking again", Task.toTest.splice(Task.toTest.indexOf(Task.asked), 1)[0]);
								if(Task.TopicName != "Numbers")
									speak("a " + Task.asked.Word);
								else
									speak(Task.asked.Word);
								Task.Result.time = Date.now();
								setTimeout(function(){
									selectAnimal();
								}, 800)
							}
							setTimeout(function(){
								drawHeader();
							}, 500)
						}
					}
					else {
						k3 = -1;
						delete Pressed.x;
						delete Pressed.y;
						console.log("here");
						drawTestAnimals();
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
					console.log("or here");
					if(Mode[Task.TaskName])
						drawTestAnimals();	
					
				}				
			}
			if(Mode.Results || (Mode.Exercise && !Mode.Alphabetsong)) {
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
				
				if (Mode.Results && !Mode.SignIn && !Mode.LogIn && mouseInRect(Result_form.x + 20 * Result_form.w / frame.w, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w, btn_width, btn_height)) {
					Task.Result = {};
					Mode[Task.TaskName.replace(/\s/g,'')] = true;
					Mode.Results = false;
					showTask(Task.TaskName, Task.TopicName);
					Task.Result = {};
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
					console.log("exit")
					Mode.MenuItem = true;
					Mode.Exercise = false;
					Mode.Results = false;
					Task.Result = {};
					Mode[Task.TaskName.replace(/\s/g,'')] = false;
					
					
					ctx.clearRect(0, 0.2 * Screen.height, Screen.width, 0.6 * Screen.height)
					MenuItem.clicked = -1;
					MenuItem.chosen = MenuItem.clicked;
					initMenu();
				}
				//skip has been clicked
				var size_btn = setWordHeight();
				if(frametype1 == "Wordsframe" && frametype2 == "frame")
						size_btn = 70;
				var frame = Properties.Buttons["skip.png"];
				
				if (Mode.Training && (Mode.Exercise && !Mode.Alphabetsong) && !Mode.SignIn && !Mode.LogIn && mouseInRect(Title.leftSpace + 20, Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn * frame.w / frame.h,size_btn)) {
					Mode.CountDown = true;
					Mode.Training = false;
					console.log("skipping training");
					Mode[Task.TaskName.replace(/\s/g,'')] = false;
						clearRect(0,0,Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height));
						drawHeader();
						console.log(Mode.Matchtheanimalswiththeirnames, Task.TaskName.replace(/\s/g,''), Task.loadedNumbers);
						var digit_frame = Properties.Numbers["1.png"];
						console.log(digit_frame);
						var digit = {};
						digit.h = 300;
						digit.w = digit.h * digit_frame.w / digit_frame.h;
						console.log("hello");
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
			
			if((Mode.MenuItem || Mode.Tasks) && Profile.LoggedIn && mouseInRect(((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace) + Profile.size_btn * 1/ 6, 20, Profile.size_btn * 2/3, Profile.size_btn * 2/ 3)) {
				console.log("clicked profile pic");
				socket.emit("Logout", {});
				socket.on("Logout", function(data){
					if(data.res) {
						Profile.LoggedIn = false;
						respondCanvas();
					}
				})
			}
			
		}
		MainCanvas.addEventListener("mousedown", MouseDown);
		MainCanvas.addEventListener("touchstart", MouseDown);
		function MouseDown(mouseEvent){
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
				
			}
			if ((Mode.Exercise && !Mode.Alphabetsong) && !Mode.SignIn && !Mode.LogIn) {
				var Array = [];
				var edge = 0;
				var top, center, animal_height;
				if(frametype1 == "frame") {
					animal_height = Screen.height / Math.min(Screen.k_width, Screen.k_height) / 4;
					center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / 2;
					top = Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 40 + animal_height + 40;
				}
				else if(frametype1 == "Wordsframe") {
					animal_height = 100;
					center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / Math.floor((Task.test.length + 1) / 2);
					top = Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + 40 + animal_height + 40;
					
				}
				var word_height = setWordHeight();
				console.log("mouse down");
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
					console.log(TopforTap, edgeforTap);
					if(frametype1 == "frame") {
						if(i % 2){
							top = top + word_height + 30;
							edge = 0;
						}
						else edge = center;
					}
					else if(frametype1 == "Wordsframe") {
						console.log("Wordsframe");
						if(!((i + 1) % Math.floor((Task.test.length + 1) / 2))){
						top = top + word_height + 20;
						edge = 0;
						}
						else { 
							edge = edge + center;
						}
					}
				}
				//console.log("Task.toTest", Task.toTest, Task.toTest.length);
					
				var i = checkPoint({x:mouseX, y:mouseY}, Array);
				console.log("3658", i);
				if(i < Array.length) {
					k3 = i;
					console.log("k3 = ", k3);
						
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
						console.log("k3 = ", k3);
						drawTestAnimals();
						top = TopforTap;
						edge = edgeforTap;
						var wordFrame = (Task.test.concat())[k3][frametype2];
						//ctx.drawImage(atlas.AnimalsWordsframe, wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[k3]).x*Math.min(Screen.k_width, Screen.k_height), (Array[k3].y)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].w)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].h)*Math.min(Screen.k_width, Screen.k_height));
						ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[k3]).x*Math.min(Screen.k_width, Screen.k_height), (Array[k3].y)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].w)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].h)*Math.min(Screen.k_width, Screen.k_height));
						ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[k3] - 6).x*Math.min(Screen.k_width, Screen.k_height), (Array[k3].y)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].w)*Math.min(Screen.k_width, Screen.k_height), (Array[k3].h)*Math.min(Screen.k_width, Screen.k_height));
						console.log(wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h);
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
					
					console.log("mouseup");
					delete Pressed.x;
					delete Pressed.y;
				}
			}
		}
	var loading = new Image();
	var stop_loading = false;
	loading.loadedLoading;
	function loadLoading(){
		loading.src = '/img/Loading/loading.png';
		loading.addEventListener("load", function() {
			loading.loadedLoading = true;
			console.log("loaded loading image");
		})
	}
	function drawLoading(){
		if(!stop_loading) {
			console.log("drawLoading");
			ctx.clearRect(Screen.width / 2 - 48*Math.min(Screen.k_width, Screen.k_height), Screen.height / 2 - 48*Math.min(Screen.k_width, Screen.k_height), 48*Math.min(Screen.k_width, Screen.k_height), 48*Math.min(Screen.k_width, Screen.k_height));
			ctx.drawImage(loading, current * 48, 0, 48, 48, Screen.width / 2 - 48*Math.min(Screen.k_width, Screen.k_height), Screen.height / 2 - 48*Math.min(Screen.k_width, Screen.k_height), 48*Math.min(Screen.k_width, Screen.k_height), 48*Math.min(Screen.k_width, Screen.k_height));
			//console.log(current, current * 48);
			if(current < 16)
				current++;
			else
				current = 0;
			//console.log(current, current * 48);
			setTimeout(function(){
				drawLoading();
			}, 200);
		}
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
		console.log(data);
		Profile.UserName = data.user.UserName;
		Profile.Password = data.user.Password;
		Profile.Accent = data.user.Accent;
		Profile.LoggedIn = true;
	})
	function displayMenu() {
		try{
			var frame = Properties.Buttons["left-arrow.png"];
			if(Properties.Tasks.length && Properties.Topics.length) {
				console.log("respondCanvas");
				console.log("Profile", Profile.UserName, Profile.Password);
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
			console.log("getting data", data);

			Properties.Topics = data.topics;
			Properties.Tasks = data.tasks;
			Properties.Buttons = data.buttons;
			Properties.Forms = data.forms;
			Properties.Numbers = data.numbers;
			Properties.Letters = data.letters;
			console.log(Properties.Letters);
			current = 0;
			drawLoading();
			var l_a_x = MenuItem.leftSpace;
			var l_a_width = 100*koef;
			var l_a_height = koef*100*226/152;
			var l_a_y =  MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2;
			
			var r_a_height = koef*100*226/152;
			var r_a_y =  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2;
			var r_a_width = koef*100;
			var r_a_x = MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width;
			
			//loadButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height);
			console.log("drawLoading");
			displayMenu();
			
				
			
		})
	}
	getProperties();
	
	
});
})();
