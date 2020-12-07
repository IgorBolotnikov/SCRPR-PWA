import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps): React.ReactElement {
  const burgerRef = useRef<HTMLLabelElement>(null);
  const toggleRef = useRef<HTMLInputElement>(null);
  const navbarRef = useRef<HTMLUListElement>(null);

  function toggleClass(): void {
    const element = document.getElementById('burger_click');
    if (element) {
      element.classList.toggle('change');
    }
  }

  function toggleBurgerClass(): void {
    if (window.innerWidth < 800) {
      if (burgerRef.current) {
        burgerRef.current.classList.remove('change');
      }
      if (toggleRef.current) {
        toggleRef.current.checked = false;
      }
      window.scrollTo(0, 0);
    }
  }

  useEffect(() => {
    const burger = burgerRef.current;
    const navbar = navbarRef.current;
    const logo = document.getElementById('logo');
    if (burger) {
      burger.addEventListener('click', toggleClass);
    }
    if (logo) {
      logo.addEventListener('click', toggleBurgerClass);
    }
    if (navbar) {
      Array.from(navbar.children).forEach((child) => {
        child.children[0].addEventListener('click', toggleBurgerClass);
      });
    }
    return (): void => {
      if (burger) {
        burger.removeEventListener('click', toggleClass);
      }
      if (logo) {
        logo.removeEventListener('click', toggleBurgerClass);
      }
      if (navbar) {
        Array.from(navbar.children).forEach((child) => {
          child.children[0].removeEventListener('click', toggleBurgerClass);
        });
      }
    };
  }, []);

  return (
    <>
      <label ref={burgerRef} id="burger_click" className="burger_button" htmlFor="toggle">
        <div className="line1" />
        <div className="line2" />
        <div className="line3" />
      </label>
      <input ref={toggleRef} id="toggle" type="checkbox" name="" />
      <div className="navbar">
        <div className="navbar_container">
          <Link className="navbutton logo" id="logo" to="/">SCRPR</Link>
          <ul ref={navbarRef} className="navbar_list">
            {children}
          </ul>
        </div>
      </div>
    </>
  );
}
