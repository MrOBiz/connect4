function Game() {
    const board = [];
    const cells = 3;

    const createBoard = () => {
            for(let i = 0; i < cells; i++){
                board.push(Cell());
            }
    }

    /* const Players = [{ name: P1, token: "X"},
                    { name: P2,token: "O"}] 

    let activeP = Players[0]; */
    
    const switchTurn = () => {
        activeP = activeP === Players[0]? Players[1] : Players[0];
    }

    const getTurn = () => {
        console.log(activeP + "'s turn.");
    }

    const getCellContent = () => {
        for(let elt of board){
            console.log(elt.getValue());}
    }

    return {createBoard, getTurn, switchTurn, getCellContent};
}

function Cell() {
    let value = "-";

    const setValue = (player) => {value = player};
    const getValue = () => value;

    return { setValue, getValue};
}

const c = Cell();
c.setValue("X");
console.log(c.getValue());

const b = Cell();
b.setValue("O");
console.log(b.getValue());

const game = Game();
game.createBoard();
game.getCellContent();