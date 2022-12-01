'use strict'

let area = document.querySelector('.area');
let condition = {
    snakePresence : false,
    applePresence : false,
    empty : true
};

let seventhSegmentFlag = true;
let snake = [
    {x : 5,
     y : 5,
    },
    {x : 5,
     y : 6,
    },
    {x : 5,
     y : 7,
         },
]

let areaArray = createFieldArray();

createTableByArray();
let trs = document.querySelectorAll('tr');
getInitialSnakePresenceInArray()
addOrRemoveClassListSnake()
createAppleInArray()
addOrRemoveAppleOnTheTable()
createPoisonInArray()
addOrRemovePoisonOnTheTable()
poisoned()

let moveLeft;
let moveUp;
let moveRight;
let moveDown;


document.addEventListener('keyup', function (event) {
    if (event.code == 'KeyA') {

        clearInterval(moveUp);
        clearInterval(moveDown);
        clearInterval(moveLeft);
        clearInterval(moveRight);
        
        moveLeft = setInterval(function () {
            movesTheTailOfSnake()
            snake[0].y -= 1;
            if (snake[0].y == -1) {
                snake[0].y = 9
            }
        
            checkTheArrayForSnakePresence();
            addOrRemoveClassListSnake();
            getToEatApple();
            poisoned();

            if (snake.length == 7 && seventhSegmentFlag == true) {
                addWallInArray();
                addOrRemoveWallOnTheTable()
            }
            wallCollision()
            tailCollision()
        }, 100)
    }
    if (event.code == 'KeyD') {

        clearInterval(moveDown);
        clearInterval(moveRight);
        clearInterval(moveUp);
        clearInterval(moveLeft);

        moveRight = setInterval(function () {
            movesTheTailOfSnake()
            snake[0].y += 1;
            if (snake[0].y == 10) {
                snake[0].y = 0
            }

            checkTheArrayForSnakePresence();
            addOrRemoveClassListSnake();
            getToEatApple();
            poisoned();

            if (snake.length == 7 && seventhSegmentFlag == true) {
                addWallInArray();
                addOrRemoveWallOnTheTable()
            }

            wallCollision()
            tailCollision()

        }, 100)
    }
    if (event.code == 'KeyW') {
        clearInterval(moveUp);
        clearInterval(moveRight);
        clearInterval(moveLeft);
    
        moveUp = setInterval(function () {
            movesTheTailOfSnake()
            snake[0].x -= 1;
            if (snake[0].x == -1) {
                snake[0].x = 9
            }
    
            checkTheArrayForSnakePresence();
            addOrRemoveClassListSnake();
            getToEatApple();
            poisoned();

            if (snake.length == 7 && seventhSegmentFlag == true) {
                addWallInArray();
                addOrRemoveWallOnTheTable()
            }
    
            wallCollision()
            tailCollision()
    
        }, 100)
    }
    if (event.code == 'KeyS') {

        clearInterval(moveDown);
        clearInterval(moveRight);
        clearInterval(moveLeft);
        clearInterval(moveUp);

        moveDown = setInterval(function () {
            movesTheTailOfSnake()
            snake[0].x += 1;
            if (snake[0].x == 10) {
                snake[0].x = 0
            }

            checkTheArrayForSnakePresence();
            addOrRemoveClassListSnake();
            getToEatApple();
            poisoned();

            if (snake.length == 7 && seventhSegmentFlag == true) {
                addWallInArray();
                addOrRemoveWallOnTheTable()
            }

            wallCollision()
            tailCollision()
        }, 100)
    }
})

function getInitialSnakePresenceInArray () {
    areaArray[snake[0].x][snake[0].y].snakePresence = true;
    areaArray[snake[1].x][snake[1].y].snakePresence = true;
    areaArray[snake[2].x][snake[2].y].snakePresence = true;
    areaArray[snake[0].x][snake[0].y].empty = false;
    areaArray[snake[1].x][snake[1].y].empty = false;
    areaArray[snake[2].x][snake[2].y].empty = false;
    }


