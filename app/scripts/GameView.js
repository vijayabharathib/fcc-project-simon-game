/**
  * view class for the game
  * handles the UX
  */
function GameView(){
}
//variables for sequence playback
GameView.prototype.isPlayback=false;
GameView.prototype.replayIndex=0;
GameView.prototype.replayIntervalID;

/**
  * replay bot sequence
  * each block is highlighted in 1 second interval
  */
GameView.prototype.initiateReplay=function(botSequence){
  this.replayIndex=0;
  window.clearInterval(this.replayIntervalID); //clear any ongoing callbacks
  this.isPlayback=true;
  //botSequence and 'this' are parameters to _replayBotSequence function below
  this.replayIntervalID=window.setInterval(_replayBotSequence,1000,botSequence,this);
  /**
    * inside the _replayBotSequence function called by setInterval
    * this === window object (NOT gameview)
    * hence current 'this' object which equals gameview has to be passed
    * hence, this passed as last parameter in the setInterval
    */
};

GameView.prototype.gamePadClickHandler=function(){
  if(gameView.isPlayback)
    return; //playback in progress..do nothing
  //if not, play the corresponding sound
  //and process the input
  gameView._sound(this.id);
  controller.processPlayerInput(this.id);
};

/**
  * move to 'game in progress' mode
  * change button text and status text
  * let the controller initiate the game
  */
GameView.prototype.startTheGame=function(){
  var start=document.querySelector("#start");
  start.innerText="Restart";
  gameView._resetStatus();
  gameView.clearFinRotation();
  controller.initiateTheGame();
};

/**
  * toggle strict mode
  * and pass the status to controller
  */
GameView.prototype.toggleStrictMode=function(){
  var toggle=document.querySelector(".strict .toggle");
  toggle.classList.toggle("on");
  toggle.classList.toggle("off");
  controller.updateStrictMode(toggle.classList.contains("on"));
};

/**
  * keep the status moving
  * handle the visual highlights according to status
  */
GameView.prototype.updateStatus=function(text){
  var counter=document.querySelector("#counter>h2");
  if(text=='You Win'){
    counter.parentNode.classList.remove("error");
    counter.parentNode.classList.add("won");
  }else if(typeof text==="string" &&
      (text.includes("Try Again") ||
      text==="Game Over")){
    counter.parentNode.classList.add("error");
    counter.parentNode.classList.remove("won");
  }else{
    counter.parentNode.classList.remove("error");
    counter.parentNode.classList.remove("won");
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

// functions to block user inputs while replay is in progress
GameView.prototype.enableBlocks=function(){
  var blocks=document.querySelectorAll("button.keypad");
  for(var i=0;i<blocks.length;i++)
    blocks[i].removeAttribute('disabled');
};

// functions to block user inputs while replay is in progress
GameView.prototype.disableBlocks=function(){
  var blocks=document.querySelectorAll("button.keypad");
  for(var i=0;i<blocks.length;i++)
    blocks[i].setAttribute('disabled','disabled');
};

// functions to highlight blocks during replay
GameView.prototype._activateBlock=function(id){
  document.querySelector("#" + id).classList.add("js-active");
};

// functions to remove highlighting of blocks during replay
GameView.prototype._deactivateBlock=function(id){
  document.querySelector("#" + id).classList.remove("js-active");
}

GameView.prototype._sound=function(id){
  var audio={
    a: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    b: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    c: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    d: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  };
  var chime=new Audio(audio[id]);
  chime.play();
};

GameView.prototype._resetStatus=function(){
  var counter=document.querySelector("#counter");
  counter.classList.remove("error");
  counter.classList.remove("won");
};

//rotate the whole set of blocks
//css animation applied on rotate class
//called when the game s over - OR - user wins
GameView.prototype.rotateFins=function(){
  var fins=document.querySelector(".fins");
  fins.classList.add("rotate");
};

GameView.prototype.clearFinRotation=function(){
  var fins=document.querySelector(".fins");
  fins.classList.remove("rotate");
};
//end of rotation 

/**
  * replay bot sequence block by block
  * this function is called n 1 second intervals
  * hence replayIndex keeps score of last played index
  * when sequence is over, the last call deactivates previous highlight
  * also clears the interval callback
  */
function _replayBotSequence(botSequence,gameView){
  if(gameView.replayIndex<=botSequence.length){
    var nextBlockID=botSequence[gameView.replayIndex];
    var previousBlockID=botSequence[gameView.replayIndex-1];
    if(nextBlockID){
      gameView._sound(nextBlockID);
      gameView._activateBlock(nextBlockID);
      gameView.updateStatus(gameView.replayIndex+1);
    }
    if(previousBlockID)
    //this will ensure last callback deactivates the last block
      gameView._deactivateBlock(previousBlockID);
    gameView.replayIndex++;
  }else{ //when replayIndex exceeds bot sequence length, cancell callbacks
    window.clearInterval(gameView.replayIntervalID);
    gameView.isPlayback=false;
    gameView.updateStatus("Your turn, go!");
    gameView.enableBlocks(); //allow user to provide inputs
  }
}
