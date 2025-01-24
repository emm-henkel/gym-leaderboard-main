import React, { Component } from "react";

class NotFound extends Component {
    state = {};
    render() {
        return (
            <body>
                <div className="d-flex align-items-center justify-content-center vh-100">
                    <div className="text-center">
                        <h1 className="display-1 fw-bold">404</h1>
                        <p className="fs-3"> <span className="text-danger">Oops!</span> Access DENIED.</p>
                        <h4 className="mb-3">You must be signed in to view this content.</h4>
                        <a href="/" className="btn btn-primary">Go Home</a>
                    </div>
                </div>
            </body>
        );
    }
}

export default NotFound;
