import { useSelector } from "react-redux"

import Login from "../Login"
import Pastries from "../Pastries"

const App = () => {
    const { loggedIn } = useSelector((s) => s.login);
    const { user } = useSelector((s) => s.me);

    console.log(user)

    return (
    <>
        <div className="flex items-center justify-center h-full">
        {loggedIn === false && <Login />}
        {loggedIn && <Pastries />}
        </div>
    </>
    );
}

export default App;
