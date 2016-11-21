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
    gameView.updateStatus("Your turn, get " + (gameView.replayIndex-1) + " in order.");
    gameView.enableBlocks(); //allow user to provide inputs
  }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJHYW1lVmlldy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAgKiB2aWV3IGNsYXNzIGZvciB0aGUgZ2FtZVxuICAqIGhhbmRsZXMgdGhlIFVYXG4gICovXG5mdW5jdGlvbiBHYW1lVmlldygpe1xufVxuLy92YXJpYWJsZXMgZm9yIHNlcXVlbmNlIHBsYXliYWNrXG5HYW1lVmlldy5wcm90b3R5cGUuaXNQbGF5YmFjaz1mYWxzZTtcbkdhbWVWaWV3LnByb3RvdHlwZS5yZXBsYXlJbmRleD0wO1xuR2FtZVZpZXcucHJvdG90eXBlLnJlcGxheUludGVydmFsSUQ7XG5cbi8qKlxuICAqIHJlcGxheSBib3Qgc2VxdWVuY2VcbiAgKiBlYWNoIGJsb2NrIGlzIGhpZ2hsaWdodGVkIGluIDEgc2Vjb25kIGludGVydmFsXG4gICovXG5HYW1lVmlldy5wcm90b3R5cGUuaW5pdGlhdGVSZXBsYXk9ZnVuY3Rpb24oYm90U2VxdWVuY2Upe1xuICB0aGlzLnJlcGxheUluZGV4PTA7XG4gIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMucmVwbGF5SW50ZXJ2YWxJRCk7IC8vY2xlYXIgYW55IG9uZ29pbmcgY2FsbGJhY2tzXG4gIHRoaXMuaXNQbGF5YmFjaz10cnVlO1xuICAvL2JvdFNlcXVlbmNlIGFuZCAndGhpcycgYXJlIHBhcmFtZXRlcnMgdG8gX3JlcGxheUJvdFNlcXVlbmNlIGZ1bmN0aW9uIGJlbG93XG4gIHRoaXMucmVwbGF5SW50ZXJ2YWxJRD13aW5kb3cuc2V0SW50ZXJ2YWwoX3JlcGxheUJvdFNlcXVlbmNlLDEwMDAsYm90U2VxdWVuY2UsdGhpcyk7XG4gIC8qKlxuICAgICogaW5zaWRlIHRoZSBfcmVwbGF5Qm90U2VxdWVuY2UgZnVuY3Rpb24gY2FsbGVkIGJ5IHNldEludGVydmFsXG4gICAgKiB0aGlzID09PSB3aW5kb3cgb2JqZWN0IChOT1QgZ2FtZXZpZXcpXG4gICAgKiBoZW5jZSBjdXJyZW50ICd0aGlzJyBvYmplY3Qgd2hpY2ggZXF1YWxzIGdhbWV2aWV3IGhhcyB0byBiZSBwYXNzZWRcbiAgICAqIGhlbmNlLCB0aGlzIHBhc3NlZCBhcyBsYXN0IHBhcmFtZXRlciBpbiB0aGUgc2V0SW50ZXJ2YWxcbiAgICAqL1xufTtcblxuR2FtZVZpZXcucHJvdG90eXBlLmdhbWVQYWRDbGlja0hhbmRsZXI9ZnVuY3Rpb24oKXtcbiAgaWYoZ2FtZVZpZXcuaXNQbGF5YmFjaylcbiAgICByZXR1cm47IC8vcGxheWJhY2sgaW4gcHJvZ3Jlc3MuLmRvIG5vdGhpbmdcbiAgLy9pZiBub3QsIHBsYXkgdGhlIGNvcnJlc3BvbmRpbmcgc291bmRcbiAgLy9hbmQgcHJvY2VzcyB0aGUgaW5wdXRcbiAgZ2FtZVZpZXcuX3NvdW5kKHRoaXMuaWQpO1xuICBjb250cm9sbGVyLnByb2Nlc3NQbGF5ZXJJbnB1dCh0aGlzLmlkKTtcbn07XG5cbi8qKlxuICAqIG1vdmUgdG8gJ2dhbWUgaW4gcHJvZ3Jlc3MnIG1vZGVcbiAgKiBjaGFuZ2UgYnV0dG9uIHRleHQgYW5kIHN0YXR1cyB0ZXh0XG4gICogbGV0IHRoZSBjb250cm9sbGVyIGluaXRpYXRlIHRoZSBnYW1lXG4gICovXG5HYW1lVmlldy5wcm90b3R5cGUuc3RhcnRUaGVHYW1lPWZ1bmN0aW9uKCl7XG4gIHZhciBzdGFydD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXJ0XCIpO1xuICBzdGFydC5pbm5lclRleHQ9XCJSZXN0YXJ0XCI7XG4gIGdhbWVWaWV3Ll9yZXNldFN0YXR1cygpO1xuICBnYW1lVmlldy5jbGVhckZpblJvdGF0aW9uKCk7XG4gIGNvbnRyb2xsZXIuaW5pdGlhdGVUaGVHYW1lKCk7XG59O1xuXG4vKipcbiAgKiB0b2dnbGUgc3RyaWN0IG1vZGVcbiAgKiBhbmQgcGFzcyB0aGUgc3RhdHVzIHRvIGNvbnRyb2xsZXJcbiAgKi9cbkdhbWVWaWV3LnByb3RvdHlwZS50b2dnbGVTdHJpY3RNb2RlPWZ1bmN0aW9uKCl7XG4gIHZhciB0b2dnbGU9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdHJpY3QgLnRvZ2dsZVwiKTtcbiAgdG9nZ2xlLmNsYXNzTGlzdC50b2dnbGUoXCJvblwiKTtcbiAgdG9nZ2xlLmNsYXNzTGlzdC50b2dnbGUoXCJvZmZcIik7XG4gIGNvbnRyb2xsZXIudXBkYXRlU3RyaWN0TW9kZSh0b2dnbGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwib25cIikpO1xufTtcblxuLyoqXG4gICoga2VlcCB0aGUgc3RhdHVzIG1vdmluZ1xuICAqIGhhbmRsZSB0aGUgdmlzdWFsIGhpZ2hsaWdodHMgYWNjb3JkaW5nIHRvIHN0YXR1c1xuICAqL1xuR2FtZVZpZXcucHJvdG90eXBlLnVwZGF0ZVN0YXR1cz1mdW5jdGlvbih0ZXh0KXtcbiAgdmFyIGNvdW50ZXI9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb3VudGVyPmgyXCIpO1xuICBpZih0ZXh0PT0nWW91IFdpbicpe1xuICAgIGNvdW50ZXIucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG4gICAgY291bnRlci5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoXCJ3b25cIik7XG4gIH1lbHNlIGlmKHR5cGVvZiB0ZXh0PT09XCJzdHJpbmdcIiAmJlxuICAgICAgKHRleHQuaW5jbHVkZXMoXCJUcnkgQWdhaW5cIikgfHxcbiAgICAgIHRleHQ9PT1cIkdhbWUgT3ZlclwiKSl7XG4gICAgY291bnRlci5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICBjb3VudGVyLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZShcIndvblwiKTtcbiAgfWVsc2V7XG4gICAgY291bnRlci5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvclwiKTtcbiAgICBjb3VudGVyLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZShcIndvblwiKTtcbiAgfVxuICBjb3VudGVyLmlubmVyVGV4dD10ZXh0O1xufVxuXG5cbkdhbWVWaWV3LnByb3RvdHlwZS5zaG93SW5mb1BhbmVsPWZ1bmN0aW9uKCl7XG4gIHZhciBpbmZvX3BhbmVsPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb19wYW5lbFwiKTtcbiAgaW5mb19wYW5lbC5jbGFzc0xpc3QuYWRkKFwiaXMtZGlzcGxheWVkXCIpO1xuICBpbmZvX3BhbmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1oaWRkZW5cIik7XG59O1xuXG5HYW1lVmlldy5wcm90b3R5cGUuaGlkZUluZm9QYW5lbD1mdW5jdGlvbigpe1xuICB2YXIgaW5mb19wYW5lbD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fcGFuZWxcIik7XG4gIGluZm9fcGFuZWwuY2xhc3NMaXN0LmFkZChcImlzLWhpZGRlblwiKTtcbiAgaW5mb19wYW5lbC5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtZGlzcGxheWVkXCIpO1xufTtcblxuLy8gZnVuY3Rpb25zIHRvIGJsb2NrIHVzZXIgaW5wdXRzIHdoaWxlIHJlcGxheSBpcyBpbiBwcm9ncmVzc1xuR2FtZVZpZXcucHJvdG90eXBlLmVuYWJsZUJsb2Nrcz1mdW5jdGlvbigpe1xuICB2YXIgYmxvY2tzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b24ua2V5cGFkXCIpO1xuICBmb3IodmFyIGk9MDtpPGJsb2Nrcy5sZW5ndGg7aSsrKVxuICAgIGJsb2Nrc1tpXS5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG59O1xuXG4vLyBmdW5jdGlvbnMgdG8gYmxvY2sgdXNlciBpbnB1dHMgd2hpbGUgcmVwbGF5IGlzIGluIHByb2dyZXNzXG5HYW1lVmlldy5wcm90b3R5cGUuZGlzYWJsZUJsb2Nrcz1mdW5jdGlvbigpe1xuICB2YXIgYmxvY2tzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b24ua2V5cGFkXCIpO1xuICBmb3IodmFyIGk9MDtpPGJsb2Nrcy5sZW5ndGg7aSsrKVxuICAgIGJsb2Nrc1tpXS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywnZGlzYWJsZWQnKTtcbn07XG5cbi8vIGZ1bmN0aW9ucyB0byBoaWdobGlnaHQgYmxvY2tzIGR1cmluZyByZXBsYXlcbkdhbWVWaWV3LnByb3RvdHlwZS5fYWN0aXZhdGVCbG9jaz1mdW5jdGlvbihpZCl7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjXCIgKyBpZCkuY2xhc3NMaXN0LmFkZChcImpzLWFjdGl2ZVwiKTtcbn07XG5cbi8vIGZ1bmN0aW9ucyB0byByZW1vdmUgaGlnaGxpZ2h0aW5nIG9mIGJsb2NrcyBkdXJpbmcgcmVwbGF5XG5HYW1lVmlldy5wcm90b3R5cGUuX2RlYWN0aXZhdGVCbG9jaz1mdW5jdGlvbihpZCl7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjXCIgKyBpZCkuY2xhc3NMaXN0LnJlbW92ZShcImpzLWFjdGl2ZVwiKTtcbn1cblxuR2FtZVZpZXcucHJvdG90eXBlLl9zb3VuZD1mdW5jdGlvbihpZCl7XG4gIHZhciBhdWRpbz17XG4gICAgYTogXCJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vZnJlZWNvZGVjYW1wL3NpbW9uU291bmQxLm1wM1wiLFxuICAgIGI6IFwiaHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL2ZyZWVjb2RlY2FtcC9zaW1vblNvdW5kMi5tcDNcIixcbiAgICBjOiBcImh0dHBzOi8vczMuYW1hem9uYXdzLmNvbS9mcmVlY29kZWNhbXAvc2ltb25Tb3VuZDMubXAzXCIsXG4gICAgZDogXCJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vZnJlZWNvZGVjYW1wL3NpbW9uU291bmQ0Lm1wM1wiXG4gIH07XG4gIHZhciBjaGltZT1uZXcgQXVkaW8oYXVkaW9baWRdKTtcbiAgY2hpbWUucGxheSgpO1xufTtcblxuR2FtZVZpZXcucHJvdG90eXBlLl9yZXNldFN0YXR1cz1mdW5jdGlvbigpe1xuICB2YXIgY291bnRlcj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdW50ZXJcIik7XG4gIGNvdW50ZXIuY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xuICBjb3VudGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJ3b25cIik7XG59O1xuXG4vL3JvdGF0ZSB0aGUgd2hvbGUgc2V0IG9mIGJsb2Nrc1xuLy9jc3MgYW5pbWF0aW9uIGFwcGxpZWQgb24gcm90YXRlIGNsYXNzXG4vL2NhbGxlZCB3aGVuIHRoZSBnYW1lIHMgb3ZlciAtIE9SIC0gdXNlciB3aW5zXG5HYW1lVmlldy5wcm90b3R5cGUucm90YXRlRmlucz1mdW5jdGlvbigpe1xuICB2YXIgZmlucz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbnNcIik7XG4gIGZpbnMuY2xhc3NMaXN0LmFkZChcInJvdGF0ZVwiKTtcbn07XG5cbkdhbWVWaWV3LnByb3RvdHlwZS5jbGVhckZpblJvdGF0aW9uPWZ1bmN0aW9uKCl7XG4gIHZhciBmaW5zPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmluc1wiKTtcbiAgZmlucy5jbGFzc0xpc3QucmVtb3ZlKFwicm90YXRlXCIpO1xufTtcbi8vZW5kIG9mIHJvdGF0aW9uXG5cbi8qKlxuICAqIHJlcGxheSBib3Qgc2VxdWVuY2UgYmxvY2sgYnkgYmxvY2tcbiAgKiB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBuIDEgc2Vjb25kIGludGVydmFsc1xuICAqIGhlbmNlIHJlcGxheUluZGV4IGtlZXBzIHNjb3JlIG9mIGxhc3QgcGxheWVkIGluZGV4XG4gICogd2hlbiBzZXF1ZW5jZSBpcyBvdmVyLCB0aGUgbGFzdCBjYWxsIGRlYWN0aXZhdGVzIHByZXZpb3VzIGhpZ2hsaWdodFxuICAqIGFsc28gY2xlYXJzIHRoZSBpbnRlcnZhbCBjYWxsYmFja1xuICAqL1xuZnVuY3Rpb24gX3JlcGxheUJvdFNlcXVlbmNlKGJvdFNlcXVlbmNlLGdhbWVWaWV3KXtcbiAgaWYoZ2FtZVZpZXcucmVwbGF5SW5kZXg8PWJvdFNlcXVlbmNlLmxlbmd0aCl7XG4gICAgdmFyIG5leHRCbG9ja0lEPWJvdFNlcXVlbmNlW2dhbWVWaWV3LnJlcGxheUluZGV4XTtcbiAgICB2YXIgcHJldmlvdXNCbG9ja0lEPWJvdFNlcXVlbmNlW2dhbWVWaWV3LnJlcGxheUluZGV4LTFdO1xuICAgIGlmKG5leHRCbG9ja0lEKXtcbiAgICAgIGdhbWVWaWV3Ll9zb3VuZChuZXh0QmxvY2tJRCk7XG4gICAgICBnYW1lVmlldy5fYWN0aXZhdGVCbG9jayhuZXh0QmxvY2tJRCk7XG4gICAgICBnYW1lVmlldy51cGRhdGVTdGF0dXMoZ2FtZVZpZXcucmVwbGF5SW5kZXgrMSk7XG4gICAgfVxuICAgIGlmKHByZXZpb3VzQmxvY2tJRClcbiAgICAvL3RoaXMgd2lsbCBlbnN1cmUgbGFzdCBjYWxsYmFjayBkZWFjdGl2YXRlcyB0aGUgbGFzdCBibG9ja1xuICAgICAgZ2FtZVZpZXcuX2RlYWN0aXZhdGVCbG9jayhwcmV2aW91c0Jsb2NrSUQpO1xuICAgIGdhbWVWaWV3LnJlcGxheUluZGV4Kys7XG4gIH1lbHNleyAvL3doZW4gcmVwbGF5SW5kZXggZXhjZWVkcyBib3Qgc2VxdWVuY2UgbGVuZ3RoLCBjYW5jZWxsIGNhbGxiYWNrc1xuICAgIHdpbmRvdy5jbGVhckludGVydmFsKGdhbWVWaWV3LnJlcGxheUludGVydmFsSUQpO1xuICAgIGdhbWVWaWV3LmlzUGxheWJhY2s9ZmFsc2U7XG4gICAgZ2FtZVZpZXcudXBkYXRlU3RhdHVzKFwiWW91ciB0dXJuLCBnZXQgXCIgKyAoZ2FtZVZpZXcucmVwbGF5SW5kZXgtMSkgKyBcIiBpbiBvcmRlci5cIik7XG4gICAgZ2FtZVZpZXcuZW5hYmxlQmxvY2tzKCk7IC8vYWxsb3cgdXNlciB0byBwcm92aWRlIGlucHV0c1xuICB9XG59XG4iXSwiZmlsZSI6IkdhbWVWaWV3LmpzIn0=
