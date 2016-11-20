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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJDb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vY29udHJvbGxlciBjbGFzc1xuZnVuY3Rpb24gQ29udHJvbGxlcigpe1xuXG59O1xuXG5Db250cm9sbGVyLnByb3RvdHlwZS5zdHJpY3Q9ZmFsc2U7IC8vc3RyaWN0IHRvZ2dsZVxuXG4vL3VwZGF0ZSBpbnRlcmZhY2UgZm9yIGdhbWV2aWV3XG5Db250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVTdHJpY3RNb2RlPWZ1bmN0aW9uKGZsYWcpe1xuICB0aGlzLnN0cmljdD1mbGFnO1xufTtcblxuLy9pbml0aWF0ZSBpbnRlcmZhY2UgZm9yIGdhbWV2aWV3IHRvIGNhbGxcbkNvbnRyb2xsZXIucHJvdG90eXBlLmluaXRpYXRlVGhlR2FtZT1mdW5jdGlvbigpe1xuICBzaW1vbi5jbGVhckJvdFNlcXVlbmNlKCk7IC8vc3RhcnQgd2l0aCBhIGNsZWFuIHNsYXRlXG4gIHNpbW9uLnByZXBhcmVCb3RTZXF1ZW5jZSgpOyAvL2FzayBib3QgdG8gc2VxdWVuY2VcbiAgZ2FtZVZpZXcuaW5pdGlhdGVSZXBsYXkoc2ltb24uZ2V0Qm90U2VxdWVuY2UoKSk7IC8vcGxheWl0IGJhY2sgdG8gdGhlIHVzZXJcbn07XG5cbi8qKlxuICAqIGtleSBmdW5jdGlvbiBvZiB0aGUgY29udHJvbGxlclxuICAqIGNhbGxlZCBlYWNoIHRpbWUgcGxheWVyIGlucHV0c1xuICAqIGRlY2lkZXMgaWYgdGhlIHVzZXIgaXMgb24gdHJhY2ssIGZhaWxlZCBhbmQgd29uXG4gICogbGV0IHRoZSBib3QgKHNpbW9uKSBtYWtlIG1vdmVzIGFjY29yZGluZ2x5XG4gICovXG5Db250cm9sbGVyLnByb3RvdHlwZS5hZHZhbmNlVGhlR2FtZT1mdW5jdGlvbihyZXN1bHQpe1xuICBnYW1lVmlldy5jbGVhckZpblJvdGF0aW9uKCk7XG4gIGlmKHJlc3VsdCE9PVwiQ29ycmVjdCBJbnB1dFwiKXtcbiAgICAvL3VzZXIgc2VxdWVuY2UgaXMgd3JvbmcsIGxldCB0aGVtIHN0YXJ0IGZyb20gc2NyYXRjaCBhZ2FpblxuICAgIHNpbW9uLmNsZWFyUGxheWVyU2VxdWVuY2UoKTtcbiAgfVxuICBpZihyZXN1bHQ9PT1cIk5leHQgTGV2ZWxcIil7XG4gICAgLy91c2VyIGZpbmlzaGVkIGEgc2VxdWVuY2UgZnVsbHksIG1vdmUgdG8gbmV4dCBsZXZlbFxuICAgIGdhbWVWaWV3LnVwZGF0ZVN0YXR1cyhcIk5pY2UsIHdhaXQgZm9yIHlvdXIgdHVybi5cIik7XG4gICAgc2ltb24ucHJlcGFyZUJvdFNlcXVlbmNlKCk7Ly90byBhbGxvdyBrZXkgcHJlc3MvY2xpY2sgVVggZWZmZWN0cyB0byBmaW5pc2g7XG4gICAgZ2FtZVZpZXcuZGlzYWJsZUJsb2NrcygpOyAvL2Jsb2NrIHVzZXIgaW5wdXRzIHVudGlsIHBsYXliYWNrIGlzIG92ZXJcbiAgICBnYW1lVmlldy5pbml0aWF0ZVJlcGxheShzaW1vbi5nZXRCb3RTZXF1ZW5jZSgpKTsgLy9yZXBsYXkgc2VxdWVuY2VcbiAgfWVsc2UgaWYocmVzdWx0PT09XCJUcnkgQWdhaW5cIil7XG4gICAgLy9pbmNvcnJlY3QgdXNlciBpbnB1dCwgbGV0IHRoZSB1c2VyIHRyeSBhZ2FpblxuICAgIGdhbWVWaWV3LnVwZGF0ZVN0YXR1cyhcIldhdGNoIENsb3NlbHkgYW5kIFRyeSBBZ2FpblwiKTtcbiAgICBnYW1lVmlldy5pbml0aWF0ZVJlcGxheShzaW1vbi5nZXRCb3RTZXF1ZW5jZSgpKTtcbiAgICAgIC8vZ2FtZVZpZXcuaW5pdGlhdGVSZXBsYXkoc2ltb24uZ2V0Qm90U2VxdWVuY2UoKSk7XG4gIH1lbHNlIGlmKHJlc3VsdD09PVwiR2FtZSBPdmVyXCIpe1xuICAgIC8vaW5jb3JyZWN0IHVzZXIgaW5wdXQgb24gc3RyaWN0IG1vZGUsIGdhbWUgb3ZlclxuICAgIGdhbWVWaWV3LnVwZGF0ZVN0YXR1cyhcIkdhbWUgT3ZlclwiKTtcbiAgICBzaW1vbi5jbGVhckJvdFNlcXVlbmNlKCk7XG4gICAgZ2FtZVZpZXcucm90YXRlRmlucygpO1xuICB9ZWxzZSBpZihyZXN1bHQ9PT1cIllvdSBXaW5cIil7XG4gICAgLy93ZWxsIGRvbmUgYnkgdXNlclxuICAgIGdhbWVWaWV3LnVwZGF0ZVN0YXR1cygnWW91IFdpbicpO1xuICAgIGdhbWVWaWV3LnJvdGF0ZUZpbnMoKTtcbiAgICBzaW1vbi5jbGVhckJvdFNlcXVlbmNlKCk7IC8vZ2V0IHJlYWR5IGZvciBuZXh0IGdhbWVcbiAgfWVsc2UgaWYocmVzdWx0PT09XCJDb3JyZWN0IElucHV0XCIpe1xuICAgIGdhbWVWaWV3LnVwZGF0ZVN0YXR1cyhzaW1vbi5nZXRQbGF5ZXJTZXF1ZW5jZSgpLmxlbmd0aCk7XG4gIH1cbn07XG5cbi8qKlxuICAqIHRha2UgcGxheWVyIGlucHV0IGFuZCBhY2N1bXVsYXRlXG4gICogZXZhbHVhdGUgYWdhaW5zdCBib3Qgc2VxdWVuY2VcbiAgKiBhZHZhbmNlIHRoZSBnYW1lIGFjY29yZGluZ2x5XG4gICovXG5Db250cm9sbGVyLnByb3RvdHlwZS5wcm9jZXNzUGxheWVySW5wdXQ9ZnVuY3Rpb24oaWQpe1xuICBzaW1vbi5wcmVwYXJlUGxheWVyU2VxdWVuY2UoaWQpO1xuICB2YXIgcmVzdWx0PXNpbW9uLmV2YWx1YXRlR2FtZVN0YXR1cyh0aGlzLnN0cmljdCk7XG4gIGNvbnRyb2xsZXIuYWR2YW5jZVRoZUdhbWUocmVzdWx0KTtcbn07XG4iXSwiZmlsZSI6IkNvbnRyb2xsZXIuanMifQ==
