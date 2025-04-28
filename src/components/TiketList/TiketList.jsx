import Tiket from '../Tiket/Tiket';
import style from './TiketList.module.scss';

function TiketList() {
  const list = ['1', '2', '3', '4', '5'];
  const resultList = list.map(() => {
    return <Tiket />;
  });
  return (
    <>
      {resultList}
      <p className={style.showMore}>Показать еще 5 билетов!</p>
    </>
  );
}

export default TiketList;
