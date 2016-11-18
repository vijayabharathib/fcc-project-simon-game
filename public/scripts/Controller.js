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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJDb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIENvbnRyb2xsZXIoKXtcblxufTtcblxuQ29udHJvbGxlci5wcm90b3R5cGUuc3RyaWN0PWZhbHNlO1xuQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlU3RyaWN0TW9kZT1mdW5jdGlvbihmbGFnKXtcbiAgdGhpcy5zdHJpY3Q9ZmxhZztcbn07XG5Db250cm9sbGVyLnByb3RvdHlwZS5pbml0aWF0ZVRoZUdhbWU9ZnVuY3Rpb24oKXtcbiAgc2ltb24uY2xlYXJCb3RTZXF1ZW5jZSgpO1xuICBzaW1vbi5wcmVwYXJlQm90U2VxdWVuY2UoKTtcbiAgY29uc29sZS5sb2coXCJib3Q6IFwiICsgc2ltb24uZ2V0Qm90U2VxdWVuY2UoKSk7XG4gIGdhbWVWaWV3LmluaXRpYXRlUmVwbGF5KHNpbW9uLmdldEJvdFNlcXVlbmNlKCkpO1xufTtcbkNvbnRyb2xsZXIucHJvdG90eXBlLmFkdmFuY2VUaGVHYW1lPWZ1bmN0aW9uKHJlc3VsdCl7XG4gIGlmKHJlc3VsdCE9PVwiY29ycmVjdCBpbnB1dFwiKXtcbiAgICBzaW1vbi5jbGVhclBsYXllclNlcXVlbmNlKCk7XG4gIH1cbiAgaWYocmVzdWx0PT09XCJOZXh0IExldmVsXCIpe1xuICAgIGdhbWVWaWV3LnVwZGF0ZVN0YXR1cyhcIk5leHQgTGV2ZWxcIik7XG4gICAgc2ltb24ucHJlcGFyZUJvdFNlcXVlbmNlKCk7Ly90byBhbGxvdyBrZXkgcHJlc3MvY2xpY2sgVVggZWZmZWN0cyB0byBmaW5pc2g7XG4gICAgZ2FtZXZpZXcuaW5pdGlhdGVSZXBsYXkoKTtcbiAgfWVsc2UgaWYocmVzdWx0PT09XCJUcnkgQWdhaW5cIil7XG4gICAgZ2FtZVZpZXcudXBkYXRlU3RhdHVzKFwiVHJ5IGFnYWluXCIpO1xuICB9ZWxzZSBpZihyZXN1bHQ9PT1cIkdhbWUgT3ZlclwiKXtcbiAgICAgIGdhbWVWaWV3LnVwZGF0ZVN0YXR1cyhcIkdhbWUgT3ZlclwiKTtcbiAgICAgIHNpbW9uLmNsZWFyQm90U2VxdWVuY2UoKTtcbiAgfWVsc2UgaWYocmVzdWx0PT09XCJZb3UgV2luXCIpe1xuICAgIGdhbWVWaWV3LnVwZGF0ZVN0YXR1cygnWW91IFdpbicpO1xuICAgIHNpbW9uLmNsZWFyQm90U2VxdWVuY2UoKTtcbiAgfWVsc2UgaWYocmVzdWx0PT09XCJDb3JyZWN0IElucHV0XCIpe1xuICAgIGdhbWVWaWV3LnVwZGF0ZVN0YXR1cyhzaW1vbi5nZXRQbGF5ZXJTZXF1ZW5jZSgpLmxlbmd0aCk7XG4gIH1cbn1cblxuQ29udHJvbGxlci5wcm90b3R5cGUucHJvY2Vzc1BsYXllcklucHV0PWZ1bmN0aW9uKGlkKXtcbiAgc2ltb24ucHJlcGFyZVBsYXllclNlcXVlbmNlKGlkKTtcbiAgdmFyIHJlc3VsdD1zaW1vbi5ldmFsdWF0ZUdhbWVTdGF0dXMoc3RyaWN0KTtcbiAgY29udHJvbGxlci5hZHZhbmNlVGhlR2FtZShyZXN1bHQpO1xufVxuIl0sImZpbGUiOiJDb250cm9sbGVyLmpzIn0=
