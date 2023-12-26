import { Link } from "react-router-dom"

const routes = [
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/contact", name: "Contact" },
]

export default function Root(props) {

    return (
        <>
            <ul>
                {routes.map((r) => (
                    <li key={r.id}>
                        <Link to={r.path}>{r.name}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}