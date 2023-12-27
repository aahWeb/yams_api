import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout, changeloggedIn } from "../store/auth"
import useMe from '../hooks/useMe'

const routes = [
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/contact", name: "Contact" },
]

const Layout = ({children}) => {
    const { loggedIn } = useSelector((s) => s.login)
    const dispatch = useDispatch()
    const { user } = useMe()

    const handleLogout = () => {
      dispatch(logout())
      dispatch(changeloggedIn(false))
    }

    return (
        <main className='max-h-[1080px] h-[60vh]'>
            <header>
                <nav id='header-nav' className='mx-auto'>
                    <ul className='flex gap-4 justify-center'>
                        {routes.map(({id, path, name}) => <NavLink key={id} className={({isActive}) => isActive ? 'text-red-500' : null} to={path}>{name}</NavLink>)}
                    </ul>
                    {loggedIn && <button onClick={handleLogout}>Logout</button>}
                </nav>
            </header>
            {children}
        </main>
    );
}

export default Layout;
