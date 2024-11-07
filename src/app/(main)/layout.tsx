import MainLayout from '@/components/layout/main-layout';

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
