import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export default function AppBar() {
    function activeNavLink({ isActive }: { isActive: boolean }) {
        return isActive ? 'activeLink' : 'inActiveLink';
    }
    return (
        <>
            <header className="flex h-20 w-full relative justify-beetwen p-6 ">
                <nav className="flex gap-2">
                    <NavLink to="/dashboard" className={activeNavLink}>
                        Home
                    </NavLink>
                    <NavLink to="/photos" className={activeNavLink}>
                        Photos
                    </NavLink>
                    <NavLink to="/tasks" className={activeNavLink}>
                        Tasks
                    </NavLink>
                </nav>
                <a
                    href="/dashboard"
                    className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-max w-max"
                >
                    <h1 className="text-4xl font-bold">Logo</h1>
                </a>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}
