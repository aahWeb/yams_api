import { useSelector } from "react-redux"

import Login from "./Login"
import Pastries from "./Pastries"

const Home = () => {
    // useSelector() nous permet d'accéder au state globale défini dans notre store
    // voir comment on retourne le store dans le littéral, ici s.login correspond à un slice particulier
    const { loggedIn } = useSelector((s) => s.login);

    return (
    <>
        <div className="flex items-center justify-center h-full">
        { loggedIn === false && <Login />}
        { loggedIn && <Pastries />}
        </div>
    </>
    );
}

export default Home;
