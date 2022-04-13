/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import logo from "../Media/logo.png";
import { eraseCookie } from "../api/api";
import { useHistory } from "react-router";

const Header = ({ user }) => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleLogout = () => {
    eraseCookie("userData");
    setRedirect(true);
    history.push("/");
  };

  if (redirect) {
    history.go(0);
  }

  return (
    <header className={menuOpen ? `header open` : `header`}>
      <div className={menuOpen ? `overlay  fade-in` : `header  fade-out`}></div>
      <nav className={`container container--pall flex flex-jc-sb flex-ai-c`}>
        <a href="/" className={`header__logo`}>
          <img src={logo} alt="logo"></img>
        </a>

        <a
          href="#"
          id="btnHamburger"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
          className={`header__toggle hide-for-desktop`}
        >
          <span></span>
          <span></span>
          <span></span>
        </a>

        {user ? (
          <div className={`header__links hide-for-mobile`}>
            <a href="/">Home</a>
            <a href="/order">Create Order</a>
            <a href="/itemManagement">Item Management</a>
            <a href="/menuManagement">Menu Management</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </div>
        ) : (
          <div className={`header__links hide-for-mobile`}>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </div>
        )}
        {user ? (
          <a
            onClick={handleLogout}
            className={`button header__cta hide-for-mobile`}
          >
            Log out
          </a>
        ) : (
          <a href="/join" className={`button header__cta hide-for-mobile`}>
            Log In
          </a>
        )}
      </nav>

      <div className={menuOpen ? `header__menu` : `has-fade`}>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>
    </header>
  );
};

export default Header;
