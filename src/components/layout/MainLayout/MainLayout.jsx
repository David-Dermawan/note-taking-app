import { Outlet, useLocation, useMatches } from "react-router";
import Header from "../Header";
import Navbar from "../Navbar";
import styles from "./MainLayout.module.css";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { useEffect, useState } from "react";

export default function MainLayout() {
  const matches = useMatches();

  const currentRoute = matches[matches.length - 1];
  const title = currentRoute.handle?.title || "";

  const isTablet = useMediaQuery("(max-width: 1024px)");

  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTagView, setIsTagView] = useState(false);

  useEffect(() => {
    setIsSearchOpen(false);
    setIsTagView(false);
  }, [location.pathname]);

  function handleHome() {
    setIsSearchOpen(false);
    setIsTagView(false);
  }

  function handleSearch() {
    setIsSearchOpen(true);
    setIsTagView(false);
  }

  function handleTags() {
    setIsTagView(true);
    setIsSearchOpen(false);
  }

  return (
    <div className={styles.mainLayout}>
      {isTablet ? (
        <MobileNavbar
          onHome={handleHome}
          onSearch={handleSearch}
          onTags={handleTags}
        />
      ) : (
        <Navbar />
      )}
      <div className={styles.content}>
        <Header title={title} />
        <Outlet context={{ title, isSearchOpen, isTagView }} />
      </div>
    </div>
  );
}
