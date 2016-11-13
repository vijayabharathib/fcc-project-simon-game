/**
  * wait until the doc is ready to obey orders
  */
  var botSequence=""; //start with blank
  var playerSequence="";
  var replayIndex=0;
  var replayIntervalID;
document.addEventListener("DOMContentLoaded",function(e){
  /**
    * once content is loaded
    */
  startButtonHandler();
  processPlayerInput();
  setupKeyHandlers();
});

function prepareBotSequence(){
  var min=97; //code for a
  var max=101; //code for e, e is excluded in random
  var c=Math.floor(Math.random()*(max-min))+min;
  c=String.fromCharCode(c);
  while(botSequence.length>0 && c===botSequence[botSequence.length-1]){
    c=Math.floor(Math.random()*(max-min))+min;
    c=String.fromCharCode(c);
  }
  botSequence+=c;
  console.log("bot sequence:" + botSequence);
  replayIndex=0;
  window.clearInterval(replayIntervalID);
  replayIntervalID=window.setInterval(replayBotSequence,1000);
}

function replayBotSequence(){
  if(replayIndex<=botSequence.length){
    var nextBlockID=botSequence[replayIndex];
    var previousBlockID=botSequence[replayIndex-1];
    if(nextBlockID){
      activateBlock(nextBlockID);
      document.querySelector("#counter").innerText=replayIndex+1;
    }
    if(previousBlockID)
      deactivateBlock(previousBlockID);
    replayIndex++;
  }else {
    window.clearInterval(replayIntervalID);
  }
}

function activateBlock(id){
  console.log('activate:'+id)
  document.querySelector("#" + id).classList.add("js-active");
}

function deactivateBlock(id){
  console.log('de-activate:'+id)

  document.querySelector("#" + id).classList.remove("js-active");
}

/**
  * start the game
  */
function startButtonHandler(){
  var startGame=function(){
    prepareBotSequence();
  };
  var start=document.querySelector("#start");
  start.onclick=startGame;
}


/**

  */
function processPlayerInput(){
  /**
    */
  var gamePadClickHandler=function(){
    playerSequence+=this.id;
    document.querySelector("#counter").innerText=playerSequence.length;
    var result=evaluateGameStatus();
    if(result==="success"){

      playerSequence="";//let the player start from scratch;
      prepareBotSequence();//to allow key press/click UX effects to finish;
    }else if(result==="incorrect input"){
      playerSequence=""; //give the player another chance to try the sequence
      document.querySelector("#counter").innerText=00;
    }else if(result==="win"){
      playerSequence="";
      botSequence="";
    }else if(result==="game still on"){
    }
  };

  function evaluateGameStatus(){
    console.log("player seq: "+ playerSequence);
    var result=false;
    var psLength=playerSequence.length;
    var bsLength=botSequence.length;
    if(psLength==6 && playerSequence===botSequence){
      result="win";
    }else if(psLength===bsLength && playerSequence===botSequence){
      result="success";
    } else if(psLength<bsLength && playerSequence===botSequence.substring(0,psLength)){
      result="game still on";
    } else if(psLength<=bsLength && playerSequence!==botSequence.substring(0,psLength)){
      result="incorrect input";
    }
    console.log("evaluation status:"+result);
    return result;
  }

  /**
    */
  var buttons=document.querySelectorAll(".game button.keypad");
  console.log(buttons.length);
  for(var i=0;i<buttons.length;i++){
    buttons[i].onclick=gamePadClickHandler;
  }

  function chime(){
    var chime=new Audio("public/audio/chime.ogg");
    chime.play();
  }
}

function setupKeyHandlers(){
  document.onkeypress=function(event){
    var c=event.key.toLowerCase();
    console.log('keypress:'+c);
    switch(c){
      case 'a':
      case 'b':
      case 'c':
      case 'd':
        var block=document.querySelector("#" +c);
        block.click();

        break;
    }
  };

}
