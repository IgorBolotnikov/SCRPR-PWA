import React, { useEffect } from 'react';

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
          <a className="navbutton logo" href="#">SCRPR</a>
          <ul className="navbar_list">
            <li><a className="navbutton" href="#">News</a></li>
            <li><a className="navbutton first_item" href="#">Games</a></li>
            <li><a className="navbutton second_item" href="#">Jobs</a></li>
            <li><a className="navbutton third_item" href="#">Freelance</a></li>
            {/* <li><a className="navbutton" href="#">My Account</a></li>
            <li><a className="navbutton" href="#">Log Out</a></li> */}
            <li><a className="navbutton" href="#">Log In</a></li>
            <li><a className="navbutton" href="#">Register</a></li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}
