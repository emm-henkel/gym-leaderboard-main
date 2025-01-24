import React, { Component } from "react";
import myLogo from '../lift-leader-logo1b.png';

class header extends Component {
  state = {};
  render() {
    return (
    <header className="mb-auto d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-light text-decoration-none">
      <img src={myLogo}  alt="logo" width="280" height="48"/>
      </a>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/" className="nav-link px-2 link-light">Home</a></li>
        <li><a href="#" className="nav-link px-2 link-light">Feed</a></li>
        <li><a href="#" className="nav-link px-2 link-light">Friends</a></li>
        <li><a href="#" className="nav-link px-2 link-light">Gyms</a></li>
        <li><a href="#" className="nav-link px-2 link-light">Leaderboard</a></li>
      </ul>

      <div className="col-md-3 text-end">
        <a href="/login" type="button" className="btn btn-outline-primary me-2">Login</a>
        <a href="/signup" type="button" className="btn btn-primary">Sign-up</a>
      </div>
    </header>
    );
  }
}

export default header;
