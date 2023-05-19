import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Blend } from '@/src/types/Models/Blend';

interface BlendRadioProps {
  blends: Blend[];
  selectedBlendId: number;
  setSelectedBlendId: (selectedBlendId: number) => void;
}

export default function RadioButtonsGroup({blends, setSelectedBlendId, selectedBlendId}: BlendRadioProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBlendId(Number((event.target as HTMLInputElement).value));
  };
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={handleChange}
        value={selectedBlendId}
      >
        {blends.map((blend) => (
          <FormControlLabel value={blend.id} control={<Radio />} label={blend.name} key={blend.id}/>
        ))}
      </RadioGroup>
    </FormControl>
  );
}