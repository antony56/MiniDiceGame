import { useState, useActionState } from 'react';
import { Container, Table, Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function App() {
  const [statediceGame, rollDiceGame] = useActionState(
    (prevState) => Math.floor(Math.random() * 6) + 1,
    1
  );
  const myarray = [
    'src/assets/1.jpg',
    'src/assets/2.jpg',
    'src/assets/3.jpg',
    'src/assets/4.jpg',
    'src/assets/5.jpg',
    'src/assets/6.jpg',
  ];
  const [position1, setPosition1] = useState(1);
  const [position2, setPosition2] = useState(1);
  const [winner, setWinner] = useState<string | null>(null);

  const movePlayer1 = () => {
    setPosition1((prev) => {
      const nextPosition = prev + statediceGame;
      if (nextPosition >= 30) {
        setWinner('Player 1');
        return 30;
      }
      return nextPosition;
    });
  };

  const movePlayer2 = () => {
    setPosition2((prev) => {
      const nextPosition = prev + statediceGame;
      if (nextPosition >= 30) {
        setWinner('Player 2');
        return 30;
      }
      return nextPosition;
    });
  };

  return (
    <>
      <Container className="text-center mt-5">
        <div className="p-6 space-y-4">
          <h1 className="text-xl font-bold">Roll the dice</h1>
          {winner && <h2 style={{ color: 'green' }}>Νικητής: {winner}!</h2>}
          <div className="flex gap-2">
            <Table striped>
              <tbody>
                <tr>
                  {Array.from({ length: 30 }, (_, i) => {
                    const positionNum = i + 1;
                    return (
                      <td key={positionNum}>
                        {positionNum === position1 && positionNum === position2
                          ? '🏃🏼‍♂️‍➡️🏃🏻‍♂️‍➡️'
                          : positionNum === position1
                          ? '🏃🏼‍♂️‍➡️'
                          : positionNum === position2
                          ? '🏃🏻‍♂️‍➡️'
                          : positionNum}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </Table>
          </div>
          <Container className="text-center mt-5">
            <h2>Dice</h2>
            <Image
              onClick={rollDiceGame}
              src={myarray[statediceGame - 1]}
              className="myimg"
            />
            <h3>Τιμή ζαριού: {statediceGame}</h3>
            <h3>Θέση Player 1: {position1}</h3>
            <h3>Θέση Player 2: {position2}</h3>
            <Button variant="info" onClick={rollDiceGame}>
              Roll Dice
            </Button>
          </Container>
          <Button variant="success" onClick={movePlayer1} disabled={!!winner}>
            Move Player 1
          </Button>
          <Button
            variant="primary"
            onClick={movePlayer2}
            disabled={!!winner}
            style={{ marginLeft: '10px' }}
          >
            Move Player 2
          </Button>
        </div>
      </Container>
    </>
  );
}
export default App;
