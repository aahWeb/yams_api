import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

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

  // si on recherche on vérifie la connexion JWT
  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  useEffect(() => {
    if (user) {
       dispatch( changeloggedIn(true) ) ;
    }

  }, [user]);

  const handleLogout = () => {
    dispatch(logout())
    dispatch(changeloggedIn(false))
  }

  return (
    <>
      <nav>
        {loggedIn ? 'true' : 'false'}
        <Root loggedIn={loggedIn} />
        {loggedIn && <button onClick={handleLogout}>Logout</button>}
      </nav>
      <div className="flex items-center justify-center">
        {loggedIn === false && <Login />}
        {loggedIn && <Pastries />}
      </div>
    </>
  );
}

export default App;
