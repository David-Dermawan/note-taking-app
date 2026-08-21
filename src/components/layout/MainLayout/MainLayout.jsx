import { Outlet, useMatches } from "react-router";
import Header from "../Header";
import Navbar from "../Navbar";
import styles from "./MainLayout.module.css";

export default function MainLayout() {
  const matches = useMatches();

  const currentRoute = matches[matches.length - 1];
  const title = currentRoute.handle?.title || "";

  return (
    <div className={styles.mainLayout}>
      <Navbar />
      <div className={styles.content}>
        <Header title={title} />
        <Outlet />
      </div>
    </div>
  );
}
