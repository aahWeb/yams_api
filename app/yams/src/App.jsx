import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllPastries } from "./store/pastrie";

import Login from "./Login";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { pastries, status, error } = useSelector((state) => state.pastries);
  const { account } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllPastries());
    }
  }, [status]);

  if (status === "error") return <p>Error {error}</p>;

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="flex justify-content">
        {account && (
          <div className="w-1/2 p-4">
            <ul className="bg-gray-200 p-4">
              {status === "loading"
                ? "loading..."
                : pastries.map((p) => (
                    <li key={p.id}>
                      {p.name}, {p.id}
                    </li>
                  ))}
            </ul>
          </div>
        )}

        <div className="w-1/2 p-4">
          <div className="bg-blue-200 p-4">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
