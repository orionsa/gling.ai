import { FC } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useRecoilState } from 'recoil';

import { actionState } from '../../store/video';
import { ActionsPanelProps } from './ActionsPanel.interface';

export const ActionsPanel:FC<ActionsPanelProps> = ({ actions })=> {
  const [action, setAction] = useRecoilState(actionState);

  const handleClick = (newAction:string): void => {
    setAction(newAction);
  }

  return (
    <Stack style={{ marginBottom: '20px' }} direction="row" spacing={2}>
      {actions.map((a, i) => (
        <Button 
          key={`action-${a}${i}`}
          variant={action === a ? 'contained' : 'outlined'}
          onClick={()=> handleClick(a)}
          size='small'
        >
          {a}
        </Button>
      ))}
    </Stack>
  )
}