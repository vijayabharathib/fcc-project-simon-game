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
  console.log("bot: "+simon.getBotSequence()+
    ";plyer:"+simon.getPlayerSequence()
    +";result:"+result);
  if(result!=="Correct Input"){
    simon.clearPlayerSequence();
  }
  if(result==="Next Level"){
    gameView.updateStatus("Next Level");
    simon.prepareBotSequence();//to allow key press/click UX effects to finish;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJDb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIENvbnRyb2xsZXIoKXtcblxufTtcblxuQ29udHJvbGxlci5wcm90b3R5cGUuc3RyaWN0PWZhbHNlO1xuQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlU3RyaWN0TW9kZT1mdW5jdGlvbihmbGFnKXtcbiAgdGhpcy5zdHJpY3Q9ZmxhZztcbn07XG5Db250cm9sbGVyLnByb3RvdHlwZS5pbml0aWF0ZVRoZUdhbWU9ZnVuY3Rpb24oKXtcbiAgc2ltb24uY2xlYXJCb3RTZXF1ZW5jZSgpO1xuICBzaW1vbi5wcmVwYXJlQm90U2VxdWVuY2UoKTtcbiAgY29uc29sZS5sb2coXCJib3Q6IFwiICsgc2ltb24uZ2V0Qm90U2VxdWVuY2UoKSk7XG4gIGdhbWVWaWV3LmluaXRpYXRlUmVwbGF5KHNpbW9uLmdldEJvdFNlcXVlbmNlKCkpO1xufTtcbkNvbnRyb2xsZXIucHJvdG90eXBlLmFkdmFuY2VUaGVHYW1lPWZ1bmN0aW9uKHJlc3VsdCl7XG4gIGNvbnNvbGUubG9nKFwiYm90OiBcIitzaW1vbi5nZXRCb3RTZXF1ZW5jZSgpK1xuICAgIFwiO3BseWVyOlwiK3NpbW9uLmdldFBsYXllclNlcXVlbmNlKClcbiAgICArXCI7cmVzdWx0OlwiK3Jlc3VsdCk7XG4gIGlmKHJlc3VsdCE9PVwiQ29ycmVjdCBJbnB1dFwiKXtcbiAgICBzaW1vbi5jbGVhclBsYXllclNlcXVlbmNlKCk7XG4gIH1cbiAgaWYocmVzdWx0PT09XCJOZXh0IExldmVsXCIpe1xuICAgIGdhbWVWaWV3LnVwZGF0ZVN0YXR1cyhcIk5leHQgTGV2ZWxcIik7XG4gICAgc2ltb24ucHJlcGFyZUJvdFNlcXVlbmNlKCk7Ly90byBhbGxvdyBrZXkgcHJlc3MvY2xpY2sgVVggZWZmZWN0cyB0byBmaW5pc2g7XG4gICAgZ2FtZVZpZXcuaW5pdGlhdGVSZXBsYXkoc2ltb24uZ2V0Qm90U2VxdWVuY2UoKSk7XG4gIH1lbHNlIGlmKHJlc3VsdD09PVwiVHJ5IEFnYWluXCIpe1xuICAgIGdhbWVWaWV3LnVwZGF0ZVN0YXR1cyhcIlRyeSBhZ2FpblwiKTtcbiAgfWVsc2UgaWYocmVzdWx0PT09XCJHYW1lIE92ZXJcIil7XG4gICAgICBnYW1lVmlldy51cGRhdGVTdGF0dXMoXCJHYW1lIE92ZXJcIik7XG4gICAgICBzaW1vbi5jbGVhckJvdFNlcXVlbmNlKCk7XG4gIH1lbHNlIGlmKHJlc3VsdD09PVwiWW91IFdpblwiKXtcbiAgICBnYW1lVmlldy51cGRhdGVTdGF0dXMoJ1lvdSBXaW4nKTtcbiAgICBzaW1vbi5jbGVhckJvdFNlcXVlbmNlKCk7XG4gIH1lbHNlIGlmKHJlc3VsdD09PVwiQ29ycmVjdCBJbnB1dFwiKXtcbiAgICBnYW1lVmlldy51cGRhdGVTdGF0dXMoc2ltb24uZ2V0UGxheWVyU2VxdWVuY2UoKS5sZW5ndGgpO1xuICB9XG59XG5cbkNvbnRyb2xsZXIucHJvdG90eXBlLnByb2Nlc3NQbGF5ZXJJbnB1dD1mdW5jdGlvbihpZCl7XG4gIHNpbW9uLnByZXBhcmVQbGF5ZXJTZXF1ZW5jZShpZCk7XG4gIHZhciByZXN1bHQ9c2ltb24uZXZhbHVhdGVHYW1lU3RhdHVzKHRoaXMuc3RyaWN0KTtcbiAgY29udHJvbGxlci5hZHZhbmNlVGhlR2FtZShyZXN1bHQpO1xufVxuIl0sImZpbGUiOiJDb250cm9sbGVyLmpzIn0=
