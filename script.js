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
    const players = []
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
    return {players};

})()

const playRound = (function() {
    let btns = document.querySelectorAll(".btn");

    function getDomIndex (target) {
        return [].slice.call(target.parentNode.children).indexOf(target)
    }

    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (players.players.length === 2) {
                if (!btn.textContent && players.players[0].turn === true) {
                    gameBoard.gameBoard[getDomIndex(btn)].value = players.players[0].value;
                    btn.textContent = players.players[0].value;
                    btn.value = players.players[0].value;
                    btn.style.textAlign = "center";
                    btn.style.backgroundColor = "green";
                    players.players[0].turn = false;
                    players.players[1].turn = true;
                } else if (!btn.textContent && players.players[1].turn === true) {
                    gameBoard.gameBoard[getDomIndex(btn)].value = players.players[1].value;
                    btn.textContent = players.players[1].value;
                    btn.value = players.players[1].value;
                    btn.style.textAlign = "center";
                    btn.style.backgroundColor = "red";
                    players.players[1].turn = false;
                    players.players[0].turn = true;
                }
            }
            if (checkGame.isOverCheck() !== false) {
                if (checkGame.isOverCheck() === "draw") {
                    console.log(`draw`);
                } else {
                    for (let i = 0; i < 2; i++){
                        if (players.players[i].turn === false) {
                            console.log(`${players.players[i].name} wins!`);
                        }
                    }
                }
            }
        })
    
    })

    
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