function movesTheTailOfSnake() {
        for (let i = snake.length-1; i > 0; i--) {
            snake[i].x = snake[i-1].x;
            snake[i].y = snake[i-1].y;
        }
    }


function tailCollision () {
  for (let i = 3; i < snake.length; i++) { //3 потомучто 0, 1, 2, 3 в любом случае не столкнется
  if (snake[0].x == snake[i].x &&
      snake[0].y == snake[i].y) {
        console.log('cont')
        snake.splice(3,snake.length-1);
        removeWall()
        addOrRemoveWallOnTheTable()
  snake[0].x = 5;
  snake[0].y = 5;
  snake[1].x = 5;
  snake[1].y = 6;
  snake[2].x = 5;
  snake[2].y = 7;
        getInitialSnakePresenceInArray ()
        seventhSegmentFlag = true;    
      } 
  }
}

function wallCollision () {
    if (areaArray[snake[0].x][snake[0].y].snakePresence == true &&
        areaArray[snake[0].x][snake[0].y].wall == true) {
        snake.splice(3,snake.length-1);
        removeWall()
        addOrRemoveWallOnTheTable()
  snake[0].x = 5;
  snake[0].y = 5;
  snake[1].x = 5;
  snake[1].y = 6;
  snake[2].x = 5;
  snake[2].y = 7;
        getInitialSnakePresenceInArray ()
        seventhSegmentFlag = true;
     }
       
}

function addWallInArray () {
let targetElem = {empty : false};
let nextTargetElem;
let prevTargetElem;

if (targetElem.empty == false) {
    let  i = getRandomInt(0,9);
    let  k = getRandomInt(0,9);
    targetElem = areaArray[i][k];
    nextTargetElem = areaArray[i+1][k];
    prevTargetElem = areaArray[i-1][k];
    }

targetElem.wall = true;
nextTargetElem.wall = true;
prevTargetElem.wall = true;
targetElem.empty = false;
nextTargetElem.empty = false;
prevTargetElem.empty = false;
seventhSegmentFlag = false;
}


function addOrRemoveWallOnTheTable () {
    for (let i = 0; i < areaArray.length; i++) {
        for (let k = 0; k < areaArray[i].length; k++) {
            if (areaArray[i][k].wall == true){
                trs[i].children[k].classList.add('wall')
               }
               if (areaArray[i][k].wall == false)
               {
                trs[i].children[k].classList.remove('wall')
               }
            }
        }
}


function removeWall () {
    for (let i = 0; i < areaArray.length; i++) {
        for (let k = 0; k < areaArray[i].length; k++) {
            areaArray[i][k].wall = false
        }
}
}


function getToEatApple () {
    if (areaArray[snake[0].x][snake[0].y].snakePresence == true && areaArray[snake[0].x][snake[0].y].applePresence == true) {
        createNewSegmentOfTail();
        checkTheArrayForSnakePresence();
        addOrRemoveClassListSnake();
        removeApple(snake[0].x,snake[0].y);
        createAppleInArray()
        addOrRemoveAppleOnTheTable()
        
    }
}

function poisoned() {
    if (areaArray[snake[0].x][snake[0].y].snakePresence == true && areaArray[snake[0].x][snake[0].y].poison == true) {
       snake.splice(3,snake.length-1);
       removePoison(snake[0].x, snake[0].y)
 snake[0].x = 5;
 snake[0].y = 5;
 snake[1].x = 5;
 snake[1].y = 6;
 snake[2].x = 5;
 snake[2].y = 7;
       getInitialSnakePresenceInArray ()
       addOrRemovePoisonOnTheTable();
       createPoisonInArray()
       addOrRemovePoisonOnTheTable()
    }
      
}

function removePoison (subArr, elem) { 
    areaArray[subArr][elem].poison = false;
    areaArray[subArr][elem].empty = true;
    }

    
