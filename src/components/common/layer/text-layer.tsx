import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';

interface ITextLayerProps {
  text: IText;
}

const TextLayer = ({ text }: ITextLayerProps) => {
  const textLayerStyle = TextLayerSva();
  const { content, ...style } = text;
  return (
    <Box className={textLayerStyle.textWrapper} style={style}>
      {content}
    </Box>
  );
};

export default TextLayer;

const TextLayerSva = sva({
  slots: ['textWrapper'],
  base: {
    textWrapper: {
      display: 'block',
    },
  },
});
