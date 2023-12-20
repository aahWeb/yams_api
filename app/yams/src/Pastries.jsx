import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllPastries } from "./store/pastrie";

import "./App.css";

function Pastries() {
    const dispatch = useDispatch();
    const { pastries, status, error } = useSelector(state => state.pastries);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchAllPastries());
        }
    }, []);

    if (status === "error") return <p>Error {error}</p>;

    return (
        <>
            {status === "loading"
                ? "loading..."
                :
                <ul className="bg-gray-200 p-4">
                    {pastries.map((p) => (
                        <li key={p.id}>
                            {p.name}, {p.id}
                        </li>
                    ))}
                </ul>
            }
        </>
    );
}

export default Pastries;
