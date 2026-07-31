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
                token: "1"
            },
            {
                name: P2,
                token: "2"
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
    let value = "0";

    const setValue = (player) => {value = player;};
    const readValue = () => {value;};

    return { setValue, readValue};
}
