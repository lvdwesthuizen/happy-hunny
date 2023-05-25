import { Box, Card, Typography } from '@mui/material';

const cardStyle = {
	p: '15px',
	textAlign: 'center',
	borderRadius: '8px',
};
export default function Legend({ moves, totalMoves, totalRounds, accuracy }) {
	return (
		<Card sx={cardStyle}>
			<Box>
				<Typography variant='body2'>Moves : {moves}</Typography>
			</Box>
			<Box>
				<Typography variant='body2'>
					Total Allowed Moves: {totalMoves}
				</Typography>
			</Box>
			<Box>
				<Typography variant='body2'>
					Moves Remaining: {totalMoves - moves}
				</Typography>
			</Box>
			<Box>
				<Typography variant='body2'>
					Total Rounds Played : {totalRounds}
				</Typography>
			</Box>
			<Box>
				<Typography variant='body2'>Accuracy: {accuracy}</Typography>
			</Box>
		</Card>
	);
}
