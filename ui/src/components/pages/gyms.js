import axios from "axios";
import moment from "moment";
import React, { Component, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Gyms = () => {
    const [gyms, setGyms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/gyms/").then((response) => {
            setGyms(response.data);
        });
    }, []);

    const sendNewGymData = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("currentUserToken");
        axios.defaults.headers.common = { 'Authorization': 'Bearer ' + token };
        axios.post("http://127.0.0.1:8000/gyms/", {
            name: event.target.inputName.value,
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            address: event.target.inputAddress.value,
            img1: event.target.inputImgUrl.value
        }).then((response) => {
            if (response.status === 200) {
                console.log("IT WORKED!");
                navigate(0);
            } else if (response.status === 401) {
                console.log("Not Authorized!");
                alert("Not Authorized!!")
                navigate(0);
            }
            console.log(response.data);
        });
    }

    return (

        <div className="page-container">

            <div className="gyms-container">
                <h1 className="my-3">Gyms</h1>
                {localStorage.getItem("currentUserToken") && (
                <button type="button" className="btn btn-light mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Gym</button>
                )}
                <div className="row row-cols-1 row-cols-md-2 g-4 text-dark">

                    {gyms.map((gym) => {
                        return (
                            <div className="col">
                                <div className="card">
                                    <img src={gym.img1} className="card-img-top" alt="Gym Image Here" />
                                    <div className="card-body">
                                        <h5 className="card-title">{gym.name}</h5>
                                        <p className="card-text">{gym.address}</p>
                                        <p className="card-text">ID: {gym.id}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form className="mx-1" onSubmit={sendNewGymData}>
                            <div className="modal-header">
                                <h5 className="modal-title w-100 text-center position-absolute text-dark" id="exampleModalLabel" style={{ marginLeft: -15 }}>Add a Gym</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                        <label className="form-label text-dark" htmlFor="formInputName">Gym Name</label>
                                        <input type="text" id="formInputName" className="form-control" name="inputName" />
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                        <label className="form-label text-dark" htmlFor="formInputAddress">Gym Address</label>
                                        <input type="text" id="formInputAddress" className="form-control" name="inputAddress" />
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                        <label className="form-label text-dark" htmlFor="formInputImg">Gym Image URL</label>
                                        <input type="text" id="formInputImgUrl" className="form-control" name="inputImgUrl" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center" >
                                <button className="glow-on-hover" type="submit">Create Gym</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>



    );
};

export default Gyms;
