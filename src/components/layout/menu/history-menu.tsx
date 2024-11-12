import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';

interface IHistoryMenuProps {
  children?: React.ReactNode;
}

const HistoryMenu = ({ children }: IHistoryMenuProps) => {
  const historyMenuStyle = HistoryMenuSva();
  return (
    <Box className={historyMenuStyle.wrapper}>
      <Box>{children}</Box>
      History Menu
    </Box>
  );
};

export default HistoryMenu;

const HistoryMenuSva = sva({
  slots: ['wrapper'],
  base: {
    wrapper: {
      display: 'block',
    },
  },
});
