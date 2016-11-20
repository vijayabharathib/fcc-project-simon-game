/**
  * wait until the doc is ready to obey orders
  */
  var simon;
  var gameView;
  var controller;
document.addEventListener("DOMContentLoaded",function(e){
  /**
    * once content is loaded
    */
  simon=new Simon(); //the bot
  gameView=new GameView(); //the view (UI & UX)
  controller=new Controller(); //the controller between view and bot

  //bind start button, player input and keyboard access
  startButtonHandler();
  playerClickHandler();
  setupKeyHandlers();

  // bind method for help button
  var help=document.querySelector(".dashboard .help");
  help.addEventListener("click",function(){
    gameView.showInfoPanel();
  });
  //one more bind, this is to close info panel
  var closeButton=document.querySelector(".info_panel .close");
  closeButton.addEventListener("click",function(){
    gameView.hideInfoPanel();
  });

});

/**
  * start the game
  */
function startButtonHandler(){

  var start=document.querySelector("#start");
  start.onclick=gameView.startTheGame;
}


/**
  * take player input
  * send it to gamepad click handler
  * to be processed by controller
  */
function playerClickHandler(){

  /**
    */
  var buttons=document.querySelectorAll(".game button.keypad");
  for(var i=0;i<buttons.length;i++){
    buttons[i].onclick=gameView.gamePadClickHandler;
  }

  var toggles=document.querySelectorAll(".strict .toggle span");
  toggles[0].onclick=gameView.toggleStrictMode;
  toggles[1].onclick=gameView.toggleStrictMode;
}

/**
  * keyboard access
  * a,b,c,d for blocks
  * space for start / reset game
  * ? or / for help
  * x to close help
  * s to toggle strict mode 
  */
