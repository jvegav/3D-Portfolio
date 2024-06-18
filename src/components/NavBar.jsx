import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <header className='header'>
        <NavLink to="/" className="w-11 h-11 rounded-lg bg-indigo-500 items-center justify-center flex font-bold shadow-md">
        <p className='logo-gradient_text'>JV</p>
        </NavLink>


        <nav className='flex text-lg gap-7 font-medium'>
            <NavLink to="/About" className={({ isActive} ) => isActive ? 'text-blue-500': 'text-black'}>
                About
            </NavLink>
            <NavLink to="/Projects" className={({ isActive} ) => isActive ? 'text-blue-500': 'text-black'}>
                Projects
            </NavLink>
            <NavLink to="/Contact" className={({ isActive} ) => isActive ? 'text-blue-500': 'text-black'}>
                Contact
            </NavLink>
        </nav>
        </header>
  )
}

export default NavBar