/**
  * wait until the doc is ready to obey orders
  */
  var simon; //start with blank
  var gameView;
  var controller;
document.addEventListener("DOMContentLoaded",function(e){
  /**
    * once content is loaded
    */
  simon=new Simon();
  gameView=new GameView();
  controller=new Controller();

  startButtonHandler();
  playerClickHandler();
  setupKeyHandlers();
  var help=document.querySelector(".dashboard .help");
  help.addEventListener("click",function(){
    gameView.showInfoPanel();
  });

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



function setupKeyHandlers(){
  document.onkeypress=function(event){
    var c=event.key.toLowerCase();
    switch(c){
      case 'a':
      case 'b':
      case 'c':
      case 'd':
        var block=document.querySelector("#" +c);
        block.click();
        break;
      case ' ':
        var startButton=document.querySelector("#start");
        startButton.click();
        break;
      case '?':
        var help=document.querySelector(".dashboard .help");
        help.click();
        break;
    }
  };
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtdmMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gICogd2FpdCB1bnRpbCB0aGUgZG9jIGlzIHJlYWR5IHRvIG9iZXkgb3JkZXJzXG4gICovXG4gIHZhciBzaW1vbjsgLy9zdGFydCB3aXRoIGJsYW5rXG4gIHZhciBnYW1lVmlldztcbiAgdmFyIGNvbnRyb2xsZXI7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLGZ1bmN0aW9uKGUpe1xuICAvKipcbiAgICAqIG9uY2UgY29udGVudCBpcyBsb2FkZWRcbiAgICAqL1xuICBzaW1vbj1uZXcgU2ltb24oKTtcbiAgZ2FtZVZpZXc9bmV3IEdhbWVWaWV3KCk7XG4gIGNvbnRyb2xsZXI9bmV3IENvbnRyb2xsZXIoKTtcblxuICBzdGFydEJ1dHRvbkhhbmRsZXIoKTtcbiAgcGxheWVyQ2xpY2tIYW5kbGVyKCk7XG4gIHNldHVwS2V5SGFuZGxlcnMoKTtcbiAgdmFyIGhlbHA9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXNoYm9hcmQgLmhlbHBcIik7XG4gIGhlbHAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICBnYW1lVmlldy5zaG93SW5mb1BhbmVsKCk7XG4gIH0pO1xuXG4gIHZhciBjbG9zZUJ1dHRvbj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fcGFuZWwgLmNsb3NlXCIpO1xuICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgIGdhbWVWaWV3LmhpZGVJbmZvUGFuZWwoKTtcbiAgfSk7XG59KTtcblxuLyoqXG4gICogc3RhcnQgdGhlIGdhbWVcbiAgKi9cbmZ1bmN0aW9uIHN0YXJ0QnV0dG9uSGFuZGxlcigpe1xuXG4gIHZhciBzdGFydD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXJ0XCIpO1xuICBzdGFydC5vbmNsaWNrPWdhbWVWaWV3LnN0YXJ0VGhlR2FtZTtcbn1cblxuXG4vKipcblxuICAqL1xuZnVuY3Rpb24gcGxheWVyQ2xpY2tIYW5kbGVyKCl7XG5cbiAgLyoqXG4gICAgKi9cbiAgdmFyIGJ1dHRvbnM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5nYW1lIGJ1dHRvbi5rZXlwYWRcIik7XG4gIGZvcih2YXIgaT0wO2k8YnV0dG9ucy5sZW5ndGg7aSsrKXtcbiAgICBidXR0b25zW2ldLm9uY2xpY2s9Z2FtZVZpZXcuZ2FtZVBhZENsaWNrSGFuZGxlcjtcbiAgfVxuXG4gIHZhciB0b2dnbGVzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3RyaWN0IC50b2dnbGUgc3BhblwiKTtcbiAgdG9nZ2xlc1swXS5vbmNsaWNrPWdhbWVWaWV3LnRvZ2dsZVN0cmljdE1vZGU7XG4gIHRvZ2dsZXNbMV0ub25jbGljaz1nYW1lVmlldy50b2dnbGVTdHJpY3RNb2RlO1xufVxuXG5cblxuZnVuY3Rpb24gc2V0dXBLZXlIYW5kbGVycygpe1xuICBkb2N1bWVudC5vbmtleXByZXNzPWZ1bmN0aW9uKGV2ZW50KXtcbiAgICB2YXIgYz1ldmVudC5rZXkudG9Mb3dlckNhc2UoKTtcbiAgICBzd2l0Y2goYyl7XG4gICAgICBjYXNlICdhJzpcbiAgICAgIGNhc2UgJ2InOlxuICAgICAgY2FzZSAnYyc6XG4gICAgICBjYXNlICdkJzpcbiAgICAgICAgdmFyIGJsb2NrPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjXCIgK2MpO1xuICAgICAgICBibG9jay5jbGljaygpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJyAnOlxuICAgICAgICB2YXIgc3RhcnRCdXR0b249ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdGFydFwiKTtcbiAgICAgICAgc3RhcnRCdXR0b24uY2xpY2soKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICc/JzpcbiAgICAgICAgdmFyIGhlbHA9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXNoYm9hcmQgLmhlbHBcIik7XG4gICAgICAgIGhlbHAuY2xpY2soKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xufVxuIl0sImZpbGUiOiJtdmMuanMifQ==
