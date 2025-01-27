import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Vote = (points, selected) => {
    const copy = [...points]
    copy[selected] += 1
    return copy
}

const MostVotes = (props) => {
    let largest = 0
    for (let n = 0; n < 6; n++ ){
        if (props.points[n] > largest){
            largest = props.points[n]
        }
    }
    let index = 0
    for (let n = 0; n < 6; n ++ ){
        if (props.points[n] == largest){
            index = n
        }
    }
    return(
        <div>
            <p>{props.anecdotes[index]}</p>
            <p>has {props.points[index]} votes</p>
        </div>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])

    console.log(points)

    return(
        <div>
            <h1>Anecdote of the day</h1>
            {props.anecdotes[selected]}
            <br/>
            <p>has {points[selected]} votes</p>
            <Button handleClick={() => setPoints(Vote(points, selected))} text="Vote"/>
            <Button handleClick={() => setSelected(Math.floor(Math.random() *6))} text="Next anecdote" />
            <br/>
            <h1>Anecdote with most votes</h1>
            <MostVotes points={points} anecdotes={anecdotes}/>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));

