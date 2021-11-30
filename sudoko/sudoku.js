var flag = 0
var canvas;
var ctx;
var solution = document.getElementById('solve');
solution.addEventListener('click', solve);
var tiles_details = []

function intialize_sudoku(sudoku) {
    for (i = 0; i < 81; i++) {
        sudoku.push(0)
    }
}
function init() {
    var sudoku = []
    intialize_sudoku(sudoku)
    console.log(sudoku)
    solveSudoku(sudoku)
    //console.log(sudoku)
    canvas = document.getElementById('puzzle');
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
    ctx = canvas.getContext('2d');
    canvas.style.border = "1px solid black";
    var board = createPuzzel(sudoku)
    renderboard(board)
    canvas.addEventListener("click", detectTile, false);
    canvas.board = board
    canvas.sudoku = sudoku
    solution.board = board
}


// returns true if the number can be placed in the row
function checkRow(num, id, sudoku) {
    row = Math.floor(id / 9);

    for (var i = 0; i < 9; i++) {
        if (sudoku[row * 9 + i] == num) {
            return false;
        }
    }
    return true;
}

// returns true if the number can be placed in the column
function checkCol(num, id, sudoku) {
    col = id % 9;
    for (var i = 0; i < 9; i++) {
        if (sudoku[col + 9 * i] == num) {
            return false;
        }
    }
    return true;
}

// returns true if the number can be placed in the block
function checkBlock(num, id, sudoku) {
    row = Math.floor(id / 9);
    col = id % 9;
    block = Math.floor(row / 3) * 3 + Math.floor(col / 3)

    for (var i = 0; i < 9; i++) {
        id = Math.floor(block / 3) * 27 //row of blocks skipped
        id += 9 * Math.floor(i / 3)    //row of the block we want
        id += 3 * (block % 3)           //column of blocks skippked
        id += i % 3                   // colum of the block we want
        if (sudoku[id] == num) {
            return false;
        }
    }
    return true;
}

//  returns true if the number can be placed in the square
function isSafe(id, num, sudoku) {

    return checkRow(num, id, sudoku) && checkCol(num, id, sudoku) && checkBlock(num, id, sudoku);
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

var c = 0;
function solveSudoku(sudoku) {
   
    for (var i = 0; i < 81; i++) { //console.log([i])
        if (sudoku[i] == 0) {
            //console.log([i])
            for (var num of shuffle(arr)) {
                if (isSafe(i, num, sudoku)) {
                    console.log(i,num)
                    sudoku[i] = num;
                    if (solveSudoku(sudoku)) {
                        return true
                    }

                    sudoku[i] = 0
                }
            }
            return false
        }
    }
    return true
}



/* function multipleSolution(board){
    const possibleSolutions = []
    var boardClone1 = [...board]
    var boardClone2 = [... board]
    solveSudoku(boardClone1)
    solveSudoku(boardClone2)
    possibleSolutions.push( boardClone1.join() )
    possibleSolutions.push( boardClone2.join() )
    if (Array.from(new Set(possibleSolutions)).length > 1 ) return true
    return false
} */

function createPuzzel(sudoku) {
    var board = [...sudoku]

    var i = 81
    while (i != 25) {
        var id = Math.floor(Math.random() * 81);
        if (board[id]) {
            board[id] = 0;
            i--;
        }
    }
    return board;
}


// tile constructor function
function tile(x, y, id, num, width, height) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.num = num;
    this.width = width;
    this.height = height;
    this.removed = false;
}

// method that draws tile on the canvas
tile.prototype.draw = function () {
    //tile
    //console.log(this.x, this.y, this.width, this.height)
    ctx.fillStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#808080';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    //number
    ctx.fillStyle = 'DodgerBlue';
    ctx.font = "35px Areial";

    if (this.num != 0) {
        ctx.fillText(this.num, this.x + this.width / 2 - 7, this.y + this.height / 2 + 7);
    }
    else {
        this.removed = true;
    }

};
function renderboard(board) {
    var xPos = 0;
    var yPos = 0;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (i = 0; i < 81; ++i) {
        var t = new tile(xPos, yPos, i, board[i], canvas.width / 9, canvas.height / 9);
        t.draw()
        tiles_details.push(t);
        xPos += canvas.width / 9;
        if (xPos >= canvas.width) {
            xPos = 0;
            yPos += canvas.height / 9;
        }
    }
}
function detectTile(event) {
    var mouse = oMousePos(event)
    console.log(mouse)
    var which = null
    tiles_details.forEach(ti => {
        //console.log("hi", tiles_details[ti].y + tiles_details[ti].height, tiles_details[ti].x + tiles_details[ti].width)
        if (mouse.y > ti.y && mouse.y < ti.y + ti.height && mouse.x > ti.x && mouse.x < ti.x + ti.width) {
            which = ti
        }
    })

    if (which != null && which.removed) {
        increase(which, canvas.board);
    }
}
var flag =0;
function increase(which, board) {
    //number
    which.num++;
    if(which.num == 10){
        which.num = 1
    }
    drawNumber(which);

}

var delay = 1;
var mult = 1
// move disk from one peg to another
function drawNumber(which) {
    if (flag) {
        mult = 100
    }
    setTimeout(function () {
        ctx.clearRect(which.x, which.y, which.width, which.height);
        ctx.fillStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#808080';
        ctx.fillRect(which.x, which.y, which.width, which.height);
        ctx.strokeRect(which.x, which.y, which.width, which.height);
        ctx.fillStyle = '#FF0000';
        ctx.font = "35px Areial";

        //board[which.id] = which.num
        ctx.fillText(which.num, which.x + which.width / 2 - 7, which.y + which.height / 2 + 7);
        //win()
    }, mult * delay)
    if (flag) {
        delay++;
    }

}
function solve() {
    //flag =1;
    //number
    tiles_details.forEach(ti => {
        if(ti.removed){
            ti.num = canvas.sudoku[ti.id]
            drawNumber(ti);
        }
    })

}

function oMousePos(evt) {
    var ClientRect = canvas.getBoundingClientRect();
    return { //objeto
        x: evt.clientX - ClientRect.left,
        y: evt.clientY - ClientRect.top
    }
}
