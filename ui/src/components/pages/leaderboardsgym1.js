import axios from "axios";
import React, { useState, useEffect } from "react";

const LeaderboardsGym1 = () => {
   const [liftLeaders, setLiftLeaders] = useState([]);
   const [users, setUsers] = useState([]);
   const [gyms, setGyms] = useState([]);

   useEffect(() => {
      axios.get("http://127.0.0.1:8000/users/").then((response) => {
          setUsers(response.data);
      });
      axios.get("http://127.0.0.1:8000/user_lifts").then((response) => {
          setLiftLeaders(response.data);
      });
  }, []);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/gyms/").then((response) => {
        setGyms(response.data);
    });
  }, []);

   return (


      <div className="posts-container vh-100">
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
         {gyms.map((gym)=>{
                return (
                  <div>
                  <h1 className="my-3">{gym.name} Leaderboards</h1>

             <table className="table text-white">
               <thead className="thead-light">
               <tr>
                 <th scope="col">Rank</th>
                 <th scope="col">Exercise</th>
                 <th scope="col">Weight</th>
                 <th scope="col">Reps</th>
                 <th scope="col">Name</th>
               </tr>
               </thead>
               <tbody>

               {liftLeaders.filter(lift => lift.gym_id === gym.id).map((ll, i) => {
                 return (
                   <tr>
                     <td>{i+1}</td>
                     <td>{["Squat", "Bench", "Deadlift"][ll.lift_id - 1]}</td>
                     <td>{ll.weight}</td>
                     <td>{ll.reps}</td>
                     <td>{users[ll.user_id-1].full_name}</td>
                   </tr>
                 );
               })}
               </tbody>
             </table>
                    <br/>
          </div>
          );
         })
         }

      </div>

   );
};

export default LeaderboardsGym1;
