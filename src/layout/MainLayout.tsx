import { ReactNode } from 'react';
import { MainBackground } from 'components/ui/Common/styled';

const MainLayout = ({ children }: { children: ReactNode }) => (
  <MainBackground className="App">{children}</MainBackground>
);

export default MainLayout;
