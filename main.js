var dpr = window.devicePixelRatio;
var width = dpr * window.innerWidth / 4;
var height = dpr * window.innerHeight / 4;

function sketch_idnameofdiv(p) {
  p.setup = function () {
    p.createCanvas(width, height);
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
        p.fill(0);
        p.noStroke();
        p.circle(dot.x, dot.y, 3);
      }
      lines.push(line);
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
        if (i + (y / 2) < size / (dpr * gap * 2) - 1) continue;
        if (i - (y / 2) >= size / (dpr * gap * 2) + 1) continue;
        dotLine.push(odd ? lines[y][i] : lines[y + 1][i]);
        dotLine.push(odd ? lines[y + 1][i] : lines[y][i]);
      }
      for (var i = 0; i < dotLine.length - 2; i++) {
        drawTriangle(p, dotLine[i], dotLine[i + 1], dotLine[i + 2]);
      }
    }
  }
}
new p5(sketch_idnameofdiv, 'canvas')