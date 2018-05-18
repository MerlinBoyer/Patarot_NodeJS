var express = require('express');
var session = require('express-session');
var body = require('body-parser');
var ejs = require('ejs');
var port = 8080;

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);



var clients = new Array();

var carac_personnage = function(id, pseudo, x, y){
	this.id = id;
	this.pseudo = pseudo;
	this.x = x;
	this.y = y;
}
var endive = new carac_personnage(0,'',0,0);
var patate = new carac_personnage(1,'',0,0);

var id = 0;
var nb_connec = 0;

var route = require('./ressources/routes');

app.use('/', route);

var patate_is_free = true;
var endive_is_free = true;
var start_game = false;

io.on('connection', function(socket){
	nb_connec++;
	console.log('client connecte');
	var pseudo = '';
	var type_joueur = 0;

	socket.on('login_required', function(data){
		pseudo = data;
		console.log('nb de connections : '+nb_connec);

		if(endive_is_free){
			endive_is_free = false;
			socket.emit('joueur_endive');
			console.log('endive online');
			type_joueur = 1;
		}else if(patate_is_free){
			socket.emit('joueur_patate');
			patate_is_free = false;
			console.log('patate ready to fight');
			type_joueur = 2;
		}else{
			socket.emit('joueur_genant');
			console.log('joueur qui pue en plus');
			type_joueur = 0;
		}
		if(!patate_is_free && !endive_is_free && (type_joueur != 0)){
			start_game = true;
			setTimeout(function(){
				socket.emit('load_map');
			}, 250);
			console.log('start game oui oui oui');
		}
	});


	socket.on('recup_map', function(data){
		console.log('recup_map required ');
		console.log(':::::' + data);
		for (var i in data){
			console.log(data[i].x + " " + data[i].y);
		}
		if(start_game && (type_joueur != 0)){
			io.emit('recup_map', data);
		}
	});


	socket.on('deplacement', function(data){
		if((data.type_joueur == 1)&&(type_joueur==1)) {
			console.log('deplacement : endive '+ data.direction);
			io.emit('deplacement', data);
		}else if((data.type_joueur==2)&&(type_joueur==2)) {
			console.log('deplacement : patate '+ data.direction);
			io.emit('deplacement',data);
		}else{
			console.log('deplacement : joueur du cul ');
		}
	});

	socket.on('poser_bombe', function(data){
		if((data == 1)&&(type_joueur==1)) {
			console.log('bombe : endive ');
			io.emit('poser_bombe', data);
		}else if((data==2)&&(type_joueur==2)) {
			console.log('bombe : patate ');
			io.emit('poser_bombe',data);
		}else{
			console.log('bombe : joueur du cul ');
		}
	});


	socket.on('print', function(msg){
		console.log('mss : ' + msg);
	});

	socket.on('disconnect', function(){
		if(type_joueur == 1){
			endive_is_free = true;
			console.log('endive ready for the next battle');
		}else if(type_joueur == 2){
			patate_is_free = true;
			console.log('patate is free again !');
		}else{
			console.log('joueur du cul parti');
		}
		nb_connec--;
		if(!patate_is_free && !endive_is_free){
			start_game=false;
		}
		console.log('client : ' + pseudo + ' disconnected');
		console.log('nb restant : '+ nb_connec);
	});

});





server.listen(port, function(){
  console.log('listening port ' + port + '...');
});