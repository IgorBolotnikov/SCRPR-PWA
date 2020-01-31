import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  function toggleClassOnTouch() {
    this.classList.toggle("change");
  }

  function toggleClassOnClick() {
    this.classList.toggle("change");
  }

  useEffect(() => {
    const burger = document.getElementById('burger_touch');
    const burger2 = document.getElementById('burger_click');
    burger.addEventListener('touchend', toggleClassOnTouch);
    burger2.addEventListener('click', toggleClassOnClick);
    return () => {
      burger.removeEventListener('touchend', toggleClassOnTouch);
      burger2.removeEventListener('click', toggleClassOnClick);
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
          <Link className="navbutton logo" to="/">SCRPR</Link>
          <ul className="navbar_list">
            {props.children}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}
