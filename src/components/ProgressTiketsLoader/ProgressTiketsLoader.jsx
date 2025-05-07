import { Flex, Progress } from 'antd';
import { useSelector } from 'react-redux';
import style from './ProgressTiketsLoader.module.scss';

function ProgressTiketsLoader() {
  const progressLoad = useSelector((state) => state.tikets.progressLoad);
  if (progressLoad >= 21) {
    return '';
  }

  return (
    <div className={style.loaderBox}>
      <p className={style.loaderText}>Загрузка всех билетов</p>
      <Flex gap="small" vertical className={style.loader}>
        <Progress
          percent={progressLoad * 5}
          percentPosition={{ align: 'center', type: 'inner' }}
          size={[495, 20]}
        />
      </Flex>
    </div>
  );
}
export default ProgressTiketsLoader;
