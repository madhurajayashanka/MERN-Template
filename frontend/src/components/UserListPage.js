import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import config from '../config';
import Axios from 'axios';

const API_URL = config.API_URL;

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await Axios.get(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date Of Birth</th>
            <th>Gender</th>
            <th>Contact Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.basic_info.first_name}</td>
              <td>{user.basic_info.last_name}</td>
              <td>{user.basic_info.dob}</td>
              <td>{user.basic_info.gender}</td>
              <td>{user.contact_info.mobile_number}</td>
              <td>{user.contact_info.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
