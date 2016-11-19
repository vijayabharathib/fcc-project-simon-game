function Simon(){
}
Simon.prototype.maxLength=20;
Simon.prototype.getBotSequence=function(){ return this.botSequence;};
Simon.prototype.clearBotSequence=function(){ this.botSequence="";};
Simon.prototype.clearPlayerSequence=function(){ this.playerSequence="";};

Simon.prototype.prepareBotSequence=function(){
  var min=97; //code for a
  var max=101; //code for e, e is excluded in random
  var c=Math.floor(Math.random()*(max-min))+min;
  c=String.fromCharCode(c);
  if(typeof this.botSequence==="undefined")
    this.botSequence="";
  var bsLength=this.botSequence.length;
  while(bsLength>0 && c===this.botSequence[bsLength-1]){
    c=Math.floor(Math.random()*(max-min))+min;
    c=String.fromCharCode(c);
  }
  this.botSequence+=c;
};

Simon.prototype.preparePlayerSequence=function(c){
  if(typeof this.playerSequence==="undefined")
    this.playerSequence="";

  this.playerSequence+=c;
};

Simon.prototype.getPlayerSequence=function(){return this.playerSequence;};

Simon.prototype.evaluateGameStatus=function(strict){
  var result=false;
  if(!this.playerSequence)
    return "No Input";
  if(!this.botSequence)
    return "Game Off";
  var psLength=this.playerSequence.length;
  var bsLength=this.botSequence.length;
  if(psLength==this.maxLength && this.playerSequence===this.botSequence){
    result="You Win";
  }else if(psLength===bsLength && this.playerSequence===this.botSequence){
    result="Next Level";
  } else if(psLength<bsLength && this.playerSequence===this.botSequence.substring(0,psLength)){
    result="Correct Input";
  } else if(psLength<=bsLength && this.playerSequence!==this.botSequence.substring(0,psLength)){
    if(strict)
      result="Game Over";
    else
      result="Try Again";
  }
  return result;
};

//for jasmine
module.exports=Simon;
