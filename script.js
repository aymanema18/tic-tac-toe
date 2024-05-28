const gameBoard = (function(){
    const gameBoard = [];
    function boardCell(x, y, value){
        value = value;
        x = x;
        y = y;
        return {value, x, y}
    }
    for(let y = 1; y < 4; y++) {
        for(let x = 1; x < 4; x++) {
            gameBoard.push(boardCell(x, y));
        }
    }
    
    return {gameBoard};
})();

const players = (function() {
    let players = []
    let btns = document.querySelectorAll("button");
    function player(value) {
        value = value;
        turn = false;
        return {turn, value};
    }
    
    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (players.length < 2) {
                players.push(player(btn.value))
                players[0].turn = true;
                if (players[0].value === "x") {
                    players.push(player("o"))
                } else {
                    players.push(player("x"))
                }
                players[0].name = "p1";
                players[1].name = "p2";
            }
        })
    })
    function clear() {
        players.length = 0;
    }
    return {players, clear};

})()

const display = (function() {
    let btns = document.querySelectorAll(".btn");
    const board = document.querySelector(".board")
    const p1 = document.querySelector(".p1");
    const p2 = document.querySelector(".p2");
    const newBtn = document.querySelector(".new-game");

    newBtn.disabled = true;
    let p1Score = 0;
    let p2Score = 0;
    p1.textContent = `player 1: ${p1Score}`;
    p2.textContent = `player 2: ${p2Score}`;
    newBtn.addEventListener("click", () => {
        players.clear();
        playRound.clear();
        newBtn.disabled = true;
        playRound.result.textContent = "";
    })
    return {p1, p2, p1Score, p2Score, board, newBtn}
})()

const playRound = (function() {
    let btns = document.querySelectorAll(".btn");
    const result = document.querySelector(".result");

    function getDomIndex (target) {
        return [].slice.call(target.parentNode.children).indexOf(target)
    }

    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (players.players.length === 2) {
                if (!checkGame.isOverCheck()) {
                    if (!btn.textContent && players.players[0].turn === true) {
                        gameBoard.gameBoard[getDomIndex(btn)].value = players.players[0].value;
                        if (players.players[0].value === "x") {
                            btn.innerHTML = `<img class="X" src="images/Group 14.png">`;
                        } else {
                            btn.innerHTML = `<img class="O" src="images/Ellipse 5 (Stroke).png">`;
                        }
                        btn.value = players.players[0].value;
                        players.players[0].turn = false;
                        players.players[1].turn = true;
                    } else if (!btn.textContent && players.players[1].turn === true) {
                        gameBoard.gameBoard[getDomIndex(btn)].value = players.players[1].value;
                        if (players.players[1].value === "x") {
                            btn.innerHTML = `<img class="X" src="images/Group 14.png">`;
                        } else {
                            btn.innerHTML = `<img class="O" src="images/Ellipse 5 (Stroke).png">`;
                        }
                        btn.value = players.players[1].value;
                        players.players[1].turn = false;
                        players.players[0].turn = true;
                    }
                }
            }
            if (checkGame.isOverCheck() !== false) {
                if (checkGame.isOverCheck() === "draw") {
                    result.textContent = "Tie";
                    display.newBtn.disabled = false;
                } else {
                    for (let i = 0; i < 2; i++){
                        if (players.players[i].turn === false) {
                            if (players.players[i].name === "p1") {
                                if (display.newBtn.disabled === true) {
                                    display.p1Score++;
                                    display.p1.textContent = `player 1: ${display.p1Score}`
                                }
                            } else {
                                if (display.newBtn.disabled === true) {
                                    display.p2Score++;
                                    display.p2.textContent = `player 2: ${display.p2Score}`
                                }
                            }
                            result.textContent = `${players.players[i].name} wins!`;
                            display.newBtn.disabled = false;
                        }
                    }
                }
            }
        })
    
    })

    function clear() {
        btns.forEach((btn) => {
            gameBoard.gameBoard.forEach((cell) => {
              cell.value = undefined;  
            })
            btn.textContent = "";
        })
    }
    
    return {clear, result}
})()

const checkGame = (function() {
    function isOverCheck() {
        const Board = gameBoard.gameBoard;
        let counter = 0;
        if (Board[0].value === Board[4].value 
            && Board[0].value === Board[8].value
            && Board[4].value !== undefined
            && Board[8].value !== undefined
            && Board[0].value !== undefined
            || Board[0].value === Board[1].value 
            && Board[0].value === Board[2].value
            && Board[0].value !== undefined
            && Board[1].value !== undefined
            && Board[2].value !== undefined
            || Board[0].value === Board[3].value
            && Board[0].value === Board[6].value
            && Board[0].value !== undefined
            && Board[3].value !== undefined
            && Board[6].value !== undefined
            || Board[1].value === Board[4].value
            && Board[1].value === Board[7].value
            && Board[1].value !== undefined
            && Board[4].value !== undefined
            && Board[7].value !== undefined
            || Board[2].value === Board[4].value
            && Board[2].value === Board[6].value
            && Board[2].value !== undefined
            && Board[4].value !== undefined
            && Board[6].value !== undefined
            || Board[3].value === Board[4].value
            && Board[3].value === Board[5].value
            && Board[3].value !== undefined
            && Board[4].value !== undefined
            && Board[5].value !== undefined
            || Board[6].value === Board[7].value
            && Board[6].value === Board[8].value
            && Board[6].value !== undefined
            && Board[7].value !== undefined
            && Board[8].value !== undefined
            ) {
                for (let i = 0; i < Board.length; i++, counter++) {
                    if (Board[i].value === undefined) {
                        break;
                    }
                }
                if (counter === 9 && Board[8].value !== undefined) {
                    if (Board[0].value === Board[4].value 
                        && Board[0].value === Board[8].value
                        || Board[0].value === Board[1].value 
                        && Board[0].value === Board[2].value
                        || Board[0].value === Board[3].value
                        && Board[0].value === Board[6].value
                        || Board[1].value === Board[4].value
                        && Board[1].value === Board[7].value
                        || Board[2].value === Board[4].value
                        && Board[2].value === Board[6].value
                        || Board[3].value === Board[4].value
                        && Board[3].value === Board[5].value
                        || Board[6].value === Board[7].value
                        && Board[6].value === Board[8].value
                        ) {
                            return "win";
                    } else {
                        return "draw";
                    }
                } else {
                    return "win";
                }
            } else {
                for (let i = 0; i < Board.length; i++, counter++) {
                    if (Board[i].value === undefined) {
                        break;
                    }
                }
                if (counter === 9 && Board[8].value !== undefined) {
                    if (Board[0].value === Board[4].value 
                        && Board[0].value === Board[8].value
                        || Board[0].value === Board[1].value 
                        && Board[0].value === Board[2].value
                        || Board[0].value === Board[3].value
                        && Board[0].value === Board[6].value
                        || Board[1].value === Board[4].value
                        && Board[1].value === Board[7].value
                        || Board[2].value === Board[4].value
                        && Board[2].value === Board[6].value
                        || Board[3].value === Board[4].value
                        && Board[3].value === Board[5].value
                        || Board[6].value === Board[7].value
                        && Board[6].value === Board[8].value
                        ) {
                            return "win";
                    } else {
                        return "draw";
                    }
                }
                return false;
            }
    }
    return {isOverCheck};
})()