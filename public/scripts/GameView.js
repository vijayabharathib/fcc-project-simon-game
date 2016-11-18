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
  //inside the _replayBotSequence function called by setInterval
  //this === window object (NOT gameview)
  //hence current 'this' object which equals gameview has to be passed
  //hence, this passed as last parameter in the setInterval
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

GameView.prototype.gamePadClickHandler=function(){
  if(isPlayback)
    return; //playback in progress..
  controller.processPlayerInput(this.id);
  _sound(this.id);
};

GameView.prototype.startTheGame=function(){
  var start=document.querySelector("#start");
  start.innerText="Reset";
  _resetStatus();
  controller.initiateTheGame();
};

function _resetStatus(){
  var counter=document.querySelector("#counter");
  counter.classList.remove("error");
  counter.classList.remove("won");
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
    gameView.updateStatus("Your turn");
  }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJHYW1lVmlldy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBHYW1lVmlldygpe1xufVxudmFyIHJlcGxheUluZGV4PTAsXG4gICAgcmVwbGF5SW50ZXJ2YWxJRCxcbiAgICBpc1BsYXliYWNrPWZhbHNlO1xuXG5HYW1lVmlldy5wcm90b3R5cGUuaW5pdGlhdGVSZXBsYXk9ZnVuY3Rpb24oYm90U2VxdWVuY2Upe1xuICByZXBsYXlJbmRleD0wO1xuICB3aW5kb3cuY2xlYXJJbnRlcnZhbChyZXBsYXlJbnRlcnZhbElEKTtcbiAgaXNQbGF5YmFjaz10cnVlO1xuICByZXBsYXlJbnRlcnZhbElEPXdpbmRvdy5zZXRJbnRlcnZhbChfcmVwbGF5Qm90U2VxdWVuY2UsMTAwMCxib3RTZXF1ZW5jZSx0aGlzKTtcbiAgLy9pbnNpZGUgdGhlIF9yZXBsYXlCb3RTZXF1ZW5jZSBmdW5jdGlvbiBjYWxsZWQgYnkgc2V0SW50ZXJ2YWxcbiAgLy90aGlzID09PSB3aW5kb3cgb2JqZWN0IChOT1QgZ2FtZXZpZXcpXG4gIC8vaGVuY2UgY3VycmVudCAndGhpcycgb2JqZWN0IHdoaWNoIGVxdWFscyBnYW1ldmlldyBoYXMgdG8gYmUgcGFzc2VkXG4gIC8vaGVuY2UsIHRoaXMgcGFzc2VkIGFzIGxhc3QgcGFyYW1ldGVyIGluIHRoZSBzZXRJbnRlcnZhbFxufTtcblxuXG5cbmZ1bmN0aW9uIF9hY3RpdmF0ZUJsb2NrKGlkKXtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNcIiArIGlkKS5jbGFzc0xpc3QuYWRkKFwianMtYWN0aXZlXCIpO1xufVxuXG5mdW5jdGlvbiBfZGVhY3RpdmF0ZUJsb2NrKGlkKXtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNcIiArIGlkKS5jbGFzc0xpc3QucmVtb3ZlKFwianMtYWN0aXZlXCIpO1xufVxuXG5mdW5jdGlvbiBfc291bmQoaWQpe1xuICB2YXIgYXVkaW89e1xuICAgIGE6IFwiaHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL2ZyZWVjb2RlY2FtcC9zaW1vblNvdW5kMS5tcDNcIixcbiAgICBiOiBcImh0dHBzOi8vczMuYW1hem9uYXdzLmNvbS9mcmVlY29kZWNhbXAvc2ltb25Tb3VuZDIubXAzXCIsXG4gICAgYzogXCJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vZnJlZWNvZGVjYW1wL3NpbW9uU291bmQzLm1wM1wiLFxuICAgIGQ6IFwiaHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL2ZyZWVjb2RlY2FtcC9zaW1vblNvdW5kNC5tcDNcIlxuICB9O1xuICB2YXIgY2hpbWU9bmV3IEF1ZGlvKGF1ZGlvW2lkXSk7XG4gIGNoaW1lLnBsYXkoKTtcbn07XG5cbkdhbWVWaWV3LnByb3RvdHlwZS5nYW1lUGFkQ2xpY2tIYW5kbGVyPWZ1bmN0aW9uKCl7XG4gIGlmKGlzUGxheWJhY2spXG4gICAgcmV0dXJuOyAvL3BsYXliYWNrIGluIHByb2dyZXNzLi5cbiAgY29udHJvbGxlci5wcm9jZXNzUGxheWVySW5wdXQodGhpcy5pZCk7XG4gIF9zb3VuZCh0aGlzLmlkKTtcbn07XG5cbkdhbWVWaWV3LnByb3RvdHlwZS5zdGFydFRoZUdhbWU9ZnVuY3Rpb24oKXtcbiAgdmFyIHN0YXJ0PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RhcnRcIik7XG4gIHN0YXJ0LmlubmVyVGV4dD1cIlJlc2V0XCI7XG4gIF9yZXNldFN0YXR1cygpO1xuICBjb250cm9sbGVyLmluaXRpYXRlVGhlR2FtZSgpO1xufTtcblxuZnVuY3Rpb24gX3Jlc2V0U3RhdHVzKCl7XG4gIHZhciBjb3VudGVyPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRlclwiKTtcbiAgY291bnRlci5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG4gIGNvdW50ZXIuY2xhc3NMaXN0LnJlbW92ZShcIndvblwiKTtcbn07XG5cbkdhbWVWaWV3LnByb3RvdHlwZS50b2dnbGVTdHJpY3RNb2RlPWZ1bmN0aW9uKCl7XG4gIHZhciB0b2dnbGU9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdHJpY3QgLnRvZ2dsZVwiKTtcbiAgdG9nZ2xlLmNsYXNzTGlzdC50b2dnbGUoXCJvblwiKTtcbiAgdG9nZ2xlLmNsYXNzTGlzdC50b2dnbGUoXCJvZmZcIik7XG4gIGNvbnRyb2xsZXIudXBkYXRlU3RyaWN0TW9kZSh0b2dnbGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwib25cIikpO1xufTtcblxuR2FtZVZpZXcucHJvdG90eXBlLnVwZGF0ZVN0YXR1cz1mdW5jdGlvbih0ZXh0KXtcbiAgdmFyIGNvdW50ZXI9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb3VudGVyPmgyXCIpO1xuICBpZih0ZXh0PT0nWW91IFdpbicpe1xuICAgIGNvdW50ZXIucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG4gICAgY291bnRlci5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoXCJ3b25cIik7XG4gIH1lbHNlIGlmKHRleHQ9PT1cIlRyeSBhZ2FpblwiIHx8IHRleHQ9PT1cIkdhbWUgT3ZlclwiKXtcbiAgICBjb3VudGVyLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICB9XG4gIGNvdW50ZXIuaW5uZXJUZXh0PXRleHQ7XG59XG5cbmZ1bmN0aW9uIF9yZXBsYXlCb3RTZXF1ZW5jZShib3RTZXF1ZW5jZSxnYW1lVmlldyl7XG4gIGlmKHJlcGxheUluZGV4PD1ib3RTZXF1ZW5jZS5sZW5ndGgpe1xuICAgIHZhciBuZXh0QmxvY2tJRD1ib3RTZXF1ZW5jZVtyZXBsYXlJbmRleF07XG4gICAgdmFyIHByZXZpb3VzQmxvY2tJRD1ib3RTZXF1ZW5jZVtyZXBsYXlJbmRleC0xXTtcbiAgICBpZihuZXh0QmxvY2tJRCl7XG4gICAgICBfc291bmQobmV4dEJsb2NrSUQpO1xuICAgICAgX2FjdGl2YXRlQmxvY2sobmV4dEJsb2NrSUQpO1xuICAgIH1cbiAgICBpZihwcmV2aW91c0Jsb2NrSUQpXG4gICAgICBfZGVhY3RpdmF0ZUJsb2NrKHByZXZpb3VzQmxvY2tJRCk7XG4gICAgcmVwbGF5SW5kZXgrKztcbiAgfWVsc2V7XG4gICAgd2luZG93LmNsZWFySW50ZXJ2YWwocmVwbGF5SW50ZXJ2YWxJRCk7XG4gICAgaXNQbGF5YmFjaz1mYWxzZTtcbiAgICBnYW1lVmlldy51cGRhdGVTdGF0dXMoXCJZb3VyIHR1cm5cIik7XG4gIH1cbn1cbiJdLCJmaWxlIjoiR2FtZVZpZXcuanMifQ==
