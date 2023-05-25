import './SingleCard.css';

export default function SingleCard({
	card,
	handleChoice,
	flipped,
	disabled,
	index,
	gameComplete,
}) {
	const handleClick = () => {
		if (!disabled) {
			handleChoice(card);
		}
	};

	return (
		<div
			className={
				gameComplete ? 'card completed' : flipped ? 'card flipped' : 'card'
			}
		>
			<img
				className='front'
				src={`https://lvdwesthuizen.github.io/happy-hunny/${card.src}`}
				alt='card front'
			/>
			<img
				className='back'
				src={`https://lvdwesthuizen.github.io/happy-hunny/images/cover.svg`}
				onClick={handleClick}
				alt='card back'
			/>
			<img
				className='alphabet'
				src={`https://lvdwesthuizen.github.io/happy-hunny/images/cards-complete/card-${
					index + 1
				}-complete.svg`}
				alt='card complete'
			/>
		</div>
	);
}
