import PropTypes from 'prop-types';
import { addMinutes, format, parseISO } from 'date-fns';
import style from './Tiket.module.scss';

function flightTimeMachine(data, time) {
  const departureDate = parseISO(data);
  const arrivalDate = addMinutes(departureDate, time);
  return `${format(departureDate, 'HH:mm')} – ${format(arrivalDate, 'HH:mm')}`;
}
function formatTimeduration(allTime) {
  const hours = Math.floor(allTime / 60);
  const minutes = allTime % 60;
  return `${hours}ч ${minutes}м`;
}

function Tiket({ data = {} }) {
  const { price, carrier, segments } = data;

  function pluralize(count, one = 'пересадка', few = 'пересадки', many = 'пересадок') {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
    return many;
  }
  function tranferList(stop) {
    return stop.length === 0
      ? 'ПРЯМОЙ'
      : stop.map((elem, i, arr) => {
          if (arr.length > 1 && arr.length === i + 1) {
            return elem;
          }
          if (arr.length === 1) {
            return elem;
          }
          return `${elem}, `;
        });
  }

  const logo = `http://pics.avs.io/99/36/${carrier}.png`;

  return (
    <div className={style.tiketBox}>
      <div className={style.titleLine}>
        <p className={style.titleLinePrise}>
          {`${String(price).slice(0, 2)} ${String(price).slice(2)} P`}
        </p>
        <img src={logo} alt="logo" className={style.titleLineLogo} />
      </div>
      <div className={style.grid}>
        <div className={style.gridElem}>
          <div className={style.gridElemSection}>
            <p
              className={style.titleSection}
            >{`${segments[0].origin} - ${segments[0].destination}`}</p>
            <p className={style.bodySection}>
              {flightTimeMachine(segments[0].date, segments[0].duration)}
            </p>
          </div>
          <div className={style.gridElemSection}>
            <p
              className={style.titleSection}
            >{`${segments[1].origin} - ${segments[1].destination}`}</p>
            <p className={style.bodySection}>
              {flightTimeMachine(segments[1].date, segments[1].duration)}
            </p>
          </div>
        </div>
        <div className={style.gridElem}>
          <div className={style.gridElemSection}>
            <p className={style.titleSection}>В пути</p>
            <p className={style.bodySection}>{formatTimeduration(segments[0].duration)}</p>
          </div>
          <div className={style.gridElemSection}>
            <p className={style.titleSection}>В пути</p>
            <p className={style.bodySection}>{formatTimeduration(segments[1].duration)}</p>
          </div>
        </div>
        <div className={style.gridElem}>
          <div className={style.gridElemSection}>
            <p
              className={style.titleSection}
            >{`${segments[0].stops.length} ${pluralize(segments[0].stops.length)}`}</p>
            <p className={style.bodySection}>{tranferList(segments[0].stops)}</p>
          </div>
          <div className={style.gridElemSection}>
            <p
              className={style.titleSection}
            >{`${segments[1].stops.length} ${pluralize(segments[1].stops.length)}`}</p>
            <p className={style.bodySection}>{tranferList(segments[1].stops)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tiket;

Tiket.propTypes = {
  data: PropTypes.arrayOf,
};
