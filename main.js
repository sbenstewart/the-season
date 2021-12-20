var dpr = window.devicePixelRatio;
var width = dpr * window.innerWidth / 4;
var height = dpr * window.innerHeight / 4;
var dotSize = 1;
var dotSpeed = 1;

function sketch_idnameofdiv(p) {
  p.setup = function () {
    p.createCanvas(width + 10, width);
    p.clear();
  }

  p.draw = function () {
    p.clear();

    var size = dpr * window.innerWidth / 4;

    var line, dot,
      odd = false,
      lines = [],
      gap = (width + height) / 75;

    for (var y = dpr * gap / 2; y <= width; y += gap * dpr) {
      odd = !odd;
      line = [];
      for (var x = dpr * gap / 4; x <= size; x += gap * dpr) {
        dot = { x: x + (odd ? dpr * gap / 2 : 0), y: y };
        line.push(dot);
      }
      lines.push(line);
    }

    if (dotSize < 1 || dotSize > 40) {
      dotSpeed = -dotSpeed;
    }

    var offsetX = 0;
    var offsetY = 0;
    if (p.mouseIsPressed && p.mouseX > 0 && p.mouseX < width && p.mouseY > 0 && p.mouseY < width) {
      offsetX = p.map(p.mouseX, 0, width, - gap * dpr / 2, gap * dpr * 0.9);
      offsetY = p.map(p.mouseY, 0, width, - gap * dpr / 2, gap * dpr * 0.9);
      dotSize = (dotSize + dotSpeed / 3);
    } else if (p.mouseIsPressed) {
      dotSize = dotSize;
    } else {
      dotSize = (dotSize + dotSpeed);
    }

    function drawDot(p, pointA) {
      p.fill(0);
      p.noStroke();
      p.circle(pointA.x + offsetX, pointA.y + offsetY, dotSize / 10);
    }


    function drawTriangle(p, pointA, pointB, pointC) {
      p.noFill();
      p.stroke(0);
      p.triangle(pointA.x, pointA.y, pointB.x, pointB.y, pointC.x, pointC.y)
    }

    var dotLine;
    odd = true;

    for (var y = 0; y < lines.length - 1; y++) {
      odd = !odd;
      dotLine = [];
      for (var i = 0; i < lines[y].length; i++) {
        if (i + (y / 2) < size / (dpr * gap * 2) - 1 || i - (y / 2) >= size / (dpr * gap * 2) + 1) {
          drawDot(p, lines[y][i])
        } else {
          dotLine.push(odd ? lines[y][i] : lines[y + 1][i]);
          dotLine.push(odd ? lines[y + 1][i] : lines[y][i]);
        }
      }
      for (var i = 0; i < dotLine.length - 2; i++) {
        drawTriangle(p, dotLine[i], dotLine[i + 1], dotLine[i + 2]);
      }
    }
  }
}
new p5(sketch_idnameofdiv, 'canvas')