
var menu = document.getElementById('menu');
var solve = document.getElementById('solve');
// stores first block on tower & first/second clicked container
var e = document.getElementById('canvas'),
  elemLeft = e.offsetLeft,
  elemTop = e.offsetTop
var source = null
var destination = null
var num = 5
var ctx
solve.addEventListener('click',solution);

var input = document.getElementById('disks');
input.addEventListener('change', updateValue); 
function updateValue(){
  num =  Number(input.value); 
  init();
}
var flag = 0
// track state of the pegs
// id is used to identify the position of each peg
// name is used to add text to the canvas below each peg
// disks is an array that stores all disk objects on the peg
// level is used to track the current level on each peg, since it is changing as we add or remove disks
// cord is an object that contains the info about x, y, width and height
var pegsState = {
  pegs: [
    { id: 0, disks: [], level: 20, coord: { x: 80, y: 400, w: 180, h: 200 } },
    { id: 1, disks: [], level: 20, coord: { x: 280, y: 400, w: 180, h: 200 } },
    { id: 2, disks: [], level: 20, coord: { x: 480, y: 400, w: 180, h: 200 } }
  ]
}
// initialization function that starts solving the problem
 function solution(ev) {
  flag = 1
  pegsState = {
    pegs: [
      { id: 0, disks: [], level: 20, coord: { x: 80, y: 400, w: 180, h: 200 } },
      { id: 1, disks: [], level: 20, coord: { x: 280, y: 400, w: 180, h: 200 } },
      { id: 2, disks: [], level: 20, coord: { x: 480, y: 400, w: 180, h: 200 } }
    ]
  }
  init()
  hanoi(num, ...pegsState.pegs);

} 
// initialization function that start game for user
function init(ev) {
  canvas.style.display = 'block';
  canvas = document.getElementById('canvas');
  canvas.width = canvas.scrollWidth;
  canvas.height = canvas.scrollHeight;
  ctx = canvas.getContext('2d');
  initDisks(num);
  drawPegs();
  drawDisks(pegsState);
  usergame();
}
// draw pegs, add text below them, and add background color of the canvas
function drawPegs() {
  // add background color
  ctx.fillStyle = '#D5FFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // drawing pegs
  ctx.lineWidth = 8
  pegsState.pegs.forEach(peg => {
    ctx.moveTo(peg.coord.x, peg.coord.y);
    ctx.lineTo(peg.coord.x + peg.coord.w, peg.coord.y);
    ctx.moveTo(peg.coord.x + 100, peg.coord.y);
    ctx.lineTo(peg.coord.x + 100, peg.coord.y - peg.coord.h);
  });
  ctx.stroke();
}

// disks constructor function
function Disk(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
}

// method that draws disk on the canvas
Disk.prototype.draw = function () {
  ctx.fillStyle = this.color;
  ctx.lineWidth = 1;
  ctx.fillRect(this.x, this.y, this.width, this.height);
  ctx.strokeRect(this.x, this.y, this.width, this.height);
};

// initializes disks on the starting peg
function initDisks(n) {
  var peg = pegsState.pegs[0].coord;
  var colors = ['#0066ff', '#1a75ff', '#3385ff', '#4d94ff', '#66a3ff', '#80b3ff', '#99c2ff', '#b3d1ff', '#cce0ff', '#e6f0ff'];
  var width = 20 * n;
  for (var i = n; i > 0; i--) {
    let disk = new Disk((peg.w / 2 + (peg.w - width) / 2), peg.y - pegsState.pegs[0].level, width, peg.h / 10, colors[i - 1]);
    pegsState.pegs[0].disks.push(disk);
    pegsState.pegs[0].level += peg.h / 10;
    width -= 20;
  }
}


// draw disks on the canvas
function drawDisks(state) {
  state.pegs.forEach(function (peg) {
    peg.disks.forEach(function (disk) {
      disk.draw();
    });
  })
}
var delay = 1;
// move disk from one peg to another
function moveDisk(from, to) {
  setTimeout(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var movingDisk = from.disks.pop();
    movingDisk.x += (to.id - from.id) * 200;
    movingDisk.y = 400 - to.level;
    to.disks.push(movingDisk);
    from.level -= 20;
    to.level += 20;
    drawPegs();
    drawDisks(pegsState);
    //win()
  }, 1000 * delay)
  if (flag) {
    delay++;
  }

}

function usergame() {
  e.addEventListener("click", eventforpeg, false);
}

function eventforpeg(event) {
  var mouse = oMousePos(e, event)
  which = null
  pegsState.pegs.forEach(peg => {
    if (mouse.y < peg.coord.y && mouse.y > peg.coord.y - peg.coord.h && mouse.x > peg.coord.x && mouse.x < peg.coord.x + peg.coord.w + 200) {
      which = peg
    }
  })
  if (which != null) {
    if (source == null && which.disks.length != 0) {
      //console.log(which);
      source = which
    }
    else if (source != null) {
      destination = which
      compare()
    }
  }
}
function compare() {
  if (destination.disks.length != 0) {
    compareDisks()
  } else {
    //console.log(source, destination);
    moveDisk(source, destination)
    source = null
    destination = null
  }
}
function compareDisks() {
  console.log(destination.disks[destination.disks.length - 1], source.disks[source.disks.length - 1])
  if (destination.disks[(destination.disks.length) - 1].width > source.disks[source.disks.length - 1].width) {

    moveDisk(source, destination)
  }
  source = null
  destination = null
}
function win() {
  console.log(pegsState.pegs[1].disks.length, pegsState.pegs[2].disks.length)
  if (pegsState.pegs[1].disks.length == num || pegsState.pegs[2].disks.length == num) {
    alert("YOU WIN, CONGRATULATIONS!");
    document.location.reload();
  }
}
//recursive algorithm for solving towers of hanoi
function hanoi(n, from, to, aux) {
  if (n >= 1) {
    hanoi(n - 1, from, aux, to);
    moveDisk(from, to);
    hanoi(n - 1, aux, to, from);
  }
}

function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return { //objeto
    x: evt.clientX - ClientRect.left,
    y: evt.clientY - ClientRect.top
  }
}