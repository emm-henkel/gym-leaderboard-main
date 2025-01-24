import React, { useEffect } from "react";
import axios from "axios";
import myLogo from '../../lift-leader-logo1b.png';
import styles from './signin.css'
import { useNavigate } from 'react-router-dom';


function SignIn(props) {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("currentUserToken");
        console.log('logged out!')
    }, [])

    return (
        <body className="d-flex text-center text-bg-dark vh-100">

            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <header className="mb-auto d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-light text-decoration-none">
                        <img src={myLogo} alt="logo" width="280" height="48" />
                    </a>

                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        {/* <li><a href="/" className="nav-link px-2 link-light">Home</a></li> */}
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
                        <main className="px-3">

                            <h1>You have been signed out</h1><p className="lead">log back in to access your content</p><p className="lead">
                                <a href="/login" className="btn btn-lg btn-secondary fw-bold border-white bg-white mx-1">Login</a>
                                <a href="/signup" className="btn btn-lg btn-secondary fw-bold border-white bg-white mx-1">Sign Up</a>
                            </p>

                        </main>
                    </div>
                </main>

                <footer className="mt-auto text-white-50">
                </footer>
            </div>

        </body>

    );
}

export default SignIn;