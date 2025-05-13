import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Tiket from '../Tiket/Tiket';
import style from './TiketList.module.scss';
import { selectIsLoad, selectTiketList } from '../../store/sliceTikets';
import { selectPrice } from '../../store/sliceTiketFilterPrice';
import { selectTransfer } from '../../store/sliceFilterTransfer';

function TiketList() {
  const isLoad = useSelector(selectIsLoad);
  const fullTiketList = useSelector(selectTiketList);
  const checkedFilt = useSelector(selectTransfer);
  const [filtered, setFiltered] = useState([]);
  const { all, noTransfers, oneTransfer, twoTransfer, threeTransfer } = checkedFilt;
  const { cheap, fast, optimum } = useSelector(selectPrice);
  const [count, setcount] = useState(5);
  const addClickSliceCountHandler = () => {
    setcount((counter) => counter + 5);
  };
  useEffect(() => {
    if (fullTiketList.length === 0) return;
    const filterArr = [];
    if (noTransfers) filterArr.push(0);
    if (oneTransfer) filterArr.push(1);
    if (twoTransfer) filterArr.push(2);
    if (threeTransfer) filterArr.push(3);

    const filter = fullTiketList.filter((elems) =>
      elems.segments.every((elem) => filterArr.includes(elem.stops.length)),
    );

    if (cheap) {
      filter.sort((a, b) => a.price - b.price);
    }
    if (fast) {
      filter.sort((a, b) => a.segments[0].duration - b.segments[0].duration);
    }
    if (optimum) {
      filter.sort(
        (a, b) =>
          a.price +
          a.segments[0].duration * 15 +
          (a.price + a.segments[1].duration * 15) -
          (b.price + b.segments[0].duration * 15 + (b.price + b.segments[1].duration * 15)),
      );
    }

    setFiltered(filter.slice(0, count));
  }, [
    noTransfers,
    twoTransfer,
    threeTransfer,
    fullTiketList,
    all,
    oneTransfer,
    cheap,
    fast,
    optimum,
    count,
  ]);

  if (!isLoad) {
    return <p>Загрузка...</p>;
  }

  if (isLoad && filtered.length === 0) {
    return <p>По вашему запросу ничего не найдено</p>;
  }

  return (
    <>
      {filtered.map((elem) => {
        return (
          <Tiket
            key={elem.price + elem.segments[0].duration + elem.segments[1].duration / Math.random()}
            data={elem}
          />
        );
      })}
      <button type="button" className={style.showMore} onClick={addClickSliceCountHandler}>
        Показать еще 5 билетов!
      </button>
    </>
  );
}

export default TiketList;
