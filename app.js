var mongojs = require("mongojs");
var bcrypt = require("bcryptjs"), SALT_WORK_FACTOR = 10;
var db = mongojs('mongodb://orlyohreally:92Prod92Prod@ds117189.mlab.com:17189/heroku_r3fhp6xc', ['SpreadSheets', 'Results', 'test', 'Exercise', 'Topics', 'Exercise', 'Topics', "Users"]);
//var db = mongojs('localhost:27017/LEFWdb', ['SpreadSheets', 'Results', 'test', 'Exercise', 'Topics', 'Exercise', 'Topics', "Users"]);
//db.Topics.find({"Name":"Animals"}, function(err, res){console.log(res[0])})

//db.SpreadSheets.aggregate( [ { $match:  { "Name": "menu_items"}}, {$lookup: {    from: "db.Topics",     localField: "Content.filename",    foreignField: "Name",    as: "Properties"}  }])
/*
var express = require('express');
var app = express();
var serv = require('http').Server(app);
var favicon = require('serve-favicon');
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));
app.use(favicon(__dirname + '/client/img/favicon.ico'));
//serv.listen(5000);
app.listen(process.env.PORT || 3000, function() {
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
console.log("Server started");
SOCKET_LIST = {};
var io = require('socket.io')(serv);
*/

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/client'));



var Properties = {};
Properties.Topics = [];
Properties.Numbers = {};
Properties.Letters = {};
Properties.Forms = {};
Properties.Buttons = {};
			
var session = require('client-sessions');
app.use(session({
	cookieName: 'session',
	secret: 'orlyohreally',
	duration: 1,
	activeDuration:1,
	httpOnly: true,
	secure: true,
	ephemeral: true
	}));	

