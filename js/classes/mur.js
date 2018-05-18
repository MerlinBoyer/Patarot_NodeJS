function mur(url,x,y)
{
	this.x=x;
	this.y=y;
	this.etat=1;
	this.sprite=new Image();
	this.sprite.refmur = this;
	this.sprite.src= "js/" + url;
}

mur.prototype.casse_mur = function(map)
{
		for(var j=0;j<map.explosions.length;j++)
		{
			for(var k =0;k<map.explosions[j].length;k++)
			{

				if((map.explosions[j][k].x == this.x) && (map.explosions[j][k].y == this.y))
				{
					this.etat =0;
				}
			}
		}
		for(var j=0;j<map.explosions2.length;j++)
		{
			for(var k =0;k<map.explosions2[j].length;k++)
			{

				if((map.explosions2[j][k].x == this.x) && (map.explosions2[j][k].y == this.y))
				{
					this.etat =0;
				}
			}
		}
}

mur.prototype.dessinermur =function(contexte)
{
	if(this.etat==1)
	{
		contexte.drawImage(this.sprite,this.x*(taille_fenetre()[0]/15),this.y*(taille_fenetre()[0]/15),(taille_fenetre()[0]/15),(taille_fenetre()[0]/15));
	}
}
