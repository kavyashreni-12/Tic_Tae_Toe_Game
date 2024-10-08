const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// lets create a func to initialize
function initGame(){
    currPlayer = "X";
    gameGrid = ["" , "" , "" , "" , "" , "" , "" , "", ""];
    // ui per empty
    boxes.forEach((box , index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove("win");
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText= `Current Player - ${currPlayer}`;
}

initGame();

function swapTurn(){
    if(currPlayer === "X")
    {
        currPlayer = "O";
    }
    else
    {
        currPlayer = "X";
    }

    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

function checkGameOver(){
   
    let answer = "";
    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] == gameGrid[position[1]]) && (gameGrid[position[2]] == gameGrid[position[1]]) && (gameGrid[position[0]] == gameGrid[position[2]]))
        {
            // check if winnner in x
            if(gameGrid[position[0]] == "X")
            {
                answer = "X";
            }
            else
            {
                answer = "O";
            }

            // disacle pointet events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // winner mil gaya
    if(answer !== "")
    {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // when no winner or tie
    let Fillcount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
        Fillcount++;
    });

    if(Fillcount == 9)
    {
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index){
    if(gameGrid[index] === "")
    {
        boxes[index].innerText = currPlayer;
        gameGrid[index] = currPlayer;
        boxes[index].style.pointerEvents = "none";
        // turn
        swapTurn();
        // check koi game winner
        // console.log("game over me pahuche kya ??");
        checkGameOver();

    }
}
boxes.forEach((box , index) => {
    box.addEventListener("click" , () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener("click" , initGame);