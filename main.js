$(document).ready(function() {
      var canvas = document.getElementById('main');
      var context = canvas.getContext('2d');
      var x = canvas.width / 2;
      var y = canvas.height / 2;
      var ms = 5;
      var px = 1;
      var rr = 5;
      var borderEnd = 1;

      var b37;
      var b38;
      var b39;
      var b40;
      var b40b39;
      var b40b37;
      var b38b37;
      var b38b39;

      var interval = 0;

      var keys = [];

      var canvas2 = document.getElementById('second');
      var context2 = canvas2.getContext('2d');

      var x2 = 0;
      var y2 = 0;

      draw_circle(x, y);
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

      function draw_circle(xD, yD) {
            clearc();
            
            if (borderEnd == 1) {
                if (xD+rr > canvas.width) {
                    clearInterval(eval(interval));
                    clearc();
                    x = canvas.width / 2;
                    y = canvas.height / 2;
                    xD = x;
                    yD = y;
                    draw_circle(xD, yD);
                } else if (xD-rr < 0) {
                    clearInterval(eval(interval));
                    clearc();
                    x = canvas.width / 2;
                    y = canvas.height / 2;
                    xD = x;
                    yD = y;
                    draw_circle(xD, yD);
                }

                if (yD+rr > canvas.height) {
                    clearInterval(eval(interval));
                    clearc();
                    x = canvas.width / 2;
                    y = canvas.height / 2;
                    xD = x;
                    yD = y;
                    draw_circle(xD, yD);
                } else if (yD-rr < 0) {
                    clearInterval(eval(interval));
                    clearc();
                    x = canvas.width / 2;
                    y = canvas.height / 2;
                    xD = x;
                    yD = y;
                    draw_circle(xD, yD);
                }
            } else {
                /*
                / Stops at canvas border if x of y tries to cross it
                /

                if (x+rr > canvas.width) {
                      x = canvas.width-rr;
                } else if (x-px < 0) {
                      x = rr;
                }

                if (y+rr > canvas.height) {
                      y = canvas.height-rr;
                } else if (y-rr < 0) {
                      y = rr;
                }

                */
            }

            context.beginPath();
            context.arc(xD, yD, rr, 0, 2* Math.PI, true); 
            context.fillStyle = 'red';
            context.fill();
            context.closePath();

            if (yD > y2-(2*rr) && yD < y2-(2*rr) + rr+(2*rr) 
            && xD > x2-(2*rr) && xD < x2-(2*rr) + rr+(2*rr)) {
                context2.setTransform(1, 0, 0, 1, 0, 0);
                context2.clearRect(0, 0, canvas2.width, canvas2.height);
                redraw_circle2();
            }
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

      function a37() {
            x = x - px;
            y = y;
            draw_circle(x, y);
      }

      function a38() {
            x = x;
            y = y - px;
            draw_circle(x, y);
      }

      function a39() {
            x = x + px;
            y = y;
            draw_circle(x, y);
      }

      function a40() {
            x = x;
            y = y + px;
            draw_circle(x, y);
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

            /* There is no need for vertical movement for now (and vertical movement has some bugs in it)
            /
            /
            /

            else if (!keys.hasOwnProperty("37") && !keys.hasOwnProperty("38") && keys.hasOwnProperty("40") && keys.hasOwnProperty("39")) {
                  clearInterval(eval(interval));
                  b40b39 = self.setInterval(function() {
                       a40a39();
                       interval = 'b40b39'; 
                  }, 50);
            } else if (keys.hasOwnProperty("37") && !keys.hasOwnProperty("38") && keys.hasOwnProperty("40") && !keys.hasOwnProperty("39")) {
                  clearInterval(eval(interval));
                  b40b37 = self.setInterval(function() {
                       a40a37();
                       interval = 'b40b37'; 
                  }, 50);
            } else if (keys.hasOwnProperty("37") && keys.hasOwnProperty("38") && !keys.hasOwnProperty("40") && !keys.hasOwnProperty("39")) {
                  clearInterval(eval(interval));
                  b38b37 = self.setInterval(function() {
                       a38a37();
                       interval = 'b38b37'; 
                  }, 50);
            } else if (!keys.hasOwnProperty("37") && keys.hasOwnProperty("38") && !keys.hasOwnProperty("40") && keys.hasOwnProperty("39")) {
                  clearInterval(eval(interval));
                  b38b39 = self.setInterval(function() {
                       a38a39();
                       interval = 'b38b39'; 
                  }, 50);
            }
            
            */
      } 
});