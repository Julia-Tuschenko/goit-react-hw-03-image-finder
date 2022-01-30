import styles from './Loader.module.css';

import { TailSpin } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/TailSpin/css/react-spinner-loader.css';

const loader = () => {
  return (
    <TailSpin
      className={styles.Loader}
      type="TailSpin"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000} //3 secs
    />
  );
};
export default loader;
