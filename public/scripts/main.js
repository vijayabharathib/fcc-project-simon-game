function prepareBotSequence(){var e=97,n=101,t=Math.floor(Math.random()*(n-e))+e;botSequence+=String.fromCharCode(t),console.log("bot sequence:"+botSequence)}function startButtonHandler(){var e=function(){prepareBotSequence()},n=document.querySelector("#start");n.onclick=e}function processPlayerInput(){function e(){console.log("player seq: "+playerSequence);var e=!1,n=playerSequence.length,t=botSequence.length;return 20==n&&playerSequence===botSequence?e="win":n===t&&playerSequence===botSequence?e="success":n<t&&playerSequence===botSequence.substring(0,n)?e="game still on":n<=t&&playerSequence!==botSequence.substring(0,n)&&(e="incorrect input"),console.log("evaluation status:"+e),e}var n=function(){playerSequence+=this.id;var n=e();"success"===n&&(playerSequence="",prepareBotSequence())},t=document.querySelectorAll(".game button.keypad");console.log(t.length);for(var o=0;o<t.length;o++)t[o].onclick=n}var botSequence="",playerSequence="";document.addEventListener("DOMContentLoaded",function(e){startButtonHandler(),processPlayerInput()});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsicHJlcGFyZUJvdFNlcXVlbmNlIiwibWluIiwibWF4IiwiYyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImJvdFNlcXVlbmNlIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiY29uc29sZSIsImxvZyIsInN0YXJ0QnV0dG9uSGFuZGxlciIsInN0YXJ0R2FtZSIsInN0YXJ0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwib25jbGljayIsInByb2Nlc3NQbGF5ZXJJbnB1dCIsImV2YWx1YXRlR2FtZVN0YXR1cyIsInBsYXllclNlcXVlbmNlIiwicmVzdWx0IiwicHNMZW5ndGgiLCJsZW5ndGgiLCJic0xlbmd0aCIsInN1YnN0cmluZyIsImdhbWVQYWRDbGlja0hhbmRsZXIiLCJ0aGlzIiwiaWQiLCJidXR0b25zIiwicXVlcnlTZWxlY3RvckFsbCIsImkiLCJhZGRFdmVudExpc3RlbmVyIiwiZSJdLCJtYXBwaW5ncyI6IkFBY0EsUUFBU0Esc0JBQ1AsR0FBSUMsR0FBSSxHQUNKQyxFQUFJLElBQ0pDLEVBQUVDLEtBQUtDLE1BQU1ELEtBQUtFLFVBQVVKLEVBQUlELElBQU1BLENBQzFDTSxjQUFhQyxPQUFPQyxhQUFhTixHQUNqQ08sUUFBUUMsSUFBSSxnQkFBa0JKLGFBUWhDLFFBQVNLLHNCQUNQLEdBQUlDLEdBQVUsV0FDWmIsc0JBRUVjLEVBQU1DLFNBQVNDLGNBQWMsU0FDakNGLEdBQU1HLFFBQVFKLEVBT2hCLFFBQVNLLHNCQVlQLFFBQVNDLEtBQ1BULFFBQVFDLElBQUksZUFBZ0JTLGVBQzVCLElBQUlDLElBQU8sRUFDUEMsRUFBU0YsZUFBZUcsT0FDeEJDLEVBQVNqQixZQUFZZ0IsTUFXekIsT0FWYSxLQUFWRCxHQUFnQkYsaUJBQWlCYixZQUNsQ2MsRUFBTyxNQUNBQyxJQUFXRSxHQUFZSixpQkFBaUJiLFlBQy9DYyxFQUFPLFVBQ0NDLEVBQVNFLEdBQVlKLGlCQUFpQmIsWUFBWWtCLFVBQVUsRUFBRUgsR0FDdEVELEVBQU8sZ0JBQ0NDLEdBQVVFLEdBQVlKLGlCQUFpQmIsWUFBWWtCLFVBQVUsRUFBRUgsS0FDdkVELEVBQU8sbUJBRVRYLFFBQVFDLElBQUkscUJBQXFCVSxHQUMxQkEsRUF4QlQsR0FBSUssR0FBb0IsV0FDdEJOLGdCQUFnQk8sS0FBS0MsRUFDckIsSUFBSVAsR0FBT0YsR0FDQyxhQUFURSxJQUNERCxlQUFlLEdBQ2ZwQix1QkF3QkE2QixFQUFRZCxTQUFTZSxpQkFBaUIsc0JBQ3RDcEIsU0FBUUMsSUFBSWtCLEVBQVFOLE9BQ3BCLEtBQUksR0FBSVEsR0FBRSxFQUFFQSxFQUFFRixFQUFRTixPQUFPUSxJQUMzQkYsRUFBUUUsR0FBR2QsUUFBUVMsRUF2RXJCLEdBQUluQixhQUFZLEdBQ1phLGVBQWUsRUFDckJMLFVBQVNpQixpQkFBaUIsbUJBQW1CLFNBQVNDLEdBSXBEckIscUJBQ0FNIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAgKiB3YWl0IHVudGlsIHRoZSBkb2MgaXMgcmVhZHkgdG8gb2JleSBvcmRlcnNcbiAgKi9cbiAgdmFyIGJvdFNlcXVlbmNlPVwiXCI7IC8vc3RhcnQgd2l0aCBibGFua1xuICB2YXIgcGxheWVyU2VxdWVuY2U9XCJcIjtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsZnVuY3Rpb24oZSl7XG4gIC8qKlxuICAgICogb25jZSBjb250ZW50IGlzIGxvYWRlZFxuICAgICovXG4gIHN0YXJ0QnV0dG9uSGFuZGxlcigpO1xuICBwcm9jZXNzUGxheWVySW5wdXQoKTtcbiAgLy9zZXR1cEtleUhhbmRsZXJzKCk7XG59KTtcblxuZnVuY3Rpb24gcHJlcGFyZUJvdFNlcXVlbmNlKCl7XG4gIHZhciBtaW49OTc7IC8vY29kZSBmb3IgYVxuICB2YXIgbWF4PTEwMTsgLy9jb2RlIGZvciBlLCBlIGlzIGV4Y2x1ZGVkIGluIHJhbmRvbVxuICB2YXIgYz1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKG1heC1taW4pKSttaW47XG4gIGJvdFNlcXVlbmNlKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xuICBjb25zb2xlLmxvZyhcImJvdCBzZXF1ZW5jZTpcIiArIGJvdFNlcXVlbmNlKTtcbn1cblxuXG5cbi8qKlxuICAqIHN0YXJ0IHRoZSBnYW1lXG4gICovXG5mdW5jdGlvbiBzdGFydEJ1dHRvbkhhbmRsZXIoKXtcbiAgdmFyIHN0YXJ0R2FtZT1mdW5jdGlvbigpe1xuICAgIHByZXBhcmVCb3RTZXF1ZW5jZSgpO1xuICB9O1xuICB2YXIgc3RhcnQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdGFydFwiKTtcbiAgc3RhcnQub25jbGljaz1zdGFydEdhbWU7XG59XG5cblxuLyoqXG5cbiAgKi9cbmZ1bmN0aW9uIHByb2Nlc3NQbGF5ZXJJbnB1dCgpe1xuICAvKipcbiAgICAqL1xuICB2YXIgZ2FtZVBhZENsaWNrSGFuZGxlcj1mdW5jdGlvbigpe1xuICAgIHBsYXllclNlcXVlbmNlKz10aGlzLmlkO1xuICAgIHZhciByZXN1bHQ9ZXZhbHVhdGVHYW1lU3RhdHVzKCk7XG4gICAgaWYocmVzdWx0PT09XCJzdWNjZXNzXCIpe1xuICAgICAgcGxheWVyU2VxdWVuY2U9XCJcIjsvL2xldCB0aGUgcGxheWVyIHN0YXJ0IGZyb20gc2NyYXRjaDtcbiAgICAgIHByZXBhcmVCb3RTZXF1ZW5jZSgpO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBldmFsdWF0ZUdhbWVTdGF0dXMoKXtcbiAgICBjb25zb2xlLmxvZyhcInBsYXllciBzZXE6IFwiKyBwbGF5ZXJTZXF1ZW5jZSk7XG4gICAgdmFyIHJlc3VsdD1mYWxzZTtcbiAgICB2YXIgcHNMZW5ndGg9cGxheWVyU2VxdWVuY2UubGVuZ3RoO1xuICAgIHZhciBic0xlbmd0aD1ib3RTZXF1ZW5jZS5sZW5ndGg7XG4gICAgaWYocHNMZW5ndGg9PTIwICYmIHBsYXllclNlcXVlbmNlPT09Ym90U2VxdWVuY2Upe1xuICAgICAgcmVzdWx0PVwid2luXCI7XG4gICAgfWVsc2UgaWYocHNMZW5ndGg9PT1ic0xlbmd0aCAmJiBwbGF5ZXJTZXF1ZW5jZT09PWJvdFNlcXVlbmNlKXtcbiAgICAgIHJlc3VsdD1cInN1Y2Nlc3NcIjtcbiAgICB9IGVsc2UgaWYocHNMZW5ndGg8YnNMZW5ndGggJiYgcGxheWVyU2VxdWVuY2U9PT1ib3RTZXF1ZW5jZS5zdWJzdHJpbmcoMCxwc0xlbmd0aCkpe1xuICAgICAgcmVzdWx0PVwiZ2FtZSBzdGlsbCBvblwiO1xuICAgIH0gZWxzZSBpZihwc0xlbmd0aDw9YnNMZW5ndGggJiYgcGxheWVyU2VxdWVuY2UhPT1ib3RTZXF1ZW5jZS5zdWJzdHJpbmcoMCxwc0xlbmd0aCkpe1xuICAgICAgcmVzdWx0PVwiaW5jb3JyZWN0IGlucHV0XCI7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiZXZhbHVhdGlvbiBzdGF0dXM6XCIrcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAgKi9cbiAgdmFyIGJ1dHRvbnM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5nYW1lIGJ1dHRvbi5rZXlwYWRcIik7XG4gIGNvbnNvbGUubG9nKGJ1dHRvbnMubGVuZ3RoKTtcbiAgZm9yKHZhciBpPTA7aTxidXR0b25zLmxlbmd0aDtpKyspe1xuICAgIGJ1dHRvbnNbaV0ub25jbGljaz1nYW1lUGFkQ2xpY2tIYW5kbGVyO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hpbWUoKXtcbiAgICB2YXIgY2hpbWU9bmV3IEF1ZGlvKFwicHVibGljL2F1ZGlvL2NoaW1lLm9nZ1wiKTtcbiAgICBjaGltZS5wbGF5KCk7XG4gIH1cbn1cbiJdfQ==
