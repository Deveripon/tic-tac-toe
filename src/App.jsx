import { useState } from "react";
function Square({ value, onSquareClick }) {
    return (
        <button
            onClick={onSquareClick}
            className={
                `${
                    value === "X"
                        ? "text-red-500 bg-pink-300"
                        : value === "O"
                        ? "text-blue-500 bg-blue-200"
                        : "bg-gray-600"
                }` +
                " " +
                "h-[65px] w-[65px] hover:bg-gray-400 outline outline-1 outline-gray-300 m-[2px] transform duration-200 font-bold py-4 px-6 rounded text-gray-900 text-[20px]"
            }>
            {value}
        </button>
    );
}

const GameBoard = ({ squares, xIsNext, onPlay }) => {
    //declare winner or who is the next player to move
    let status;
    const winner = calculateWinner(squares);

    if (winner) {
        status = `Winner is :  ${winner}`;
    } else {
        status = `Next Player is: ${xIsNext ? "X" : "O"}`;
    }

    //manage click on square and checked that square is empty or not and if empty then update the value and also check that what will be the next move to be 'X' or 'O'
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return false;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }

    return (
        <div className='gameBoard flex flex-col w-full justify-center items-center min-h-screen'>
            <h2 className='text-green-500 text-2xl my-5'>{status}</h2>
            <div className='button-group flex flex-row'>
                <Square
                    onSquareClick={() => handleClick(0)}
                    value={squares[0]}
                />
                <Square
                    onSquareClick={() => handleClick(1)}
                    value={squares[1]}
                />
                <Square
                    onSquareClick={() => handleClick(2)}
                    value={squares[2]}
                />
            </div>
            <div className='button-group flex flex-row'>
                <Square
                    onSquareClick={() => handleClick(3)}
                    value={squares[3]}
                />
                <Square
                    onSquareClick={() => handleClick(4)}
                    value={squares[4]}
                />
                <Square
                    onSquareClick={() => handleClick(5)}
                    value={squares[5]}
                />
            </div>
            <div className='button-group flex flex-row'>
                <Square
                    onSquareClick={() => handleClick(6)}
                    value={squares[6]}
                />
                <Square
                    onSquareClick={() => handleClick(7)}
                    value={squares[7]}
                />
                <Square
                    onSquareClick={() => handleClick(8)}
                    value={squares[8]}
                />
            </div>
        </div>
    );
};

export default function Game() {
    // state for manage squares value. initially all squares are null
    const [history, setHistory] = useState([Array(9).fill(null)]);
    // to check that,is Next value have to be 'X' or 'O'
    const [xIsNext, setXIsNext] = useState(true);

    const [currentMoves, setCurrentMoves] = useState(0);

    const currentSquares = history[currentMoves];

    //function to add new history
    function handlePlay(nextSquares) {
        setXIsNext(!xIsNext);
        //add new history
        const nextHistory = [
            ...history.slice(0, currentMoves + 1),
            nextSquares,
        ];
        setHistory(nextHistory);
        setCurrentMoves(nextHistory.length - 1);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = `Go to the move number: ${move} `;
        } else {
            description = "Start Game";
        }

        return (
            <li
                className='list-none p-2'
                key={move}>
                <button
                    onClick={() => jumpTo(move)}
                    className='bg-gray-600 p-2 rounded shadow-lg hover:bg-gray-500'>
                    👉 {description}
                </button>
            </li>
        );
    });
    function jumpTo(move) {
        setCurrentMoves(move);
        setXIsNext(move % 2 === 0);
    }
    return (
        <div className=' flex flex-row w-full h-screen justify-center items-center gap-6'>
            <div className='game-board'>
                <GameBoard
                    squares={currentSquares}
                    xIsNext={xIsNext}
                    onPlay={handlePlay}
                />
            </div>
            <div className='history text-white bg-gray-700 p-5 rounded'>
                {moves}
            </div>
        </div>
    );
}

//function to calculate winner
function calculateWinner(squares) {
    //these are line which will be win. if any "X" or "O" fill any of this line. He will be winner
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        //line numbers are stored in variable
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }

    return null;
}

