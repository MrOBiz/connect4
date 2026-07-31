function Game() {
    const board = [];

    const createBoard = (cells) => {
            for(let i = 0; i < cells; i++){
                board.push(cell);
            }
        return board;
    }

    const getTurn = () => {
        const Players = [
            {
                name: P1,
                token: "X"
            },
            {
                name: P2,
                token: "O"
            }
        ]

        let activeP = Players[0];
        
        const switchTurn = () => {
            activeP = activeP === Players[0]? Players[1] : Players[0];
        }
    }

    return {createBoard, getTurn};
}

function Cell() {
    let value = "-";

    const setValue = (player) => {value = player};
    const getValue = () => value;

    return { setValue, getValue};
}

const c = new Cell;
c.setValue("X");
console.log(c.getValue());

const b = new Cell;
b.setValue("O");
console.log(b.getValue());



