'use client';

import { useStageContext } from '@/contexts/stage-provider';
import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';

interface IToolMenuProps {
  children?: React.ReactNode;
}

const ToolMenu = ({ children }: IToolMenuProps) => {
  const toolMenuStyle = ToolMenuSva();
  const { handleExport } = useStageContext();
  return (
    <Box className={toolMenuStyle.wrapper}>
      <Box>{children}</Box>
      <button onClick={handleExport}>export</button>
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
