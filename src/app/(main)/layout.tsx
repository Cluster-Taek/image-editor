import MainLayout from '@/components/layout/main-layout';
import StageProvider from '@/contexts/stage-provider';

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <StageProvider>
      <MainLayout>{children}</MainLayout>
    </StageProvider>
  );
};

export default Layout;
