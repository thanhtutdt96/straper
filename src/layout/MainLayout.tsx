import { matchPath, useLocation, useOutlet } from 'react-router';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import AppProvider from 'contexts/AppProvider';
import AuthProvider from 'contexts/AuthProvider';
import AddRoomModal from 'components/modals/AddRoomModal';
import InviteMemberModal from 'components/modals/InviteMemberModal';
import { MainBackground } from 'components/ui/Common/styled';
import { childrenRoutes } from 'router';

const MainLayout = () => {
  const location = useLocation();
  const currentOutlet = useOutlet();

  const { nodeRef } =
    childrenRoutes.find((route) => {
      if (route.isDynamic) {
        return !!matchPath(route.path, location.pathname);
      }
      return route.path === location.pathname;
    }) ?? {};

  return (
    <AuthProvider>
      <AppProvider>
        <MainBackground className="App">
          {!matchPath('/rooms/:roomId', location.pathname) ? (
            <SwitchTransition>
              <CSSTransition
                key={location.pathname}
                classNames="page"
                timeout={{ enter: 500, exit: 500 }}
                nodeRef={nodeRef}
                unmountOnExit
              >
                <div ref={nodeRef} className="page">
                  {currentOutlet}
                </div>
              </CSSTransition>
            </SwitchTransition>
          ) : (
            currentOutlet
          )}
        </MainBackground>
        <AddRoomModal />
        <InviteMemberModal />
      </AppProvider>
    </AuthProvider>
  );
};

export default MainLayout;
