import HistoryMenu from './menu/history-menu';
import LayerMenu from './menu/layer-menu';
import ToolMenu from './menu/tool-menu';
import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';

interface IMainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  const mainLayoutStyle = MainLayoutSva();
  return (
    <Box className={mainLayoutStyle.wrapper}>
      <Box className={mainLayoutStyle.lnb}>
        <ToolMenu />
      </Box>
      <Box className={mainLayoutStyle.rnb}>
        <HistoryMenu />
        <LayerMenu />
      </Box>
      <Box className={mainLayoutStyle.content}>{children}</Box>
    </Box>
  );
};

export default MainLayout;

const MainLayoutSva = sva({
  slots: ['wrapper', 'lnb', 'rnb', 'content'],
  base: {
    wrapper: {
      display: 'block',
    },
    lnb: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100px',
      height: '100%',
      background: 'gray.300',
    },
    rnb: {
      position: 'fixed',
      top: 0,
      right: 0,
      width: '300px',
      height: '100%',
      background: 'gray.300',
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      marginLeft: '100px',
      marginRight: '300px',
      background: 'gray.600',
      height: '100vh',
    },
  },
});
