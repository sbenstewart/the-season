var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

var size = window.innerWidth / 4;
var dpr = window.devicePixelRatio;
canvas.width = dpr * window.innerWidth / 4;
canvas.height = dpr * window.innerHeight / 4;
context.scale(dpr, dpr);
context.lineJoin = 'bevel';

var line, dot,
    odd = false, 
    lines = [],
    gap = (canvas.width + canvas.height) / 75;

for(var y = gap / 2; y <= window.innerWidth / 4; y+= gap) {
  odd = !odd;
  line = [];
  for(var x = gap / 4; x <= size; x+= gap) {
    dot = {x: x + (odd ? gap/2 : 0), y: y};
    line.push(dot);
    context.beginPath();
    context.arc(dot.x, dot.y, 1, 0, 2 * Math.PI, true);
    context.fill();
  }
  lines.push(line);
}

function drawTriangle(pointA, pointB, pointC) {
  context.beginPath();
  context.moveTo(pointA.x, pointA.y);
  context.lineTo(pointB.x, pointB.y);
  context.lineTo(pointC.x, pointC.y);
  context.lineTo(pointA.x, pointA.y);
  context.closePath();
  context.stroke();
}

var dotLine;
odd = true;

for(var y = 0; y < lines.length - 1; y++) {
  odd = !odd;
  dotLine = [];
  for(var i = 0; i < lines[y].length; i++) {
    if(i + (y/2) < size/(gap*2) - 1) continue;
    if(i - (y/2) >= size/(gap*2) + 1) continue;
    dotLine.push(odd ? lines[y][i]   : lines[y+1][i]);
    dotLine.push(odd ? lines[y+1][i] : lines[y][i]);
  }
  for(var i = 0; i < dotLine.length - 2; i++) {
    drawTriangle(dotLine[i], dotLine[i+1], dotLine[i+2]);
  }
}