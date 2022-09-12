
import CircularProgress from '@mui/material/CircularProgress';

import styles from './Loader.module.scss'

 const Loader = () => (
    <div className={styles.main}>
      <div className={styles.progress}>
        <CircularProgress size={50}/>
      </div>
    </div>
  );
export default Loader;
