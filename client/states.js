var Main = require('./index.js');

var MenuItem = {};
MenuItem.height = 600;
MenuItem.width = 1800;
MenuItem.display = 2;
//MenuItem.itemsCount = 5;
MenuItem.firstItem = 0;
MenuItem.size = 100;
MenuItem.clicked = -1;
MenuItem.chosen = MenuItem.clicked;
MenuItem.display = 2;
MenuItem.size = 100;
koef = 0.75;
Screen = {};

var Profile = {};
Profile.LoggedIn = false;
Profile.width = 540;
Profile.height = 180;
Profile.Accent = "UK English Male";
var Mode = {};
		
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

var Task = {};
Task.display = 4;
Task.firstTask = 0;
Task.test = [];
Task.toTest = [];
Task.Result = {};
Task.Frames = {};
Task.asked = {};
Task.setItemCount = function (val) {
	Task.ItemCount = val;
}
function getUserName() {
	return Profile.UserName;
}
function getAccent() {
	return Profile.Accent;
}
function setUserName(value) {
	Profile.UserName = value;
}
function setAccent(value) {
	Profile.Accent = value;
}
function logInUser (UserName, Accent) {
	Profile.UserName = UserName;
	Profile.Accent = Accent;
}
function setLogIn(value) {
	Profile.LoggedIn = value;
}
function setItemList(arr) {
	MenuItem.ItemList = arr;
}
MenuItem.setItemCount = function (val) {
	MenuItem.ItemCount = val;
}

var atlas = {};

Task.loadedAnimalsframe;
atlas.Animalsframe = new Image();
atlas.Animalsframe.src = '/img/Animals/animals.png';

MenuItem.loadedMenuItems;		
atlas.MenuItem = new Image();
atlas.MenuItem.src = '/img/Menu-Items/menu-items.png';

Task.loadedAnimalsWordsframe;
atlas.AnimalsWordsframe = new Image();
atlas.AnimalsWordsframe.src = '/img/Animals/animal-words.png';
	
Task.loadedNumbersframe;	
atlas.Numbersframe = new Image();
atlas.Numbersframe.src = '/img/Numbers/numbers.png';
	
Task.loadedNumbersWordsframe;
atlas.NumbersWordsframe = new Image();
atlas.NumbersWordsframe.src = '/img/Numbers/number-words.png';
	
Task.loadedLetters;
atlas.Letters = new Image();
atlas.Letters.src = '/img/Alphabet/letters.png';

MenuItem.loadedMenuItemTasks = false;	
atlas.MenuItemTask = new Image();
atlas.MenuItemTask.src = '/img/Menu-Items/Tasks.png';
function recountValues() {
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
	
}
module.exports = {
	getUserName: getUserName,
	getAccent: getAccent,
	setUserName: setUserName,
	setAccent: setAccent,
	logInUser: logInUser,
	setLogIn: setLogIn,
	setItemList: setItemList,
	recountValues: recountValues,
	MenuItem,
	Mode: Mode,
	Task: Task,
	Profile: Profile,
	koef: koef
}