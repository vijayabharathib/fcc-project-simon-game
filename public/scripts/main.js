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
    document.querySelector('.fins').classList.remove("error");
    document.querySelector('.fins').classList.remove("win");

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
      counter.innerText="Try again";
      var strict=document.querySelector(".strict .toggle").classList.contains("on");
      counter.parentNode.classList.add("error");
      if(strict){
        counter.innerText="Game Over";
        document.querySelector('.fins').classList.add("error");
        playerSequence="";
        botSequence="";
        var start=document.querySelector("#start");
        start.innerText="Restart";
      }
    }else if(result==="win"){
      counter.innerText="Win";
      counter.parentNode.classList.remove("error");
      counter.parentNode.classList.add("won");
      document.querySelector('.fins').classList.add("win");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICAqIHdhaXQgdW50aWwgdGhlIGRvYyBpcyByZWFkeSB0byBvYmV5IG9yZGVyc1xuICAqL1xuICB2YXIgYm90U2VxdWVuY2U9XCJcIjsgLy9zdGFydCB3aXRoIGJsYW5rXG4gIHZhciBwbGF5ZXJTZXF1ZW5jZT1cIlwiO1xuICB2YXIgcmVwbGF5SW5kZXg9MDtcbiAgdmFyIHJlcGxheUludGVydmFsSUQ7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLGZ1bmN0aW9uKGUpe1xuICAvKipcbiAgICAqIG9uY2UgY29udGVudCBpcyBsb2FkZWRcbiAgICAqL1xuICBzdGFydEJ1dHRvbkhhbmRsZXIoKTtcbiAgcHJvY2Vzc1BsYXllcklucHV0KCk7XG4gIHNldHVwS2V5SGFuZGxlcnMoKTtcbn0pO1xuXG5mdW5jdGlvbiBwcmVwYXJlQm90U2VxdWVuY2UoKXtcbiAgdmFyIG1pbj05NzsgLy9jb2RlIGZvciBhXG4gIHZhciBtYXg9MTAxOyAvL2NvZGUgZm9yIGUsIGUgaXMgZXhjbHVkZWQgaW4gcmFuZG9tXG4gIHZhciBjPU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoobWF4LW1pbikpK21pbjtcbiAgYz1TdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xuICB3aGlsZShib3RTZXF1ZW5jZS5sZW5ndGg+MCAmJiBjPT09Ym90U2VxdWVuY2VbYm90U2VxdWVuY2UubGVuZ3RoLTFdKXtcbiAgICBjPU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoobWF4LW1pbikpK21pbjtcbiAgICBjPVN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG4gIH1cbiAgYm90U2VxdWVuY2UrPWM7XG4gIGNvbnNvbGUubG9nKFwiYm90IHNlcXVlbmNlOlwiICsgYm90U2VxdWVuY2UpO1xuICByZXBsYXlJbmRleD0wO1xuICB3aW5kb3cuY2xlYXJJbnRlcnZhbChyZXBsYXlJbnRlcnZhbElEKTtcbiAgcmVwbGF5SW50ZXJ2YWxJRD13aW5kb3cuc2V0SW50ZXJ2YWwocmVwbGF5Qm90U2VxdWVuY2UsMTAwMCk7XG59XG5mdW5jdGlvbiBzb3VuZChpZCl7XG4gIHZhciBhdWRpbz17XG4gICAgYTogXCJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vZnJlZWNvZGVjYW1wL3NpbW9uU291bmQxLm1wM1wiLFxuICAgIGI6IFwiaHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL2ZyZWVjb2RlY2FtcC9zaW1vblNvdW5kMi5tcDNcIixcbiAgICBjOiBcImh0dHBzOi8vczMuYW1hem9uYXdzLmNvbS9mcmVlY29kZWNhbXAvc2ltb25Tb3VuZDMubXAzXCIsXG4gICAgZDogXCJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vZnJlZWNvZGVjYW1wL3NpbW9uU291bmQ0Lm1wM1wiXG4gIH07XG4gIHZhciBjaGltZT1uZXcgQXVkaW8oYXVkaW9baWRdKTtcbiAgY2hpbWUucGxheSgpO1xufVxuZnVuY3Rpb24gcmVwbGF5Qm90U2VxdWVuY2UoKXtcbiAgaWYocmVwbGF5SW5kZXg8PWJvdFNlcXVlbmNlLmxlbmd0aCl7XG4gICAgdmFyIG5leHRCbG9ja0lEPWJvdFNlcXVlbmNlW3JlcGxheUluZGV4XTtcbiAgICB2YXIgcHJldmlvdXNCbG9ja0lEPWJvdFNlcXVlbmNlW3JlcGxheUluZGV4LTFdO1xuICAgIGlmKG5leHRCbG9ja0lEKXtcbiAgICAgIHNvdW5kKG5leHRCbG9ja0lEKTtcbiAgICAgIGFjdGl2YXRlQmxvY2sobmV4dEJsb2NrSUQpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb3VudGVyIGgyXCIpLmlubmVyVGV4dD1yZXBsYXlJbmRleCsxO1xuICAgIH1cbiAgICBpZihwcmV2aW91c0Jsb2NrSUQpXG4gICAgICBkZWFjdGl2YXRlQmxvY2socHJldmlvdXNCbG9ja0lEKTtcbiAgICByZXBsYXlJbmRleCsrO1xuICB9ZWxzZSB7XG4gICAgd2luZG93LmNsZWFySW50ZXJ2YWwocmVwbGF5SW50ZXJ2YWxJRCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWN0aXZhdGVCbG9jayhpZCl7XG4gIGNvbnNvbGUubG9nKCdhY3RpdmF0ZTonK2lkKVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiICsgaWQpLmNsYXNzTGlzdC5hZGQoXCJqcy1hY3RpdmVcIik7XG59XG5cbmZ1bmN0aW9uIGRlYWN0aXZhdGVCbG9jayhpZCl7XG4gIGNvbnNvbGUubG9nKCdkZS1hY3RpdmF0ZTonK2lkKVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjXCIgKyBpZCkuY2xhc3NMaXN0LnJlbW92ZShcImpzLWFjdGl2ZVwiKTtcbn1cblxuLyoqXG4gICogc3RhcnQgdGhlIGdhbWVcbiAgKi9cbmZ1bmN0aW9uIHN0YXJ0QnV0dG9uSGFuZGxlcigpe1xuICB2YXIgc3RhcnRHYW1lPWZ1bmN0aW9uKCl7XG4gICAgYm90U2VxdWVuY2U9XCJcIjtcbiAgICB2YXIgc3RhcnQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdGFydFwiKTtcbiAgICBzdGFydC5pbm5lclRleHQ9XCJSZXNldFwiO1xuICAgIHZhciBjb3VudGVyPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRlclwiKTtcbiAgICBjb3VudGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvclwiKTtcbiAgICBjb3VudGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJ3b25cIik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbnMnKS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbnMnKS5jbGFzc0xpc3QucmVtb3ZlKFwid2luXCIpO1xuXG4gICAgcHJlcGFyZUJvdFNlcXVlbmNlKCk7XG4gIH07XG4gIHZhciBzdGFydD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXJ0XCIpO1xuICBzdGFydC5vbmNsaWNrPXN0YXJ0R2FtZTtcbn1cblxuXG4vKipcblxuICAqL1xuZnVuY3Rpb24gcHJvY2Vzc1BsYXllcklucHV0KCl7XG4gIC8qKlxuICAgICovXG4gIHZhciBnYW1lUGFkQ2xpY2tIYW5kbGVyPWZ1bmN0aW9uKCl7XG4gICAgcGxheWVyU2VxdWVuY2UrPXRoaXMuaWQ7XG4gICAgc291bmQodGhpcy5pZCk7XG4gICAgdmFyIGNvdW50ZXI9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb3VudGVyPmgyXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiY291bnRlcjpcIitjb3VudGVyLmlubmVyVGV4dCtcInBhcmVudDpcIitjb3VudGVyLnBhcmVudE5vZGUuaWQpO1xuICAgIHZhciByZXN1bHQ9ZXZhbHVhdGVHYW1lU3RhdHVzKCk7XG4gICAgaWYocmVzdWx0PT09XCJzdWNjZXNzXCIpe1xuICAgICAgcGxheWVyU2VxdWVuY2U9XCJcIjtcbiAgICAgIHByZXBhcmVCb3RTZXF1ZW5jZSgpOy8vdG8gYWxsb3cga2V5IHByZXNzL2NsaWNrIFVYIGVmZmVjdHMgdG8gZmluaXNoO1xuICAgIH1lbHNlIGlmKHJlc3VsdD09PVwiaW5jb3JyZWN0IGlucHV0XCIpe1xuICAgICAgcGxheWVyU2VxdWVuY2U9XCJcIjsgLy9naXZlIHRoZSBwbGF5ZXIgYW5vdGhlciBjaGFuY2UgdG8gdHJ5IHRoZSBzZXF1ZW5jZVxuICAgICAgY291bnRlci5pbm5lclRleHQ9XCJUcnkgYWdhaW5cIjtcbiAgICAgIHZhciBzdHJpY3Q9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdHJpY3QgLnRvZ2dsZVwiKS5jbGFzc0xpc3QuY29udGFpbnMoXCJvblwiKTtcbiAgICAgIGNvdW50ZXIucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgICBpZihzdHJpY3Qpe1xuICAgICAgICBjb3VudGVyLmlubmVyVGV4dD1cIkdhbWUgT3ZlclwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlucycpLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICAgICAgcGxheWVyU2VxdWVuY2U9XCJcIjtcbiAgICAgICAgYm90U2VxdWVuY2U9XCJcIjtcbiAgICAgICAgdmFyIHN0YXJ0PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RhcnRcIik7XG4gICAgICAgIHN0YXJ0LmlubmVyVGV4dD1cIlJlc3RhcnRcIjtcbiAgICAgIH1cbiAgICB9ZWxzZSBpZihyZXN1bHQ9PT1cIndpblwiKXtcbiAgICAgIGNvdW50ZXIuaW5uZXJUZXh0PVwiV2luXCI7XG4gICAgICBjb3VudGVyLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xuICAgICAgY291bnRlci5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoXCJ3b25cIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlucycpLmNsYXNzTGlzdC5hZGQoXCJ3aW5cIik7XG4gICAgICBwbGF5ZXJTZXF1ZW5jZT1cIlwiO1xuICAgICAgYm90U2VxdWVuY2U9XCJcIjtcbiAgICAgIHZhciBzdGFydD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXJ0XCIpO1xuICAgICAgc3RhcnQuaW5uZXJUZXh0PVwiUmVzdGFydFwiO1xuICAgIH1lbHNlIGlmKHJlc3VsdD09PVwiZ2FtZSBzdGlsbCBvblwiKXtcbiAgICAgIGNvdW50ZXIuaW5uZXJUZXh0PXBsYXllclNlcXVlbmNlLmxlbmd0aDtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gZXZhbHVhdGVHYW1lU3RhdHVzKCl7XG4gICAgY29uc29sZS5sb2coXCJwbGF5ZXIgc2VxOiBcIisgcGxheWVyU2VxdWVuY2UpO1xuICAgIHZhciByZXN1bHQ9ZmFsc2U7XG4gICAgdmFyIHBzTGVuZ3RoPXBsYXllclNlcXVlbmNlLmxlbmd0aDtcbiAgICB2YXIgYnNMZW5ndGg9Ym90U2VxdWVuY2UubGVuZ3RoO1xuICAgIGlmKHBzTGVuZ3RoPT02ICYmIHBsYXllclNlcXVlbmNlPT09Ym90U2VxdWVuY2Upe1xuICAgICAgcmVzdWx0PVwid2luXCI7XG4gICAgfWVsc2UgaWYocHNMZW5ndGg9PT1ic0xlbmd0aCAmJiBwbGF5ZXJTZXF1ZW5jZT09PWJvdFNlcXVlbmNlKXtcbiAgICAgIHJlc3VsdD1cInN1Y2Nlc3NcIjtcbiAgICB9IGVsc2UgaWYocHNMZW5ndGg8YnNMZW5ndGggJiYgcGxheWVyU2VxdWVuY2U9PT1ib3RTZXF1ZW5jZS5zdWJzdHJpbmcoMCxwc0xlbmd0aCkpe1xuICAgICAgcmVzdWx0PVwiZ2FtZSBzdGlsbCBvblwiO1xuICAgIH0gZWxzZSBpZihwc0xlbmd0aDw9YnNMZW5ndGggJiYgcGxheWVyU2VxdWVuY2UhPT1ib3RTZXF1ZW5jZS5zdWJzdHJpbmcoMCxwc0xlbmd0aCkpe1xuICAgICAgcmVzdWx0PVwiaW5jb3JyZWN0IGlucHV0XCI7XG5cbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJldmFsdWF0aW9uIHN0YXR1czpcIityZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICAqL1xuICB2YXIgYnV0dG9ucz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdhbWUgYnV0dG9uLmtleXBhZFwiKTtcbiAgY29uc29sZS5sb2coYnV0dG9ucy5sZW5ndGgpO1xuICBmb3IodmFyIGk9MDtpPGJ1dHRvbnMubGVuZ3RoO2krKyl7XG4gICAgYnV0dG9uc1tpXS5vbmNsaWNrPWdhbWVQYWRDbGlja0hhbmRsZXI7XG4gIH1cbiAgdmFyIHRvZ2dsZUhhbmRsZXI9ZnVuY3Rpb24oKXtcbiAgICB2YXIgdG9nZ2xlPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RyaWN0IC50b2dnbGVcIik7XG4gICAgdG9nZ2xlLmNsYXNzTGlzdC50b2dnbGUoXCJvblwiKTtcbiAgICB0b2dnbGUuY2xhc3NMaXN0LnRvZ2dsZShcIm9mZlwiKTtcbiAgfTtcbiAgdmFyIHRvZ2dsZXM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zdHJpY3QgLnRvZ2dsZSBzcGFuXCIpO1xuICB0b2dnbGVzWzBdLm9uY2xpY2s9dG9nZ2xlSGFuZGxlcjtcbiAgdG9nZ2xlc1sxXS5vbmNsaWNrPXRvZ2dsZUhhbmRsZXI7XG59XG5cblxuXG5mdW5jdGlvbiBzZXR1cEtleUhhbmRsZXJzKCl7XG4gIGRvY3VtZW50Lm9ua2V5cHJlc3M9ZnVuY3Rpb24oZXZlbnQpe1xuICAgIHZhciBjPWV2ZW50LmtleS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnNvbGUubG9nKCdrZXlwcmVzczonK2MpO1xuICAgIHN3aXRjaChjKXtcbiAgICAgIGNhc2UgJ2EnOlxuICAgICAgY2FzZSAnYic6XG4gICAgICBjYXNlICdjJzpcbiAgICAgIGNhc2UgJ2QnOlxuICAgICAgICB2YXIgYmxvY2s9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNcIiArYyk7XG4gICAgICAgIGJsb2NrLmNsaWNrKCk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG59XG4iXSwiZmlsZSI6Im1haW4uanMifQ==
