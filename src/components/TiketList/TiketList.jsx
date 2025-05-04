import { useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import Tiket from '../Tiket/Tiket';
import style from './TiketList.module.scss';

function TiketList() {
  const isLoad = useSelector((state) => state.tikets.isLoad);
  const fullTiketList = useSelector((state) => state.tikets.fullTiketList);

  if (!isLoad) {
    return <p>Загрузка...</p>;
  }

  return (
    <>
      {fullTiketList?.slice(0, 5).map((elem) => {
        return <Tiket key={elem.price} data={elem} />;
      })}
      <p className={style.showMore}>Показать еще 5 билетов!</p>
    </>
  );
}

export default TiketList;
