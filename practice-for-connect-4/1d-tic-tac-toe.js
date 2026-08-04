function Game() {
    let myBoard = GameBoard();

    const Players = [{ name: "P1", token: "X"},
                    { name: "P2",token: "O"}] 

    let activeP = Players[0]; 
    
    const switchTurn = () => {
        activeP = activeP === Players[0]? Players[1] : Players[0];
        console.log(activeP.name + "'s turn.");
    }

    const getActiveP = () => {
        console.log(activeP.name + "'s turn.");
        return (activeP.token);
    }

    const playRound = (ind) => {
        if(ind < 0 || ind > getCellCount() - 1){
            return;
        }else if(myBoard.getCellContent()[ind] === "-"){
            myBoard.placeToken(ind, getActiveP());
            console.log(myBoard.getCellContent());
            checkWin();
            switchTurn();
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
            }
        }
    } 

    
    getActiveP();
    return {getActiveP, playRound};
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


/* const newBoard = GameBoard();         BOARD CHECK             
console.log(newBoard.getCellContent()); 
newBoard.placeToken(1, game.getActiveP());
console.log(newBoard.getCellContent());  */

