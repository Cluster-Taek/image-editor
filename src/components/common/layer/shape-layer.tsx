import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';

interface IShapeLayerProps {
  shape?: IShape;
}

const ShapeLayer = ({ shape }: IShapeLayerProps) => {
  const shapeLayerStyle = ShapeLayerSva();
  return (
    <Box className={shapeLayerStyle.wrapper}>
      <Box>{JSON.stringify(shape)}</Box>
    </Box>
  );
};

export default ShapeLayer;

const ShapeLayerSva = sva({
  slots: ['wrapper'],
  base: {
    wrapper: {
      display: 'block',
    },
  },
});
