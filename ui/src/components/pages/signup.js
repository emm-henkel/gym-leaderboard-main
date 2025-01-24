import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import myLogo from '../../lift-leader-logo1b.png';
import { useNavigate } from 'react-router-dom';

function SignUp(props) {
    const navigate = useNavigate();

    const sendNewUserData = (event) => {
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/users/", {
            email: event.target.inputEmail.value,
            password: event.target.inputPassword.value,
            created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
            age: event.target.inputAge.value,
            full_name: event.target.inputName.value,
            weight: event.target.inputWeight.value,
            height: event.target.inputHeight.value,
            sex: event.target.inputGender.value
        })
            .then((response) => {
                if (response.status === 200) { console.log("IT WORKED!"); navigate("/login"); alert(event.target.inputEmail.value + " Registered!"); }
                if (response.status === 400) { console.log("ERROR!"); alert("Error, User already exists!"); }
                console.log(response.data);
            });
    }

    return (
        <body className="d-flex text-center text-bg-dark vh-100">

            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <header className="mb-auto d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-3 border-bottom">
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
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" >
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form className="mx-1 mx-md-4" onSubmit={sendNewUserData}>

                                                <div className="d-flex flex-row align-items-center mb-3">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" id="form3Example1c" className="form-control" name="inputName" />
                                                        <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-3">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" id="form3Example3c" className="form-control" name="inputEmail" />
                                                        <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-3">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4c" className="form-control" name="inputPassword" />
                                                        <label className="form-label" htmlFor="form3Example4c">Password</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-3">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4cd" className="form-control" name="inputPassword2" />
                                                        <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="col-2 mb-0">
                                                        <input type="text"  className="form-control" name="inputAge" />
                                                    </div>
                                                    <div className="col-2 mx-2 mb-0">
                                                        <input type="text"  className="form-control" name="inputHeight" />
                                                    </div>
                                                    <div className="col-2 me-2 mb-0">
                                                        <input type="text"  className="form-control" name="inputWeight" />
                                                    </div>
                                                    <div className="col mb-0">
                                                        <select class="form-select" name="inputGender">
                                                            <option value="" selected disabled hidden>Gender</option>
                                                            <option value="0">Male</option>
                                                            <option value="1">Female</option>
                                                            <option value="2">Non-Binary</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-3">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="col-2 mb-0">
                                                        <label className="form-label" >Age</label>
                                                    </div>
                                                    <div className="col-2 mx-2 mb-0">
                                                        <label className="form-label">Height</label>
                                                    </div>
                                                    <div className="col-2 me-2 mb-0">
                                                        <label className="form-label">Weight</label>
                                                    </div>
                                                    <div className="col mb-0">
                                                        <label className="form-label">Gender</label>
                                                    </div>
                                                </div>

                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" name="inputCheckbox" />
                                                    <label className="form-check-label" htmlFor="form2Example3">
                                                        I agree all statements in <a href="/terms">Terms of service</a>
                                                    </label>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button href="/login" className="btn btn-primary btn-lg" type="submit" >Register</button>
                                                </div>

                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <div className="row">
                                                <img src="/logo1b.png" className="img-fluid" alt="Sample image" />
                                                <img src="/fitness-people-cartoon.jpg" className="img-fluid" alt="Sample image" />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="mt-auto text-white-50">
                </footer>
            </div>

        </body>

    );

}

export default SignUp;
