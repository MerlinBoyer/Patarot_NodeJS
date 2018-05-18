


function bombe(url,x,y)
{
  this.x=x;
  this.y=y;
  this.sprite = new Image();
  this.sprite.refbombe = this;
  this.timer=0;
  this.sprite.src = "js/" + url;

}


bombe.prototype.poserbombe = function(x,y)
{
   this.x = x;
   this.y =y;
}



bombe.prototype.dessinerbombe = function(contexte)
{

  if(this.timer!=100)
  {
  contexte.drawImage(this.sprite,this.x*(taille_fenetre()[0]/15),this.y*(taille_fenetre()[0]/15),(taille_fenetre()[0]/15),(taille_fenetre()[0]/15));
  }
};
