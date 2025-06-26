import React, { Component, useEffect, useState } from 'react'

const Father: React.FC<any> = () => {
    const [time, setTime] = useState(0)

    const fnb = () => {
        console.log(111)
    }

    const handleClick = () => {
        setTime(v => v + 1)
    }

    console.log("Father", time)
    return <div>
        <button onClick={handleClick}>按钮</button>
        <div>{time}</div>
        <TestA />
        <TestB />
    </div>
}

const TestA: React.FC<any> = React.memo(({ fnb }) => {
    console.log("TestA")
    return <div></div>
})

class TestB extends Component {
    render() {
        console.log("TestB")
        return <div></div>
    }
}

export default Father
