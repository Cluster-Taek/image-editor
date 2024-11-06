import SessionProvider from '@/contexts/session-provider';

interface ICoreProviderProps {
  children?: React.ReactNode;
}

const CoreProvider = ({ children }: ICoreProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default CoreProvider;
