function GameView(){

}
var replayIndex=0;
GameView.prototype.replayIntervalID;
GameView.prototype.initiateReplay=function(botSequence){
  replayIndex=0;
  window.clearInterval(this.replayIntervalID);
  this.replayIntervalID=window.setInterval(_replayBotSequence(botSequence),1000);
};

function _replayBotSequence(botSequence){
  console.log("replay: "+replayIndex);
  if(replayIndex<=botSequence.length){
    var nextBlockID=botSequence[replayIndex];
    var previousBlockID=botSequence[replayIndex-1];
    if(nextBlockID){
      _sound(nextBlockID);
      _activateBlock(nextBlockID);
      document.querySelector("#counter h2").innerText=replayIndex+1;
    }
    if(previousBlockID)
      _deactivateBlock(previousBlockID);
    replayIndex++;
  }else {
    window.clearInterval(this.replayIntervalID);
  }
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
  controller.processPlayerInput(this.id);
  simon.preparePlayerSequence(this.id);
  _sound(this.id);
  var result=evaluateGameStatus();
  var strict=document.querySelector(".strict .toggle").classList.contains("on");
  controller.advanceTheGame(result,strict);
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
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJHYW1lVmlldy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBHYW1lVmlldygpe1xuXG59XG52YXIgcmVwbGF5SW5kZXg9MDtcbkdhbWVWaWV3LnByb3RvdHlwZS5yZXBsYXlJbnRlcnZhbElEO1xuR2FtZVZpZXcucHJvdG90eXBlLmluaXRpYXRlUmVwbGF5PWZ1bmN0aW9uKGJvdFNlcXVlbmNlKXtcbiAgcmVwbGF5SW5kZXg9MDtcbiAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5yZXBsYXlJbnRlcnZhbElEKTtcbiAgdGhpcy5yZXBsYXlJbnRlcnZhbElEPXdpbmRvdy5zZXRJbnRlcnZhbChfcmVwbGF5Qm90U2VxdWVuY2UoYm90U2VxdWVuY2UpLDEwMDApO1xufTtcblxuZnVuY3Rpb24gX3JlcGxheUJvdFNlcXVlbmNlKGJvdFNlcXVlbmNlKXtcbiAgY29uc29sZS5sb2coXCJyZXBsYXk6IFwiK3JlcGxheUluZGV4KTtcbiAgaWYocmVwbGF5SW5kZXg8PWJvdFNlcXVlbmNlLmxlbmd0aCl7XG4gICAgdmFyIG5leHRCbG9ja0lEPWJvdFNlcXVlbmNlW3JlcGxheUluZGV4XTtcbiAgICB2YXIgcHJldmlvdXNCbG9ja0lEPWJvdFNlcXVlbmNlW3JlcGxheUluZGV4LTFdO1xuICAgIGlmKG5leHRCbG9ja0lEKXtcbiAgICAgIF9zb3VuZChuZXh0QmxvY2tJRCk7XG4gICAgICBfYWN0aXZhdGVCbG9jayhuZXh0QmxvY2tJRCk7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdW50ZXIgaDJcIikuaW5uZXJUZXh0PXJlcGxheUluZGV4KzE7XG4gICAgfVxuICAgIGlmKHByZXZpb3VzQmxvY2tJRClcbiAgICAgIF9kZWFjdGl2YXRlQmxvY2socHJldmlvdXNCbG9ja0lEKTtcbiAgICByZXBsYXlJbmRleCsrO1xuICB9ZWxzZSB7XG4gICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5yZXBsYXlJbnRlcnZhbElEKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gX2FjdGl2YXRlQmxvY2soaWQpe1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiICsgaWQpLmNsYXNzTGlzdC5hZGQoXCJqcy1hY3RpdmVcIik7XG59XG5cbmZ1bmN0aW9uIF9kZWFjdGl2YXRlQmxvY2soaWQpe1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiICsgaWQpLmNsYXNzTGlzdC5yZW1vdmUoXCJqcy1hY3RpdmVcIik7XG59XG5cbmZ1bmN0aW9uIF9zb3VuZChpZCl7XG4gIHZhciBhdWRpbz17XG4gICAgYTogXCJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vZnJlZWNvZGVjYW1wL3NpbW9uU291bmQxLm1wM1wiLFxuICAgIGI6IFwiaHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL2ZyZWVjb2RlY2FtcC9zaW1vblNvdW5kMi5tcDNcIixcbiAgICBjOiBcImh0dHBzOi8vczMuYW1hem9uYXdzLmNvbS9mcmVlY29kZWNhbXAvc2ltb25Tb3VuZDMubXAzXCIsXG4gICAgZDogXCJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vZnJlZWNvZGVjYW1wL3NpbW9uU291bmQ0Lm1wM1wiXG4gIH07XG4gIHZhciBjaGltZT1uZXcgQXVkaW8oYXVkaW9baWRdKTtcbiAgY2hpbWUucGxheSgpO1xufTtcblxuR2FtZVZpZXcucHJvdG90eXBlLmdhbWVQYWRDbGlja0hhbmRsZXI9ZnVuY3Rpb24oKXtcbiAgY29udHJvbGxlci5wcm9jZXNzUGxheWVySW5wdXQodGhpcy5pZCk7XG4gIHNpbW9uLnByZXBhcmVQbGF5ZXJTZXF1ZW5jZSh0aGlzLmlkKTtcbiAgX3NvdW5kKHRoaXMuaWQpO1xuICB2YXIgcmVzdWx0PWV2YWx1YXRlR2FtZVN0YXR1cygpO1xuICB2YXIgc3RyaWN0PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RyaWN0IC50b2dnbGVcIikuY2xhc3NMaXN0LmNvbnRhaW5zKFwib25cIik7XG4gIGNvbnRyb2xsZXIuYWR2YW5jZVRoZUdhbWUocmVzdWx0LHN0cmljdCk7XG59O1xuXG5HYW1lVmlldy5wcm90b3R5cGUuc3RhcnRUaGVHYW1lPWZ1bmN0aW9uKCl7XG4gIHZhciBzdGFydD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXJ0XCIpO1xuICBzdGFydC5pbm5lclRleHQ9XCJSZXNldFwiO1xuICBfcmVzZXRTdGF0dXMoKTtcbiAgY29udHJvbGxlci5pbml0aWF0ZVRoZUdhbWUoKTtcbn07XG5cbmZ1bmN0aW9uIF9yZXNldFN0YXR1cygpe1xuICB2YXIgY291bnRlcj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdW50ZXJcIik7XG4gIGNvdW50ZXIuY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xuICBjb3VudGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJ3b25cIik7XG59O1xuXG5HYW1lVmlldy5wcm90b3R5cGUudG9nZ2xlU3RyaWN0TW9kZT1mdW5jdGlvbigpe1xuICB2YXIgdG9nZ2xlPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RyaWN0IC50b2dnbGVcIik7XG4gIHRvZ2dsZS5jbGFzc0xpc3QudG9nZ2xlKFwib25cIik7XG4gIHRvZ2dsZS5jbGFzc0xpc3QudG9nZ2xlKFwib2ZmXCIpO1xuICBjb250cm9sbGVyLnVwZGF0ZVN0cmljdE1vZGUodG9nZ2xlLmNsYXNzTGlzdC5jb250YWlucyhcIm9uXCIpKTtcbn07XG5cbkdhbWVWaWV3LnByb3RvdHlwZS51cGRhdGVTdGF0dXM9ZnVuY3Rpb24odGV4dCl7XG4gIHZhciBjb3VudGVyPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRlcj5oMlwiKTtcbiAgaWYodGV4dD09J1lvdSBXaW4nKXtcbiAgICBjb3VudGVyLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xuICAgIGNvdW50ZXIucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKFwid29uXCIpO1xuICB9ZWxzZSBpZih0ZXh0PT09XCJUcnkgYWdhaW5cIiB8fCB0ZXh0PT09XCJHYW1lIE92ZXJcIil7XG4gICAgY291bnRlci5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgfVxuICBjb3VudGVyLmlubmVyVGV4dD10ZXh0O1xufTtcbiJdLCJmaWxlIjoiR2FtZVZpZXcuanMifQ==
