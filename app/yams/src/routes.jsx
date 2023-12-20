import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { changeloggedIn, logout } from "./store/auth";

const routes = [
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/contact", name: "Contact" },
]

export default function Root(props) {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        dispatch(changeloggedIn(false))
        console.log(props, "icici")
    }

    return (
        <>
        <nav>
            <ul>
                {routes.map((r) => (
                    <li key={r.id}>
                        <Link to={r.path}>{r.name}</Link>
                    </li>
                ))}
                { props?.loggedIn  && <button onClick={handleLogout}>Logout</button>}
            </ul>
        </nav>
        </>
    );
}