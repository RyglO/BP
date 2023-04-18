import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import axios from 'axios';

const UserGrid = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleEdit(params.row)}>
          Edit
        </Button>
      ),
    },
  ];

  useEffect(() => {
    axios.get('/api/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleAdd = () => {
    setSelectedUser(null);
    setName('');
    setEmail('');
    setDialogOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
    setDialogOpen(true);
  };

  const handleSave = () => {
    const updatedUser = {
      id: selectedUser ? selectedUser.id : users.length + 1,
      name,
      email,
    };
    if (selectedUser) {
      const updatedUsers = users.map((user) => (user.id === selectedUser.id ? updatedUser : user));
      setUsers(updatedUsers);
    } else {
      setUsers([...users, updatedUser]);
    }
    setDialogOpen(false);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Add User
      </Button>
      <DataGrid rows={users} columns={columns} pageSize={5} />
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{selectedUser ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserGrid;