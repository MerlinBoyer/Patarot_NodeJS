
var path = require('path');
var express = require('express');

var route = express();

route.get('/', function(req, res){
	res.sendFile(path.resolve('./index.html'));
})

//%%%%%%%%%%%  classes : 

route.get('/js/classes/bombe.png', function(req, res){
	res.sendFile(path.resolve('./js/classes/bombe.png'));
})

route.get('/js/classes/bombes.js', function(req, res){
	res.sendFile(path.resolve('./js/classes/bombes.js'));
})

route.get('/js/classes/map.js', function(req, res){
	res.sendFile(path.resolve('./js/classes/map.js'));
})

route.get('/js/classes/mur.js', function(req, res){
	res.sendFile(path.resolve('./js/classes/mur.js'));
})

route.get('/js/classes/personnage.js', function(req, res){
	res.sendFile(path.resolve('./js/classes/personnage.js'));
})

route.get('/js/classes/powerup.js', function(req, res){
	res.sendFile(path.resolve('./js/classes/powerup.js'));
})

route.get('/js/classes/sprite.js', function(req, res){
	res.sendFile(path.resolve('./js/classes/sprite.js'));
})

route.get('/js/classes/Tileset.js', function(req, res){
	res.sendFile(path.resolve('./js/classes/Tileset.js'));
})


/////////////////// js
route.get('/js/bombe.png', function(req, res){
	res.sendFile(path.resolve('./js/bombe.png'));
})

route.get('/js/endive.png', function(req, res){
	res.sendFile(path.resolve('./js/endive.png'));
})

route.get('/js/explosion.png', function(req, res){
	res.sendFile(path.resolve('./js/explosion.png'));
})

route.get('/js/menu.png', function(req, res){
	res.sendFile(path.resolve('./js/menu.png'));
})

route.get('/js/mur.png', function(req, res){
	res.sendFile(path.resolve('./js/mur.png'));
})

route.get('/js/mur_incassable.png', function(req, res){
	res.sendFile(path.resolve('./js/mur_incassable.png'));
})

route.get('/js/patate.png', function(req, res){
	res.sendFile(path.resolve('./js/patate.png'));
})

route.get('/js/power.png', function(req, res){
	res.sendFile(path.resolve('./js/power.png'));
})

route.get('/js/rpg.js', function(req, res){
	res.sendFile(path.resolve('./js/rpg.js'));
})



////////// CSS

route.get('/css/style.css', function(req, res){
	res.sendFile(path.resolve('./css/style.css'));
})



////////    tileset :

route.get('/tilesets/basique.png', function(req, res){
	res.sendFile(path.resolve('./tilesets/basique.png'));
})




module.exports = route;