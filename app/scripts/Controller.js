function Controller(){

};

Controller.prototype.strict=false;
Controller.prototype.updateStrictMode=function(flag){
  this.strict=flag;
};
Controller.prototype.initiateTheGame=function(){
  simon.clearBotSequence();
  simon.prepareBotSequence();
  console.log("bot: " + simon.getBotSequence());
  gameView.initiateReplay(simon.getBotSequence());
};
Controller.prototype.advanceTheGame=function(result){
  if(result!=="correct input"){
    simon.clearPlayerSequence();
  }
  if(result==="Next Level"){
    gameView.updateStatus("Next Level");
    simon.prepareBotSequence();//to allow key press/click UX effects to finish;
    gameview.initiateReplay();
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
  var result=simon.evaluateGameStatus(strict);
  controller.advanceTheGame(result);
}
