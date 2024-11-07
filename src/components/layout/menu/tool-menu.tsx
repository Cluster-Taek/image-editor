import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';

interface IToolMenuProps {
  children?: React.ReactNode;
}

const ToolMenu = ({ children }: IToolMenuProps) => {
  const toolMenuStyle = ToolMenuSva();
  return (
    <Box className={toolMenuStyle.wrapper}>
      <Box>{children}</Box>
      toolbar
    </Box>
  );
};

export default ToolMenu;

const ToolMenuSva = sva({
  slots: ['wrapper'],
  base: {
    wrapper: {
      display: 'block',
    },
  },
});
