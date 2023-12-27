import { useSelector } from "react-redux"

import Login from "../Login"
import Pastries from "../Pastries"

const Home = () => {
    // useSelector() nous permet d'accéder au state globale défini dans notre store
    const { loggedIn } = useSelector((s) => s.login);

    return (
    <>
        <div className="flex items-center justify-center h-full">
        { // On affiche le formulaire de connection si l'utilisateur n'est pas connecté
        loggedIn === false && <Login />}
        { // On affiche les patisseries si l'utilisateur est connecté
        loggedIn && <Pastries />}
        </div>
    </>
    );
}

export default Home;
