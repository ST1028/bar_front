import * as React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import List from '@mui/material/List';
import { GetServerSideProps } from 'next';
import { parseCookies, hasToken } from '@/src/methods/cookie';
import FriendList from '@/components/FriendList';

export default function FixedBottomNavigation() {
  return (
      <MainLayout>
        <FriendList/>
      </MainLayout>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context.req.headers.cookie);
  // リダイレクトが必要な条件をチェックします
  if (! hasToken(cookies)) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
    },
  };
};

