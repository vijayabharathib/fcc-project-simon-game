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