import * as React from 'react';
import MainLayout from '../components/layouts/MainLayout';
import OrderList from '../components/OrderList';
import { useEffect, useState } from 'react'

interface User {
    id: number;
    name: string;
    email: string;
}
export default function FixedBottomNavigation() {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        async function fetchUsers() {
          const response = await fetch('/api/users');
          const data: User[] = await response.json();
          console.log(data);
          setUsers(data);
        }
      
        fetchUsers();
      }, []);
  return (
      <MainLayout>
        <OrderList/>
      </MainLayout>
  );
}
