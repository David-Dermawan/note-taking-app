import HomePage from "../components/pages/Home";
import LoginPage from "../components/pages/Login";
import MainLayout from "../components/layout/MainLayout";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/archived",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export default routes;
