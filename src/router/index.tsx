import { createRef } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from 'layout/MainLayout';
import ChatRoom from 'pages/ChatRoom';
import Login from 'pages/Login';

const childrenRoutes = [
  {
    path: '/',
    element: <ChatRoom />,
    nodeRef: createRef<HTMLDivElement>(),
    isDynamic: false,
  },
  {
    path: '/login',
    element: <Login />,
    nodeRef: createRef<HTMLDivElement>(),
    isDynamic: false,
  },
  {
    path: '/rooms/:roomId',
    element: <ChatRoom />,
    nodeRef: createRef<HTMLDivElement>(),
    isDynamic: true,
  },
];

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: childrenRoutes.map((route) => ({
      index: route.path === '/',
      path: route.path,
      element: route.element,
      isDynamic: route.isDynamic,
    })),
  },
];

const router = createBrowserRouter(routes);

export { router, childrenRoutes };
