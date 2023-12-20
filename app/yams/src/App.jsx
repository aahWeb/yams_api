import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import Root from "./routes"
import Login from "./Login"
import Pastries from "./Pastries"
import "./App.css"

import { fetchMe } from "./store/me"

function App() {
  const { loggedIn } = useSelector((s) => s.login);
  const { user } = useSelector((s) => s.me);
  const [status, setStatus] = useState(false)
  const dispatch = useDispatch();

  // si on recherche on vérifie la connexion JWT
  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  useEffect(() => {
    setStatus( Boolean(loggedIn || user)  )
  }, [user, loggedIn]);

  return (
    <>
      <Root loggedIn={status} />
      <div className="flex items-center justify-center">
        {status === false && <Login />}
        {status && <Pastries />}
      </div>
    </>
  );
}

export default App;
