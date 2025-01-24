import React, { useEffect } from "react";
import axios from "axios";
import myLogo from '../../lift-leader-logo1b.png';
import styles from './signin.css'
import { useNavigate } from 'react-router-dom';


function SignIn(props) {
    const navigate = useNavigate();

    useEffect(()=>{
        console.log('component mounted!')
      },[])

    const postSignin = (event) => {
        event.preventDefault();
        const bodyFormData = new URLSearchParams();
        bodyFormData.append('username', event.target.inputEmail.value);
        bodyFormData.append('password', event.target.inputPassword.value);
        axios.post("http://127.0.0.1:8000/token/", bodyFormData).then((response) => {
        if (response.status === 200)
        {
            const token = response.data.access_token
            const AuthStr = 'Bearer '.concat(token);
            localStorage.setItem("currentUserToken", token);
            axios.get("http://127.0.0.1:8000/user/me", { headers: { 'Authorization': AuthStr } }).then((secondResponse) => {
                console.log(secondResponse.data);
                localStorage.setItem("currentUserEmail", secondResponse.data.email);
                navigate("/profile");
              });
        }
        console.log(response.data);
      });
    }


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
                        </ul>

                        <div className="col-md-3 text-end">
                            <a href="/login" type="button" className="btn btn-outline-primary me-2">Login</a>
                            <a href="/signup" type="button" className="btn btn-primary">Sign-up</a>
                        </div>
                    </header>

                    <main className="px-3">
                        <div className="container mt-3">
                            <main className="form-signin w-100 m-auto">
                                <form onSubmit={postSignin}>
                                    <a href="/"><img className="mb-4" src={myLogo} alt="" width="280" height="48" /></a>
                                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                                    <div className="form-floating">
                                        <input name="inputEmail" type="email" className={`form-control ${styles.inputs}`} style={{backgroundColor: 'transparent'}} id="floatingInput" placeholder="name@example.com" />
                                        <label htmlFor="floatingInput">Email address</label>
                                    </div>
                                    <div className="form-floating">
                                        <input name="inputPassword" type="password" className={`form-control ${styles.inputs}`} style={{backgroundColor: 'transparent'}} id="floatingPassword" placeholder="Password" />
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>

                                    <div className="checkbox mb-3">
                                        <label>
                                            <input type="checkbox" value="remember-me" /> Remember me
                                        </label>
                                    </div>
                                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
                                </form>
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