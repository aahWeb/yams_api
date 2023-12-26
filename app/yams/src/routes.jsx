import { Link } from "react-router-dom"

const routes = [
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/contact", name: "Contact" },
]

export default function Root(props) {

    const { handle, loggedIn } = props 
  
    return (
        <>
        <nav>
            <ul>
                {routes.map((r) => (
                    <li key={r.id}>
                        <Link to={r.path}>{r.name}</Link>
                    </li>
                ))}
                { loggedIn  && <button onClick={() => handle()}>Logout</button>}
            </ul>
        </nav>
        </>
    );
}