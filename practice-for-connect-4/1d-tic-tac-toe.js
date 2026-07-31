function Game() {
    const board = [];
    const cells = 3;

    const createBoard = () => {
            for(let i = 0; i < cells; i++){
                board.push(Cell());
            }
    }

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

    const getCellContent = () => {
        let arr = [];
        for(let elt of board){
            arr.push(elt.getValue());}
        console.log(arr);
        return arr;
    }

    createBoard();
    getActiveP();
    return {getActiveP, switchTurn, getCellContent};
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
game.getCellContent();
game.switchTurn();
game.switchTurn();