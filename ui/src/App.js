import './App.css';
import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./components/pages/notfound";
import Layout from "./components/layout";
import LayoutSmall from "./components/layoutSmall";
import Home from "./components/pages/Home/home";
import SignIn from "./components/pages/signin";
import SignOut from "./components/pages/signout";
import SignUp from "./components/pages/signup";
import Feed from "./components/pages/Feed/Feed";
import FriendsPage from "./components/pages/friends";
import GymsPage from "./components/pages/gyms";
import LeaderboardsPage from "./components/pages/leaderboards";
import myLogo from './lift-leader-logo1b.png';



class App extends Component {
  render() {
    return (

      <div>
              <Router>
                <Routes>
                  <Route exact path="/home" element={<Home />} />
                  <Route path="/" element={<Home />} />
                  <Route exact path="/login" element={<SignIn />} />
                  <Route exact path="/logout" element={<SignOut />} />
                  <Route exact path="/signup" element={<SignUp />} />
                  <Route path="*" element={<Layout />} />
                </Routes>
              </Router>
            </div>

    );
  }
}


export default App;
