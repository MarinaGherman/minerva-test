import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectDataIsParsed } from '../store/slice/data';

const Main = () => {
  const isParsedData = useSelector(selectDataIsParsed);
  const navigate = useNavigate();

  useEffect(() => {

    const redirectTo = isParsedData ? '/graphs' : '/form'

    navigate(redirectTo);

  }, [navigate, isParsedData])

  return (
    <div>
      main
    </div>
  );
};

export default Main;
