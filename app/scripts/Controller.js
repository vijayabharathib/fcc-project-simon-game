//controller class
function Controller(){

};

Controller.prototype.strict=false; //strict toggle

//update interface for gameview
Controller.prototype.updateStrictMode=function(flag){
  this.strict=flag;
};

//initiate interface for gameview to call
Controller.prototype.initiateTheGame=function(){
  simon.clearBotSequence(); //start with a clean slate
  simon.prepareBotSequence(); //ask bot to sequence
  gameView.initiateReplay(simon.getBotSequence()); //playit back to the user
};

/**
  * key function of the controller
  * called each time player inputs
  * decides if the user is on track, failed and won
  * let the bot (simon) make moves accordingly
  */
Controller.prototype.advanceTheGame=function(result){
  gameView.clearFinRotation();
  if(result!=="Correct Input"){
    //user sequence is wrong, let them start from scratch again
    simon.clearPlayerSequence();
  }
  if(result==="Next Level"){
    //user finished a sequence fully, move to next level
    gameView.updateStatus("Nice, wait for your turn.");
    simon.prepareBotSequence();//to allow key press/click UX effects to finish;
    gameView.disableBlocks(); //block user inputs until playback is over
    gameView.initiateReplay(simon.getBotSequence()); //replay sequence
  }else if(result==="Try Again"){
    //incorrect user input, let the user try again
    gameView.updateStatus("Watch Closely and Try Again");
    gameView.initiateReplay(simon.getBotSequence());
      //gameView.initiateReplay(simon.getBotSequence());
  }else if(result==="Game Over"){
    //incorrect user input on strict mode, game over
    gameView.updateStatus("Game Over");
    simon.clearBotSequence();
    gameView.rotateFins();
  }else if(result==="You Win"){
    //well done by user
    gameView.updateStatus('You Win');
    gameView.rotateFins();
    simon.clearBotSequence(); //get ready for next game
  }else if(result==="Correct Input"){
    gameView.updateStatus(simon.getPlayerSequence().length);
  }
};

/**
  * take player input and accumulate
  * evaluate against bot sequence
  * advance the game accordingly
  */
Controller.prototype.processPlayerInput=function(id){
  simon.preparePlayerSequence(id);
  var result=simon.evaluateGameStatus(this.strict);
  controller.advanceTheGame(result);
};
