var mongojs = require("mongojs");
var bcrypt = require("bcryptjs"), SALT_WORK_FACTOR = 10;
var db = mongojs('mongodb://orlyohreally:92Prod92Prod@ds117189.mlab.com:17189/heroku_r3fhp6xc', ['SpreadSheets', 'Badges','Results', 'test', 'Exercise', 'Topics', 'Exercise', 'Topics', "Users"]);
//var db = mongojs('localhost:27017/LEFWdb', ['SpreadSheets', 'Results', 'test', 'Badges', 'Exercise', 'Topics', "Users", "Results"]);


var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var underscorejs = require("underscore");

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
	//console.log("cookie", socket.handshake.cookies);
	console.log("hello hello ");
	//console.log(socket.handshake.session);
	if(socket.handshake.session && socket.handshake.session.user) {
	//if((true || (socket.handshake.session && socket.handshake.session.user))) {
		db.Users.find({"UserName":socket.handshake.session.user.UserName}, function(err, res){
		//db.Users.find({"UserName":"Orly"}, function(err, res){
			if(res) {
				//console.log("res1", res);
				//socket.emit('Old session', {user: socket.handshake.session.user});
				socket.emit('Old session', {user: res[0]});
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
	db.SpreadSheets.find({"Name":"Animals"}, function(err, res){
		res = res[0].Frames;
		for(var i = 0; i < res.length; i++){
			res[i].filename = res[i].filename.substring(0, res[i].filename.length - ".png".length);
			delete res[i].rotated;
			delete res[i].trimmed;
			delete res[i].spriteSourceSize;
			delete res[i].sourceSize;
			delete res[i].pivot;
			//db.test.update({"Content.Word": "bee"}, {$set:{"Content.$.frame":{"x":50, "y":50}}})
			db.Exercise.update({"Name": "Read animals", "Content.Word":res[i].filename}, {$set:{'Content.$.frame':res[i].frame}}, function(err, res){
				console.log("result:", res);
				db.SpreadSheets.find({"Name":"Animals"}, function(err, res){
					res = res[0].Frames;
					for(var i = 0; i < res.length; i++){
						res[i].filename = res[i].filename.substring(0, res[i].filename.length - "-word.png".length);
						delete res[i].rotated;
						delete res[i].trimmed;
						delete res[i].spriteSourceSize;
						delete res[i].sourceSize;
						delete res[i].pivot;
						//db.test.update({"Content.Word": "bee"}, {$set:{"Content.$.frame":{"x":50, "y":50}}})
						db.Exercise.update({"Name": "Read animals", "Content.Word":res[i].filename}, {$set:{'Content.$.Wordsframe':res[i].frame}}, function(err, res){
							//console.log("result:", res);
						})
					}
				})
			})
		}
		console.log("look!", res);
		
	})
	
	db.SpreadSheets.find({"Name":"Tasks"}, function(err, res){
		res = res[0].Frames;
		var i = 0;
		for(i = 0; i < res.length; i++){
			res[i].filename = res[i].filename.substring(0, res[i].filename.length - ".png".length);
			delete res[i].rotated;
			delete res[i].trimmed;
			delete res[i].spriteSourceSize;
			delete res[i].sourceSize;
			delete res[i].pivot;
			console.log("look!", res);
			console.log(res[i].frame);
			db.Exercise.update({"Name": res[i].filename}, {$set:{"Frame":res[i].frame}}, function(err, res){
				console.log("result:", res);
			})			
		}
	})
	db.SpreadSheets.find({"Name":"Buttons"}, function(err, res){
		res = res[0].Frames;
		var i = 0;
		for(i = 0; i < res.length; i++){
			res[i].filename = res[i].filename.substring(0, res[i].filename.length - ".png".length);
			delete res[i].rotated;
			delete res[i].trimmed;
			delete res[i].spriteSourceSize;
			delete res[i].sourceSize;
			delete res[i].pivot;
			console.log("look!", res);
			//console.log(res[i].frame);
			db.Topics.update({"Name": res[i].filename}, {$set:{"Frame":res[i].frame}}, function(err, res){
				console.log("result:", res);
			})			
		}
	})
	/*db.SpreadSheets.find({"Name":"Badges"}, function(err, res){
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
			db.Badges.update({"Name": res[i].filename}, {$set:{"Frame":res[i].frame}}, function(err, res){
				console.log("result:", res);
			})			
		}
	})*/
	console.log('socket connection');
	db.Topics.find({}).sort({"Index":1}, function(err, res){
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
				Properties.Tasks[Properties.Topics[i].Index - 1] = [];
			}
			for(i=0;i<res.length;i++){
				var item = res[i];
				var j = 0;
				while(j < Properties.Topics.length) {
					if(Properties.Topics[j].Name == item.Topic_Name) {
						Properties.Tasks[j][item.Index - 1] = item;
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
								db.SpreadSheets.find({"Name": "Info"}, function(err, res){
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
									console.log("sending");
									socket.emit('getProperties', {
										topics:Properties.Topics,
										tasks:Properties.Tasks,
										buttons:Properties.Buttons,
										forms:Properties.Forms,
										numbers:Properties.Numbers,
										letters:Properties.Letters,
										
									
									})
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
								db.Users.insert({"UserName": User.UserName, "Password": User.Password, "Accent":User.Accent, "Points":0, "Max_points": 0, "Badges":[]}, function(err, res){
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
		console.log("auth");
		db.Users.find({"UserName":data.User.UserName}, function(err, res){
			if(res) {
				if(!res.length) {
					console.log("emitting false", "no user");
					socket.emit('auth', {res: false});
				}
				else {
					console.log(res, "found user");
					console.log("res", res[0].Password);
					var User = res[0];
					bcrypt.compare(data.User.Password,res[0].Password, function(err, res) {
						console.log("emitting", res);
						console.log(socket.handshake.cookies);
						if(res == true) {
							socket.handshake.session.user = User;
							socket.handshake.cookies.user = User;
							console.log(socket.handshake.cookies);
							socket.emit('auth', {res:res, User: User});
							delete socket.handshake.session.user.Password;
							delete User.Password;
							socket.handshake.session.save();
							console.log(socket.handshake.session);
						}
						else {
							console.log("wrong password");
							socket.emit("auth", {res: false});
						}
					})
				}
			}
			else {
				console.log("emitting", err);
				socket.emit('auth',{res: err});
			}
		})
	});
	socket.on("resetPassword", function(data) {
		db.Users.find({"UserName":data.user.UserName}, function(err, res){
			if(res) {
				console.log(res);
				if(!res.length) {
					console.log("emitting false");
					socket.emit('resetPassword', {res: "wrong username"});
				}
				else {
					console.log("res", res[0].Password);
					var User = res[0];
					console.log(res[0].Password, data.user.oldPassword);
					bcrypt.compare(data.user.oldPassword, res[0].Password, function(err, res) {
						console.log("emitting", res);
						if(res == false) {
							socket.emit("resetPassword", {res: "wrong password"})
						}
						else {
							console.log("correct old password");
							bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
								bcrypt.hash(data.user.newPassword, salt, function(err, hash){
									if(res){
										console.log("hash:", hash, data.user.UserName);
										db.Users.update({"UserName": data.user.UserName}, {$set:{"Password": hash}}, function(err, res) {
											if(!res) {
												socket.emit("resetPassword", {res: "something went wrong"});
											}
											else
												socket.emit("resetPassword", {res: "everything is okay, password has been reset"});
										})
									}
									else {
										socket.emit("resetPassword", {res: "something went wrong"});
									}
								})
							
							});
							
						}
					})
				}
			}
			
		})
		
	})
	socket.on("updateAccent", function(data) {
		db.Users.find({"UserName":data.UserName}, function(err, res){
			if(res.length == 1) {
				db.Users.update({"UserName": data.UserName}, {$set:{"Accent": data.Accent}}, function(err, res) {
					if(res) {
						socket.emit("updateAccent", {res: true});
					}
					else
						socket.emit("updateAccent", {res: false});
				})
			}
			else
			{
				socket.emit("updateAccent", {res: false});
			}
		});
	})
	socket.on("Badges", function(data){
		db.Users.find({"UserName": data.username}, function(err, res) {
			var Badges = {};
			Badges.Recieved = [];
			console.log(res, res[0]);
			if(res && res.length) {
				Badges.Recieved = res[0].Badges;
			}
			db.Badges.find({}).sort({Topic_Name:1, Name: 1}, function(err, res){
			Badges.All = res;
				for (var i = 0; i < Badges.Recieved.length; i++){
					console.log(underscorejs.pluck(Badges.Recieved[i].Name, Badges.All, "Name"));
					var ind = underscorejs.indexOf( underscorejs.pluck(Badges.All, "Name"), Badges.Recieved[i].Name);
					console.log(Badges.Recieved[i].Name, ind);
					if(ind != -1)
						Badges.All[ind].Recieved = true;
				}
				socket.emit("Badges", {
					Badges: Badges
				})
			
			})
			
		})
	})
	socket.on('getTask', function(data){
		//console.log("TaskName", data.TaskName);
		db.Exercise.find({"Name":data.TaskName}, function(err, res){
			if(data.Accent) {
				var Accents = underscorejs.pluck(res[0].Content, "Accent");
				//console.log(data.Accent, Accents);
				for (var i = 0; i < Accents.length; i++) {
					if(underscorejs.indexOf(Accents[i], data.Accent) == -1) {
						res[0].Content.splice(i, 1);
					}
				}
			}
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
		var User = {};
		db.Results.insert(data.Result, function(err, res){
			if(res) {
				db.Users.update({"UserName" : data.Result.UserName}, {$inc:{Points:data.Result.Points, Max_points: data.Result.Max_point}}, function(err, res){});
				console.log("Topic_Name", data.Result.Topic_Name);
				db.Users.find({"UserName": data.Result.UserName}, function(err, res){
					User = res[0];
				
					db.Exercise.find({"Name":data.Result.Exercise}, function(err, res){
						//console.log("res", res);
						console.log(data.Result.Topic_Name, res[0].Quiz);
						db.Badges.find({"Topic_Name": data.Result.Topic_Name, "Quiz": res[0].Quiz}, function(err, res){
							var Badges = res;
							var pBadges = underscorejs.pluck(res, "Name");
							console.log("all", underscorejs.pluck(Badges, "Name"), "users", User.Badges);
							console.log("could get", underscorejs.difference(underscorejs.pluck(Badges, "Name"), underscorejs.pluck(User.Badges, "Name")));
							if(!underscorejs.isEmpty(User.Badges)){
								pBadges = underscorejs.difference(underscorejs.pluck(Badges, "Name"), underscorejs.pluck(User.Badges, "Name"));
							}
							console.log("Badges to consider", pBadges);
							for(var i = 0; i < pBadges.length; i++)
							{
								console.log("current badge", pBadges[i]);
								Badge = underscorejs.findWhere(Badges, {"Name": pBadges[i]});
								console.log("Badge", Badge);
								if(Badge && Badge.Reason && Badge.Reason.Time) {
									var Finish = new Date(data.Result.Finish);
									var Start = new Date(data.Result.Start);
									console.log(data.Result.Finish, Finish);
									console.log((Finish.getTime() - Start.getTime()) / 1000, Badge.Reason.Time, (Finish.getTime() - Start.getTime()) / 1000 <= Badge.Reason.Time);
									if((Finish.getTime() - Start.getTime()) / 1000 <= Badge.Reason.Time) {
										console.log("got a new badge");
										var time = new Date();
										db.Users.update({"UserName":User.UserName}, {$push:{"Badges":{"Name":Badge.Name, "Date": time, "Topic_Name": Badge.Topic_Name}}}, function(err, res){
											console.log(res);
										})
									}
									else {
										console.log("too slow");
									}
								}
								else if(Badge && Badge.Reason && Badge.Reason.Times){
									db.Results.find({"Topic_Name": data.Result.Topic_Name, "Type": "Matching"}, function(err, res){
										console.log("all results on", data.Result.Topic_Name, res);
										var i = 0;
										var count = 0;
										while(i < res.length && count < Badge.Reason.Times) {
											if(res[i].Points && res[i].Points == res[i].Max_point)
												count++;
											i++;
										}
										console.log(i, count);
										if(count >= Badge.Reason.Times){
											console.log("got a new badge");
											var time = new Date();
											db.Users.update({"UserName":User.UserName}, {$push:{"Badges":{"Name":Badge.Name, "Date": time, "Topic_Name": Badge.Topic_Name}}}, function(err, res){
												console.log(res);
											})
										}
									})
									console.log("badge on times");
								}
							}
							
						});
					});
				});
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
			if(res && res.length) {
				/*var f = 0, i = 0;
				date = new Date(res[i].Start);
				while(f < data.filter && i < res.length) {
					console.log("f", f, "i", i, "date", date);
					var Start = new Date(res[i].Start);
					console.log(Start, Start.getDay());
					if(date == Start.getDay)
						Progress.push(res[i]);
					else {
						f = f + 1;
						date = res[i].Start.substring(0, 10);
						Progress.push(res[i]);
					}
					i = i + 1;
				}*/
				Progress = res;
			}
			//Progress = underscorejs.sortBy(Progress, "Start").reverse();
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
					Quiz[i].Type = res[0].Type;
					res = res[0].Content;
					console.log(Quiz[i].Type);
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