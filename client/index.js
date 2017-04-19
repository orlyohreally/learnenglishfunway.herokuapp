(function(){
	$(document).ready(function(){
		var functions = require('./functions.js');
		var Display = require('./display.js');
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
		Mode.CountDown = false;
		Mode.Mobile = false;
		MenuItem.height = 600;
		MenuItem.width = 1800;
		MenuItem.display = 2;
		MenuItem.firstItem = 0;
		MenuItem.size = 100;
		MenuItem.ItemList = {};
		MenuItem.clicked = -1;
		MenuItem.chosen = MenuItem.clicked;
		var Error = {};
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
		var Progress = {};
		var Badges = {};
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
		flags = [ "american_flag.png", "australian_flag.png", "british_flag.png"];
		var flag = flags[2];
		
		
		
		
		function respondCanvas(){ 
			ctx.clearRect(0,0,100000,10000);
			MenuItem.display = 2;
			MenuItem.itemsCount = 5;
			MenuItem.size = 100;
			if(document.getElementById("UserName")) {
				Profile.UserName = document.getElementById('UserName').value;
				Profile.Password = document.getElementById('Password').value;
				$("#UserName").remove();
				$("#Password").remove();
				$("inputdiv").remove();
			}
			var c = $('#MainCanvas');
			if(document.getElementById("MenuCanvas"))
				c = $('#MenuCanvas');
			else if(document.getElementById("ProgressCanvas"))
				c = $('#ProgressCanvas');
			else if(document.getElementById("SettingsCanvas"))
				c = $('#SettingsCanvas');
			else if(document.getElementById("BadgesCanvas"))
				c = $('#BadgesCanvas');
			else if(document.getElementById("MessageCanvas"))
				c = $('#MessageCanvas');
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
			ctx.clearRect(0, 0, Screen.width, Screen.height);
			if(Mode.Menu)
				Menu_ctx.clearRect(0, 0, Screen.width, Screen.height);
			
			//white space starts
			if(Screen.width < 482 || Screen.height < 482) {
				//console.log("small screen", Screen.width, Screen.height);
				Mode.Mobile = true;
				MenuItem.starts = 50 / Math.min(Screen.k_width, Screen.k_height);
				MenuItem.ends = Screen.height / Math.min(Screen.k_width, Screen.k_height);
			}
			else {
				//console.log("normal screen");
				Mode.Mobile = false;
				if(Mode.Menu) {
					Mode.MenuItem = true;
					Mode.Menu = false;
					$("#MenuCanvas").remove();
					respondCanvas();
				}
				Mode.Menu = false;
				MenuItem.starts = 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height);
				MenuItem.ends = 0.8 * Screen.height / Math.min(Screen.k_width, Screen.k_height);
			}
			var A = 0, B = 0;
			MenuItem.rheight = MenuItem.ends - MenuItem.starts;
			//if(Screen.width >= Screen.height || !Mode.Mobile) {
			//выравнивание по вертикали
				koef = 0.75;
				B = (MenuItem.ends - MenuItem.starts) - 2 * 40;
				//выравнивание по горизонтали 
				A = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - 2 * 40 - 2 * koef*100 - (MenuItem.display - 1) * 68) / (MenuItem.display);
				console.log(Screen.width, ">=", Screen.height, "1111");
				
			//}
			/*else {
				
				koef = 1.25;
				A = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - 2 * 20)/ (MenuItem.display);
				//выравнивание по горизонтали 
				B = (MenuItem.ends - MenuItem.starts - 2 * 20 - 2 * koef*100 - (MenuItem.display - 1) * 40) / (MenuItem.display);
				console.log(Screen.width, "<", Screen.height);				
			}*/
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
			//if(Screen.width >= Screen.height || !Mode.Mobile) {
			MenuItem.topSpace = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
			MenuItem.leftSpace = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - MenuItem.display * MenuItem.size - (MenuItem.display - 1) * 68 - 2 * 100*koef - 10) / 4;
			
			if(!Math.floor(2 * MenuItem.topSpace / MenuItem.size) > 0 && Math.floor(2 * MenuItem.leftSpace / MenuItem.size) > 0) {
				MenuItem.display = MenuItem.display + Math.floor( 2 * MenuItem.leftSpace / MenuItem.size);
				if(MenuItem.display > MenuItem.itemsCount) {
					MenuItem.display = MenuItem.itemsCount;
				}
				MenuItem.leftSpace = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - MenuItem.display * MenuItem.size - (MenuItem.display - 1) * 68 - 2 * 100*koef - 10) / 4;
			
			}
			//}
			/*else
			{
				MenuItem.display = Math.floor((MenuItem.ends - MenuItem.starts - 2 * 20) / MenuItem.size);
				MenuItem.topSpace = MenuItem.starts + 20 + 100 * koef;
				MenuItem.leftSpace = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size - 2 * 20) / 2;
			
			}*/
			if(MenuItem.firstItem + MenuItem.display > MenuItem.itemsCount) {
				MenuItem.firstItem = MenuItem.itemsCount - MenuItem.display;
			}
			t_a_width = 100*0.5;
			Task.topSpace = (MenuItem.size - 2 * t_a_width - (Task.display) * (55/368*MenuItem.size + 10) + 10) / 2;
			
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
		
		
		k1 = -1;
		function drawBadge(i){
			document.getElementById("Loading").style.visibility = "hidden";
			var frame = Badges.All[i].Frame;
			var name = Badges.All[i].Name;
			Badges_ctx.drawImage(atlasRewards, frame.x, frame.y, frame.w, frame.h, Display.getBadge(name).x * Math.min(Screen.k_width, Screen.k_height), Display.getBadge(name).y * Math.min(Screen.k_width, Screen.k_height), Display.getBadge(name).w * Math.min(Screen.k_width, Screen.k_height), Display.getBadge(name).h * Math.min(Screen.k_width, Screen.k_height));
			console.log("recieved", Badges.All[i].Recieved);
			if(Badges.All[i].Recieved == undefined || !Badges.All[i].Recieved) {
				var frame = Properties.Buttons['lock.png'];
				drawLock(Display.getBadge(name).x + (Display.getBadge(name).w - frame.w / frame.h * Display.getBadge(name).h / 4), Display.getBadge(name).y, frame.w / frame.h * Display.getBadge(name).h / 4, Display.getBadge(name).h / 4);
			}
		}
		function DrawMenuItem(j){
			var frame = Properties.Topics[j].Frame;
			ctx.drawImage(atlasMenuItem, frame.x, frame.y, frame.w, frame.h, Display.getTopic(j).x * Math.min(Screen.k_width, Screen.k_height), Display.getTopic(j).y * Math.min(Screen.k_width, Screen.k_height), Display.getTopic(j).w * Math.min(Screen.k_width, Screen.k_height), Display.getTopic(j).h * Math.min(Screen.k_width, Screen.k_height));
			if(!Properties.Tasks[j].length) {
				var frame = Properties.Buttons['lock.png'];
				drawLock(Display.getTopic(j).x + (Display.getTopic(j).w - frame.w / frame.h * Display.getTopic(j).h / 4) / 2, Display.getTopic(j).y + (Display.getTopic(j).h - Display.getTopic(j).h / 4) / 2, frame.w / frame.h * Display.getTopic(j).h / 4, Display.getTopic(j).h / 4);
			}
		}
		var atlasMenuItem = new Image();
		function drawMenuItems(){
			console.log("drawing menu items");
			try{
				var j = 0; //порядок в спрайте
				if(MenuItem.firstItem != undefined)
					j = MenuItem.firstItem;
				clearRect(Display.getButton("left-arrow.png").x + Display.getButton("left-arrow.png").w, MenuItem.starts, Display.getButton("right-arrow.png").x - Display.getButton("left-arrow.png").w - Display.getButton("left-arrow.png").x, MenuItem.ends - MenuItem.starts);
				while(j < MenuItem.firstItem + MenuItem.display){
						var pX, pY;
						//if(Screen.width >= Screen.height || !Mode.Mobile) {
							pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
							pY =  MenuItem.topSpace;
							
						//}
						/*else
						{
							pX = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
							console.log(pX);
							if(j > 0)
								pY = Display.getTopic(j - 1).y + Display.getTopic(j - 1).h + 20;
							else
								pY = MenuItem.topSpace;
						}*/
						var pW = MenuItem.size;
						var pH = MenuItem.size;
						Display.setTopic(j, pX, pY, pW, pH);
					if(j != MenuItem.clicked - MenuItem.firstItem){
						DrawMenuItem(j);
					}
					j = j + 1;
				}
				document.getElementById("Loading").style.visibility = "hidden";
			
			}
			catch(e){};
			//clearRectRect(Display.getButton("left-arrow.png"));
			//clearRectRect(Display.getButton("right-arrow.png"));
		}
		MenuItem.loadedMenuItems;
		function loadMenuItems(){
			console.log("loadedMenuItems");
			atlasMenuItem.src = '/img/Menu-Items/menu-items.png';
			atlasMenuItem.addEventListener("load", function() {
				MenuItem.loadedMenuItems = true;
				//drawMenuItems();
			})
		}
		var atlasRewards = new Image();
		Badges.loadedRewards;
		function loadBadges(){
			console.log("loadedBadges");
			atlasRewards.src = '/img/Rewards/rewards.png';
			atlasRewards.addEventListener("load", function() {
				Badges.loadedRewards = true;
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
		var atlasCapitalLetters = new Image();
		Task.loadedCapitalLetters;
		function loadCapitalLetters(){
			atlasCapitalLetters.src = '/img/Alphabet/capital_letters.png';
			atlasCapitalLetters.addEventListener("load", function() {
				Task.loadedCapitalLetters = true;
			})
		}
		function clearMenuItemRect(x, y, width, height) {
			ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height) , width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));
		}
		function clearScreenRect(x, y, width, height) {
			if(!Mode.Menu)
				ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height) , width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));
			else
				Menu_ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height) , width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));
		}
		
		function drawLeftArrow() {
			var frame = Properties.Buttons["left-arrow.png"];
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else
				context = ctx;
			
			context.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("left-arrow.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("left-arrow.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("left-arrow.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("left-arrow.png").h * Math.min(Screen.k_width, Screen.k_height));
			
			
		}

		function drawRightArrow(){
			var frame = Properties.Buttons["right-arrow.png"];
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else
				context = ctx;
			context.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("right-arrow.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("right-arrow.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("right-arrow.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("right-arrow.png").h * Math.min(Screen.k_width, Screen.k_height));		
			
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
		function drawTitle(){
			var frame;
			if(!Mode.Mobile)
				frame = Properties.Buttons["title.png"];
			else
				var frame = Properties.Buttons["title_in_line.png"];
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Settings)
				context = Settings_ctx;
			else if(Mode.Message)
				context = Message_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else if(!Mode.Menu)
				context = ctx;
			else
				context = Menu_ctx;
			context.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("title.png").x * Math.min(Screen.k_width, Screen.k_height) , Display.getButton("title.png").y * Math.min(Screen.k_width, Screen.k_height) , Display.getButton("title.png").w * Math.min(Screen.k_width, Screen.k_height) , Display.getButton("title.png").h * Math.min(Screen.k_width, Screen.k_height) );			
			
		}
		function drawLock(x, y, width, height) {
			var frame = Properties.Buttons["lock.png"];
			if(Mode.Badges)
				context = Badges_ctx;
			else
				context = ctx;
			context.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));
		}
		function drawMenuButton() {
			console.log("drawing menu button");
			var frame = Properties.Buttons["menu_btn.png"];
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Settings)
				context = Settings_ctx;
			else if(Mode.Message)
				context = Message_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else if(Mode.Menu)
				context = Menu_ctx;
			else
				context = ctx;
			context.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("menu_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("menu_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("menu_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("menu_btn.png").h * Math.min(Screen.k_width, Screen.k_height));
		}
		function drawRewardsButton(){
			var frame = Properties.Buttons["rewards_btn.png"];
			if(!Mode.Menu)
				ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("rewards_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("rewards_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("rewards_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("rewards_btn.png").h * Math.min(Screen.k_width, Screen.k_height));
			else
				Menu_ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("rewards_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("rewards_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("rewards_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("rewards_btn.png").h * Math.min(Screen.k_width, Screen.k_height));
		}
		function drawProgressButton(){
			var frame = Properties.Buttons["progress_btn.png"];
			if(!Mode.Menu)
				ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("progress_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("progress_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("progress_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("progress_btn.png").h * Math.min(Screen.k_width, Screen.k_height));
			else
				Menu_ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("progress_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("progress_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("progress_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("progress_btn.png").h * Math.min(Screen.k_width, Screen.k_height));
		}
		function drawPhrasesButton(){
			var frame = Properties.Buttons["phrase_of_the_day_btn.png"];
			if(!Mode.Menu)
				ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("phrase_of_the_day_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("phrase_of_the_day_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("phrase_of_the_day_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("phrase_of_the_day_btn.png").h * Math.min(Screen.k_width, Screen.k_height));
			else
				Menu_ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("phrase_of_the_day_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("phrase_of_the_day_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("phrase_of_the_day_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("phrase_of_the_day_btn.png").h * Math.min(Screen.k_width, Screen.k_height));
		}
		function drawQuizButton(){
			var frame = Properties.Buttons["quiz_btn.png"];
			if(!Mode.Menu)
				ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("quiz_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("quiz_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("quiz_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("quiz_btn.png").h * Math.min(Screen.k_width, Screen.k_height));
			else
				Menu_ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("quiz_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("quiz_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("quiz_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("quiz_btn.png").h * Math.min(Screen.k_width, Screen.k_height));
		}
		function drawLogOutButton(){
			var frame = Properties.Forms["log_out_btn.png"];
			if(Mode.Settings)
				context = Settings_ctx;
			context.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, Display.getButton("log_out_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("log_out_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("log_out_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("log_out_btn.png").h * Math.min(Screen.k_width, Screen.k_height));
			console.log(frame.x, frame.y, frame.w, frame.h, Display.getButton("log_out_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("log_out_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("log_out_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("log_out_btn.png").h * Math.min(Screen.k_width, Screen.k_height));
			//console.log(context);
		}
		function drawLogInButton(){
			var frame = Properties.Buttons["login_btn.png"];
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Settings)
				context = Settings_ctx;
			else if(Mode.Message)
				context = Message_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else if(!Mode.Menu)
				context = ctx;
			else
				context = Menu_ctx;
			context.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("login_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("login_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("login_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("login_btn.png").h * Math.min(Screen.k_width, Screen.k_height));
			//context.fillRect(Display.getButton("login_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("login_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("login_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("login_btn.png").h * Math.min(Screen.k_width, Screen.k_height));
			
		}
		function drawSignInButton(){
			var frame = Properties.Buttons["sign_up_btn.png"];
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Settings)
				context = Settings_ctx;
			else if(Mode.Message)
				context = Message_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else if(!Mode.Menu)
				context = ctx;
			else
				context = Menu_ctx;
		context.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("sign_in_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("sign_in_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("sign_in_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("sign_in_btn.png").h * Math.min(Screen.k_width, Screen.k_height));
		}
		function drawSettingsButton(){
			var frame = Properties.Buttons["settings_btn.png"];
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Settings)
				context = Settings_ctx;
			else if(Mode.Message)
				context = Message_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else if(!Mode.Menu)
				context = ctx;
			context.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("setting_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("setting_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("setting_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("setting_btn.png").h * Math.min(Screen.k_width, Screen.k_height));
			
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
		function drawExitButton(){
			var frame = Properties.Buttons["exit_btn.png"];
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Settings)
				context = Settings_ctx;
			else if(Mode.Message)
				context = Message_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else if(!Mode.Menu)
				context = ctx;
			context.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("exit_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("exit_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("exit_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("exit_btn.png").h * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawRestartButton(x, y, width,height){
			var frame = Properties.Buttons["restart_btn.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawHelpButton(){
			var frame = Properties.Buttons["help_btn.png"];
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Settings)
				context = Settings_ctx;
			else if(Mode.Message)
				context = Message_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else if(!Mode.Menu)
				context = ctx;
			else
				context = Menu_ctx;
			context.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("help_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("help_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("help_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("help_btn.png").h * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawInfoButton(){
			var frame = Properties.Buttons["info_btn.png"];
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Settings)
				context = Settings_ctx;
			else if(Mode.Message)
				context = Message_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else if(!Mode.Menu)
				context = ctx;
			else
				context = Menu_ctx;
			context.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("info_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("info_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("info_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("info_btn.png").h * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawSignInForm() {
			console.log("drawing signin form");
			drawMenuItems();
			var frame = Properties.Forms["sign_in_form.png"];
			ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, Display.getForm("sign_in_form.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getForm("sign_in_form.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getForm("sign_in_form.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getForm("sign_in_form.png").h * Math.min(Screen.k_width, Screen.k_height));
		}
		function drawSettingsForm() {
			var frame = Properties.Forms["setting_form.png"];
			console.log(frame);
			console.log(frame.x, frame.y, frame.w, frame.h, Display.getForm("setting_form.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getForm("setting_form.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getForm("setting_form.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getForm("setting_form.png").h * Math.min(Screen.k_width, Screen.k_height));
			Settings_ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, Display.getForm("setting_form.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getForm("setting_form.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getForm("setting_form.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getForm("setting_form.png").h * Math.min(Screen.k_width, Screen.k_height));
		}
		function drawMessageForm(name) {
			var frame = Properties.Forms[name];
			console.log(frame);
			console.log(frame.x, frame.y, frame.w, frame.h, Display.getForm(name).x * Math.min(Screen.k_width, Screen.k_height), Display.getForm(name).y * Math.min(Screen.k_width, Screen.k_height), Display.getForm(name).w * Math.min(Screen.k_width, Screen.k_height), Display.getForm(name).h * Math.min(Screen.k_width, Screen.k_height));
			Message_ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, Display.getForm(name).x * Math.min(Screen.k_width, Screen.k_height), Display.getForm(name).y * Math.min(Screen.k_width, Screen.k_height), Display.getForm(name).w * Math.min(Screen.k_width, Screen.k_height), Display.getForm(name).h * Math.min(Screen.k_width, Screen.k_height));
		}
		function drawResultForm() {
			var frame = Properties.Forms["result_form.png"];
			ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, Display.getForm("result_form.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getForm("result_form.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getForm("result_form.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getForm("result_form.png").h * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawProgressForm(type) {
			var frame = Properties.Forms["progress_form_" + type + ".png"];
			Progress_ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, Display.getForm("progress_form_" + type + ".png").x * Math.min(Screen.k_width, Screen.k_height), Display.getForm("progress_form_" + type + ".png").y * Math.min(Screen.k_width, Screen.k_height), Display.getForm("progress_form_" + type + ".png").w * Math.min(Screen.k_width, Screen.k_height), Display.getForm("progress_form_" + type + ".png").h * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawOkayButton(x, y, width, height) {
			var frame = Properties.Forms["result_form_okay_btn.png"];
			//ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
			if(Mode.Message)
				context = Message_ctx;
			else
				context = ctx;
			context.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, Display.getButton("result_form_okay_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("result_form_okay_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("result_form_okay_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("result_form_okay_btn.png").h * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawResultTryAgainButton(x, y, width, height) {
			var frame = Properties.Forms["result_form_try_again_btn.png"];
			//ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
			ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, Display.getButton("result_form_try_again_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("result_form_try_again_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("result_form_try_again_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("result_form_try_again_btn.png").h * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawDigit(n, x, y, width, height, type = "") {
			try {console.log("n :", n, n!="/");
			if(type != "")
				type = type + "-";
			var frame;
			if(n != "/")
				frame = Properties.Numbers[type + n + ".png"];
			else
				frame = Properties.Letters[type + "slash.png"];
			//console.log("frame", frame);
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Settings)
				context = Settings_ctx;
			else if(Mode.Message)
				context = Message_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else if(!Mode.Menu)
				context = ctx;
			else
				context = Menu_ctx;
			if(n != "/")
				context.drawImage(atlas.Numbersframe, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
			else {
				//console.log("slash");
				console.log(Task.loadedLetters);
				context.drawImage(atlasLetters, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
			}
			}
			catch(e){}
		}
		function drawLetter(n, x, y, width, height, type = "") {
			if(type != "")
				type = type + "-";
			console.log(type + n + ".png");
			var frame = Properties.Letters[type + n + ".png"];
			//use this
			//height = width / frame.w * frame.h;
			//console.log("type.substring(0, type.length - 8)", type.substring(0, 8), type);
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Settings)
				context = Settings_ctx;
			else if(Mode.Message)
				context = Message_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else if(!Mode.Menu)
				context = ctx;
			else
				context = Menu_ctx;
			if(type.substring(0, 8) != "capital-"){
				if(n == "-") {
					y = y + height / 4;
					height = height / 2;
					
				}
				context.drawImage(atlasLetters, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
			}
			else {
				//console.log(n, frame);
				context.drawImage(atlasCapitalLetters, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
			}
		}
		function drawLogInForm(x, y, width, height) {
			var frame = Properties.Forms["log_in_form.png"];
			ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawLogInCancelButton(x, y, width, height) {
			var frame = Properties.Forms["log_in_form_cancel_btn.png"];
			var button = Display.getButton("log_in_form_cancel_btn_ch.png");
			ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, button.x * Math.min(Screen.k_width, Screen.k_height), button.y * Math.min(Screen.k_width, Screen.k_height), button.w * Math.min(Screen.k_width, Screen.k_height), button.h * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawLogInLogInButton() {
			var frame = Properties.Forms["log_in_form_login_btn.png"];
			var button = Display.getButton("log_in_form_login_btn.png");
			ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, button.x * Math.min(Screen.k_width, Screen.k_height), button.y * Math.min(Screen.k_width, Screen.k_height), button.w * Math.min(Screen.k_width, Screen.k_height), button.h * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawSignInSignInButton() {
			var frame = Properties.Forms["sign_in_form_signin_btn.png"];
			ctx.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, Display.getButton("sign_in_form_signin_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("sign_in_form_signin_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("sign_in_form_signin_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("sign_in_form_signin_btn.png").h * Math.min(Screen.k_width, Screen.k_height));
		}
		function drawSaveButton() {
			var frame = Properties.Forms["sign_in_form_save_btn.png"];
			if(Mode.Settings)
				context = Settings_ctx;
			context.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, Display.getButton("save_btn.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("save_btn.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("save_btn.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("save_btn.png").h * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawSignInCancelButton() {
			var frame = Properties.Forms["sign_in_form_cancel_btn.png"];
			if(Mode.Settings)
				context = Settings_ctx;
			else
				context = ctx;
			context.drawImage(atlasForms, frame.x, frame.y, frame.w, frame.h, Display.getButton("sign_in_form_cancel_btn_ch.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("sign_in_form_cancel_btn_ch.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("sign_in_form_cancel_btn_ch.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("sign_in_form_cancel_btn_ch.png").h * Math.min(Screen.k_width, Screen.k_height));
		}
		function drawStarBoard(type) {
			var frame = Properties.Buttons["star-board.png"];
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Settings)
				context = Settings_ctx;
			else if(Mode.Message)
				context = Message_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else if(!Mode.Menu)
				context = ctx;
			else
				context = Menu_ctx;
			context.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("star-board" + type + ".png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("star-board" + type + ".png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("star-board" + type + ".png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("star-board" + type + ".png").h * Math.min(Screen.k_width, Screen.k_height));
			//console.log(Profile, Profile.Points, Profile.Max_points);
			ctx.fillStyle = "#000000";
			if(type == "Stars"){
				//fillRect(Display.getButton("star-board" + type + ".png").x, Display.getButton("star-board" + type + ".png").y + 25 / frame.h * Display.getButton("star-board" + type + ".png").h, 1000, 10);
				//fillRect(Display.getButton("star-board" + type + ".png").x, Display.getButton("star-board" + type + ".png").y + Display.getButton("star-board" + type + ".png").h - 25 / frame.h * Display.getButton("star-board" + type + ".png").h, 1000, 10);
				//fillRect(Display.getButton("star-board" + type + ".png").x + 25 / frame.w * Display.getButton("star-board" + type + ".png").w, 0, 10, 1000);
				//fillRect(Display.getButton("star-board" + type + ".png").x + Display.getButton("star-board" + type + ".png").w - 25 / frame.w * Display.getButton("star-board" + type + ".png").w, 0, 10, 1000);
				
				
				//stars
				var stars = Math.round(5 * Profile.Points / Profile.Max_points);
				if(!Profile.Max_points)
					stars = 0;
				var star_frame = Properties.Buttons["star.png"];
				console.log(stars);
				var star = {}
				star.h = Display.getButton("star-board" + type + ".png").h - 50 / frame.h * Display.getButton("star-board" + type + ".png").h;
				star.w = star.h * star_frame.w / star_frame.h;
				console.log(5 * star.w , Display.getButton("star-board" + type + ".png").w - 50 / frame.w * Display.getButton("star-board" + type + ".png").w);
				if(5 * star.w > Display.getButton("star-board" + type + ".png").w - 50 / frame.w * Display.getButton("star-board" + type + ".png").w) {
					star.w = (Display.getButton("star-board" + type + ".png").w  - 50 / frame.w * Display.getButton("star-board" + type + ".png").w )/ 5;
					star.h = star.w * star_frame.h / star_frame.w;
				}
				star.y = Display.getButton("star-board" + type + ".png").y + (Display.getButton("star-board" + type + ".png").h - star.h) / 2;
				for(var j = 0; j < stars; j++)
					drawStar(Display.getButton("star-board" + type + ".png").x + 25 / frame.w * Display.getButton("star-board" + type + ".png").w + j * star.w,star.y, star.w, star.h);
				for(var j = 0; j < 5 - stars; j++)
					drawDarkStar(Display.getButton("star-board" + type + ".png").x + 25 / frame.w * Display.getButton("star-board" + type + ".png").w + (stars + j) * star.w, star.y, star.w, star.h);
				
			}
			else {
				//fillRect(Display.getButton("star-board" + type + ".png").x, Display.getButton("star-board" + type + ".png").y + Display.getButton("star-board" + type + ".png").h - 25 / frame.h * Display.getButton("star-board" + type + ".png").h, 1000, 10);
				//fillRect(Display.getButton("star-board" + type + ".png").x + 25 / frame.w * Display.getButton("star-board" + type + ".png").w, 0, 10, 1000);
				//fillRect(Display.getButton("star-board" + type + ".png").x + Display.getButton("star-board" + type + ".png").w - 25 / frame.w * Display.getButton("star-board" + type + ".png").w, 0, 10, 1000);
				var digit_frame = Properties.Numbers["small-dark-5.png"];
				//points
				Points = Profile.Points + "/" + Profile.Max_points;
				digit = {};
				digit.h = Display.getButton("star-board" + type + ".png").h - 50 / frame.h * Display.getButton("star-board" + type + ".png").h;
				digit.w = digit.h * digit_frame.w / digit_frame.h;
				if(Points.length * digit.w > Display.getButton("star-board" + type + ".png").w - 50 / frame.w * Display.getButton("star-board" + type + ".png").w) {
					digit.w = (Display.getButton("star-board" + type + ".png").w  - 50 / frame.w * Display.getButton("star-board" + type + ".png").w )/ Points.length;
					digit.h = digit.w * digit_frame.h / digit_frame.w;
				}
				digit.y = Display.getButton("star-board" + type + ".png").y + (Display.getButton("star-board" + type + ".png").h - digit.h) / 2;
				digit.x = Display.getButton("star-board" + type + ".png").x + (Display.getButton("star-board" + type + ".png").w - Points.length * digit.w) / 2;
				for(var j = 0; j < Points.length; j++)
					//drawDigit(Points[j], Display.getButton("star-board" + type + ".png").x + 25 / frame.w * Display.getButton("star-board" + type + ".png").w + j * digit.w, digit.y, digit.w, digit.h, "small-dark");
					drawDigit(Points[j], digit.x + j * digit.w, digit.y, digit.w, digit.h, "small-dark");
			}
		}
		function drawAvatar(name) {
			var frame = Properties.Buttons[name];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton(name).x * Math.min(Screen.k_width, Screen.k_height), Display.getButton(name).y * Math.min(Screen.k_width, Screen.k_height), Display.getButton(name).w * Math.min(Screen.k_width, Screen.k_height), Display.getButton(name).h * Math.min(Screen.k_width, Screen.k_height))
			
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
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Settings)
				context = Settings_ctx;
			else if(Mode.Message)
				context = Message_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else if(!Mode.Menu)
				context = ctx;
			else
				context = Menu_ctx;
			context.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawStar(x, y, width, height) {
			var frame = Properties.Buttons["star.png"];
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Settings)
				context = Settings_ctx;
			else if(Mode.Message)
				context = Message_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else if(!Mode.Menu)
				context = ctx;
			else
				context = Menu_ctx;
			context.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
			
		}
		function drawTap(x, y, width, height) {
			var frame = Properties.Buttons["tap.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawDrag(x, y, width, height) {
			var frame = Properties.Buttons["drag-flick.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));
		}
		function drawHold(x, y, width, height) {
			var frame = Properties.Buttons["touch-and-hold.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));
		}
		function drawSkip() {
			var frame = Properties.Buttons["skip.png"];
			ctx.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton("skip.png").x * Math.min(Screen.k_width, Screen.k_height), Display.getButton("skip.png").y * Math.min(Screen.k_width, Screen.k_height), Display.getButton("skip.png").w * Math.min(Screen.k_width, Screen.k_height), Display.getButton("skip.png").h * Math.min(Screen.k_width, Screen.k_height));
		}
		function fillRect(x, y, width, height) {
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Settings)
				context = Settings_ctx;
			else if(Mode.Message)
				context = Message_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else if(Mode.Menu)
				context = Menu_ctx;
			else
				context = ctx;
			context.fillRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));
		}
		function clearRect(x, y, width, height) {
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Settings)
				context = Settings_ctx;
			else if(Mode.Message)
				context = Message_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else if(Mode.Menu)
				context = Menu_ctx;
			else
				context = ctx;
			context.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));
		}
		function clearRectRect(rect) {
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Settings)
				context = Settings_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else if(Mode.Message)
				context = Message_ctx;
			else if(Mode.Menu)
				context = Menu_ctx;
			else
				context = ctx;
			context.clearRect(rect.x * Math.min(Screen.k_width, Screen.k_height), rect.y * Math.min(Screen.k_width, Screen.k_height), rect.w * Math.min(Screen.k_width, Screen.k_height), rect.h * Math.min(Screen.k_width, Screen.k_height))
			
		}
		function clearRectRectYellow(rect) {
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Settings)
				context = Settings_ctx;
			else if(Mode.Message)
				context = Message_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else if(!Mode.Menu)
				context = ctx;
			else
				context = Menu_ctx;
			
			if(!Mode.Menu || (rect == Display.getButton("menu_btn.png") && rect.x == Display.getButton("menu_btn.png").x && rect.y == Display.getButton("menu_btn.png").y && rect.w == Display.getButton("menu_btn.png").w && rect.h == Display.getButton("menu_btn.png").h)) {
				context.fillStyle="#F7FE2E";
				context.fillRect(rect.x * Math.min(Screen.k_width, Screen.k_height), rect.y * Math.min(Screen.k_width, Screen.k_height), rect.w * Math.min(Screen.k_width, Screen.k_height), rect.h * Math.min(Screen.k_width, Screen.k_height))
			}
			else
				context.clearRect(rect.x * Math.min(Screen.k_width, Screen.k_height), rect.y * Math.min(Screen.k_width, Screen.k_height), rect.w * Math.min(Screen.k_width, Screen.k_height), rect.h * Math.min(Screen.k_width, Screen.k_height))
			
			
		}
		function fillRectYellow(x, y, width, height) {
			ctx.fillStyle="#F7FE2E";
			if(Mode.Progress)
				context = Progress_ctx;
			else if(Mode.Settings)
				context = Settings_ctx;
			else if(Mode.Message)
				context = Message_ctx;
			else if(Mode.Badges)
				context = Badges_ctx;
			else if(!Mode.Menu)
				context = ctx;
			else
				context = Menu_ctx;
			context.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
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
			console.log(Profile.Accent, Word);
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
		var atlasButtons = new Image();

		var loadedButtons;
		function loadButtons(/*l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height*/){
			atlasButtons.src = '/img/Menu-Items/buttons.png';
			atlasButtons.addEventListener("load", function() {
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
			//title
				if(!Mode.Mobile) {
					
				}
			if(!Mode.Mobile) {
				//title
				Display.setButton("title.png", Title.leftSpace, 20, Title.size, Title.size*130/470);
				if(!Mode.Exercise && !Mode.Progress && !Mode.Settings && !Mode.Message && !Mode.Badges) {
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
					drawQuizButton();
				}
				if(!Profile.LoggedIn) {
					//Log in button
					Display.setButton("login_btn.png", (Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
					drawLogInButton();
					//Sign in button
					Display.setButton("sign_in_btn.png", (Screen.width )/ Math.min(Screen.k_width, Screen.k_height) -  Profile.size_btn - Title.leftSpace, (20 + 5) + Profile.size_btn*75/228, Profile.size_btn, Profile.size_btn*75/228);
					drawSignInButton();
				}
				else {
					
					Display.setButton("star-boardPoints.png", (Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
					drawStarBoard("Points");
					Display.setButton("star-boardStars.png", (Screen.width )/ Math.min(Screen.k_width, Screen.k_height) -  Profile.size_btn - Title.leftSpace, (20 + 5) + Profile.size_btn*75/228, Profile.size_btn, Profile.size_btn*75/228);
					drawStarBoard("Stars");
				}
				
				//Settings button
				Display.setButton("setting_btn.png", (Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				drawSettingsButton();
				//Help button
				Display.setButton("help_btn.png", (Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2 * 5) / 3, (Profile.size_btn - 2 * 5) / 3);
				drawHelpButton();
				//Info button
				Display.setButton("info_btn.png", (Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - Title.leftSpace + 5 + (Profile.size_btn - 2 * 5)/3 + (Profile.size_btn - 2 * 5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				drawInfoButton();
			}
			else {
				var frame = Properties.Buttons["menu_btn.png"];
				var MenuFrame = {};
				MenuFrame.x = Title.leftSpace;
				MenuFrame.y = 20;
				MenuFrame.h = MenuItem.starts - 2 * 20;
				ctx.fillStyle = "#000000";
				MenuFrame.w = frame.w / frame.h * MenuFrame.h;
				Display.setButton("menu_btn.png", MenuFrame.x, MenuFrame.y, MenuFrame.w, MenuFrame.h);
				drawMenuButton();
				var frame = Properties.Buttons["title_in_line.png"];
				Titleframe = {};
				Titleframe.x = Display.getButton("menu_btn.png").x + Display.getButton("menu_btn.png").w + 20;
				Titleframe.w = Screen.width / Math.min(Screen.k_width, Screen.k_height) - 2 * Display.getButton("menu_btn.png").w - 5 * 20;
				Titleframe.h = Titleframe.w * frame.h / frame.w;
				if(Titleframe.h > MenuItem.starts) {
					Titleframe.h = Display.getButton("menu_btn.png").h;
					Titleframe.w = Titleframe.h * frame.w / frame.h;
				}
				Titleframe.y = (MenuItem.starts - Titleframe.h) / 2;
				Display.setButton("title.png", Titleframe.x, Titleframe.y, Titleframe.w, Titleframe.h);
				
			}
			if(Mode.Menu) {
				if(Screen.width < Screen.height) {
					//login button
					var login_frame = Properties.Buttons["login_btn.png"];
					var login_button_frame = {};
					login_button_frame.y = MenuItem.starts + 20;
					login_button_frame.h = (MenuItem.ends - MenuItem.starts - 8 * 20) / 7;
					login_button_frame.w = login_frame.w / login_frame.h * login_button_frame.h;
					if(login_button_frame.w + 2 * 20 > Screen.width / Math.min(Screen.k_width, Screen.k_height)) {
						login_button_frame.w = Screen.width / Math.min(Screen.k_width, Screen.k_height) - 2 * 20;
						login_button_frame.h = login_frame.h / login_frame.w * login_button_frame.w;
					}
					login_button_frame.x = 20 + (Screen.width / Math.min(Screen.k_width, Screen.k_height) - login_button_frame.w - 2* 20) / 2;
					//sigin button
					var sign_in_frame = Properties.Buttons["sign_in_btn.png"];
					var sign_in_button_frame = {};
					sign_in_button_frame.x = login_button_frame.x;
					sign_in_button_frame.y = login_button_frame.y + login_button_frame.h + 20;
					sign_in_button_frame.w = login_button_frame.w;
					sign_in_button_frame.h = login_button_frame.h;
					//settings button
					var settings_frame = Properties.Buttons["settings_btn.png"];
					var settings_button_frame = {};
					settings_button_frame.x = sign_in_button_frame.x;
					//if(!Profile.LoggedIn)
						settings_button_frame.y = sign_in_button_frame.y + sign_in_button_frame.h + 20;
					//else
					//	settings_button_frame.y = MenuItem.starts + 20;
					settings_button_frame.w = (sign_in_button_frame.w - 2 * 20) / 3;
					settings_button_frame.h = settings_frame.h / settings_frame.w * settings_button_frame.w;
					//help button
					var help_frame = Properties.Buttons["help_btn.png"];
					var help_button_frame = {};
					help_button_frame.x = settings_button_frame.x + settings_button_frame.w + 20;
					help_button_frame.y = settings_button_frame.y;
					help_button_frame.h = settings_button_frame.h;
					help_button_frame.w = settings_button_frame.w;
					//info button
					var info_frame = Properties.Buttons["info_btn.png"];
					var info_button_frame = {};
					info_button_frame.x = help_button_frame.x + help_button_frame.w + 20;
					info_button_frame.y = help_button_frame.y;
					info_button_frame.h = help_button_frame.h;
					info_button_frame.w = help_button_frame.w;
					//rewards button
					var rewards_frame = Properties.Buttons["rewards_btn.png"];
					var rewards_button_frame = {};
					rewards_button_frame.x = login_button_frame.x;
					rewards_button_frame.y = settings_button_frame.y + settings_button_frame.h + 20;
					rewards_button_frame.w = login_button_frame.w;
					rewards_button_frame.h = settings_button_frame.h;
					//progress button
					var progress_frame = Properties.Buttons["rewards_btn.png"];
					var progress_button_frame = {};
					progress_button_frame.x = rewards_button_frame.x;
					progress_button_frame.y = rewards_button_frame.y + rewards_button_frame.h + 20;
					progress_button_frame.w = rewards_button_frame.w;
					progress_button_frame.h = rewards_button_frame.h;
					//phrase button
					var phrase_frame = Properties.Buttons["phrase_of_the_day_btn.png"];
					var phrase_button_frame = {};
					phrase_button_frame.x = progress_button_frame.x;
					phrase_button_frame.y = progress_button_frame.y + progress_button_frame.h + 20;
					phrase_button_frame.w = progress_button_frame.w;
					phrase_button_frame.h = progress_button_frame.h;
					//quiz button
					var quiz_frame = Properties.Buttons["quiz_btn.png"];
					var quiz_button_frame = {};
					quiz_button_frame.x = phrase_button_frame.x;
					quiz_button_frame.y = phrase_button_frame.y + phrase_button_frame.h + 20;
					quiz_button_frame.w = phrase_button_frame.w;
					quiz_button_frame.h = phrase_button_frame.h;
				}
				else {
					//login button
					var login_frame = Properties.Buttons["login_btn.png"];
					var login_button_frame = {};
					login_button_frame.y = MenuItem.starts + 20;
					login_button_frame.h = (MenuItem.ends - MenuItem.starts - 3 * 20) / 2;
					login_button_frame.w = login_frame.w / login_frame.h * login_button_frame.h;
					if(3 * login_button_frame.w + 4 * 20 > Screen.width / Math.min(Screen.k_width, Screen.k_height)) {
						login_button_frame.w = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - 4 * 20) / 3;
						login_button_frame.h = login_frame.h / login_frame.w * login_button_frame.w;
					}
					login_button_frame.x = 20 + (Screen.width / Math.min(Screen.k_width, Screen.k_height) - 3 * login_button_frame.w - 4 * 20) / 2;
					//sigin button
					var sign_in_frame = Properties.Buttons["sign_in_btn.png"];
					var sign_in_button_frame = {};
					sign_in_button_frame.x = login_button_frame.x + 20 + login_button_frame.w;
					sign_in_button_frame.y = login_button_frame.y;
					sign_in_button_frame.w = login_button_frame.w;
					sign_in_button_frame.h = login_button_frame.h;
					//settings button
					var settings_frame = Properties.Buttons["settings_btn.png"];
					var settings_button_frame = {};
					settings_button_frame.x = sign_in_button_frame.x + 20 + sign_in_button_frame.w;
					if(!Profile.LoggedIn)
						settings_button_frame.y = sign_in_button_frame.y;
					else
						settings_button_frame.y = MenuItem.starts + 20;
					settings_button_frame.w = (sign_in_button_frame.w - 2 * 20) / 3;
					settings_button_frame.h = settings_frame.h / settings_frame.w * settings_button_frame.w;
					//help button
					var help_frame = Properties.Buttons["help_btn.png"];
					var help_button_frame = {};
					help_button_frame.x = settings_button_frame.x + settings_button_frame.w + 20;
					help_button_frame.y = settings_button_frame.y;
					help_button_frame.h = settings_button_frame.h;
					help_button_frame.w = settings_button_frame.w;
					//info button
					var info_frame = Properties.Buttons["info_btn.png"];
					var info_button_frame = {};
					info_button_frame.x = help_button_frame.x + help_button_frame.w + 20;
					info_button_frame.y = help_button_frame.y;
					info_button_frame.h = help_button_frame.h;
					info_button_frame.w = help_button_frame.w;
					//rewards button
					var rewards_frame = Properties.Buttons["rewards_btn.png"];
					var rewards_button_frame = {};
					rewards_button_frame.h = (MenuItem.ends - MenuItem.starts - 3 * 20) / 2;
					rewards_button_frame.w = rewards_frame.w / rewards_frame.h * rewards_button_frame.h;
					if(4 * rewards_button_frame.w + 5 * 20 > Screen.width / Math.min(Screen.k_width, Screen.k_height)) {
						rewards_button_frame.w = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - 5 * 20) / 4;
						rewards_button_frame.h = login_frame.h / login_frame.w * login_button_frame.w;
					}
					rewards_button_frame.x = 20 + (Screen.width / Math.min(Screen.k_width, Screen.k_height) - 4 * rewards_button_frame.w - 5 * 20) / 2;
					rewards_button_frame.y = MenuItem.starts + 20 + login_button_frame.h + 20;
					//progress button
					var progress_frame = Properties.Buttons["rewards_btn.png"];
					var progress_button_frame = {};
					progress_button_frame.x = rewards_button_frame.x + rewards_button_frame.w + 20;
					progress_button_frame.y = rewards_button_frame.y;
					progress_button_frame.w = rewards_button_frame.w;
					progress_button_frame.h = rewards_button_frame.h;
					//phrase button
					var phrase_frame = Properties.Buttons["phrase_of_the_day_btn.png"];
					var phrase_button_frame = {};
					phrase_button_frame.x = progress_button_frame.x + progress_button_frame.w + 20;
					phrase_button_frame.y = progress_button_frame.y;
					phrase_button_frame.w = progress_button_frame.w;
					phrase_button_frame.h = progress_button_frame.h;
					//quiz button
					var quiz_frame = Properties.Buttons["quiz_btn.png"];
					var quiz_button_frame = {};
					quiz_button_frame.x = phrase_button_frame.x + phrase_button_frame.w + 20;
					quiz_button_frame.y = phrase_button_frame.y;
					quiz_button_frame.w = phrase_button_frame.w;
					quiz_button_frame.h = phrase_button_frame.h;
				}
				Display.setButton("login_btn.png", login_button_frame.x, login_button_frame.y, login_button_frame.w, login_button_frame.h);
				
				Display.setButton("star-boardPoints.png", login_button_frame.x, login_button_frame.y, login_button_frame.w, login_button_frame.h);
				
				Display.setButton("sign_in_btn.png", sign_in_button_frame.x, sign_in_button_frame.y, sign_in_button_frame.w, sign_in_button_frame.h);
				Display.setButton("star-boardStars.png", sign_in_button_frame.x, sign_in_button_frame.y, sign_in_button_frame.w, sign_in_button_frame.h);
				Display.setButton("setting_btn.png", settings_button_frame.x, settings_button_frame.y, settings_button_frame.w, settings_button_frame.h);
				Display.setButton("help_btn.png", help_button_frame.x, help_button_frame.y, help_button_frame.w, help_button_frame.h);
				Display.setButton("info_btn.png", info_button_frame.x, info_button_frame.y, info_button_frame.w, info_button_frame.h);
				Display.setButton("rewards_btn.png", rewards_button_frame.x, rewards_button_frame.y, rewards_button_frame.w, rewards_button_frame.h);
				Display.setButton("progress_btn.png", progress_button_frame.x, progress_button_frame.y, progress_button_frame.w, progress_button_frame.h);
				Display.setButton("phrase_of_the_day_btn.png", phrase_button_frame.x, phrase_button_frame.y, phrase_button_frame.w, phrase_button_frame.h);
				Display.setButton("quiz_btn.png", quiz_button_frame.x, quiz_button_frame.y, quiz_button_frame.w, quiz_button_frame.h);
				if(!Profile.LoggedIn) {
					drawLogInButton();
					drawSignInButton();
				}
				else {
					drawStarBoard("Points");
					drawStarBoard("Stars");
				
				}
				drawSettingsButton();
				drawHelpButton();
				drawInfoButton();
				drawRewardsButton();
				drawProgressButton();
				drawPhrasesButton();
				drawQuizButton();
				
			}
			
			drawTitle();
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
			}
			else {
				loadButtons();
				setTimeout(function(){
					checkLoadButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height);
				}, 10);
			}
		}
		function drawHeader() {
			ctx.fillStyle="#F7FE2E";
			if(Mode.Progress)
				Progress_ctx.fillStyle="#F7FE2E";
			else if(Mode.Settings)
				Settings_ctx.fillStyle="#F7FE2E";
			else if(Mode.Badges)
				Badges_ctx.fillStyle="#F7FE2E";
			else if(Mode.Menu)
				Menu_ctx.fillStyle="#F7FE2E";
			
			if(document.getElementById("MenuCanvas"))
				Menu_ctx.fillStyle="#F7FE2E";
			//yellow stripes
			fillRect(0, 0, Screen.width / Math.min(Screen.k_width, Screen.k_height), MenuItem.starts);
			if(!Mode.Exercise && !Mode.Mobile && !Mode.Progress && !Mode.Settings && !Mode.Message && !Mode.Badges)
				fillRect(0, MenuItem.ends, Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.ends);
			
			
			var l_a_width = 100*koef;
			var l_a_height = koef*100*226/152;
			var r_a_height = koef*100*226/152;
			var r_a_width = koef*100;
			var l_a_x, l_a_y,r_a_y, r_a_x;
			//if(Screen.width >= Screen.height || !Mode.Mobile) {
				l_a_x = MenuItem.leftSpace;
				l_a_y =  MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2;
				
				r_a_y =  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2;
				r_a_x = MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width;
			//}
			/*else
			{
				l_a_x = (Screen.width / Math.min(Screen.k_width, Screen.k_height)- l_a_width ) / 2;
				l_a_y =  (MenuItem.topSpace + MenuItem.starts) / 2;
				
				r_a_y =  MenuItem.ends + MenuItem.topSpace - MenuItem.starts;
				r_a_x = (Screen.width / Math.min(Screen.k_width, Screen.k_height)- l_a_width ) / 2;
				
			}*/
			checkLoadButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height);
			
		}
		function initMenu() {
			if(!Mode.Menu) {
				if(!Mode.Exercise) {
					drawHeader();
					if(!Mode.Settings && !Mode.Message && !Mode.Badges) {
						if(MenuItem.loadedMenuItems) {
							drawMenuItems();
						}
						else {
							loadMenuItems();
							drawMenuItems();
						}
						if(MenuItem.clicked > -1) {
							MenuItemClicked(MenuItem.clicked);
						}
					}
				}
				else {
					if(Mode.Exercise && !Mode.MusicVideo && !Mode.Results) {
						document.getElementById("Loading").style.visibility = "hidden";
						drawHeader();
						setItemsProp();
					}
					else if(!Mode.MusicVideo){
						document.getElementById("Loading").style.visibility = "hidden";
						drawHeader();
						showResultForm(Task.Result.Answers, Task.Total, Task.MaxPoint);
					}
					
					if(Mode.MusicVideo) {
						drawHeader();
						var size_btn = 70;
						//drawExitButton();
						//displayVideo();
						PlaySong();
					}
				}
			}
			else {
				clearScreenRect(0, 0, (Screen.width)/ Math.min(Screen.k_width, Screen.k_height), (Screen.height)/ Math.min(Screen.k_width, Screen.k_height));
				drawHeader();
			}
			
			if(Mode.Progress) {
				showProgress();
			}
			else if(Mode.Badges)
				setBadgesFormProp();
			else if(Mode.Settings) {
				$("inputdiv").remove();
				$("#oldPassword").remove();
				$("#newPassword").remove();
				showSettingsForm();
			}
			else if(Mode.Message) {
				console.log("here", Error);
				showMessageForm(Error.Name + ".png");
			}
			loadForms();
			loadNumbers();
			loadLetters();
			loadCapitalLetters();
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
		function checkPosProgress(mouseEvent){
			event.preventDefault();
			var ProgressCanvas = document.getElementById("ProgressCanvas");
			try {
				var touch = mouseEvent.changedTouches[0];
				var rect = ProgressCanvas.getBoundingClientRect();
				var scaleX = ProgressCanvas.width / rect.width;
				var scaleY = ProgressCanvas.height / rect.height;
				mouseX = (touch.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
				mouseY = (touch.clientY - rect.top) * scaleY;
			}
			catch(e) {
			var rect = ProgressCanvas.getBoundingClientRect(),
				scaleX = ProgressCanvas.width / rect.width;
				scaleY = ProgressCanvas.height / rect.height;
				mouseX = (mouseEvent.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
				mouseY = (mouseEvent.clientY - rect.top) * scaleY;
				
			}
			HoverMenuItem(mouseX, mouseY);
		}
		function checkPosBadges(mouseEvent){
			event.preventDefault();
			var BadgesCanvas = document.getElementById("BadgesCanvas");
			try {
				var touch = mouseEvent.changedTouches[0];
				var rect = BadgesCanvas.getBoundingClientRect();
				var scaleX = BadgesCanvas.width / rect.width;
				var scaleY = BadgesCanvas.height / rect.height;
				mouseX = (touch.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
				mouseY = (touch.clientY - rect.top) * scaleY;
			}
			catch(e) {
			var rect = BadgesCanvas.getBoundingClientRect(),
				scaleX = BadgesCanvas.width / rect.width;
				scaleY = BadgesCanvas.height / rect.height;
				mouseX = (mouseEvent.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
				mouseY = (mouseEvent.clientY - rect.top) * scaleY;
				
			}
			HoverMenuItem(mouseX, mouseY);
		}
		function checkPosMessage(mouseEvent){
			event.preventDefault();
			var MessageCanvas = document.getElementById("MessageCanvas");
			try {
				var touch = mouseEvent.changedTouches[0];
				var rect = MessageCanvas.getBoundingClientRect();
				var scaleX = MessageCanvas.width / rect.width;
				var scaleY = MessageCanvas.height / rect.height;
				mouseX = (touch.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
				mouseY = (touch.clientY - rect.top) * scaleY;
			}
			catch(e) {
			var rect = MessageCanvas.getBoundingClientRect(),
				scaleX = MessageCanvas.width / rect.width;
				scaleY = MessageCanvas.height / rect.height;
				mouseX = (mouseEvent.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
				mouseY = (mouseEvent.clientY - rect.top) * scaleY;
				
			}
			HoverMenuItem(mouseX, mouseY);
		}
		function checkPosSettings(mouseEvent){
			event.preventDefault();
			var SettingsCanvas = document.getElementById("SettingsCanvas");
			try {
				var touch = mouseEvent.changedTouches[0];
				var rect = SettingsCanvas.getBoundingClientRect();
				var scaleX = SettingsCanvas.width / rect.width;
				var scaleY = SettingsCanvas.height / rect.height;
				mouseX = (touch.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
				mouseY = (touch.clientY - rect.top) * scaleY;
			}
			catch(e) {
			var rect = SettingsCanvas.getBoundingClientRect(),
				scaleX = SettingsCanvas.width / rect.width;
				scaleY = SettingsCanvas.height / rect.height;
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
		var k4 = -1; //hovering what badge
		var Pressed = {}; //for coordinates of clicked point
		var l_a_ch = false;
		var r_a_ch = false;
		var login_ch = false;
		var signin_ch = false;
		var rewards_ch = false;
		var progress_ch = false;
		var phrases_ch = false;
		var quiz_ch = false;
		var settings_ch = false;
		var help_ch = false;
		var task_ch = false;
		var b_a_ch = false;
		var t_a_ch = false;
		var info_ch = false;
		var log_in_btn = false;
		var info_ch = false;
		var sign_in_btn = false;
		var cancel_btn_ch = false;
		var save_btn_ch = false;
		var log_out_btn_ch = false;
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
			if((Mode.MenuItem && MenuItem.firstItem > 0) || (Mode.Progress && Progress.index) || (Mode.Badges && Badges.firstItem)) {
				if (!(l_a_ch) && mouseInRect(Display.getButton("left-arrow.png"))) {	
					clearRectRect(Display.getButton("left-arrow.png"));
					Display.expandButton("left-arrow.png", 5);
					drawLeftArrow();
					l_a_ch = true;
				}
				else if ((l_a_ch) && !(mouseInRect(Display.getButton("left-arrow.png")))) {	
					clearRectRect(Display.getButton("left-arrow.png"));
					Display.expandButton("left-arrow.png", -5);
					drawLeftArrow();
					l_a_ch = false;
				}
			}
			//right arrow is hovered
			if((Mode.MenuItem && (MenuItem.firstItem + MenuItem.display < MenuItem.itemsCount)) || (Mode.Progress && Progress.Array.length > Progress.index + 1) || (Mode.Badges && Badges.All.length >= Badges.firstItem + Badges.display + 1)){
				if (!(r_a_ch) && (mouseInRect(Display.getButton("right-arrow.png")))) {	
					clearRectRect(Display.getButton("right-arrow.png"));
					Display.expandButton("right-arrow.png", 5);
					drawRightArrow();
					r_a_ch = true;
				}
				else if ((r_a_ch) && !(mouseInRect(Display.getButton("right-arrow.png")))) {
					clearRectRect(Display.getButton("right-arrow.png"));
					Display.expandButton("right-arrow.png", -5);
					drawRightArrow();
					r_a_ch = false;
				}
			}
			// menu tasks has been hovered
			if(Mode.Tasks && (MenuItem.clicked > -1)) {
				i = 0;
				while (i < Task.display) {
					if(k1 == -1 && !(task_ch) && mouseInRect(Display.getTask(MenuItem.clicked, Task.firstTask + i))){
						if(Properties.Tasks[MenuItem.clicked][Task.firstTask + i].Content) {
							clearRectRect(Display.getTask(MenuItem.clicked, Task.firstTask + i));
							Display.expandTask(MenuItem.clicked, Task.firstTask + i, 3);
							drawTask(MenuItem.clicked, Task.firstTask + i, Display.getTask(MenuItem.clicked, Task.firstTask + i).x, Display.getTask(MenuItem.clicked, Task.firstTask + i).y, Display.getTask(MenuItem.clicked, Task.firstTask + i).w, Display.getTask(MenuItem.clicked, Task.firstTask + i).h);
							k1 = i;
							task_ch = true;
							document.getElementById("Explaining").style.height = 3*Display.getTask(MenuItem.clicked, i + Task.firstTask).h * Math.min(Screen.k_width, Screen.k_height);
							document.getElementById("Explaining").style.width = 3*Display.getTask(MenuItem.clicked, i + Task.firstTask).h * 612 / 468 * Math.min(Screen.k_width, Screen.k_height);
							//fillRect(0, Display.getTask(MenuItem.clicked, i + Task.firstTask).y - 3*Display.getTask(MenuItem.clicked, i + Task.firstTask).h/2, 10000, 3*Display.getTask(MenuItem.clicked, i + Task.firstTask).h/2);
							document.getElementById("Explaining").style.top = (Display.getTask(MenuItem.clicked, i + Task.firstTask).y + Display.getTask(MenuItem.clicked, i + Task.firstTask).h/2 - 3*Display.getTask(MenuItem.clicked, i + Task.firstTask).h/2) * Math.min(Screen.k_width, Screen.k_height);
							if((Display.getTask(MenuItem.clicked, i + Task.firstTask).x - 3*Display.getTask(MenuItem.clicked, i + Task.firstTask).h * 612 / 468) * Math.min(Screen.k_width, Screen.k_height) > 0) {
								document.getElementById("Explaining").style.left = (Display.getTask(MenuItem.clicked, i + Task.firstTask).x - 3*Display.getTask(MenuItem.clicked, i + Task.firstTask).h * 612 / 468) * Math.min(Screen.k_width, Screen.k_height);
								document.getElementById("Explaining").src = "img/" + Properties.Tasks[MenuItem.clicked][i + Task.firstTask].Topic_Name + "/right " + Properties.Tasks[MenuItem.clicked][i + Task.firstTask].Name + " gif.gif";
							}
							else {
								document.getElementById("Explaining").style.left = (Display.getTask(MenuItem.clicked, i + Task.firstTask).x + Display.getTask(MenuItem.clicked, i + Task.firstTask).w) * Math.min(Screen.k_width, Screen.k_height)
								document.getElementById("Explaining").src = "img/" + Properties.Tasks[MenuItem.clicked][i + Task.firstTask].Topic_Name + "/left " + Properties.Tasks[MenuItem.clicked][i + Task.firstTask].Name + " gif.gif";								
							}
							document.getElementById("Explaining").style.visibility = "visible";
							
						}
						i = Task.display + 1;
					}
					else{
						i = i + 1;
					}
				}
				if((Mode.Tasks && (MenuItem.clicked > -1) && k1 > -1 && !(mouseInRect(Display.getTask(MenuItem.clicked, Task.firstTask + k1))))){
					document.getElementById("Explaining").style.visibility = "hidden";
					clearRectRect(Display.getTask(MenuItem.clicked, Task.firstTask + k1));
					Display.expandTask(MenuItem.clicked, Task.firstTask + k1, -3);
					drawTask(MenuItem.clicked, Task.firstTask + k1, Display.getTask(MenuItem.clicked, Task.firstTask + k1).x, Display.getTask(MenuItem.clicked, Task.firstTask + k1).y, Display.getTask(MenuItem.clicked, Task.firstTask + k1).w, Display.getTask(MenuItem.clicked, Task.firstTask + k1).h);
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
					else if((b_a_ch) && !(mouseInRect(Display.getButton("bottom-arrow")))){
						b_a_ch = false;
						clearRectRect(Display.getButton("bottom-arrow"));
						Display.expandButton("bottom-arrow.png", -5);
						Display.expandButton("bottom-arrow", -5);
						drawBottomArrow();
					}
					
				}
			}
			//Menu item hovered
			var i = 0;
			while (Mode.MenuItem && (i < MenuItem.display)) {
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
			
			if(k4 == -1 && Mode.Badges && mouseInRect({x:0, y: MenuItem.starts, w: Screen.width / Math.min(Screen.k_width, Screen.k_height), h: Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.starts})){
				var i = Badges.firstItem;
				while(i < Badges.display + Badges.firstItem) {
					if(mouseInRect(Display.getBadge(Badges.All[i].Name))) {
						k4 = i;
						i = Badges.display  + Badges.firstItem + 1;
						clearRectRect(Display.getBadge(Badges.All[k4].Name));
						Display.expandBadge(Badges.All[k4].Name, 10);
						drawBadge(k4);
					}
					else
						i++;
				}
			}
			if(k4 != -1 && Mode.Badges && !mouseInRect(Display.getBadge(Badges.All[k4].Name))){
				clearRectRect(Display.getBadge(Badges.All[k4].Name));
				Display.expandBadge(Badges.All[k4].Name, -10);
				drawBadge(k4);
				k4 = -1;
			}
			
			//Login button hovered
			if (((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.Exercise && !Profile.LoggedIn && !Mode.LogIn && !Mode.SignIn &&!login_ch && mouseInRect(Display.getButton("login_btn.png"))) {
				clearRectRectYellow(Display.getButton("login_btn.png"));
				var n = 2;
				if(Mode.Menu)
					n = 10;
				Display.expandButton("login_btn.png", n);
				drawLogInButton();
				login_ch = true;
			}
			else if(((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.Exercise && !Profile.LoggedIn && !Mode.LogIn && !Mode.SignIn &&login_ch && !(mouseInRect(Display.getButton("login_btn.png")))) {
				if(!Profile.LoggedIn) {
					clearRectRectYellow(Display.getButton("login_btn.png"));
					var n = 2;
					if(Mode.Menu)
						n = 10;
					Display.expandButton("login_btn.png", -n);
					drawLogInButton();
					login_ch = false;
				}
			}
			//Sign in button hovered
			if (((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.Exercise && !Profile.LoggedIn && !Mode.LogIn && !Mode.SignIn && !signin_ch && mouseInRect(Display.getButton("sign_in_btn.png"))) {
				clearRectRectYellow(Display.getButton("sign_in_btn.png"));
				var n = 2;
				if(Mode.Menu)
					n = 10;
				Display.expandButton("sign_in_btn.png", n);
				drawSignInButton();
				signin_ch = true;
			}
			else if(((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.Exercise && !Profile.LoggedIn && !Mode.LogIn && !Mode.SignIn &&signin_ch && !(mouseInRect(Display.getButton("sign_in_btn.png")))) {
				clearRectRectYellow(Display.getButton("sign_in_btn.png"));
				var n = 2;
				if(Mode.Menu)
					n = 10;
				Display.expandButton("sign_in_btn.png", -n);
				drawSignInButton();
				signin_ch = false;
			}
			//rewards button
			if (((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&!rewards_ch && mouseInRect(Display.getButton("rewards_btn.png"))) {
				clearRectRectYellow(Display.getButton("rewards_btn.png"));
				var n = 5;
				if(Mode.Menu)
					n = 10;
				Display.expandButton("rewards_btn.png", n);
				drawRewardsButton();
				rewards_ch = true;
			}
			else if(((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&rewards_ch && !(mouseInRect(Display.getButton("rewards_btn.png")))) {
				clearRectRectYellow(Display.getButton("rewards_btn.png"));
				var n = 5;
				if(Mode.Menu)
					n = 10;
				Display.expandButton("rewards_btn.png", -n);
				drawRewardsButton();
				rewards_ch = false;
			}
			//Progress button hovered
			if (((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&!progress_ch && mouseInRect(Display.getButton("progress_btn.png"))) {
				clearRectRectYellow(Display.getButton("progress_btn.png"));
				var n = 5;
				if(Mode.Menu)
					n = 10;
				Display.expandButton("progress_btn.png", n);
				drawProgressButton();
				progress_ch = true;
			}
			else if(((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&progress_ch && !(mouseInRect(Display.getButton("progress_btn.png")))) {
				clearRectRectYellow(Display.getButton("progress_btn.png"));
				var n = 5;
				if(Mode.Menu)
					n = 10;
				Display.expandButton("progress_btn.png", -n);
				drawProgressButton();
				progress_ch = false;
			}
			
			//Phrases button hovered
			if (((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&!phrases_ch && mouseInRect(Display.getButton("phrase_of_the_day_btn.png"))) {
				clearRectRectYellow(Display.getButton("phrase_of_the_day_btn.png"));
				var n = 5;
				if(Mode.Menu)
					n = 10;
				Display.expandButton("phrase_of_the_day_btn.png", n);
				drawPhrasesButton();
				phrases_ch = true;
			}
			else if(((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&phrases_ch && !(mouseInRect(Display.getButton("phrase_of_the_day_btn.png")))) {
				clearRectRectYellow(Display.getButton("phrase_of_the_day_btn.png"));
				var n = 5;
				if(Mode.Menu)
					n = 10;
				Display.expandButton("phrase_of_the_day_btn.png", -n);
				drawPhrasesButton();
				
				phrases_ch = false;
			}
			//Quiz button has been hovered
			if (((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.Exercise && !Mode.LogIn && !Mode.SignIn &&!quiz_ch && mouseInRect(Display.getButton("quiz_btn.png"))) {
				clearRectRectYellow(Display.getButton("quiz_btn.png"));
				var n = 5;
				if(Mode.Menu)
					n = 10;
				Display.expandButton("quiz_btn.png", n);
				drawQuizButton();
				quiz_ch = true;
			}
			else if(((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&quiz_ch && !(mouseInRect(Display.getButton("quiz_btn.png")))) {
				clearRectRectYellow(Display.getButton("quiz_btn.png"));
				var n = 5;
				if(Mode.Menu)
					n = 10;
				Display.expandButton("quiz_btn.png", -n);
				drawQuizButton();
				quiz_ch = false;
			}
			
			//settings button hovered
			if (((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) &&!settings_ch && mouseInRect(Display.getButton("setting_btn.png"))) {
				clearRectRectYellow(Display.getButton("setting_btn.png"));
				var n = 2;
				if(Mode.Menu)
					n = 10;
				Display.expandButton("setting_btn.png", n);
				drawSettingsButton();
				
				settings_ch = true;
			}
			else if(((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && settings_ch && !(mouseInRect(Display.getButton("setting_btn.png")))) {
				clearRectRectYellow(Display.getButton("setting_btn.png"));
				var n = 2;
				if(Mode.Menu)
					n = 10;
				Display.expandButton("setting_btn.png", -n);
				drawSettingsButton();
				settings_ch = false;
			}
			//help button has been hovered
			if (((!Mode.Mobile && (Mode.MenuItem || Mode.LogIn || Mode.SignIn || Mode.Exercise || Mode.Progress || Mode.Settings || Mode.Badges)) || (Mode.Mobile && Mode.Menu)) &&!help_ch && mouseInRect(Display.getButton("help_btn.png"))) {
				clearRectRectYellow(Display.getButton("help_btn.png"));
				var n = 2;
				if(Mode.Menu)
					n = 10;
				Display.expandButton("help_btn.png", n);
				drawHelpButton();
				help_ch = true;
			}
			else if(((!Mode.Mobile && (Mode.MenuItem || Mode.LogIn || Mode.SignIn || Mode.Exercise || Mode.Progress || Mode.Settings || Mode.Badges)) || (Mode.Mobile && Mode.Menu)) && help_ch && !(mouseInRect(Display.getButton("help_btn.png")))) {
				clearRectRectYellow(Display.getButton("help_btn.png"));
				var n = 2;
				if(Mode.Menu)
					n = 10;
				Display.expandButton("help_btn.png", -n);
				drawHelpButton();
				help_ch = false;
			}
			//Info button has been hovered
			if (((!Mode.Mobile && (Mode.MenuItem || Mode.LogIn || Mode.SignIn || Mode.Exercise || Mode.Progress || Mode.Settings || Mode.Badges)) || (Mode.Mobile && Mode.Menu)) && !Mode.LogIn && !Mode.SignIn &&!info_ch && mouseInRect(Display.getButton("info_btn.png"))) {
				clearRectRectYellow(Display.getButton("info_btn.png"));
				var n = 2;
				if(Mode.Menu)
					n = 10;
				Display.expandButton("info_btn.png", n);
				info_ch = true;
				drawInfoButton();
				
			}
			else if(((!Mode.Mobile && (Mode.MenuItem || Mode.LogIn || Mode.SignIn || Mode.Exercise || Mode.Progress || Mode.Settings || Mode.Badges)) || (Mode.Mobile && Mode.Menu)) && !Mode.LogIn && !Mode.SignIn &&info_ch && !(mouseInRect(Display.getButton("info_btn.png")))) {
				clearRectRectYellow(Display.getButton("info_btn.png"));
				var n = 2;
				if(Mode.Menu)
					n = 10;
				Display.expandButton("info_btn.png", -n);
				info_ch = false;
				drawInfoButton();
			}
				
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
			if (Mode.LogIn && !cancel_btn_ch && mouseInRect(Display.getButton("log_in_form_cancel_btn_ch.png"))) {
				clearScreenRect(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202);
				Display.expandButton("log_in_form_cancel_btn_ch.png", 2);
				drawLogInCancelButton();
				cancel_btn_ch = true;
			}
			else if(Mode.LogIn && cancel_btn_ch && !(mouseInRect(Display.getButton("log_in_form_cancel_btn_ch.png")))) {
				clearScreenRect(X_ + 49 + (MenuItem.size) / 202 * 156 + 35 - 2, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40 - 2, (MenuItem.size) / 202 * 156 + 4, MenuItem.size * 37 / 202 + 4);
				cancel_btn_ch = false;
				X_1 = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_1 = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
				
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_ = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
				drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
				drawLogInLogInButton();
				Display.expandButton("log_in_form_cancel_btn_ch.png", -2);
				drawLogInCancelButton();
			}
			
			//Signin button hovered SignIn mode
			if (Mode.SignIn && !sign_in_btn && mouseInRect(Display.getButton("sign_in_form_signin_btn.png"))) {
				clearScreenRect(Display.getButton("sign_in_form_signin_btn.png"));
				Display.expandButton("sign_in_form_signin_btn.png", 2);
				drawSignInSignInButton();
				sign_in_btn = true;
			}
			else if(Mode.SignIn && sign_in_btn && !(mouseInRect(Display.getButton("sign_in_form_signin_btn.png")))) {
				clearScreenRect(Display.getButton("sign_in_form_signin_btn.png"));
				Display.expandButton("sign_in_form_signin_btn.png", -2);
				sign_in_btn = false;
				drawSignInForm();
				selectAccent(flag);
				drawSignInSignInButton();
				drawSignInCancelButton();
			}
			
			//Cancel button hovered SignIn mode
			if (Mode.SignIn && !cancel_btn_ch && mouseInRect(Display.getButton("sign_in_form_cancel_btn_ch.png"))) {
				clearScreenRect(Display.getButton("sign_in_form_cancel_btn_ch.png"));
				Display.expandButton("sign_in_form_cancel_btn_ch.png", 2);
				drawSignInCancelButton();
				cancel_btn_ch = true;
			}
			else if(Mode.SignIn && cancel_btn_ch && !(mouseInRect(Display.getButton("sign_in_form_cancel_btn_ch.png")))) {
				clearScreenRect(Display.getButton("sign_in_form_cancel_btn_ch.png"));
				Display.expandButton("sign_in_form_cancel_btn_ch.png", -2);
				cancel_btn_ch = false;
				drawSignInForm();
				/*if(NewAccent == "US English Female")
					selectAccent("american_flag.png");
				if(NewAccent == "Australian Female")
					selectAccent("australian_flag.png");
				if(NewAccent == "UK English Male")
					selectAccent("british_flag.png");*/
				selectAccent(flag);
				drawSignInSignInButton();
				drawSignInCancelButton();
				
			}
			//exit button hovered during progress option
			if (Mode.Progress &&!exit_btn_ch && mouseInRect(Display.getButton("exit_btn.png"))) {
				clearRectRect(Display.getButton("exit_btn.png"));
				Display.expandButton("exit_btn.png", 3);
				drawExitButton();
				exit_btn_ch = true;
			}
			else if(Mode.Progress && exit_btn_ch && !(mouseInRect(Display.getButton("exit_btn.png")))) {
				clearRectRect(Display.getButton("exit_btn.png"));
				Display.expandButton("exit_btn.png", -3);
				drawExitButton();
				exit_btn_ch = false;
			}
			//exit button hovered during badges mode
			if (Mode.Badges &&!exit_btn_ch && mouseInRect(Display.getButton("exit_btn.png"))) {
				clearRectRect(Display.getButton("exit_btn.png"));
				Display.expandButton("exit_btn.png", 3);
				drawExitButton();
				exit_btn_ch = true;
			}
			else if(Mode.Badges && exit_btn_ch && !(mouseInRect(Display.getButton("exit_btn.png")))) {
				clearRectRect(Display.getButton("exit_btn.png"));
				Display.expandButton("exit_btn.png", -3);
				drawExitButton();
				exit_btn_ch = false;
			}
			//exit button has been hovered during MusicVideo
			var size_btn = 70;
			if (Mode.Exercise && Mode.MusicVideo && !Mode.SignIn && !Mode.LogIn &&!exit_btn_ch && mouseInRect(Display.getButton("exit_btn.png"))) {
				//clearScreenRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
				clearRectRect(Display.getButton("exit_btn.png"));
				Display.expandButton("exit_btn.png", 3);
				drawExitButton();
				exit_btn_ch = true;
			}
			else if(Mode.MusicVideo && !Mode.SignIn && !Mode.LogIn && exit_btn_ch && !(mouseInRect(Display.getButton("exit_btn.png")))) {
				//clearScreenRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn - 3, MenuItem.starts + 20 - 3, size_btn + 6, size_btn + 6);
				clearRectRect(Display.getButton("exit_btn.png"));
				Display.expandButton("exit_btn.png", -3);
				drawExitButton();
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
			if ((Mode.Exercise && !Mode.MusicVideo && !Mode.Results) && !Mode.SignIn && !Mode.LogIn &&!exit_btn_ch && mouseInRect(Display.getButton("exit_btn.png"))) {
				//clearRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
				clearRectRect(Display.getButton("exit_btn.png"));
				Display.expandButton("exit_btn.png", 3);
				drawExitButton();
				exit_btn_ch = true;
			}
			else if((Mode.Exercise && !Mode.MusicVideo && !Mode.Results) && !Mode.SignIn && !Mode.LogIn && exit_btn_ch && !(mouseInRect(Display.getButton("exit_btn.png")))) {
				//clearRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn - 3, MenuItem.starts + 20 - 3, size_btn + 6, size_btn + 6);
				clearRectRect(Display.getButton("exit_btn.png"));
				Display.expandButton("exit_btn.png", -3);
				drawExitButton();
				exit_btn_ch = false;
			}
			//MatchTheAnimalsWithTheirNames word has been hovered
			try {
				if ((!Mode.Menu && !Mode.CountDown && !Mode.Results && Mode.Exercise && !Mode.MusicVideo) && !Mode.SignIn && !Mode.LogIn &&!word_ch) {
					var i = checkPoint({x:mouseX, y:mouseY}, Display.getTestItems());
					k2 = i;
					if(k2 < Display.getTestItems().length) {
						wordFrame = (Task.test.concat())[k2][frametype2];
						clearRectRect(Display.getTestItem(k2));
						Display.expandTestItem(i, 3);
						ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Display.getTestItem(k2).x)*Math.min(Screen.k_width, Screen.k_height), (Display.getTestItem(k2).y)*Math.min(Screen.k_width, Screen.k_height), (Display.getTestItem(k2).w)*Math.min(Screen.k_width, Screen.k_height), (Display.getTestItem(k2).h)*Math.min(Screen.k_width, Screen.k_height));
						word_ch = true;
					}
				}
				else if((!Mode.Menu && !Mode.CountDown && !Mode.Results && Mode.Exercise && !Mode.MusicVideo) && !Mode.SignIn && !Mode.LogIn && word_ch) {
					
					var i = k2;
					if(k3 == -1 && !PointInRect({x:mouseX, y:mouseY}, Display.getTestItem(i))) {
						wordFrame = Task.test[i][frametype2];
						clearRectRect(Display.getTestItem(i));
						Display.expandTestItem(i, -3);
						ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Display.getTestItem(i)).x*Math.min(Screen.k_width, Screen.k_height), (Display.getTestItem(i).y)*Math.min(Screen.k_width, Screen.k_height), (Display.getTestItem(i).w)*Math.min(Screen.k_width, Screen.k_height), (Display.getTestItem(i).h)*Math.min(Screen.k_width, Screen.k_height));
						word_ch = false;
						k2 = -1;
					}
					if(k3 != -1){
						drawHeader();
						wordFrame = Task.test[k3][frametype2];
						Item = {};
						Item.x = Display.getTestItem(k3).x + mouseX/Math.min(Screen.k_width, Screen.k_height) - Pressed.x/Math.min(Screen.k_width, Screen.k_height);
						Item.y = Display.getTestItem(k3).y + mouseY/Math.min(Screen.k_width, Screen.k_height) - Pressed.y/Math.min(Screen.k_width, Screen.k_height);
						drawTest();
						ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Item.x)*Math.min(Screen.k_width, Screen.k_height), (Item.y)*Math.min(Screen.k_width, Screen.k_height), (Display.getTestItem(k3).w)*Math.min(Screen.k_width, Screen.k_height), (Display.getTestItem(k3).h)*Math.min(Screen.k_width, Screen.k_height));
						
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
			if (!Mode.Quiz && Mode.Results && !Mode.SignIn && !Mode.LogIn &&!try_again_ch && mouseInRect(Display.getButton("result_form_try_again_btn.png"))) {
				Display.expandButton("result_form_try_again_btn.png", 3);
				drawResultTryAgainButton(Result_form.x + 20 * Result_form.w / frame.w - 3, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w - 3, btn_width + 6, btn_height + 6);
				try_again_ch = true;
			}
			else if(!Mode.Quiz && Mode.Results && !Mode.SignIn && !Mode.LogIn && try_again_ch && !(mouseInRect(Display.getButton("result_form_try_again_btn.png")))) {
				clearScreenRect(Display.getButton("result_form_try_again_btn.png"));
				drawResultForm();
				Display.expandButton("result_form_try_again_btn.png", -3);
				drawResultTryAgainButton();
				drawOkayButton();
					
				var Correct = countCorrect(Task.Result.Answers);
				var Answers = Task.Result.Answers;
				var Total = Task.Total;
				var Max = Task.MaxPoint;
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
				
				var points = countPoints(Answers, Total, Max);
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
				if (Mode.Training && (Mode.Exercise && !Mode.MusicVideo) && !Mode.SignIn && !Mode.LogIn &&!skip_ch && mouseInRect(Display.getButton("skip.png"))) {
					//clearScreenRect(Result_form.x + 20 * Result_form.w / frame.w, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w, btn_width, btn_height);
					clearRectRect(Display.getButton("skip.png"));
					Display.expandButton("skip.png", 3);
					drawSkip();
					skip_ch = true;
				}
				else if(Mode.Training && (Mode.Exercise && !Mode.MusicVideo) && !Mode.SignIn && !Mode.LogIn && skip_ch && !(mouseInRect(Display.getButton("skip.png")))) {
					clearRectRect(Display.getButton("skip.png"));
					Display.expandButton("skip.png", -3);
					drawSkip();
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
				
				
				//okay button hovered in show results
				if (Mode.Results && !Mode.SignIn && !Mode.LogIn &&!okay_ch && mouseInRect(Display.getButton("result_form_okay_btn.png"))) {
					Display.expandButton("result_form_okay_btn.png", 3);
					drawOkayButton();
					okay_ch = true;
				}
				else if(Mode.Results && !Mode.SignIn && !Mode.LogIn && okay_ch && !(mouseInRect(Display.getButton("result_form_okay_btn.png")))) {
					clearScreenRect(Display.getButton("result_form_okay_btn.png"));
					drawResultForm();
					Display.expandButton("result_form_okay_btn.png", -3);
					drawOkayButton();
					if(!Mode.Quiz)
						drawResultTryAgainButton();
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
					if(Mode.Mobile && (Mode.MenuItem || Mode.Menu) && !Mode.Exercise && !Mode.Progress && !Mode.Results && !Mode.SignIn && !Mode.LogIn && !menu_btn_ch && mouseInRect(Display.getButton("menu_btn.png"))) {
						 clearRectRectYellow(Display.getButton("menu_btn.png"));
						Display.expandButton("menu_btn.png", 5);
						drawMenuButton();
						menu_btn_ch = true;
					}
					else if(Mode.Mobile && (Mode.MenuItem || Mode.Menu) && !Mode.Exercise &&!Mode.Progress && !Mode.Results && !Mode.SignIn && !Mode.LogIn && menu_btn_ch && !mouseInRect(Display.getButton("menu_btn.png"))) {
						 clearRectRectYellow(Display.getButton("menu_btn.png"));
						Display.expandButton("menu_btn.png", -5);
						drawMenuButton();
						menu_btn_ch = false;
					}
				}
				catch(e){}
			}
			//cancel button hovered during Settings
			if (Mode.Settings && !cancel_btn_ch && mouseInRect(Display.getButton("sign_in_form_cancel_btn_ch.png"))) {
				Display.expandButton("sign_in_form_cancel_btn_ch.png", 5);
				drawSignInCancelButton();
				cancel_btn_ch = true;
			}
			else if (Mode.Settings && cancel_btn_ch && !(mouseInRect(Display.getButton("sign_in_form_cancel_btn_ch.png")))) {
				Display.expandButton("sign_in_form_cancel_btn_ch.png", -5);
				showSettingsForm();
				cancel_btn_ch = false;
			}
			//save button hovered during Settings
			if (Mode.Settings && !save_btn_ch && mouseInRect(Display.getButton("save_btn.png"))) {
				Display.expandButton("save_btn.png", 5);
				drawSaveButton();
				save_btn_ch = true;
			}
			else if (Mode.Settings && save_btn_ch && !(mouseInRect(Display.getButton("save_btn.png")))) {
				Display.expandButton("save_btn.png", -5);
				showSettingsForm();
				save_btn_ch = false;
			}
			//log out button hovered during Settings
			if (Mode.Settings && Profile.LoggedIn && !log_out_btn_ch && mouseInRect(Display.getButton("log_out_btn.png"))) {
				Display.expandButton("log_out_btn.png", 5);
				drawLogOutButton();
				log_out_btn_ch = true;
			}
			else if (Mode.Settings && Profile.LoggedIn && log_out_btn_ch && !(mouseInRect(Display.getButton("log_out_btn.png")))) {
				Display.expandButton("log_out_btn.png", -5);
				showSettingsForm();
				log_out_btn_ch = false;
			}
			//okay button hovered during message
			if (Mode.Message && !okay_ch && mouseInRect(Display.getButton("result_form_okay_btn.png"))) {
				Display.expandButton("result_form_okay_btn.png", 5);
				drawOkayButton();
				okay_ch = true;
			}
			else if (Mode.Message && okay_ch && !(mouseInRect(Display.getButton("result_form_okay_btn.png")))) {
				Display.expandButton("result_form_okay_btn.png", -5);
				console.log("Error", Error);
				showMessageForm(Error.Name + ".png");
				okay_ch = false;
			}
		}
		function leftArrowClicked() {
			MenuItem.clicked = -1;
			MenuItem.chosen = MenuItem.clicked;
			if(MenuItem.firstItem > 0) {
				MenuItem.firstItem = MenuItem.firstItem - 1;
				drawMenuItems()
				if(MenuItem.firstItem <= 0) {
					clearRectRect(Display.getButton("left-arrow.png"));
				}
				if(MenuItem.firstItem + MenuItem.display < MenuItem.itemsCount) {
					drawRightArrow();
				}
			}
			
		}
		function rightArrowClicked() {
			MenuItem.clicked = -1;
			MenuItem.chosen = MenuItem.clicked;
			MenuItem.firstItem = MenuItem.firstItem + 1;
			if(MenuItem.firstItem + MenuItem.display >= MenuItem.itemsCount) {
				clearRectRect(Display.getButton("right-arrow.png"));
			}
			drawLeftArrow();
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
				//drawTask(j, Task.firstTask, pX, (pY+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//drawTask(j, Task.firstTask + 1, pX, (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//drawTask(j, Task.firstTask + 2, pX, (pY + (55/368*MenuItem.size + 10) * 2+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//drawTask(j , Task.firstTask + 3, pX, (pY + (55/368*MenuItem.size + 10) * 3+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				for (var i = 0; i < Task.display; i++) {
					drawTask(j , Task.firstTask + i, pX, (pY + (55/368*MenuItem.size + 10) * i + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size);
				}
				if(Task.firstTask <= 0) {
					clearRectRect(Display.getButton("top-arrow"));
				}
				//draw bottom arrow
				drawBottomArrow();
		}

		var atlasMenuItemTask = new Image();
		MenuItem.loadedMenuItemTasks = false;
		function loadMenuItemsTasks(j){
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
						drawLogInLogInButton();
						drawLogInCancelButton();
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
						drawLogInLogInButton();
						drawLogInCancelButton();
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
						
						drawSignInForm();
						if(NewAccent == "US English Female")
							AmericanAccent()
						if(NewAccent == "Australian Female")
							AustralianAccent()
						if(NewAccent == "UK English Male")
							BritishAccent()
						drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
						drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
						
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
						drawSignInForm();
						ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
						if(NewAccent == "US English Female")
							AmericanAccent()
						if(NewAccent == "Australian Female")
								AustralianAccent()
						if(NewAccent == "UK English Male")
								BritishAccent()
						drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
						drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
						
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
			
			var i = 0;
			while((i < Task.itemsCount[j]) && (i < Task.display)) {
				drawTask(j, Task.firstTask + i, pX, (pY + (55/368*MenuItem.size + 10) * i + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size);
				i = i + 1;
			}
			if(Task.firstTask + Task.display < Task.itemsCount[MenuItem.clicked]) {
				//bottom arrow
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace + MenuItem.size;
				b_a_height = 100*0.5;
				b_a_width = 0.5*100*226/152;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2;
				pY = MenuItem.topSpace + MenuItem.size - b_a_height;
				Display.setButton("bottom-arrow.png", 0, 0, t_a_width, t_a_height);
				Display.setButton("bottom-arrow", pX, pY, b_a_width, b_a_height);
				drawBottomArrow();
				t_a_height = 100*0.5;
				t_a_width = 0.5*100*226/152;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2;
				pY =  MenuItem.topSpace;
				Display.setButton("top-arrow", pX, pY,t_a_width, t_a_height);		
			}
			setTimeout(function(){
				Mode.Tasks = true;
			},100)
			
								
			
			
			
		}
		function MenuItemClicked(j) {
			k = -1;
			k1 = -1;
			task_ch = false;
			console.log(j, MenuItem.ItemList);
			if(!Mode.Exercise) {
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
				if(Forms_loaded){
					Mode.MenuItem  = false;
					Mode.Tasks = false;
					Mode.LogIn = true;	
					Mode.SignIn= false;
					if(document.getElementById("MenuCanvas"))
						$("#MenuCanvas").remove();
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
					Y_ = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
					size_ = 2*(Y_ - MenuItem.starts) + MenuItem.size;
					drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
					Display.setButton("log_in_form_login_btn.png", X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202);
					drawLogInLogInButton();
					Display.setButton("log_in_form_cancel_btn_ch.png", X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202);
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
					document.getElementById("Loading").style.visibility = "hidden";
					
					
				}
				else {
					setTimeout(function(){
						showLogInForm();
					}, 10);
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
						Display.setForm("result_form.png", Result_form.x, Result_form.y, Result_form.w, Result_form.h);
						drawResultForm();
						document.getElementById("Loading").style.visibility = "hidden";
						var btn = Properties.Forms["result_form_try_again_btn.png"];
						var btn_width = (Result_form.w - 2 * 20 * Result_form.w / frame.w - 20) / 2;
						var btn_height = btn_width * btn.h / btn.w;
						Display.setButton("result_form_try_again_btn.png", Result_form.x + 20 * Result_form.w / frame.w, Result_form.y + Result_form.h - btn_height / 2 - 10 * Result_form.w / frame.w, btn_width, btn_height);
						Display.setButton("result_form_okay_btn.png", Result_form.x + 20 * Result_form.w / frame.w + 20 + btn_width, Result_form.y + Result_form.h - btn_height / 2 -  10 * Result_form.w / frame.w, btn_width, btn_height);
						if(!Mode.Quiz)
							drawResultTryAgainButton();
						drawOkayButton();
						
						
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
						
						Task.Result.Max_point = Task.MaxPoint * Task.N_toTest;
						
						//######
						if(Profile.LoggedIn) {
							Task.Result.Finish = new Date();
							console.log("result:", Task.Result);
							Task.Result.Type = Task.Type;
							Task.Result.Points = countPoints(Answers, Total, Max);
							//Task.Result.Max_point = Total * Max;
							Profile.Points = Profile.Points + Task.Result.Points;
							Profile.Max_points = Profile.Max_points + Task.Result.Max_point;
							socket.emit("Result", {Result: Task.Result});
						}
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
		function showBadges() {
			document.getElementById("Loading").style.visibility = "hidden";
			ctx.clearRect(0,MenuItem.starts * Math.min(Screen.k_width, Screen.k_height), Screen.width, Screen.height);
			//$$$$$
			if(document.getElementById("MenuCanvas"))
				document.getElementById("mainDiv").removeChild(document.getElementById("MenuCanvas"));
			if(!document.getElementById("BadgesCanvas")) {
			var Badges = document.createElement('canvas');
			Badges.id = 'BadgesCanvas';
			Badges.width = document.getElementById("MainCanvas").width;
			Badges.height = document.getElementById("MainCanvas").height;
			document.getElementById("mainDiv").appendChild(Badges);
			}
			drawLoading();
			BadgesCanvas = document.getElementById("BadgesCanvas");
			
			BadgesCanvas.addEventListener("touchmove", checkPosBadges, false);
			BadgesCanvas.addEventListener("mousemove", checkPosBadges);
			BadgesCanvas.addEventListener("mousedown", MouseDown);
			BadgesCanvas.addEventListener("touchstart", MouseDown);
			BadgesCanvas.addEventListener("mouseup", checkClick);
			BadgesCanvas.addEventListener("touchend", checkClick);
			Badges_ctx = document.getElementById("BadgesCanvas").getContext("2d");
			setBadgesFormProp();
			
				
		}
		function setProgressProp(type) {
			console.log(type);
			var frame = Properties.Forms["progress_form_" + type + ".png"];
			var ResultForm_frame = {};
			
			ResultForm_frame.h = Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.starts - 2 * 20;
			ResultForm_frame.w = ResultForm_frame.h * frame.w / frame.h;
			
			var r_a_height = koef*100*226/152;
			var r_a_y =  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2;
			var r_a_width = koef*100;
			var r_a_x = MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width;
			
			if(ResultForm_frame.w > Screen.width / Math.min(Screen.k_width, Screen.k_height) - 2 * r_a_width - 2 * 20 - 2 * MenuItem.leftSpace) {
				
				ResultForm_frame.w = Screen.width / Math.min(Screen.k_width, Screen.k_height) - 2 * r_a_width - 2 * MenuItem.leftSpace - 2 * 20;
				ResultForm_frame.h = ResultForm_frame.w * frame.h / frame.w;
			}
			ResultForm_frame.x = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - ResultForm_frame.w) / 2;
			ResultForm_frame.y = MenuItem.starts + (Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.starts - ResultForm_frame.h) / 2;
			Display.setForm("progress_form_" + type + ".png", ResultForm_frame.x, ResultForm_frame.y, ResultForm_frame.w, ResultForm_frame.h);
			var r_a_height = koef*100*226/152;
			var r_a_y =  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2;
			var r_a_width = koef*100;
			var r_a_x = MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width;
			//Display.setButton("right-arrow.png", Display.getButton("right-arrow.png").x, Display.getForm("progress_form_" + type + ".png").y + Display.getForm("progress_form_" + type + ".png").h / 2 - Display.getButton("right-arrow.png").h / 2,Display.getButton("right-arrow.png").w, Display.getButton("right-arrow.png").h)
			Display.setButton("right-arrow.png", r_a_x, Display.getForm("progress_form_" + type + ".png").y + Display.getForm("progress_form_" + type + ".png").h / 2 - r_a_height / 2, r_a_width, r_a_height);
			Display.setButton("left-arrow.png", MenuItem.leftSpace, Display.getForm("progress_form_" + type + ".png").y + Display.getForm("progress_form_" + type + ".png").h / 2 - r_a_height / 2, r_a_width, r_a_height);
			
			
			//showProgressForm();
			
		}
		function showProgressMatching() {
			//console.log(Progress.Array[Progress.index]);
			var frame = Properties.Forms["progress_form_Matching.png"];
			var digit_frame = Properties.Numbers["small-dark-1.png"];
			var digit = {};
			//fillRect(0, Display.getForm("progress_form_Matching.png").y + 150 * Display.getForm("progress_form_Matching.png").h / frame.h, 10000, 10);
			//fillRect(0, Display.getForm("progress_form_Matching.png").y + 172 * Display.getForm("progress_form_Matching.png").h / frame.h, 10000, 2);
			//fillRect(Display.getForm("progress_form_Matching.png").x + 240 * Display.getForm("progress_form_Matching.png").w / frame.w, 0 , 10, 10000);
			//fillRect(Display.getForm("progress_form_Matching.png").x + 510 * Display.getForm("progress_form_Matching.png").w / frame.w, 0 , 10, 10000);
			//exercise name
			digit.h = 20  * Display.getForm("progress_form_Matching.png").h / frame.h;
			digit.w = digit.h * digit_frame.w / digit_frame.h;
			if(880 / frame.w * frame.h + Progress.Array[Progress.index].Exercise.length * digit.w > 2700 / frame.w * frame.h) {
				digit.w = (2700 / frame.w * frame.h - 1300 / frame.w * frame.h - 10 / Screen.height / Math.min(Screen.k_width, Screen.k_height)) / Progress.Array[Progress.index].Exercise.length;
				digit.h = digit.w * digit_frame.h / digit_frame.w;
			}
			for(var j = 0; j < Progress.Array[Progress.index].Exercise.length; j++) {
				//console.log(Progress.Array[Progress.index].Exercise[j]);
				if(Progress.Array[Progress.index].Exercise[j] != " ") {
					var type = "small-dark";
					if(Progress.Array[Progress.index].Exercise[j] < "0" || Progress.Array[Progress.index].Exercise[j] > "9") {
						if(j == 0)
							type = "capital-" + type;
						drawLetter(Progress.Array[Progress.index].Exercise.toLowerCase()[j], Display.getForm("progress_form_Matching.png").x + 220 * Display.getForm("progress_form_Matching.png").w / frame.w + j * digit.w, Display.getForm("progress_form_Matching.png").y +  75 * Display.getForm("progress_form_Matching.png").h / frame.h - digit.h, digit.w, digit.h, type);
					}
					else
					{
						drawDigit(Progress.Array[Progress.index].Exercise.toLowerCase()[j], Display.getForm("progress_form_Matching.png").x + 220 * Display.getForm("progress_form_Matching.png").w / frame.w + j * digit.w, Display.getForm("progress_form_Matching.png").y +  75 * Display.getForm("progress_form_Matching.png").h / frame.h - digit.h, digit.w, digit.h, type);
					}
				}
			}
			//topic name
			digit.h = 20  * Display.getForm("progress_form_Matching.png").h / frame.h;
			digit.w = digit.h * digit_frame.w / digit_frame.h;
			if(700 / frame.w * frame.h + Progress.Array[Progress.index].Topic_Name.length * digit.w > 2700 / frame.w * frame.h) {
				digit.w = (2700 / frame.w * frame.h - 700 / frame.w * frame.h - 10 / Screen.height / Math.min(Screen.k_width, Screen.k_height)) / Progress.Array[Progress.index].Exercise.length;
				digit.h = digit.w * digit_frame.h / digit_frame.w;
			}
			for(var j = 0; j < Progress.Array[Progress.index].Topic_Name.length; j++) {
				
				if(Progress.Array[Progress.index].Topic_Name[j] != " ") {
					var type = "small-dark";
					if(Progress.Array[Progress.index].Topic_Name[j] < "0" || Progress.Array[Progress.index].Topic_Name[j] > "9") {
						if(j == 0)
							type = "capital-" + type;
						drawLetter(Progress.Array[Progress.index].Topic_Name.toLowerCase()[j], Display.getForm("progress_form_Matching.png").x + 170 * Display.getForm("progress_form_Matching.png").w / frame.w + j * digit.w, Display.getForm("progress_form_Matching.png").y + 100 * Display.getForm("progress_form_Matching.png").h / frame.h - digit.h, digit.w, digit.h, type);
					}
					else
					{
						drawDigit(Progress.Array[Progress.index].Topic_Name.toLowerCase()[j], Display.getForm("progress_form_Matching.png").x + 170 * Display.getForm("progress_form_Matching.png").w / frame.w + j * digit.w, Display.getForm("progress_form_Matching.png").y + 100 * Display.getForm("progress_form_Matching.png").h / frame.h - digit.h, digit.w, digit.h, type);
					}
				}
			}
			//points
			Points = Progress.Array[Progress.index].Points + "";
			digit.h = 20  * Display.getForm("progress_form_Matching.png").h / frame.h;
			digit.w = digit.h * digit_frame.w / digit_frame.h;
			for(var j = 0; j < Points.length; j++)
				drawDigit(Points[j], Display.getForm("progress_form_Matching.png").x + 185 * Display.getForm("progress_form_Matching.png").w / frame.w + j * digit.w, Display.getForm("progress_form_Matching.png").y + 125 * Display.getForm("progress_form_Matching.png").h / frame.h - digit.h, digit.w, digit.h, "small-dark");
			//stars
			var stars = Math.round(5 * Progress.Array[Progress.index].Points / Progress.Array[Progress.index].Max_point);
			var star_frame = Properties.Buttons["star.png"];
			var star = {}
			star.h = digit.h;
			star.w = star.h * star_frame.w / star_frame.h;
			for(var j = 0; j < stars; j++)
				drawStar(Display.getForm("progress_form_Matching.png").x + 465 * Display.getForm("progress_form_Matching.png").w / frame.w + j * star.w, Display.getForm("progress_form_Matching.png").y +  125 * Display.getForm("progress_form_Matching.png").h / frame.h - star.h, star.w, star.h);
			for(var j = 0; j < 5 - stars; j++)
				drawDarkStar(Display.getForm("progress_form_Matching.png").x + 465 * Display.getForm("progress_form_Matching.png").w / frame.w + (stars + j) * star.w, Display.getForm("progress_form_Matching.png").y +  125 * Display.getForm("progress_form_Matching.png").h / frame.h - star.h, star.w, star.h);
			
			//Words
			Answers = Progress.Array[Progress.index].Answers;
			for(var i = 0; i < Answers.length; i++) {
				var word = Answers[i].Word;
				var letter = {};
					letter.x = Display.getForm("progress_form_Matching.png").x + 50 * Display.getForm("progress_form_Matching.png").w / frame.w;
					letter.y = Display.getForm("progress_form_Matching.png").y + 148 * Display.getForm("progress_form_Matching.png").h / frame.h;
					letter.h = 20 / frame.h * frame.w;
					if(Progress.Array[Progress.index].Topic_Name != "Numbers")
						letter.w = letter.h * Properties.Letters["small-dark-" + word[0] + ".png"].w / Properties.Letters["small-dark-" + word[0] + ".png"].h;
					else
						letter.w = letter.h * Properties.Numbers["small-dark-" + word[0] + ".png"].w / Properties.Numbers["small-dark-" + word[0] + ".png"].h;
					if(680 / frame.w * frame.h < letter.w * word.length) {
						
						//letter.w = 220 / frame.w * frame.h / word.length;
						//letter.h = letter.w * Properties.Letters["small-dark-" + word[0] + ".png"].h / Properties.Letters["small-dark-" + word[0] + ".png"].w;
					}
					//fillRect(0, letter.y + 32 / frame.h * frame.w *(i), 100000, 1);
					for(var c = 0; c < word.length; c++) {
						if(Progress.Array[Progress.index].Topic_Name != "Numbers") {
							drawLetter(word[c], letter.x + letter.w * (c), letter.y + 25*Display.getForm("progress_form_Matching.png").h / frame.h *(i + 1) - letter.h, letter.w, letter.h, "small-dark");
						}
						else
							drawDigit(word[c], letter.x + letter.w * (c), letter.y + 25*Display.getForm("progress_form_Matching.png").h / frame.h *(i + 1) - letter.h, letter.w, letter.h, "small-dark");
					}
				
			}
			
			//Time
			for(var i = 0; i < Answers.length; i++) {
				var minuts = Math.floor(Answers[i].Time / 60);
				var seconds = Math.round(Answers[i].Time - 60 * minuts);
				//console.log(minuts, seconds);
				var letter = {};
				letter.x = Display.getForm("progress_form_Matching.png").x + 260 * Display.getForm("progress_form_Matching.png").w / frame.w;
				letter.y = Display.getForm("progress_form_Matching.png").y + 148 * Display.getForm("progress_form_Matching.png").h / frame.h;
				letter.h = 20 / frame.h * frame.w;
				if(Progress.Array[Progress.index].Topic_Name != "Numbers")
					letter.w = letter.h * Properties.Letters["small-dark-" + word[0] + ".png"].w / Properties.Letters["small-dark-" + word[0] + ".png"].h;
				else
					letter.w = letter.h * Properties.Numbers["small-dark-" + word[0] + ".png"].w / Properties.Numbers["small-dark-" + word[0] + ".png"].h;
				minuts = minuts + "";
				seconds = seconds + "";
				//console.log(minuts, seconds);
				drawTime(minuts, seconds, letter.x, letter.y + 25*Display.getForm("progress_form_Matching.png").h / frame.h *(i + 1), letter);
				
			}
			//Attempts
			for(var i = 0; i < Answers.length; i++) {
				var word = Answers[i].Attempts + "";
				var letter = {};
				letter.x = Display.getForm("progress_form_Matching.png").x + 510 * Display.getForm("progress_form_Matching.png").w / frame.w;
				letter.y = Display.getForm("progress_form_Matching.png").y + 148 * Display.getForm("progress_form_Matching.png").h / frame.h;
				letter.h = 20 / frame.h * frame.w;
				letter.w = letter.h * Properties.Numbers["small-dark-" + word[0] + ".png"].w / Properties.Numbers["small-dark-" + word[0] + ".png"].h;
				if(680 / frame.w * frame.h < letter.w * word.length) {
					
					//letter.w = 220 / frame.w * frame.h / word.length;
					//letter.h = letter.w * Properties.Letters["small-dark-" + word[0] + ".png"].h / Properties.Letters["small-dark-" + word[0] + ".png"].w;
				}
				//fillRect(0, letter.y + 32 / frame.h * frame.w *(i), 100000, 1);
				if(word != "0") {
					for(var c = 0; c < word.length; c++) {
						drawDigit(word[c], letter.x + letter.w * (c), letter.y + 25 * Display.getForm("progress_form_Matching.png").h / frame.h *(i + 1) - letter.h, letter.w, letter.h, "small-dark");
					}
				}
				else 
				{
					word = "-";
					
					for(var c = 0; c < word.length; c++) {
						drawLetter(word[c], letter.x + letter.w * (c), letter.y + 25 * Display.getForm("progress_form_Matching.png").h / frame.h *(i + 1) - letter.h, letter.w, letter.h, "small-dark");
					}
				}
			}
			
		}
		function drawTime(minuts, seconds, X, Y, digit) {
			var i = 0;
			var j = 0;
			if(minuts != "0") {
				for (i; i < minuts.length; i++) {
					drawDigit(minuts[i], X + i * digit.w, Y - digit.h, digit.w, digit.h, "small-dark");
				}
				var min = "min";
				i++;
				for(j; j < min.length;j++) {
					drawLetter(min[j], X + (i + j) * digit.w, Y - digit.h, digit.w, digit.h, "small-dark");
				}
				i = i + j + 1;
				j = 0;
			}
			if(seconds != "0") {
				for (j = 0; j < seconds.length; j++) {
					drawDigit(seconds[j], X + (i + j) * digit.w, Y - digit.h, digit.w, digit.h, "small-dark");
				}
				i = i + j + 1;
				var sec = "sec";
				for(j = 0; j < sec.length;j++) {
					drawLetter(sec[j], X + (i + j) * digit.w, Y - digit.h, digit.w, digit.h, "small-dark");
				}
			}
		}
		function showProgressVideo() {
			
			var frame = Properties.Forms["progress_form_Video.png"];
			var digit_frame = Properties.Numbers["small-dark-1.png"];
			var digit = {};
			digit.h = 20  * Display.getForm("progress_form_Video.png").h / frame.h;
			digit.w = digit.h * digit_frame.w / digit_frame.h;
			//time
			var Finish = new Date(Progress.Array[Progress.index].Finish);
			var Start = new Date(Progress.Array[Progress.index].Start);
			
			var minuts = Math.floor((Finish.getTime() - Start.getTime()) / 1000 / 60);
			var seconds = Math.round((Finish.getTime() - Start.getTime()) / 1000 - 60 * minuts);
			//fillRect(0, Display.getForm("progress_form_Video.png").y + 340 * Display.getForm("progress_form_Video.png").h / frame.h, 10000, 10);
			//fillRect(Display.getForm("progress_form_Video.png").x + 680 * Display.getForm("progress_form_Video.png").w / frame.w, 0 , 10, 10000);
			//fillRect(Display.getForm("progress_form_Video.png").x + 510 * Display.getForm("progress_form_Video.png").w / frame.w, 0 , 10, 10000);
			minuts = minuts + "";
			seconds = seconds + "";
			drawTime(minuts, seconds, Display.getForm("progress_form_Video.png").x + 225   * Display.getForm("progress_form_Video.png").w / frame.w,  Display.getForm("progress_form_Video.png").y + 220 * Display.getForm("progress_form_Video.png").h / frame.h, digit);
			
			//duration
			minuts = Math.floor(Progress.Array[Progress.index].Duration / 60);
			seconds = Math.round(Progress.Array[Progress.index].Duration - 60 * minuts);
			minuts = minuts + "";
			seconds = seconds + "";
			//console.log(minuts, seconds);
			drawTime(minuts, seconds, Display.getForm("progress_form_Video.png").x + 480  * Display.getForm("progress_form_Video.png").w / frame.w,  Display.getForm("progress_form_Video.png").y + 280 * Display.getForm("progress_form_Video.png").h / frame.h, digit);
			//points
			Points = Progress.Array[Progress.index].Points + "";
			digit.h = 30  * Display.getForm("progress_form_Video.png").h / frame.h;
			digit.w = digit.h * digit_frame.w / digit_frame.h;
			for(var j = 0; j < Points.length; j++)
				drawDigit(Points[j], Display.getForm("progress_form_Video.png").x + 270 * Display.getForm("progress_form_Video.png").w / frame.w + j * digit.w, Display.getForm("progress_form_Video.png").y + 340 * Display.getForm("progress_form_Video.png").h / frame.h - digit.h, digit.w, digit.h, "small-dark");
			//stars
			var stars = Math.round(5 * Progress.Array[Progress.index].Points / Progress.Array[Progress.index].Max_point);
			var star_frame = Properties.Buttons["star.png"];
			var star = {}
			star.h = digit.h;
			star.w = star.h * star_frame.w / star_frame.h;
			for(var j = 0; j < stars; j++)
				drawStar(Display.getForm("progress_form_Video.png").x + 510 * Display.getForm("progress_form_Video.png").w / frame.w + j * star.w, Display.getForm("progress_form_Video.png").y +  340 * Display.getForm("progress_form_Video.png").h / frame.h - star.h, star.w, star.h);
			for(var j = 0; j < 5 - stars; j++)
				drawDarkStar(Display.getForm("progress_form_Video.png").x + 510 * Display.getForm("progress_form_Video.png").w / frame.w + (stars + j) * star.w, Display.getForm("progress_form_Video.png").y +  340 * Display.getForm("progress_form_Video.png").h / frame.h - star.h, star.w, star.h);
			//exercise name
			digit.h = 25  * Display.getForm("progress_form_Video.png").h / frame.h;
			digit.w = digit.h * digit_frame.w / digit_frame.h;
			if(330 * Display.getForm("progress_form_Video.png").w / frame.w + Progress.Array[Progress.index].Exercise.length * digit.w > 680 * Display.getForm("progress_form_Video.png").w / frame.w) {
				digit.w = (350 * Display.getForm("progress_form_Video.png").w / frame.w) / Progress.Array[Progress.index].Exercise.length;
				digit.h = digit.w * digit_frame.h / digit_frame.w;
			}
			for(var j = 0; j < Progress.Array[Progress.index].Exercise.length; j++) {
				if(Progress.Array[Progress.index].Exercise[j] != " ") {
					var type = "small-dark";
					if(Progress.Array[Progress.index].Exercise[j] < "0" || Progress.Array[Progress.index].Exercise[j] > "9") {
						if(j == 0)
							type = "capital-" + type;
						drawLetter(Progress.Array[Progress.index].Exercise.toLowerCase()[j], Display.getForm("progress_form_Video.png").x + 330 * Display.getForm("progress_form_Video.png").w / frame.w + j * digit.w, Display.getForm("progress_form_Video.png").y + 160 * Display.getForm("progress_form_Video.png").h / frame.h - digit.h, digit.w, digit.h, type);
					}
					else
					{
						drawDigit(Progress.Array[Progress.index].Exercise.toLowerCase()[j], Display.getForm("progress_form_Video.png").x + 330 * Display.getForm("progress_form_Video.png").w / frame.w + j * digit.w, Display.getForm("progress_form_Video.png").y + 160 * Display.getForm("progress_form_Video.png").h / frame.h - digit.h, digit.w, digit.h, type);
					}
				}
			}
			
		}
		function setBadgesProp(){
			console.log("first Badge", Badges.firstItem);
			for (var i = Badges.firstItem; i < Badges.display + Badges.firstItem && i < Badges.All.length; i++) {
				console.log(Badges.All[i]);
				Display.setBadge(Badges.All[i].Name, Display.getButton("left-arrow.png").x + Display.getButton("left-arrow.png").w + 20 + Badges.width * (i - Badges.firstItem) + 30 * (i - Badges.firstItem), Display.getButton("left-arrow.png").y + Display.getButton("left-arrow.png").h / 2 - Badges.height / 2, Badges.width, Badges.height);
			}
			showBadgesForm();
		}
		function setBadgesFormProp() {
			//Badges.display = 1;
			var frame = Badges.All[0].Frame;
			if(Display.getButton("right-arrow.png").w < 30 / Math.min(Screen.k_width, Screen.k_height)){
				console.log("too small");
				var width =  30 / Math.min(Screen.k_width, Screen.k_height);
				var height = width * Display.getButton("right-arrow.png").h / Display.getButton("right-arrow.png").w;
				Display.setButton("left-arrow.png", 20, MenuItem.starts + (Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.starts) / 2 - height / 2, width, height);
				Display.setButton("right-arrow.png", Screen.width / Math.min(Screen.k_width, Screen.k_height) - 20 - width, MenuItem.starts + (Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.starts) / 2 - height / 2, width, height);
			}
			else {
				console.log("normal size");
				Display.setButton("left-arrow.png", 20, MenuItem.starts + (Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.starts) / 2 - Display.getButton("left-arrow.png").h / 2, Display.getButton("left-arrow.png").w, Display.getButton("left-arrow.png").h);
				Display.setButton("right-arrow.png", Screen.width / Math.min(Screen.k_width, Screen.k_height) - 20 - Display.getButton("left-arrow.png").w, MenuItem.starts + (Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.starts) / 2 - Display.getButton("left-arrow.png").h / 2, Display.getButton("left-arrow.png").w, Display.getButton("left-arrow.png").h);
			}
			console.log("frame", frame, frame.x, Screen.height,Math.min(Screen.k_width, Screen.k_height), MenuItem.starts,2 * 30, frame.w / frame.h);
			Badges.height = Screen.height  / Math.min(Screen.k_width, Screen.k_height) - MenuItem.starts - 2 * 30;
			Badges.width = Badges.height * frame.w / frame.h;
			Badges.display = Math.floor((Screen.width / Math.min(Screen.k_width, Screen.k_height) - 20 * 2 - 2 * 20 - 2 * Display.getButton("left-arrow.png").w + 30) / (Badges.width + 30)) + 1;
			Badges.width = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - 20 * 2 - 2 * 20 - 2 * Display.getButton("left-arrow.png").w - 30 * (Badges.display - 1)) / Badges.display;
			Badges.height = Badges.width * frame.h / frame.w;
			console.log(Badges.width, Badges.height);
			
			Display.setButton("exit_btn.png", Display.getButton("right-arrow.png").x, MenuItem.starts + 20, Display.getButton("right-arrow.png").w, Display.getButton("right-arrow.png").w);
			setBadgesProp();
			
		}
		function showBadgesForm(){
			clearRect(0, 0, Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height));
			drawHeader();
			if(Badges.loadedRewards) {
				drawExitButton();
				console.log("recieved", Profile.Badges, Badges.All);
				for (var i = Badges.firstItem; i < Badges.display + Badges.firstItem && i < Badges.All.length; i++) {
					console.log(Badges.All[i]);
					drawBadge(i);
					//if(Badges.All[i])
				}
				if(Badges.firstItem + Badges.display + 1 <= Badges.All.length)
					drawRightArrow();
				if(Badges.firstItem)
					drawLeftArrow();
			} else{
				setTimeout(function(){
					showBadgesForm();
				}, 100)
			}
		}
		function showProgressForm() {
			console.log(Progress.Array)
			setProgressProp(Progress.Array[Progress.index].Type);
			clearRect(0, 0, Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height));
			drawExitButton();
			if(Progress.index)
				drawLeftArrow();
			if(Progress.Array.length > Progress.index + 1)
				drawRightArrow();
			drawProgressForm(Progress.Array[Progress.index].Type);
			drawHeader();
			console.log(Progress.Array[Progress.index]);
			switch(Progress.Array[Progress.index].Type) {
				case "Video":
					showProgressVideo();
					break;
				case "Matching"	:
					showProgressMatching();
			}
		}
		function showProgress() {
			document.getElementById("Loading").style.visibility = "hidden";
			ctx.clearRect(0,MenuItem.starts * Math.min(Screen.k_width, Screen.k_height), Screen.width, Screen.height);
			if(!document.getElementById("ProgressCanvas")) {
				var ProgressC = document.createElement('canvas');
				ProgressC.id = 'ProgressCanvas';
				ProgressC.width = document.getElementById("MainCanvas").width;
				ProgressC.height = document.getElementById("MainCanvas").height;
				document.getElementById("mainDiv").appendChild(ProgressC);
				ProgressCanvas = document.getElementById("ProgressCanvas");
			}
			ProgressCanvas.addEventListener("touchmove", checkPosProgress, false);
			ProgressCanvas.addEventListener("mousemove", checkPosProgress);
			ProgressCanvas.addEventListener("mousedown", MouseDown);
			ProgressCanvas.addEventListener("touchstart", MouseDown);
			ProgressCanvas.addEventListener("mouseup", checkClick);
			ProgressCanvas.addEventListener("touchend", checkClick);
			Progress_ctx = document.getElementById("ProgressCanvas").getContext("2d");
			
			var r_a_height = koef*100*226/152;
			var r_a_y =  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2;
			var r_a_width = koef*100;
			var r_a_x = MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width;
			
			size_btn = r_a_width;
			Display.setButton("exit_btn.png", r_a_x + r_a_width - size_btn, MenuItem.starts + 20, size_btn, size_btn);
			
			showProgressForm();
				
		}
		function setPropSettings() {
			console.log("settings");
			var frame = Properties.Forms["setting_form.png"];
			var SettingsForm_frame = {};
			
			SettingsForm_frame.h = Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.starts - 2 * 40;
			SettingsForm_frame.w = SettingsForm_frame.h * frame.w / frame.h;
			
			if(SettingsForm_frame.w > Screen.width / Math.min(Screen.k_width, Screen.k_height)- 2 * 20) {
				SettingsForm_frame.w = Screen.width / Math.min(Screen.k_width, Screen.k_height) - 2 * 20;
				SettingsForm_frame.h = SettingsForm_frame.w * frame.h / frame.w;
			}
			SettingsForm_frame.x = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - SettingsForm_frame.w) / 2;
			SettingsForm_frame.y = MenuItem.starts + (Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.starts - SettingsForm_frame.h) / 2;
			Display.setForm("setting_form.png", SettingsForm_frame.x, SettingsForm_frame.y, SettingsForm_frame.w, SettingsForm_frame.h);
			var save_btn = {};
			save_btn.x = Display.getForm("setting_form.png").x + 45 * Display.getForm("setting_form.png").w / frame.w;
			save_btn.y = Display.getForm("setting_form.png").y + Display.getForm("setting_form.png").h -  100 * Display.getForm("setting_form.png").h / frame.h;
			save_btn.w = Display.getForm("setting_form.png").x + Display.getForm("setting_form.png").w / 2 - 20 * Display.getForm("setting_form.png").w / frame.w - save_btn.x;
			save_btn.h = save_btn.w * Properties.Forms["sign_in_form_save_btn.png"].h / Properties.Forms["sign_in_form_save_btn.png"].w;
			Display.setButton("save_btn.png", save_btn.x, save_btn.y, save_btn.w, save_btn.h);
			
			var cancel_btn_ch = {};
			cancel_btn_ch.x = Display.getButton("save_btn.png").x +Display.getButton("save_btn.png").w + 40 * Display.getForm("setting_form.png").w / frame.w;
			cancel_btn_ch.y = Display.getButton("save_btn.png").y;
			cancel_btn_ch.w = Display.getButton("save_btn.png").w;
			cancel_btn_ch.h = Display.getButton("save_btn.png").h;
			Display.setButton("save_btn.png", save_btn.x, save_btn.y, save_btn.w, save_btn.h);
			Display.setButton("sign_in_form_cancel_btn_ch.png", cancel_btn_ch.x, cancel_btn_ch.y, cancel_btn_ch.w, cancel_btn_ch.h);
			if(document.getElementById("oldPassword") == null) {
			var div = document.createElement('inputDiv');
			div.innerHTML = "<input id = 'oldPassword' name = 'OldPassword' autofocus/><input id = 'newPassword' name = 'newPassword' autofocus/>";
			document.getElementById("mainDiv").appendChild(div);
			
			}
			document.getElementById("oldPassword").style.top = (Display.getForm("setting_form.png").y +  127 * Display.getForm("setting_form.png").h / frame.h) * Math.min(Screen.k_width, Screen.k_height);
			document.getElementById("oldPassword").style.left = (Display.getForm("setting_form.png").x + 90 * Display.getForm("setting_form.png").w / frame.w) * Math.min(Screen.k_width, Screen.k_height);
			document.getElementById("oldPassword").style.paddingLeft = (20 * Display.getForm("setting_form.png").w / frame.w) * Math.min(Screen.k_width, Screen.k_height);
			document.getElementById("oldPassword").style.paddingRight = (20 * Display.getForm("setting_form.png").w / frame.w) * Math.min(Screen.k_width, Screen.k_height);
			document.getElementById("oldPassword").style.width = (Display.getForm("setting_form.png").w - 185 * Display.getForm("setting_form.png").w / frame.w)*Math.min(Screen.k_width, Screen.k_height);
			document.getElementById("oldPassword").style.height = 45 * Display.getForm("setting_form.png").h / frame.h * Math.min(Screen.k_width, Screen.k_height);
			document.getElementById("oldPassword").style.border = "2px solid";
			document.getElementById('oldPassword').style.position = "absolute";
			document.getElementById('oldPassword').style.backgroundColor = "transparent";
			document.getElementById("newPassword").style.top = (Display.getForm("setting_form.png").y +  242 * Display.getForm("setting_form.png").h / frame.h) * Math.min(Screen.k_width, Screen.k_height);
			document.getElementById("newPassword").style.left = (Display.getForm("setting_form.png").x + 90 * Display.getForm("setting_form.png").w / frame.w) * Math.min(Screen.k_width, Screen.k_height);
			document.getElementById("newPassword").style.paddingLeft = (20 * Display.getForm("setting_form.png").w / frame.w) * Math.min(Screen.k_width, Screen.k_height);
			document.getElementById("newPassword").style.paddingRight = (20 * Display.getForm("setting_form.png").w / frame.w) * Math.min(Screen.k_width, Screen.k_height);
			document.getElementById("newPassword").style.width = (Display.getForm("setting_form.png").w - 185 * Display.getForm("setting_form.png").w / frame.w) * Math.min(Screen.k_width, Screen.k_height);
			document.getElementById("newPassword").style.height = 45 * Display.getForm("setting_form.png").h / frame.h * Math.min(Screen.k_width, Screen.k_height);
			document.getElementById("newPassword").style.border = "2px solid";
			document.getElementById('newPassword').style.position = "absolute";
			document.getElementById('newPassword').style.backgroundColor = "transparent";
			if(!Profile.LoggedIn) {
				document.getElementById('newPassword').disabled = true;
				document.getElementById('oldPassword').disabled = true;
			}
			Display.setButton("american_flag.png", Display.getForm("setting_form.png").x + 70 * Display.getForm("setting_form.png").w / frame.w, Display.getForm("setting_form.png").y + 350 * Display.getForm("setting_form.png").h / frame.h, 70 * Display.getForm("setting_form.png").h / frame.h, 50 * Display.getForm("setting_form.png").h / frame.h);
			Display.setButton("australian_flag.png", Display.getForm("setting_form.png").x + 160 * Display.getForm("setting_form.png").w / frame.w, Display.getForm("setting_form.png").y + 350 * Display.getForm("setting_form.png").h / frame.h, 70 * Display.getForm("setting_form.png").h / frame.h, 50 * Display.getForm("setting_form.png").h / frame.h);
			Display.setButton("british_flag.png", Display.getForm("setting_form.png").x + 250 * Display.getForm("setting_form.png").w / frame.w, Display.getForm("setting_form.png").y + 350 * Display.getForm("setting_form.png").h / frame.h, 70 * Display.getForm("setting_form.png").h / frame.h, 50 * Display.getForm("setting_form.png").h / frame.h);
			
			var log_out_btn = {};
			log_out_btn.x = Display.getButton("american_flag.png").x;
			log_out_btn.h = Display.getButton("save_btn.png").h;
			console.log(log_out_btn.h);
			log_out_btn.w = log_out_btn.h * Properties.Forms["log_out_btn.png"].w / Properties.Forms["log_out_btn.png"].h;
			log_out_btn.y = Display.getForm("setting_form.png").y + 700 * Display.getForm("setting_form.png").h / frame.h - log_out_btn.h;
			
			console.log("logoutbtn", log_out_btn, log_out_btn.h, save_btn.w * Properties.Forms["sign_in_form_save_btn.png"].h / Properties.Forms["sign_in_form_save_btn.png"].w);
			Display.setButton("log_out_btn.png", log_out_btn.x, log_out_btn.y, log_out_btn.w, log_out_btn.h);
		}
		function showSettingsForm() {
			document.getElementById("Loading").style.visibility = "hidden";
			console.log("showing settings form");
			clearRect(0, 0, Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height));
			drawHeader();
			setPropSettings();
			drawSettingsForm();
			drawSaveButton();
			drawSignInCancelButton();
			drawLogOutButton();
			if(flag == "")
				flag = getFlag();
			selectAccent(flag);	
			var frame = Properties.Forms["setting_form.png"];
			//fillRect(0, Display.getForm("setting_form.png").y + 700 * Display.getForm("setting_form.png").h / frame.h, 1000, 10);
			//fillRect(0, Display.getForm("setting_form.png").y + 350 * Display.getForm("setting_form.png").h / frame.h, 1000, 10);
			//fillRect(Display.getForm("setting_form.png").x + 70 * Display.getForm("setting_form.png").w / frame.w, 0, 10, 1000);
			//fillRect(Display.getForm("setting_form.png").x + 140 * Display.getForm("setting_form.png").w / frame.w, 0, 10, 1000);
			//fillRect(Display.getForm("setting_form.png").x + 160 * Display.getForm("setting_form.png").w / frame.w, 0, 10, 1000);
		}
		function setPropMessage(name) {
			console.log("message", name);
			var frame = Properties.Forms[name];
			console.log(frame);
			var MessageForm_frame = {};
			
			MessageForm_frame.h = Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.starts - 2 * 40 - 100;
			MessageForm_frame.w = MessageForm_frame.h * frame.w / frame.h;
			
			if(MessageForm_frame.w > Screen.width / Math.min(Screen.k_width, Screen.k_height)- 2 * 20 - 100) {
				MessageForm_frame.w = Screen.width / Math.min(Screen.k_width, Screen.k_height) - 2 * 20 - 100;
				MessageForm_frame.h = MessageForm_frame.w * frame.h / frame.w;
			}
			MessageForm_frame.x = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - MessageForm_frame.w) / 2;
			MessageForm_frame.y = MenuItem.starts + (Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.starts - MessageForm_frame.h) / 2;
			Display.setForm(name, MessageForm_frame.x, MessageForm_frame.y, MessageForm_frame.w, MessageForm_frame.h);
			var okay_btn = {};
			okay_btn.y = Display.getForm(name).y + Display.getForm(name).h -  20 * Display.getForm(name).h / frame.h;
			okay_btn.w = Display.getForm(name).w / 3;
			okay_btn.x = Display.getForm(name).x + (Display.getForm(name).w - okay_btn.w) / 2;
			okay_btn.h = okay_btn.w * Properties.Forms["result_form_okay_btn.png"].h / Properties.Forms["result_form_okay_btn.png"].w;
			Display.setButton("result_form_okay_btn.png", okay_btn.x, okay_btn.y, okay_btn.w, okay_btn.h);
			
			
		}
		function showMessageForm(name) {
			console.log("showing message form", name);
			clearRect(0, 0, Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height));
			drawHeader();
			setPropMessage(name);
			drawMessageForm(name);
			drawOkayButton();
		}
		function showSettings() {
			if(Forms_loaded){
				document.getElementById("Loading").style.visibility = "hidden";
				ctx.clearRect(0,MenuItem.starts * Math.min(Screen.k_width, Screen.k_height), Screen.width, Screen.height);
				if(!document.getElementById("SettingsCanvas")) {
					var SettingsC = document.createElement('canvas');
					SettingsC.id = 'SettingsCanvas';
					SettingsC.width = document.getElementById("MainCanvas").width;
					SettingsC.height = document.getElementById("MainCanvas").height;
					document.getElementById("mainDiv").appendChild(SettingsC);
					SettingsCanvas = document.getElementById("SettingsCanvas");
				}
				SettingsCanvas.addEventListener("touchmove", checkPosSettings, false);
				SettingsCanvas.addEventListener("mousemove", checkPosSettings);
				SettingsCanvas.addEventListener("mousedown", MouseDown);
				SettingsCanvas.addEventListener("touchstart", MouseDown);
				SettingsCanvas.addEventListener("mouseup", checkClick);
				SettingsCanvas.addEventListener("touchend", checkClick);
				Settings_ctx = document.getElementById("SettingsCanvas").getContext("2d");
				drawLoading();
				showSettingsForm(name);
			}
			else {
				setTimeout(function(){
					showSettings();
				}, 10);
			}
		}
		function showMessage(name) {
			if(Forms_loaded){
				document.getElementById("Loading").style.visibility = "hidden";
				ctx.clearRect(0,MenuItem.starts * Math.min(Screen.k_width, Screen.k_height), Screen.width, Screen.height);
				if(!document.getElementById("MessageCanvas")) {
					var MessageC = document.createElement('canvas');
					MessageC.id = 'MessageCanvas';
					MessageC.width = document.getElementById("MainCanvas").width;
					MessageC.height = document.getElementById("MainCanvas").height;
					document.getElementById("mainDiv").appendChild(MessageC);
					ProgressCanvas = document.getElementById("MessageCanvas");
				}
				MessageCanvas.addEventListener("touchmove", checkPosMessage, false);
				MessageCanvas.addEventListener("mousemove", checkPosMessage);
				MessageCanvas.addEventListener("mousedown", MouseDown);
				MessageCanvas.addEventListener("touchstart", MouseDown);
				MessageCanvas.addEventListener("mouseup", checkClick);
				MessageCanvas.addEventListener("touchend", checkClick);
				Message_ctx = document.getElementById("MessageCanvas").getContext("2d");
				
				
				showMessageForm(name);
			}
			else {
				setTimeout(function(){
					showMessage(name);
				}, 10);
			}
		}
		function showSignInForm(){
			if(Forms_loaded){
				Y_ = (MenuItem.topSpace + MenuItem.starts) / 2;
				size_ = 2*(Y_ - MenuItem.starts) + MenuItem.size;
				if(Screen.width/ Math.min(Screen.k_width, Screen.k_height) < size_) {
					size_ = Screen.width / Math.min(Screen.k_width, Screen.k_height) - 2 * 20;
					Y_ = (Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.starts - size_) / 2
				}
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (size_))/2;
				document.getElementById("Loading").style.visibility = "hidden";
				Display.setForm("sign_in_form.png", X_, Y_, size_, size_);
				Display.setButton("british_flag.png", X_ + 124 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23 / 368 * size_);
				Display.setButton("american_flag.png", X_ + 35 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23/ 368 * size_);
				Display.setButton("australian_flag.png", X_ + 80 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23 / 368 * size_);
				Display.setButton("profile_girl2.png", 100, 100, 100, 100);
				
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
				drawSignInForm();
				Display.setButton("sign_in_form_signin_btn.png", X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156);
				drawSignInSignInButton();
				Display.setButton("sign_in_form_cancel_btn_ch.png", X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156);
				drawSignInCancelButton();
				selectAccent(flag);
				ctx.fillStyle='#000000';
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
			drawSignInForm();
			ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
			if(NewAccent == "US English Female")
				AmericanAccent();
			if(NewAccent == "Australian Female")
				AustralianAccent();
			if(NewAccent == "UK English Male")
				BritishAccent();
			
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
				drawSignInForm();
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
		function selectAccent(new_flag) {
			flag = new_flag;
			Display.expandButton(flag, 5);
			if(Mode.SignIn)
				context = ctx;
			else if(Mode.Settings)
				context = Settings_ctx;
			context.beginPath();
			context.moveTo(Display.getButton(flag).x * Math.min(Screen.k_width, Screen.k_height), Display.getButton(flag).y * Math.min(Screen.k_width, Screen.k_height));
			context.lineTo(Display.getButton(flag).x * Math.min(Screen.k_width, Screen.k_height), Display.getButton(flag).y * Math.min(Screen.k_width, Screen.k_height) + Display.getButton(flag).h * Math.min(Screen.k_width, Screen.k_height));
			context.lineTo(Display.getButton(flag).x * Math.min(Screen.k_width, Screen.k_height) + Display.getButton(flag).w * Math.min(Screen.k_width, Screen.k_height), Display.getButton(flag).y * Math.min(Screen.k_width, Screen.k_height) + Display.getButton(flag).h * Math.min(Screen.k_width, Screen.k_height));
			context.lineTo(Display.getButton(flag).x * Math.min(Screen.k_width, Screen.k_height) + Display.getButton(flag).w * Math.min(Screen.k_width, Screen.k_height), Display.getButton(flag).y * Math.min(Screen.k_width, Screen.k_height));
			context.lineTo(Display.getButton(flag).x * Math.min(Screen.k_width, Screen.k_height), Display.getButton(flag).y * Math.min(Screen.k_width, Screen.k_height));
			context.stroke();
			Display.expandButton(flag, -5);
		}
		function AmericanAccent() {
			NewAccent = "US English Female";
		}
		function AustralianAccent() {
			NewAccent = "Australian Female";
		}
		function BritishAccent() {
			NewAccent = "UK English Male";
		}
		
		function displayVideo() {
			Task.Result.Start = new Date;
			
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
		}
		function PlaySong() {
			var size_btn = 70;
			Display.setButton("exit_btn.png", Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
			drawExitButton();
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
					var max_word_height = (MenuItem.ends - MenuItem.starts - 40 - animal_height - 40 - 2 * 20) / 2;
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
		function setItemsProp() {
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
			Display.setButton("itemImage", (Screen.width / Math.min(Screen.k_width, Screen.k_height) - Task.asked[frametype1].w*animal_height/Task.asked[frametype1].h) / 2, MenuItem.starts + (20 + 20), Task.asked[frametype1].w*animal_height/Task.asked[frametype1].h, animal_height);
			for(var i = 0; i < Task.test.length; i++) {
				var wordFrame = (Task.test.concat())[i][frametype2];
				if(frametype1 == "frame") {
					Display.setTestItem(i,(edge + center/2-wordFrame.w*word_height/wordFrame.h/2), top, wordFrame.w*word_height/wordFrame.h, word_height);
					if(i % 2){
						top = top + word_height + 30;
						edge = 0;
					}
					else edge = center;
				}
				else if(frametype1 == "Wordsframe") {
					Display.setTestItem(i, (edge + center/2-wordFrame.w*word_height/wordFrame.h/2), top, wordFrame.w*word_height/wordFrame.h, word_height);
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
			var frame = Properties.Buttons["skip.png"];
			Display.setButton("skip.png", Title.leftSpace + 20, MenuItem.starts + 20, size_btn * frame.w / frame.h, size_btn);
			drawTest();
		}
		function drawTest() {
			ctx.clearRect(0, MenuItem.starts * Math.min(Screen.k_width, Screen.k_height), Screen.width, Screen.height);
			//drawHeader();
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
			ctx.drawImage(atlas[Task.TopicName + frametype1],Task.asked[frametype1].x, Task.asked[frametype1].y, Task.asked[frametype1].w, Task.asked[frametype1].h, Display.getButton("itemImage").x*Math.min(Screen.k_width, Screen.k_height), Display.getButton("itemImage").y*Math.min(Screen.k_width, Screen.k_height), Display.getButton("itemImage").w*Math.min(Screen.k_width, Screen.k_height), Display.getButton("itemImage").h*Math.min(Screen.k_width, Screen.k_height));
			for(var i = 0; i < Task.test.length; i++) {
				var wordFrame = (Task.test.concat())[i][frametype2];
				if(k3 != i) {
					ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, Display.getTestItem(i).x*Math.min(Screen.k_width, Screen.k_height), Display.getTestItem(i).y*Math.min(Screen.k_width, Screen.k_height), Display.getTestItem(i).w*Math.min(Screen.k_width, Screen.k_height), Display.getTestItem(i).h*Math.min(Screen.k_width, Screen.k_height));
				}
			}
			drawExitButton();
			
			if(!Mode.Training) {
				var frame = Properties.Buttons["red-heart.png"];
				var i;
				for(i = 0; i < Task.tries; i++) {
					drawRedHeart(Title.leftSpace + 20 + (2/3*Display.getButton("exit_btn.png").w * frame.w / frame.h + 20) * i, MenuItem.starts + 20, 2/3*Display.getButton("exit_btn.png").w * frame.w / frame.h,2/3*Display.getButton("exit_btn.png").w)
				}
				for(i; i < 4; i++) {
					drawHeart(Title.leftSpace + 20 + (2/3*Display.getButton("exit_btn.png").w * frame.w / frame.h + 20) * i, MenuItem.starts + 20, 2/3*Display.getButton("exit_btn.png").w * frame.w / frame.h,2/3*Display.getButton("exit_btn.png").w)
				}
			}
			else {
				drawSkip();
			}
					
		}
		function getFlag() {
			if(Profile.Accent == "UK English Male")
				return "british_flag.png";
			if(Profile.Accent == "Australian Female")
				return "australian_flag.png"
			return "american_flag.png"
		}
		function setAccent() {
			if(flag == "american_flag.png")
				return "US English Female";
			if(flag == "australian_flag.png")
				return "Australian Female";
			return "UK English Male";
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
				//remove all helping gifs
				if(document.getElementById("Help")) {
					console.log(document.getElementsByTagName("HelpDiv"));
					document.getElementsByTagName("HelpDiv")[0].removeChild(document.getElementById("Help"));
					document.getElementById("mainDiv").removeChild(document.getElementsByTagName("HelpDiv")[0]);
				}
				if(document.getElementById("Help1")) {
					console.log(document.getElementsByTagName("HelpDiv"));
					document.getElementsByTagName("HelpDiv")[0].removeChild(document.getElementById("Help1"));
					document.getElementById("mainDiv").removeChild(document.getElementsByTagName("HelpDiv")[0]);
				}
				
			
				// menu button has been clicked
				if(!document.getElementById("MenuCanvas") && Mode.Mobile && !Mode.Menu && Mode.MenuItem && !Mode.Exercise && !Mode.Results && !Mode.SignIn && !Mode.LogIn && mouseInRect(Display.getButton("menu_btn.png"))) {
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
				else if(document.getElementById("MenuCanvas") && Mode.Mobile && Mode.Menu && mouseInRect(Display.getButton("menu_btn.png"))) {
					Mode.Menu = false;
					Mode.MenuItem = true;
					$("#MenuCanvas").remove();
					respondCanvas();
				}
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
					if(Mode.Tasks && !mouseInRect(Display.getTopic(MenuItem.clicked)) && !mouseInRect(Display.getButton("setting_btn.png"))){
						MenuItem.chosen = MenuItem.clicked;
						DrawMenuItem(MenuItem.clicked);
						MenuItem.clicked = -1;
						Mode.Tasks = false;
					}
				}
					
				//Menu Item has been clicked
				if(Mode.MenuItem && MenuItem.clicked == -1) {
					var j = 0;
					while (j < MenuItem.display)  {
						if(mouseInRect(Display.getTopic(j + MenuItem.firstItem))){
							if(Properties.Tasks[j + MenuItem.firstItem].length) {
								Task.firstTask = 0;
								MenuItem.clicked = j + MenuItem.firstItem;
								MenuItemClicked(MenuItem.clicked);
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
					if(mouseInRect(Display.getButton("left-arrow.png"))){
						leftArrowClicked();
					}
				}
					
				//right arrow has been clicked
				if(Mode.MenuItem && MenuItem.firstItem + MenuItem.display < MenuItem.itemsCount){
					if (mouseInRect(Display.getButton("right-arrow.png"))) {	
						rightArrowClicked();
					}
				}
				
				//right arrow clicked during progress mode
				if(Mode.Progress && Progress.Array.length > Progress.index + 1 && mouseInRect(Display.getButton("right-arrow.png"))) {
					Progress.index++;
					showProgressForm();
				}
				//left arrow clicked during progress mode
				if(Mode.Progress && Progress.index && mouseInRect(Display.getButton("left-arrow.png"))) {
					Progress.index--;
					showProgressForm();
				}
				//right arrow clicked during badges mode
				if(Mode.Badges && Badges.All.length >= Badges.firstItem + Badges.display + 1 && mouseInRect(Display.getButton("right-arrow.png"))) {
					clearRect(0, MenuItem.starts, Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height));
					console.log()
					Badges.firstItem++;
					setBadgesProp();
				}
				//left arrow clicked during badges mode
				if(Mode.Badges && Badges.firstItem && mouseInRect(Display.getButton("left-arrow.png"))) {
					clearRect(0, MenuItem.starts, Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height));
					Badges.firstItem--;
					setBadgesProp();
				}
				//Login button has been clicked
				if(((Mode.Mobile && Mode.Menu) || (!Mode.Mobile && Mode.MenuItem)) && !Mode.Exercise && !Profile.LoggedIn && !Mode.SignIn && !Mode.LogIn && mouseInRect(Display.getButton("login_btn.png"))) {
					console.log("login button clicked");
					if(document.getElementById("MenuCanvas"))
						$("#MenuCanvas").remove();
					Mode.Menu = false;
					respondCanvas();
					drawLoading();
					if(Forms_loaded == false)
						loadForms();
					showLogInForm();
				}
				//Sign Up button has been clicked
				if(((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.Exercise &&!Profile.LoggedIn && !Mode.LogIn && !Mode.LogIn && mouseInRect(Display.getButton("sign_in_btn.png"))) {
					drawLoading();
					if(Forms_loaded == false)
						loadForms();
					if(document.getElementById("MenuCanvas"))
						$("#MenuCanvas").remove();
					Mode.Menu = false;
					respondCanvas();
					showSignInForm();
					
				
					//Profile.UserName = "Username"
					Profile.UserName = "";
					//Profile.Password = "Password"
					Profile.Password = "";
				}
				//Settings button is clicked
				if(((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.LogIn && !Mode.SignIn && mouseInRect(Display.getButton("setting_btn.png"))) {
					console.log("clicked settings button");
					clearRect(0, 0, Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height));
					drawLoading();
					if(Forms_loaded == false)
						loadForms();
					Mode.MenuItem = false;
					Mode.Exercise = false;
					Mode.Tasks = false;
					Mode.Menu = false;
					Mode.Settings = true;
					flag = "";
					if(document.getElementById("MenuCanvas"))
						$("#MenuCanvas").remove();
					showSettings();
				}
				//cancel button clicked during Settings
				if (Mode.Settings && mouseInRect(Display.getButton("sign_in_form_cancel_btn_ch.png"))) {
					setTimeout(function(){
					$("#SettingsCanvas").remove();
					$("inputdiv").remove();
					$("#oldPassword").remove();
					$("#newPassword").remove();
					Mode.MenuItem = true;
					Mode.Settings = false;
					
					respondCanvas();
					}, 100);
				}
				
				//badge has been clicked
				if(Mode.Badges && mouseInRect({x:0, y: MenuItem.starts, w: Screen.width / Math.min(Screen.k_width, Screen.k_height), h: Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.starts})){
					console.log("clicked");
					var i = Badges.firstItem;
					while(i < Badges.display + Badges.firstItem) {
						if(mouseInRect(Display.getBadge(Badges.All[i].Name))) {
							console.log(Badges.All[i].Name);
							speak(Badges.All[i].Name + ". You have" + Badges.All[i].Reason.Reason);
							i = Badges.display  + Badges.firstItem + 1;
						}
						else
							i++;
					}
				}
				//help clicked during badge mode
				if(Mode.Badges && mouseInRect(Display.getButton("help_btn.png"))) {
					console.log("help has been clicked");
					if(!document.getElementById("Help")) {
							var div = document.createElement('HelpDiv');
							div.innerHTML = '<image id = "Help"></image>';
							document.getElementById("mainDiv").appendChild(div);
						}
					var Help = document.getElementById("Help");
					Help.src = "/img/Menu-Items/mouse_up.gif";
					Help.style.position = "absolute";
					Help.style.height = Display.getBadge(Badges.All[0].Name).h / 4 * Math.min(Screen.k_width, Screen.k_height);
					Help.style.width = "auto";
					Help.style.top = (Display.getBadge(Badges.All[0].Name).y + Display.getBadge(Badges.All[0].Name).h / 2) * Math.min(Screen.k_width, Screen.k_height);
					Help.style.left = (Display.getBadge(Badges.All[0].Name).x + Display.getBadge(Badges.All[0].Name).w / 2) * Math.min(Screen.k_width, Screen.k_height);
					Help.style.visibility = "visible";
					
				}
				
				//save button clicked during Settings
				if (Mode.Settings && mouseInRect(Display.getButton("save_btn.png"))) {
					console.log("old Accent",Profile.Accent);
					Profile.Accent = setAccent();
					console.log("new Accent",Profile.Accent);
					if(Profile.LoggedIn) {
						if(document.getElementById("oldPassword").value != "" && document.getElementById("newPassword").value != "") {
							if(document.getElementById("oldPassword").value != document.getElementById("newPassword").value) {
								var User = {};
								User.UserName = Profile.UserName;
								User.oldPassword = document.getElementById("oldPassword").value;
								User.newPassword = document.getElementById("newPassword").value;
								console.log(User);
								socket.emit("resetPassword", {user: User})
								socket.on("resetPassword", function(data){
									console.log("result", data.res);
									if(data.res == "everything is okay, password has been reset") {
										setTimeout(function() {
											Mode.MenuItem = true;
											Mode.Settings = false;
											$("#SettingsCanvas").remove();
											$("inputdiv").remove();
											$("#oldPassword").remove();
											$("#newPassword").remove();
											console.log("menuitem", Mode.MenuItem);
											respondCanvas();
										}, 100);
										console.log("new accent", Profile.Accent);
									}
								})
								
							}
							else {
								console.log("new password should be the same as current one");
							}
						}
						else {
							console.log("empty gaps");
							
							setTimeout(function() {
							Mode.MenuItem = true;
							Mode.Settings = false;
							//update accent in database!!!!!
							$("#SettingsCanvas").remove();
							$("inputdiv").remove();
							$("#oldPassword").remove();
							$("#newPassword").remove();
							console.log("menuitem", Mode.MenuItem);
							
							respondCanvas();
							}, 100);
							
						}
						socket.emit("updateAccent", {UserName: Profile.UserName, Accent: Profile.Accent});
					}
					else {
						console.log("no reseting password");
						setTimeout(function() {
						Mode.MenuItem = true;
						Mode.Settings = false;
						//update accent in database!!!!!
						$("#SettingsCanvas").remove();
						$("inputdiv").remove();
						$("#oldPassword").remove();
						$("#newPassword").remove();
						console.log("menuitem", Mode.MenuItem);
						
						respondCanvas();
						}, 100);
					
					}
					
					
					
				}
				//okay button has been clicked during message
				if (Mode.Message && mouseInRect(Display.getButton("result_form_okay_btn.png"))) {
					$("#MessageCanvas").remove;
					
					if(Error.Mode == "sign_in_form") {
						setTimeout(function(){
							$("#MessageCanvas").remove();
							Mode.Message = false;
							Mode.SignIn = true;
							respondCanvas();
							showSignInForm();
							if(!document.getElementById("Help")) {
								var div = document.createElement('HelpDiv');
								div.innerHTML = '<image id = "Help"></image>';
								document.getElementById("mainDiv").appendChild(div);
							}
							var Help = document.getElementById("Help");
							Help.src = "/img/Menu-Items/mouse_up.gif";
							Help.style.position = "absolute";
							Help.style.height = document.getElementById("UserName").style.height;
							Help.style.width = "auto";
							Help.style.top = document.getElementById("UserName").style.top;
							Help.style.left = document.getElementById("UserName").style.left;
							Help.style.visibility = "visible";
						
							if(!document.getElementById("Help1")) {
								var div = document.createElement('HelpDiv');
								div.innerHTML = '<image id = "Help1"></image>';
								document.getElementById("mainDiv").appendChild(div);
							}
							var Help = document.getElementById("Help1");
							Help.src = "/img/Menu-Items/mouse_up.gif";
							Help.style.position = "absolute";
							Help.style.height = document.getElementById("Password").style.height;
							Help.style.width = "auto";
							Help.style.top = document.getElementById("Password").style.top;
							Help.style.left = document.getElementById("Password").style.left;
							Help.style.visibility = "visible";
							
						}, 100)
					}
					else if(Error.Mode == "log_in_form") {
						setTimeout(function(){
							$("#MessageCanvas").remove();
						Mode.Message = false;
						Mode.LogIn = true;
						respondCanvas();
						showLogInForm();
						if(!document.getElementById("Help")) {
							var div = document.createElement('HelpDiv');
							div.innerHTML = '<image id = "Help"></image>';
							document.getElementById("mainDiv").appendChild(div);
						}
						var Help = document.getElementById("Help");
						Help.src = "/img/Menu-Items/mouse_up.gif";
						Help.style.position = "absolute";
						Help.style.height = document.getElementById("UserName").style.height;
						Help.style.width = "auto";
						Help.style.top = document.getElementById("UserName").style.top;
						Help.style.left = document.getElementById("UserName").style.left;
						Help.style.visibility = "visible";
					
						if(!document.getElementById("Help1")) {
							var div = document.createElement('HelpDiv');
							div.innerHTML = '<image id = "Help1"></image>';
							document.getElementById("mainDiv").appendChild(div);
						}
						Help = document.getElementById("Help1");
						Help.src = "/img/Menu-Items/mouse_up.gif";
						Help.style.position = "absolute";
						Help.style.height = document.getElementById("Password").style.height;
						Help.style.width = "auto";
						Help.style.top = document.getElementById("Password").style.top;
						Help.style.left = document.getElementById("Password").style.left;
						Help.style.visibility = "visible";
						
						}, 100)
					}
					else if(Error.Mode = "progress_form") {
						setTimeout(function(){
							$("#MessageCanvas").remove();
							Mode.Message = false;
							Mode.MenuItem = true;
							respondCanvas();
							//showing hand to login
							//######
							if(Error.Name == "need_to_loginProgress") {
								if(!Mode.Mobile) {
									var div = document.createElement('HelpDiv');
									div.innerHTML = '<image id = "Help"></image>';
									document.getElementById("mainDiv").appendChild(div);
									var Help = document.getElementById("Help");
									Help.src = "/img/Menu-Items/mouse_up.gif";
									Help.style.position = "absolute";
									Help.style.height = 2 * Display.getButton("login_btn.png").h * Math.min(Screen.k_width, Screen.k_height);
									Help.style.width = "auto";
									Help.style.top = Display.getButton("login_btn.png").y * Math.min(Screen.k_width, Screen.k_height);
									Help.style.left = Display.getButton("login_btn.png").x * Math.min(Screen.k_width, Screen.k_height);
									Help.style.visibility = "visible";
								}
							}
						}, 100)
					}
					delete Error.Name;
					delete Error.Mode;
					
				}
				//log out btton clicked during Settings
				if (Mode.Settings && Profile.LoggedIn && mouseInRect(Display.getButton("log_out_btn.png"))){
					socket.emit("Logout", {});
					socket.on("Logout", function(data){
						if(data.res) {
							setTimeout(function(){
							$("#SettingsCanvas").remove();
							$("inputdiv").remove();
							$("#oldPassword").remove();
							$("#newPassword").remove();
							Mode.MenuItem = true;
							Mode.Settings = false;
							Profile.LoggedIn = false;
							respondCanvas();
							}, 100);
						}
					})
				}
				if(Mode.Settings) {
					var i = 0;
					if(flag == "")
						flag = getFlag();
					console.log("getflag", flag);
					var new_flag = flag;
					while(i < flags.length) {
						if(mouseInRect(Display.getButton(flags[i]))){
							if(flags[i] == "american_flag.png")
								NewAccent = "US English Female";
							else if(flags[i] == "australian_flag.png")
								NewAccent = "Australian Female";
							if(flags[i] == "british_flag.png")
								NewAccent = "UK English Male";
							new_flag = flags[i];
							i = flags.length + 1;
						}
						else
							i = i + 1;
					}
					if(new_flag != flag) {
						console.log("selected new accent");
						flag = new_flag;
						console.log("new flag", new_flag, flag);
						showSettingsForm();
					}
				}	
				if(Mode.LogIn) {
					if(Mode.LogIn && mouseInRect((Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size *4/3) / 205 * 368)/2, MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size * 4/3) / 2, (MenuItem.size *4/3) / 205 * 368, MenuItem.size * 4/3)) {
						//log in area clicked
					}
					
					//cancel button has been clicked during login mode
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
					Y_ = MenuItem.starts + (MenuItem.ends - MenuItem.starts - MenuItem.size) / 2;
					if(Mode.LogIn && mouseInRect(Display.getButton("log_in_form_cancel_btn_ch.png"))) {
						setTimeout(function(){
						if(Profile.storeUserNameLogIn == true)
							Profile.storeUserNameLogIn = false;
						if(Profile.storePasswordLogIn == true)
							Profile.storePasswordLogIn = false;
						Profile.UserName = "";
						Profile.Password = "";
						$("#UserName").remove();
						$("#Password").remove();
						$("inputdiv").remove();
						
						clearScreenRect(0, 0, Screen.width/ Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height) )
						Mode.LogIn = false;
						Mode.MenuItem = true;
						Mode.Menu = false;
						$("#MenuCanvas").remove();
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
								console.log("res", data.res);
								if(data.res) {
									ok = true;
									Profile.Accent = data.User.Accent;
									Profile.Points = data.User.Points;
									Profile.Max_points = data.User.Max_points;
									Profile.LoggedIn = true;
									Mode.LogIn = false;
									Mode.MenuItem = true;
									clearScreenRect(0, 0, Screen.width/ Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height) )
									$("#UserName").remove();
									$("#Password").remove();
									$("inputdiv").remove();
									delete Profile.Password;
									$("#MenuCanvas").remove();
									Mode.Menu = false;
									respondCanvas();
								}
								else if(data.res == false) {
									console.log("res is false", data.res);
									if(ok == undefined) {
										ok = false;
										console.log("Wrong data");
										Mode.Message = true;
										Mode.LogIn = false;
										$("inputdiv").remove();
										$("#UserName").remove();
										$("#Password").remove();
										Error.Name = "incorrect-data";
										Error.Mode = "log_in_form";
										showMessage("incorrect-data.png");
										
									}
								}
								
							});
						}
						else {
							console.log("fill all the information");
							Mode.Message = true;
							Mode.LogIn = false;
							console.log("Mode.MenuItem", Mode.MenuItem);
							Error.Name = "enter-all-data";
							Error.Mode = "log_in_form";
							$("inputdiv").remove();
							$("#UserName").remove();
							$("#Password").remove();
							showMessage("enter-all-data.png");
						}
					}
					//background has been clicked during LogIn Mode
					/*if(Mode.LogIn && !mouseInRect(X_ + 47 - 2, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40 - 2, (MenuItem.size) / 202 * 156 + 4, MenuItem.size * 37 / 202 + 4)&& !(mouseInRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 115 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size) || mouseInRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size))) {
						if(Profile.storeUserNameLogIn == true)
							Profile.storeUserNameLogIn = false;
						if(Profile.storePasswordLogIn == true)
							Profile.storePasswordLogIn = false;
					}*/
				}
				if(Mode.SignIn){
					//username area clicked SignIn Mode
					
					if(Mode.SignIn) {
						var i = 0;
						var new_flag = flag; 
						while(i < flags.length) {
							if(mouseInRect(Display.getButton(flags[i]))){
								if(flags[i] == "american_flag.png")
									NewAccent = "US English Female";
								else if(flags[i] == "australian_flag.png")
									NewAccent = "Australian Female";
								if(flags[i] == "british_flag.png")
									NewAccent = "UK English Male";
								new_flag = flags[i];
								i = flags.length + 1;
							}
							else
								i = i + 1;
						}
						if(new_flag != flag) {
							drawSignInForm();
							drawSignInCancelButton();
							drawSignInSignInButton();
							selectAccent(new_flag);
						}
					}
					//Cancel button clicked SignIn Mode
					if (Mode.SignIn && mouseInRect(Display.getButton("sign_in_form_cancel_btn_ch.png"))) {
						setTimeout(function(){
						Mode.SignIn = false;
						Mode.MenuItem = true;
						Mode.Menu = false;
						NewAccent = "UK English Male";
						if(Profile.storeUserNameSignIn == true)
							Profile.storeUserNameSignIn = false;
						if(Profile.storePasswordSignIn == true)
							Profile.storePasswordSignIn = false;
						Profile.UserName = "";
						Profile.Password = "";
						$("#UserName").remove();
						$("#Password").remove();
						$("inputdiv").remove();
						clearScreenRect(0, 0, Screen.width/ Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height) )
						respondCanvas();
						}, 200);
					}
					
					//Signin button clicked SignIn mode
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
									Mode.Menu = false;
									Profile.Accent = NewAccent;
									Profile.Points = 0;
									Profile.Max_points = 0;
									
									clearScreenRect(0, 0, Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height) )
									$("#UserName").remove();
									$("#Password").remove();
									$("inputdiv").remove();
									
									respondCanvas();
								}
								else if(!data.res) {
									if(ok == undefined) {
										ok = false;
										document.getElementById("Loading").style.visibility = "hidden";
										alert("This user name is already taken");
									}
								}
								
							})
							
						}
						else {
							console.log("Fill all information");
							Mode.Message = true;
							Mode.SignIn = false;
							$("inputdiv").remove();
							$("#UserName").remove();
							$("#Password").remove();
							Error.Name = "enter-all-data";
							Error.Mode = "sign_in_form";
							showMessage("enter-all-data.png");
						}
					}
				}}
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
						
						//drawTest();
						setItemsProp();
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
							
							Quiz.Total = Quiz.Total + Task.Result.Answers.length;
							Quiz.Correct = Quiz.Correct + countCorrect(Task.Result.Answers);
							Quiz.Points = Quiz.Points + countPoints(Task.Result.Answers, Task.Result.Answers.length, Quiz.Content[Exercise_num].Max_point);
							Quiz.TotalMax = Quiz.TotalMax + Task.Result.Answers.length * Quiz.Content[Exercise_num].Max_point;
							console.log("adding points up", Quiz,  Task.Result.Answers.length * Quiz.Content[Exercise_num].Max_point);
							Profile.Points = Profile.Points + Quiz.Points;
							Profile.Max_points = Profile.Max_points +  Task.Result.Answers.length * Quiz.Content[Exercise_num].Max_point;
							Mode.Results = false;
							delete Task.Frames[Task.TaskName];
							ctx.clearRect(0, MenuItem.starts * Math.min(Screen.k_width, Screen.k_height), Screen.width, (MenuItem.ends - MenuItem.starts) * Math.min(Screen.k_width, Screen.k_height));
							
							Exercise_num++;
							if(Exercise_num < Quiz.Content.length)
								showTask(Quiz.Content[Exercise_num].Name, Quiz.Content[Exercise_num].Topic_Name, Quiz.Content[Exercise_num].Type, Quiz.Content[Exercise_num].Max_point, Quiz.Content[Exercise_num].Content.length, -1, Quiz.Content[Exercise_num].Content);
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
								Task.Result.Type = Task.Type;
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
								Task.Result.Type = Task.Type;
							};
							setTest(Task.Frames[TaskName].concat(), N);
						}
						catch(e) {
							setTimeout(function() {
								checkloaded.Numbers(TaskName, N);
							}, 200);
							
						}
					}
					else {setTimeout(function(){
							checkloaded.Numbers(TaskName, N);
						}, 200)
					}
				}
				function showTask(TaskName, TopicName, Type, Points, N, j = -1, QuizArray = []) {
					Task.Result = {};
					Mode.CountDown = false;
					Task.TaskName = TaskName;
					Task.TopicName = TopicName;
					Task.MaxPoint = Points;
					Task.N_toTest = N;
					Task.Type = Type;
					
					if(Profile.LoggedIn) {
						Task.Result.UserName = Profile.UserName;
						Task.Result.Exercise = TaskName;
						Task.Result.Topic_Name = Task.TopicName;
						Task.Result.Type = Type;
					};
					if(Mode.Quiz) {
						Task.Frames[TaskName] = QuizArray;
						Mode.Training = false;
					}
					k2 = -1;
					k3 = -1;
					word_ch = false;
					switch(TaskName) {
						case 'Alphabet song':
							if(Profile.LoggedIn) {
								Task.Result.UserName = Profile.UserName;
								Task.Result.Exercise = TaskName;
								Task.Result.Topic_Name = Task.TopicName;
								Task.Result.Type = Type;
							};
							Mode.MusicVideo = true;
							Mode[Task.TaskName.replace(/\s/g,'')] = true;
							socket.emit('getVideoID', {
								TaskName: TaskName,
								Accent: Profile.Accent,
							})
							socket.on('getVideoID', function(data){
								Task.Frames[Task.TaskName] = data.Content;
								Task.Result.Duration = Task.Frames[Task.TaskName].Duration;
								Task.Result.Type = Type;
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
							drawExitButton();
							
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
							Display.setButton("exit_btn.png", Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
							drawExitButton();
							
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
							Display.setButton("exit_btn.png", Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
							drawExitButton();
							
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
							Display.setButton("exit_btn.png", Screen.width / Math.min(Screen.k_width, Screen.k_height) - Title.leftSpace - size_btn, MenuItem.starts + 20, size_btn, size_btn);
							drawExitButton();
							
							break;
							
							case 'Animals song':
								if(Profile.LoggedIn) {
									Task.Result.UserName = Profile.UserName;
									Task.Result.Exercise = TaskName;
									Task.Result.Topic_Name = Task.TopicName;
									Task.Result.Type = Type;
								};
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
								if(Profile.LoggedIn) {
									Task.Result.UserName = Profile.UserName;
									Task.Result.Exercise = TaskName;
									Task.Result.Topic_Name = Task.TopicName;
									Task.Result.Type = Type;
								};
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
								if(Profile.LoggedIn) {
									Task.Result.UserName = Profile.UserName;
									Task.Result.Exercise = TaskName;
									Task.Result.Topic_Name = Task.TopicName;
									Task.Result.Type = Type;
								};
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
				if (Mode.Exercise && Mode.MusicVideo && !Mode.SignIn && !Mode.LogIn && mouseInRect(Display.getButton("exit_btn.png"))) {
					Mode.MenuItem = true;
					Mode.Exercise = false;
					$("Video").remove();
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
						console.log(Task.MaxPoint, Task.Result.Finish, Task.Result.Start, Task.Frames[Task.TaskName].Duration);
						Points = Math.floor(Task.MaxPoint * (Task.Result.Finish - Task.Result.Start) / 1000 / Task.Frames[Task.TaskName].Duration);
						Task.Result.Max_point = Task.MaxPoint;
						Task.Result.Duration = Task.Frames[Task.TaskName].Duration;
						console.log("adding points up", Points, Task.Result.Max_point, Task.MaxPoint, Task.Result.Finish - Task.Result.Start, Task.Frames[Task.TaskName].Duration, Math.floor(Task.MaxPoint * (Task.Result.Finish - Task.Result.Start) / 1000 / Task.Frames[Task.TaskName].Duration));
						if(Points < Task.MaxPoint)
							Task.Result.Points = Points;
						else
							Task.Result.Points = Task.MaxPoint;
						Profile.Points = Profile.Points + Task.Result.Points;
						Profile.Max_points = Profile.Max_points + Task.Result.Max_point;
						console.log(Task.Result);
						socket.emit("Result", {Result: Task.Result});
					}
					Task.Result = {};
				}
				//exit button has been clicked during Badges Mode
				if(Mode.Badges && mouseInRect(Display.getButton("exit_btn.png"))) {
					if(document.getElementById("BadgesCanvas")){
						Mode.Badges = false;
						var child = document.getElementById("BadgesCanvas");
						document.getElementById("mainDiv").removeChild(child);
					}
					Mode.MenuItem = true;
					respondCanvas();
				}
				
				//task has been clicked
				if(Mode.Tasks) {
					var j = MenuItem.clicked;
					var i = 0;
					while (i < Task.display)  {
						var pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
						var pY =  MenuItem.topSpace;
						var t_a_width = 100*0.5;
						var t_a_height = 0.5*100*226/152;
						if(mouseInRect(Display.getTask(j, i))){
							
							try{
								Mode.Exercise = true;
								clearRect(0, MenuItem.starts, Screen.width/ Math.min(Screen.k_width, Screen.k_height), MenuItem.ends)
								Mode.Tasks = false;
								Mode.MenuItem = false;
								document.getElementById("Explaining").style.visibility = "hidden";
								console.log(Properties.Tasks[j][Task.firstTask + i]);
								showTask(Properties.Tasks[j][Task.firstTask + i].Name, Properties.Tasks[j][Task.firstTask + i].Topic_Name, Properties.Tasks[j][Task.firstTask + i].Type, Properties.Tasks[j][Task.firstTask + i].Max_point, Properties.Tasks[j][Task.firstTask + i].N_toTest, j);						
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
					
					Task.Result.Max_point = Task.MaxPoint * Task.N_toTest;
					console.log("adding points up", Task.Result.Points, Task.Result.Max_points);
					
					/*if(!Mode.Training) {
						Profile.Points = Profile.Points + Task.Result.Points;
						Profile.Max_points = Profile.Max_points + Task.Result.Max_points;
					}*/
					if(Profile.LoggedIn && !Mode.Training){
						socket.emit("Result", {Result: Task.Result});
						
					}
					Task.Result = {};
				}
				//MatchTheAnimalsWithTheirNames word has been clicked
				if ((!Mode.Menu && !Mode.CountDown && !Mode.Results && Mode.Exercise && !Mode.MusicVideo) && !Mode.SignIn && !Mode.LogIn) {
					try {
						if((Mode.Exercise && !Mode.MusicVideo) &&k3 != -1) {
							drawHeader();
							clearRect(0, MenuItem.starts, Screen.width/ Math.min(Screen.k_width, Screen.k_height), Screen.height/ Math.min(Screen.k_width, Screen.k_height));
							if(mouseInRect(Display.getButton("itemImage"))) {
								Task.tries--;
								var correct = checkAnswer(k3);
								if(correct){
									if(Task.TopicName != "Numbers")
										speak("It is a " + Task.test[k3].Word);
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
										if(Task.TopicName != "Numbers")
											speak("It is not a " + Task.test[k3].Word);
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
											speak("It is a " + Task.asked.Word);
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
						var i = checkPoint({x:mouseX, y:mouseY}, Display.getTestItems());
						if(i < Display.getTestItems().length) {
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
					if (!Mode.Quiz && Mode.Results && !Mode.SignIn && !Mode.LogIn && mouseInRect(Display.getButton("result_form_try_again_btn.png"))) {
						Task.Result = {};
						Mode[Task.TaskName.replace(/\s/g,'')] = true;
						Mode.Results = false;
						Task.Result = {};
						if(Profile.LoggedIn) {
							Task.Result.UserName = Profile.UserName;
							Task.Result.Exercise = Task.TaskName;
							Task.Result.Topic_Name = Task.TopicName;
							Task.Result.Type = Task.Type;
						};
						
						showTask(Task.TaskName, Task.TopicName, Task.Type, Task.MaxPoint, Task.N_toTest);
						
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
					
					
					//okay button has been clicked in show results
					if (Mode.Results && !Mode.SignIn && !Mode.LogIn && mouseInRect(Display.getButton("result_form_okay_btn.png"))) {
						
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
					
					if (!Mode.Quiz && Mode.Training && (Mode.Exercise && !Mode.MusicVideo) && !Mode.SignIn && !Mode.LogIn && mouseInRect(Display.getButton("skip.png"))) {
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
				
				//Quiz has been clicked
				if(((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.Results && !Mode.Settings && !Mode.Exercise && mouseInRect(Display.getButton("quiz_btn.png"))) {
					if(Profile.LoggedIn) {
						drawLoading();
						socket.emit('getQuiz', {
							UserName: Profile.UserName
						});
						socket.on('getQuiz', function(data) {
							if(data.quiz) {
								if(document.getElementById("MenuCanvas"))
									$("#MenuCanvas").remove();
								Mode.Menu = false;
								respondCanvas();
								Mode.Quiz = true;
								Mode.Menu = false;
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
									showTask(Quiz.Content[Exercise_num].Name, Quiz.Content[Exercise_num].Topic_Name, Task.Type, Quiz.Content[Exercise_num].Max_point, Quiz.Content[Exercise_num].Content.length, -1, Quiz.Content[Exercise_num].Content);
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
				if (((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.Settings && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn && mouseInRect(Display.getButton("rewards_btn.png"))) {
					if(Profile.LoggedIn) {
						drawLoading();
						socket.emit("Badges", {
							username: Profile.UserName
						});
						socket.on("Badges", function(data){
							console.log("res", data);
							Badges.All = data.Badges.All;
							Profile.Badges = data.Badges.Recieved;
							console.log(Badges);
								if(!Badges.loadedRewards)
									loadBadges();
								Mode.MenuItem = false;
								Mode.Menu = false;
								Mode.Badges = true;
								Badges.firstItem = 0;
								showBadges();
						})
					}
					else {
						alert("need to login");
					}
					console.log("Rewards are not available yet:(");
				}
				//progress button has been clicked
				if (((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) &&  !Mode.Settings && !Mode.Exercise  &&!Mode.LogIn && !Mode.SignIn && mouseInRect(Display.getButton("progress_btn.png"))) {
					if(Profile.LoggedIn) {
						Progress.Array = [];
						
						if(Mode.Menu) {
							Mode.Menu = false;
							$("#MenuCanvas").remove();
						}
						Progress.index = 0;
						drawLoading();
						socket.emit('progress', {
							UserName: Profile.UserName,
							filter: 3
						})
						socket.on('progress', function(data){
							Progress.Array = data.progress;
							//console.log(Progress.Array);
							//setProgressProp();
							if(Progress.Array.length) {
								Progress.index =  0;
								Mode.Progress = true;
						Mode.MenuItem = false;
						Mode.Tasks = false;
						showProgress();
							}
							else
							{
								setTimeout(function(){
								document.getElementById("Loading").style.visibility = "hidden";
								console.log("No exercises have been finished");
								console.log("You have to be logged in to get progress");
								Mode.Message = true;
								Mode.MenuItem = false;
								Error.Name = "need_to_do_exerciseProgress";
								Error.Mode = "progress_form";
								showMessage("need_to_do_exerciseProgress.png");
								}, 100);
							}
						})
						
						
					}
					else {
						console.log("You have to be logged in to get progress");
						Mode.Message = true;
						Mode.MenuItem = false;
						if(document.getElementById("MenuCanvas")){
							Mode.Menu = false;
							var child = document.getElementById("MenuCanvas");
							document.getElementById("mainDiv").removeChild(child);
						}
							
						Error.Name = "need_to_loginProgress";
						Error.Mode = "progress_form";
						showMessage("need_to_loginProgress.png");
					}
				}
				if(Mode.Progress && mouseInRect(Display.getButton("exit_btn.png"))) {
					$("#ProgressCanvas").remove();
					Mode.MenuItem = true;
					Mode.Progress = false;
					respondCanvas();
				}
				//phrases button has been clicked
				if (((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.Settings && !Mode.Exercise &&!Mode.LogIn && !Mode.SignIn && mouseInRect(Display.getButton("phrase_of_the_day_btn.png"))) {
					alert("Phrases are not available yet:(");
				}
				//help button has been clicked
				if (((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.LogIn && !Mode.SignIn && mouseInRect(Display.getButton("help_btn.png"))) {
					alert("Help is not available yet:(");
				}
				//info button has been clicked
				if (((!Mode.Mobile && Mode.MenuItem) || (Mode.Mobile && Mode.Menu)) && !Mode.LogIn && !Mode.SignIn && mouseInRect(Display.getButton("info_btn.png"))){
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
						var i = checkPoint({x:mouseX, y:mouseY}, Display.getTestItems());
						if(i < Display.getTestItems().length) {
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
							if(Mode.Training) {
								drawTest();
								var wordFrame = (Task.test.concat())[k3][frametype2];
								ctx.drawImage(atlas[Task.TopicName + frametype2], wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Display.getTestItem(k3)).x*Math.min(Screen.k_width, Screen.k_height), (Display.getTestItem(k3).y)*Math.min(Screen.k_width, Screen.k_height), (Display.getTestItem(k3).w)*Math.min(Screen.k_width, Screen.k_height), (Display.getTestItem(k3).h)*Math.min(Screen.k_width, Screen.k_height));
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
	loading.loadedLoading;
	function loadLoading(){
		loading.src = '/img/Loading/loading.png';
		loading.addEventListener("load", function() {
			loading.loadedLoading = true;
		})
	}
	function drawLoading(){
		console.log("drawing loading gif");
		document.getElementById("Loading").style.visibility = "visible";
	}
	var current = 0;
	loadLoading();
	//try {
		loadButtons();
		loadMenuItems();
		loadNumbers();
		loadLetters();
		loadForms();
	//}
	//catch(e){}
	var Properties = {};
	Properties.Topics = [];
	Profile.LoggedIn = false;
	socket.on('Old session', function(data) {
		Profile.UserName = data.user.UserName;
		Profile.Accent = data.user.Accent;
		Profile.Points = data.user.Points;
		Profile.Max_points = data.user.Max_points;
		Profile.LoggedIn = true;
	})
	
	function displayMenu() {
		try{
			console.log(Properties);
			var frame = Properties.Buttons["left-arrow.png"].frame;
			frame = Properties.Numbers["small-dark-9.png"].frame;
			if(Properties.Tasks.length && Properties.Topics.length) {
				document.getElementById("Loading").style.visibility = "hidden";
				
				MenuItem.ItemList = [];
				MenuItem.itemsCount = (Properties.Topics).length;
				for (i = 0; i < MenuItem.itemsCount; i++) {
					MenuItem.ItemList[i] = Properties.Topics[i].Name;
					console.log(Properties.Topics[i].Name);
				}
				console.log(MenuItem.ItemList);
				Task.itemsCount = [];
				
				for (q = 0; q < MenuItem.itemsCount; q++) {
					try{
						Task.itemsCount[q] = Properties.Tasks[q].length;
					}
					catch(e){
						Task.itemsCount[q] = 0;
					}
				}
				respondCanvas();
				if(!Profile.LoggedIn) {
					var div = document.createElement('HelpDiv');
					div.innerHTML = '<image id = "Help"></image>';
					document.getElementById("mainDiv").appendChild(div);
					var Help = document.getElementById("Help");
					Help.src = "/img/Menu-Items/mouse_up.gif";
					Help.style.position = "absolute";
					Help.style.height = 2 * Display.getButton("login_btn.png").h * Math.min(Screen.k_width, Screen.k_height);
					Help.style.width = "auto";
					Help.style.top = Display.getButton("login_btn.png").y * Math.min(Screen.k_width, Screen.k_height);
					Help.style.left = Display.getButton("login_btn.png").x * Math.min(Screen.k_width, Screen.k_height);
					Help.style.visibility = "visible";
				}
			}
			else
				displayMenu();
		}
		catch(e) {
				setTimeout(function(){
					displayMenu();
				}, 100)
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
			displayMenu();
			var time = new Date().getHours();
			console.log("time", time);
			var name = "";
			if(Profile.LoggedIn)
				name = Profile.UserName;
			if(time >= 0 && time < 12)
				responsiveVoice.speak("Good morning, " + name, Profile.Accent);
			else if(time < 16 && time >= 12)
				responsiveVoice.speak("Good afternoon, " + name, Profile.Accent);
			else
				responsiveVoice.speak("Good evening, " + name, Profile.Accent);
		})
	}
	getProperties();
	
	
});
})();

