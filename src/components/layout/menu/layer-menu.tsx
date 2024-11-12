'use client';

import LayerThumnail from '@/components/common/layer/layer-thumnail';
import { useStageContext } from '@/contexts/stage-provider';
import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';

interface ILayerMenuProps {
  children?: React.ReactNode;
}

const LayerMenu = ({ children }: ILayerMenuProps) => {
  const layerMenuStyle = LayerMenuSva();
  const { layers } = useStageContext();
  return (
    <Box className={layerMenuStyle.wrapper}>
      {layers?.map((layer) => (
        <div className={layerMenuStyle.layerWrapper}>
          <LayerThumnail layer={layer} />
        </div>
      ))}
    </Box>
  );
};

export default LayerMenu;

const LayerMenuSva = sva({
  slots: ['wrapper', 'layerWrapper'],
  base: {
    wrapper: {
      display: 'flex',
      background: 'green',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    layerWrapper: {
      display: 'block',
      background: 'red',
      padding: 10,
    },
  },
});