io.sockets.on('connection', function(socket) {
	socket.on('disconnect', function(){
		console.log("socket disconnection");
	})
	
	if(session && session.user) {
		db.Users.find({"UserName":session.user.UserName}, function(err, res){
			if(res) {
				socket.emit('Old session', {user: session.user});
			}
		});
	}
	/*socket.id = Math.random;
	SOCKET_LIST[socket.id] = socket;*/
	/*socket.on('disconnect', function(){
		db.tasks.drop();
		db.test.drop();
		db.TopicFrames.drop();
		db.TaskFrames.drop();
		db.topics.drop();
		console.log("socket disconnection");
	})*/
	/*db.SpreadSheets.find({"Name":"Tasks"}, function(err, res){
		res = res[0].Frames;
		for(var i = 0; i < res.length; i++){
			res[i].filename = res[i].filename.substring(0, res[i].filename.length - ".png".length);
			delete res[i].rotated;
			delete res[i].trimmed;
			delete res[i].spriteSourceSize;
			delete res[i].sourceSize;
			delete res[i].pivot;
			//db.test.update({"Content.Word": "bee"}, {$set:{"Content.$.frame":{"x":50, "y":50}}})
			db.Exercise.update({"Name": "Find numbers from 10 to 100", "Content.Word":res[i].filename}, {$set:{'Content.$.frame':res[i].frame}}, function(err, res){
				//console.log("result:", res);
				db.SpreadSheets.find({"Name":"Numbers-words"}, function(err, res){
					res = res[0].Frames;
					for(var i = 0; i < res.length; i++){
						res[i].filename = res[i].filename.substring(0, res[i].filename.length - "-word.png".length);
						delete res[i].rotated;
						delete res[i].trimmed;
						delete res[i].spriteSourceSize;
						delete res[i].sourceSize;
						delete res[i].pivot;
						//db.test.update({"Content.Word": "bee"}, {$set:{"Content.$.frame":{"x":50, "y":50}}})
						db.Exercise.update({"Name": "Find numbers from 10 to 100", "Content.Word":res[i].filename}, {$set:{'Content.$.Wordsframe':res[i].frame}}, function(err, res){
							console.log("result:", res);
						})
					}
				})
			})
		}
		console.log("look!", res);
		
	})*/
	
	/*db.SpreadSheets.find({"Name":"Tasks"}, function(err, res){
		res = res[0].Frames;
		var i = 0;
		for(i = 0; i < res.length; i++){
			res[i].filename = res[i].filename.substring(0, res[i].filename.length - ".png".length);
			delete res[i].rotated;
			delete res[i].trimmed;
			delete res[i].spriteSourceSize;
			delete res[i].sourceSize;
			delete res[i].pivot;
			//console.log("look!", res);
			console.log(res[i].frame);
			db.Exercise.update({"Name": res[i].filename}, {$set:{"Frame":res[i].frame}}, function(err, res){
				//console.log("result:", res);
			})			
		}
	})*/
	/*db.SpreadSheets.find({"Name":"Topics"}, function(err, res){
		res = res[0].Frames;
		var i = 0;
		for(i = 0; i < res.length; i++){
			res[i].filename = res[i].filename.substring(0, res[i].filename.length - ".png".length);
			delete res[i].rotated;
			delete res[i].trimmed;
			delete res[i].spriteSourceSize;
			delete res[i].sourceSize;
			delete res[i].pivot;
			//console.log("look!", res);
			//console.log(res[i].frame);
			db.Topics.update({"Name": res[i].filename}, {$set:{"Frame":res[i].frame}}, function(err, res){
				console.log("result:", res);
			})			
		}
	})*/
	console.log('socket connection');
	db.Topics.find({}, function(err, res){
		if(res) {
			//console.log("msg:", res);
			Properties.Topics = res;
			//for(i=0;i<res.length;i++)
				//console.log("res[",i,"] = ", res[i].Properties);
			//console.log(Properties.Topics);
			getTaskFrames();
		}
	})
	function getButtons() {
		db.SpreadSheets.find({"Name": "Buttons"}, function(err, res){
			res = res[0].Frames;
			for(i = 0; i < res.length; i++){
				delete res[i].rotated;
				delete res[i].trimmed;
				delete res[i].spriteSourceSize;
				delete res[i].sourceSize;
				delete res[i].pivot;
				//console.log(res);
				Properties.Buttons[res[i].filename] = res[i].frame;
				
			}
		})
	}
	function getForms() {
		db.SpreadSheets.find({"Name": "Forms"}, function(err, res){
			res = res[0].Frames;
			for(i = 0; i < res.length; i++){
				delete res[i].rotated;
				delete res[i].trimmed;
				delete res[i].spriteSourceSize;
				delete res[i].sourceSize;
				delete res[i].pivot;
				Properties.Forms[res[i].filename] = res[i].frame;
				//console.log(Properties.Forms[res[i].filename]);
			}
		})
	}
	function getNumbers() {
		db.SpreadSheets.find({"Name": "Numbers"}, function(err, res){
			res = res[0].Frames;
			for(i = 0; i < res.length; i++){
				delete res[i].rotated;
				delete res[i].trimmed;
				delete res[i].spriteSourceSize;
				delete res[i].sourceSize;
				delete res[i].pivot;
				Properties.Numbers[res[i].filename] = res[i].frame;
				//console.log(Properties.Numbers[res[i].filename]);
			}
		})
	}
	function getLetters() {
		db.SpreadSheets.find({"Name": "Letters"}, function(err, res){
			res = res[0].Frames;
			for(i = 0; i < res.length; i++){
				delete res[i].rotated;
				delete res[i].trimmed;
				delete res[i].spriteSourceSize;
				delete res[i].sourceSize;
				delete res[i].pivot;
				Properties.Letters[res[i].filename] = res[i].frame;
			}
		})
	}
	getButtons();
	getForms();
	getNumbers();
	getLetters();
		
	function getTaskFrames() {
		db.Exercise.find({}, function(err, res){
			Properties.Tasks = [];
			//console.log("res", res);
			for(i = 0; i< Properties.Topics.length;i++){
				Properties.Tasks[Properties.Topics[i].T_index - 1] = [];
			}
			for(i=0;i<res.length;i++){
				var item = res[i];
				var j = 0;
				while(j < Properties.Topics.length) {
					if(Properties.Topics[j].Name == item.Topic_Name) {
						Properties.Tasks[j][item.T_index - 1] = item;
						j = Properties.Topics.length + 1;
					}
					else {
						j++;
					}	
				}
				
			}
			//console.log(Properties.Topics, Properties.Tasks);
			console.log("sending");
			socket.emit('getProperties', {
					topics:Properties.Topics,
					tasks:Properties.Tasks,
					buttons:Properties.Buttons,
					forms:Properties.Forms,
					numbers:Properties.Numbers,
					letters:Properties.Letters
				});	
		})	
	}
	socket.on('newUser', function(data){
		var User = {};
		User.UserName = data.User.UserName;
		User.Password = data.User.Password;
		User.Accent = data.User.Accent;
		console.log(User.UserName, User.Password);
		var checked;
		db.Users.find({"UserName":User.UserName}, function(err, res){
			if(res){
				console.log(res);
				if(!res.length) {
					checked = true;
					console.log("vacant");
				}
				else {
					checked = false;					
					console.log("taken");
				}
			}
			if(checked) {
				bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
					if(res){
						bcrypt.hash(User.Password, salt, function(err, hash){
							if(res){
								User.Password = hash;
								console.log("hash:", User.Password);
								db.Users.insert({"UserName": User.UserName, "Password": User.Password, "Accent":User.Accent, "Points":0}, function(err, res){
									if(res) {
										session.user = User;
										socket.emit('newUser', {
											res:true
										});
									}
									else {
										socket.emit('newUser',{
											res: err
										});
									}
								})
							}
						})
					}
				});
			}
			else if (!checked) {
				socket.emit('newUser', {
						res:checked
				});
				console.log("emit", checked);
			}
			else if(err)
				socket.emit('newUser', {res: err});
		})		
	});
	socket.on('auth', function(data){
		db.Users.find({"UserName":data.User.UserName}, function(err, res){
			if(res) {
				console.log(res);
				if(!res.length) {
					console.log("emitting false");
					socket.emit('auth', {res: false});
				}
				else {
					console.log("res", res[0].Password);
					var User = res[0];
					bcrypt.compare(data.User.Password,res[0].Password, function(err, res) {
						console.log("emitting", res);
						session.user = User;
						socket.emit('auth', {res:res, User: User});
					})
				}
			}
			else {
				console.log("emitting", err);
				socket.emit('auth',{res: err});
			}
		})
	});
	socket.on('getTask', function(data){
		//console.log("TaskName", data.TaskName);
		db.Exercise.find({"Name":data.TaskName}, function(err, res){
			//console.log("emitting Animals", res[0].Content);
			socket.emit('getTask', {
				Content: res[0].Content
			})
		})
	})						
	socket.on('Result', function(data){
		console.log("result", data.Result);
		db.Results.insert(data.Result, function(err, res){
			if(res) {
				db.Users.update({"UserName" : data.Result.UserName}, {$inc:{Points:data.Result.Points}}, function(err, res){});
			}
		});
	})
	socket.on('Logout', function(data){
		console.log("logout");
		delete session.user;
		delete session;
		socket.emit('Logout', {
			res: true
		})
	})
})