import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Statistic = (props) => {
    return(
        <tbody>
            <tr>
                <td>{props.text}</td>
                <td>{props.value}</td>
            </tr>
        </tbody>
    )
}

const Statistics = (props) => {
    if (props.good || props.neutral || props.bad != 0){
        return(
            <table>
                <Statistic text="good" value={props.good} />
                <Statistic text="neutral" value={props.neutral} />
                <Statistic text="bad" value={props.bad} />
                <Statistic text="all" value={props.all} />
                <Statistic text="average" value={props.average} />
                <Statistic text="positive" value={props.positive + "%"} />
            </table>
        )
    } else {
        return(
            <div><p>No feedback given</p></div>
        )
    }    
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Give Feedback</h1>
            <Button handleClick={() => setGood(good + 1)} text="good" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button handleClick={() => setBad(bad + 1)} text="bad" />
            <br></br>
            <h1>Statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}
            all={good+neutral+bad} average={(good + (neutral*0) + (bad* -1))/(good+neutral+bad) }
            positive={(good/(good+neutral+bad))*100}
            />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));
