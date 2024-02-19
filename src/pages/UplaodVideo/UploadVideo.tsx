import { FC, ChangeEvent, useState } from 'react'; 
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { videoState } from '../../store/video';
import './Upload.scss';

export const UploadVideo:FC = ()=> {
  const navigate = useNavigate();
  const [,setVideoUrl] = useRecoilState(videoState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('')

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setIsLoading(true);
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setVideoUrl(reader.result as string);
            navigate('/editor');
            setIsLoading(false);
        };
        reader.readAsDataURL(file);
        reader.onerror = ()=> {
          setError('Something went wrong, please try again');
          setIsLoading(false);
        }
    }
};

  return (
    <div className='upload-page'>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<UploadIcon />}
      >
        {!isLoading ? 'Upload file' : 'Loading...'}
        <input className='upload-page__input' type="file" onChange={handleFileInputChange} />
      </Button>
      {error}
    </div>
  )
}