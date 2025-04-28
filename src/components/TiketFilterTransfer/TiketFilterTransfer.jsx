import styles from './TiketFilterTransfer.module.scss';

function TiketFilterTransfer() {
  return (
    <div className={styles.list}>
      <div className={styles.textTitle}>Количество пересадок</div>
      <label>
        <input type="checkbox" />
        <span />
        <p>Все</p>
      </label>
      <label>
        <input type="checkbox" />
        <span />
        <p>Без пересадок</p>
      </label>
      <label>
        <input type="checkbox" />
        <span />
        <p>1 пересадка</p>
      </label>
      <label>
        <input type="checkbox" />
        <span />
        <p>2 пересадки</p>
      </label>
      <label>
        <input type="checkbox" />
        <span />
        <p>3 пересадки</p>
      </label>
    </div>
  );
}

export default TiketFilterTransfer;
