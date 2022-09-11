import { Button } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppDispatch } from '../store';
import { selectDataIsParsed } from '../store/slice/data';
import parseData from '../store/slice/data/actions/parse-data';

interface Event<T = EventTarget> {
  target: T;
}

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const isParsedData = useSelector(selectDataIsParsed);

  const uploadInputRef = useRef<HTMLInputElement>(null);

  const onChange = (event: Event<HTMLInputElement>) => {
    const files = event.target.files || undefined;
    if (files) {
      dispatch(parseData(files[0]));
    }
  }

  useEffect(() => {
    if (isParsedData) {
      navigate('/graphs');
    }
  }, [navigate, isParsedData])

  return (
      <div>
        <input
            ref={uploadInputRef}
            type="file"
            accept="text/csv"
            style={{ display: 'none' }}
            onChange={onChange}
          />
          <Button
            onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
            variant="contained"
          >
            Upload
          </Button>
      </div>
  )
};

export default Form;
