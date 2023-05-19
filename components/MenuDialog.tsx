import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import OrderStepper from './OrderStepper';
import { Menu } from '@/src/types/Models/Menu';
import { Friend } from '@/src/types/Models/Friend';

interface FullScreenDialogProps {
  open: boolean;
  handleClose: (isSnackBar?: boolean) => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface MenuCardProps {
  open: boolean;
  handleClose: (isSnackBar?: boolean) => void;
  selectedMenu: Menu| null;
  friends: Friend[];
}

export default function FullScreenDialog({ open, handleClose, selectedMenu, friends }: MenuCardProps) {
  const onClose = () => {
    handleClose(false);
  };

  const onSnackBarViewClose = () => {
    handleClose(true);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon/>
            </IconButton>
            <Typography sx={{ ml: 1, flex: 1 }} variant="h6" component="div">
              {selectedMenu?.name}
              <small style={{marginLeft: '10px'}}>¥{selectedMenu?.price}</small>
            </Typography>
          </Toolbar>
        </AppBar>
        <Typography component="div" sx={{ p: 2 }}>
          {selectedMenu ? (
            <OrderStepper selectedMenu={selectedMenu} handleClose={onSnackBarViewClose} friends={friends}/>
          ) : (
            <div>メニューが選択されていません</div>
          )}
        </Typography>
      </Dialog>
    </div>
  );
};
