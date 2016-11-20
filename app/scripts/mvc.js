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
