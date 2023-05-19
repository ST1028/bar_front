import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Friend } from '@/src/types/Models/Friend';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface SelectOrderProps {
  friends: Friend[];
  selectedFriendIds: number[];
  setSelectedFriendIds: (selectedFriendIds: number[]) => void;
}

export default function SelectOrder({ friends, selectedFriendIds, setSelectedFriendIds }: SelectOrderProps) {
  const handleChange = (event: SelectChangeEvent<typeof selectedFriendIds>) => {
    const {
      target: { value },
    } = event;
    setSelectedFriendIds(value as number[]);
    console.log("Selected values: ", typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Customer</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedFriendIds}
          onChange={handleChange}
          input={<OutlinedInput label="Customer" />}
          renderValue={(selected) => {
            // 選択されたIDを名前に変換
            const selectedNames = (selected as number[]).map((id) => {
              // フレンドのリストから該当のIDを探し、その名前を取得
              const friend = friends.find((friend) => friend.id === id);
              return friend ? friend.name : '';
            });
        
            // 名前の配列を連結して表示
            return selectedNames.join(', ');
          }}
          MenuProps={MenuProps}
        >
          {friends.map((friend, index) => (
            <MenuItem key={index} value={friend.id}>
              <Checkbox checked={selectedFriendIds.indexOf(friend.id) > -1} />
              <ListItemText primary={friend.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}