import Login from '../components/Login';
import CreateUsers from '../modules/createUser/CreateUsers';
import ListUser from '../modules/listUser/ListUser';

const ROUTES = [
  { path: '/', element: <Login /> },
  {
    path: 'users',
    children: [
      {
        path: '/',
        element: <ListUser />,
      },
      {
        path: 'create',
        element: <CreateUsers />,
      },
    ],
  },
];

export default ROUTES;
