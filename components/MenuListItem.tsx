import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import { Menu } from '@/src/types/Models/Menu';
import Skeleton from '@mui/material/Skeleton';

interface MenuCardProps {
  menu: Menu;
  handleClickOpen: (menu: Menu) => void;
  loading: boolean;
}

export default function AlignItemsList({ menu, handleClickOpen, loading }: MenuCardProps) {
    const handleClick = () => {
        handleClickOpen(menu);
    };
  return (
    <ListItem alignItems="flex-start" sx={{paddingRight: 0, paddingLeft: 0}}>
    <ListItemButton component="a" sx={{padding: 0}} onClick={handleClick}>
        <ListItemAvatar>
          {loading ? <Skeleton animation="wave" variant="circular" width={40} height={40} /> : <Avatar alt={menu.name} src={menu.thumbnail} />}
        </ListItemAvatar>
        <ListItemText
        primary={menu.name}
        secondary={
            <React.Fragment>
            <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
            >
                ¥{menu.price}
            </Typography>
            {" — "}{menu.description}
            </React.Fragment>
        }
        />
        </ListItemButton>
    </ListItem>
  );
}