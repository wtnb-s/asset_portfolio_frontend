import { Dashboard } from "../components/pages/Dashboard";
import { Detail } from "../components/pages/Detail";
import { Page404 } from "../components/pages/Page404";

export const DashboardRouter = [
  {
    path: "/",
    exact: true,
    children: <Dashboard />
  },
  {
    path: "/detail/",
    exact: false,
    children: <Detail />
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />
  }
];
