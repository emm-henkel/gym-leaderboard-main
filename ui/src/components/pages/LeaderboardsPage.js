import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Table from 'react-bootstrap/lib/Table';

class App() extends Component {
state = {
  workoutDays: [],
  weightMoved: []
}

getLeaderboard(url, stateName) {
  axios.get(url)
  .then(({ data }) => {
    this.setState({[stateName]: data });
    console.log(this.state.workoutDays);
  })
  //this.setState({current: true})
}

componentDidMount() {
  this.getLeaderboard('', "workoutDays");
  this.getLeaderboard('', "weightMoved");
}

  render() {
  return (
      <div className="App">
      <Table striped bordered condensed hover className="colorBlack">
<thread>
  <tr>
    <th>#</th>
    <th>User</th>
    <th>Workout Days</th>
    <th>Weight Moved</th>
  </tr>
</thread>
<tbody>
  {workoutDays.map((row, index) =>(
    <tr> key={row.username}>
    <td>{index + 1}</td>
    <td>{row.username}</td>
    <td>{row.days}</td>
    <td>{row.weight}</td>
    </tr>
  )
  )}
</tbody>
      </Table>
      </div>
    );
  }
}

export default App;