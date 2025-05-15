import { Outlet } from 'react-router-dom';
import type { AppBarProps } from '../types/props';
import { supabase } from '../App';
import { Button } from '@mui/material';

export default function AppBar({ session, setSession }: AppBarProps) {
    async function handleLogoutClick() {
        console.log('logout');
        await supabase.auth.signOut();
        setSession(null);
    }

    return (
        <>
            <header className="flex h-20 w-full relative justify-end p-6 ">
                <a
                    href="/dashboard"
                    className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-max w-max"
                >
                    <h1 className="text-4xl font-bold">Logo</h1>
                </a>
                {session && (
                    <Button variant="outlined" onClick={handleLogoutClick}>
                        Logout
                    </Button>
                )}
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}
