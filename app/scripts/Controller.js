function Controller(){

};

Controller.prototype.strict=false;
Controller.prototype.updateStrictMode=function(flag){
  this.strict=flag;
};
Controller.prototype.initiateTheGame=function(){
  simon.clearBotSequence();
  simon.prepareBotSequence();
  gameView.initiateReplay(simon.getBotSequence());
};
Controller.prototype.advanceTheGame=function(result){
  if(result!=="Correct Input"){
    simon.clearPlayerSequence();
  }
  if(result==="Next Level"){
    var successGreeting=["Nice!","Not Bad!","Wow!","Keep it up!","Good!"];
    var successInform=["Wait For Your Turn.","Focus on the sequence.","You can do it.","Let's beat that bot."];
    var a=Math.floor(Math.random()*successGreeting.length)
    var b=Math.floor(Math.random()*successInform.length)
    gameView.updateStatus(successGreeting[a] + " " + successInform[b]);
    simon.prepareBotSequence();//to allow key press/click UX effects to finish;
    gameView.disableBlocks();
    gameView.initiateReplay(simon.getBotSequence());
  }else if(result==="Try Again"){
    gameView.updateStatus("Try again");
  }else if(result==="Game Over"){
      gameView.updateStatus("Game Over");
      simon.clearBotSequence();
  }else if(result==="You Win"){
    gameView.updateStatus('You Win');
    simon.clearBotSequence();
  }else if(result==="Correct Input"){
    gameView.updateStatus(simon.getPlayerSequence().length);
  }
}

Controller.prototype.processPlayerInput=function(id){
  simon.preparePlayerSequence(id);
  var result=simon.evaluateGameStatus(this.strict);
  controller.advanceTheGame(result);
}
