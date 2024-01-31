import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllPastries } from "../store/pastry";

function Pastries() {
    const dispatch = useDispatch();
    const { pastries, status, error } = useSelector(state => state.pastries);
    const { pastry, id } = useSelector(state => state.pastry);
    const lastId = useRef(null);

    useEffect(() => {
        console.log("montage", status)
        if (status === "idle") 
            dispatch(fetchAllPastries());

        lastId.current = id 
    }, []);

    useEffect(() => {
        console.log("id new")
        if( id !== lastId.current)
            dispatch(fetchAllPastries());
    }, [id]);

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
