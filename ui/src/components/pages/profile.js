import axios from "axios";
import moment from "moment";
import React, { Component, useState, useEffect } from "react";
import NotSignedIn from "./notSignedIn";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  let currentUserID = 0
  let currentArrayUserID = 0

    useEffect(() => {
        const token = localStorage.getItem("currentUserToken");
        const AuthStr = 'Bearer '.concat(token);
        axios.get("http://127.0.0.1:8000/user/me", { headers: { 'Authorization': AuthStr } }).then((response) => {
            setUser(response.data);
            if (response.status === 200) {
              axios.get(`http://127.0.0.1:8000/posts/`).then((response) => {
                    setPosts(response.data)
              });
            }
        });



        setPosts(posts.filter(p => (p.user_id === user.id)));
        console.log(JSON.stringify(posts))
    }, []);


  const updateUser = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("currentUserToken");
    axios.defaults.headers.common = { 'Authorization': 'Bearer ' + token };
    axios.post("http://127.0.0.1:8000//", {
      name: event.target.inputName.value,
      created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
      address: event.target.inputAddress.value,
      img1: "RRC1.jpg"
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

    <div className="row d-flex justify-content-center align-items-center h-100">

      {!localStorage.getItem("currentUserToken") && (<NotSignedIn />)}

      {localStorage.getItem("currentUserToken") && (
        <div className="col col-lg-9 col-xl-7">

          <div className="card">
            <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: 200 }}>
              <div className="ms-4 mt-5 d-flex flex-column" style={{ width: 150 }}>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"
                  style={{ width: 150, zIndex: 1 }}></img>
                {/* <a className="btn btn-outline-dark" href="profileupdate" style={{ zIndex: 1 }}>Edit profile</a> */}
                <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ zIndex: 1 }}>Edit profile</button>
              </div>
              <div className="ms-3" style={{ marginTop: 130 }}>
                <h2>{user.full_name}</h2>
              </div>
            </div>
            <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="d-flex justify-content-end text-center py-1">
                <div>
                  <p className="mb-1 h5">{posts.filter(p => (p.user_id === user.id)).length}</p>
                  <p className="small text-muted mb-0">Posts</p>
                </div>
                <div className="px-3">
                  <p className="mb-1 h5">0</p>
                  <p className="small text-muted mb-0">Followers</p>
                </div>
                <div>
                  <p className="mb-1 h5">0</p>
                  <p className="small text-muted mb-0">Following</p>
                </div>
              </div>
            </div>
            <div className="card-body p-4 text-black text-start">
              <div className="mb-5">
                <h4 className="mb-1">About</h4>
                <div className="p-2" style={{ backgroundColor: 'f8f9fa' }}>
                  <p className="font-italic mb-1">
                    {/*convert inches to feet and inches*/}
                    Height: {Math.floor(user.height / 12) + '\'' + user.height % 12 + '\"'}
                  </p>
                  <p className="font-italic mb-1">Weight: {user.weight} lbs</p>
                  <p className="font-italic mb-0">Sex: {["Male", "Female", "Other"][user.sex % 3]}</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <p className="lead fw-normal mb-0">Recent posts</p>
                <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p>
              </div>
              <div className="row g-2">
                <div className="col mb-2">
                   <div className="postContainer">
                    {posts.filter(p => p.user_id === user.id).map((post, i) => {
                      if (i > 1) return;
                        { currentArrayUserID = post.user_id - 1 }
                        { currentUserID = post.user_id }
                        return (
                            <div className="column-one">
                                <div className="postBox">
                                    <div className="d-flex flex-row user-info">
                                        <h5 className="ms-1">{user.full_name}</h5>
                                    </div>
                                    <header></header>
                                    <div className="postText">
                                        <p>{post.content}</p>
                                    </div>

                                    <div id="bottom">Posted On: {new Date(post.created_at).toLocaleString('en-US')}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                </div>
                <div className="col mb-2">
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <form className="mx-1" onSubmit={updateUser}>
                  <div className="modal-header">
                    <h5 className="modal-title w-100 text-center position-absolute text-dark" id="exampleModalLabel" style={{ marginLeft: -15 }}>Edit Profile</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">

                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label text-dark" htmlFor="formInputName">Your Name</label>
                        <input type="text" id="formInputName" className="form-control" name="inputName" value="Test" />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label text-dark" htmlFor="formInputGym">Your Gym</label>
                        <input type="text" id="formInputGym" className="form-control" name="inputGym" />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label text-dark" htmlFor="formInputGender">Your Gender</label>
                        <input type="text" id="formInputGender" className="form-control" name="inputGender" />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label text-dark" htmlFor="formInputAge">Your Age</label>
                        <input type="text" id="formInputAge" className="form-control" name="inputAge" />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label text-dark" htmlFor="formInputHeight">Your Height in Inches</label>
                        <input type="text" id="formInputHeight" className="form-control" name="inputHeight" />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label text-dark" htmlFor="formInputWeight">Your Weight in Pounds</label>
                        <input type="text" id="formInputWeight" className="form-control" name="inputWeight" />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer justify-content-center" >
                    <button className="glow-on-hover" type="submit">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>

  );
};

export default Profile;
