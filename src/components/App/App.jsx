import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../image/Logo.svg';
import TiketFilterTransfer from '../TiketFilterTransfer/TiketFilterTransfer';
import TiketFilterPrice from '../TiketFilterPrice/TiketFilterPrice';
import TiketList from '../TiketList/TiketList';
import style from './App.module.scss';
import { fetchKey, fetchList } from '../../store/sliceTikets';
import ProgressTiketsLoader from '../ProgressTiketsLoader/ProgressTiketsLoader';

function App() {
  const dispatch = useDispatch();
  const tiketKey = useSelector((state) => state.tikets.tiketKey);

  useEffect(() => {
    dispatch(fetchKey());
  }, [dispatch]);

  useEffect(() => {
    if (tiketKey) {
      dispatch(fetchList());
    }
  }, [tiketKey, dispatch]);

  return (
    <div className={style.body}>
      <img src={logo} alt="лого" className={style.titleLogo} />
      <div className={style.TiketFilter}>
        <TiketFilterTransfer />
        <div>
          <TiketFilterPrice />
          <ProgressTiketsLoader />
          <TiketList />
        </div>
      </div>
    </div>
  );
}

export default App;
