
function replayBotSequence(){
  if(replayIndex<=botSequence.length){
    var nextBlockID=botSequence[replayIndex];
    var previousBlockID=botSequence[replayIndex-1];
    if(nextBlockID){
      sound(nextBlockID);
      activateBlock(nextBlockID);
      document.querySelector("#counter h2").innerText=replayIndex+1;
    }
    if(previousBlockID)
      deactivateBlock(previousBlockID);
    replayIndex++;
  }else {
    window.clearInterval(replayIntervalID);
  }
}

function activateBlock(id){
  document.querySelector("#" + id).classList.add("js-active");
}

function deactivateBlock(id){
  document.querySelector("#" + id).classList.remove("js-active");
}

function sound(id){
  var audio={
    a: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    b: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    c: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    d: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  };
  var chime=new Audio(audio[id]);
  chime.play();
}

var gamePadClickHandler=function(){
  playerSequence+=this.id;
  sound(this.id);
  var result=evaluateGameStatus();
  var strict=document.querySelector(".strict .toggle").classList.contains("on");
  advanceTheGame(result,strict);
}

var advanceTheGame=function(result){
  if(result!=="correct input"){
    simon.clearPlayerSequence();
  }

  if(result==="Next Level"){
    updateStatus("Next Level");
    prepareBotSequence();//to allow key press/click UX effects to finish;
  }else if(result==="Try Again"){
    updateStatus("Try again");
  }elses if(result==="Game Over"){
      updateStatus("Game Over");
      simon.clearBotSequence();
  }else if(result==="You Win"){
    updateStatus('You Win');
    simon.clearBotSequence();
  }else if(result==="Correct Input"){
    updateStatus(playerSequence.length);
  }
}

function updateStatus(text){
  var counter=document.querySelector("#counter>h2");
  if(text=='You Win'){
    counter.parentNode.classList.remove("error");
    counter.parentNode.classList.add("won");
  }else if(text==="Try again" || text==="Game Over"){
    counter.parentNode.classList.add("error");
  }
  counter.innerText=text;
}
