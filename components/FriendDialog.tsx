import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FriendCreateRequest } from '@/src/types/Requests/FriendCreateRequest';
import { FriendResponse } from '@/src/types/Responses/FriendResponse';

interface FriendDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchFriends: () => void;
}

export default function FormDialog({open, setOpen, fetchFriends}: FriendDialogProps) {
  const [name, setName] = React.useState("");
  const handleClose = () => {
    setName("");
    setOpen(false);
  };
  const handleSubmit = async () => {
    const body: FriendCreateRequest = {name: name}
    const response = await fetch('/api/friends/', {
        method: 'POST',
        body: JSON.stringify(body)
    });
    const res: FriendResponse = await response.json();
    fetchFriends();
    setName("");
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add Friend</DialogTitle>
        <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Friend's Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={e => {
              setName(e.target.value)
          }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>
  );
}