import style from './Tiket.module.scss';
import S7Logo from '../../image/S7Logo.svg';

function Tiket() {
  return (
    <div className={style.tiketBox}>
      <div className={style.titleLine}>
        <p className={style.titleLinePrise}>13 400 Р</p>
        <img src={S7Logo} alt="logo" className={style.titleLineLogo} />
      </div>
      <div className={style.grid}>
        <div className={style.gridElem}>
          <div className={style.gridElemSection}>
            <p className={style.titleSection}>MOW – HKT</p>
            <p className={style.bodySection}>10:45 – 08:00</p>
          </div>
          <div className={style.gridElemSection}>
            <p className={style.titleSection}>MOW – HKT</p>
            <p className={style.bodySection}>11:20 – 00:50</p>
          </div>
        </div>
        <div className={style.gridElem}>
          <div className={style.gridElemSection}>
            <p className={style.titleSection}>В пути</p>
            <p className={style.bodySection}>21ч 15м</p>
          </div>
          <div className={style.gridElemSection}>
            <p className={style.titleSection}>В пути</p>
            <p className={style.bodySection}>13ч 30м</p>
          </div>
        </div>
        <div className={style.gridElem}>
          <div className={style.gridElemSection}>
            <p className={style.titleSection}>2 пересадки</p>
            <p className={style.bodySection}>HKG, JNB</p>
          </div>
          <div className={style.gridElemSection}>
            <p className={style.titleSection}>1 пересадка</p>
            <p className={style.bodySection}>HKG</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tiket;
