var mp = new map(tab_map);
var aff_menu = new map(map_menu);
var joueur = new personnage("endive.png",0,6,DIRECTION.BAS);
var joueur2 = new personnage("patate.png",14,6,DIRECTION.BAS);
var image_menu = new Image();
image_menu.src = "js/menu.png";
var taille_case =32;//(taille_fenetre()[0]/15);
var type_joueur = 0;
var tempo_powerups = new Array();

socket.on('recup_map', function(data){
	mp.powerups = [];
	for(var i in data){
		var power = new powerup("power.png",data[i].x,data[i].y);
		mp.powerups.push(power);
	}
});

socket.on('load_map', function(){
	tempo_powerups = [];
	for(var i=0;i<mp.powerups.length;i++){
		var tempo = {'x':mp.powerups[i].x,'y':mp.powerups[i].y};
		tempo_powerups.push(tempo);
	};
	socket.emit('recup_map', tempo_powerups);
})



var mur_map = new Array();
mur_map =
[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[0,1,0,1,0,0,0,0,0,1,0,0,0,1,0],
[0,0,1,0,1,0,1,0,1,0,1,0,1,0,0],
[0,1,0,1,0,0,0,0,0,1,0,0,0,1,0],
[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[0,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
[0,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

var mur_map_incassable = new Array();
mur_map_incassable =
[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]

function taille_fenetre()
{
	var taille = new Array()
	if (document.body)
	{
	var larg = (document.body.clientWidth);
	var haut = (document.body.clientHeight);
	}
	else
	{
	var larg = (window.innerWidth);
	var haut = (window.innerHeight);
	}
	taille.push(haut);
	taille.push(larg);
	return taille
}


function explose(map,bombe,numero_joueur)
{
	switch(numero_joueur)
	{
		case 1 : 
		var ex = new sprite("explosion.png",5,6);
		map.bombes1.splice(map.bombes1.indexOf(bombe),1); 
			ex.coord_explosion(map,bombe,1);
			setTimeout(function(){duree_explosion(map,ex,numero_joueur)},500);
		break;
		case 2 :
		var ex2 = new sprite("explosion.png",5,6);
		map.bombes2.splice(map.bombes2.indexOf(bombe),1);
		ex2.coord_explosion(map,bombe,2);
		setTimeout(function(){duree_explosion(map,ex2,numero_joueur)},500);
		break;
	}
} 

function duree_explosion(map,explosion,joueur)
{
	switch(joueur)
	{
		case 1:
		for(var i=0;i<map.explosions.length;i++)
		{
		if(map.explosions[i].indexOf(explosion) !== -1)
		{
		map.explosions.splice(i,1);
		}
		}
		break;
		case 2:
		for(var i=0;i<map.explosions2.length;i++)
		{
		if(map.explosions2[i].indexOf(explosion) !== -1)
		{
		map.explosions2.splice(i,1);
		}
		}		break;
	}
}


joueur.nombre_bombe=3;
joueur2.nombre_bombe=3;
mp.addpersonnage(joueur);
mp.addpersonnage(joueur2);







window.onload = function(){

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	ctx.canvas.width  = window.innerHeight-50;
  	ctx.canvas.height = window.innerHeight-50;

	
	var power = new powerup("power.png",0,1)

	for( var i =0;i<mur_map.length; i++){
      for(var j=0;j<mur_map[0].length;j++){
        var mr = new mur("mur.png",5,6);
        mr.x = j;
        mr.y = i;
        if(mur_map[i][j]==0)
        {
          mr.etat=0;
        };
       mp.murs.push(mr);
      }
    };

	for( var i =0;i<mur_map_incassable.length; i++){
      for(var j=0;j<mur_map_incassable[0].length;j++){
        var mr = new mur("mur_incassable.png",5,6);
        mr.x = j;
        mr.y = i;
        if(mur_map_incassable[i][j]==0)
        {
          mr.etat=0;
        };
       mp.murs_incassable.push(mr);
      }
    };

	var test_mur = function(){
	 	for(var i=0;i<mp.murs.length;i++)
	 	{
	  		mp.murs[i].casse_mur(mp);
	  	}
	}

	var gameover = function(joueur){
	  	document.write("<B>GAME OVER</B>"+ "<B> Le joueur </B>" + joueur+"<B> a gagné!</B>");
	  	
	  	window.onkeydown = function(event) {
		var e = event || window.event;
		var key = e.which || e.keyCode;
		if(key == 13)
		{
			menu();
		};
		}
	};

	var jeu = function(){
		

		id = setInterval(function() {

			test_mur();
			if(joueur.mort(mp))
				{
					clearInterval(id);
					gameover("patate");
				};
				if(joueur2.mort(mp))
				{
					clearInterval(id);
					gameover("endive");
				};

			mp.addcollision();
			power.activation(mp);
			mp.dessinermap(ctx);
		}, 20);

		setTimeout(function(){
		power.creerpowerup(mp,ctx);
		},100)



		var keymap = new Array();
		var interval = true;


		onkeydown = function(e){
		    e = e || event; // to deal with IE
		    keymap[e.keyCode] = true;


		    if(interval == true){
		    id2 = setInterval(function(){
				if(keymap[122] || keymap[90] || keymap[87])	
				{
					if(type_joueur != 0){
						socket.emit('deplacement',{type_joueur: type_joueur,
												    direction: 'HAUT'});
						interval = false;
					}
				}
				
				if(keymap[115] || keymap[83] )
				{
					if(type_joueur != 0){
						socket.emit('deplacement',{type_joueur: type_joueur,
												    direction: 'BAS'});
					interval = false;
					}
				}

				if(keymap[113]||keymap[97]||keymap[81]||keymap[65])
				{
					if(type_joueur != 0){
						socket.emit('deplacement',{type_joueur: type_joueur,
												    direction: 'GAUCHE'});
					interval = false;
					}
				}

				if(keymap[100]||keymap[68])
				{
					if(type_joueur != 0){
						socket.emit('deplacement',{type_joueur: type_joueur,
												    direction: 'DROITE'});
					interval = false;
					}
				}
				
				else
				{	// 		//alert(key);
					// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
					return true;
				}
			},1000/50);
			}

			if(keymap[32]){
				if (type_joueur==1){
					if(mp.bombes1.length<joueur.nombre_bombe)
					{
						socket.emit('poser_bombe',type_joueur);
					}
				}else if (type_joueur==2){
					if(mp.bombes2.length<joueur2.nombre_bombe)
					{
						socket.emit('poser_bombe',type_joueur);
					}
				}
			}
		}

		onkeyup = function(e){
			e = e || event; // to deal with IE
		    keymap[e.keyCode] = false;
		    clearInterval(id2);
		    interval=true;
		}
	}

	var menu = function(){
		aff_menu.dessinermap(ctx);
		ctx.drawImage
		(image_menu,0,0,aff_menu.largeur*(taille_fenetre()[0]/15),aff_menu.height*(taille_fenetre()[0]/15));
	};

	socket.on('joueur_patate', function(){
		type_joueur = 2;
		joueur.id = 2;
		$("#login").fadeOut();
	    menu();
	});

	socket.on('joueur_endive', function(){
		type_joueur = 1;
		joueur.id = 1;
		$("#login").fadeOut();
	    menu();
	});




	socket.on('joueur_genant', function(){
		type_joueur = 0;
		joueur.id = 0;
		window.alert('trop de joueurs connectés...');
		//location.reload(true);
		$("#login").fadeOut();
	    menu();
	});

	socket.on('deplacement', function(data){
		if(data.type_joueur==1){
			socket.emit('print','deplacementenregistre '+data.type_joueur+' '+data.direction);
			switch(data.direction){
				case 'HAUT':
					joueur.deplacer(DIRECTION.HAUT,mp);
					break;

				case 'BAS':
					joueur.deplacer(DIRECTION.BAS,mp);
					break;

				case 'DROITE':
					joueur.deplacer(DIRECTION.DROITE,mp);
					break;

				case 'GAUCHE':
					joueur.deplacer(DIRECTION.GAUCHE,mp);
					break;
			}
		}else if(data.type_joueur==2){
			socket.emit('print','deplacementenregistre '+data.type_joueur+' '+data.direction);
			switch(data.direction){
				case 'HAUT':
					joueur2.deplacer(DIRECTION.HAUT,mp);
					break;

				case 'BAS':
					joueur2.deplacer(DIRECTION.BAS,mp);
					break;

				case 'DROITE':
					joueur2.deplacer(DIRECTION.DROITE,mp);
					break;

				case 'GAUCHE':
					joueur2.deplacer(DIRECTION.GAUCHE,mp);
					break;
			}
		}
	});

	socket.on('poser_bombe',function(data){
		if (data==1){
			var bm = new bombe("bombe.png",1,5);

			bm.poserbombe(joueur.x,joueur.y)
			mp.addbombe(bm,1);
			window.setTimeout(function(){explose(mp,bm,1)},2000);
			// return true;
		}else if(data==2){
			var bm2 = new bombe("bombe.png",1,7);

			bm2.poserbombe(joueur2.x,joueur2.y)
			mp.addbombe(bm2,2);
			window.setTimeout(function(){explose(mp,bm2,2)},2000);			
			// return true;
		}
	});

	window.onkeydown = function(event) {
		var e = event || window.event;
		var key = e.which || e.keyCode;
		switch(key){
			case 13:
			jeu();
			break;
		}
	};

};
