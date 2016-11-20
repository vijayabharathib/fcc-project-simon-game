//Simon bot for the game
function Simon(){
}

Simon.prototype.maxLength=20; //max sequence before one can win
Simon.prototype.getBotSequence=function(){ return this.botSequence;};
Simon.prototype.clearBotSequence=function(){ this.botSequence="";};
Simon.prototype.clearPlayerSequence=function(){ this.playerSequence="";};

/**
  * prepare a sequence of a,b,c,d
  * incrementing by one character each time
  * without repetition of previous character
  */
Simon.prototype.prepareBotSequence=function(){
  var min=97; //code for a
  var max=101; //code for e, e is excluded in random
  //pick a number between 97 & 100 (all inclusive)
  var c=Math.floor(Math.random()*(max-min))+min;
  c=String.fromCharCode(c); //convert that to character
  if(typeof this.botSequence==="undefined")
    this.botSequence=""; //initialize bot sequence if undefined

  var bsLength=this.botSequence.length;
  //generate random until one is generated
  //which is not equal to the last character
  //in current sequence, this is to avoid repetitive chars
  while(bsLength>0 && c===this.botSequence[bsLength-1]){
    c=Math.floor(Math.random()*(max-min))+min;
    c=String.fromCharCode(c);
  }
  this.botSequence+=c; //add the char to sequence
};

//add player sequence and accumulate
Simon.prototype.preparePlayerSequence=function(c){
  if(typeof this.playerSequence==="undefined")
    this.playerSequence=""; //intiate if undefined

  this.playerSequence+=c;
};

Simon.prototype.getPlayerSequence=function(){return this.playerSequence;};

/**
  * evaluate current status of the game
  * each time player inputs, this function will be called
  * accumulated player input is validated against bot sequence
  * let the player go on as long as the input mathes bot sequence
  * end the game if player wins
  * end the game if player inputs incorrect sequence in strict mode
  */
Simon.prototype.evaluateGameStatus=function(strict){
  var result=false;

  if(!this.playerSequence) //player inputs is blank
    return "No Input";
  if(!this.botSequence) //game has not started
    return "Game Off";
  var psLength=this.playerSequence.length;
  var bsLength=this.botSequence.length;

  if(psLength==this.maxLength && this.playerSequence===this.botSequence){
    //player matches bot and reaches max length - wins
    result="You Win";
  }else if(psLength===bsLength && this.playerSequence===this.botSequence){
    //player matches bot sequence fully (and game has not reached max length)
    //move to next level
    result="Next Level";
  } else if(psLength<bsLength && this.playerSequence===this.botSequence.substring(0,psLength)){
    //player matches bot sequence partially
    //wait for further input to validate
    result="Correct Input";
  } else if(psLength<=bsLength && this.playerSequence!==this.botSequence.substring(0,psLength)){
    //player input is incorrect
    if(strict)
      //game over if strict mode is on
      result="Game Over";
    else
      //give the player another chance to retry
      result="Try Again";
  }
  return result;
};

//for jasmine test framework
module.exports=Simon;
