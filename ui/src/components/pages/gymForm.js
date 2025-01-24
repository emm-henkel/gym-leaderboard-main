import React, { Component, useState, useEffect } from "react";
import YourPicture from '../../lift-leader-logo1b.png';
import axios from "axios";
import moment from "moment";
import styles from './profile.css';

const ProfileLand = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredGym, setEnteredGym] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  const [enteredGender, setEnteredGender] = useState('');
  const [enteredHeight, setEnteredHeight] = useState('');
  const [enteredWeight, setEnteredWeight] = useState('');

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  };

  const gymInputChangeHandler = event => {
    setEnteredGym(event.target.value);
  }
  const ageInputChangeHandler = event => {
    setEnteredAge(event.target.value);
  }

  const genderInputChangeHandler = event => {
    setEnteredGender(event.target.value);
  }

  const heightInputChangeHandler = event => {
    setEnteredHeight(event.target.value);
  }

  const weightInputChangeHandler = event => {
    setEnteredWeight(event.target.value);
  }

  const sendNewGymData = event =>{
    event.preventDefault();

    axios.post("http://127.0.0.1:8000/gyms/", {
    name: event.target.inputName.value,
    created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
    address: event.target.inputAddress.value
  }).then((response) => {
    if (response.status === 200) { console.log("IT WORKED!") }
    console.log(response.data);
  });

    console.log('Updated name to: ' + enteredName);
    console.log('Updated gym to: ' + enteredGym);
    console.log('Updated age to: ' + enteredAge);
    console.log('Updated gender to: ' + enteredGender);
    console.log('Updated height to: ' + enteredHeight);
    console.log('Updated weight to: ' + enteredWeight);
  };
  return (

    <form onSubmit={sendNewGymData}>
      <div className='text-display'>
        <img className='profile-picture'src={YourPicture} height='100' width='100'></img>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' name="inputName" onChange={nameInputChangeHandler}/>
        <label htmlFor='gym'>Your Gym</label>
        <input type='text' id='gym' name="inputGym" onChange={gymInputChangeHandler}/>
        <label htmlFor='age'>Your Age</label>
        <input type='int' id='age' name="inputAge" onChange={ageInputChangeHandler}/>
        <label htmlFor='gender'>Your Gender</label>
        <input type='text' id='gender' name="inputGender" onChange={genderInputChangeHandler}/>
        <label htmlFor='height'>Your Height in Inches</label>
        <input type='int' id='height' name="inputHeight" onChange={heightInputChangeHandler}/>
        <label htmlFor='weight'>Your Weight in Pounds</label>
        <input type='int' id='weight' name="inputWeight" onChange={weightInputChangeHandler}/>
      </div>
      <div className="form-actions">
        <button>Save</button> {/* where we would send update to the database */}
        <a href="profile" className="button">Cancel</a>
      </div>
    </form>
  );
};

export default ProfileLand;
