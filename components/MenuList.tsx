import * as React from 'react';
import List from '@mui/material/List';
import MenuDialog from './MenuDialog';
import { Snackbar, Alert } from '@mui/material';
import { Menu } from '@/src/types/Models/Menu';
import MenuListItem from './MenuListItem';
import { Friend } from '@/src/types/Models/Friend';
import { useRouter } from 'next/router'
import Divider from '@mui/material/Divider';

interface MenuCardProps {
  menus: Menu[];
  friends: Friend[];
  setSnackBarOpen: (open: boolean) => void;
  loading: boolean;
}

export default function MenuList({ menus, friends, setSnackBarOpen, loading }: MenuCardProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState<Menu | null>(null);
  const router = useRouter()

  const handleClickOpen = (menu: Menu) => {
    if (friends.length === 0) {
      router.push('/friends')
      return;
    }
    setSelectedMenu(menu);
    setOpen(true);
  };
  const handleClose = (isSnackBar: boolean = false) => {
    if (isSnackBar) {
      setSnackBarOpen(true);
    }
    setOpen(false);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <MenuDialog open={open} handleClose={handleClose} selectedMenu={selectedMenu} friends={friends}/>
      {menus.map((menu, index) => (
        <div key={index}>
          <MenuListItem menu={menu} handleClickOpen={handleClickOpen} key={menu.id} loading={loading}/>
          {index !== menus.length - 1 && <Divider />}
        </div>
      ))
      }
    </List>
  );
}