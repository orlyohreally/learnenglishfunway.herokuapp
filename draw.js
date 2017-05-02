var Display = require('./display.js');
var Index = require('./index.js');

image = {};
image.Draw(name){
	var frame = Properties.Buttons[name];
	if(Index.Mode.Progress)
		context = Progress_ctx;
	else if(Index.Mode.Settings)
		context = Settings_ctx;
	else if(Index.Mode.Message)
		context = Message_ctx;
	else if(Index.Mode.Badges)
		context = Badges_ctx;
	else if(!Index.Mode.Menu)
		context = ctx;
	else
		context = Menu_ctx;
	context.drawImage(atlasButtons, frame.x, frame.y, frame.w, frame.h, Display.getButton(name).x * Math.min(Screen.k_width, Screen.k_height), Display.getButton(name).y * Math.min(Screen.k_width, Screen.k_height), Display.getButton(name).w * Math.min(Screen.k_width, Screen.k_height), Display.getButton(name).h * Math.min(Screen.k_width, Screen.k_height))
}

module.exports = {
	drawImage: image.Draw
}