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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJDb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIENvbnRyb2xsZXIoKXtcblxufTtcblxuQ29udHJvbGxlci5wcm90b3R5cGUuc3RyaWN0PWZhbHNlO1xuQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlU3RyaWN0TW9kZT1mdW5jdGlvbihmbGFnKXtcbiAgdGhpcy5zdHJpY3Q9ZmxhZztcbn07XG5Db250cm9sbGVyLnByb3RvdHlwZS5pbml0aWF0ZVRoZUdhbWU9ZnVuY3Rpb24oKXtcbiAgc2ltb24uY2xlYXJCb3RTZXF1ZW5jZSgpO1xuICBzaW1vbi5wcmVwYXJlQm90U2VxdWVuY2UoKTtcbiAgZ2FtZVZpZXcuaW5pdGlhdGVSZXBsYXkoc2ltb24uZ2V0Qm90U2VxdWVuY2UoKSk7XG59O1xuQ29udHJvbGxlci5wcm90b3R5cGUuYWR2YW5jZVRoZUdhbWU9ZnVuY3Rpb24ocmVzdWx0KXtcbiAgaWYocmVzdWx0IT09XCJDb3JyZWN0IElucHV0XCIpe1xuICAgIHNpbW9uLmNsZWFyUGxheWVyU2VxdWVuY2UoKTtcbiAgfVxuICBpZihyZXN1bHQ9PT1cIk5leHQgTGV2ZWxcIil7XG4gICAgdmFyIHN1Y2Nlc3NHcmVldGluZz1bXCJOaWNlIVwiLFwiTm90IEJhZCFcIixcIldvdyFcIixcIktlZXAgaXQgdXAhXCIsXCJHb29kIVwiXTtcbiAgICB2YXIgc3VjY2Vzc0luZm9ybT1bXCJXYWl0IEZvciBZb3VyIFR1cm4uXCIsXCJGb2N1cyBvbiB0aGUgc2VxdWVuY2UuXCIsXCJZb3UgY2FuIGRvIGl0LlwiLFwiTGV0J3MgYmVhdCB0aGF0IGJvdC5cIl07XG4gICAgdmFyIGE9TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnN1Y2Nlc3NHcmVldGluZy5sZW5ndGgpXG4gICAgdmFyIGI9TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnN1Y2Nlc3NJbmZvcm0ubGVuZ3RoKVxuICAgIGdhbWVWaWV3LnVwZGF0ZVN0YXR1cyhzdWNjZXNzR3JlZXRpbmdbYV0gKyBcIiBcIiArIHN1Y2Nlc3NJbmZvcm1bYl0pO1xuICAgIHNpbW9uLnByZXBhcmVCb3RTZXF1ZW5jZSgpOy8vdG8gYWxsb3cga2V5IHByZXNzL2NsaWNrIFVYIGVmZmVjdHMgdG8gZmluaXNoO1xuICAgIGdhbWVWaWV3LmRpc2FibGVCbG9ja3MoKTtcbiAgICBnYW1lVmlldy5pbml0aWF0ZVJlcGxheShzaW1vbi5nZXRCb3RTZXF1ZW5jZSgpKTtcbiAgfWVsc2UgaWYocmVzdWx0PT09XCJUcnkgQWdhaW5cIil7XG4gICAgZ2FtZVZpZXcudXBkYXRlU3RhdHVzKFwiVHJ5IGFnYWluXCIpO1xuICB9ZWxzZSBpZihyZXN1bHQ9PT1cIkdhbWUgT3ZlclwiKXtcbiAgICAgIGdhbWVWaWV3LnVwZGF0ZVN0YXR1cyhcIkdhbWUgT3ZlclwiKTtcbiAgICAgIHNpbW9uLmNsZWFyQm90U2VxdWVuY2UoKTtcbiAgfWVsc2UgaWYocmVzdWx0PT09XCJZb3UgV2luXCIpe1xuICAgIGdhbWVWaWV3LnVwZGF0ZVN0YXR1cygnWW91IFdpbicpO1xuICAgIHNpbW9uLmNsZWFyQm90U2VxdWVuY2UoKTtcbiAgfWVsc2UgaWYocmVzdWx0PT09XCJDb3JyZWN0IElucHV0XCIpe1xuICAgIGdhbWVWaWV3LnVwZGF0ZVN0YXR1cyhzaW1vbi5nZXRQbGF5ZXJTZXF1ZW5jZSgpLmxlbmd0aCk7XG4gIH1cbn1cblxuQ29udHJvbGxlci5wcm90b3R5cGUucHJvY2Vzc1BsYXllcklucHV0PWZ1bmN0aW9uKGlkKXtcbiAgc2ltb24ucHJlcGFyZVBsYXllclNlcXVlbmNlKGlkKTtcbiAgdmFyIHJlc3VsdD1zaW1vbi5ldmFsdWF0ZUdhbWVTdGF0dXModGhpcy5zdHJpY3QpO1xuICBjb250cm9sbGVyLmFkdmFuY2VUaGVHYW1lKHJlc3VsdCk7XG59XG4iXSwiZmlsZSI6IkNvbnRyb2xsZXIuanMifQ==
