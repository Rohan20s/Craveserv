import { useEffect, useState } from "react";

const useCustomHookTest = () => {

    const [data, setData] = useState({})

    useEffect(() => {
        fetch(`https://api.publicapis.org/entries`)
            .then(response => response.json())
            .then(data => {
                setData(data)
                console.log(data)
            })
            .catch(error => console.log(error));
    }, [])

    return { data }
}

export default useCustomHookTest




