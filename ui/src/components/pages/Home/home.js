import React, { Component } from "react";
import myLogo from '../../../lift-leader-logo1b.png';
import styles from './home.css'

class Home extends Component {
    state = {};

    render() {
        return (
            <body className="d-flex text-center text-bg-dark vh-100">

                <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                    <header className="mb-auto d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                        <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-light text-decoration-none">
                            <img src={myLogo} alt="logo" width="280" height="48" />
                        </a>

                        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                            {/* <li><a href="/" className="nav-link px-2 link-light">Home</a></li> */}
                            <li><a href="/calculator" className="nav-link px-2 link-light">Calculator</a></li>
                            <li><a href="/feed" className="nav-link px-2 link-light">Feed</a></li>
                            <li><a href="/friends" className="nav-link px-2 link-light">Friends</a></li>
                            <li><a href="/gyms" className="nav-link px-2 link-light">Gyms</a></li>
                            <li><a href="/leaderboards" className="nav-link px-2 link-light">Leaderboard</a></li>
                            {localStorage.getItem("currentUserToken") && (
                                <li><a href="/profile" className="nav-link px-2 link-light">Profile</a></li>
                            )}
                        </ul>


                        <div className="col-md-3 text-end">
                            {!localStorage.getItem("currentUserToken") && (
                                <wrap>
                                    <a href="/login" type="button" className="btn btn-outline-primary me-2">Login</a>
                                    <a href="/signup" type="button" className="btn btn-primary">Sign-up</a>
                                </wrap>
                            )}
                            {localStorage.getItem("currentUserToken") && (
                                <a href="/logout" type="button" className="btn btn-primary me-2">Logout</a>
                            )}
                        </div>

                    </header>

                    <main className="px-3">
                        <div className="container mt-3">
                            <main className="px-3">

                                {localStorage.getItem("currentUserToken") && (
                                    <wrap><h1>Welcome Back!</h1><p className="lead">Click <a className="text-light fw-bold" href="/feed" style={{textDecoration: 'none'}}>here</a> to access your feed</p></wrap>
                                )}

                                {!localStorage.getItem("currentUserToken") && (
                                    <nothing><h1>Welcome to Lift Leaders</h1><p className="lead">Sign Up or login to access exclusive content</p><p className="lead">
                                        <a href="/login" className="btn btn-lg btn-secondary fw-bold border-white bg-white mx-1">Login</a>
                                        <a href="/signup" className="btn btn-lg btn-secondary fw-bold border-white bg-white mx-1">Sign Up</a>
                                    </p></nothing>
                                )}

                            </main>
                        </div>
                    </main>

                    <footer className="mt-auto text-white-50">
                    </footer>
                </div>

            </body>

        );
    }
}

export default Home;