function setupKeyHandlers(){
  document.onkeypress=function(event){
    var c=event.key.toLowerCase();
    switch(c){
      case 'a':
      case 'b':
      case 'c':
      case 'd':
        var block=document.querySelector("#" +c);
        if(!gameView.isPlayback)
          gameView._activateBlock(c);
        window.setTimeout(gameView._deactivateBlock,600,c);
        block.click();
        break;
      case ' ':
        var startButton=document.querySelector("#start");
        startButton.click();
        break;
      case '?':
      case '/':
        var help=document.querySelector(".dashboard .help");
        help.click();
        break;
      case 'x':
        var closeButton=document.querySelector(".info_panel .close");
        closeButton.click();
        break;
      case 's':
          gameView.toggleStrictMode();
          break;
    }
  };
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtdmMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gICogd2FpdCB1bnRpbCB0aGUgZG9jIGlzIHJlYWR5IHRvIG9iZXkgb3JkZXJzXG4gICovXG4gIHZhciBzaW1vbjtcbiAgdmFyIGdhbWVWaWV3O1xuICB2YXIgY29udHJvbGxlcjtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsZnVuY3Rpb24oZSl7XG4gIC8qKlxuICAgICogb25jZSBjb250ZW50IGlzIGxvYWRlZFxuICAgICovXG4gIHNpbW9uPW5ldyBTaW1vbigpOyAvL3RoZSBib3RcbiAgZ2FtZVZpZXc9bmV3IEdhbWVWaWV3KCk7IC8vdGhlIHZpZXcgKFVJICYgVVgpXG4gIGNvbnRyb2xsZXI9bmV3IENvbnRyb2xsZXIoKTsgLy90aGUgY29udHJvbGxlciBiZXR3ZWVuIHZpZXcgYW5kIGJvdFxuXG4gIC8vYmluZCBzdGFydCBidXR0b24sIHBsYXllciBpbnB1dCBhbmQga2V5Ym9hcmQgYWNjZXNzXG4gIHN0YXJ0QnV0dG9uSGFuZGxlcigpO1xuICBwbGF5ZXJDbGlja0hhbmRsZXIoKTtcbiAgc2V0dXBLZXlIYW5kbGVycygpO1xuXG4gIC8vIGJpbmQgbWV0aG9kIGZvciBoZWxwIGJ1dHRvblxuICB2YXIgaGVscD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhc2hib2FyZCAuaGVscFwiKTtcbiAgaGVscC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgIGdhbWVWaWV3LnNob3dJbmZvUGFuZWwoKTtcbiAgfSk7XG4gIC8vb25lIG1vcmUgYmluZCwgdGhpcyBpcyB0byBjbG9zZSBpbmZvIHBhbmVsXG4gIHZhciBjbG9zZUJ1dHRvbj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fcGFuZWwgLmNsb3NlXCIpO1xuICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgIGdhbWVWaWV3LmhpZGVJbmZvUGFuZWwoKTtcbiAgfSk7XG5cbn0pO1xuXG4vKipcbiAgKiBzdGFydCB0aGUgZ2FtZVxuICAqL1xuZnVuY3Rpb24gc3RhcnRCdXR0b25IYW5kbGVyKCl7XG5cbiAgdmFyIHN0YXJ0PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RhcnRcIik7XG4gIHN0YXJ0Lm9uY2xpY2s9Z2FtZVZpZXcuc3RhcnRUaGVHYW1lO1xufVxuXG5cbi8qKlxuICAqIHRha2UgcGxheWVyIGlucHV0XG4gICogc2VuZCBpdCB0byBnYW1lcGFkIGNsaWNrIGhhbmRsZXJcbiAgKiB0byBiZSBwcm9jZXNzZWQgYnkgY29udHJvbGxlclxuICAqL1xuZnVuY3Rpb24gcGxheWVyQ2xpY2tIYW5kbGVyKCl7XG5cbiAgLyoqXG4gICAgKi9cbiAgdmFyIGJ1dHRvbnM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5nYW1lIGJ1dHRvbi5rZXlwYWRcIik7XG4gIGZvcih2YXIgaT0wO2k8YnV0dG9ucy5sZW5ndGg7aSsrKXtcbiAgICBidXR0b25zW2ldLm9uY2xpY2s9Z2FtZVZpZXcuZ2FtZVBhZENsaWNrSGFuZGxlcjtcbiAgfVxuXG4gIHZhciB0b2dnbGVzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3RyaWN0IC50b2dnbGUgc3BhblwiKTtcbiAgdG9nZ2xlc1swXS5vbmNsaWNrPWdhbWVWaWV3LnRvZ2dsZVN0cmljdE1vZGU7XG4gIHRvZ2dsZXNbMV0ub25jbGljaz1nYW1lVmlldy50b2dnbGVTdHJpY3RNb2RlO1xufVxuXG4vKipcbiAgKiBrZXlib2FyZCBhY2Nlc3NcbiAgKiBhLGIsYyxkIGZvciBibG9ja3NcbiAgKiBzcGFjZSBmb3Igc3RhcnQgLyByZXNldCBnYW1lXG4gICogPyBvciAvIGZvciBoZWxwXG4gICogeCB0byBjbG9zZSBoZWxwXG4gICogcyB0byB0b2dnbGUgc3RyaWN0IG1vZGUgXG4gICovXG5mdW5jdGlvbiBzZXR1cEtleUhhbmRsZXJzKCl7XG4gIGRvY3VtZW50Lm9ua2V5cHJlc3M9ZnVuY3Rpb24oZXZlbnQpe1xuICAgIHZhciBjPWV2ZW50LmtleS50b0xvd2VyQ2FzZSgpO1xuICAgIHN3aXRjaChjKXtcbiAgICAgIGNhc2UgJ2EnOlxuICAgICAgY2FzZSAnYic6XG4gICAgICBjYXNlICdjJzpcbiAgICAgIGNhc2UgJ2QnOlxuICAgICAgICB2YXIgYmxvY2s9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNcIiArYyk7XG4gICAgICAgIGlmKCFnYW1lVmlldy5pc1BsYXliYWNrKVxuICAgICAgICAgIGdhbWVWaWV3Ll9hY3RpdmF0ZUJsb2NrKGMpO1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChnYW1lVmlldy5fZGVhY3RpdmF0ZUJsb2NrLDYwMCxjKTtcbiAgICAgICAgYmxvY2suY2xpY2soKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICcgJzpcbiAgICAgICAgdmFyIHN0YXJ0QnV0dG9uPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RhcnRcIik7XG4gICAgICAgIHN0YXJ0QnV0dG9uLmNsaWNrKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnPyc6XG4gICAgICBjYXNlICcvJzpcbiAgICAgICAgdmFyIGhlbHA9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXNoYm9hcmQgLmhlbHBcIik7XG4gICAgICAgIGhlbHAuY2xpY2soKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd4JzpcbiAgICAgICAgdmFyIGNsb3NlQnV0dG9uPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb19wYW5lbCAuY2xvc2VcIik7XG4gICAgICAgIGNsb3NlQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgZ2FtZVZpZXcudG9nZ2xlU3RyaWN0TW9kZSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcbn1cbiJdLCJmaWxlIjoibXZjLmpzIn0=
