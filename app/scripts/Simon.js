function Simon(){
}
Simon.prototype.maxLength=6;
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

Simon.prototype.evaluateGameStatus=function(playerSequence){
  var result=false;
  if(!playerSequence)
    return "no input";
  if(!this.botSequence)
    return "game off";

  var psLength=playerSequence.length;
  var bsLength=this.botSequence.length;
  if(psLength==this.maxLength && playerSequence===this.botSequence){
    result="win";
  }else if(psLength===bsLength && playerSequence===this.botSequence){
    result="success";
  } else if(psLength<bsLength && playerSequence===this.botSequence.substring(0,psLength)){
    result="correct input";
  } else if(psLength<=bsLength && playerSequence!==this.botSequence.substring(0,psLength)){
    result="incorrect input";

  }
  return result;
};

module.exports=Simon;
