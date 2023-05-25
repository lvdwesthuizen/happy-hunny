import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import SingleCard from './components/SingleCard';
import Legend from './components/Legend';
import Dialog from './components/GameOverDialog';
import './App.css';

const cardImages = [
	{ src: '/images/cards-front/card-1-turned.svg', matched: false },
	{ src: '/images/cards-front/card-2-turned.svg', matched: false },
	{ src: '/images/cards-front/card-3-turned.svg', matched: false },
	{ src: '/images/cards-front/card-4-turned.svg', matched: false },
	{ src: '/images/cards-front/card-5-turned.svg', matched: false },
];

const styles = {
	button: {
		background: '#FFF',
		color: '#000',
		textTransform: 'capitalize',
		borderRadius: '8px',
		mt: '20px',
		ml: '5px',
		'&:hover': {
			backgroundColor: '#fff',
			color: '#000',
		},
	},
};

function App() {
	const [cards, setCards] = useState([]);
	const [moves, setMoves] = useState(0);
	const [totalMatched, setTotalMatched] = useState(0);
	const [totalRounds, setTotalRounds] = useState(
		localStorage.getItem('totalRounds') || 0
	);
	const [accuracy, setAccuracy] = useState(
		localStorage.getItem('accuracy') || 0
	); // accuracy = score
	const [gameOver, setGameOver] = useState(false);
	const [gameComplete, setGameComplete] = useState(false);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);

	const totalMoves = 10;

	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map(card => ({ ...card, id: Math.random() }));
		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(shuffledCards);
		setMoves(0);
		setGameComplete(false);
	};

	const handleChoice = card => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			if (choiceOne.src === choiceTwo.src) {
				setCards(prevCards => {
					return prevCards.map(card => {
						if (card.src === choiceOne.src) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});
				setTotalMatched(totalMatched => totalMatched + 1);
				resetTurn();
			} else {
				setTimeout(() => resetTurn(), 1000);
			}
		}
	}, [choiceOne, choiceTwo]);

	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setMoves(prevmoves => prevmoves + 1);
		setDisabled(false);
	};

	const resetScore = () => {
		shuffleCards();
		localStorage.removeItem('totalRounds');
		localStorage.removeItem('accuracy');
		setTotalRounds(0);
		setAccuracy(0);
	};

	useEffect(() => {
		shuffleCards();
	}, []);

	useEffect(() => {
		// if all cards have been matched correctly
		if (totalMatched === 5) {
			setTotalMatched(0);
			setTotalRounds(totalRounds => totalRounds + 1);
			setAccuracy(accuracy => accuracy + 1);
			setGameComplete(true);
		}
		// eslint-disable-next-line
	}, [totalMatched]);

	useEffect(() => {
		localStorage.setItem('accuracy', accuracy);
	}, [accuracy]);

	useEffect(() => {
		// if total number of moves allowed exceeded
		if (moves > totalMoves) {
			setGameOver(true);
			setTotalRounds(totalRounds => totalRounds + 1);
		}
	}, [moves]);

	useEffect(() => {
		localStorage.setItem('totalRounds', totalRounds);
	}, [totalRounds]);

	const handleClose = () => {
		setTotalMatched(0);
		setGameOver(false);
		shuffleCards();
	};

	return (
		<div className='App'>
			<Box sx={{ display: 'flex' }}>
				<Button
					variant='contained'
					size='small'
					onClick={shuffleCards}
					sx={styles.button}
				>
					<ReplayIcon fontSize='small' sx={{ mr: '3px' }} />
					Replay
				</Button>
				<Button
					variant='contained'
					size='small'
					onClick={resetScore}
					sx={styles.button}
				>
					Reset Score
				</Button>
			</Box>

			<div className='container'>
				{cards.map((card, i) => (
					<SingleCard
						key={card.id}
						card={card}
						handleChoice={handleChoice}
						flipped={card === choiceOne || card === choiceTwo || card.matched}
						disabled={disabled}
						index={i}
						gameComplete={gameComplete}
					/>
				))}
			</div>
			<Legend
				moves={moves}
				totalMoves={totalMoves}
				totalRounds={totalRounds}
				accuracy={accuracy}
			/>
			<Dialog open={gameOver} handleClose={handleClose} gameOver={gameOver} />
		</div>
	);
}

export default App;
