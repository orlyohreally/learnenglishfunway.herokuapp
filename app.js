var mongojs = require("mongojs");
var bcrypt = require("bcryptjs"), SALT_WORK_FACTOR = 10;
//var db = mongojs('mongodb://orlyohreally:92Prod92Prod@ds117189.mlab.com:17189/heroku_r3fhp6xc', ['SpreadSheets', 'Results', 'test', 'Exercise', 'Topics', 'Exercise', 'Topics', "Users"]);
var db = mongojs('localhost:27017/LEFWdb', ['SpreadSheets', 'Results', 'test', 'Exercise', 'Topics', 'Exercise', 'Topics', "Users", "Results"]);


var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

var session = require('express-session')({
	secret: "my-secret",
	resave: true,
	saveUninitialized: true
});
var sharedsessoion = require('express-socket.io-session');
app.use(session);
io.use(sharedsessoion(session, {
	autoSave: true
}));

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
			

io.sockets.on('connection', function(socket) {
	socket.on('disconnect', function(){
		console.log("socket disconnection");
	})
	console.log("cookie", socket.handshake.cookies);
	console.log(socket.handshake.session);
	if(socket.handshake.session && socket.handshake.session.user) {
		db.Users.find({"UserName":socket.handshake.session.user.UserName}, function(err, res){
			if(res) {
				socket.emit('Old session', {user: socket.handshake.session.user});
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
			db.SpreadSheets.find({"Name": "Capital-letters"}, function(err, res){
				res = res[0].Frames;
				console.log(res);
				for(i = 0; i < res.length; i++){
					delete res[i].rotated;
					delete res[i].trimmed;
					delete res[i].spriteSourceSize;
					delete res[i].sourceSize;
					delete res[i].pivot;
					Properties.Letters[res[i].filename] = res[i].frame;
				}
			})
		})
	}
	//getButtons();
	//getForms();
	//getNumbers();
	//getLetters();
		
	
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
			//Buttons
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
				//Forms
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
					//Numbers
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
						//Letters
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
							db.SpreadSheets.find({"Name": "Capital-letters"}, function(err, res){
								res = res[0].Frames;
								//console.log(res);
								for(i = 0; i < res.length; i++){
									delete res[i].rotated;
									delete res[i].trimmed;
									delete res[i].spriteSourceSize;
									delete res[i].sourceSize;
									delete res[i].pivot;
									Properties.Letters[res[i].filename] = res[i].frame;
								}
							
								console.log("sending");
								socket.emit('getProperties', {
									topics:Properties.Topics,
									tasks:Properties.Tasks,
									buttons:Properties.Buttons,
									forms:Properties.Forms,
									numbers:Properties.Numbers,
									letters:Properties.Letters
								})
							})
						});
					
					})
				})
			
			})
			//console.log(Properties.Topics, Properties.Tasks);
			
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
								db.Users.insert({"UserName": User.UserName, "Password": User.Password, "Accent":User.Accent, "Points":0, "Max_points": 0}, function(err, res){
									if(res) {
										socket.handshake.session.user = User;
										socket.handshake.cookies.user = User;
										socket.emit('newUser', {
											res:true
										});
										delete socket.handshake.session.user.Password;
										delete socket.handshake.cookies.user.Password;
										delete User.Password;
										socket.handshake.session.save();
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
						console.log(socket.handshake.cookies);
						socket.handshake.session.user = User;
						socket.handshake.cookies.user = User;
						console.log(socket.handshake.cookies);
						socket.emit('auth', {res:res, User: User});
						delete socket.handshake.session.user.Password;
						delete User.Password;
						socket.handshake.session.save();
						console.log(socket.handshake.session);
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
	socket.on('getVideoID', function(data){
		//console.log("TaskName", data.TaskName);
		db.Exercise.aggregate({$match:{"Name":data.TaskName, "Content.Accent":data.Accent}}, {$unwind:"$Content"}, {$match:{"Content.Accent":data.Accent}}, function(err, res){
			//console.log("emitting Animals", res[0].Content);
			socket.emit('getVideoID', {
				Content: res[0].Content
			})
		})
	})						
	socket.on('Result', function(data){
		console.log("result", data.Result);
		db.Results.insert(data.Result, function(err, res){
			if(res) {
				db.Users.update({"UserName" : data.Result.UserName}, {$inc:{Points:data.Result.Points, Max_points: data.Result.Max_point}}, function(err, res){});
			}
		});
	})
	socket.on('Logout', function(data){
		console.log("logout");
		delete socket.handshake.session.user;
		socket.handshake.session.save();
		socket.emit('Logout', {
			res: true
		})
	})
	socket.on('progress', function(data){
		db.Results.find({"UserName":data.UserName}).sort({Start:-1}, function(err, res){
			var Progress = [];
			if(res.length) {
				var f = 0, i = 0;
				date = res[i].Start.substring(0, 10);
				while(f < data.filter && i < res.length) {
					console.log("f", f, "i", i, "date", date);
					if(date == res[i].Start.substring(0, 10))
						Progress.push(res[i]);
					else {
						f = f + 1;
						date = res[i].Start.substring(0, 10);
						Progress.push(res[i]);
					}
					i = i + 1;
				}
			}
			socket.emit('progress', {
				progress: Progress
			})
		})
		
	})
	socket.on('getQuiz', function(data){
		console.log("getQuiz", data.UserName);
		db.Results.find({"UserName":data.UserName}).sort({Exercise:1, Start:-1}, function(err, res){
			if(res.length) {
				resp = getRecentResults(res);
				db.Exercise.find({"Quiz": false}, {"Name":1, "_id":0}, function(err, res){
					var notForQuiz = res;
					var list = [];
					for(var i = 0; i < resp.length; i++) {
						if(inList(resp[i].Exercise, notForQuiz, "Name") == -1) {
							for(var j = 0; j < resp[i].Answers.length; j++) {
								console.log(resp[i]);
								var item = {};
								item.Exercise = resp[i].Exercise;
								item.Topic_Name = resp[i].Topic_Name;
								item.testStart = resp[i].Start;
								item.duration = resp[i].Answers[j].Time;
								item.Word = resp[i].Answers[j].Word;
								item.Attempts = resp[i].Answers[j].Attempts;
								item.duration_est = 0;
								item.attempts_est = 0;
								list.push(item);
							}
						}
					}
					console.log("list:", list, list != []);
					if(list.length) {
					for(var i = 0; i < list.length; i++){
						for (var j = i + 1; j < list.length; j++) {
							if(list[i].duration > list[j].duration)
								list[i].duration_est = list[i].duration_est + 1 * 2 / list.length / (list.length - 1);
							else if(list[i].duration != list[j].duration)
								list[j].duration_est = list[j].duration_est + 1 * 2 / list.length / (list.length - 1);
							if((list[i].Attempts == 0 && list[i].Attempts != list[j].Attempts) || list[i].Attempts > list[j].Attempts)
								list[i].attempts_est = list[i].attempts_est  + 1 * 2 / list.length / (list.length - 1);
							else if (list[j].Attempts == 0 || list[i].Attempts != list[j].Attempts)
								list[j].attempts_est = list[j].attempts_est  + 1 * 2 / list.length / (list.length - 1);
						}
					}
					for(var i = 0; i < list.length; i++){
						list[i].w = (list[i].duration_est + list[i].attempts_est) / list.length;
					}
					list = list.sort(function(a, b){
						return -a.w + b.w;
					})
					//console.log(list);
					console.log("before removing duplicates list.length",list.length);
					list = removeUnique(list);
					//console.log(list);
					console.log("after removing duplicates list.length", list.length);
					list = list.splice(0, 20);
					//console.log(list);
					console.log("list.length", list.length);
					var Quiz = getQuiz(list);
					console.log("Quiz", Quiz);
					var i = 0;
					console.log(Quiz[i].Name, Quiz[i].Topic_Name);
					setFramesForQuiz(i, Quiz);
					}
					else {
						socket.emit('getQuiz', {
							quiz: false
						})
					}
				})
			}
			else {
				socket.emit('getQuiz', {
					quiz: false
				})
			}
			
		})
	})
	function removeUnique(list) {
		//console.log(list);
		var i = 0;
		while(i < list.length) {
			var j = i + 1;
			while(j < list.length){
				//console.log(list[i]);
				//console.log("list[", i, "]", list[i].Word, list[i].Exercise, "list[j]", list[j].Word, list[j].Exercise);
				
				if(list[i].Word == list[j].Word && list[i].Exercise == list[j].Exercise) {
					
					list.splice(j, 1);
				}
				else
					j++;
			}
			console.log("i++");
			i++;
		}
		return list;
	}
	function setFramesForQuiz(i, Quiz) {
		console.log("setFramesForQuiz()");
		if(i < Quiz.length) {
			db.Exercise.find({"Name": Quiz[i].Name, "Topic_Name": Quiz[i].Topic_Name}, function(err, res) {
				if(res) {
					//console.log("res:", res);
					Quiz[i].Max_point = res[0].Max_point;					
					res = res[0].Content;
					//console.log(res);
					for(var j = 0; j < Quiz[i].Content.length; j++) {
						console.log(Quiz[i].Content[j].Word);
						var q = inList(Quiz[i].Content[j].Word, res, "Word");
						console.log("q:", q, res[q]);
						if(q != -1) {
							Quiz[i].Content[j] = res[q];
						}
					}
				}
				i++;
				setFramesForQuiz(i, Quiz);
			})
		}
		if(i == Quiz.length) {
			socket.emit('getQuiz', {
				quiz: Quiz
			})
			console.log("emitting");
			for(var i = 0; i < Quiz.length; i++) {
				console.log(Quiz[i].Content);
			}
			console.log("emmited");
			
		}
			
	}
	function inList(str, list, field) {
		for(var i = 0; i < list.length; i++) {
			//console.log(list[i], list[i][field]);
			if(list[i][field] == str)
				return i;
		}
		return -1;
	}
	function getRecentResults(res) {
		console.log("all data", res);
		var currEx = res[0].Exercise;
		var count = 0;
		var list = [];
		for (var i = 0; i < res.length; i++) {
			console.log("currEx == res[i].Exercise, count", currEx == res[i].Exercise, count)
			if(res[i].Answers && res[i].Answers.length && currEx == res[i].Exercise && count < 2) {
				//console.log("res[", i, "]",res[i]);
				list.push(res[i]);
				count++;
			}
			else if (currEx != res[i].Exercise) {
				currEx = res[i].Exercise;
				//console.log("res[", i, "]",res[i]);
				list.push(res[i]);
				count = 1;
			}
		}
		return list;
	}
	function getQuiz(list) {
		list = list.sort(function(a, b){
			if(a.Exercise > b.Exercise) return 1;
			if(a.Exercise < b.Exercise) return -1;
			return 0;
		});
		//console.log(list);
		var Quiz = [];
		currEx = "";
		var item = {};
		for (var i = 0; i < list.length; i++) {
			console.log("list[", i, "].Exercise", currEx, list[i].Exercise);
			if(currEx != list[i].Exercise) {
				console.log(currEx);
				if(currEx != "")
					Quiz.push(item);
				currEx = list[i].Exercise;
				item = {};
				item.Name = list[i].Exercise;
				item.Topic_Name = list[i].Topic_Name;
				item.Content = [];
				item.Content.push({"Word": list[i].Word});
			}
			else if(currEx == list[i].Exercise) {
				console.log(currEx);
				item.Content.push({"Word": list[i].Word});
			}
		}
		Quiz.push(item);
		return Quiz.slice(0);
	}
})