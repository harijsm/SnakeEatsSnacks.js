$(document).ready(function () {
    var canvas = document.getElementById('main');
    var context = canvas.getContext('2d');
    var canvas2 = document.getElementById('second');
    var context2 = canvas2.getContext('2d');
    var ms = 300;
    var px = 14;
    var rr = 7;
    var borderEnd = 1;
    var direction = null;
    var length = 1;
    var b37;
    var b38;
    var b39;
    var b40;
    var snake = new Array;
    var interval = 0;
    var keys = [];
    var x2 = 0;
    var y2 = 0;

    var snackPoints = [];
    for (var aa = 0; aa <= canvas.width; aa++) {
        for (var bb = 0; bb <= canvas.height; bb++) {
            if (aa % (2 * rr) == 0 && bb % (2 * rr) == 0 && bb >= rr && aa >= rr && aa < canvas.width - rr && bb < canvas.height - rr) {
                snackPoints.push([aa, bb]);
            }
        }
    }

    var x = snackPoints[Math.floor((Math.random() * snackPoints.length - 1) + 1)][0];
    var y = snackPoints[Math.floor((Math.random() * snackPoints.length - 1) + 1)][1];

    snake.push([x, y]);
    draw_circleArray(snake);
    redraw_circle2();
    drawInstructions();

    function drawInstructions() {
      $("#instructions").fadeIn(900);
    }

    function redraw_circle2() {
        rand = Math.floor((Math.random() * snackPoints.length - 1) + 1);
        x2 = snackPoints[rand][0];
        y2 = snackPoints[rand][1];
        draw_circle2(x2, y2);
    }

    function clearc() {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function growSnake() {
        length = length + 1;
        ms = 300 - (length * 2);
    }

    function draw_circle2(x2, y2) {
        x2 = x2;
        y2 = y2;

        context2.setTransform(1, 0, 0, 1, 0, 0);
        context2.clearRect(0, 0, canvas2.width, canvas2.height);

        context2.beginPath();
        context2.arc(x2, y2, rr, 0, 2 * Math.PI, true);
        var grd2 = context2.createRadialGradient(x2 - (rr / 20), y2 - (rr / 20), rr, x2 - rr, y2 - rr, rr / 10);
        grd2.addColorStop(0.1, '#AAB3DC');
        grd2.addColorStop(0.4, '#6876C1');
        grd2.addColorStop(1, '#3B4990');
        context2.fillStyle = grd2;
        context2.fill();
        context2.closePath();

        context2.beginPath();
        context2.rect(rr, rr, canvas.width - (2 * rr), canvas.height - (2 * rr));
        context2.lineWidth = 1;
        context2.strokeStyle = '#ccc';
        context2.stroke();
    }

    $(document).keydown(function (e) {
        keys = [];
        keys[e.which] = true;

        if (borderEnd == 1) {
            if (snake[snake.length - 1][0] + rr > canvas.width) {
                resetGame();
            } else if (snake[snake.length - 1][0] - rr < 0) {
                resetGame();
            }

            if (snake[snake.length - 1][1] + rr > canvas.height) {
                resetGame();
            } else if (snake[snake.length - 1][1] - rr < 0) {
                resetGame();
            }
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

    function clearAllIntervals() {
        clearInterval(b37);
        clearInterval(b38);
        clearInterval(b39);
        clearInterval(b40);
    }

    function move() {
        if (keys.hasOwnProperty("37") && !keys.hasOwnProperty("38") && !keys.hasOwnProperty("40") && !keys.hasOwnProperty("39") && interval != 'b37') {
            clearAllIntervals();
            b37 = self.setInterval(function () {
                a37();
                interval = 'b37';
            }, ms);
        } else if (!keys.hasOwnProperty("37") && keys.hasOwnProperty("38") && !keys.hasOwnProperty("40") && !keys.hasOwnProperty("39") && interval != 'b38') {
            clearAllIntervals();
            b38 = self.setInterval(function () {
                a38();
                interval = 'b38';
            }, ms);
        } else if (!keys.hasOwnProperty("37") && !keys.hasOwnProperty("38") && keys.hasOwnProperty("40") && !keys.hasOwnProperty("39") && interval != 'b40') {
            clearAllIntervals();
            b40 = self.setInterval(function () {
                a40();
                interval = 'b40';
            }, ms);
        } else if (!keys.hasOwnProperty("37") && !keys.hasOwnProperty("38") && !keys.hasOwnProperty("40") && keys.hasOwnProperty("39") && interval != 'b39') {
            clearAllIntervals();
            b39 = self.setInterval(function () {
                a39();
                interval = 'b39';
            }, ms);
        }
        
        $("#instructions").fadeOut(900);
    }

    function resetGame() {
        clearAllIntervals();
        x = snackPoints[Math.floor((Math.random() * snackPoints.length - 1) + 1)][0];
        y = snackPoints[Math.floor((Math.random() * snackPoints.length - 1) + 1)][1];
        length = 1;
        snake[snake.length - 1] = [x, y];
        clearc();
        doSmth(x, y, direction);
        drawInstructions();
    }

    function draw_circleArray(snake) {
        context.beginPath();
        context.font = "200px Georgia";
        var grd3 = context.createLinearGradient(0, 0, 0, canvas.height);
        grd3.addColorStop(0.1, '#eee');
        grd3.addColorStop(0.4, '#cccccc');
        grd3.addColorStop(1, '#eee');
        context.fillStyle = grd3;
        context.fillText(length, 25, canvas.height - 40);
        context.closePath();

        for (var i = 0; i < snake.length; i++) {
            context.beginPath();
            context.arc(snake[i][0], snake[i][1], rr, 0, 2 * Math.PI, true);
            var grd = context.createRadialGradient(snake[i][0] - (rr / 20), snake[i][1] - (rr / 20), rr, snake[i][0] - rr, snake[i][1] - rr, rr / 10);
            grd.addColorStop(0.1, '#FF9288');
            grd.addColorStop(0.4, '#FF3C2A');
            grd.addColorStop(1, '#CC1100');
            context.fillStyle = grd;
            context.fill();
            context.closePath();

            if (i == snake.length - 1) {
                if (snake[i][1] == y2 && snake[i][0] == x2) {
                    context2.setTransform(1, 0, 0, 1, 0, 0);
                    context2.clearRect(0, 0, canvas2.width, canvas2.height);
                    redraw_circle2();
                    growSnake();
                }

                if (borderEnd == 1) {
                    if (snake[i][0] + rr > canvas.width || snake[i][0] - rr < 0 || snake[i][1] + rr > canvas.height || snake[i][1] - rr < 0) {
                        resetGame();
                    }
                }

                for (var z = 0; z < snake.length; z++) {
                    if (snake[snake.length - 1][1] == snake[z][1] && snake[snake.length - 1][0] == snake[z][0] && z != snake.length - 1) {
                        resetGame();
                    }
                }
            }
        }
    }
});