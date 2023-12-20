import { Link, redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { fetchlogout, setLogout } from "./store/auth";

const routes = [
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/contact", name: "contact" },
]

export default function Root() {
    const dispatch = useDispatch()
    const { l: { loggedIn } } = useSelector(
        s => {
            return {
                m: s.me,
                l: s.logout
            }
        }
    )

    const handleLogout = e => {
        dispatch(fetchlogout())
        dispatch(setLogout())
    }

    return (
        <>
        <button onClick={handleLogout}>Logout</button>
        </>
    );
}