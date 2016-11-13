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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICAqIHdhaXQgdW50aWwgdGhlIGRvYyBpcyByZWFkeSB0byBvYmV5IG9yZGVyc1xuICAqL1xuICB2YXIgYm90U2VxdWVuY2U9XCJcIjsgLy9zdGFydCB3aXRoIGJsYW5rXG4gIHZhciBwbGF5ZXJTZXF1ZW5jZT1cIlwiO1xuICB2YXIgcmVwbGF5SW5kZXg9MDtcbiAgdmFyIHJlcGxheUludGVydmFsSUQ7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLGZ1bmN0aW9uKGUpe1xuICAvKipcbiAgICAqIG9uY2UgY29udGVudCBpcyBsb2FkZWRcbiAgICAqL1xuICBzdGFydEJ1dHRvbkhhbmRsZXIoKTtcbiAgcHJvY2Vzc1BsYXllcklucHV0KCk7XG4gIHNldHVwS2V5SGFuZGxlcnMoKTtcbn0pO1xuXG5mdW5jdGlvbiBwcmVwYXJlQm90U2VxdWVuY2UoKXtcbiAgdmFyIG1pbj05NzsgLy9jb2RlIGZvciBhXG4gIHZhciBtYXg9MTAxOyAvL2NvZGUgZm9yIGUsIGUgaXMgZXhjbHVkZWQgaW4gcmFuZG9tXG4gIHZhciBjPU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoobWF4LW1pbikpK21pbjtcbiAgYz1TdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xuICB3aGlsZShib3RTZXF1ZW5jZS5sZW5ndGg+MCAmJiBjPT09Ym90U2VxdWVuY2VbYm90U2VxdWVuY2UubGVuZ3RoLTFdKXtcbiAgICBjPU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoobWF4LW1pbikpK21pbjtcbiAgICBjPVN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG4gIH1cbiAgYm90U2VxdWVuY2UrPWM7XG4gIGNvbnNvbGUubG9nKFwiYm90IHNlcXVlbmNlOlwiICsgYm90U2VxdWVuY2UpO1xuICByZXBsYXlJbmRleD0wO1xuICB3aW5kb3cuY2xlYXJJbnRlcnZhbChyZXBsYXlJbnRlcnZhbElEKTtcbiAgcmVwbGF5SW50ZXJ2YWxJRD13aW5kb3cuc2V0SW50ZXJ2YWwocmVwbGF5Qm90U2VxdWVuY2UsMTAwMCk7XG59XG5cbmZ1bmN0aW9uIHJlcGxheUJvdFNlcXVlbmNlKCl7XG4gIGlmKHJlcGxheUluZGV4PD1ib3RTZXF1ZW5jZS5sZW5ndGgpe1xuICAgIHZhciBuZXh0QmxvY2tJRD1ib3RTZXF1ZW5jZVtyZXBsYXlJbmRleF07XG4gICAgdmFyIHByZXZpb3VzQmxvY2tJRD1ib3RTZXF1ZW5jZVtyZXBsYXlJbmRleC0xXTtcbiAgICBpZihuZXh0QmxvY2tJRCl7XG4gICAgICBhY3RpdmF0ZUJsb2NrKG5leHRCbG9ja0lEKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRlclwiKS5pbm5lclRleHQ9cmVwbGF5SW5kZXgrMTtcbiAgICB9XG4gICAgaWYocHJldmlvdXNCbG9ja0lEKVxuICAgICAgZGVhY3RpdmF0ZUJsb2NrKHByZXZpb3VzQmxvY2tJRCk7XG4gICAgcmVwbGF5SW5kZXgrKztcbiAgfWVsc2Uge1xuICAgIHdpbmRvdy5jbGVhckludGVydmFsKHJlcGxheUludGVydmFsSUQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFjdGl2YXRlQmxvY2soaWQpe1xuICBjb25zb2xlLmxvZygnYWN0aXZhdGU6JytpZClcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNcIiArIGlkKS5jbGFzc0xpc3QuYWRkKFwianMtYWN0aXZlXCIpO1xufVxuXG5mdW5jdGlvbiBkZWFjdGl2YXRlQmxvY2soaWQpe1xuICBjb25zb2xlLmxvZygnZGUtYWN0aXZhdGU6JytpZClcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiICsgaWQpLmNsYXNzTGlzdC5yZW1vdmUoXCJqcy1hY3RpdmVcIik7XG59XG5cbi8qKlxuICAqIHN0YXJ0IHRoZSBnYW1lXG4gICovXG5mdW5jdGlvbiBzdGFydEJ1dHRvbkhhbmRsZXIoKXtcbiAgdmFyIHN0YXJ0R2FtZT1mdW5jdGlvbigpe1xuICAgIHByZXBhcmVCb3RTZXF1ZW5jZSgpO1xuICB9O1xuICB2YXIgc3RhcnQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdGFydFwiKTtcbiAgc3RhcnQub25jbGljaz1zdGFydEdhbWU7XG59XG5cblxuLyoqXG5cbiAgKi9cbmZ1bmN0aW9uIHByb2Nlc3NQbGF5ZXJJbnB1dCgpe1xuICAvKipcbiAgICAqL1xuICB2YXIgZ2FtZVBhZENsaWNrSGFuZGxlcj1mdW5jdGlvbigpe1xuICAgIHBsYXllclNlcXVlbmNlKz10aGlzLmlkO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRlclwiKS5pbm5lclRleHQ9cGxheWVyU2VxdWVuY2UubGVuZ3RoO1xuICAgIHZhciByZXN1bHQ9ZXZhbHVhdGVHYW1lU3RhdHVzKCk7XG4gICAgaWYocmVzdWx0PT09XCJzdWNjZXNzXCIpe1xuXG4gICAgICBwbGF5ZXJTZXF1ZW5jZT1cIlwiOy8vbGV0IHRoZSBwbGF5ZXIgc3RhcnQgZnJvbSBzY3JhdGNoO1xuICAgICAgcHJlcGFyZUJvdFNlcXVlbmNlKCk7Ly90byBhbGxvdyBrZXkgcHJlc3MvY2xpY2sgVVggZWZmZWN0cyB0byBmaW5pc2g7XG4gICAgfWVsc2UgaWYocmVzdWx0PT09XCJpbmNvcnJlY3QgaW5wdXRcIil7XG4gICAgICBwbGF5ZXJTZXF1ZW5jZT1cIlwiOyAvL2dpdmUgdGhlIHBsYXllciBhbm90aGVyIGNoYW5jZSB0byB0cnkgdGhlIHNlcXVlbmNlXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdW50ZXJcIikuaW5uZXJUZXh0PTAwO1xuICAgIH1lbHNlIGlmKHJlc3VsdD09PVwid2luXCIpe1xuICAgICAgcGxheWVyU2VxdWVuY2U9XCJcIjtcbiAgICAgIGJvdFNlcXVlbmNlPVwiXCI7XG4gICAgfWVsc2UgaWYocmVzdWx0PT09XCJnYW1lIHN0aWxsIG9uXCIpe1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBldmFsdWF0ZUdhbWVTdGF0dXMoKXtcbiAgICBjb25zb2xlLmxvZyhcInBsYXllciBzZXE6IFwiKyBwbGF5ZXJTZXF1ZW5jZSk7XG4gICAgdmFyIHJlc3VsdD1mYWxzZTtcbiAgICB2YXIgcHNMZW5ndGg9cGxheWVyU2VxdWVuY2UubGVuZ3RoO1xuICAgIHZhciBic0xlbmd0aD1ib3RTZXF1ZW5jZS5sZW5ndGg7XG4gICAgaWYocHNMZW5ndGg9PTYgJiYgcGxheWVyU2VxdWVuY2U9PT1ib3RTZXF1ZW5jZSl7XG4gICAgICByZXN1bHQ9XCJ3aW5cIjtcbiAgICB9ZWxzZSBpZihwc0xlbmd0aD09PWJzTGVuZ3RoICYmIHBsYXllclNlcXVlbmNlPT09Ym90U2VxdWVuY2Upe1xuICAgICAgcmVzdWx0PVwic3VjY2Vzc1wiO1xuICAgIH0gZWxzZSBpZihwc0xlbmd0aDxic0xlbmd0aCAmJiBwbGF5ZXJTZXF1ZW5jZT09PWJvdFNlcXVlbmNlLnN1YnN0cmluZygwLHBzTGVuZ3RoKSl7XG4gICAgICByZXN1bHQ9XCJnYW1lIHN0aWxsIG9uXCI7XG4gICAgfSBlbHNlIGlmKHBzTGVuZ3RoPD1ic0xlbmd0aCAmJiBwbGF5ZXJTZXF1ZW5jZSE9PWJvdFNlcXVlbmNlLnN1YnN0cmluZygwLHBzTGVuZ3RoKSl7XG4gICAgICByZXN1bHQ9XCJpbmNvcnJlY3QgaW5wdXRcIjtcbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJldmFsdWF0aW9uIHN0YXR1czpcIityZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICAqL1xuICB2YXIgYnV0dG9ucz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdhbWUgYnV0dG9uLmtleXBhZFwiKTtcbiAgY29uc29sZS5sb2coYnV0dG9ucy5sZW5ndGgpO1xuICBmb3IodmFyIGk9MDtpPGJ1dHRvbnMubGVuZ3RoO2krKyl7XG4gICAgYnV0dG9uc1tpXS5vbmNsaWNrPWdhbWVQYWRDbGlja0hhbmRsZXI7XG4gIH1cblxuICBmdW5jdGlvbiBjaGltZSgpe1xuICAgIHZhciBjaGltZT1uZXcgQXVkaW8oXCJwdWJsaWMvYXVkaW8vY2hpbWUub2dnXCIpO1xuICAgIGNoaW1lLnBsYXkoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXR1cEtleUhhbmRsZXJzKCl7XG4gIGRvY3VtZW50Lm9ua2V5cHJlc3M9ZnVuY3Rpb24oZXZlbnQpe1xuICAgIHZhciBjPWV2ZW50LmtleS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnNvbGUubG9nKCdrZXlwcmVzczonK2MpO1xuICAgIHN3aXRjaChjKXtcbiAgICAgIGNhc2UgJ2EnOlxuICAgICAgY2FzZSAnYic6XG4gICAgICBjYXNlICdjJzpcbiAgICAgIGNhc2UgJ2QnOlxuICAgICAgICB2YXIgYmxvY2s9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNcIiArYyk7XG4gICAgICAgIGJsb2NrLmNsaWNrKCk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG59XG4iXSwiZmlsZSI6Im1haW4uanMifQ==
