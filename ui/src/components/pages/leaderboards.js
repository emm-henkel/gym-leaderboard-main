import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

const Leaderboards = () => {
    const [liftLeaders, setLiftLeaders] = useState([]);
    const [user, setUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    let currentUserID = 0
    let currentArrayUserID = 0

    // 1: squat, 2: bench, 3: deadlift
    const LIFT_NAME = 'Bench';
    const LIFT_ID = 2;

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/users/").then((response) => {
            setUsers(response.data);
        });
        axios.get(`http://127.0.0.1:8000/user_lifts/lift/${LIFT_ID}`).then((response) => {
            setLiftLeaders(response.data);

        });
    }, []);


    useEffect(() => {
        const token = localStorage.getItem("currentUserToken");
        const AuthStr = 'Bearer '.concat(token);
        axios.get("http://127.0.0.1:8000/user/me", { headers: { 'Authorization': AuthStr } }).then((response) => {
            setUser(response.data);
            console.log(JSON.stringify(response.data));
        });
    }, []);

    const sendNewUserLiftData = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("currentUserToken");
        axios.defaults.headers.common = { 'Authorization': 'Bearer ' + token };
        console.log(event.target.weight);
        axios.post("http://127.0.0.1:8000/user_lifts/", {
            user_id: user.id,
            lift_id: LIFT_ID,
            gym_id: event.target.inputGymID.value,
            weight: event.target.inputWeight.value,
            reps: event.target.inputReps.value,
            created_at: moment().format("YYYY-MM-DD HH:mm:ss")
        }).then((response) => {
            if (response.status === 200) {
                navigate(0);
            } else if (response.status === 401) {
                console.log("Not Authorized!");
                alert("Not Authorized!!")
                navigate(0);
            }
        });
    }

    const sendNewPostData = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("currentUserToken");
        axios.defaults.headers.common = { 'Authorization': 'Bearer ' + token };

        let postString = `${user.full_name} ${LIFT_NAME.toLowerCase()}ed ${event.target.inputWeight.value} for 
                            ${event.target.inputReps.value} rep(s).`
        if (event.target.inputContent.value !== '') postString += ` They left a comment:\n ${event.target.inputContent.value}`;

        axios.post("http://127.0.0.1:8000/posts/", {
            content: postString,
            user_id: user.id,
            created_at: moment().format("YYYY-MM-DD HH:mm:ss")
        }).then((response) => {
            if (response.status === 200) {
                console.log("IT WORKED!");
                navigate(0);
            } else if (response.status === 401) {
                console.log("Not Authorized!");
                alert("Not Authorized!!")
                navigate(0);
            }
            console.log("TEST " + response.data);
            console.log("TEST " + user.user_id);
            console.log("TEST " + event.target.inputContent.value);
        });
    }


    return (
        <div className="posts-container vh-100">
            <h1 className="my-3">{LIFT_NAME} Leaderboards</h1>
            <div className="row mb-3">
                <div className="col">
                    <a className="btn btn-primary " href="leaderboardssquat">Squat Leaderboard</a>
                </div>
                <div className="col">
                    <a className="btn btn-primary" href="leaderboardsdl">Deadlift Leaderboard</a>
                </div>
                <div className="col">
                    <a className="btn btn-primary" href="leaderboardsgym1">Your Gym Leaderboard</a>
                </div>
            </div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Log {LIFT_NAME}</button>
            <table className="table text-white">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Weight</th>
                        <th scope="col">Reps</th>
                        <th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>

                    {liftLeaders.map((ll, i) => {
                        return (
                            <tr>
                                <td>{i + 1}</td>
                                <td>{ll.weight}</td>
                                <td>{ll.reps}</td>
                                <td>{users[ll.user_id - 1].full_name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <form onSubmit={(e) => { sendNewPostData(e); sendNewUserLiftData(e) }}>
                        {/*<form onSubmit={sendNewUserLiftData}>*/}
                        <input type="hidden" name="inputUserID" value={currentUserID} />
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title w-100 text-center position-absolute" id="exampleModalLabel"
                                    style={{ marginLeft: -10 }}>Log Lift</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-outline">
                                    <textarea className="form-control" id="gymIDText" name="inputGymID" rows="4"
                                        placeholder="Gym ID" maxLength="250"
                                        style={{ width: 500, height: 50 }}></textarea>
                                    <textarea className="form-control" id="weightText" name="inputWeight" rows="4"
                                        placeholder="Weight" maxLength="250"
                                        style={{ width: 500, height: 50 }}></textarea>
                                    <textarea className="form-control" id="repsText" name="inputReps" rows="4"
                                        placeholder="Reps" maxLength="250"
                                        style={{ width: 500, height: 50 }}></textarea>
                                    <textarea className="form-control" id="createPostText" name="inputContent" rows="4"
                                        placeholder="Post Text (optional)" maxLength="250"
                                        style={{ width: 500, height: 200 }}></textarea>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="submit" className="glow-on-hover">Log Lift</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    );
};

export default Leaderboards;
