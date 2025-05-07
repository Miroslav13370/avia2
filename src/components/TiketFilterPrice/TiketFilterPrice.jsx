import { useDispatch, useSelector } from 'react-redux';
import style from './TiketFilterPrice.module.scss';
import { changeFilter } from '../../store/sliceTiketFilterPrice';

function TiketFilterPrice() {
  const { cheap, fast, optimum } = useSelector((state) => state.price);
  const dispatch = useDispatch();

  return (
    <div className={style.boxLabel}>
      <label className={style.labelAria}>
        <input
          type="radio"
          name="filter"
          checked={cheap}
          onChange={() => dispatch(changeFilter('cheap'))}
        />
        <p>Самый дешевый</p>
      </label>
      <label className={style.labelAria}>
        <input
          type="radio"
          name="filter"
          checked={fast}
          onChange={() => dispatch(changeFilter('fast'))}
        />
        <p>Самый быстрый</p>
      </label>
      <label className={style.labelAria}>
        <input
          type="radio"
          name="filter"
          checked={optimum}
          onChange={() => dispatch(changeFilter('optimum'))}
        />
        <p>Оптимальный</p>
      </label>
    </div>
  );
}

export default TiketFilterPrice;
