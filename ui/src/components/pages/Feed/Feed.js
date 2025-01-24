import React, { useState, useEffect } from "react";
import styles from "./Feed.css";
import axios from "axios";
import moment from "moment";
import { useNavigate } from 'react-router-dom';

function Feed(props) {
    const [user, setUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    let currentUserID = 0
    let currentArrayUserID = 0

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/users/").then((response) => {
            setUsers(response.data);
        });
        const token = localStorage.getItem("currentUserToken");
        const AuthStr = 'Bearer '.concat(token);
        axios.get("http://127.0.0.1:8000/user/me", { headers: { 'Authorization': AuthStr } }).then((response) => {
            setUser(response.data);
            if (response.status === 200) {
                axios.get("http://127.0.0.1:8000/posts/").then((response) => {
                    setPosts(response.data);
                });
            }
        });
    }, []);

    const sendNewPostData = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("currentUserToken");
        axios.defaults.headers.common = { 'Authorization': 'Bearer ' + token };
        axios.post("http://127.0.0.1:8000/posts/", {
            content: event.target.inputContent.value,
            user_id: event.target.inputUserID.value,
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
        <div className="feed text-dark">
            <div className="container1">
                <div className="postContainer">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> Create Post</button>
                    {posts.map((post) => {
                        { currentArrayUserID = post.user_id - 1 }
                        { currentUserID = post.user_id }
                        return (
                            <div className="column-one">
                                <div className="postBox">
                                    <div className="d-flex flex-row user-info">
                                        <h5 className="ms-1">{[""].concat(users)[post.user_id].full_name}</h5>

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

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <form onSubmit={sendNewPostData}>
                    <input type="hidden" name="inputUserID" value={currentUserID} />
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title w-100 text-center position-absolute" id="exampleModalLabel" style={{ marginLeft: -10 }}>Create your Own Post</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-outline">
                                    <textarea className="form-control" id="createPostText" name="inputContent" rows="4" placeholder="Input Text" maxLength="250" style={{ width: 500, height: 200 }}></textarea>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center" >
                                <button type="submit" className="glow-on-hover">Create Post</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )

}
export default Feed;
