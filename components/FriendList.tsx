import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react'
import { FriendsResponse } from '@/src/types/Responses/FriendsResponse';
import Avatar from '@mui/material/Avatar';
import FriendDialog from '@/components/FriendDialog';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import { SxProps } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';

export default function NestedList() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [friends, setFriends] = useState<FriendsResponse>({data: []});
  useEffect(() => {
      fetchFriends();
    }, []);

  async function fetchFriends() {
    const response = await fetch('/api/friends/');
    const res: FriendsResponse = await response.json();
    setFriends(res);
  }

  const fabStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
  };

  const fab = {
    color: 'primary' as 'primary',
    sx: fabStyle as SxProps,
    icon: <AddIcon />,
    label: 'Add',
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Friends
        </ListSubheader>
      }
    >
        <Zoom
          key={fab.color}
          in={true}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${true ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab sx={fab.sx} aria-label={fab.label} color={fab.color} onClick={() => {setOpen(true)}}>
            {fab.icon}
          </Fab>
        </Zoom>
        <FriendDialog open={open} setOpen={setOpen} fetchFriends={fetchFriends}/>
        {friends.data.map((friend, index) => (
            <ListItemButton key={index}>
                <ListItemIcon>
                    <Avatar alt="Bar" src={"/icon/avatar_"+((index + 1) % 5)+".jpeg"}/>
                </ListItemIcon>
                <ListItemText primary={friend.name} />
            </ListItemButton>
        ))}
    </List>
  );
}