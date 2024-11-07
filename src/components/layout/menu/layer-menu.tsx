import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';

interface ILayerMenuProps {
  children?: React.ReactNode;
}

const LayerMenu = ({ children }: ILayerMenuProps) => {
  const layerMenuStyle = LayerMenuSva();
  return (
    <Box className={layerMenuStyle.wrapper}>
      <Box>{children}</Box>
      Layer Menu
    </Box>
  );
};

export default LayerMenu;

const LayerMenuSva = sva({
  slots: ['wrapper'],
  base: {
    wrapper: {
      display: 'block',
    },
  },
});
