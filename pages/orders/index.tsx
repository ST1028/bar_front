import * as React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import OrderList from '@/components/OrderList';
import { GetServerSideProps } from 'next';
import { parseCookies, hasToken } from '@/src/methods/cookie';

export default function FixedBottomNavigation() {
  return (
      <MainLayout>
        <OrderList/>
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
