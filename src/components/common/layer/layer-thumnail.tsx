import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';
import { Type } from 'lucide-react';

interface ILayerThumnailProps {
  layer?: ILayer;
}

const LayerThumnail = ({ layer }: ILayerThumnailProps) => {
  const layerThumnailStyle = LayerThumnailSva();
  return (
    <Box className={layerThumnailStyle.wrapper}>
      {layer?.type === 'text' && <Type />}
      {layer?.type === 'image' && <div></div>}
      {layer?.type === 'shape' && <div></div>}
    </Box>
  );
};

export default LayerThumnail;

const LayerThumnailSva = sva({
  slots: ['wrapper'],
  base: {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      height: 100,
    },
  },
});
