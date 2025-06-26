import React, { useEffect, useState } from "react";

const useRequestData = () => {
    const [value, setValue] = useState(0)

    useEffect(() => {
        for (let i = 0; i < 10; ++i) {
            setValue(i)
        }
    }, [])

    return value;
}

const App = () => {
    const value = useRequestData();
    console.log("value: ", value);
    return <div></div>
}

export default App