function createPoisonInArray () {
    let targetElem = {empty : false};
    while (targetElem.empty == false) {
        targetElem = areaArray[getRandomInt (0,9)][getRandomInt(0,9)]
    }
    targetElem.poison = true;
    targetElem.empty = false;
}

function addOrRemovePoisonOnTheTable () {
    for (let i = 0; i < areaArray.length; i++) {
        for (let k = 0; k < areaArray[i].length; k++) {
            if (areaArray[i][k].poison == true){
                trs[i].children[k].classList.add('poison')
               }
               if (areaArray[i][k].poison == false)
               {
                trs[i].children[k].classList.remove('poison')
               }
            }
        }
}


function createNewSegmentOfTail () {
  let segment = {x:10,y:10,}
snake.push(segment)
}

function removeApple (subArr, elem) {
areaArray[subArr][elem].applePresence = false;
areaArray[subArr][elem].empty = true;

}

function addOrRemoveAppleOnTheTable () {
    for (let i = 0; i < areaArray.length; i++) {
        for (let k = 0; k < areaArray[i].length; k++) {
            if (areaArray[i][k].applePresence == true){
                trs[i].children[k].classList.add('apple')
               }
               if (areaArray[i][k].applePresence == false)
               {
                trs[i].children[k].classList.remove('apple')
               }
            }
        }
}


// function createAppleInArray () {
// let targetElem;
// targetElem = areaArray[getRandomInt(0,9)][getRandomInt(0,9)];
// if (targetElem.empty == true) {  
//     targetElem.applePresence = true;
//     targetElem.empty = false
   
// } else {
//   createAppleInArray()
// }
// }


function createAppleInArray () {
    let target = {empty : false};  //создаем объект target со свойством empty значением false
    
    while (target.empty == false) {  //пока у объекта target, empty == false
    target = areaArray[getRandomInt(0,9)][getRandomInt(0,9)]; //будем target присваеивать рандомную ячейку
    // И КОГДА МЫ ПРИСВОИМ ЕЙ ЯЧЕЙКУ, ПОЛУЧИТСЯ target будет иметь свойства snakePresence, applePresence и empty
    // а нам нужно как раз так свойство empty и получается что ДО ТЕХ ПОР ПОКА target.empty == false,
    // цикл будет присваивать ей рандомную ячейку, в тот момент когда на рандом выпадет ячейка со свойствами
    // snakePresence, applePresence, EMPTY = true, мы выйдем из цикла и присвоим ей нужный нам applePresence = true
    
    }        target.applePresence = true;
        target.empty = false
      
    }

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}



function checkTheArrayForSnakePresence () {
      for (let i = 0; i < areaArray.length; i++) {
          for (let k = 0; k < areaArray[i].length; k++)
            for (let j = 0; j < snake.length; j++) { {
                if( snake[j].x == i && snake[j].y == k) 
    {
     areaArray[i][k].snakePresence = true;
     areaArray[i][k].empty = false
     break
    } else {
     areaArray[i][k].snakePresence = false;
     areaArray[i][k].empty = true
    } 
}
    }
}
}


function addOrRemoveClassListSnake() {
    for (let i = 0; i < areaArray.length; i++) {
        for (let k = 0; k < areaArray[i].length; k++) {
            if (areaArray[i][k].snakePresence == true){
                trs[i].children[k].classList.add('snake_color')
               }
               if (areaArray[i][k].snakePresence == false)
               {
                trs[i].children[k].classList.remove('snake_color')
               }
            }
        }
    }




function createTableByArray () {
   let table = document.createElement('table')
       for (let i = 0; i < areaArray.length; i++){
            let row = document.createElement('tr');
                for (let k = 0; k < areaArray[i].length; k++) {
                        let cell = document.createElement('td');
                        row.appendChild(cell)
                        }
        table.appendChild(row);
        }
        area.appendChild(table)
}


function createFieldArray () {
    let areaArray = []
        for (let i = 0; i < 10; i++) {
        areaArray[i] = [];
        for (let k = 0; k < 10; k++) {
            areaArray[i].push(Object.assign({}, condition));
        }
    }return areaArray
}
