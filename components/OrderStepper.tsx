import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SelectOrder from './SelectOrder';
import BlendRadio from './BlendRadio';
import { Menu } from '@/src/types/Models/Menu';
import { Friend } from '@/src/types/Models/Friend';
import { ResultResponse } from '@/src/types/Responses/ResultResponse';
import { OrderRequest } from '@/src/types/Requests/OrderRequest';
import RemarksText from './RemarksText';

interface FullScreenDialogProps {
  handleClose: (isSnackBar: boolean) => void;
  selectedMenu: Menu;
  friends: Friend[];
}

export default function VerticalLinearStepper({ handleClose, selectedMenu, friends }: FullScreenDialogProps) {
  const [remarksText, setRemarksText] = React.useState('');
  const [selectedFriendIds, setSelectedFriendIds] = React.useState([] as number[]);
  const [selectedBlendId, setSelectedBlendId] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const [stepErrors, setStepErrors] = React.useState([false, false, false]);
  const handleStepError = (stepIndex: number, error: boolean) => {
    setStepErrors((prev) => {
        const newErrors = [...prev];
        newErrors[stepIndex] = error;
        return newErrors;
    });
  };

  const steps = React.useMemo(() => {
    const baseSteps = [
      {
        label: 'Order Friends',
      },
      {
        label: 'Remarks',
      },
      {
        label: 'Check',
      },
    ];

    if (selectedMenu.blends.length > 0) {
      baseSteps.splice(1, 0, {
        label: 'Blending',
      });
    }
    return baseSteps;
  }, [selectedMenu.blends]);

  async function fetchPostOrder() {
    const body: OrderRequest = {menu_id: selectedMenu.id, friend_ids: selectedFriendIds, blend_id: selectedBlendId, remarks: remarksText};
    if (selectedMenu.blends.length == 0) {
      delete body.blend_id;
    }
    const response = await fetch('/api/orders/', {
      method: 'POST',
      body: JSON.stringify(body)
    });
    const res: ResultResponse = await response.json();
  }

  const handleNext = (stepIndex: number, stepLabel: string) => {
    if (stepLabel == "Order Friends" && selectedFriendIds.length === 0) {
      handleStepError(stepIndex, true);
      return;
    }
    if (stepLabel == "Blending" && selectedMenu.blends.length > 0 && selectedBlendId === 0) {
      handleStepError(stepIndex, true);
      return;
    }
    if (stepLabel == "Remarks" && selectedMenu.is_remarks_required && remarksText === '') {
      handleStepError(stepIndex, true);
      return;
    }
    // 最後のステップの場合はダイアログを閉じる
    if (steps.length - 1 === activeStep) {  
      fetchPostOrder();
      handleClose(true);
    }
    handleStepError(stepIndex, false);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              error={stepErrors[index]}
              optional={
                stepErrors[index] ? (
                  <Typography variant="caption" color="error">
                    Alert message
                  </Typography>
                ) : index === (steps.length - 1) ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>
                {step.label == 'Order Friends' ? 
                    <SelectOrder setSelectedFriendIds={setSelectedFriendIds} selectedFriendIds={selectedFriendIds} friends={friends}/> : 
                  step.label == 'Blending' ? 
                    <BlendRadio blends={selectedMenu.blends} selectedBlendId={selectedBlendId} setSelectedBlendId={setSelectedBlendId}/> : 
                  step.label == 'Remarks' ? 
                    <RemarksText remarksText={remarksText} setRemarksText={setRemarksText}/>: null
                }
                {index === (steps.length-1) ? 
                <Typography>
                    <Typography>メニュー：{selectedMenu.name}</Typography>
                    {selectedMenu.blends.length > 0 ? <Typography>ブレンド：{selectedMenu.blends.find((blend) => blend.id == selectedBlendId)?.name}</Typography> : null}
                    <Typography>注文者：{selectedFriendIds
                      .map((id) => {
                          const friend = friends.find((friend) => friend.id === id);
                          return friend ? friend.name : '';
                      })
                      .join(', ')}
                    </Typography>
                    <Typography>備考：{remarksText}</Typography>
                </Typography>
                : null}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext.bind(null, index, step.label)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}