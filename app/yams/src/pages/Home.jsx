import { useSelector } from "react-redux"

import Login from "../Login"
import Pastries from "../Pastries"

const Home = () => {
    const { loggedIn } = useSelector((s) => s.login);
    console.log(loggedIn)

    return (
    <>
        <div className="flex items-center justify-center h-full">
        { loggedIn === false && <Login />}
        {loggedIn && <Pastries />}
        </div>
    </>
    );
}

export default Home;
