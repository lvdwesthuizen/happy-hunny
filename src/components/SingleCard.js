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
	const filepath = window.location.origin + window.location.pathname;

	return (
		<div
			className={
				gameComplete ? 'card completed' : flipped ? 'card flipped' : 'card'
			}
		>
			<img className='front' src={`${filepath}${card.src}`} alt='card front' />
			<img
				className='back'
				src={`${filepath}/images/cover.svg`}
				onClick={handleClick}
				alt='card back'
			/>
			<img
				className='alphabet'
				src={`${filepath}/images/cards-complete/card-${index + 1}-complete.svg`}
				alt='card complete'
			/>
		</div>
	);
}
