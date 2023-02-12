import { NavLink } from "react-router-dom"

export default function Landing () {
    return(
        <div>
            <label>Landing</label>
            <NavLink to='/home'>Home</NavLink>
        </div>
    )
}