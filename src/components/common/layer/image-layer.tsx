import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';
import Image from 'next/image';

interface IImageLayerProps {
  image: IImage;
}

const ImageLayer = ({ image }: IImageLayerProps) => {
  const imageLayerStyle = ImageLayerSva();
  const { src, ...style } = image;
  return (
    <Box className={imageLayerStyle.imageWrapper} style={style}>
      <Image src={src} width={style.width} height={style.height} alt="" />
    </Box>
  );
};

export default ImageLayer;

const ImageLayerSva = sva({
  slots: ['imageWrapper'],
  base: {
    imageWrapper: {
      display: 'block',
    },
  },
});
