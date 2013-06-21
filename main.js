$(document).ready(function() {
      var canvas = document.getElementById('main');
      var context = canvas.getContext('2d');
      var x = canvas.width / 2;
      var y = canvas.height / 2;
      var ms = 300;
      var px = 20;
      var rr = 10;
      var borderEnd = 1;
      var direction = null;
      var length = 1;

      var b37;
      var b38;
      var b39;
      var b40;
      var b40b39;
      var b40b37;
      var b38b37;
      var b38b39;

      var snake = new Array;
      var snakePrev = new Array;

      var interval = 0;

      var keys = [];

      var canvas2 = document.getElementById('second');
      var context2 = canvas2.getContext('2d');

      var x2 = 0;
      var y2 = 0;

      snake.push([x, y]);
      draw_circleArray(snake);
      redraw_circle2();

      function redraw_circle2() {
        x2 = Math.floor((Math.random()*444)+1);
        y2 = Math.floor((Math.random()*444)+1);
        draw_circle2(x2, y2);
      }

      function clearc() {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
      }

      function growSnake() {
                length = length +1;
      }

      function draw_circle2(x2, y2) {
            x2 = x2;
            y2 = y2;
            context2.setTransform(1, 0, 0, 1, 0, 0);
            context2.clearRect(0, 0, canvas2.width, canvas2.height);
    
            context2.beginPath();
            context2.arc(x2, y2, rr, 0, 2* Math.PI, true); 
            context2.fillStyle = 'blue';
            context2.fill();
            context2.closePath();
      }

      $(document).keydown(function (e) {
            keys[e.which] = true;
            if (x+6 > canvas.width) {
                  x = canvas.width-6;
            } else if (x-6 < 0) {
                  x = 6;
            }

            if (y+6 > canvas.height) {
                  y = canvas.height-6;
            } else if (y-6 < 0) {
                  y = 6;
            }
            move();
      });

      $(document).keyup(function (e) {
            delete keys[e.which];
      });

      function doSmth(xa, ya, direction) {
          snake.push([xa, ya, direction]);
          clearc();
          snake.splice(0, snake.length - length);
          draw_circleArray(snake);
      }

      function a37() {
            x = x - px;
            y = y;
            direction = 'left';
            doSmth(x, y, direction);
      }

      function a38() {
            x = x;
            y = y - px;
            direction = 'up';
            doSmth(x, y, direction);
      }

      function a39() {
            x = x + px;
            y = y;
            direction = 'right';
            doSmth(x, y, direction);
      }

      function a40() {
            x = x;
            y = y + px;
            direction = 'down';
            doSmth(x, y, direction);
      }

      function a40a39() {
            x = x + px;
            y = y + px;
            draw_circle(x, y);
      }

      function a40a37() {
            x = x - px;
            y = y + px;
            draw_circle(x, y);
      }

      function a38a37() {
            x = x - px;
            y = y - px;
            draw_circle(x, y);
      }

      function a38a39() {
            x = x + px;
            y = y - px;
            draw_circle(x, y);
      }

      function move() {
            if (keys.hasOwnProperty("37") && !keys.hasOwnProperty("38") && !keys.hasOwnProperty("40") && !keys.hasOwnProperty("39")) {
                  clearInterval(eval(interval));
                  b37 = self.setInterval(function() {
                       a37();
                       interval = 'b37';
                  }, ms);
            } else if (!keys.hasOwnProperty("37") && keys.hasOwnProperty("38") && !keys.hasOwnProperty("40") && !keys.hasOwnProperty("39")) {
                  clearInterval(eval(interval));
                  b38 = self.setInterval(function() {
                       a38();
                       interval = 'b38'; 
                  }, ms);
            } else if (!keys.hasOwnProperty("37") && !keys.hasOwnProperty("38") && keys.hasOwnProperty("40") && !keys.hasOwnProperty("39")) {
                  clearInterval(eval(interval));
                  b40 = self.setInterval(function() {
                       a40();
                       interval = 'b40'; 
                  }, ms);
            } else if (!keys.hasOwnProperty("37") && !keys.hasOwnProperty("38") && !keys.hasOwnProperty("40") && keys.hasOwnProperty("39")) {
                  clearInterval(eval(interval));
                  b39 = self.setInterval(function() {
                       a39();
                       interval = 'b39'; 
                  }, ms);
            } 
      }

      function resetGame() {
            clearInterval(eval(interval));
            clearc();
            snake = [[canvas.width / 2, canvas.height / 2]];
            draw_circleArray(snake);
      } 

      function draw_circleArray(snake) {
            for (var i = 0; i < snake.length; i++) {
                  context.beginPath();
                  context.arc(snake[i][0], snake[i][1], rr, 0, 2* Math.PI, true); 
                  context.fillStyle = 'red';
                  context.fill();
                  context.closePath();

                  if (i == snake.length-1) {
                      if (snake[i][1] > y2-(2*rr) && snake[i][1] < y2-(2*rr) + rr+(2*rr) 
                      && snake[i][0] > x2-(2*rr) && snake[i][0] < x2-(2*rr) + rr+(2*rr)) {
                            context2.setTransform(1, 0, 0, 1, 0, 0);
                            context2.clearRect(0, 0, canvas2.width, canvas2.height);
                            redraw_circle2();
                            growSnake();
                      }

                      if (borderEnd == 1) {
                        if (snake[i][0]+rr > canvas.width) {
                            resetGame();
                        } else if (snake[i][0]-rr < 0) {
                            resetGame();
                        }

                        if (snake[i][1]+rr > canvas.height) {
                            resetGame();
                        } else if (snake[i][1]-rr < 0) {
                            resetGame();
                        }
                    }
                }
            }
        }
});