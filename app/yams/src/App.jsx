import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "./hooks/useAuth";
import { fetchMe } from "./store/me";

import Pastries from "./Pastries";

import "./App.css";
import { redirect } from "react-router-dom";

function App() {
  const dispatch = useDispatch()
  const { user, message } = useSelector(s => s.me)

  useEffect(() => {
      dispatch(fetchMe())
  }, [])

  useEffect(() => {
    console.log(message)
}, [ user ])

  return (
    <>
      <h1 className="text-3xl font-bold underline">Pastries</h1>
      <div className="flex justify-content">
        { user == null && <Login />}
        <Pastries />
      </div>
    </>
  );
}

export default App;
