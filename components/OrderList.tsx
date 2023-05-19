import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { FriendsResponse } from '@/src/types/Responses/FriendsResponse';
import Avatar from '@mui/material/Avatar';

export default function NestedList() {
  const [open, setOpen] = React.useState<Record<number, boolean>>({});

  const handleClick = (id: number) => {
    setOpen(prevOpen => ({
      ...prevOpen,
      [id]: !prevOpen[id],
    }));
  };
  const [friends, setFriends] = React.useState<FriendsResponse>({data: []});
  React.useEffect(() => {
      async function fetchOrders() {
        const response = await fetch('/api/friends/');
        const res: FriendsResponse = await response.json();
        setFriends(res);
      }
      fetchOrders();
    }, []);


  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Orders
        </ListSubheader>
      }
    >
      {friends.data.map((friend, key) => (
        <div key={friend.id}>
          <ListItemButton onClick={() => handleClick(friend.id)}>
            <ListItemIcon>
              <Avatar alt="Bar" src={"/icon/avatar_"+((key + 1) % 5)+".jpeg"}/>
            </ListItemIcon>
            <ListItemText primary={friend.name + " ¥" + friend.total_price} />
                {open[friend.id] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open[friend.id] ?? false} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
              {friend.orders.map((order) => (
                <ListItemButton sx={{ pl: 4 }} key={order.id}>
                  <ListItemText primary={order.menu.name + " ¥" + order.menu.price} />
                </ListItemButton>
              ))}
              </List>
            </Collapse>
        </div>
      ))}
    </List>
  );
}