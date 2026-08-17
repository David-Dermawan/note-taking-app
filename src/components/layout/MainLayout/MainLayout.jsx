import { Outlet } from "react-router";
import Header from "../Header";
import Navbar from "../Navbar";
import styles from "./MainLayout.module.css";

export default function MainLayout() {
  return (
    <div className={styles.mainLayout}>
      <Navbar />
      <div className={styles.content}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
