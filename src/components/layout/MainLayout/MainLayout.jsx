import { Outlet, useMatches, useNavigate } from "react-router";
import Header from "../Header";
import Navbar from "../Navbar";
import styles from "./MainLayout.module.css";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { useState } from "react";

export default function MainLayout() {
  const matches = useMatches();

  const title =
    [...matches].reverse().find((match) => match.handle?.title)?.handle.title ||
    "";

  const isTablet = useMediaQuery("(max-width: 1024px)");
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTagView, setIsTagView] = useState(false);

  function handleHome() {
    setIsSearchOpen(false);
    setIsTagView(false);
  }

  function handleSearch() {
    setIsSearchOpen(true);
    setIsTagView(false);
    navigate("/");
  }

  function handleTags() {
    setIsTagView(true);
    setIsSearchOpen(false);
    navigate("/");
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
