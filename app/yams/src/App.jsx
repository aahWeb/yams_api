import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import Root from "./routes"
import Login from "./Login"
import Pastries from "./Pastries"
import "./App.css"

import { fetchMe } from "./store/me"
import { logout, changeloggedIn } from "./store/auth"

function App() {
  const { loggedIn } = useSelector((s) => s.login);
  const { user } = useSelector((s) => s.me);
  const dispatch = useDispatch();

  useEffect(() => {
    // si reload de la page, est-ce que l'on est connecté ?
    dispatch(fetchMe());
  }, []);

  useEffect(() => {
    if (user) 
      dispatch(changeloggedIn(true));

  }, [user, loggedIn]);

  const handleLogout = () => {
    dispatch(logout())
    dispatch(changeloggedIn(false))
  }

  return (
    <>
      <Root loggedIn={loggedIn} handle={handleLogout} />
      <div className="flex items-center justify-center">
        {loggedIn === false && <Login />}
        {loggedIn && <Pastries />}
      </div>
    </>
  );
}

export default App;