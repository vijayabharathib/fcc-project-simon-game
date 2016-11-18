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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtdmMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gICogd2FpdCB1bnRpbCB0aGUgZG9jIGlzIHJlYWR5IHRvIG9iZXkgb3JkZXJzXG4gICovXG4gIHZhciBzaW1vbjsgLy9zdGFydCB3aXRoIGJsYW5rXG4gIHZhciBnYW1lVmlldztcbiAgdmFyIGNvbnRyb2xsZXI7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLGZ1bmN0aW9uKGUpe1xuICAvKipcbiAgICAqIG9uY2UgY29udGVudCBpcyBsb2FkZWRcbiAgICAqL1xuICBzaW1vbj1uZXcgU2ltb24oKTtcbiAgZ2FtZVZpZXc9bmV3IEdhbWVWaWV3KCk7XG4gIGNvbnRyb2xsZXI9bmV3IENvbnRyb2xsZXIoKTtcblxuICBzdGFydEJ1dHRvbkhhbmRsZXIoKTtcbiAgcGxheWVyQ2xpY2tIYW5kbGVyKCk7XG4gIHNldHVwS2V5SGFuZGxlcnMoKTtcbn0pO1xuXG5cbi8qKlxuICAqIHN0YXJ0IHRoZSBnYW1lXG4gICovXG5mdW5jdGlvbiBzdGFydEJ1dHRvbkhhbmRsZXIoKXtcblxuICB2YXIgc3RhcnQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdGFydFwiKTtcbiAgc3RhcnQub25jbGljaz1nYW1lVmlldy5zdGFydFRoZUdhbWU7XG59XG5cblxuLyoqXG5cbiAgKi9cbmZ1bmN0aW9uIHBsYXllckNsaWNrSGFuZGxlcigpe1xuXG4gIC8qKlxuICAgICovXG4gIHZhciBidXR0b25zPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2FtZSBidXR0b24ua2V5cGFkXCIpO1xuICBmb3IodmFyIGk9MDtpPGJ1dHRvbnMubGVuZ3RoO2krKyl7XG4gICAgYnV0dG9uc1tpXS5vbmNsaWNrPWdhbWVWaWV3LmdhbWVQYWRDbGlja0hhbmRsZXI7XG4gIH1cblxuICB2YXIgdG9nZ2xlcz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnN0cmljdCAudG9nZ2xlIHNwYW5cIik7XG4gIHRvZ2dsZXNbMF0ub25jbGljaz1nYW1lVmlldy50b2dnbGVTdHJpY3RNb2RlO1xuICB0b2dnbGVzWzFdLm9uY2xpY2s9Z2FtZVZpZXcudG9nZ2xlU3RyaWN0TW9kZTtcbn1cblxuXG5cbmZ1bmN0aW9uIHNldHVwS2V5SGFuZGxlcnMoKXtcbiAgZG9jdW1lbnQub25rZXlwcmVzcz1mdW5jdGlvbihldmVudCl7XG4gICAgdmFyIGM9ZXZlbnQua2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc29sZS5sb2coJ2tleXByZXNzOicrYyk7XG4gICAgc3dpdGNoKGMpe1xuICAgICAgY2FzZSAnYSc6XG4gICAgICBjYXNlICdiJzpcbiAgICAgIGNhc2UgJ2MnOlxuICAgICAgY2FzZSAnZCc6XG4gICAgICAgIHZhciBibG9jaz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiICtjKTtcbiAgICAgICAgYmxvY2suY2xpY2soKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG59XG4iXSwiZmlsZSI6Im12Yy5qcyJ9
