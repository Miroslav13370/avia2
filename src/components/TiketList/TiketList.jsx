import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Tiket from '../Tiket/Tiket';
import style from './TiketList.module.scss';

function TiketList() {
  const isLoad = useSelector((state) => state.tikets.isLoad);
  const fullTiketList = useSelector((state) => state.tikets.fullTiketList);
  const checkedFilt = useSelector((state) => state.transfer);
  const [filtered, setFiltered] = useState([]);
  const { all, noTransfers, oneTransfer, twoTransfer, threeTransfer } = checkedFilt;
  const { cheap, fast, optimum } = useSelector((state) => state.price);
  const [count, setcount] = useState(5);
  const addClickSliceCountHandler = () => {
    setcount((counter) => counter + 5);
  };
  useEffect(() => {
    if (noTransfers && fullTiketList) {
      const arr = fullTiketList.filter((elem) => {
        if (elem.segments[0].stops.length === 0 || elem.segments[1].stops.length === 0) {
          return true;
        }
        return false;
      });
      setFiltered((list) => {
        const filterList = list.filter((elem) => {
          if (elem.segments[0].stops.length === 0 || elem.segments[1].stops.length === 0) {
            return true;
          }
          return false;
        });
        return [...filterList, ...arr];
      });
    }

    if (oneTransfer && fullTiketList) {
      const arr = fullTiketList.filter((elem) => {
        if (
          (elem.segments[0].stops.length === 0 && elem.segments[1].stops.length === 1) ||
          (elem.segments[0].stops.length === 1 && elem.segments[1].stops.length === 0)
        ) {
          return true;
        }
        return false;
      });
      setFiltered((list) => {
        const filterList = list.filter((elem) => {
          if (
            (elem.segments[0].stops.length === 0 && elem.segments[1].stops.length === 1) ||
            (elem.segments[0].stops.length === 1 && elem.segments[1].stops.length === 0)
          ) {
            return true;
          }
          return false;
        });
        return [...filterList, ...arr];
      });
    }
    if (twoTransfer && fullTiketList) {
      const arr = fullTiketList.filter((elem) => {
        if (
          (elem.segments[0].stops.length === 0 && elem.segments[1].stops.length === 2) ||
          (elem.segments[0].stops.length === 2 && elem.segments[1].stops.length === 0)
        ) {
          return true;
        }
        return false;
      });
      setFiltered((list) => {
        const filterList = list.filter((elem) => {
          if (
            (elem.segments[0].stops.length === 0 && elem.segments[1].stops.length === 2) ||
            (elem.segments[0].stops.length === 2 && elem.segments[1].stops.length === 0)
          ) {
            return true;
          }
          return false;
        });
        return [...filterList, ...arr];
      });
    }
    if (threeTransfer && fullTiketList) {
      const arr = fullTiketList.filter((elem) => {
        if (
          (elem.segments[0].stops.length === 0 && elem.segments[1].stops.length === 3) ||
          (elem.segments[0].stops.length === 3 && elem.segments[1].stops.length === 0)
        ) {
          return true;
        }
        return false;
      });
      setFiltered((list) => {
        const filterList = list.filter((elem) => {
          if (
            (elem.segments[0].stops.length === 0 && elem.segments[1].stops.length === 3) ||
            (elem.segments[0].stops.length === 3 && elem.segments[1].stops.length === 0)
          ) {
            return true;
          }
          return false;
        });
        return [...filterList, ...arr];
      });
    }
    if (!noTransfers && fullTiketList) {
      setFiltered((elems) => {
        return elems.filter((elem) => {
          if (elem.segments[0].stops.length > 0 || elem.segments[1].stops.length > 0) {
            return true;
          }
          return false;
        });
      });
    }
    if (!oneTransfer && fullTiketList) {
      setFiltered((elems) => {
        return elems.filter((elem) => {
          if (
            (elem.segments[0].stops.length === 0 && elem.segments[1].stops.length !== 1) ||
            (elem.segments[0].stops.length !== 1 && elem.segments[1].stops.length === 0)
          ) {
            return true;
          }
          return false;
        });
      });
    }
    if (!twoTransfer && fullTiketList) {
      setFiltered((elems) => {
        return elems.filter((elem) => {
          if (
            (elem.segments[0].stops.length === 0 && elem.segments[1].stops.length !== 2) ||
            (elem.segments[0].stops.length !== 2 && elem.segments[1].stops.length === 0)
          ) {
            return true;
          }
          return false;
        });
      });
    }
    if (!threeTransfer && fullTiketList) {
      setFiltered((elems) => {
        return elems.filter((elem) => {
          if (
            (elem.segments[0].stops.length === 0 && elem.segments[1].stops.length !== 3) ||
            (elem.segments[0].stops.length !== 3 && elem.segments[1].stops.length === 0)
          ) {
            return true;
          }
          return false;
        });
      });
    }
    if (all && fullTiketList) {
      setFiltered(fullTiketList);
    }
    if (cheap) {
      setFiltered((elems) => {
        return [...elems].sort((a, b) => a.price - b.price);
      });
    }
    if (fast) {
      setFiltered((elems) => {
        return [...elems].sort((a, b) => a.segments[0].duration - b.segments[0].duration);
      });
    }
    if (optimum) {
      setFiltered((elems) => {
        return [...elems].sort(
          (a, b) => a.price + a.segments[0].duration * 15 - (b.price + b.segments[0].duration * 15),
        );
      });
    }
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
  ]);
  if (!isLoad) {
    return <p>Загрузка...</p>;
  }

  if (isLoad && filtered.length === 0) {
    return <p>По вашему запросу ничего не найдено</p>;
  }

  return (
    <>
      {filtered.slice(0, count).map((elem) => {
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
