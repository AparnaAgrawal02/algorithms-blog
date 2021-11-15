var flag = 0
var canvas;
var ctx;
var difficulty = 3;
var num = difficulty * difficulty

var tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];
var goal = [1, 2, 3, 4, 5, 6, 7, 8, 0];
/* var tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
var goal =  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]; */
var tiles_details = []
var tile0_pos = num - 1;
var solution = document.getElementById('solve');
solution.addEventListener('click', solve);

var input = document.getElementById('difficulty');
input.addEventListener('change', updateValue);
function updateValue() {
    difficulty = Number(input.value);
    num = difficulty * difficulty
    tile0_pos = num - 1;
    tiles = []
    goal = []
    for (i = 1; i < num; i++) {
        tiles.push(i);
        goal.push(i);
    }
    tiles.push(0);
    goal.push(0);
    init();
}
/* init a new puzzle */
function init() {
    canvas = document.getElementById('puzzle');
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
    ctx = canvas.getContext('2d');
    canvas.style.border = "1px solid black";
    shuffle();
    draw_puzzle();
    if (!flag) {
        usergame()
    }


}
/* draw initial puzzle state on canvas */
function draw_puzzle() {
    var xPos = 0;
    var yPos = 0;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (i = 0; i < num; ++i) {
        var t = new tile(xPos + 7, yPos + 7, tiles[i], i, canvas.width / difficulty - 14, canvas.height / difficulty - 14);
        tiles_details.push(t)
        if (tiles[i] != 0) {
            t.draw()
        }

        xPos += canvas.width / difficulty;
        if (xPos >= canvas.width) {
            xPos = 0;
            yPos += canvas.height / difficulty;
        }
    }
}
// tile constructor function
function tile(x, y, id, curpos, width, height) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.curpos = curpos;
    this.width = width;
    this.height = height;
}

// method that draws tile on the canvas
tile.prototype.draw = function () {
    //tile
    ctx.fillStyle = 'DodgerBlue';
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#808080';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    //number
    ctx.fillStyle = '#FFFFFF';
    ctx.font = "35px Areial";
    //adjust center for larger numbers
    if (tiles[i] >= 10) {
        ctx.fillText(tiles[this.curpos], this.x + this.width / 2 - 10, this.y + this.height / 2 + 5);
    } else {
        ctx.fillText(tiles[this.curpos], this.x + this.width / 2 - 5, this.y + this.height / 2 + 5);
    }
};
function usergame() {
    canvas.addEventListener("click", detectTile, false);
}

function detectTile(event) {
    var moveable_tiles = moveable()
    var mouse = oMousePos(event)
    console.log(mouse)
    var which = null
    moveable_tiles.forEach(ti => {
        console.log("hi", tiles_details[ti].y + tiles_details[ti].height, tiles_details[ti].x + tiles_details[ti].width)
        if (mouse.y > tiles_details[ti].y && mouse.y < tiles_details[ti].y + tiles_details[ti].height && mouse.x > tiles_details[ti].x && mouse.x < tiles_details[ti].x + tiles_details[ti].width) {
            which = tiles_details[ti]
        }
    })

    if (which != null) {
        moveTile(which)
    }
}

function moveable() {
    var t1 = []
    if (tile0_pos - difficulty >= 0) {
        t1.push(tile0_pos - difficulty)
        console.log("oh", tile0_pos - difficulty, tile0_pos, difficulty)
    }
    if (tile0_pos - 1 >= 0 && (tile0_pos) % difficulty != 0) {
        t1.push(tile0_pos - 1)
    }
    if (tile0_pos + 1 < num && (tile0_pos + 1) % difficulty != 0) {
        t1.push(tile0_pos + 1)
    }
    if (tile0_pos + difficulty < num) {
        t1.push(tile0_pos + difficulty)
    }
    return t1;
}
function moveable_solve(zeropos) {
    var t1 = []
    if (zeropos - difficulty >= 0) {
        t1.push(zeropos - difficulty)
    }
    if (zeropos - 1 >= 0 && (zeropos) % difficulty != 0) {
        t1.push(zeropos - 1)
    }
    if ((zeropos + 1) < num && (zeropos + 1) % difficulty != 0) {
        t1.push(zeropos + 1)
    }
    if (zeropos + difficulty < num) {
        t1.push(zeropos + difficulty)
    }
    //console.log(t1);
    return t1;
}

