import { Routes, Route, Link } from 'react-router-dom';
import React, { Component } from "react";
import Home from "./Home/home";
import Layout from "./Home/home";
import NotFound from "./notfound";
import Users from "./gyms";
import User from "./gyms";

const Test = () => {
    const users = [
        { id: '1', fullName: 'Robin Wieruch' },
        { id: '2', fullName: 'Sarah Finnley' },
    ];

    return (
        <div className="gyms-container">
            <h1>React Router</h1>

            <nav>...</nav>

            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="users" element={<Users users={users} />}>
                        <Route path=":userId" element={<User />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    );
};

export default Test;
