import React, {useState} from 'react'
import './calculator.css'

const calculator = () => {

    const [weight, setWeight] = useState();
    const [reps, setReps] = useState();
    const [max, setMax] = useState(Math.round(weight * (1 + (0.0333 * reps))));



    function calculateMax(e){
        e.preventDefault();
        setMax(Math.round(weight * (1 + (0.0333 * reps))))
    }


  return (
        <div className="main">
            <h1>Calculate Your One Rep Max</h1>
            <form>
                <div class="form-group">
                    <label className='inputLabel'>Weight Lifted</label><br/>
                    <input className="inputBar" type="number" placeholder='0' value={weight} onChange={e => setWeight(+e.target.value)}/>
                </div>
                <div class="form-group">
                    <label className='inputLabel'>Repetitions</label><br/>
                    <input className="inputBar" type="number" placeholder='0' value={reps} onChange={e => setReps(+e.target.value)}/>
                </div>
                <button className='calculateButton'onClick={calculateMax}>Calculate</button>
            </form>
            <p className="answer">Your calculated one rep max is: {max}</p>
        </div>
  )
}

export default calculator