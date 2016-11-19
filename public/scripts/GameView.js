function GameView(){
}
var replayIndex=0,
    replayIntervalID,
    isPlayback=false;

GameView.prototype.initiateReplay=function(botSequence){
  replayIndex=0;
  window.clearInterval(replayIntervalID);
  isPlayback=true;
  replayIntervalID=window.setInterval(_replayBotSequence,1000,botSequence,this);
  /**
    * inside the _replayBotSequence function called by setInterval
    * this === window object (NOT gameview)
    * hence current 'this' object which equals gameview has to be passed
    * hence, this passed as last parameter in the setInterval
    */
};

GameView.prototype.gamePadClickHandler=function(){
  if(isPlayback)
    return; //playback in progress..
  controller.processPlayerInput(this.id);
  _sound(this.id);
};

GameView.prototype.startTheGame=function(){
  var start=document.querySelector("#start");
  start.innerText="Restart";
  _resetStatus();
  controller.initiateTheGame();
};

GameView.prototype.toggleStrictMode=function(){
  var toggle=document.querySelector(".strict .toggle");
  toggle.classList.toggle("on");
  toggle.classList.toggle("off");
  controller.updateStrictMode(toggle.classList.contains("on"));
};

GameView.prototype.updateStatus=function(text){
  var counter=document.querySelector("#counter>h2");
  if(text=='You Win'){
    counter.parentNode.classList.remove("error");
    counter.parentNode.classList.add("won");
  }else if(text==="Try again" || text==="Game Over"){
    counter.parentNode.classList.add("error");
  }
  counter.innerText=text;
}

GameView.prototype.showInfoPanel=function(){
  var info_panel=document.querySelector(".info_panel");
  info_panel.classList.add("is-displayed");
  info_panel.classList.remove("is-hidden");
};

GameView.prototype.hideInfoPanel=function(){
  var info_panel=document.querySelector(".info_panel");
  info_panel.classList.add("is-hidden");
  info_panel.classList.remove("is-displayed");
};

GameView.prototype.enableBlocks=function(){
  var blocks=document.querySelectorAll("button.keypad");
  for(var i=0;i<blocks.length;i++)
    blocks[i].removeAttribute('disabled');
};

GameView.prototype.disableBlocks=function(){
  var blocks=document.querySelectorAll("button.keypad");
  for(var i=0;i<blocks.length;i++)
    blocks[i].setAttribute('disabled','disabled');
};

function _activateBlock(id){
  document.querySelector("#" + id).classList.add("js-active");
}

function _deactivateBlock(id){
  document.querySelector("#" + id).classList.remove("js-active");
}

function _sound(id){
  var audio={
    a: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    b: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    c: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    d: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  };
  var chime=new Audio(audio[id]);
  chime.play();
};

function _resetStatus(){
  var counter=document.querySelector("#counter");
  counter.classList.remove("error");
  counter.classList.remove("won");
};

