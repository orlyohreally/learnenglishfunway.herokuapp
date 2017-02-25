var Display = {};
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
}