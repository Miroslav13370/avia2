import { useDispatch, useSelector } from 'react-redux';
import styles from './TiketFilterTransfer.module.scss';
import { toggleFilterTransfer } from '../../store/sliceFilterTransfer';

function TiketFilterTransfer() {
  const checkedFilt = useSelector((state) => state.transfer);

  const dispatch = useDispatch();
  const { all, noTransfers, oneTransfer, twoTransfer, threeTransfer } = checkedFilt;

  return (
    <div className={styles.list}>
      <div className={styles.textTitle}>Количество пересадок</div>
      <label>
        <input
          type="checkbox"
          checked={all}
          onChange={() => {
            dispatch(toggleFilterTransfer('all'));
          }}
        />
        <span />
        <p>Все</p>
      </label>
      <label>
        <input
          type="checkbox"
          checked={noTransfers}
          onChange={() => {
            dispatch(toggleFilterTransfer('noTransfers'));
          }}
        />
        <span />
        <p>Без пересадок</p>
      </label>
      <label>
        <input
          type="checkbox"
          checked={oneTransfer}
          onChange={() => {
            dispatch(toggleFilterTransfer('oneTransfer'));
          }}
        />
        <span />
        <p>1 пересадка</p>
      </label>
      <label>
        <input
          type="checkbox"
          checked={twoTransfer}
          onChange={() => {
            dispatch(toggleFilterTransfer('twoTransfer'));
          }}
        />
        <span />
        <p>2 пересадки</p>
      </label>
      <label>
        <input
          type="checkbox"
          checked={threeTransfer}
          onChange={() => {
            dispatch(toggleFilterTransfer('threeTransfer'));
          }}
        />
        <span />
        <p>3 пересадки</p>
      </label>
    </div>
  );
}

export default TiketFilterTransfer;