function _replayBotSequence(botSequence,gameView){
  if(replayIndex<=botSequence.length){
    var nextBlockID=botSequence[replayIndex];
    var previousBlockID=botSequence[replayIndex-1];
    if(nextBlockID){
      _sound(nextBlockID);
      _activateBlock(nextBlockID);
    }
    if(previousBlockID)
      _deactivateBlock(previousBlockID);
    replayIndex++;
  }else{
    window.clearInterval(replayIntervalID);
    isPlayback=false;
    gameView.updateStatus("Your turn, go!");
    gameView.enableBlocks();
  }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJHYW1lVmlldy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBHYW1lVmlldygpe1xufVxudmFyIHJlcGxheUluZGV4PTAsXG4gICAgcmVwbGF5SW50ZXJ2YWxJRCxcbiAgICBpc1BsYXliYWNrPWZhbHNlO1xuXG5HYW1lVmlldy5wcm90b3R5cGUuaW5pdGlhdGVSZXBsYXk9ZnVuY3Rpb24oYm90U2VxdWVuY2Upe1xuICByZXBsYXlJbmRleD0wO1xuICB3aW5kb3cuY2xlYXJJbnRlcnZhbChyZXBsYXlJbnRlcnZhbElEKTtcbiAgaXNQbGF5YmFjaz10cnVlO1xuICByZXBsYXlJbnRlcnZhbElEPXdpbmRvdy5zZXRJbnRlcnZhbChfcmVwbGF5Qm90U2VxdWVuY2UsMTAwMCxib3RTZXF1ZW5jZSx0aGlzKTtcbiAgLyoqXG4gICAgKiBpbnNpZGUgdGhlIF9yZXBsYXlCb3RTZXF1ZW5jZSBmdW5jdGlvbiBjYWxsZWQgYnkgc2V0SW50ZXJ2YWxcbiAgICAqIHRoaXMgPT09IHdpbmRvdyBvYmplY3QgKE5PVCBnYW1ldmlldylcbiAgICAqIGhlbmNlIGN1cnJlbnQgJ3RoaXMnIG9iamVjdCB3aGljaCBlcXVhbHMgZ2FtZXZpZXcgaGFzIHRvIGJlIHBhc3NlZFxuICAgICogaGVuY2UsIHRoaXMgcGFzc2VkIGFzIGxhc3QgcGFyYW1ldGVyIGluIHRoZSBzZXRJbnRlcnZhbFxuICAgICovXG59O1xuXG5HYW1lVmlldy5wcm90b3R5cGUuZ2FtZVBhZENsaWNrSGFuZGxlcj1mdW5jdGlvbigpe1xuICBpZihpc1BsYXliYWNrKVxuICAgIHJldHVybjsgLy9wbGF5YmFjayBpbiBwcm9ncmVzcy4uXG4gIGNvbnRyb2xsZXIucHJvY2Vzc1BsYXllcklucHV0KHRoaXMuaWQpO1xuICBfc291bmQodGhpcy5pZCk7XG59O1xuXG5HYW1lVmlldy5wcm90b3R5cGUuc3RhcnRUaGVHYW1lPWZ1bmN0aW9uKCl7XG4gIHZhciBzdGFydD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXJ0XCIpO1xuICBzdGFydC5pbm5lclRleHQ9XCJSZXN0YXJ0XCI7XG4gIF9yZXNldFN0YXR1cygpO1xuICBjb250cm9sbGVyLmluaXRpYXRlVGhlR2FtZSgpO1xufTtcblxuR2FtZVZpZXcucHJvdG90eXBlLnRvZ2dsZVN0cmljdE1vZGU9ZnVuY3Rpb24oKXtcbiAgdmFyIHRvZ2dsZT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0cmljdCAudG9nZ2xlXCIpO1xuICB0b2dnbGUuY2xhc3NMaXN0LnRvZ2dsZShcIm9uXCIpO1xuICB0b2dnbGUuY2xhc3NMaXN0LnRvZ2dsZShcIm9mZlwiKTtcbiAgY29udHJvbGxlci51cGRhdGVTdHJpY3RNb2RlKHRvZ2dsZS5jbGFzc0xpc3QuY29udGFpbnMoXCJvblwiKSk7XG59O1xuXG5HYW1lVmlldy5wcm90b3R5cGUudXBkYXRlU3RhdHVzPWZ1bmN0aW9uKHRleHQpe1xuICB2YXIgY291bnRlcj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdW50ZXI+aDJcIik7XG4gIGlmKHRleHQ9PSdZb3UgV2luJyl7XG4gICAgY291bnRlci5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvclwiKTtcbiAgICBjb3VudGVyLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZChcIndvblwiKTtcbiAgfWVsc2UgaWYodGV4dD09PVwiVHJ5IGFnYWluXCIgfHwgdGV4dD09PVwiR2FtZSBPdmVyXCIpe1xuICAgIGNvdW50ZXIucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gIH1cbiAgY291bnRlci5pbm5lclRleHQ9dGV4dDtcbn1cblxuR2FtZVZpZXcucHJvdG90eXBlLnNob3dJbmZvUGFuZWw9ZnVuY3Rpb24oKXtcbiAgdmFyIGluZm9fcGFuZWw9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvX3BhbmVsXCIpO1xuICBpbmZvX3BhbmVsLmNsYXNzTGlzdC5hZGQoXCJpcy1kaXNwbGF5ZWRcIik7XG4gIGluZm9fcGFuZWwuY2xhc3NMaXN0LnJlbW92ZShcImlzLWhpZGRlblwiKTtcbn07XG5cbkdhbWVWaWV3LnByb3RvdHlwZS5oaWRlSW5mb1BhbmVsPWZ1bmN0aW9uKCl7XG4gIHZhciBpbmZvX3BhbmVsPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb19wYW5lbFwiKTtcbiAgaW5mb19wYW5lbC5jbGFzc0xpc3QuYWRkKFwiaXMtaGlkZGVuXCIpO1xuICBpbmZvX3BhbmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1kaXNwbGF5ZWRcIik7XG59O1xuXG5HYW1lVmlldy5wcm90b3R5cGUuZW5hYmxlQmxvY2tzPWZ1bmN0aW9uKCl7XG4gIHZhciBibG9ja3M9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvbi5rZXlwYWRcIik7XG4gIGZvcih2YXIgaT0wO2k8YmxvY2tzLmxlbmd0aDtpKyspXG4gICAgYmxvY2tzW2ldLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbn07XG5cbkdhbWVWaWV3LnByb3RvdHlwZS5kaXNhYmxlQmxvY2tzPWZ1bmN0aW9uKCl7XG4gIHZhciBibG9ja3M9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvbi5rZXlwYWRcIik7XG4gIGZvcih2YXIgaT0wO2k8YmxvY2tzLmxlbmd0aDtpKyspXG4gICAgYmxvY2tzW2ldLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCdkaXNhYmxlZCcpO1xufTtcblxuZnVuY3Rpb24gX2FjdGl2YXRlQmxvY2soaWQpe1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiICsgaWQpLmNsYXNzTGlzdC5hZGQoXCJqcy1hY3RpdmVcIik7XG59XG5cbmZ1bmN0aW9uIF9kZWFjdGl2YXRlQmxvY2soaWQpe1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiICsgaWQpLmNsYXNzTGlzdC5yZW1vdmUoXCJqcy1hY3RpdmVcIik7XG59XG5cbmZ1bmN0aW9uIF9zb3VuZChpZCl7XG4gIHZhciBhdWRpbz17XG4gICAgYTogXCJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vZnJlZWNvZGVjYW1wL3NpbW9uU291bmQxLm1wM1wiLFxuICAgIGI6IFwiaHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL2ZyZWVjb2RlY2FtcC9zaW1vblNvdW5kMi5tcDNcIixcbiAgICBjOiBcImh0dHBzOi8vczMuYW1hem9uYXdzLmNvbS9mcmVlY29kZWNhbXAvc2ltb25Tb3VuZDMubXAzXCIsXG4gICAgZDogXCJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vZnJlZWNvZGVjYW1wL3NpbW9uU291bmQ0Lm1wM1wiXG4gIH07XG4gIHZhciBjaGltZT1uZXcgQXVkaW8oYXVkaW9baWRdKTtcbiAgY2hpbWUucGxheSgpO1xufTtcblxuZnVuY3Rpb24gX3Jlc2V0U3RhdHVzKCl7XG4gIHZhciBjb3VudGVyPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRlclwiKTtcbiAgY291bnRlci5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG4gIGNvdW50ZXIuY2xhc3NMaXN0LnJlbW92ZShcIndvblwiKTtcbn07XG5cbmZ1bmN0aW9uIF9yZXBsYXlCb3RTZXF1ZW5jZShib3RTZXF1ZW5jZSxnYW1lVmlldyl7XG4gIGlmKHJlcGxheUluZGV4PD1ib3RTZXF1ZW5jZS5sZW5ndGgpe1xuICAgIHZhciBuZXh0QmxvY2tJRD1ib3RTZXF1ZW5jZVtyZXBsYXlJbmRleF07XG4gICAgdmFyIHByZXZpb3VzQmxvY2tJRD1ib3RTZXF1ZW5jZVtyZXBsYXlJbmRleC0xXTtcbiAgICBpZihuZXh0QmxvY2tJRCl7XG4gICAgICBfc291bmQobmV4dEJsb2NrSUQpO1xuICAgICAgX2FjdGl2YXRlQmxvY2sobmV4dEJsb2NrSUQpO1xuICAgIH1cbiAgICBpZihwcmV2aW91c0Jsb2NrSUQpXG4gICAgICBfZGVhY3RpdmF0ZUJsb2NrKHByZXZpb3VzQmxvY2tJRCk7XG4gICAgcmVwbGF5SW5kZXgrKztcbiAgfWVsc2V7XG4gICAgd2luZG93LmNsZWFySW50ZXJ2YWwocmVwbGF5SW50ZXJ2YWxJRCk7XG4gICAgaXNQbGF5YmFjaz1mYWxzZTtcbiAgICBnYW1lVmlldy51cGRhdGVTdGF0dXMoXCJZb3VyIHR1cm4sIGdvIVwiKTtcbiAgICBnYW1lVmlldy5lbmFibGVCbG9ja3MoKTtcbiAgfVxufVxuIl0sImZpbGUiOiJHYW1lVmlldy5qcyJ9
