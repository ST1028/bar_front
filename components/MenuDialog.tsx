import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
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
  if (selectedMenu === null) {
    return <></>;
  }
  const onClose = () => {
    handleClose(false);
  };

  const onSnackBarViewClose = () => {
    handleClose(true);
  };

  return (
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

          <Avatar alt={selectedMenu.name} src={selectedMenu.thumbnail} />
          <Typography
            sx={{
              ml: 1,
              display: { md: 'flex' },
              textDecoration: 'none',
            }}
          >
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
  );
};
