import { useState } from 'react';
import './App.css';

function App() {
  const [scores, setScores] = useState([0, 0]);
  const [message, setMessage] = useState("It's your turn: X");
  const [turn, setTurn] = useState(true);
  const [count, setCount] = useState(0);
  const [ticTacToe, setTicTacToe] = useState([
    { content: '', class: '-top -left' },
    { content: '', class: '-top' },
    { content: '', class: '-top -right' },
    { content: '', class: '-top -left' },
    { content: '', class: '' },
    { content: '', class: '-right' },
    { content: '', class: '-left -bottom' },
    { content: '', class: '-bottom' },
    { content: '', class: '-bottom -right' },
  ]);

  function handleReset() {
    setMessage("It's your turn: X");
    setTurn(true);
    setScores([0, 0]);
    resetBoard();
  }

  function resetBoard() {
    const ticTacToeClone = [...ticTacToe];
    ticTacToe.forEach((cell) => (cell.content = ''));
    setTicTacToe(ticTacToeClone);
    setCount(0);
  }

  function clickCell(index: number) {
    if (turn == false) return;

    const cell = ticTacToe[index];
    if (cell.content !== '') return;

    const ticTacToeClone = [...ticTacToe];
    ticTacToeClone[index].content = 'X';
    setTicTacToe(ticTacToeClone);
    setTurn(false);
    setMessage('Waiting for opponent: O');
    setCount(count + 1);
    if (checkForWin('X')) {
      resetBoard();
      const scoreClone = [...scores];
      scoreClone[0] += 1;
      setScores(scoreClone);
    }

    setTimeout(enemyTurn, 2000);
  }

  async function enemyTurn() {
    const emptyCells = ticTacToe.reduce((indexes, cell, i) => {
      if (cell.content === '') {
        indexes.push(i);
      }
      return indexes;
    }, [] as number[]);

    const randomIndex =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    if (typeof randomIndex === 'undefined') {
      setMessage('Game is a draw');
      resetBoard();
      return;
    }

    const ticTacToeClone = [...ticTacToe];
    ticTacToeClone[randomIndex].content = 'O';

    setCount(count + 1);
    setMessage("It's your turn: X");
    setTurn(true);
    setTicTacToe(ticTacToeClone);

    if (checkForWin('O')) {
      resetBoard();
      const scoreClone = [...scores];
      scoreClone[1] += 1;
      setScores(scoreClone);
    }
  }

  function checkForWin(t: string): boolean {
    if (checkForRowsWin(t) || checkForColumnsWin(t) || checkForDiagonalWin(t))
      return true;
    return false;
  }

  function checkForRowsWin(t: string) {
    // Row 1
    if (
      ticTacToe[0].content === t &&
      ticTacToe[1].content === t &&
      ticTacToe[2].content === t
    )
      return true;

    // Row 2
    if (
      ticTacToe[3].content === t &&
      ticTacToe[4].content === t &&
      ticTacToe[5].content === t
    )
      return true;

    // Row 3
    if (
      ticTacToe[6].content === t &&
      ticTacToe[7].content === t &&
      ticTacToe[8].content === t
    )
      return true;

    return false;
  }

  function checkForColumnsWin(t: string) {
    // Column 1
    if (
      ticTacToe[0].content === t &&
      ticTacToe[3].content === t &&
      ticTacToe[6].content === t
    )
      return true;

    // Column 2
    if (
      ticTacToe[1].content === t &&
      ticTacToe[4].content === t &&
      ticTacToe[7].content === t
    )
      return true;

    // Column 3
    if (
      ticTacToe[2].content === t &&
      ticTacToe[5].content === t &&
      ticTacToe[8].content === t
    )
      return true;

    return false;
  }

  function checkForDiagonalWin(t: string) {
    // Diagonal 1
    if (
      ticTacToe[0].content === t &&
      ticTacToe[4].content === t &&
      ticTacToe[8].content === t
    )
      return true;

    // Diagonal 2
    if (
      ticTacToe[2].content === t &&
      ticTacToe[4].content === t &&
      ticTacToe[6].content === t
    )
      return true;
    return false;
  }

  return (
    <div className='w-fit mt-4 p-4 mx-auto'>
      <div className='bg-blue-200 p-2 rounded-sm text-center'>{message}</div>
      <div className='mt-4 ticTacToe'>
        {ticTacToe.map((cell, index) => (
          <div
            onClick={() => clickCell(index)}
            className={`cell ${cell.class}`}
          >
            {cell.content}
          </div>
        ))}
      </div>
      <div className='border-2 rounded-md shadow mt-4 p-4'>
        <h2 className='text-center text-3xl font-semibold'>SCORE</h2>
        <div className='flex gap-3 mt-4'>
          <div className='bg-blue-200 p-2 rounded-sm text-center grow font-bold'>
            X: {scores[0]}
          </div>
          <div className='bg-red-200 p-2 rounded-sm text-center grow font-bold'>
            O: {scores[1]}
          </div>
        </div>
        <button
          onClick={handleReset}
          className='bg-yellow-200 p-2 rounded-sm text-center grow font-bold w-full mt-3'
        >
          RESET
        </button>
      </div>
    </div>
  );
}

export default App;
