function Game() {
    let myBoard = GameBoard();
    let pOneCount = 0;
    let pTwoCount = 0;
    let turnFlag = 0;

    const Players = [{ name: "P1", token: "X"},
                    { name: "P2",token: "O"}] 

    let activeP = Players[0]; 
    
    const switchTurn = () => {
        activeP = activeP === Players[0]? Players[1] : Players[0];
    }

    const printActiveP = () => {
        console.log(activeP.name + "'s turn.");
    }

    const getActiveP = () => {
        return (activeP.token);
    }

    const playRound = (ind) => {
        if(ind < 0 || ind > myBoard.getCellCount() - 1){
            console.log("Invalid move.");
            printActiveP();
            return;
        }else if(myBoard.getCellContent()[ind] === "-"){
            myBoard.placeToken(ind, getActiveP());
            console.log(myBoard.getCellContent());
            turnFlag += 1;

            if(turnFlag != 3){
                checkWin();
                switchTurn();
                printActiveP();
            }else{
                checkWin()
            }
            
        }else{
            console.log("Taken.");
            console.log("Still " + activeP.name + "'s turn.");
            return;
        }
    }

    const checkWin = () => {

        for(let elt of myBoard.getCellContent()){

            if(elt === "-"){
                return;
            }else if(elt === "X"){
                pOneCount += 1;
            }else if(elt === "O"){
                pTwoCount += 1;
            }
        }

        printWinner();
    } 

    const printWinner = () => {
        if(pOneCount === 3){
            console.log(Players[0].name + " WINS!");
            resetGame();
        }else if(pTwoCount === 3){
            console.log(Players[1].name + " WINS!");
            resetGame();
        }else if(pOneCount != 3 && pTwoCount != 3 && turnFlag === 3){
            console.log("IT'S A DRAW!");
            resetGame();
        }
    }

    const resetGame = () => {
        pOneCount = 0;
        pTwoCount = 0;
        turnFlag = 0;
        activeP = Players[0];
        myBoard = GameBoard();
    }
    
    printActiveP();
    return {getActiveP, playRound }; 
}

function GameBoard(){
    const board = [];
    const cells = 3;

    const getCellCount = () => {
        return cells;
    }

    const createBoard = () => {
            for(let i = 0; i < cells; i++){
                board.push(Cell());
            }
    }

    const getCellContent = () => {
        let arr = [];
        for(let elt of board){
            arr.push(elt.getValue());}
        return arr;
    }

    function placeToken(index, player){ 
        board[index].addToken(player);

        getCellContent();
    }

    createBoard();  //BUILD IN BODY

    return { getCellCount, getCellContent, placeToken };
}

function Cell() {
    let value = "-";

    const addToken = (player) => value = player;
    const getValue = () => value;

    return {addToken, getValue};
}


const game = Game();

/* const c = Cell();             CELL CHECK 
console.log(c.getValue());      
c.addToken("X");
console.log(c.getValue());

const b = Cell();
console.log(b.getValue());
b.addToken("O");
console.log(b.getValue()); */

                              
game.playRound(1);   //BOARD CHECK
game.playRound(2);
game.playRound(0);
 


