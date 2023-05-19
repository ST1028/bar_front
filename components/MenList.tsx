import * as React from 'react';
import List from '@mui/material/List';
import MenuDialog from './MenuDialog';
import { Snackbar, Alert } from '@mui/material';
import { Menu } from '@/src/types/Models/Menu';
import MenuListItem from './MenuListItem';
import { Friend } from '@/src/types/Models/Friend';

interface MenuCardProps {
  menus: Menu[];
  friends: Friend[];
}

export default function AlignItemsList({ menus, friends }: MenuCardProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState<Menu | null>(null);

  const handleClickOpen = (menu: Menu) => {
    setOpen(true);
    setSelectedMenu(menu);
  };
  const handleClose = (isSnackBar: boolean = false) => {
    if (isSnackBar) {
      console.log(isSnackBar);
      setSnackBarOpen(true);
    }
    setOpen(false);
  };

  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <MenuDialog open={open} handleClose={handleClose} selectedMenu={selectedMenu} friends={friends}/>
      <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackBarClose}>
        <Alert onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
            Order Success!
        </Alert>
      </Snackbar>

      {menus.map((menu) => (
        <MenuListItem menu={menu} handleClickOpen={handleClickOpen} key={menu.id}/>
      ))
      }
    </List>
  );
}