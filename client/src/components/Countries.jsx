import { useEffect, useState } from "react"
import axios from 'axios';

export default function Countries () {
    const [state, setState] = useState([]);
    useEffect(async() => {
        const info = await axios.get('http://localhost:3001/countries');
        setState(info.data)
    }, []);
    console.log(state)
    return(
        <div>
            <h1>HOlaaaaa</h1>
        </div>
    )
} 