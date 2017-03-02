var Display = {};

Display.Tasks = [];
function setTask(j, i, x, y, w, h) {
	try{		
		Display.Tasks[j][i] = {};
	}
	catch(e) {
		console.log(Display.Tasks, i, j);
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
	Display.Buttons[name].x = Display.Buttons[name].x- n;
	Display.Buttons[name].y = Display.Buttons[name].y- n;
	Display.Buttons[name].w = Display.Buttons[name].w + 2 * n;
	Display.Buttons[name].h = Display.Buttons[name].h + 2 * n;
}

module.exports= {
	getButton: getButton,
	setButton: setButton,	
	expandButton: expandButton,
	setTask: setTask,
	getTask: getTask
}