"use client" // Marking the component as use client to avoid HMR error. 

import React, { useEffect, useState } from 'react';
import { Grid, } from '@mantine/core';
import axios from 'axios';
import UserCard from './UserCard';

// UserList component to render the list of users
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (userToDelete: any) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user !== userToDelete));
  };

  return (
    <Grid gutter={20} style={{ width: '95%', margin: 'auto' }}>
      {users.map((user: any, index: number) => (
        <Grid.Col key={index} span={{ base: 12, md: 6, lg: 3 }} style={{ height: '100%', width: '100%' }}>
          <UserCard user={user} onDelete={handleDelete} />
        </Grid.Col>
      ))}
    </Grid>
  );
}

// Exporting UserList component as default
export default UserList;
