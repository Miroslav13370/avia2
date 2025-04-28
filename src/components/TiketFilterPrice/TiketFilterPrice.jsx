import style from './TiketFilterPrice.module.scss';

function TiketFilterPrice() {
  return (
    <div className={style.boxLabel}>
      <label className={style.labelAria}>
        <input type="radio" name="filter" />
        <p>Самый дешевый</p>
      </label>
      <label className={style.labelAria}>
        <input type="radio" name="filter" />
        <p>Самый быстрый</p>
      </label>
      <label className={style.labelAria}>
        <input type="radio" name="filter" />
        <p>Оптимальный</p>
      </label>
    </div>
  );
}

export default TiketFilterPrice;
