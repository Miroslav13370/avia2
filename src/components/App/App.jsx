import logo from '../../image/Logo.svg';
import TiketFilterTransfer from '../TiketFilterTransfer/TiketFilterTransfer';
import TiketFilterPrice from '../TiketFilterPrice/TiketFilterPrice';
import TiketList from '../TiketList/TiketList';
import style from './App.module.scss';

function App() {
  return (
    <div className={style.body}>
      <img src={logo} alt="лого" className={style.titleLogo} />
      <div className={style.TiketFilter}>
        <TiketFilterTransfer />
        <div>
          <TiketFilterPrice />
          <TiketList />
        </div>
      </div>
    </div>
  );
}

export default App;
