var Display = {};
Display.Buttons = {};

Display.Buttons["login_btn.png"] = {};


function setLogInButton(x, y, w, h) {
	Display.Buttons["login_btn.png"].x = x;
	Display.Buttons["login_btn.png"].y = y;
	Display.Buttons["login_btn.png"].w = w;
	Display.Buttons["login_btn.png"].h = h;
}
function getLogInButton() {
	return Display.Buttons["login_btn.png"];
}
module.exports= {
	getLogInButton: getLogInButton,
	setLogInButton: setLogInButton,	
}