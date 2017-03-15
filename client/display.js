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
	console.log("expanding", j);
	Display.Topics[j].x = Display.Topics[j].x - n;
	Display.Topics[j].y = Display.Topics[j].y - n;
	Display.Topics[j].w = Display.Topics[j].w + 2 * n;
	Display.Topics[j].h = Display.Topics[j].h + 2 * n;
}
Display.TestItems = [];
function setTestItem(j, x, y, w, h) {
	Display.TestItems[j] = {};
	Display.TestItems[j].x = x;
	Display.TestItems[j].y = y;
	Display.TestItems[j].w = w;
	Display.TestItems[j].h = h;
}
function getTestItem(j) {
	return Display.TestItems[j];
}
function getTestItems() {
	return Display.TestItems;
}
function expandTestItem(j, n) {
	Display.TestItems[j].x = Display.TestItems[j].x - n;
	Display.TestItems[j].y = Display.TestItems[j].y - n;
	Display.TestItems[j].w = Display.TestItems[j].w + 2 * n;
	Display.TestItems[j].h = Display.TestItems[j].h + 2 * n;
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
function expandTask(j, i, n) {
	//console.log(Display.Tasks[j][i]);
	Display.Tasks[j][i].x = Display.Tasks[j][i].x - n;
	Display.Tasks[j][i].y = Display.Tasks[j][i].y - n;
	Display.Tasks[j][i].w = Display.Tasks[j][i].w + 2 * n;
	Display.Tasks[j][i].h = Display.Tasks[j][i].h + 2 * n;
}

Display.Buttons = {};

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
Display.Forms = {};
function setForm(name, x, y, w, h) {
	//console.log(name, x, y, w, h);
	Display.Forms[name] = {};
	Display.Forms[name].x = x;
	Display.Forms[name].y = y;
	Display.Forms[name].w = w;
	Display.Forms[name].h = h;
}
function getForm(name) {
	return Display.Forms[name];
}
module.exports= {
	getButton: getButton,
	setButton: setButton,
	getForm: getForm,
	setForm: setForm,	
	expandButton: expandButton,
	setTask: setTask,
	getTask: getTask,
	expandTask: expandTask,
	setTopic: setTopic,
	getTopic: getTopic,
	expandTopic: expandTopic,
	setTestItem: setTestItem,
	getTestItem: getTestItem,
	getTestItems: getTestItems,
	expandTestItem: expandTestItem
	
}