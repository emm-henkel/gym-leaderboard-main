import React, { Component, useState, useEffect } from "react";
import styles from './friends.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Friends = () => {
   const [followers, setFollowers] = useState([]);
   const [following, setFollowing] = useState([]);
   const [user, setUser] = useState([]);
    const navigate = useNavigate();

   useEffect( () => {
      const token = localStorage.getItem("currentUserToken");
      const AuthStr = 'Bearer '.concat(token);
      const getUser = async () => {
         await axios.get("http://127.0.0.1:8000/user/me", {headers: {'Authorization': AuthStr}}).then((response) => {
            console.log(response.data);
            setUser(response.data);
         });
      }
      getUser();
   }, []);

   // get people current user is following then get their stats
   const getFollow = async () => {
      let temp = [];
      await axios.get(`http://127.0.0.1:8000/user/following/${user.id}`).then(async r => {
         for (const jsonObj of r.data) {
            await axios.get(`http://127.0.0.1:8000/users/${jsonObj.following_id}`).then(r => {
               temp.push(r.data);
            });
         }
         setFollowing(temp);
      });
      temp = [];
      await axios.get(`http://127.0.0.1:8000/user/followers/${user.id}`).then(async r => {
         for (const jsonObj of r.data) {
            await axios.get(`http://127.0.0.1:8000/users/${jsonObj.follower_id}`).then(r => {
               temp.push(r.data);
            });
         }
         setFollowers(temp);
      });
   };
   getFollow();

   const followUser = (e) => {
       e.preventDefault();
       const token = localStorage.getItem("currentUserToken");
       axios.defaults.headers.common = { 'Authorization': 'Bearer ' + token };
       axios.post(`http://127.0.0.1:8000/user/email_follow`, {
         follower_id: user.id,
         following_email: e.target.inputEmail.value
       }).then(response => {
           if (response.status === 200) {
               navigate(0);
           } else if (response.status === 401) {
               console.log("Not Authorized!");
               alert("Not Authorized!!")
               navigate(0);
           }
       });
   }

   return (
      <div className="friends-container d-flex justify-content-center vh-100">

         <div className="col-md-8">
            <div className="tab-content p-0">
                <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Follow a Lifter</button>

               <div className="tab-pane fade active show" id="profile-friends">
                  <div className="m-b-10"><h3>Following</h3></div>

                  <ul className="friend-list clearfix">
                     {following.map((friend) => {
                        return (
                           <li>
                              <a href="#">
                                 {/*<div className="friend-img"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" /></div>*/}
                                 <div className="friend-info">
                                    <h4>{friend.full_name}</h4>
                                    <p>{friend.email}</p>
                                 </div>
                              </a>
                           </li>
                        );
                     })}
                  </ul>
               </div>

               <br/>
               <div className="tab-pane fade active show" id="profile-friends">
                  <div className="m-b-10"><h3>Followers</h3></div>
                  <ul className="friend-list clearfix">
                     {followers.map((friend) => {
                        return (
                            <li>
                               <a href="#">
                                  {/*<div className="friend-img"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" /></div>*/}
                                  <div className="friend-info">
                                     <h4>{friend.full_name}</h4>
                                     <p>{friend.email}</p>
                                  </div>
                               </a>
                            </li>
                        );
                     })}
                  </ul>
               </div>
            </div>
         </div>

          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
               aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                  <form onSubmit={followUser}>
                      <div className="modal-content">
                          <div className="modal-header">
                              <h5 className="modal-title w-100 text-center position-absolute" id="exampleModalLabel"
                                  style={{marginLeft: -10}}>Log Lift</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal"
                                      aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                              <div className="form-outline">
                                  <textarea className="form-control" id="gymIDText" name="inputEmail" rows="4"
                                            placeholder="Lifter's Email" maxLength="250"
                                            style={{width: 500, height: 50}}></textarea>
                              </div>
                          </div>
                          <div className="modal-footer justify-content-center">
                              <button type="submit" className="glow-on-hover">Follow</button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>

      </div>
   );
};

export default Friends;
