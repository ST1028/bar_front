import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PeopleIcon from '@mui/icons-material/People';
import PaidIcon from '@mui/icons-material/Paid';

export default function LabelBottomNavigation() {
  const router = useRouter();
  const [value, setValue] = React.useState(router.pathname.slice(1) || "/");

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          value={value}
          onChange={async (event, newValue) => {
            setValue(newValue);
            await new Promise(resolve => setTimeout(resolve, 300));
            router.push(newValue);
          }}
        >
          <BottomNavigationAction label="Menu" icon={<RestaurantMenuIcon />} value="menus"/>
          <BottomNavigationAction label="Friend" icon={<PeopleIcon />} value="friends"/>
          <BottomNavigationAction label="Order" icon={<PaidIcon />} value="orders"/>
        </BottomNavigation>
      </Paper>
  );
}