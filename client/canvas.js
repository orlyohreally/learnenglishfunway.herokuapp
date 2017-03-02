var States = require('./states.js');

function clearRect(x, y, width, height) {
if(!States.Mode.Menu)
	ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
else
	Menu_ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
}	
function DrawMenuItem(i, j, pX, pY, pW, pH){
	var X = 368 * i;
	var Y = 0;
	var W = 368;
	var H = 368;
	var frame = Properties.Topics[i].Frame;
	ctx.drawImage(atlasMenuItem, frame.x, frame.y, frame.w, frame.h, pX * Math.min(Screen.k_width, Screen.k_height), pY * Math.min(Screen.k_width, Screen.k_height), pW * Math.min(Screen.k_width, Screen.k_height), pH * Math.min(Screen.k_width, Screen.k_height));
	var frame = Properties.Buttons['lock.png'];
	if(!Properties.Tasks[i].length) {
		drawLock(pX + (pW - frame.w / frame.h * pH / 4) / 2, pY + (pH - pH / 4) / 2, frame.w / frame.h * pH / 4, pH / 4);
	}
}
function drawMenuItems(){
	try{
		var i = States.MenuItem.firstItem; //порядок в спрайте
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
		document.getElementById("Loading").style.visibility = "hidden";

	}
	catch(e){};
}


module.exports = {
	clearRect: clearRect
}