var delay = 1;
var mult = 1;
// move disk from one peg to another
function moveTile(t) {
    if(flag){
        mult =400;
    }
    setTimeout(function () {
        var id = tiles[t.curpos]
        tiles[t.curpos] = 0
        tiles[tile0_pos] = id
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        tiles_details[tile0_pos].id = tiles_details[t.curpos].id
        tiles_details[t.curpos].id = 0
        tile0_pos = tiles_details[t.curpos].curpos

        draw_puzzle()
        //win()
    }, mult* delay)
    if (flag) {
        delay++;
    }

}
function oMousePos(evt) {
    var ClientRect = canvas.getBoundingClientRect();
    return { //objeto
        x: evt.clientX - ClientRect.left,
        y: evt.clientY - ClientRect.top
    }
}

function shuffle() {
    var m, to
    for (i = 0; i < 1000; ++i) {
        m = moveable()
        console.log(m)
        to = Math.floor(Math.random() * m.length);
        var id = tiles[m[to]]
        tiles[tile0_pos] = id
        tiles[m[to]] = 0
        tile0_pos = m[to]


    }
}

function huristic(current) {
    var temp = 0
    for (i = 0; i < num; i++) {
        if (current[i] != goal[i]) {
            temp++;
        }
    }
    return temp;
}

function sortqueue(pqueue) {
    pqueue.sort((a, b) => {
        return a.priority - b.priority;
    });
}
function solve() {
    var inv = 0;
    for (var i = 0; i < 16; ++i) {
        for (var j = 0; j < i; ++j) {
            if (tiles[j] > tiles[i])
                ++inv;
        }
    }
    for (var i = 0; i < 16; ++i) {
        if (tiles[i] == 0)
            inv += 1 + i / 4;
    }
    if (inv & 1) {
        console.log("solvable");
    }
    let pqueue = [];
    let final = [];
    // Set initial state
    var state = {
        board: tiles,
        moves: 0,
        moved_tile: tile0_pos,
        priority: 0,
        previous: null
    }
    //console.log(tiles)
    // Push current state into the queue
    pqueue.push(state);
    var count = 0;
    visited = new Set();
    while (true) {
        var cur = pqueue.shift()
        count += 1
        // if(count ==500){
        //     break;
        // }
        var moveable_tiles = moveable_solve(cur.moved_tile);
        moveable_tiles.forEach(ti => {
            var dup = []
            var b = cur.board
            for (var i = 0; i < num; ++i) {
                dup.push(b[i])
            }

            dup[cur.moved_tile] = dup[ti]
            dup[ti] = 0
            // console.log(cur)

            var repeat = 0
            for (let item of visited.keys()) {
                //console.log(item.toString() ,dup.toString())
                if (JSON.stringify(item) == JSON.stringify(dup)) {
                    repeat = 1
                    break;
                }
            }

            if (!repeat) {
                var state1 = {
                    board: dup,
                    moved_tile: ti,
                    moves: cur.moves + 1,
                    priority: huristic(dup),
                    previous: cur
                }

                var x = pqueue.push(state1)

            }
        })
        final.push(cur);
        if (JSON.stringify(goal) == JSON.stringify(cur.board)) {
            break;
        }
        visited.add(cur.board);
        sortqueue(pqueue);

    }
    console.log(final)
    reconstruct(final[final.length - 1])
}

function reconstruct(ans) {
    arr = []
    flag = 1
    console.log(ans);
    while (ans != null) {
        arr.push(ans.moved_tile)
        ans = ans.previous
    }
    console.log(arr);
    arr.reverse()
    arr.forEach(i => {
        moveTile(tiles_details[i])
        console.log(i);
    })
}



