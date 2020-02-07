import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  function toggleClass() {
    console.log(this);
    this.classList.toggle("change");
  }

  function toggleBurgerClass() {
    if (window.innerWidth < 800) {
      const burger = document.getElementById('burger_click');
      const toggle = document.getElementById('toggle');
      burger.classList.remove("change");
      toggle.checked = false;
      window.scrollTo(0, 0);
    }
  }

  useEffect(() => {
    const burger = document.getElementById('burger_click');
    const navbar = document.getElementsByClassName('navbar_list')[0].children;
    const logo = document.getElementById('logo');
    // burger.addEventListener('touchend', toggleClass);
    burger.addEventListener('click', toggleClass);
    logo.addEventListener('click', toggleBurgerClass);
    for (let child of navbar) {
      child.children[0].addEventListener('click', toggleBurgerClass);
    }
    return () => {
      // burger.removeEventListener('touchend', toggleClass);
      burger.removeEventListener('click', toggleClass);
      logo.removeEventListener('click', toggleBurgerClass);
      for (let child of navbar) {
        child.children[0].removeEventListener('click', toggleBurgerClass);
      }
    }
  }, []);

  return (
    <React.Fragment>
      <label id="burger_click" className="burger_button" htmlFor="toggle">
        <div id="burger_touch" className="burger_container">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </label>
      <input id="toggle" type="checkbox" name="" />
      <div className="navbar">
        <div className="navbar_container">
          <Link className="navbutton logo" id="logo" to="/">SCRPR</Link>
          <ul className="navbar_list">
            {props.children}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}
