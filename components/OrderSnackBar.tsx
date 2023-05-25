import { Snackbar, Alert } from '@mui/material';

interface OrderSnackBarProps {
    snackBarOpen: boolean;
    handleSnackBarClose: () => void;
};

export default function OrderSnackBar({snackBarOpen, handleSnackBarClose}: OrderSnackBarProps) {
    return (
        <Snackbar 
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
            }}
            open={snackBarOpen} 
            autoHideDuration={1500} 
            onClose={handleSnackBarClose}
        >
        <Alert onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
            Order Success!
        </Alert>
      </Snackbar>
    );
}