$(document).ready(function() {
      var canvas = document.getElementById('main');
      var context = canvas.getContext('2d');
      var x = canvas.width / 2;
      var y = canvas.height / 2;
      var radius = 70;

      var keys = [];

      draw_circle(x, y);

      function draw_circle(x, y) {
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, canvas.width, canvas.height);
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
            context.beginPath();
            context.arc(x, y, 5, 0, 2* Math.PI, true); 
            context.fillStyle = 'red';
            context.fill();
            context.closePath();
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

      function move() {
            if (keys.hasOwnProperty("37") && !keys.hasOwnProperty("38") && !keys.hasOwnProperty("40") && !keys.hasOwnProperty("39")) {
                  x = x - 5;
                  y = y;
                  draw_circle(x, y);
            } else if (!keys.hasOwnProperty("37") && keys.hasOwnProperty("38") && !keys.hasOwnProperty("40") && !keys.hasOwnProperty("39")) {
                  x = x;
                  y = y - 5;
                  draw_circle(x, y);
            } else if (!keys.hasOwnProperty("37") && !keys.hasOwnProperty("38") && keys.hasOwnProperty("40") && !keys.hasOwnProperty("39")) {
                  x = x;
                  y = y + 5;
                  draw_circle(x, y);
            } else if (!keys.hasOwnProperty("37") && !keys.hasOwnProperty("38") && !keys.hasOwnProperty("40") && keys.hasOwnProperty("39")) {
                  x = x + 5;
                  y = y;
                  draw_circle(x, y);
            } else if (!keys.hasOwnProperty("37") && !keys.hasOwnProperty("38") && keys.hasOwnProperty("40") && keys.hasOwnProperty("39")) {
                  x = x + 5;
                  y = y + 5;
                  draw_circle(x, y);
            } else if (keys.hasOwnProperty("37") && !keys.hasOwnProperty("38") && keys.hasOwnProperty("40") && !keys.hasOwnProperty("39")) {
                  x = x - 5;
                  y = y + 5;
                  draw_circle(x, y);
            } else if (keys.hasOwnProperty("37") && keys.hasOwnProperty("38") && !keys.hasOwnProperty("40") && !keys.hasOwnProperty("39")) {
                  x = x - 5;
                  y = y - 5;
                  draw_circle(x, y);
            } else if (!keys.hasOwnProperty("37") && keys.hasOwnProperty("38") && !keys.hasOwnProperty("40") && keys.hasOwnProperty("39")) {
                  x = x + 5;
                  y = y - 5;
                  draw_circle(x, y);
            }
      } 
});