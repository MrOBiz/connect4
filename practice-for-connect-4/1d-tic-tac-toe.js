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
        return (activeP.name);
    }

    const playRound = (ind) => {
        if(index < 0 || index > cells - 1){
            return;
        }

        if(myBoard[ind].getValue() === "-"){
            myBoard.placeToken(ind);
            switchTurn();
        }else{
            console.log("Taken.");
            console.log("Still " + activeP.name + "'s turn.");
            return;
        }
    }

    const checkWin = () => {
        for(let let of board){

        }
    }

    myBoard.createBoard();
    getActiveP();
    myBoard.getCellContent();
    return {getActiveP, playRound};
}

function GameBoard(){
    const board = [];
    const cells = 3;

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

    function placeToken(index){ 
        board[index].addToken(activeP.token);

        getCellContent();
    }

    //createBoard();  BUILD IN BODY

    return { createBoard, getCellContent, placeToken };
}

function Cell() {
    let value = "-";

    const addToken = (player) => value = player;
    const getValue = () => value;

    return {addToken, getValue};
}

/*const c = Cell();       CELL TESTS
c.setValue("X");
console.log(c.getValue());

const b = Cell();
b.setValue("O");
console.log(b.getValue()); */

const game = Game();

