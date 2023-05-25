import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function GameOverDialog({ open, handleClose }) {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>Game over</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					Maximum number of moves reached!
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					variant='text'
					size='small'
					onClick={handleClose}
					sx={{ textTransform: 'capitalize' }}
				>
					Play again
				</Button>
			</DialogActions>
		</Dialog>
	);
}
