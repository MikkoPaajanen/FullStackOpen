import React from 'react'

const Course = ({course}) => {
    return(
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
    )
}

const Header = ({course}) => {
    return (
        <div>
            <h1>{course.name}</h1>
        </div>
    )
}

const Content = ({course}) => {
    return(
        <div>
            <Part course={course} />
        </div>
    )
}

const Part = ({course}) => {
    const rows = () => 
        course.parts.map(eka => <p key={eka.id}>{eka.name} {eka.exercises}</p>) 
    return(
        <div>
            {rows()}
        </div>
    )
}

const Total = ({course}) => {
    const totalAmount = course.parts.reduce(function(sum, part) {
        return sum + part.exercises
    }, 0)
    return (
        <div>
            <p><b>Total of {totalAmount} exercises</b></p>
        </div>
    )
}

export default Course