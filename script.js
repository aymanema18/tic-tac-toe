const gameBoard = (function(){
    const gameBoard = [];
    let btns = document.querySelectorAll(".btn");
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
    
    function getDomIndex (target) {
        return [].slice.call(target.parentNode.children).indexOf(target)
    }

    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            gameBoard[getDomIndex(btn)].value = "x";
            btn.textContent = "x";
            btn.style.textAlign = "center";
            btn.style.backgroundColor = "green"
        })
    })
    return {gameBoard};
})();

const players = (function() {
    const players = []
    let btns = document.querySelectorAll("button");
    function player(value) {
        value = value;
        return {value};
    }
    
    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (players.length < 2) {
                players.push(player(btn.value))
                if (players[0].value === "x") {
                    players.push(player("o"))
                } else {
                    players.push(player("x"))
                }
            }
        })
    })
    return {players};

})()
