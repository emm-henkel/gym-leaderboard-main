import '../App.css';
import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./pages/notfound";
import Home from "./pages/Home/home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Feed from "./pages/Feed/Feed";
import FriendsPage from "./pages/friends";
import GymsPage from "./pages/gyms";
import LeaderboardsPage from "./pages/leaderboards";
import ProfilePage from "./pages/profile";
import myLogo from '../lift-leader-logo1b.png';



class LayoutSmall extends Component {
  render() {
    return (

      <body className="d-flex text-center text-bg-dark vh-100">

        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <header className="mb-auto d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-light text-decoration-none">
              <img src={myLogo} alt="logo" width="280" height="48" />
            </a>

            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
              <li><a href="/" className="nav-link px-2 link-light">Home</a></li>
              <li><a href="/feed" className="nav-link px-2 link-light">Feed</a></li>
              <li><a href="/friends" className="nav-link px-2 link-light">Friends</a></li>
              <li><a href="/gyms" className="nav-link px-2 link-light">Gyms</a></li>
              <li><a href="/leaderboards" className="nav-link px-2 link-light">Leaderboard</a></li>
              <li><a href="/profile" className="nav-link px-2 link-light">Profile</a></li>
            </ul>

            <div className="col-md-3 text-end">
              <a href="/login" type="button" className="btn btn-outline-primary me-2">Login</a>
              <a href="/signup" type="button" className="btn btn-primary">Sign-up</a>
            </div>
          </header>

          <main className="px-3">
            <div className="container mt-3">
                <Routes>
                  <Route exact path="/login" element={<SignIn />} />
                  <Route exact path="/signup" element={<SignUp />} />
                  <Route exact path="/feed" element={<Feed />} />
                  <Route exact path="/friends" element={<FriendsPage />} />
                  <Route exact path="/gyms" element={<GymsPage />} />
                  <Route exact path="/home" element={<Home />} />
                  <Route exact path="/leaderboards" element={<LeaderboardsPage />} />
                  <Route exact path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
          </main>

          <footer className="mt-auto text-white-50">
          </footer>
        </div>

      </body>

    );
  }
}


export default LayoutSmall;
