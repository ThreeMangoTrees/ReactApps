import { VStack, HStack, Box } from '@chakra-ui/react'
import { useState } from 'react'

function Square({ value, onSquareClick }) {
    return <button onClick={onSquareClick} className="square">{value}</button>
}

const Board = ({ xo, squares, onPlay }) => {
    console.log("#squares0 - ", squares)
    const handleClick = (i) => {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice()
        if (xo) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = '0'
        }
        onPlay(nextSquares)
    }

    const winner = calculateWinner(squares)
    let status;
    if (winner) {
        status = "Winner : " + winner
    } else {
        status = "Next player: " + (xo ? "X" : "O")
    }

    return (
        <VStack>
            <Box className="status">{status}</Box>
            <HStack className='board-row'>
                <Square value={squares[0]} onSquareClick={() => { handleClick(0) }} />
                <Square value={squares[1]} onSquareClick={() => { handleClick(1) }} />
                <Square value={squares[2]} onSquareClick={() => { handleClick(2) }} />
            </HStack>
            <HStack className='board-row'>
                <Square value={squares[3]} onSquareClick={() => { handleClick(3) }} />
                <Square value={squares[4]} onSquareClick={() => { handleClick(4) }} />
                <Square value={squares[5]} onSquareClick={() => { handleClick(5) }} />
            </HStack>
            <HStack className='board-row'>
                <Square value={squares[6]} onSquareClick={() => { handleClick(6) }} />
                <Square value={squares[7]} onSquareClick={() => { handleClick(7) }} />
                <Square value={squares[8]} onSquareClick={() => { handleClick(8) }} />
            </HStack>
        </VStack>
    )
}


export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)
    const xo = currentMove % 2 === 0
    const currrentSquares = history[currentMove]
    const handlePlay = (nextSquares) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
        setXo(!xo)
    }
    const jumpTo = (nextMove) => {
        setCurrentMove(nextMove)
        setXo(nextMove % 2 === 0)
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move
        } else {
            description = 'Go to game start';
        }

        return (
            <li key={move}>
                <button onClick={() => { jumpTo(move) }}>{description}</button>
            </li>
        )

    })

    return (
        <Box className="game">
            <Box className="game-board">
                <Board xo={xo} squares={currrentSquares} onPlay={handlePlay} />
            </Box>
            <Box className="game-info">
                <ol>{moves}</ol>
            </Box>
        </Box>
    );
}



function calculateWinner(squares) {
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
    console.log("#squares - ", squares)
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}