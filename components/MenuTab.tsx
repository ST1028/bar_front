import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MenuCard from './MenuCard';
import Container from '@mui/material/Container';
import { useEffect, useRef, useState } from 'react'
import { MenuCategoriesResponse } from '@/src/types/Responses/MenuCategoriesResponse'
import { FriendsResponse } from '@/src/types/Responses/FriendsResponse';
import { useTheme } from '@mui/material/styles';
import OrderSnackBar from './OrderSnackBar';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import type { Swiper as SwiperCore } from 'swiper';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box sx={{ p: 3, paddingLeft:0, paddingRight:0 }}>
            {children}
          </Box>
        </Container>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function BasicTabs() {
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();
  // メニューカテゴリー取得
  const [menuCategories, setMenuCategories] = useState<MenuCategoriesResponse>({data: []});
  useEffect(() => {
      async function fetchMenuCategories() {
        const response = await fetch('/api/menu_categories/');
        const res: MenuCategoriesResponse = await response.json();
        setMenuCategories(res);
        setLoading(false);
      }
      fetchMenuCategories();
    }, []);

  // フレンド取得
  const [friends, setFriends] = useState<FriendsResponse>({data: []});
  useEffect(() => {
      async function fetchFriends() {
        const response = await fetch('/api/friends/');
        const res: FriendsResponse = await response.json();
        setFriends(res);
      }
      fetchFriends();
    }, []);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    swiper?.slideTo(newValue);
  };
  const handleChangeIndex = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    swiper?.slideTo(newValue);
  };

  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };
  const playerRef = useRef<Player>(null);
  const [modalOpen, setModalOpen] = React.useState(true);

  const [swiper, setSwiper] = React.useState<SwiperCore | null>(null);
  const onSwiper = (currentSwiper: SwiperCore) => {
    const swiperInstance = currentSwiper;
    setSwiper(swiperInstance);
  };
  const onSlideChange = (currentSwiper: SwiperCore) => {
    setValue(currentSwiper.activeIndex);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <OrderSnackBar snackBarOpen={snackBarOpen} handleSnackBarClose={handleSnackBarClose}/>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
         >
          {menuCategories.data.map((menuCategory, index) => (
            <Tab label={menuCategory.name} {...a11yProps(index)} key={menuCategory.id}/>
          ))}
        </Tabs>
      </Box>
      <Swiper
        simulateTouch={false}
        onSwiper={onSwiper}
        onSlideChange={onSlideChange}
      >
        {menuCategories.data.map((menuCategory, index) => (
          <SwiperSlide key={index}>
            <TabPanel value={value} index={index} key={menuCategory.id}>
              <MenuCard 
                menus={menuCategory.menus} 
                friends={friends.data} 
                menuCategory={menuCategory} 
                setSnackBarOpen={setSnackBarOpen}
                loading={loading}
              />
            </TabPanel>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}