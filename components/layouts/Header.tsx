import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { serialize } from 'cookie';
import { useRouter } from 'next/router';

export default function DrawerAppBar() {
  const router = useRouter();
  const onLogout = () => {
    document.cookie = serialize('token', '', {
      maxAge: 0
    });
    router.push('/signin');
  };

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Avatar alt="Bar" src="./bar-icon.png" sx={{ mr: 2 }}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bar
          </Typography>
          <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              color="inherit"
              onClick={onLogout}
            >
              <LogoutIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};