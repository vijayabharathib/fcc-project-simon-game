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
    botSequence="";
    var start=document.querySelector("#start");
    start.innerText="Reset";
    var counter=document.querySelector("#counter");
    counter.classList.remove("error");
    counter.classList.remove("won");
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
    sound(this.id);
    var counter=document.querySelector("#counter>h2");
    console.log("counter:"+counter.innerText+"parent:"+counter.parentNode.id);
    var result=evaluateGameStatus();
    if(result==="success"){
      playerSequence="";
      prepareBotSequence();//to allow key press/click UX effects to finish;
    }else if(result==="incorrect input"){
      playerSequence=""; //give the player another chance to try the sequence
      counter.innerText=00;
      var strict=document.querySelector(".strict .toggle").classList.contains("on");
      counter.parentNode.classList.add("error");
      if(strict){
        playerSequence="";
        botSequence="";
        var start=document.querySelector("#start");
        start.innerText="Restart";
      }
    }else if(result==="win"){
      counter.innerText="Win";
      counter.parentNode.classList.add("won");
      playerSequence="";
      botSequence="";
      var start=document.querySelector("#start");
      start.innerText="Restart";
    }else if(result==="game still on"){
      counter.innerText=playerSequence.length;
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
  var toggleHandler=function(){
    var toggle=document.querySelector(".strict .toggle");
    toggle.classList.toggle("on");
    toggle.classList.toggle("off");
  };
  var toggles=document.querySelectorAll(".strict .toggle span");
  toggles[0].onclick=toggleHandler;
  toggles[1].onclick=toggleHandler;
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
